"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { IOfficialQuotation } from "@/models/OfficialQuotation";
import toast from "react-hot-toast";

export const downloadQuotationPDF = (quotation: IOfficialQuotation) => {
  try {
    const doc = new jsPDF();

    /* ================= HEADER ================= */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(112, 70, 46);
    doc.text("ABC DECORS", 105, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const specialistText = doc.splitTextToSize(
      "We specialize in custom wooden and steel furniture design and manufacturing.",
      170
    );

    const serviceText = doc.splitTextToSize(
      "Our services also include furniture polishing, plumbing, painting, and complete civil work solutions, providing reliable and high-quality craftsmanship for residential and corporate projects.",
      170
    );

    doc.text(specialistText, 105, 30, { align: "center" });
    doc.text(serviceText, 105, 36, { align: "center" });

    /* ================= DIVIDER ================= */

    doc.setDrawColor(0);
    // doc.line(20, 42, 190, 42);
    doc.line(20, 44, 190, 44);

    /* ================= ADDRESS ================= */

    doc.setFontSize(9);

    const address = doc.splitTextToSize(
      " Office Address: Gala No.6, Shantidham Apartment, Lokmanya Nagar, Pada No.2, Opp. Marathi School, Thane (W)",
      170
    );

    doc.text(address, 105, 50, { align: "center" });

    doc.line(20, 55, 190, 55);

    /* ================= CLIENT INFO ================= */

    doc.setFontSize(10);

    doc.text(`Ref No: ${quotation.notes || "-"}`, 20, 63);

    const dateStr = quotation.createdAt
      ? new Date(quotation.createdAt).toLocaleDateString()
      : new Date().toLocaleDateString();

    doc.text(`Date: ${dateStr}`, 190, 63, { align: "right" });

    doc.text(`Client Name: ${quotation.clientName || "N/A"}`, 20, 70);

    /* ================= TABLE DATA ================= */

    const items = quotation.items || [];

    const tableRows = items.map((item, index) => [
      index + 1,
      item.description || "N/A",
      `${item.rate || 0} x ${item.quantity || 0}`,
      `Rs. ${(item.amount || 0).toLocaleString()}/-`,
    ]);

    /* ================= TABLE ================= */

    autoTable(doc, {
      startY: 80,
      head: [["Sr.", "Description", "Quantity (amount/per Neg)", "Amount"]],
      body: tableRows,
      foot: [
        [
          "",
          "Total Amount",
          "",
          `Rs. ${(quotation.totalAmount || 0).toLocaleString()}/-`,
        ],
      ],
      theme: "grid",

      headStyles: {
        fillColor: [230, 230, 230],
        textColor: 0,
        fontStyle: "bold",
      },

      footStyles: {
        fillColor: [240, 240, 240],
        textColor: 0,
        fontStyle: "bold",
      },

      styles: {
        fontSize: 9,
        cellPadding: 5,
      },

      columnStyles: {
        0: { cellWidth: 12 },
        1: { cellWidth: "auto" },
        2: { cellWidth: 45 },
        3: { cellWidth: 35, halign: "right" },
      },
    });

    /* ================= FOOTER ================= */

    // @ts-ignore
    const lastY = doc.lastAutoTable.finalY;

    doc.setFontSize(10);

    doc.text("Thank you for your business!", 20, lastY + 20);

    doc.text("For ABC DECORS", 150, lastY + 20);

    doc.text("Authorized Signature", 150, lastY + 30);

    /* ================= SAVE ================= */

    doc.save(`Quotation-${quotation.clientName || "Export"}.pdf`);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    toast.error("Failed to generate PDF. Check console for details.");
  }
}


