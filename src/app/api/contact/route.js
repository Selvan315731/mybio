import { NextResponse } from "next/server";

// Simple in-memory rate limiter: max 5 requests per 10 minutes per IP
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const userRecord = rateLimitMap.get(ip);
  if (!userRecord) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (now > userRecord.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (userRecord.count >= maxRequests) {
    return true;
  }

  userRecord.count++;
  return false;
}

export async function POST(request) {
  try {
    // 1. IP Rate Limiting Check
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit reached. Please wait a few minutes before submitting another inquiry.",
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, botField } = body;

    // 2. Honeypot Anti-Bot Shield: If hidden bot field is filled, silently discard
    if (botField) {
      return NextResponse.json({
        success: true,
        message: "Message processed successfully.",
      });
    }

    // 3. Validation & Sanitization
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    const cleanName = name.trim().slice(0, 100).replace(/[\r\n]/g, " ");
    const cleanEmail = email.trim().slice(0, 100).replace(/[\r\n]/g, "");
    const cleanSubject = (subject?.trim() || "Enterprise Opportunity").slice(0, 150).replace(/[\r\n]/g, " ");
    const cleanMessage = message.trim().slice(0, 3000);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide at least 10 characters in your message scope." },
        { status: 400 }
      );
    }

    // 4. Read Secured Recipient Email from Environment Variables
    const recipientEmail =
      process.env.CONTACT_RECIPIENT_EMAIL || "selvan315731@gmail.com";

    const mailSubject = `[Portfolio Inquiry] ${cleanSubject} - from ${cleanName}`;

    // 5. Dispatch via FormSubmit gateway
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:3000",
        Referer: "http://localhost:3000",
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        _replyto: cleanEmail,
        _subject: mailSubject,
        topic: cleanSubject,
        message: cleanMessage,
        _template: "table",
        _captcha: "false",
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok || data.success === "true") {
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been safely dispatched to Thamaraiselvan's inbox.",
      });
    }

    // Notice for first-time activation if FormSubmit requires it
    if (data.message && data.message.includes("Activation")) {
      return NextResponse.json({
        success: true,
        pendingActivation: true,
        message: "Message dispatched! If this is your first test, please check your inbox to confirm FormSubmit activation.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: data.message || "Unable to dispatch message right now. Please try via the direct mail options.",
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Secure Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Network error transmitting message. Please try again or use direct mail.",
      },
      { status: 500 }
    );
  }
}
