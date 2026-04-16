"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PlanCard from "@/components/PlanCard";
import GoldDivider from "@/components/GoldDivider";
import { useGeoPricing } from "@/lib/useGeoPricing";
import CountdownTimer from "@/components/CountdownTimer";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const { currencySymbol, convertPrice, isLoading } = useGeoPricing();
  const [isMonthly, setIsMonthly] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary pt-32 flex justify-center">
        <div className="w-4 h-4 bg-gold-primary animate-ping rounded-full" />
      </div>
    );
  }

  // Base USD prices
  const basePrices = { basic: 30, standard: 50, premium: 150 };
  const baseOld = { basic: 60, standard: 100, premium: 300 };
  // One-time = 2× monthly
  const getPrice = (key: keyof typeof basePrices) =>
    convertPrice(isMonthly ? basePrices[key] : basePrices[key] * 2);
  const getOld = (key: keyof typeof baseOld) =>
    convertPrice(isMonthly ? baseOld[key] : baseOld[key] * 2);

  const plans = [
    {
      name: "Basic",
      checkoutPlan: "basic",
      oldPrice: getOld("basic"),
      price: getPrice("basic"),
      buyers: 14,
      isMonthly,
      description: isMonthly
        ? "Includes continuous maintenance, server monitoring, and 30-day rolling support."
        : "This is a one-time purchase at double the monthly cost. A server will be allocated during initial setup only. No maintenance, updates, monitoring, or ongoing support will be provided after delivery.",
      features: [
        "3–5 page branded website",
        "Image gallery & contact form",
        "Basic SEO optimization",
        "SSL certificate included",
        "Amazon Business setup",
        isMonthly ? "30-day rolling support" : "Initial server setup only — no support",
      ],
    },
    {
      name: "Standard",
      checkoutPlan: "standard",
      oldPrice: getOld("standard"),
      price: getPrice("standard"),
      buyers: 22,
      badge: "Most Popular",
      featured: true,
      isMonthly,
      description: isMonthly
        ? "Includes continuous maintenance, server monitoring, updates, support, and ongoing improvements for your business."
        : "This is a one-time purchase at double the monthly cost. A server will be allocated during initial setup only. No maintenance, updates, monitoring, or ongoing support will be provided after delivery.",
      features: [
        "5-page branded website",
        "GPT-4 AI chatbot",
        "WhatsApp & Telegram bot",
        "Google Meet / Calendly scheduler",
        "60s promo video",
        "Lead capture forms + basic SEO",
        isMonthly ? "30-day support + updates" : "NO updates or maintenance after delivery",
      ],
    },
    {
      name: "Premium",
      checkoutPlan: "premium",
      oldPrice: getOld("premium"),
      price: getPrice("premium"),
      buyers: 7,
      badge: "Top Tier",
      scarcity: "Only 3 slots left this month",
      isMonthly: true, // Premium is ALWAYS monthly — no one-time
      description: "Full-stack AI business autonomy. Everything in Standard, plus advanced automation.",
      features: [
        "Everything in Standard",
        "WhatsApp/Telegram lead-qualifying bot",
        "AI voice calls (1 language)",
        "Analytics dashboard",
        "Priority support",
        "Monthly only — no one-time option",
      ],
    },
  ];

  // Comparison table data
  const compareFeatures = [
    "Pages", "AI Chatbot", "WhatsApp Bot", "Promo Video", "SEO Included",
    "Amazon Setup", "Voice Bot", "Analytics", "Support",
  ];
  const compareData: Record<string, (string | boolean)[]> = {
    Basic: ["3–5 pages", "Basic", false, false, true, true, false, false, "30 days"],
    Standard: ["5 pages", "GPT-4", true, "60s video", true, true, false, false, "30 days + updates"],
    Premium: ["5+ pages", "GPT-4", true, "60s video", true, true, true, true, "Priority"],
  };

  const billingFaqs = [
    { q: "Is there a free trial?", a: "No free trial, but every plan comes with a 7-day money-back guarantee." },
    { q: "Can I switch from monthly to one-time later?", a: "Yes. We'll calculate the pro-rated difference and issue an upgrade." },
    { q: "What currencies do you accept?", a: "USDT (crypto) for international clients. UPI / Razorpay / Cards for India." },
    { q: "Is the Premium plan available as a one-time purchase?", a: "No. Premium is monthly only due to the ongoing AI voice infrastructure and analytics dashboard costs." },
  ];

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      {/* Countdown bar */}
      <div className="bg-bg-secondary border-b border-border py-3 px-4 text-center text-[13px] text-text-secondary mb-0 -mt-28 pt-32 sticky top-0 z-30 backdrop-blur-md">
        🔥 Launch Offer: 50% Off All Plans — Ends in{" "}
        <CountdownTimer className="text-gold-bright font-mono ml-1" />
      </div>

      <div className="max-w-[1300px] mx-auto mt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="label mb-4">Pricing</div>
          <GoldDivider />
          <h1 className="mb-4">
            Choose exactly what your business needs.{" "}
            <em className="gold">Upgrade anytime.</em>
          </h1>
          <p className="text-text-secondary max-w-[500px] mx-auto mb-2">
            Meeting scheduling is required before purchase to ensure we recommend the right solution for your business.
          </p>
          <p className="text-text-tertiary text-[13px] italic mb-10">
            Prices are automatically shown in your local currency based on your location.
          </p>

          {/* Monthly / One-Time Toggle */}
          <div className="flex justify-center mb-2">
            <div
              className="bg-bg-tertiary p-1 rounded-full border-[0.5px] border-border inline-flex relative cursor-pointer"
              onClick={() => setIsMonthly(!isMonthly)}
              role="switch"
              aria-checked={isMonthly}
            >
              <motion.div
                className="absolute top-1 bottom-1 w-[130px] bg-gold-primary rounded-full z-0"
                animate={{ left: isMonthly ? 4 : 134 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />
              <div className={`w-[130px] text-center py-2 text-[12px] font-bold tracking-widest uppercase z-10 transition-colors duration-150 ${isMonthly ? "text-bg-primary" : "text-text-primary"}`}>
                Monthly
              </div>
              <div className={`w-[130px] text-center py-2 text-[12px] font-bold tracking-widest uppercase z-10 transition-colors duration-150 ${!isMonthly ? "text-bg-primary" : "text-text-primary"}`}>
                One-Time
              </div>
            </div>
          </div>
          {!isMonthly && (
            <p className="text-gold-muted text-[12px] mt-3">
              ⚠ One-Time = 2× monthly price. No maintenance, updates, or support after delivery.
            </p>
          )}
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((p, i) => (
            <PlanCard key={i} {...p} currencySymbol={currencySymbol} />
          ))}
        </div>

        {/* Add-ons row */}
        <div className="mb-20">
          <h3 className="text-center mb-6">Optional Add-Ons</h3>
          <div className="flex gap-4 overflow-x-auto pb-3 justify-start md:justify-center">
            {[
              { name: "Web Scraping", price: "$60", desc: "10k records + CSV" },
              { name: "Meeting AI", price: "$30", desc: "Smart scheduling" },
              { name: "Logo Design", price: "$10", desc: "Brand kit included" },
              { name: "SEO Boost", price: "$40", desc: "Rankings optimized" },
            ].map((addon) => (
              <div key={addon.name} className="card-base px-6 py-5 shrink-0 min-w-[180px]">
                <p className="text-text-primary font-bold text-[14px] mb-1">{addon.name}</p>
                <p className="text-text-tertiary text-[12px] mb-2">{addon.desc}</p>
                <span className="price text-xl">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>



        {/* Billing FAQ */}
        <div className="max-w-[700px] mx-auto">
          <h3 className="text-center mb-8">Billing Questions</h3>
          <div className="border-t border-border">
            {billingFaqs.map((faq, i) => (
              <div key={i} className="border-b border-border py-5">
                <p className="text-gold-primary font-bold text-[14px] mb-2">Q: {faq.q}</p>
                <p className="text-text-secondary text-[14px] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
