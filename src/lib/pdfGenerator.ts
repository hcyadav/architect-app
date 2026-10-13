"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";

/**
 * Interface representing a single item in a quotation,
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
  items: IQuotationItem[];
  customFields?: { label: string; value: string }[];
  totalAmount: number;
  notes?: string | null;
  status?: "Ready" | "Inprogress" | "Published";
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

/**
 * Generates and downloads a professional PDF quotation.
 * Updated to support Prisma-based data structures.
 */
export const downloadQuotationPDF = (quotation: IOfficialQuotation) => {
  try {
    const doc = new jsPDF();

    const PAGE_W = 210;
    const MARGIN = 20;
    const CENTER = PAGE_W / 2;
    const RIGHT = PAGE_W - MARGIN;
    const MAX_W = RIGHT - MARGIN; // 170mm usable width

    let cursorY = 16;

    /* ================= BRAND NAME ================= */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(112, 70, 46);
    doc.text("MUNNA DECORS", CENTER, cursorY, { align: "center" });
    cursorY += 7;

    /* ================= TAGLINE LINE 1 ================= */

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);

    const line1 = doc.splitTextToSize(
      "We specialize in custom wooden and steel furniture design and manufacturing.",
      MAX_W,
    );
    doc.text(line1, CENTER, cursorY, { align: "center" });
    cursorY += line1.length * 4.5;

    /* ================= TAGLINE LINE 2 ================= */

    const line2 = doc.splitTextToSize(
      "Our services cover everything from furniture polishing and plumbing to painting and complete civil work — delivering reliable, high-quality solutions for both residential and commercial spaces.",
      MAX_W,
    );
    doc.text(line2, CENTER, cursorY, { align: "center" });
    cursorY += line2.length * 4.5 + 4;

    /* ================= HEADER DIVIDER ================= */

    doc.setDrawColor(112, 70, 46);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);
    cursorY += 1.5;
    doc.setLineWidth(0.2);
    doc.setDrawColor(200, 180, 160);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);
    cursorY += 5;

    /* ================= ADDRESS ================= */

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);

    const addressText = doc.splitTextToSize(
      "Office Address: Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (W)",
      MAX_W,
    );
    doc.text(addressText, CENTER, cursorY, { align: "center" });
    cursorY += addressText.length * 4.5 + 4;

    /* ================= SECTION DIVIDER ================= */

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);
    cursorY += 8;

    /* ================= CLIENT INFO ================= */

    const labelFs = 9.5;
    const valueFs = 9.5;
    const ROW_H = 8;

    // Row 1: Client Name | Date (fixed right column so they never collide)
    const dateColX = 130;
    const clientNameMaxW = dateColX - MARGIN - 40; // safe width before date column

    // -- Client Name label
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Client Name:", MARGIN, cursorY);

    const clientLabelW = doc.getTextWidth("Client Name:") + 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(valueFs);
    doc.setTextColor(30, 30, 30);

    const clientNameLines = doc.splitTextToSize(
      quotation.clientName || "N/A",
      clientNameMaxW,
    );
    doc.text(clientNameLines, MARGIN + clientLabelW, cursorY);

    // -- Date label + value
    const dateValue = quotation.createdAt
      ? new Date(quotation.createdAt)
      : new Date();
    const dateStr = dateValue.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Date:", dateColX, cursorY);

    const dateLabelW = doc.getTextWidth("Date:") + 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(valueFs);
    doc.setTextColor(30, 30, 30);
    doc.text(dateStr, dateColX + dateLabelW, cursorY);

    // Advance by however many lines client name wrapped to
    cursorY += Math.max(clientNameLines.length, 1) * ROW_H;

    // Row 2: Ref No (Using notes as Ref No if available)
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Ref No:", MARGIN, cursorY);

    const refLabelW = doc.getTextWidth("Ref No:") + 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(valueFs);
    doc.setTextColor(30, 30, 30);

    // Split text to fit within page width
    const refLines = doc.splitTextToSize(
      quotation.notes || "-",
      MAX_W - refLabelW,
    );
    doc.text(refLines, MARGIN + refLabelW, cursorY);

    cursorY += Math.max(refLines.length, 1) * ROW_H;

    /* ================= CUSTOM FIELDS ================= */
    if (quotation.customFields && quotation.customFields.length > 0) {
      quotation.customFields.forEach((field) => {
        doc.setFontSize(labelFs);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(`${field.label}:`, MARGIN, cursorY);

        const fieldLabelW = doc.getTextWidth(`${field.label}:`) + 2;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(valueFs);
        doc.setTextColor(30, 30, 30);

        // Calculate available width for the value
        const availableW = MAX_W - fieldLabelW;
        const fieldValueLines = doc.splitTextToSize(
          field.value || "-",
          availableW,
        );
        doc.text(fieldValueLines, MARGIN + fieldLabelW, cursorY);

        // Advance cursor based on lines
        cursorY += Math.max(fieldValueLines.length, 1) * ROW_H;
      });
    }

    cursorY += 2;

    /* ================= TABLE DIVIDER ================= */

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);
    cursorY += 6;

    /* ================= TABLE ================= */

    const items = quotation.items || [];

    const tableRows = items.map((item, index) => [
      index + 1,
      item.description || "N/A",
      `${item.rate || 0} × ${item.quantity || 0}`,
      `Rs. ${(item.amount || 0).toLocaleString()}/-`,
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
            content: "Total Amount",
            styles: {
              fontStyle: "bold",
              halign: "right",
              fillColor: [240, 240, 240],
            },
          },
          {
            content: `Rs. ${(quotation.totalAmount || 0).toLocaleString()}/-`,
            styles: {
              fontStyle: "bold",
              halign: "right",
              fillColor: [240, 240, 240],
            },
          },
        ],
      ],
      theme: "grid",

      headStyles: {
        fillColor: [112, 70, 46],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9.5,
        lineWidth: 0,
        halign: "center",
        valign: "middle",
        cellPadding: { top: 5, bottom: 5, left: 4, right: 4 },
      },

      footStyles: {
        fillColor: [240, 240, 240],
        textColor: 30,
        fontStyle: "bold",
        fontSize: 9.5,
        lineWidth: 0.4,
        lineColor: [180, 180, 180],
      },

      alternateRowStyles: {
        fillColor: [252, 248, 245],
      },

      styles: {
        fontSize: 9,
        cellPadding: { top: 5, bottom: 5, left: 4, right: 4 },
        lineWidth: 0.3,
        lineColor: [200, 200, 200],
        valign: "middle",
        textColor: [40, 40, 40],
      },

      columnStyles: {
        0: { cellWidth: 14, halign: "center", fontStyle: "bold" },
        1: { cellWidth: "auto" },
        2: { cellWidth: 40, halign: "center" },
        3: { cellWidth: 38, halign: "right" },
      },
    });

    /* ================= FOOTER ================= */

    // @ts-ignore
    const lastY = doc.lastAutoTable.finalY;
    const footerY = lastY + 16;

    // Thank you note
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Thank you for choosing Munna Decors. We look forward to serving you!",
      MARGIN,
      footerY,
    );

    // Signature block
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);
    doc.text("For MUNNA DECORS", RIGHT, footerY, { align: "right" });

    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.3);
    doc.line(RIGHT - 50, footerY + 14, RIGHT, footerY + 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    doc.text("Authorized Signature", RIGHT, footerY + 19, { align: "right" });

    // Bottom border
    doc.setDrawColor(112, 70, 46);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, 285, RIGHT, 285);

    /* ================= SAVE ================= */

    doc.save(`Quotation-${quotation.clientName || "Export"}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    toast.error("Failed to generate PDF.");
  }
};

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
 * Generates and downloads a professional PDF bill/invoice.
 */
// export const downloadBillingPDF = (billing: IBilling) => {
//   try {
//     const doc = new jsPDF();

//     const PAGE_W = 210;
//     const MARGIN = 20;
//     const CENTER = PAGE_W / 2;
//     const RIGHT = PAGE_W - MARGIN;
//     const MAX_W = RIGHT - MARGIN;

//     let cursorY = 16;

//     /* ================= BRAND NAME ================= */
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(24);
//     doc.setTextColor(112, 70, 46);
//     doc.text("MUNNA DECORS", CENTER, cursorY, { align: "center" });
//     cursorY += 6;

//     /* ================= DOCUMENT TYPE ================= */
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(11);
//     doc.setTextColor(40, 40, 40);
//     doc.text("TAX INVOICE / BILL", CENTER, cursorY, { align: "center" });
//     cursorY += 6;

//     /* ================= TAGLINE ================= */
//     doc.setFont("helvetica", "italic");
//     doc.setFontSize(8.5);
//     doc.setTextColor(100, 100, 100);
//     const line1 = doc.splitTextToSize(
//       "Custom wooden & steel furniture design, polishing, civil & interior works.",
//       MAX_W,
//     );
//     doc.text(line1, CENTER, cursorY, { align: "center" });
//     cursorY += line1.length * 4.5 + 1;

//     /* ================= OFFICE ADDRESS (HEADER) ================= */
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8);
//     doc.setTextColor(120, 120, 120);
//     const headerAddrText = doc.splitTextToSize(
//       "Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (W)",
//       MAX_W,
//     );
//     doc.text(headerAddrText, CENTER, cursorY, { align: "center" });
//     cursorY += headerAddrText.length * 4 + 2;

//     /* ================= HEADER DIVIDER ================= */
//     doc.setDrawColor(112, 70, 46);
//     doc.setLineWidth(0.8);
//     doc.line(MARGIN, cursorY, RIGHT, cursorY);
//     cursorY += 1.5;
//     doc.setLineWidth(0.2);
//     doc.setDrawColor(200, 180, 160);
//     doc.line(MARGIN, cursorY, RIGHT, cursorY);
//     cursorY += 6;

//     /* ================= BILL META & CLIENT INFO ================= */
//     const labelFs = 9;
//     const valueFs = 9.5;
//     const ROW_H = 7;
//     const LEFT_VAL_X = MARGIN + 22;
//     const LEFT_MAX_W = 95; // max width for left-column values (stops before right column)

//     const bNum =
//       billing.billingNumber || billing.billing_number || "PENDING APPROVAL";

//     // Date — top-right on first row
//     const dateValue = billing.createdAt
//       ? new Date(billing.createdAt)
//       : new Date();
//     const dateStr = dateValue.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//     doc.setFontSize(labelFs);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(100, 100, 100);
//     doc.text("Date:", 128, cursorY);
//     doc.setFontSize(valueFs);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(30, 30, 30);
//     doc.text(dateStr, 143, cursorY);

//     // Row 1: Billed To
//     doc.setFontSize(labelFs);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(100, 100, 100);
//     doc.text("Billed To:", MARGIN, cursorY);
//     doc.setFontSize(valueFs);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(30, 30, 30);
//     const clientNameLines = doc.splitTextToSize(
//       billing.clientName || "N/A",
//       LEFT_MAX_W,
//     );
//     doc.text(clientNameLines, LEFT_VAL_X, cursorY);
//     cursorY += Math.max(clientNameLines.length, 1) * 4.5 + 1;

//     // Row 2: Bill Number
//     doc.setFontSize(labelFs);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(100, 100, 100);
//     doc.text("Bill No:", MARGIN, cursorY);
//     doc.setFontSize(valueFs);
//     doc.setFont("helvetica", "bold");
//     doc.setTextColor(
//       billing.status === "Approved" ? 112 : 180,
//       billing.status === "Approved" ? 70 : 100,
//       billing.status === "Approved" ? 46 : 30,
//     );
//     const bNumLines = doc.splitTextToSize(bNum, LEFT_MAX_W);
//     doc.text(bNumLines, LEFT_VAL_X, cursorY);
//     cursorY += Math.max(bNumLines.length, 1) * 4.5 + 1;

//     // Row 3: Address
//     doc.setFontSize(labelFs);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(100, 100, 100);
//     doc.text("Address:", MARGIN, cursorY);
//     doc.setFontSize(valueFs);
//     doc.setFont("helvetica", "normal");
//     doc.setTextColor(40, 40, 40);
//     const officeAddrLines = doc.splitTextToSize(
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//       LEFT_MAX_W,
//     );
//     doc.text(officeAddrLines, LEFT_VAL_X, cursorY);
//     cursorY += officeAddrLines.length * 4.5 + 1;

//     // Row 4: Email (optional)
//     if (billing.clientEmail) {
//       doc.setFontSize(labelFs);
//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(100, 100, 100);
//       doc.text("Email:", MARGIN, cursorY);
//       doc.setFontSize(valueFs);
//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(40, 40, 40);
//       const emailLines = doc.splitTextToSize(billing.clientEmail, LEFT_MAX_W);
//       doc.text(emailLines, LEFT_VAL_X, cursorY);
//       cursorY += Math.max(emailLines.length, 1) * 4.5 + 1;
//     }

//     // Notes (optional)
//     if (billing.notes) {
//       doc.setFontSize(labelFs);
//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(100, 100, 100);
//       doc.text("Notes:", MARGIN, cursorY);
//       doc.setFontSize(valueFs);
//       doc.setFont("helvetica", "normal");
//       doc.setTextColor(40, 40, 40);
//       const notesLines = doc.splitTextToSize(billing.notes, MAX_W - 22);
//       doc.text(notesLines, LEFT_VAL_X, cursorY);
//       cursorY += notesLines.length * 4.5;
//     }

//     cursorY += ROW_H + 2;

//     /* ================= CUSTOM FIELDS ================= */
//     if (billing.customFields && billing.customFields.length > 0) {
//       billing.customFields.forEach((field) => {
//         doc.setFontSize(labelFs);
//         doc.setFont("helvetica", "normal");
//         doc.setTextColor(100, 100, 100);
//         doc.text(`${field.label}:`, MARGIN, cursorY);

//         const labelW = doc.getTextWidth(`${field.label}:`) + 2;
//         doc.setFontSize(valueFs);
//         doc.setFont("helvetica", "bold");
//         doc.setTextColor(30, 30, 30);
//         doc.text(field.value || "-", MARGIN + labelW, cursorY);
//         cursorY += ROW_H;
//       });
//     }

//     /* ================= TABLE ================= */
//     cursorY += 2;
//     const items = billing.items || [];
//     const tableRows = items.map((item, index) => [
//       index + 1,
//       item.description || "N/A",
//       `${item.rate || 0} × ${item.quantity || 0}`,
//       `Rs. ${(item.amount || 0).toLocaleString()}/-`,
//     ]);

//     autoTable(doc, {
//       startY: cursorY,
//       head: [["Sr.", "Item Description", "Rate × Qty", "Amount"]],
//       body: tableRows,
//       foot: [
//         [
//           {
//             content: "",
//             colSpan: 2,
//             styles: { lineWidth: 0, fillColor: [255, 255, 255] },
//           },
//           {
//             content: "Grand Total",
//             styles: {
//               fontStyle: "bold",
//               halign: "right",
//               fillColor: [240, 240, 240],
//             },
//           },
//           {
//             content: `Rs. ${(billing.totalAmount || 0).toLocaleString()}/-`,
//             styles: {
//               fontStyle: "bold",
//               halign: "right",
//               fillColor: [240, 240, 240],
//             },
//           },
//         ],
//       ],
//       theme: "grid",
//       headStyles: {
//         fillColor: [112, 70, 46],
//         textColor: 255,
//         fontStyle: "bold",
//         fontSize: 9.5,
//         lineWidth: 0,
//         halign: "center",
//         valign: "middle",
//         cellPadding: { top: 5, bottom: 5, left: 4, right: 4 },
//       },
//       footStyles: {
//         fillColor: [240, 240, 240],
//         textColor: 30,
//         fontStyle: "bold",
//         fontSize: 9.5,
//         lineWidth: 0.4,
//         lineColor: [180, 180, 180],
//       },
//       alternateRowStyles: {
//         fillColor: [252, 248, 245],
//       },
//       styles: {
//         fontSize: 9,
//         cellPadding: { top: 5, bottom: 5, left: 4, right: 4 },
//         lineWidth: 0.3,
//         lineColor: [200, 200, 200],
//         valign: "middle",
//         textColor: [40, 40, 40],
//       },
//       columnStyles: {
//         0: { cellWidth: 14, halign: "center", fontStyle: "bold" },
//         1: { cellWidth: "auto" },
//         2: { cellWidth: 40, halign: "center" },
//         3: { cellWidth: 38, halign: "right" },
//       },
//     });

//     // @ts-ignore
//     const lastY = doc.lastAutoTable.finalY;
//     const footerY = lastY + 16;

//     // Footer note
//     doc.setFontSize(9);
//     doc.setFont("helvetica", "italic");
//     doc.setTextColor(100, 100, 100);
//     doc.text(
//       "Thank you for your business! Please retain this document for your records.",
//       MARGIN,
//       footerY,
//     );

//     // Signature
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(9.5);
//     doc.setTextColor(30, 30, 30);
//     doc.text("For MUNNA DECORS", RIGHT, footerY, { align: "right" });

//     doc.setDrawColor(120, 120, 120);
//     doc.setLineWidth(0.3);
//     doc.line(RIGHT - 50, footerY + 14, RIGHT, footerY + 14);

//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8.5);
//     doc.setTextColor(100, 100, 100);
//     doc.text("Authorized Signatory", RIGHT, footerY + 19, { align: "right" });

//     // Bottom border
//     doc.setDrawColor(112, 70, 46);
//     doc.setLineWidth(0.8);
//     doc.line(MARGIN, 285, RIGHT, 285);

//     const safeFilename = (
//       bNum !== "PENDING APPROVAL"
//         ? bNum
//         : `Draft-${billing.clientName || "Bill"}`
//     ).replace(/[^a-zA-Z0-9_-]/g, "_");
//     doc.save(`${safeFilename}.pdf`);
//   } catch (error) {
//     console.error("PDF Generation Error:", error);
//     toast.error("Failed to generate PDF.");
//   }
// };

export const downloadBillingPDF = (billing: IBilling) => {
  try {
    const doc = new jsPDF();

    const PAGE_W = 210;
    const MARGIN = 20;
    const CENTER = PAGE_W / 2;
    const RIGHT = PAGE_W - MARGIN;
    const MAX_W = RIGHT - MARGIN;

    let cursorY = 16;

    /* ================= BRAND NAME ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(112, 70, 46);
    doc.text("MUNNA DECORS", CENTER, cursorY, { align: "center" });
    cursorY += 6;

    /* ================= DOCUMENT TYPE ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text("BILL / INVOICE", CENTER, cursorY, {
      align: "center",
    });
    cursorY += 6;

    /* ================= TAGLINE ================= */
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);

    const line1 = doc.splitTextToSize(
      "Custom wooden & steel furniture design, polishing, civil & interior works.",
      MAX_W,
    );

    doc.text(line1, CENTER, cursorY, { align: "center" });
    cursorY += line1.length * 4.5 + 1;

    /* ================= OFFICE ADDRESS (HEADER) ================= */
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);

    const headerAddrText = doc.splitTextToSize(
      "Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (W)",
      MAX_W,
    );

    doc.text(headerAddrText, CENTER, cursorY, {
      align: "center",
    });

    cursorY += headerAddrText.length * 4 + 2;

    /* ================= HEADER DIVIDER ================= */
    doc.setDrawColor(112, 70, 46);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);

    cursorY += 1.5;

    doc.setLineWidth(0.2);
    doc.setDrawColor(200, 180, 160);
    doc.line(MARGIN, cursorY, RIGHT, cursorY);

    cursorY += 6;

    /* ================= BILL META & CLIENT INFO ================= */
    const labelFs = 9;
    const valueFs = 9.5;
    const ROW_H = 7;
    const LEFT_VAL_X = MARGIN + 22;
    const LEFT_MAX_W = 95;

    const bNum =
      billing.billingNumber || billing.billing_number || "PENDING APPROVAL";

    /* ================= DATE (TOP RIGHT) ================= */
    const dateValue = billing.createdAt
      ? new Date(billing.createdAt)
      : new Date();

    const dateStr = dateValue.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Date:", 128, cursorY);

    doc.setFontSize(valueFs);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);
    doc.text(dateStr, 143, cursorY);

    /* ================= CLIENT NAME ================= */
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Billed To:", MARGIN, cursorY);

    doc.setFontSize(valueFs);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 30, 30);

    const clientNameLines = doc.splitTextToSize(
      billing.clientName || "N/A",
      LEFT_MAX_W,
    );

    doc.text(clientNameLines, LEFT_VAL_X, cursorY);

    cursorY += Math.max(clientNameLines.length, 1) * 4.5 + 1;

    /* ================= BILL NUMBER ================= */
    doc.setFontSize(labelFs);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Bill No:", MARGIN, cursorY);

    doc.setFontSize(valueFs);
    doc.setFont("helvetica", "bold");

    doc.setTextColor(
      billing.status === "Approved" ? 112 : 180,
      billing.status === "Approved" ? 70 : 100,
      billing.status === "Approved" ? 46 : 30,
    );

    const bNumLines = doc.splitTextToSize(bNum, LEFT_MAX_W);
    doc.text(bNumLines, LEFT_VAL_X, cursorY);

    cursorY += Math.max(bNumLines.length, 1) * 4.5 + 1;

    /* ================= CLIENT ADDRESS ================= */
    const clientAddress =
      billing.clientAddress?.trim() ||
      billing.customFields?.find((f) => f.label?.trim().toLowerCase() === "address")?.value?.trim();

    if (clientAddress) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("Address:", MARGIN, cursorY);

      doc.setFontSize(valueFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);

      const clientAddressLines = doc.splitTextToSize(clientAddress, LEFT_MAX_W);
      doc.text(clientAddressLines, LEFT_VAL_X, cursorY);

      cursorY += (clientAddressLines.length - 1) * 3.85 + 5.5;
    }

    /* ================= CLIENT EMAIL ================= */
    if (billing.clientEmail) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("Email:", MARGIN, cursorY);

      doc.setFontSize(valueFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);

      const emailLines = doc.splitTextToSize(billing.clientEmail, LEFT_MAX_W);

      doc.text(emailLines, LEFT_VAL_X, cursorY);

      cursorY += Math.max(emailLines.length, 1) * 4.5 + 1;
    }

    /* ================= NOTES ================= */
    if (billing.notes) {
      doc.setFontSize(labelFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("Notes:", MARGIN, cursorY);

      doc.setFontSize(valueFs);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);

      const notesLines = doc.splitTextToSize(billing.notes, MAX_W - 22);

      doc.text(notesLines, LEFT_VAL_X, cursorY);

      cursorY += notesLines.length * 4.5;
    }

    // cursorY += ROW_H + 2;

    /* ================= CUSTOM FIELDS ================= */
    const otherCustomFields = (billing.customFields || []).filter(
      (field) => !clientAddress || field.label?.trim().toLowerCase() !== "address"
    );

    if (otherCustomFields.length) {
      otherCustomFields.forEach((field) => {
        doc.setFontSize(labelFs);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);

        const labelText = `${field.label}:`;
        doc.text(labelText, MARGIN, cursorY);

        const customValX = Math.max(LEFT_VAL_X, MARGIN + doc.getTextWidth(labelText) + 2);
        const customMaxW = RIGHT - customValX;

        doc.setFontSize(valueFs);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 30, 30);

        const fieldValueLines = doc.splitTextToSize(
          String(field.value || "-"),
          customMaxW,
        );

        doc.text(fieldValueLines, customValX, cursorY);

        cursorY += Math.max(fieldValueLines.length, 1) * ROW_H;
      });
    }

    /* ================= TABLE ================= */
    cursorY += 2;

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
              fillColor: [240, 240, 240],
            },
          },
          {
            content: `Rs. ${(billing.totalAmount || 0).toLocaleString("en-IN")}/-`,
            styles: {
              fontStyle: "bold",
              halign: "right",
              fillColor: [240, 240, 240],
            },
          },
        ],
      ],

      theme: "grid",

      headStyles: {
        fillColor: [112, 70, 46],
        textColor: 255,
        fontStyle: "bold",
        fontSize: 9.5,
        lineWidth: 0,
        halign: "center",
        valign: "middle",
        cellPadding: {
          top: 5,
          bottom: 5,
          left: 4,
          right: 4,
        },
      },

      footStyles: {
        fillColor: [240, 240, 240],
        textColor: 30,
        fontStyle: "bold",
        fontSize: 9.5,
        lineWidth: 0.4,
        lineColor: [180, 180, 180],
      },

      alternateRowStyles: {
        fillColor: [252, 248, 245],
      },

      styles: {
        fontSize: 9,
        cellPadding: {
          top: 5,
          bottom: 5,
          left: 4,
          right: 4,
        },
        lineWidth: 0.3,
        lineColor: [200, 200, 200],
        valign: "middle",
        textColor: [40, 40, 40],
      },

      columnStyles: {
        0: {
          cellWidth: 14,
          halign: "center",
          fontStyle: "bold",
        },
        1: {
          cellWidth: "auto",
        },
        2: {
          cellWidth: 40,
          halign: "center",
        },
        3: {
          cellWidth: 38,
          halign: "right",
        },
      },
    });

    /* ================= FOOTER ================= */
    // @ts-ignore
    const lastY = doc.lastAutoTable.finalY;
    const footerY = lastY + 16;

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);

    doc.text(
      "Thank you for your business! Please retain this document for your records.",
      MARGIN,
      footerY,
    );

    /* ================= SIGNATURE ================= */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);

    doc.text("For MUNNA DECORS", RIGHT, footerY, {
      align: "right",
    });

    doc.setDrawColor(120, 120, 120);
    doc.setLineWidth(0.3);

    doc.line(RIGHT - 50, footerY + 14, RIGHT, footerY + 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);

    doc.text("Authorized Signatory", RIGHT, footerY + 19, { align: "right" });

    /* ================= BOTTOM BORDER ================= */
    doc.setDrawColor(112, 70, 46);
    doc.setLineWidth(0.8);
    doc.line(MARGIN, 285, RIGHT, 285);

    /* ================= SAVE PDF ================= */
    const safeFilename = (
      bNum !== "PENDING APPROVAL"
        ? bNum
        : `Draft-${billing.clientName || "Bill"}`
    ).replace(/[^a-zA-Z0-9_-]/g, "_");

    doc.save(`${safeFilename}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    toast.error("Failed to generate PDF.");
  }
};
