import { NextResponse } from "next/server";
import { Resend } from "resend";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function clean(v: unknown) {
  return String(v ?? "").trim();
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmailLike(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: silently accept
    const website = clean(body?.website);
    if (website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = clean(body?.name);
    const email = clean(body?.email).toLowerCase();
    const confirmEmail = clean(body?.confirmEmail).toLowerCase();
    const phoneRaw = clean(body?.phone);
    const company = clean(body?.company);
    const taskDescription = clean(body?.taskDescription);

    if (
      !name ||
      !email ||
      !confirmEmail ||
      !phoneRaw ||
      !company ||
      !taskDescription
    ) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    if (!isEmailLike(email) || email !== confirmEmail) {
      return NextResponse.json(
        { ok: false, error: "Email mismatch" },
        { status: 400 }
      );
    }

    // ✅ derive country from phone number
    const phoneParsed = parsePhoneNumberFromString(phoneRaw);
    if (!phoneParsed || !phoneParsed.isValid()) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone" },
        { status: 400 }
      );
    }

    const phoneE164 = phoneParsed.number; // normalized +xxxxxxxx
    const phoneCountry = phoneParsed.country
      ? String(phoneParsed.country).toLowerCase()
      : "unknown"; // et, us, etc.

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Email not configured" },
        { status: 500 }
      );
    }

    const to = process.env.CONTACT_TO_EMAIL || "derejemasresha27@gmail.com";
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const subject = `New contact request — ${name} (${company})`;

    const text =
      `New contact request\n` +
      `Name: ${name}\n\n` +
      `Email: ${email}\n\n` +
      `Phone: ${phoneE164}\n\n` +
      `Country: ${phoneCountry}\n\n` +
      `Company: ${company}\n\n` +
      `Task:\n\n${taskDescription}\n`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New contact request</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(
      email
    )}</a></p>
        <p><b>Phone:</b> ${escapeHtml(phoneE164)}</p>
        <p><b>Country:</b> ${escapeHtml(phoneCountry)}</p>
        <p><b>Company:</b> ${escapeHtml(company)}</p>
        <p><b>Task:</b></p>
        <pre style="background:#f6f6f6;padding:12px;border-radius:8px;white-space:pre-wrap;">${escapeHtml(
          taskDescription
        )}</pre>
      </div>
    `;

    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json(
      { ok: true, id: result.data?.id },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send" },
      { status: 500 }
    );
  }
}