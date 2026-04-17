import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendCustomerQuotation, sendReframedResponse } from "@/lib/nodemailer";

const mapAttendanceStatus = (s: string) => {
  if (s === '1.5_days') return 'one_five_days';
  if (s === '2_days') return 'two_days';
  return s as any;
}

export async function GET(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug } = await params;
    if (!slug || slug.length === 0) return NextResponse.json({ error: "Endpoint required" }, { status: 400 });

    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);

    // 1. Attendance Routing
    if (slug[0] === 'attendance') {
      if (slug[1] === 'settings') {
        let fullDayHours = await prisma.settings.findUnique({ where: { key: "FULL_DAY_HOURS" } });
        if (!fullDayHours) fullDayHours = await prisma.settings.create({ data: { key: "FULL_DAY_HOURS", value: 9 } });
        return NextResponse.json(fullDayHours);
      }

      if (slug[1] === 'summary') {
        const month = parseInt(searchParams.get("month") || "");
        const year = parseInt(searchParams.get("year") || "");
        if (isNaN(month) || isNaN(year)) return NextResponse.json({ error: "Month/Year required" }, { status: 400 });
        const settings = await prisma.settings.findUnique({ where: { key: "FULL_DAY_HOURS" } });
        const fullDayHours = (settings?.value as number) || 9;
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999);
        const [employees, records] = await Promise.all([
          prisma.employee.findMany({ where: { status: "active" } }),
          prisma.attendance.findMany({ where: { date: { gte: startDate, lte: endDate } } })
        ]);
        const summary = employees.map(emp => {
          const empRecords = records.filter(r => r.employeeId === emp.id);
          const details = {
            fullDays: empRecords.filter(r => r.status === 'full' || r.status === 'full_day').length,
            halfDays: empRecords.filter(r => r.status === 'half' || r.status === 'half_day').length,
            oneFiveDays: empRecords.filter(r => r.status === 'one_five_days').length,
            twoDays: empRecords.filter(r => r.status === 'two_days').length,
            holidays: empRecords.filter(r => r.status === 'holiday').length,
            absents: empRecords.filter(r => r.status === 'absent').length,
            hourlyHours: empRecords.filter(r => r.status === 'hourly').reduce((sum, r) => sum + (r.hours || 0), 0)
          };
          const totalPayableDays = details.fullDays + (details.halfDays * 0.5) + (details.oneFiveDays * 1.5) + (details.twoDays * 2.0) + (details.hourlyHours / fullDayHours);
          return { employeeId: emp.id, name: `${emp.firstName} ${emp.lastName}`, designation: emp.designation, details, totalPayableDays: parseFloat(totalPayableDays.toFixed(2)) };
        });
        return NextResponse.json({ summary, month, year, fullDayHours });
      }

      // Base Attendance GET
      const dateStr = searchParams.get("date");
      const employeeId = searchParams.get("employeeId");
      const startDateStr = searchParams.get("startDate");
      const endDateStr = searchParams.get("endDate");
      const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : null;
      const limit = parseInt(searchParams.get("limit") || "10");
      let where: any = {};
      if (dateStr) {
        const date = new Date(dateStr); date.setHours(0,0,0,0);
        const nextDay = new Date(date); nextDay.setDate(date.getDate()+1);
        where.date = { gte: date, lt: nextDay };
      } else if (startDateStr && endDateStr) {
        const start = new Date(startDateStr); start.setHours(0,0,0,0);
        const end = new Date(endDateStr); end.setHours(23,59,59,999);
        where.date = { gte: start, lte: end };
      }
      if (employeeId) where.employeeId = employeeId;
      if (page !== null) {
        const [at, count] = await Promise.all([prisma.attendance.findMany({ where, orderBy: { date: 'desc' }, skip: (page-1)*limit, take: limit }), prisma.attendance.count({ where })]);
        return NextResponse.json({ attendance: at, totalRecords: count, totalPages: Math.ceil(count/limit), currentPage: page });
      }
      return NextResponse.json(await prisma.attendance.findMany({ where, orderBy: { date: 'desc' } }));
    }

    // 2. Employees Routing
    if (slug[0] === 'employees') {
      const search = searchParams.get("search") || "";
      const status = searchParams.get("status") || "";
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      let where: any = {};
      if (search) where.OR = [{ firstName: { contains: search, mode: 'insensitive' } }, { lastName: { contains: search, mode: 'insensitive' } }];
      if (status) where.status = status;
      const [emp, count] = await Promise.all([prisma.employee.findMany({ where, orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }], skip: (page-1)*limit, take: limit }), prisma.employee.count({ where })]);
      return NextResponse.json({ employees: emp, totalEmployees: count, totalPages: Math.ceil(count/limit), currentPage: page });
    }

    // 3. Official Quotations
    if (slug[0] === 'official-quotations') {
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const [total, q] = await Promise.all([prisma.officialQuotation.count(), prisma.officialQuotation.findMany({ orderBy: { createdAt: 'desc' }, skip: (page-1)*limit, take: limit })]);
      return NextResponse.json({ items: q, total, page, pageSize: limit, totalPages: Math.ceil(total/limit) });
    }

    // 4. Reviews Moderate
    if (slug[0] === 'reviews') {
      const status = searchParams.get("status") || "pending";
      const revs = await prisma.review.findMany({
        where: status !== "all" ? { status: status as any } : {},
        include: { user: { select: { name: true, email: true } }, product: { select: { title: true } } },
        orderBy: { createdAt: "desc" }
      });
      return NextResponse.json(revs);
    }

    return NextResponse.json({ error: "Invalid admin endpoint" }, { status: 404 });
  } catch (error: any) {
    console.error("Admin GET error:", error);
    return NextResponse.json({ error: "Internal Error", details: error.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();

    // Setup User is public but secret key protected
    if (slug?.[0] === 'setup-user') {
      const { name, email, role, secretKey } = body;
      const expectedKey = process.env.ADMIN_SETUP_KEY || "architect_secret_99";
      if (secretKey !== expectedKey) return NextResponse.json({ error: "Invalid secret key" }, { status: 401 });
      const user = await prisma.user.upsert({ where: { email }, update: { name, role: role || "admin" }, create: { email, name, role: role || "admin" } });
      return NextResponse.json({ message: "User setup", user });
    }

    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (slug?.[0] === 'attendance') {
      if (slug[1] === 'settings') {
        const { value } = body;
        return NextResponse.json(await prisma.settings.upsert({ where: { key: "FULL_DAY_HOURS" }, update: { value }, create: { key: "FULL_DAY_HOURS", value } }));
      }
      const { employeeId, date, status, hours, remarks, wages } = body;
      let [year, month, day] = date.includes('T') ? date.split('T')[0].split('-') : date.includes('/') ? date.split(',')[0].trim().split('/').reverse() : date.split('-');
      const d = new Date(Number(year), Number(month)-1, Number(day)); d.setHours(0,0,0,0);
      return NextResponse.json(await prisma.attendance.upsert({ where: { employeeId_date: { employeeId, date: d } }, update: { status: mapAttendanceStatus(status), hours, remarks, wages }, create: { employeeId, date: d, status: mapAttendanceStatus(status), hours, remarks, wages } }));
    }

    if (slug?.[0] === 'employees') {
      const { joiningDate, ...rest } = body;
      return NextResponse.json(await prisma.employee.create({ data: { ...rest, joiningDate: joiningDate ? new Date(joiningDate) : new Date() } }), { status: 201 });
    }

    if (slug?.[0] === 'official-quotations') {
      const { clientName, clientEmail, items, customFields, totalAmount, notes } = body;
      const q = await prisma.officialQuotation.create({ data: { clientName, clientEmail, items, customFields, totalAmount, notes } });
      if (clientEmail) await sendCustomerQuotation(clientEmail, clientName, items, totalAmount, notes, customFields);
      return NextResponse.json(q, { status: 201 });
    }

    if (slug?.[0] === 'quotation' && slug?.[1] === 'reframe') {
      const { quotationId, reframedMessage } = body;
      const q = await prisma.quotation.findUnique({ where: { id: quotationId }, include: { user: { select: { name: true, email: true } } } });
      if (!q) return NextResponse.json({ error: "Not found" }, { status: 404 });
      await sendReframedResponse(q.email || (q as any).user?.email, q.name || (q as any).user?.name, q.message, reframedMessage);
      const updated = await prisma.quotation.update({ where: { id: quotationId }, data: { status: "reviewed" } });
      return NextResponse.json({ success: true, quotation: updated });
    }

    return NextResponse.json({ error: "Invalid POST endpoint" }, { status: 404 });
  } catch (error: any) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    if (!slug || slug.length < 2) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const id = slug[1];
    const body = await req.json();

    if (slug[0] === 'employees') {
      const { joiningDate, ...rest } = body;
      return NextResponse.json(await prisma.employee.update({ where: { id }, data: { ...rest, joiningDate: joiningDate ? new Date(joiningDate) : undefined } }));
    }

    return NextResponse.json({ error: "Invalid PUT endpoint" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    if (!slug || slug.length < 2) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const id = slug[1];
    const { status } = await req.json();

    if (slug[0] === 'reviews') {
       if (!["approved", "rejected"].includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
       return NextResponse.json(await prisma.review.update({ where: { id }, data: { status, approvedAt: status === "approved" ? new Date() : null } }));
    }

    return NextResponse.json({ error: "Invalid PATCH endpoint" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  try {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    if (!slug || slug.length < 2) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const id = slug[1];
    if (slug[0] === 'employees') {
       await prisma.employee.delete({ where: { id } });
       return NextResponse.json({ message: "Deleted" });
    }
    if (slug[0] === 'reviews') {
       await prisma.review.delete({ where: { id } });
       return NextResponse.json({ message: "Deleted" });
    }

    return NextResponse.json({ error: "Invalid DELETE endpoint" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
