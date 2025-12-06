import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import type { ContactFormData } from "@/components/inquiry/InquiryModal";

function validate(payload: Partial<ContactFormData>) {
  const errors: Record<string, string> = {};
  if (!payload.name || payload.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.email = "Enter a valid email.";
  }
  if (!payload.buildRequest || payload.buildRequest.trim().length < 3) {
    errors.buildRequest = "Please describe what you want to build.";
  }
  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;
    const errors = validate(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Email service not configured." },
        { status: 500 },
      );
    }

    const toEmail = siteConfig.email || process.env.INQUIRY_TO || process.env.RESEND_TO;
    const fromEmail = process.env.INQUIRY_FROM || "inquiries@resend.dev";

    const subject = `New Inquiry From ${body.name}`;
    const text = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone || "Not provided"}`,
      `Company: ${body.company || "Not provided"}`,
      "",
      "What they want to build:",
      body.buildRequest,
      "",
      "Additional details:",
      body.details || "Not provided",
    ].join("\n");

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        subject,
        text,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      return NextResponse.json(
        { success: false, message: "Failed to send email", detail: errText },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}

