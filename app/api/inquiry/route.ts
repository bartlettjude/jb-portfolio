import { NextResponse } from "next/server";
import { Resend } from "resend";

type InquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  buildRequest?: string;
  details?: string;
};

function isEmailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(payload: InquiryPayload) {
  if (!payload.name || payload.name.trim().length < 2) return false;
  if (!payload.email || !isEmailValid(payload.email)) return false;
  if (!payload.buildRequest || payload.buildRequest.trim().length < 1) return false;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryPayload;

    if (!validate(body)) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_RECEIVER_EMAIL;

    if (!resendApiKey || !toEmail) {
      return NextResponse.json(
        { success: false, error: "Email service not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(resendApiKey);

    const { name, email, phone, company, buildRequest, details } = body;

    const subject = `New Inquiry From ${name}`;
    const html = `
      <h2>New Inquiry Submitted</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${company || "Not provided"}</p>
      <p><strong>What they want to build:</strong></p>
      <p>${buildRequest}</p>
      <p><strong>Additional details:</strong></p>
      <p>${details || "None provided"}</p>
    `;

    const { error } = await resend.emails.send({
      from: "inquiries@resend.dev",
      to: toEmail,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Email failed to send." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

