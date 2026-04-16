"use client";
import { useState, Suspense, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Copy, CreditCard, Building, ExternalLink } from "lucide-react";
import { useGeoPricing } from "@/lib/useGeoPricing";
import { QRCodeSVG } from "qrcode.react";

const PLANS = [
  { id: "basic",    name: "Basic",    usdPrice: 30,  desc: "3–5 page site + Contact form + Amazon setup" },
  { id: "standard", name: "Standard", usdPrice: 50,  desc: "5-page site + GPT-4 chatbot + WhatsApp bot + 60s video" },
  { id: "premium",  name: "Premium",  usdPrice: 150, desc: "Everything in Standard + Voice bot + Analytics + Priority" },
];

const ADDONS = [
  { id: "scraping", name: "Web Scraping Pack", usdPrice: 60,  desc: "10,000 records + CSV" },
  { id: "meetai",   name: "Meeting AI",        usdPrice: 30,  desc: "Smart scheduling + reminders" },
  { id: "logo",     name: "Logo Design",       usdPrice: 10,  desc: "Professional logo + brand kit" },
  { id: "seo",      name: "SEO Boost",         usdPrice: 40,  desc: "Rankings optimization" },
];

const WALLET = "BXa6QNeVGgXKCuMVzikvDgLDfjKaA4gQXpLp9jErLrdj";
const GOOGLE_CAL_LINK = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ"; // placeholder

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { currencySymbol, convertPrice, isCryptoAllowed, isLoading } = useGeoPricing();

  const [step, setStep] = useState(1);
  const [planId, setPlanId] = useState(params.get("plan") || "standard");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [hasMeeting, setHasMeeting] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [timerStr, setTimerStr] = useState("15:00");
  const orderId = useRef(`LGN-${Date.now().toString(36).toUpperCase()}`);

  const plan = PLANS.find(p => p.id === planId) || PLANS[1];
  const addonTotal = selectedAddons.reduce((sum, id) => {
    const a = ADDONS.find(a => a.id === id);
    return sum + (a ? convertPrice(a.usdPrice) : 0);
  }, 0);
  const planTotal = convertPrice(plan.usdPrice);
  const total = planTotal + addonTotal;

  // 15-min payment countdown
  useEffect(() => {
    if (step !== 3) return;
    let mins = 15, secs = 0;
    const interval = setInterval(() => {
      if (secs === 0) {
        if (mins === 0) return clearInterval(interval);
        mins--; secs = 59;
      } else { secs--; }
      setTimerStr(`${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary pt-32 flex justify-center">
        <div className="w-4 h-4 bg-gold-primary animate-ping rounded-full" />
      </div>
    );
  }

  const stepLabels = ["Plan", "Meeting", "Payment"];

  const toggleAddon = (id: string) =>
    setSelectedAddons(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const proceedFromMeeting = () => {
    if (!hasMeeting) return;
    // Show upsell if no high-value addons selected
    if (!selectedAddons.includes("scraping") && !selectedAddons.includes("seo")) {
      setShowUpsell(true);
    } else {
      setStep(3);
    }
  };

  return (
    <div className="min-h-[85vh] pt-32 pb-20 px-4 bg-bg-primary">
      <div className="max-w-[680px] mx-auto">
        <h1 className="text-center mb-8">Complete Your Order</h1>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-10">
          {stepLabels.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`flex items-center gap-2`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold transition-all duration-200 ${
                  step > i + 1 ? "bg-gold-muted text-bg-primary"
                  : step === i + 1 ? "bg-gold-primary text-bg-primary"
                  : "bg-bg-secondary border border-border text-text-tertiary"
                }`}>
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </div>
                <span className={`hidden sm:inline text-[12px] font-bold tracking-widest uppercase ${step === i + 1 ? "text-text-primary" : "text-text-tertiary"}`}>{s}</span>
              </div>
              {i < 2 && <ChevronRight size={14} className="text-border mx-3" />}
            </div>
          ))}
        </div>

        <p className="text-center text-text-tertiary text-[12px] italic mb-8">
          Prices shown in your local currency · Order ID: {orderId.current}
        </p>

        <AnimatePresence mode="wait">

          {/* ─── STEP 1: Plan Selection ─── */}
          {step === 1 && (
            <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <h2 className="mb-6">Verify Your Plan</h2>
              <div className="space-y-3 mb-8">
                {PLANS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPlanId(p.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-[6px] border-[0.5px] text-left transition-colors duration-150 ${
                      planId === p.id
                        ? "border-gold-primary bg-bg-secondary"
                        : "border-border bg-bg-primary hover:border-gold-muted"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-150 ${
                      planId === p.id ? "border-gold-primary bg-gold-primary" : "border-border-strong"
                    }`}>
                      {planId === p.id && <Check size={11} className="text-bg-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-text-primary font-bold">{p.name}</div>
                      <div className="text-text-secondary text-[13px]">{p.desc}</div>
                    </div>
                    <div className="price text-xl shrink-0">{currencySymbol}{convertPrice(p.usdPrice)}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="btn-primary w-full">
                Continue to Scheduling »
              </button>
            </motion.div>
          )}

          {/* ─── STEP 2: Schedule Meeting ─── */}
          {step === 2 && (
            <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <div className="text-center mb-6">
                <h2>Schedule Your Strategy Call</h2>
                <p className="text-text-secondary text-[14px] mt-2 max-w-[480px] mx-auto">
                  A quick call ensures we build exactly what your business needs — not a generic template.
                </p>
              </div>

              {/* Google Calendar embed area */}
              <div className="card-base overflow-hidden mb-6 h-[460px] relative">
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="bg-bg-primary"
                  title="Schedule a meeting"
                />
              </div>

              {/* Open in new tab fallback */}
              <a
                href={GOOGLE_CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full flex items-center justify-center gap-2 mb-5"
              >
                <ExternalLink size={16} /> Open Google Calendar Scheduler
              </a>

              {/* Confirmation toggle */}
              <label className="flex items-start gap-3 cursor-pointer p-4 border-[0.5px] border-border rounded-[6px] bg-bg-secondary hover:border-gold-muted transition-colors duration-150 mb-6">
                <input
                  type="checkbox"
                  checked={hasMeeting}
                  onChange={e => setHasMeeting(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-[#c9a84c] shrink-0"
                />
                <span className="text-text-primary text-[14px]">
                  I have successfully scheduled my meeting via the calendar above.
                </span>
              </label>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-outline flex-1">← Back</button>
                <button
                  onClick={proceedFromMeeting}
                  disabled={!hasMeeting}
                  className={`flex-1 rounded-[4px] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.06em] transition-all duration-150 ${
                    hasMeeting
                      ? "btn-primary"
                      : "bg-bg-tertiary text-text-tertiary cursor-not-allowed opacity-50"
                  }`}
                >
                  {hasMeeting ? "Proceed to Payment »" : "🔒 Payment Locked"}
                </button>
              </div>
              {!hasMeeting && (
                <p className="text-center text-gold-muted text-[12px] mt-3">
                  Please schedule a meeting first before making a payment.
                </p>
              )}
            </motion.div>
          )}

          {/* ─── STEP 3: Payment ─── */}
          {step === 3 && (
            <motion.div key="s3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>

              {/* Order summary */}
              <div className="card-base p-6 mb-6 border-gold-muted">
                <h3 className="text-[16px] mb-4">Order Summary</h3>
                <div className="flex justify-between text-[14px] mb-2">
                  <span className="text-text-secondary">{plan.name}</span>
                  <span className="text-text-primary font-bold">{currencySymbol}{planTotal}</span>
                </div>
                {selectedAddons.map(id => {
                  const a = ADDONS.find(a => a.id === id);
                  return a ? (
                    <div key={id} className="flex justify-between text-[13px] mb-2">
                      <span className="text-text-tertiary">{a.name}</span>
                      <span className="text-text-secondary">+{currencySymbol}{convertPrice(a.usdPrice)}</span>
                    </div>
                  ) : null;
                })}
                <div className="border-t border-border pt-3 mt-3 flex justify-between items-center">
                  <span className="text-text-primary font-bold uppercase tracking-widest text-[12px]">Total</span>
                  <span className="price text-2xl">{currencySymbol}{total}</span>
                </div>
                <p className="text-text-tertiary text-[11px] mt-2">Order ID: {orderId.current} · Meeting Confirmed ✓</p>
              </div>

              {/* India-only payment methods */}
              {!isCryptoAllowed ? (
                <div className="card-base p-6 mb-6">
                  <h3 className="mb-5">Choose Payment Method</h3>
                  <div className="bg-bg-tertiary border border-gold-muted/30 rounded-[4px] p-3 mb-6 text-center">
                    <p className="text-gold-muted text-[12px]">
                      ℹ Cryptocurrency payments are not available in your region.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: <CreditCard size={20} className="text-gold-primary" />, label: "Credit / Debit Card", sub: "Via Razorpay" },
                      { icon: <Building size={20} className="text-gold-primary" />, label: "UPI / Net Banking", sub: "Instant transfer" },
                      { icon: <Building size={20} className="text-gold-primary" />, label: "Bank Transfer / NEFT", sub: "1-2 business days" },
                    ].map(m => (
                      <button key={m.label} className="w-full flex items-center justify-between p-4 border-[0.5px] border-border rounded-[6px] hover:border-gold-primary bg-bg-primary transition-colors duration-150">
                        <div className="flex items-center gap-3">
                          {m.icon}
                          <span className="font-bold text-text-primary text-[14px]">{m.label}</span>
                        </div>
                        <span className="text-text-tertiary text-[12px]">{m.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Crypto USDT payment */
                <div className="mb-6">
                  <div className="card-base p-6 text-center mb-5">
                    <div className="label mb-2">Send exactly</div>
                    <div className="price text-5xl mb-1">{total} USDT</div>
                    <p className="text-text-tertiary text-[12px]">SOL · TRC-20 · ERC-20 accepted</p>
                    <p className="text-text-tertiary text-[12px] mt-1">Memo / Reference: <strong className="text-gold-muted">{orderId.current}</strong></p>
                  </div>

                  <div className="flex justify-center mb-5">
                    <div className="bg-white p-5 rounded-[6px]">
                      <QRCodeSVG value={WALLET} size={176} />
                    </div>
                  </div>

                  <div className="card-base p-4 mb-5 flex items-center gap-3">
                    <p className="text-text-secondary text-[12px] flex-1 font-mono break-all">{WALLET}</p>
                    <button
                      onClick={() => { navigator.clipboard.writeText(WALLET); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                      className="shrink-0 p-3 rounded bg-bg-tertiary border border-border hover:border-gold-primary transition-colors duration-150"
                    >
                      {copied ? <Check size={15} className="text-gold-bright" /> : <Copy size={15} className="text-text-primary" />}
                    </button>
                  </div>

                  <div className="bg-bg-tertiary text-center p-3 rounded-[4px] border border-border mb-5">
                    <p className="text-text-tertiary text-[12px]">
                      🔁 Refunds sent to original wallet within 24h &middot; Payment window: <span className="text-gold-bright font-mono">{timerStr}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Awaiting confirmation dot */}
              <div className="flex items-center gap-4 bg-bg-secondary border border-gold-muted/40 p-5 rounded-[6px]">
                <div className="relative flex h-3 w-3 shrink-0">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${paymentDone ? "bg-green-400" : "bg-gold-bright"}`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${paymentDone ? "bg-green-500" : "bg-gold-primary"}`} />
                </div>
                <div>
                  <p className="text-text-primary text-[14px] font-bold">
                    {paymentDone ? "Payment Received! Redirecting..." : "Awaiting payment confirmation..."}
                  </p>
                  <p className="text-text-tertiary text-[12px] mt-1">
                    {paymentDone ? "" : "Your order begins within 1 hour of confirmation."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ─── Upsell Modal ─── */}
        <AnimatePresence>
          {showUpsell && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-bg-primary/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => { setShowUpsell(false); setStep(3); }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }}
                className="card-base border-gold-primary p-8 max-w-sm w-full"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="mb-2 text-center">Wait — Special Bundle!</h3>
                <p className="text-text-secondary text-[13px] text-center mb-6">
                  Add Web Scraping + SEO Boost for just <strong className="text-gold-bright">{currencySymbol}{convertPrice(80)}</strong> (normally {currencySymbol}{convertPrice(100)}).
                </p>
                <div className="bg-bg-tertiary rounded-[4px] p-4 border border-border mb-6">
                  {[{ name: "Web Scraping", desc: "10,000 lead records + CSV" }, { name: "SEO Boost", desc: "Rankings optimized" }].map(i => (
                    <div key={i.name} className="flex items-start gap-2 mb-2">
                      <Check size={13} className="text-gold-primary mt-0.5" />
                      <div>
                        <p className="text-text-primary text-[13px] font-bold">{i.name}</p>
                        <p className="text-text-tertiary text-[12px]">{i.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => { toggleAddon("scraping"); toggleAddon("seo"); setShowUpsell(false); setStep(3); }}
                  className="btn-primary w-full mb-3"
                >
                  Yes, Add Bundle »
                </button>
                <button
                  onClick={() => { setShowUpsell(false); setStep(3); }}
                  className="w-full text-text-tertiary text-[12px] py-2 hover:text-text-primary uppercase tracking-widest font-bold transition-colors duration-150"
                >
                  No thanks, continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary pt-32 flex justify-center"><div className="w-4 h-4 bg-gold-primary animate-ping rounded-full" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
