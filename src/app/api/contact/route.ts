import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;
const attempts = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
  startedAt?: unknown;
};

function value(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > MAX_REQUESTS;
}

function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return jsonError("Invalid request origin.", 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 12_000) {
    return jsonError("Message is too large.", 413);
  }

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientKey = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(clientKey)) {
    return jsonError("Too many messages. Please try again in a few minutes.", 429);
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return jsonError("Invalid form data.", 400);
  }

  const name = value(payload.name);
  const email = value(payload.email).toLowerCase();
  const subject = value(payload.subject);
  const message = value(payload.message);
  const company = value(payload.company);
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;

  if (company) return Response.json({ ok: true });
  if (startedAt && Date.now() - startedAt < 1_200) {
    return jsonError("Please take a moment before submitting.", 400);
  }
  if (name.length < 2 || name.length > 80) return jsonError("Enter a valid name.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) return jsonError("Enter a valid email address.", 400);
  if (subject.length < 3 || subject.length > 140) return jsonError("Subject must be between 3 and 140 characters.", 400);
  if (message.length < 10 || message.length > 5_000) return jsonError("Message must be between 10 and 5,000 characters.", 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Kishor Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact email is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.");
    return jsonError("Messaging is temporarily unavailable. Please contact me through LinkedIn.", 503);
  }

  const text = [
    "New portfolio enquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
        "User-Agent": "kishor-portfolio/1.0",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text,
        tags: [{ name: "source", value: "portfolio-contact" }],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const providerError = await response.text();
      console.error("Resend delivery failed:", response.status, providerError);
      return jsonError("Your message could not be delivered. Please try again shortly.", 502);
    }

    return Response.json({ ok: true, message: "Message delivered successfully." });
  } catch (error) {
    console.error("Contact delivery failed:", error);
    return jsonError("Your message could not be delivered. Please try again shortly.", 502);
  }
}
