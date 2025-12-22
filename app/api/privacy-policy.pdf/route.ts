import { NextRequest } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFPage,
  type PDFFont,
} from "pdf-lib";
import { t } from "@/lib/site-copy";

export const runtime = "nodejs";

// Match your supported languages:
type Lang = "en" | "fr" | "de" | "lb";

function normalizeLang(input: string | null): Lang {
  const v = (input || "en").toLowerCase();
  if (v === "fr" || v === "de" || v === "lb" || v === "en") return v;
  return "en";
}

type SectionBlock = { h: string; b: string[] };

/**
 * Wrap by rendered width (not character count) for consistent PDF line breaks.
 */
function wrapTextWidth(
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string[] {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (!clean) return [];

  const words = clean.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    const testWidth = font.widthOfTextAtSize(test, fontSize);

    if (testWidth > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }

  if (line) lines.push(line);
  return lines;
}

/**
 * Generic builder:
 * - Titles: keys ending with "t"
 * - Bodies: keys sharing prefix and matching /b\d*$/
 * Example: s2t => s2b, s2b1, s2b2...
 */
function buildBlocksFromSections(
  sections: Record<string, string | undefined>
): SectionBlock[] {
  const titleKeys = Object.keys(sections)
    .filter((k) => k.endsWith("t"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return titleKeys
    .map((titleKey) => {
      const prefix = titleKey.slice(0, -1);

      const bodyKeys = Object.keys(sections)
        .filter(
          (k) => k.startsWith(prefix) && k !== titleKey && /b\d*$/.test(k) // b, b1, b2...
        )
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      const h = (sections[titleKey] ?? "").trim();
      const b = bodyKeys.map((k) => (sections[k] ?? "").trim()).filter(Boolean);

      return { h, b };
    })
    .filter((x) => x.h.length > 0);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang: Lang = normalizeLang(searchParams.get("lang"));

  // Grab entire sections object once
  const sections = t<Record<string, string | undefined>>(
    lang,
    "legal.privacy.sections"
  );

  const title = t<string>(lang, "legal.privacy.title");

  const metaLine = [
    sections.metaDate,
    sections.metaCompany,
    sections.metaDomain,
  ]
    .filter(Boolean)
    .join(" · ");

  const endLine = (sections.end ?? "").toString().trim();

  const blocks = buildBlocksFromSections(sections);

  // PDF setup
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 56;
  const titleSize = 18;
  const hSize = 12.5;
  const bodySize = 10.5;
  const metaSize = 10;
  const lineGap = 5;

  const textColor = rgb(0.12, 0.12, 0.12);
  const bodyColor = rgb(0.18, 0.18, 0.18);

  let page: PDFPage = pdfDoc.addPage();
  let { width, height } = page.getSize();
  let maxWidth = width - margin * 2;

  let y = height - margin;

  const newPage = () => {
    page = pdfDoc.addPage();
    ({ width, height } = page.getSize());
    maxWidth = width - margin * 2;
    y = height - margin;
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < margin) newPage();
  };

  // NOTE: Do NOT pass maxWidth to drawText since we wrap manually.
  const drawLine = (
    text: string,
    size: number,
    bold = false,
    color = textColor
  ) => {
    ensureSpace(size + lineGap);
    page.drawText(text, {
      x: margin,
      y,
      size,
      font: bold ? fontBold : font,
      color,
    });
    y -= size + lineGap;
  };

  const drawWrapped = (
    text: string,
    size: number,
    usedFont: PDFFont,
    bold = false,
    color = bodyColor
  ) => {
    for (const ln of wrapTextWidth(text, maxWidth, usedFont, size)) {
      drawLine(ln, size, bold, color);
    }
  };

  const drawParagraph = (text: string, size: number) => {
    drawWrapped(text, size, font, false, bodyColor);
  };

  /**
   * Draw a single line segment and optionally attach a clickable link
   * over the exact text rectangle.
   *
   * Keeps original content; only adds link behavior.
   */
  const drawTextWithLink = (opts: {
    text: string;
    x: number;
    y: number;
    size: number;
    font: PDFFont;
    color: ReturnType<typeof rgb>;
    url?: string;
    underline?: boolean;
  }) => {
    const { text, x, y, size, font, color, url, underline } = opts;

    page.drawText(text, { x, y, size, font, color });

    const textWidth = font.widthOfTextAtSize(text, size);
    const textHeight = size; // good approximation for link rect

    if (underline) {
      page.drawLine({
        start: { x, y: y - 1.5 },
        end: { x: x + textWidth, y: y - 1.5 },
        thickness: 0.8,
        color,
      });
    }

    if (url) {
      const annotDict = pdfDoc.context.obj({
        Type: "Annot",
        Subtype: "Link",
        Rect: [x, y, x + textWidth, y + textHeight],
        Border: [0, 0, 0],
        A: { Type: "Action", S: "URI", URI: url },
      });

      const annotRef = pdfDoc.context.register(annotDict);
      page.node.addAnnot(annotRef);
    }


    return textWidth;
  };

  // Render Title
  drawWrapped(title, titleSize, fontBold, true, textColor);
  y -= 6;

  // Meta (original content preserved, but domain becomes clickable)
  if (metaLine) {
    // Keep original meta content (date · company · domain) but draw the domain as a link.
    const dateText = (sections.metaDate ?? "").toString();
    const companyText = (sections.metaCompany ?? "").toString();
    const domainText = (sections.metaDomain ?? "").toString();

    const sep = " · ";

    // If meta is too wide, fall back to wrapped rendering (no link),
    // BUT for typical meta lines it fits on one line and link works.
    const totalWidth = font.widthOfTextAtSize(
      [dateText, companyText, domainText].filter(Boolean).join(sep),
      metaSize
    );

    if (totalWidth <= maxWidth && domainText) {
      ensureSpace(metaSize + lineGap);

      const y0 = y;
      let x = margin;

      if (dateText) {
        x += drawTextWithLink({
          text: dateText,
          x,
          y: y0,
          size: metaSize,
          font,
          color: bodyColor,
        });
      }

      if (dateText && (companyText || domainText)) {
        x += drawTextWithLink({
          text: sep,
          x,
          y: y0,
          size: metaSize,
          font,
          color: bodyColor,
        });
      }

      if (companyText) {
        x += drawTextWithLink({
          text: companyText,
          x,
          y: y0,
          size: metaSize,
          font,
          color: bodyColor,
        });
      }

      if (companyText && domainText) {
        x += drawTextWithLink({
          text: sep,
          x,
          y: y0,
          size: metaSize,
          font,
          color: bodyColor,
        });
      }

      const url =
        domainText.startsWith("http://") || domainText.startsWith("https://")
          ? domainText
          : `https://${domainText}`;

      drawTextWithLink({
        text: domainText,
        x,
        y: y0,
        size: metaSize,
        font,
        color: bodyColor,
        url,
        underline: true,
      });

      y -= metaSize + lineGap;
    } else {
      // Fallback to normal wrapped meta rendering
      drawWrapped(metaLine, metaSize, font, false, bodyColor);
    }

    y -= 10;
  }

  // Sections
  for (const sec of blocks) {
    // Heading
    drawWrapped(sec.h, hSize, fontBold, true, textColor);
    y -= 2;

    // Body
    for (const p of sec.b) {
      drawParagraph(p, bodySize);
      y -= 8;
    }

    y -= 6;
  }

  // End
  if (endLine) {
    y -= 6;
    drawWrapped(endLine, bodySize, fontBold, true, textColor);
  }

  const pdfBytes = await pdfDoc.save();

  // Node runtime: Buffer is the most TS-compatible BodyInit
  const body = Buffer.from(pdfBytes);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="privacy-policy-${lang}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

// import { NextRequest } from "next/server";
// import { PDFDocument, StandardFonts, rgb, type PDFPage } from "pdf-lib";
// import { t } from "@/lib/site-copy";

// export const runtime = "nodejs";

// // Match your supported languages:
// type Lang = "en" | "fr" | "de" | "lb";

// function normalizeLang(input: string | null): Lang {
//   const v = (input || "en").toLowerCase();
//   if (v === "fr" || v === "de" || v === "lb" || v === "en") return v;
//   return "en";
// }

// type SectionBlock = { h: string; b: string[] };

// function wrapText(text: string, maxChars: number) {
//   const clean = (text ?? "").replace(/\s+/g, " ").trim();
//   if (!clean) return [];
//   const words = clean.split(" ");
//   const lines: string[] = [];
//   let line = "";

//   for (const w of words) {
//     const test = line ? `${line} ${w}` : w;
//     if (test.length > maxChars) {
//       if (line) lines.push(line);
//       line = w;
//     } else {
//       line = test;
//     }
//   }
//   if (line) lines.push(line);
//   return lines;
// }

// /**
//  * Generic builder:
//  * - Titles: keys ending with "t"
//  * - Bodies: keys sharing prefix and matching /b\d*$/
//  * Example: s2t => s2b, s2b1, s2b2...
//  */
// function buildBlocksFromSections(
//   sections: Record<string, string | undefined>
// ): SectionBlock[] {
//   const titleKeys = Object.keys(sections)
//     .filter((k) => k.endsWith("t"))
//     .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

//   return titleKeys
//     .map((titleKey) => {
//       const prefix = titleKey.slice(0, -1);

//       const bodyKeys = Object.keys(sections)
//         .filter(
//           (k) => k.startsWith(prefix) && k !== titleKey && /b\d*$/.test(k) // b, b1, b2...
//         )
//         .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

//       const h = (sections[titleKey] ?? "").trim();
//       const b = bodyKeys.map((k) => (sections[k] ?? "").trim()).filter(Boolean);

//       return { h, b };
//     })
//     .filter((x) => x.h.length > 0);
// }

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const lang: Lang = normalizeLang(searchParams.get("lang"));

//   // Grab entire sections object once
//   const sections = t<Record<string, string | undefined>>(
//     lang,
//     "legal.privacy.sections"
//   );

//   const title = t<string>(lang, "legal.privacy.title");

//   const metaLine = [
//     sections.metaDate,
//     sections.metaCompany,
//     sections.metaDomain,
//   ]
//     .filter(Boolean)
//     .join(" · ");

//   const endLine = (sections.end ?? "").toString().trim();

//   const blocks = buildBlocksFromSections(sections);

//   // PDF setup
//   const pdfDoc = await PDFDocument.create();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   const margin = 56;
//   const titleSize = 18;
//   const hSize = 12.5;
//   const bodySize = 10.5;
//   const metaSize = 10;
//   const lineGap = 5;

//   const textColor = rgb(0.12, 0.12, 0.12);
//   const bodyColor = rgb(0.18, 0.18, 0.18);

//   let page: PDFPage = pdfDoc.addPage();
//   let { width, height } = page.getSize();
//   const maxWidth = width - margin * 2;

//   let y = height - margin;

//   const newPage = () => {
//     page = pdfDoc.addPage();
//     ({ width, height } = page.getSize());
//     y = height - margin;
//   };

//   const ensureSpace = (needed: number) => {
//     if (y - needed < margin) newPage();
//   };

//   const drawLine = (
//     text: string,
//     size: number,
//     bold = false,
//     color = textColor
//   ) => {
//     ensureSpace(size + lineGap);
//     page.drawText(text, {
//       x: margin,
//       y,
//       size,
//       font: bold ? fontBold : font,
//       color,
//       maxWidth,
//     });
//     y -= size + lineGap;
//   };

//   const drawParagraph = (text: string, size: number, maxChars: number) => {
//     for (const ln of wrapText(text, maxChars)) {
//       drawLine(ln, size, false, bodyColor);
//     }
//   };

//   // Render Title
//   drawLine(title, titleSize, true, textColor);
//   y -= 6;

//   // Meta
//   if (metaLine) {
//     for (const ml of wrapText(metaLine, 95)) {
//       drawLine(ml, metaSize, false, bodyColor);
//     }
//     y -= 10;
//   }

//   // Sections
//   for (const sec of blocks) {
//     // Heading
//     for (const hl of wrapText(sec.h, 95)) {
//       drawLine(hl, hSize, true, textColor);
//     }
//     y -= 2;

//     // Body
//     for (const p of sec.b) {
//       drawParagraph(p, bodySize, 105);
//       y -= 8;
//     }

//     y -= 6;
//   }

//   // End
//   if (endLine) {
//     y -= 6;
//     for (const el of wrapText(endLine, 105)) {
//       drawLine(el, bodySize, true, textColor);
//     }
//   }
//   const pdfBytes = await pdfDoc.save();
//   const body = Buffer.from(pdfBytes);

//   return new Response(body, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename="privacy-policy-${lang}.pdf"`,
//       "Cache-Control": "no-store",
//     },
//   });
// }
