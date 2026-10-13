import prisma from "@/lib/prisma";

export interface BillingItemInput {
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}

export interface CustomFieldInput {
  label: string;
  value: string;
}

export interface CreateBillingInput {
  clientName: string;
  clientEmail?: string | null;
  clientAddress?: string | null;
  items: BillingItemInput[];
  customFields?: CustomFieldInput[];
  totalAmount: number;
  notes?: string | null;
}

export interface UpdateBillingInput {
  clientName?: string;
  clientEmail?: string | null;
  clientAddress?: string | null;
  items?: BillingItemInput[];
  customFields?: CustomFieldInput[];
  totalAmount?: number;
  notes?: string | null;
  status?: "Initiated" | "Inprogress" | "Approved";
}

let indexesEnsured = false;

/**
 * Ensures the unique sparse index exists on MongoDB for billingNumber.
 * In MongoDB, a sparse unique index allows multiple documents to omit or have null
 * billingNumber while enforcing strict uniqueness once a string billingNumber is assigned.
 */
export async function ensureBillingIndexes() {
  if (indexesEnsured) return;
  try {
    try {
      await prisma.$runCommandRaw({
        dropIndexes: "Billing",
        index: "Billing_billingNumber_key",
      });
    } catch (e) {
      // index might not exist or have different name, proceed
    }

    await prisma.$runCommandRaw({
      createIndexes: "Billing",
      indexes: [
        {
          key: { billingNumber: 1 },
          name: "Billing_billingNumber_key",
          unique: true,
          partialFilterExpression: {
            billingNumber: { $type: "string" },
          },
        },
      ],
    });
    indexesEnsured = true;
  } catch (error) {
    indexesEnsured = true;
  }
}

/**
 * Normalizes a billing record to ensure both camelCase and snake_case properties are present.
 */
export function formatBillingRecord(b: any) {
  if (!b) return null;
  return {
    ...b,
    billing_number: b.billingNumber || null,
    created_at: b.createdAt,
    updated_at: b.updatedAt,
  };
}

/**
 * Creates a new bill with initial status 'Initiated' and NO billing number.
 */
export async function createBill(input: CreateBillingInput) {
  await ensureBillingIndexes();

  if (!input.clientName || !input.clientName.trim()) {
    throw new Error("Client name is required");
  }

  const validItems = (input.items || []).filter(
    (i) => i.description && i.description.trim()
  );

  if (validItems.length === 0) {
    throw new Error("At least one valid item is required");
  }

  const calculatedTotal = validItems.reduce(
    (sum, item) => sum + (Number(item.rate) || 0) * (Number(item.quantity) || 0),
    0
  );

  const bill = await prisma.billing.create({
    data: {
      clientName: input.clientName.trim(),
      clientEmail: input.clientEmail?.trim() || null,
      clientAddress: input.clientAddress?.trim() || null,
      items: validItems.map((i) => ({
        description: i.description.trim(),
        rate: Number(i.rate) || 0,
        quantity: Math.max(1, Math.round(Number(i.quantity) || 1)),
        amount: (Number(i.rate) || 0) * Math.max(1, Math.round(Number(i.quantity) || 1)),
      })),
      customFields: (input.customFields || []).filter(
        (f) => f.label?.trim() && f.value?.trim()
      ),
      totalAmount: input.totalAmount || calculatedTotal,
      notes: input.notes?.trim() || null,
      status: "Initiated", // Always Initiated on creation
    },
  });

  return formatBillingRecord(bill);
}

/**
 * Updates an unapproved bill.
 * Disallows updating if the bill is already Approved.
 * Disallows reverting an approved bill back to Initiated or Inprogress.
 */
export async function updateBill(id: string, input: UpdateBillingInput) {
  await ensureBillingIndexes();

  const current = await prisma.billing.findUnique({ where: { id } });
  if (!current) {
    throw new Error("Bill not found");
  }

  // Edit restriction: Approved bills cannot be modified
  if (current.status === "Approved") {
    throw new Error("Approved bills are locked and cannot be edited or modified.");
  }

  // If status is requested to change to 'Approved', route to approveBill workflow
  if (input.status === "Approved") {
    // First apply any pending detail updates
    if (input.clientName || input.items) {
      await updateBillDetails(id, input);
    }
    return await approveBill(id);
  }

  return await updateBillDetails(id, input);
}

async function updateBillDetails(id: string, input: UpdateBillingInput) {
  const data: any = {};

  if (input.clientName !== undefined) {
    if (!input.clientName.trim()) throw new Error("Client name cannot be empty");
    data.clientName = input.clientName.trim();
  }

  if (input.clientEmail !== undefined) {
    data.clientEmail = input.clientEmail?.trim() || null;
  }

  if (input.clientAddress !== undefined) {
    data.clientAddress = input.clientAddress?.trim() || null;
  }

  if (input.notes !== undefined) {
    data.notes = input.notes?.trim() || null;
  }

  if (input.items !== undefined) {
    const validItems = input.items.filter((i) => i.description && i.description.trim());
    if (validItems.length === 0) throw new Error("At least one valid item is required");
    data.items = validItems.map((i) => ({
      description: i.description.trim(),
      rate: Number(i.rate) || 0,
      quantity: Math.max(1, Math.round(Number(i.quantity) || 1)),
      amount: (Number(i.rate) || 0) * Math.max(1, Math.round(Number(i.quantity) || 1)),
    }));
    data.totalAmount = data.items.reduce((s: number, i: any) => s + i.amount, 0);
  } else if (input.totalAmount !== undefined) {
    data.totalAmount = input.totalAmount;
  }

  if (input.customFields !== undefined) {
    data.customFields = input.customFields.filter(
      (f) => f.label?.trim() && f.value?.trim()
    );
  }

  // Status transitions allowed during edit: Initiated <-> Inprogress
  if (input.status && ["Initiated", "Inprogress"].includes(input.status)) {
    data.status = input.status;
  }

  const updated = await prisma.billing.update({
    where: { id },
    data,
  });

  return formatBillingRecord(updated);
}

/**
 * Concurrency-safe atomic approval workflow.
 * Validates the bill, increments the sequence, assigns the next billing number,
 * sets status to 'Approved', and locks the bill against further changes.
 * Uses retry logic to handle MongoDB write conflicts on concurrent approvals.
 */
export async function approveBill(id: string, maxRetries = 25) {
  await ensureBillingIndexes();

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const approved = await prisma.$transaction(
        async (tx) => {
          // 1. Fetch current record
          const current = await tx.billing.findUnique({ where: { id } });
          if (!current) {
            throw new Error(`Bill not found: ${id}`);
          }

          // If already approved, return without re-allocating
          if (current.status === "Approved") {
            return current;
          }

          // 2. Validate billing record and required fields
          if (!current.clientName || !current.clientName.trim()) {
            throw new Error("Client name is required for approval");
          }

          if (!current.items || current.items.length === 0) {
            throw new Error("At least one item is required for approval");
          }

          const hasInvalidItem = current.items.some(
            (item: any) =>
              !item.description?.trim() ||
              Number(item.rate) < 0 ||
              Number(item.quantity) <= 0
          );
          if (hasInvalidItem) {
            throw new Error(
              "All items must have valid description, non-negative rate, and positive quantity"
            );
          }

          // 3. Atomically increment sequential billing counter
          const seqDoc = await tx.billingSequence.upsert({
            where: { name: "billing_number" },
            update: { seq: { increment: 1 } },
            create: { name: "billing_number", seq: 1 },
          });

          const billingNumber = `BILL-${String(seqDoc.seq).padStart(4, "0")}`;

          // 4. Update status and billing number together atomically
          const updated = await tx.billing.update({
            where: { id },
            data: {
              status: "Approved",
              billingNumber,
            },
          });

          return updated;
        },
        {
          maxWait: 10000,
          timeout: 15000,
        }
      );

      return formatBillingRecord(approved);
    } catch (err: any) {
      const isWriteConflict =
        err.code === "P2034" ||
        err.message?.includes("write conflict") ||
        err.message?.includes("deadlock");

      if (isWriteConflict && attempt < maxRetries) {
        // Exponential backoff with jitter
        const delay = Math.floor(Math.random() * 80) + attempt * 40;
        await new Promise((res) => setTimeout(res, delay));
        continue;
      }
      throw err;
    }
  }

  throw new Error("Could not finalize bill approval due to concurrent write conflicts. Please retry.");
}

/**
 * Retrieves a paginated list of bills with optional search and status filtering.
 */
export async function getBillingList({
  page = 1,
  limit = 10,
  search = "",
  status = "ALL",
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  await ensureBillingIndexes();

  const where: any = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (search && search.trim()) {
    const s = search.trim();
    where.OR = [
      { clientName: { contains: s, mode: "insensitive" } },
      { clientEmail: { contains: s, mode: "insensitive" } },
      { billingNumber: { contains: s, mode: "insensitive" } },
      { notes: { contains: s, mode: "insensitive" } },
    ];
  }

  const [total, items, countInitiated, countInprogress, countApproved, totalAll] =
    await Promise.all([
      prisma.billing.count({ where }),
      prisma.billing.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.billing.count({ where: { status: "Initiated" } }),
      prisma.billing.count({ where: { status: "Inprogress" } }),
      prisma.billing.count({ where: { status: "Approved" } }),
      prisma.billing.count(),
    ]);

  return {
    items: items.map(formatBillingRecord),
    total,
    page,
    pageSize: limit,
    totalPages: Math.ceil(total / limit) || 1,
    counts: {
      all: totalAll,
      initiated: countInitiated,
      inprogress: countInprogress,
      approved: countApproved,
    },
  };
}

/**
 * Retrieves a single bill by ID.
 */
export async function getBillingById(id: string) {
  await ensureBillingIndexes();
  const bill = await prisma.billing.findUnique({ where: { id } });
  if (!bill) return null;
  return formatBillingRecord(bill);
}

/**
 * Deletes a bill if it is NOT approved.
 */
export async function deleteBill(id: string) {
  const current = await prisma.billing.findUnique({ where: { id } });
  if (!current) {
    throw new Error("Bill not found");
  }
  if (current.status === "Approved") {
    throw new Error("Approved bills are finalized and cannot be deleted");
  }
  await prisma.billing.delete({ where: { id } });
  return { message: "Bill deleted successfully" };
}
