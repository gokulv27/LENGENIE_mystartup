"use client";

import GoldDivider from "@/components/GoldDivider";
import { Check, Calendar, Clock, Video, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const benefits = [
  "Identify the exact AI automation opportunities in your workflow — live, on the call.",
  "See real demonstrations of our website builds, chatbots, and promo videos.",
  "Get a transparent, custom quote tailored to your business size and goals.",
];

const CALENDAR_ID = "tuzy novv aybl lznn";

// Google Calendar appointment scheduling URL
const GCAL_SCHEDULE_URL = `https://calendar.google.com/calendar/appointments/schedules/${encodeURIComponent(CALENDAR_ID)}`;

// Google Calendar invite URL builder — adds event to user's own calendar
function buildGCalInviteUrl(name: string, email: string, date: string, time: string) {
  // Combine date + time into a Date object
  const startDt = new Date(`${date}T${time}:00`);
  const endDt = new Date(startDt.getTime() + 30 * 60 * 1000); // 30-min slot

  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Lengenie Free Strategy Call",
    details:
      "Your free 30-minute AI strategy call with Lengenie. Join via Google Meet link that will be sent to your email.",
    location: "Google Meet (link sent by email)",
    dates: `${fmt(startDt)}/${fmt(endDt)}`,
    add: `${CALENDAR_ID}`,
    crm: "AVAILABLE",
    sf: "true",
    output: "xml",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function DemoPage() {
  const [step, setStep] = useState<"pick" | "details" | "confirm">("pick");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Generate next 14 days
  const today = new Date();
  const dates: { label: string; value: string; day: string }[] = [];
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const value = d.toISOString().split("T")[0];
    const day = d.toLocaleDateString("en-US", { weekday: "short" });
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dates.push({ value, day, label });
  }

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00",
  ];

  const handleBookConfirm = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      // 1️⃣ Notify the owner via server-side API (formsubmit.co)
      await fetch("/api/booking/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          date: selectedDate,
          time: selectedTime,
        }),
      });
    } catch (e) {
      // non-blocking — don't stop the booking if notification fails
      console.error("Owner notification failed:", e);
    }

    // 2️⃣ Open Google Calendar invite for the customer
    const inviteUrl = buildGCalInviteUrl(name, email, selectedDate, selectedTime);
    window.open(inviteUrl, "_blank", "noopener,noreferrer");

    // 3️⃣ Draft a confirmation email to the customer via mailto
    const startDt = new Date(`${selectedDate}T${selectedTime}:00`);
    const dateStr = startDt.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeStr = startDt.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const mailBody = encodeURIComponent(
      `Hi ${name},\n\nYour Lengenie strategy call is confirmed!\n\n📅 Date: ${dateStr}\n🕐 Time: ${timeStr}\n📍 Location: Google Meet (link will be sent separately)\n\nWe look forward to speaking with you!\n\nBest,\nThe Lengenie Team\nlengenie.vercel.app`
    );
    const mailSubject = encodeURIComponent("Your Lengenie Strategy Call Confirmation");
    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;

    setSubmitting(false);
    setStep("confirm");
  };

  const displayDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-[900px] mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="label mb-4">Free Consultation</div>
          <GoldDivider />
          <h1 className="mb-4">Book Your Free 30-Min Strategy Call</h1>
          <p className="text-text-secondary max-w-[560px] mx-auto mb-8">
            Talk to our AI business experts before spending a cent. Zero obligation — pure value.
          </p>

          <div className="flex flex-col sm:flex-row items-start justify-center gap-6 max-w-[680px] mx-auto mb-12">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-left flex-1">
                <div className="w-5 h-5 rounded-full bg-gold-muted/20 border border-gold-muted flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-gold-primary" />
                </div>
                <p className="text-text-secondary text-[14px] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Image Block */}
        <div className="relative w-full h-[300px] sm:h-[400px] rounded-[6px] overflow-hidden border border-border mb-12">
          <Image
            src="/images/ team section.jpeg"
            alt="The Lengenie AI Team"
            fill
            className="object-cover opacity-80"
          />
        </div>

        {/* Booking Widget */}
        {step === "confirm" ? (
          /* ─────────────── CONFIRMATION ─────────────── */
          <div className="card-base p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-muted/20 border border-gold-primary flex items-center justify-center mx-auto mb-6">
              <Calendar size={28} className="text-gold-primary" />
            </div>
            <h2 className="mb-2">You&apos;re Booked!</h2>
            <p className="text-text-secondary mb-2">
              {displayDate} at{" "}
              {new Date(`${selectedDate}T${selectedTime}:00`).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="text-text-tertiary text-[13px] mb-6">
              A Google Calendar invite has opened in a new tab. A confirmation email is being sent to <span className="text-gold-primary">{email}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={buildGCalInviteUrl(name, email, selectedDate, selectedTime)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                📅 Add to Google Calendar
              </a>
              <button
                onClick={() => { setStep("pick"); setSelectedDate(""); setSelectedTime(""); setSubmitting(false); }}
                className="btn-outline"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (
          <div className="card-base overflow-hidden">
            {/* Step indicator */}
            <div className="flex border-b border-border">
              {[
                { label: "Pick a Date & Time", icon: <Calendar size={14} /> },
                { label: "Your Details", icon: <Mail size={14} /> },
              ].map((s, i) => {
                const active = (step === "pick" && i === 0) || (step === "details" && i === 1);
                const done = (step === "details" && i === 0);
                return (
                  <div
                    key={i}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-[12px] font-medium uppercase tracking-wider border-b-2 transition-colors duration-150 ${
                      active
                        ? "border-gold-primary text-gold-primary"
                        : done
                        ? "border-gold-muted text-gold-muted"
                        : "border-transparent text-text-tertiary"
                    }`}
                  >
                    {s.icon} {s.label}
                  </div>
                );
              })}
            </div>

            {step === "pick" && (
              <div className="p-6 md:p-10">
                {/* Call info bar */}
                <div className="flex gap-6 text-[13px] text-text-secondary mb-8">
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-gold-primary" /> 30 minutes</span>
                  <span className="flex items-center gap-1.5"><Video size={14} className="text-gold-primary" /> Google Meet</span>
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-gold-primary" /> Free</span>
                </div>

                {/* Date picker */}
                <p className="text-[11px] uppercase tracking-widest text-gold-primary font-semibold mb-4">Select a Date</p>
                <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setSelectedDate(d.value)}
                      className={`shrink-0 flex flex-col items-center px-4 py-3 rounded border transition-all duration-150 min-w-[64px] ${
                        selectedDate === d.value
                          ? "border-gold-primary bg-gold-primary/10 text-gold-bright"
                          : "border-border text-text-secondary hover:border-gold-muted"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-widest mb-1">{d.day}</span>
                      <span className="text-[15px] font-semibold">{d.label.split(" ")[1]}</span>
                      <span className="text-[10px] mt-0.5 opacity-60">{d.label.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Time picker */}
                {selectedDate && (
                  <>
                    <p className="text-[11px] uppercase tracking-widest text-gold-primary font-semibold mb-4">Select a Time</p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-8">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-2.5 rounded border text-[13px] font-medium transition-all duration-150 ${
                            selectedTime === t
                              ? "border-gold-primary bg-gold-primary/10 text-gold-bright"
                              : "border-border text-text-secondary hover:border-gold-muted"
                          }`}
                        >
                          {new Date(`2000-01-01T${t}:00`).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep("details")}
                  className={`btn-primary w-full sm:w-auto ${!selectedDate || !selectedTime ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  Continue →
                </button>
              </div>
            )}

            {step === "details" && (
              <div className="p-6 md:p-10">
                <button
                  onClick={() => setStep("pick")}
                  className="text-gold-primary text-[13px] flex items-center gap-1 mb-6 hover:text-gold-bright transition-colors"
                >
                  ← Back
                </button>

                <div className="card-base p-4 mb-8 flex items-center gap-4">
                  <Calendar size={20} className="text-gold-primary shrink-0" />
                  <div>
                    <p className="text-text-primary font-medium text-[14px]">
                      {displayDate}
                    </p>
                    <p className="text-text-tertiary text-[13px]">
                      {new Date(`${selectedDate}T${selectedTime}:00`).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      · 30 min · Google Meet
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-[12px] uppercase tracking-widest text-gold-primary font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded border border-border bg-bg-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-gold-primary transition-colors text-[14px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] uppercase tracking-widest text-gold-primary font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded border border-border bg-bg-secondary text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-gold-primary transition-colors text-[14px]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-[13px] mb-4">{error}</p>
                )}

                <button
                  onClick={handleBookConfirm}
                  disabled={submitting}
                  className={`btn-primary w-full sm:w-auto flex items-center gap-2 ${submitting ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "📅 Confirm & Add to Google Calendar"
                  )}
                </button>

                <p className="text-text-tertiary text-[12px] mt-4">
                  A Google Calendar invite will open instantly. A confirmation email will be drafted to your inbox.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Alternative link */}
        <p className="text-center text-text-tertiary text-[12px] mt-5">
          Prefer to book directly?{" "}
          <a
            href={GCAL_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-primary hover:text-gold-bright transition-colors duration-150"
          >
            Open Google Calendar scheduler →
          </a>
        </p>

      </div>
    </div>
  );
}
