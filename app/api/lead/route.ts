// app/api/lead/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Lead = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  lang?: "en" | "fr" | "de" | "lb";
  createdAt: string;
};

const LEADS_PATH = path.join(process.cwd(), "data", "leads.json");

function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(LEADS_PATH)) return [];
    const raw = fs.readFileSync(LEADS_PATH, "utf8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]) {
  fs.mkdirSync(path.dirname(LEADS_PATH), { recursive: true });
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf8");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const lead: Lead = {
    name: body.name?.trim(),
    email: body.email?.trim(),
    company: body.company?.trim(),
    message: body.message?.trim(),
    lang: body.lang,
    createdAt: new Date().toISOString(),
  };

  const leads = readLeads();
  leads.unshift(lead);
  writeLeads(leads);

  return NextResponse.json({ ok: true });
}
