"use client";

import Papa from "papaparse";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

export function exportToCSV(data: any[], filename = "export.csv") {
  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportSectionToPDF(
  element: HTMLElement,
  filename = "dashboard.pdf"
) {
  if (!element) return;

  // Generate PNG using dom-to-image-more
  const dataUrl = await domtoimage.toPng(element, {
    quality: 1,
    bgcolor: "#ffffff", // Safe background
    style: {
      backgroundColor: "#ffffff", // Override Tailwind's lab()
      color: "#000000",
    },
  });

  // Convert to PDF
  const img = new Image();
  img.src = dataUrl;
  await img.decode();

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: [img.width, img.height],
  });

  pdf.addImage(img, "PNG", 0, 0, img.width, img.height);
  pdf.save(filename);
}
