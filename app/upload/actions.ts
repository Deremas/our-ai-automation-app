"use server";

import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

type ProcessPdfResult =
  | { success: true; message: string; chunksCreated: number }
  | { success: false; error: string };

export async function processPdfFile(
  formData: FormData
): Promise<ProcessPdfResult> {
  try {
    // Must match client: formData.append("pdf", file)
    const file = formData.get("pdf");

    if (!file || !(file instanceof File)) {
      return {
        success: false,
        error: "No PDF file received (field name must be 'pdf').",
      };
    }

    if (file.type !== "application/pdf") {
      return { success: false, error: "Uploaded file is not a PDF." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pdfParseModule = await import("pdf-parse");
    const pdfParse = pdfParseModule.default;
    const data = await pdfParse(buffer);

    const text = (data?.text ?? "").trim();
    if (!text) {
      return {
        success: false,
        error: "No text found in PDF (may be scanned/image-only).",
      };
    }

    const chunks = await chunkContent(text);
    if (!chunks.length) {
      return { success: false, error: "Chunking produced 0 chunks." };
    }

    const embeddings = await generateEmbeddings(chunks);
    if (embeddings.length !== chunks.length) {
      return {
        success: false,
        error: "Embedding generation returned mismatched length.",
      };
    }

    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index], // must match your schema column name
    }));

    await db.insert(documents).values(records);

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
      chunksCreated: records.length,
    };
  } catch (err) {
    console.error("PDF processing error:", err);
    return {
      success: false,
      error: "Failed to process PDF (see server logs).",
    };
  }
}

// "use server";

// import pdf from "pdf-parse";
// import { db } from "@/lib/db-config";
// import { documents } from "@/lib/db-schema";
// import { generateEmbeddings } from "@/lib/embeddings";
// import { chunkCOntent } from "@/lib/chunking";
// import { success } from "zod/v4";
// import { error } from "console";

// export async function processPdfFile(formData: FormData) {
//   try {
//     const file = formData.get("pdf") as File;

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const data = await pdf(buffer);

//     if (!data.text || data.text.trim().length === 0) {
//       return {
//         success: false,
//         error: "No text found in PDF",
//       };
//     }

//     const chunks = await chunkCOntent(data.text);
//     const embeddings = await generateEmbeddings(chunks);

//     const records = chunks.map((chunk, index) => ({
//       content: chunk,
//       embeddig: embeddings[index],
//     }));

//     await db.insert(documents).values(records);

//     return {
//       success: true,
//       message: `Created ${records.length} searchable chunks`,
//     };
//   } catch (error) {
//     console.error("PDF processing error", error);
//     return {
//       success: false,
//       error: "Failed to process PDF",
//     };
//   }
// }
