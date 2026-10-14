"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";

/**
 * Interface representing a single item in a quotation or billing,
 * matching the Prisma 'QuotationItem' type.
 */
export interface IQuotationItem {
  description: string;
  rate: number;
  quantity: number;
  amount: number;
}

/**
 * Interface representing an official quotation,
 * matching the Prisma 'OfficialQuotation' model.
 */
export interface IOfficialQuotation {
  id?: string;
  clientName: string;
  clientEmail?: string | null;
  clientAddress?: string | null;
  address?: string | null;
  items: IQuotationItem[];
  customFields?: { label: string; value: string }[];
  totalAmount: number;
  notes?: string | null;
  status?: "Ready" | "Inprogress" | "Published";
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Interface representing a Billing record,
 * matching the Prisma 'Billing' model.
 */
export interface IBilling {
  id?: string;
  billingNumber?: string | null;
  billing_number?: string | null;
  status: "Initiated" | "Inprogress" | "Approved";
  clientName: string;
  clientEmail?: string | null;
  clientAddress?: string | null;
  items: IQuotationItem[];
  customFields?: { label: string; value: string }[];
  totalAmount: number;
  notes?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Application Home Page Theme Color Palette
 * Harmonized with Aesthetica's warm architectural theme:
 * - Burnt Terracotta / Orange-600 accents (#ea580c)
 * - Deep Charcoal / Midnight Slate-900 typography (#0f172a)
 * - Clean Slate-50 off-white card backgrounds (#f8fafc)
 * - Crisp Slate-200 subtle borders (#e2e8f0)
 */
const THEME = {
  // Brand Warm Accents (from Home Page buttons & badges)
  accent: [234, 88, 12] as [number, number, number], // orange-600 (#ea580c)
  accentDark: [194, 65, 12] as [number, number, number], // orange-700 (#c2410c)
  accentSoft: [255, 247, 237] as [number, number, number], // orange-50 (#fff7ed)
  accentBorder: [254, 215, 170] as [number, number, number], // orange-200 (#fed7aa)

  // Typography & Dark Neutrals (from Home Page dark charcoal text)
  slateDark: [15, 23, 42] as [number, number, number], // slate-900 (#0f172a)
  slateBody: [30, 41, 59] as [number, number, number], // slate-800 (#1e293b)
  slateMuted: [100, 116, 139] as [number, number, number], // slate-500 (#64748b)
  slateLight: [148, 163, 184] as [number, number, number], // slate-400 (#94a3b8)

  // Backgrounds & Clean Borders
  cardBg: [248, 250, 252] as [number, number, number], // slate-50 (#f8fafc)
  borderLight: [226, 232, 240] as [number, number, number], // slate-200 (#e2e8f0)
  borderMuted: [203, 213, 225] as [number, number, number], // slate-300 (#cbd5e1)
  white: [255, 255, 255] as [number, number, number],

  // Status Highlights
  emerald: [21, 128, 61] as [number, number, number], // emerald-700
  emeraldBg: [240, 253, 244] as [number, number, number], // emerald-50
  emeraldBorder: [187, 247, 208] as [number, number, number], // emerald-200
  amber: [180, 83, 9] as [number, number, number], // amber-700
  amberBg: [254, 243, 199] as [number, number, number], // amber-50
  amberBorder: [253, 230, 138] as [number, number, number], // amber-200
};

/**
 * Generates and downloads a professional PDF quotation,
 * styled to match the Aesthetica application home page theme.
 */
export const downloadQuotationPDF = (quotation: IOfficialQuotation) => {
  try {
    const doc = new jsPDF();

    const PAGE_W = 210;
    const MARGIN = 18;
    const CENTER = PAGE_W / 2;
    const RIGHT = PAGE_W - MARGIN;
    const MAX_W = RIGHT - MARGIN; // 174mm usable width

    // Top Brand Accent Stripe
    doc.setFillColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
    doc.rect(0, 0, PAGE_W, 3.5, "F");

    let cursorY = 15;

    /* ================= BRAND NAME & BADGE ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(
      THEME.slateDark[0],
      THEME.slateDark[1],
      THEME.slateDark[2],
    );
    doc.text("MUNNA DECORS", CENTER, cursorY, { align: "center" });
    cursorY += 5.5;

    // Document Type Pill
    const pillText = "OFFICIAL ESTIMATE / QUOTATION";
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    const pillW = doc.getTextWidth(pillText) + 12;
    const pillH = 5.5;
    const pillX = CENTER - pillW / 2;
    const pillY = cursorY - 1;

    doc.setFillColor(
      THEME.accentSoft[0],
      THEME.accentSoft[1],
      THEME.accentSoft[2],
    );
    doc.setDrawColor(
      THEME.accentBorder[0],
      THEME.accentBorder[1],
      THEME.accentBorder[2],
    );
    doc.setLineWidth(0.3);
    doc.roundedRect(pillX, pillY, pillW, pillH, 1.5, 1.5, "FD");

    doc.setTextColor(
      THEME.accentDark[0],
      THEME.accentDark[1],
      THEME.accentDark[2],
    );
    doc.text(pillText, CENTER, cursorY + 2.7, { align: "center" });
    cursorY += 7.5;

    /* ================= TAGLINES ================= */
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );

    const line1 = doc.splitTextToSize(
      "We specialize in custom wooden and steel furniture design and manufacturing.",
      MAX_W,
    );
    doc.text(line1, CENTER, cursorY, { align: "center" });
    cursorY += line1.length * 4;

    const line2 = doc.splitTextToSize(
      "Our services cover everything from furniture polishing and civil work to interior transformations.",
      MAX_W,
    );
    doc.text(line2, CENTER, cursorY, { align: "center" });
    cursorY += line2.length * 4 + 2;

    /* ================= OFFICE ADDRESS ================= */
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(
      THEME.slateLight[0],
      THEME.slateLight[1],
      THEME.slateLight[2],
    );

    const addressText = doc.splitTextToSize(
      "Office: Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (W)",
      MAX_W,
    );
    doc.text(addressText, CENTER, cursorY, { align: "center" });
    cursorY += addressText.length * 3.8 + 2;

    /* ================= HEADER DIVIDER ================= */
    doc.setDrawColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
    doc.setLineWidth(0.7);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);

    cursorY += 1.2;
    doc.setLineWidth(0.2);
    doc.setDrawColor(
      THEME.borderLight[0],
      THEME.borderLight[1],
      THEME.borderLight[2],
    );
    doc.line(MARGIN, cursorY, RIGHT, cursorY);
    cursorY += 5;

    /* ================= CLIENT INFO CARD ================= */
    const labelFs = 8.5;
    const valueFs = 9;
    const dateColX = 130;
    const cardPaddingX = MARGIN + 4;
    const cardValX = cardPaddingX + 22;
    const clientNameMaxW = dateColX - cardValX - 4;
    const fullValMaxW = RIGHT - cardValX - 4;

    const dateValue = quotation.createdAt
      ? new Date(quotation.createdAt)
      : new Date();
    const dateStr = dateValue.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const clientAddress =
      quotation.clientAddress?.trim() ||
      (quotation as any).address?.trim() ||
      quotation.customFields
        ?.find((f) => f.label?.trim().toLowerCase() === "address")
        ?.value?.trim();

    const clientEmail = quotation.clientEmail?.trim();

    // Set rendering font BEFORE splitTextToSize so wrapping matches actual output
    doc.setFont("helvetica", "bold");
    doc.setFontSize(valueFs);

    const clientNameLines = doc.splitTextToSize(
      quotation.clientName || "Valued Client",
      clientNameMaxW,
    );
    const addressLines = clientAddress
      ? doc.splitTextToSize(clientAddress, fullValMaxW)
      : null;
    const emailLines = clientEmail
      ? doc.splitTextToSize(clientEmail, fullValMaxW)
      : null;
    const refLines = quotation.notes
      ? doc.splitTextToSize(quotation.notes, fullValMaxW)
      : null;

    const otherCustomFields = (quotation.customFields || []).filter(
      (field) =>
        !clientAddress || field.label?.trim().toLowerCase() !== "address",
    );

    // Precalculate card height
    let cardContentH = 8; // base top/bottom padding
    cardContentH += Math.max(clientNameLines.length, 1) * 4.8;
    if (addressLines)
      cardContentH += Math.max(addressLines.length, 1) * 4.5 + 1;
    if (emailLines) cardContentH += Math.max(emailLines.length, 1) * 4.2 + 1;
    if (refLines) cardContentH += refLines.length * 4.4 + 1;
    if (otherCustomFields.length > 0) {
      otherCustomFields.forEach((f) => {
        const fLines = doc.splitTextToSize(String(f.value || "-"), fullValMaxW);
        cardContentH += Math.max(fLines.length, 1) * 4.5 + 1;
      });
    }
    const cardHeight = Math.max(cardContentH, 22);

    // Draw Card Background
    doc.setFillColor(THEME.cardBg[0], THEME.cardBg[1], THEME.cardBg[2]);
    doc.setDrawColor(
      THEME.borderLight[0],
      THEME.borderLight[1],
      THEME.borderLight[2],
    );
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, cursorY, MAX_W, cardHeight, 2, 2, "FD");

    // Render contents inside card
    let cardCursorY = cursorY + 5.5;

    // Row 1: Client Name & Date
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text("Client Name:", cardPaddingX, cardCursorY);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(valueFs);
    doc.setTextColor(
      THEME.slateDark[0],
      THEME.slateDark[1],
      THEME.slateDark[2],
    );
    doc.text(clientNameLines, cardValX, cardCursorY);

    // Date (Right Side of Card)
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text("Date:", dateColX, cardCursorY);

    const dateLabelW = doc.getTextWidth("Date:") + 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(valueFs);
    doc.setTextColor(
      THEME.slateDark[0],
      THEME.slateDark[1],
      THEME.slateDark[2],
    );
    doc.text(dateStr, dateColX + dateLabelW, cardCursorY);

    cardCursorY += Math.max(clientNameLines.length, 1) * 4.8 + 1;

    // Row 2: Address (Starts at EXACT same cardValX point as Client Name)
    if (addressLines) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateMuted[0],
        THEME.slateMuted[1],
        THEME.slateMuted[2],
      );
      doc.text("Address:", cardPaddingX, cardCursorY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(valueFs);
      doc.setTextColor(
        THEME.slateDark[0],
        THEME.slateDark[1],
        THEME.slateDark[2],
      );
      doc.text(addressLines, cardValX, cardCursorY);

      cardCursorY += Math.max(addressLines.length, 1) * 4.5 + 1;
    }

    // Row 3: Email (if present)
    if (emailLines) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateMuted[0],
        THEME.slateMuted[1],
        THEME.slateMuted[2],
      );
      doc.text("Email:", cardPaddingX, cardCursorY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(
        THEME.slateBody[0],
        THEME.slateBody[1],
        THEME.slateBody[2],
      );
      doc.text(emailLines, cardValX, cardCursorY);

      cardCursorY += Math.max(emailLines.length, 1) * 4.2 + 1;
    }

    // Ref No / Notes
    if (refLines) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateMuted[0],
        THEME.slateMuted[1],
        THEME.slateMuted[2],
      );
      doc.text("Ref Notes:", cardPaddingX, cardCursorY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(valueFs);
      doc.setTextColor(
        THEME.slateBody[0],
        THEME.slateBody[1],
        THEME.slateBody[2],
      );
      doc.text(refLines, cardValX, cardCursorY);

      cardCursorY += refLines.length * 4.4 + 1;
    }

    // Other Custom Fields
    if (otherCustomFields.length > 0) {
      otherCustomFields.forEach((field) => {
        const fieldLabel = `${field.label}:`;

        // Render label
        doc.setFontSize(labelFs);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(
          THEME.slateMuted[0],
          THEME.slateMuted[1],
          THEME.slateMuted[2],
        );

        doc.text(fieldLabel, cardPaddingX, cardCursorY);

        const customValX = Math.max(
          cardValX,
          cardPaddingX + doc.getTextWidth(fieldLabel) + 2,
        );
        const availableWidth = RIGHT - customValX - 4;

        // Wrap long field values
        doc.setFont("helvetica", "bold");
        doc.setFontSize(valueFs);
        doc.setTextColor(
          THEME.slateDark[0],
          THEME.slateDark[1],
          THEME.slateDark[2],
        );

        const fieldValueLines = doc.splitTextToSize(
          String(field.value || "-"),
          Math.max(availableWidth, 10),
        );

        doc.text(fieldValueLines, customValX, cardCursorY);

        // Move down according to the number of wrapped lines
        cardCursorY += Math.max(fieldValueLines.length, 1) * 4.5 + 1;
      });
    }

    cursorY += cardHeight + 5;

    /* ================= TABLE ================= */
    const items = quotation.items || [];
    const tableRows = items.map((item, index) => [
      index + 1,
      item.description || "N/A",
      `${item.rate || 0} × ${item.quantity || 0}`,
      `Rs. ${(item.amount || 0).toLocaleString("en-IN")}/-`,
    ]);

    autoTable(doc, {
      startY: cursorY,
      head: [["Sr.", "Description", "Rate × Qty", "Amount"]],
      body: tableRows,
      foot: [
        [
          {
            content: "",
            colSpan: 2,
            styles: { lineWidth: 0, fillColor: [255, 255, 255] },
          },
          {
            content: "Grand Total",
            styles: {
              fontStyle: "bold",
              halign: "right",
              fillColor: THEME.accentSoft,
              textColor: THEME.slateDark,
              fontSize: 9.5,
              lineWidth: 0.3,
              lineColor: THEME.accentBorder,
            },
          },
          {
            content: `Rs. ${(quotation.totalAmount || 0).toLocaleString("en-IN")}/-`,
            styles: {
              fontStyle: "bold",
              halign: "right",
              fillColor: THEME.accentSoft,
              textColor: THEME.accentDark,
              fontSize: 10,
              lineWidth: 0.3,
              lineColor: THEME.accentBorder,
            },
          },
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: THEME.slateDark,
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9,
        lineWidth: 0,
        halign: "center",
        valign: "middle",
        cellPadding: { top: 4.5, bottom: 4.5, left: 4, right: 4 },
      },
      footStyles: {
        fillColor: THEME.accentSoft,
        textColor: THEME.slateDark,
        fontStyle: "bold",
        fontSize: 9.5,
        lineWidth: 0.3,
        lineColor: THEME.accentBorder,
      },
      alternateRowStyles: {
        fillColor: THEME.cardBg,
      },
      styles: {
        fontSize: 8.5,
        cellPadding: { top: 4.5, bottom: 4.5, left: 4, right: 4 },
        lineWidth: 0.3,
        lineColor: THEME.borderLight,
        valign: "middle",
        textColor: THEME.slateBody,
      },
      columnStyles: {
        0: {
          cellWidth: 14,
          halign: "center",
          fontStyle: "bold",
          textColor: THEME.slateMuted,
        },
        1: { cellWidth: "auto" },
        2: { cellWidth: 38, halign: "center" },
        3: {
          cellWidth: 40,
          halign: "right",
          fontStyle: "bold",
          textColor: THEME.slateDark,
        },
      },
    });

    /* ================= FOOTER ================= */
    // @ts-ignore
    const lastY = doc.lastAutoTable.finalY;
    let footerY = lastY + 14;

    if (footerY > 260) {
      doc.addPage();
      doc.setFillColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
      doc.rect(0, 0, PAGE_W, 3.5, "F");
      footerY = 24;
    }

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text(
      "Thank you for choosing Munna Decors. We look forward to creating your dream space!",
      MARGIN,
      footerY,
    );

    // Signature block
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(
      THEME.slateDark[0],
      THEME.slateDark[1],
      THEME.slateDark[2],
    );
    doc.text("For MUNNA DECORS", RIGHT, footerY, { align: "right" });

    doc.setDrawColor(
      THEME.borderMuted[0],
      THEME.borderMuted[1],
      THEME.borderMuted[2],
    );
    doc.setLineWidth(0.3);
    doc.line(RIGHT - 50, footerY + 13, RIGHT, footerY + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text("Authorized Signature", RIGHT, footerY + 18, { align: "right" });

    // Bottom page accent border
    doc.setDrawColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, 283, RIGHT, 283);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(
      THEME.slateLight[0],
      THEME.slateLight[1],
      THEME.slateLight[2],
    );
    doc.text(
      "Aesthetica & Munna Decors • Bespoke Interior & Architectural Living",
      CENTER,
      288,
      { align: "center" },
    );

    /* ================= SAVE ================= */
    doc.save(`Quotation-${quotation.clientName || "Export"}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    toast.error("Failed to generate PDF.");
  }
};

/**
 * Generates and downloads an executive PDF bill/invoice,
 * styled to match the Aesthetica application home page theme.
 */
export const downloadBillingPDF = (billing: IBilling) => {
  try {
    const doc = new jsPDF();

    const PAGE_W = 210;
    const MARGIN = 18;
    const CENTER = PAGE_W / 2;
    const RIGHT = PAGE_W - MARGIN;
    const MAX_W = RIGHT - MARGIN; // 174mm usable width

    // Top Brand Accent Stripe
    doc.setFillColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
    doc.rect(0, 0, PAGE_W, 3.5, "F");

    let cursorY = 15;

    /* ================= BRAND NAME & BADGE ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
    doc.text("MUNNA DECORS", CENTER, cursorY, { align: "center" });
    cursorY += 5.5;

    // Document Type Pill
    const pillText = "BILL / INVOICE";
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    const pillW = doc.getTextWidth(pillText) + 12;
    const pillH = 5.5;
    const pillX = CENTER - pillW / 2;
    const pillY = cursorY - 1;

    doc.setFillColor(
      THEME.accentSoft[0],
      THEME.accentSoft[1],
      THEME.accentSoft[2],
    );
    doc.setDrawColor(
      THEME.accentBorder[0],
      THEME.accentBorder[1],
      THEME.accentBorder[2],
    );
    doc.setLineWidth(0.3);
    doc.roundedRect(pillX, pillY, pillW, pillH, 1.5, 1.5, "FD");

    doc.setTextColor(
      THEME.accentDark[0],
      THEME.accentDark[1],
      THEME.accentDark[2],
    );
    doc.text(pillText, CENTER, cursorY + 2.7, { align: "center" });
    cursorY += 7.5;

    /* ================= TAGLINE ================= */
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );

    const line1 = doc.splitTextToSize(
      "We specialize in custom wooden and steel furniture design and manufacturing.",
      MAX_W,
    );
    doc.text(line1, CENTER, cursorY, { align: "center" });
    cursorY += line1.length * 4;

    const line2 = doc.splitTextToSize(
      "Our services cover everything from furniture polishing and civil work to interior transformations.",
      MAX_W,
    );
    doc.text(line2, CENTER, cursorY, { align: "center" });
    cursorY += line2.length * 4 + 2;
    // doc.setFont("helvetica", "italic");
    // doc.setFontSize(8);
    // doc.setTextColor(
    //   THEME.slateMuted[0],
    //   THEME.slateMuted[1],
    //   THEME.slateMuted[2],
    // );

    // const line1 = doc.splitTextToSize(
    //   "Custom Wooden & Steel Furniture Manufacturing, Furniture Polishing, Civil Works, and Interior Design Services.",
    //   MAX_W,
    // );
    // doc.text(line1, CENTER, cursorY, { align: "center" });
    // cursorY += line1.length * 4 + 1.5;

    /* ================= OFFICE ADDRESS (HEADER) ================= */
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(
      THEME.slateLight[0],
      THEME.slateLight[1],
      THEME.slateLight[2],
    );

    const headerAddrText = doc.splitTextToSize(
      "Office: Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (W)",
      MAX_W,
    );
    doc.text(headerAddrText, CENTER, cursorY, { align: "center" });
    cursorY += headerAddrText.length * 3.8 + 2;

    /* ================= HEADER DIVIDER ================= */
    doc.setDrawColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
    doc.setLineWidth(0.7);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);

    cursorY += 1.2;
    doc.setLineWidth(0.2);
    doc.setDrawColor(
      THEME.borderLight[0],
      THEME.borderLight[1],
      THEME.borderLight[2],
    );
    doc.line(MARGIN, cursorY, RIGHT, cursorY);
    cursorY += 5;

    /* ================= BILL META & CLIENT CARD ================= */
    const labelFs = 8.5;
    const valueFs = 9;
    const LEFT_VAL_X = MARGIN + 26;
    const LEFT_MAX_W = 92;

    const bNum =
      billing.billingNumber || billing.billing_number || "PENDING APPROVAL";
    const isApproved = billing.status === "Approved";

    const dateValue = billing.createdAt
      ? new Date(billing.createdAt)
      : new Date();
    const dateStr = dateValue.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const clientAddress =
      billing.clientAddress?.trim() ||
      billing.customFields
        ?.find((f) => f.label?.trim().toLowerCase() === "address")
        ?.value?.trim();

    const clientNameLines = doc.splitTextToSize(
      billing.clientName || "Valued Client",
      LEFT_MAX_W,
    );
    const bNumLines = doc.splitTextToSize(bNum, LEFT_MAX_W);
    const addressLines = clientAddress
      ? doc.splitTextToSize(clientAddress, LEFT_MAX_W)
      : null;
    const emailLines = billing.clientEmail
      ? doc.splitTextToSize(billing.clientEmail, LEFT_MAX_W)
      : null;
    const notesLines = billing.notes
      ? doc.splitTextToSize(billing.notes, MAX_W - 30)
      : null;

    const otherCustomFields = (billing.customFields || []).filter(
      (field) =>
        !clientAddress || field.label?.trim().toLowerCase() !== "address",
    );

    // Precalculate card height to render a clean background container
    let cardContentH = 8;
    cardContentH += Math.max(clientNameLines.length, 1) * 4.6 + 1;
    cardContentH += Math.max(bNumLines.length, 1) * 4.6 + 1;
    if (addressLines)
      cardContentH += Math.max(addressLines.length, 1) * 4.2 + 1;
    if (emailLines) cardContentH += Math.max(emailLines.length, 1) * 4.2 + 1;
    if (notesLines) cardContentH += notesLines.length * 4.2 + 1;
    if (otherCustomFields.length)
      cardContentH += otherCustomFields.length * 4.8;

    const cardHeight = Math.max(cardContentH, 26);

    // Render Card Container
    doc.setFillColor(THEME.cardBg[0], THEME.cardBg[1], THEME.cardBg[2]);
    doc.setDrawColor(
      THEME.borderLight[0],
      THEME.borderLight[1],
      THEME.borderLight[2],
    );
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, cursorY, MAX_W, cardHeight, 2, 2, "FD");

    let cardCursorY = cursorY + 5.5;
    const cardPaddingX = MARGIN + 4;
    const cardValX = cardPaddingX + 22;

    /* ---- DATE & STATUS (TOP RIGHT OF CARD) ---- */
    const rightColX = 136;
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text("Date:", rightColX, cardCursorY);

    doc.setFontSize(valueFs);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(
      THEME.slateDark[0],
      THEME.slateDark[1],
      THEME.slateDark[2],
    );
    doc.text(dateStr, rightColX + 12, cardCursorY);

    // Status Pill on top right
    // const statusText = isApproved
    //   ? "APPROVED"
    //   : billing.status === "Inprogress"
    //     ? "IN PROGRESS"
    //     : "INITIATED";

    // doc.setFontSize(7.5);
    // doc.setFont("helvetica", "bold");
    // const stW = doc.getTextWidth(statusText) + 8;
    // const stH = 5;
    // const stX = RIGHT - 4 - stW;
    // const stY = cardCursorY - 3.8;

    // if (isApproved) {
    //   doc.setFillColor(
    //     THEME.emeraldBg[0],
    //     THEME.emeraldBg[1],
    //     THEME.emeraldBg[2],
    //   );
    //   doc.setDrawColor(
    //     THEME.emeraldBorder[0],
    //     THEME.emeraldBorder[1],
    //     THEME.emeraldBorder[2],
    //   );
    //   doc.roundedRect(stX, stY, stW, stH, 1.2, 1.2, "FD");
    //   doc.setTextColor(THEME.emerald[0], THEME.emerald[1], THEME.emerald[2]);
    // } else if (billing.status === "Inprogress") {
    //   doc.setFillColor(THEME.amberBg[0], THEME.amberBg[1], THEME.amberBg[2]);
    //   doc.setDrawColor(
    //     THEME.amberBorder[0],
    //     THEME.amberBorder[1],
    //     THEME.amberBorder[2],
    //   );
    //   doc.roundedRect(stX, stY, stW, stH, 1.2, 1.2, "FD");
    //   doc.setTextColor(THEME.amber[0], THEME.amber[1], THEME.amber[2]);
    // } else {
    //   doc.setFillColor(THEME.cardBg[0], THEME.cardBg[1], THEME.cardBg[2]);
    //   doc.setDrawColor(
    //     THEME.borderLight[0],
    //     THEME.borderLight[1],
    //     THEME.borderLight[2],
    //   );
    //   doc.roundedRect(stX, stY, stW, stH, 1.2, 1.2, "FD");
    //   doc.setTextColor(
    //     THEME.slateMuted[0],
    //     THEME.slateMuted[1],
    //     THEME.slateMuted[2],
    //   );
    // }
    // doc.text(statusText, stX + 4, cardCursorY - 0.2);

    /* ---- CLIENT NAME ---- */
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text("Billed To:", cardPaddingX, cardCursorY);

    doc.setFontSize(valueFs);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(
      THEME.slateDark[0],
      THEME.slateDark[1],
      THEME.slateDark[2],
    );
    doc.text(clientNameLines, cardValX, cardCursorY);

    cardCursorY += Math.max(clientNameLines.length, 1) * 4.6 + 1;

    /* ---- BILL NUMBER ---- */
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text("Bill No:", cardPaddingX, cardCursorY);

    doc.setFontSize(valueFs);
    doc.setFont("helvetica", "bold");
    if (isApproved) {
      doc.setTextColor(
        THEME.accentDark[0],
        THEME.accentDark[1],
        THEME.accentDark[2],
      );
    } else {
      doc.setTextColor(
        THEME.slateMuted[0],
        THEME.slateMuted[1],
        THEME.slateMuted[2],
      );
    }
    doc.text(bNumLines, cardValX, cardCursorY);

    cardCursorY += Math.max(bNumLines.length, 1) * 4.6 + 1;

    /* ---- ADDRESS ---- */
    if (addressLines) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateMuted[0],
        THEME.slateMuted[1],
        THEME.slateMuted[2],
      );
      doc.text("Address:", cardPaddingX, cardCursorY);

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateBody[0],
        THEME.slateBody[1],
        THEME.slateBody[2],
      );
      doc.text(addressLines, cardValX, cardCursorY);

      cardCursorY += Math.max(addressLines.length, 1) * 4.2 + 1;
    }

    /* ---- EMAIL ---- */
    if (emailLines) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateMuted[0],
        THEME.slateMuted[1],
        THEME.slateMuted[2],
      );
      doc.text("Email:", cardPaddingX, cardCursorY);

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateBody[0],
        THEME.slateBody[1],
        THEME.slateBody[2],
      );
      doc.text(emailLines, cardValX, cardCursorY);

      cardCursorY += Math.max(emailLines.length, 1) * 4.2 + 1;
    }

    /* ---- NOTES ---- */
    if (notesLines) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateMuted[0],
        THEME.slateMuted[1],
        THEME.slateMuted[2],
      );
      doc.text("Notes:", cardPaddingX, cardCursorY);

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(
        THEME.slateBody[0],
        THEME.slateBody[1],
        THEME.slateBody[2],
      );
      doc.text(notesLines, cardValX, cardCursorY);

      cardCursorY += notesLines.length * 4.2 + 1;
    }

    /* ---- OTHER CUSTOM FIELDS ---- */
    if (otherCustomFields.length) {
      otherCustomFields.forEach((field) => {
        doc.setFontSize(labelFs);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(
          THEME.slateMuted[0],
          THEME.slateMuted[1],
          THEME.slateMuted[2],
        );
        const fLabel = `${field.label}:`;
        doc.text(fLabel, cardPaddingX, cardCursorY);

        const customValX = Math.max(
          cardValX,
          cardPaddingX + doc.getTextWidth(fLabel) + 2,
        );
        doc.setFontSize(valueFs);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(
          THEME.slateDark[0],
          THEME.slateDark[1],
          THEME.slateDark[2],
        );
        doc.text(String(field.value || "-"), customValX, cardCursorY);

        cardCursorY += 4.8;
      });
    }

    cursorY += cardHeight + 5;

    /* ================= TABLE ================= */
    const items = billing.items || [];
    const tableRows = items.map((item, index) => [
      index + 1,
      item.description || "N/A",
      `${item.rate || 0} × ${item.quantity || 0}`,
      `Rs. ${(item.amount || 0).toLocaleString("en-IN")}/-`,
    ]);

    autoTable(doc, {
      startY: cursorY,
      head: [["Sr.", "Item Description", "Rate × Qty", "Amount"]],
      body: tableRows,
      foot: [
        [
          {
            content: "",
            colSpan: 2,
            styles: {
              lineWidth: 0,
              fillColor: [255, 255, 255],
            },
          },
          {
            content: "Grand Total",
            styles: {
              fontStyle: "bold",
              halign: "right",
              fillColor: THEME.accentSoft,
              textColor: THEME.slateDark,
              fontSize: 9.5,
              lineWidth: 0.3,
              lineColor: THEME.accentBorder,
            },
          },
          {
            content: `Rs. ${(billing.totalAmount || 0).toLocaleString("en-IN")}/-`,
            styles: {
              fontStyle: "bold",
              halign: "right",
              fillColor: THEME.accentSoft,
              textColor: THEME.accentDark,
              fontSize: 10,
              lineWidth: 0.3,
              lineColor: THEME.accentBorder,
            },
          },
        ],
      ],
      theme: "grid",
      headStyles: {
        fillColor: THEME.accent,
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9,
        lineWidth: 0,
        halign: "center",
        valign: "middle",
        cellPadding: {
          top: 4.5,
          bottom: 4.5,
          left: 4,
          right: 4,
        },
      },
      footStyles: {
        fillColor: THEME.accentSoft,
        textColor: THEME.slateDark,
        fontStyle: "bold",
        fontSize: 9.5,
        lineWidth: 0.3,
        lineColor: THEME.accentBorder,
      },
      alternateRowStyles: {
        fillColor: THEME.cardBg,
      },
      styles: {
        fontSize: 8.5,
        cellPadding: {
          top: 4.5,
          bottom: 4.5,
          left: 4,
          right: 4,
        },
        lineWidth: 0.3,
        lineColor: THEME.borderLight,
        valign: "middle",
        textColor: THEME.slateBody,
      },
      columnStyles: {
        0: {
          cellWidth: 14,
          halign: "center",
          fontStyle: "bold",
          textColor: THEME.slateMuted,
        },
        1: {
          cellWidth: "auto",
        },
        2: {
          cellWidth: 38,
          halign: "center",
        },
        3: {
          cellWidth: 40,
          halign: "right",
          fontStyle: "bold",
          textColor: THEME.slateDark,
        },
      },
    });

    /* ================= FOOTER ================= */
    // @ts-ignore
    const lastY = doc.lastAutoTable.finalY;
    let footerY = lastY + 14;

    if (footerY > 260) {
      doc.addPage();
      doc.setFillColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
      doc.rect(0, 0, PAGE_W, 3.5, "F");
      footerY = 24;
    }

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text(
      "Thank you for your business! Please retain this bill for your official records.",
      MARGIN,
      footerY,
    );

    /* ================= SIGNATURE ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(
      THEME.slateDark[0],
      THEME.slateDark[1],
      THEME.slateDark[2],
    );
    doc.text("For MUNNA DECORS", RIGHT, footerY, {
      align: "right",
    });

    doc.setDrawColor(
      THEME.borderMuted[0],
      THEME.borderMuted[1],
      THEME.borderMuted[2],
    );
    doc.setLineWidth(0.3);
    doc.line(RIGHT - 50, footerY + 13, RIGHT, footerY + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(
      THEME.slateMuted[0],
      THEME.slateMuted[1],
      THEME.slateMuted[2],
    );
    doc.text("Authorized Signatory", RIGHT, footerY + 18, { align: "right" });

    /* ================= BOTTOM BORDER & TAGLINE ================= */
    doc.setDrawColor(THEME.accent[0], THEME.accent[1], THEME.accent[2]);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, 283, RIGHT, 283);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(
      THEME.slateLight[0],
      THEME.slateLight[1],
      THEME.slateLight[2],
    );
    doc.text(
      "Aesthetica & Munna Decors • Bespoke Interior & Architectural Living",
      CENTER,
      288,
      { align: "center" },
    );

    /* ================= SAVE PDF ================= */
    const safeFilename = (
      bNum !== "PENDING APPROVAL"
        ? bNum
        : `Invoice-${billing.clientName || "Bill"}`
    ).replace(/[^a-zA-Z0-9_-]/g, "_");

    doc.save(`${safeFilename}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    toast.error("Failed to generate PDF.");
  }
};
