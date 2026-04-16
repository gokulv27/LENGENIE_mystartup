import { NextRequest, NextResponse } from "next/server";

const OWNER_EMAIL = "gokulvijayanandbusiness@gmail.com";

/**
 * POST /api/booking/notify
 * Called when a client confirms a booking on the /demo page.
 * Sends a notification email to the Lengenie owner with full booking details.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, email, date, time } = await req.json();

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Format human-readable date & time
    const startDt = new Date(`${date}T${time}:00`);
    const formattedDate = startDt.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
    const formattedTime = startDt.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });

    // ─── Send to OWNER via formsubmit.co ──────────────────────────────────────
    // formsubmit.co is a free HTML form endpoint — works as a fetch POST too.
    // First-time use activates automatically when the email is confirmed.
    const ownerPayload = new FormData();
    ownerPayload.append("name", `Lengenie Booking Bot`);
    ownerPayload.append("email", email); // reply-to the client
    ownerPayload.append(
      "message",
      `🔔 NEW BOOKING ALERT\n\n` +
        `Client Name : ${name}\n` +
        `Client Email: ${email}\n` +
        `Date        : ${formattedDate}\n` +
        `Time (IST)  : ${formattedTime}\n` +
        `Duration    : 30 minutes\n` +
        `Platform    : Google Meet\n\n` +
        `Please prepare the Google Meet link and send it to ${email} before the call.\n\n` +
        `— Lengenie Auto Notifier`
    );
    ownerPayload.append("_subject", `📅 New Strategy Call Booked — ${name}`);
    ownerPayload.append("_captcha", "false");
    ownerPayload.append("_template", "table");

    const ownerRes = await fetch(
      `https://formsubmit.co/${OWNER_EMAIL}`,
      { method: "POST", body: ownerPayload }
    );

    if (!ownerRes.ok) {
      console.error("formsubmit owner email failed:", ownerRes.status, await ownerRes.text());
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking notify error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
