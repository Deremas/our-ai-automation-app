import { NextResponse } from "next/server";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("pdf");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "No PDF file received (field name must be 'pdf').",
        },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Uploaded file is not a PDF." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Robust import for pdf-parse (CJS/ESM)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pdfParseMod = require("pdf-parse");
    const pdfParse =
      typeof pdfParseMod === "function" ? pdfParseMod : pdfParseMod.default;

    if (typeof pdfParse !== "function") {
      throw new Error(
        "pdf-parse import failed: no callable function export found."
      );
    }

    const data = await pdfParse(buffer);

    const text = (data?.text ?? "").trim();
    if (!text) {
      return NextResponse.json(
        {
          success: false,
          error: "No text found in PDF (may be scanned/image-only).",
        },
        { status: 422 }
      );
    }

    const chunks: string[] = await chunkContent(text);
    if (!chunks.length) {
      return NextResponse.json(
        { success: false, error: "Chunking produced 0 chunks." },
        { status: 422 }
      );
    }

    const embeddings = await generateEmbeddings(chunks);
    if (embeddings.length !== chunks.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Embedding generation returned mismatched length.",
        },
        { status: 500 }
      );
    }

    const records = chunks.map((chunk, i) => ({
      content: chunk,
      embedding: embeddings[i], // must match your schema column name
    }));

    await db.insert(documents).values(records);

    return NextResponse.json({
      success: true,
      message: `Created ${records.length} searchable chunks`,
      chunksCreated: records.length,
    });
  } catch (err) {
    console.error("PDF upload route error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process PDF (see server logs)." },
      { status: 500 }
    );
  }
}
