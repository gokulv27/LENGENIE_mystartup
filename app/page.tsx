"use client";
import React from "react";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import ServiceCard from "@/components/ServiceCard";
import PlanCard from "@/components/PlanCard";
import TrustBadges from "@/components/TrustBadges";
import TestimonialCarousel from "@/components/TestimonialCarousel";

import { Monitor, MessageSquare, Video, Database, PhoneCall, Calendar, Play } from "lucide-react";
import { useGeoPricing } from "@/lib/useGeoPricing";

export default function HomePage() {
  const { currencySymbol, convertPrice, isCryptoAllowed } = useGeoPricing();

  const painPoints = [
    { title: "No website", desc: "Competitors are taking clients you never even heard about. They search, they click, they buy — and you're invisible." },
    { title: "No chatbot", desc: "Every unanswered inquiry is a lost sale. Leads go cold in under 5 minutes without instant response." },
    { title: "No video", desc: "Text alone no longer converts in 2026. Video builds trust 3× faster than any written content." },
  ];

  const services = [
    { icon: <Monitor size={24} />, title: "Website Design", description: "Blazing-fast branded websites. Mobile-first, SEO-ready, conversion-optimized.", oldPrice: "$60", price: "$30" },
    { icon: <MessageSquare size={24} />, title: "AI Chatbot", description: "GPT-4 chatbot for web, WhatsApp & Telegram. Qualifies leads 24/7 while you sleep.", oldPrice: "$100", price: "$50" },
    { icon: <Video size={24} />, title: "Promo Video", description: "AI-powered 60s promotional videos for social, ads and landing pages.", oldPrice: "$120", price: "$60" },
    { icon: <Database size={24} />, title: "Web Scraping", description: "Competitor intel + lead lists. Up to 10,000 records per run, delivered as CSV.", oldPrice: "$120", price: "$60" },
    { icon: <PhoneCall size={24} />, title: "Meeting AI", description: "Smart scheduler with auto follow-ups, reminders and Google Meet integration.", oldPrice: "$60", price: "$30" },
    { icon: <Calendar size={24} />, title: "Ad Campaign", description: "End-to-end management of targeted digital campaigns across Google and Meta.", oldPrice: "$500", price: "$250" },
  ];

  const plans = [
    {
      name: "Basic",
      checkoutPlan: "basic",
      oldPrice: convertPrice(60),
      price: convertPrice(30),
      buyers: 14,
      isMonthly: true,
      description: "Perfect for getting your business online fast with a professional presence.",
      features: [
        "3–5 page branded website",
        "Image gallery & contact form",
        "Basic SEO optimization",
        "SSL certificate included",
        "Amazon Business setup",
        "30-day support",
      ],
    },
    {
      name: "Standard",
      checkoutPlan: "standard",
      oldPrice: convertPrice(100),
      price: convertPrice(50),
      buyers: 22,
      badge: "Most Popular",
      featured: true,
      isMonthly: true,
      description: "The complete AI-powered business suite. Most clients choose this.",
      features: [
        "5-page branded website",
        "GPT-4 AI chatbot",
        "WhatsApp & Telegram bot",
        "Google Calendar scheduler + Meet",
        "60s promo video",
        "Lead capture forms",
        "Basic SEO + 30-day support",
      ],
    },
    {
      name: "Premium",
      checkoutPlan: "premium",
      oldPrice: convertPrice(300),
      price: convertPrice(150),
      buyers: 7,
      badge: "Top Tier",
      scarcity: "Only 3 slots left this month",
      isMonthly: true,
      description: "Full-stack AI business autonomy. Everything in Standard, plus advanced automation.",
      features: [
        "Everything in Standard",
        "WhatsApp/Telegram lead-qualifying bot",
        "AI voice calls (1 language)",
        "Analytics dashboard",
        "Priority support",
        "Monthly — no one-time option",
      ],
    },
  ];

  const steps = [
    { num: "01", title: "Choose your plan", desc: "Select the package that fits your business goals." },
    { num: "02", title: "Send your content", desc: "Fill out a quick form with your details, logo and brand info." },
    { num: "03", title: "Go live in 5 days", desc: "We build and deliver. You sit back and watch clients arrive." },
  ];

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('/images/hero_background_dark_mode.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,var(--bg-primary)/60%,var(--bg-primary)/90%,var(--bg-primary))]" />

        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <div className="label mb-6 inline-block tracking-[0.2em]">AI-Powered Business Services</div>
          <h1 className="mb-6">
            Your Business, Live Online —{" "}
            <em className="gold font-serif">Powered by AI</em>
          </h1>
          <p className="text-text-secondary text-[16px] mb-8 leading-relaxed max-w-[580px] mx-auto">
            From branded website to AI chatbot, lead bot, and promo video — all in one agency.
            Launched in 5 days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
            <Link href="/checkout" className="btn-primary w-full sm:w-auto">
              Get Started — {currencySymbol}{convertPrice(30)} »
            </Link>
            <Link href="/demo" className="btn-outline w-full sm:w-auto flex items-center gap-2">
              <Play size={16} /> Watch Demo
            </Link>
          </div>

          {/* Trust */}
          <p className="text-text-tertiary text-[13px] mb-10">
            🛡 7-day money-back guarantee &middot;{" "}
            {isCryptoAllowed ? "Pay in USDT" : "Pay in Local Currency"} &middot;{" "}
            No contracts
          </p>
        </div>
      </section>

      {/* PAIN POINT SECTION */}
      <section className="py-20 px-4 bg-bg-secondary border-y border-border">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-4">
            <div className="label mb-4">The Problem</div>
            <GoldDivider />
            <h2 className="mb-4">Still losing customers because you're not online?</h2>
            <p className="text-text-secondary max-w-[550px] mx-auto mb-12">
              In 5 days, you'll have an AI-powered site that converts while you sleep.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((pt, i) => (
              <div key={i} className="card-base p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-gold-muted m-4" />
                <h3 className="text-gold-bright mb-3 mt-4">{pt.title}</h3>
                <p className="text-text-secondary text-[14px] leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 px-4 max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <div className="label mb-4">What We Build</div>
          <GoldDivider />
          <h2>Everything Your Business Needs</h2>
          <p className="text-text-secondary mt-4 max-w-[500px] mx-auto">
            One agency. All services. 50% off everything — for a limited time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-bg-secondary border-y border-border">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <div className="label mb-4">Process</div>
            <GoldDivider />
            <h2>How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 relative gap-12 text-center">
            <div className="hidden md:block absolute top-[36px] left-[18%] right-[18%] h-[1px] bg-gold-muted z-0 opacity-40" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 bg-bg-secondary px-4 pt-4">
                <span className="font-serif text-[72px] text-gold-bright leading-none block mb-4 opacity-70">{step.num}</span>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-text-secondary text-[14px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE STRATEGY CALL — Reciprocity */}
      <section className="py-16 px-4 border-b border-border">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="label mb-4">Complimentary</div>
          <GoldDivider />
          <h2 className="mb-4">Book a Free 15-Min Strategy Call</h2>
          <p className="text-text-secondary mb-6">
            Not sure which plan is right for you? Talk to our AI experts before committing.
            Zero obligation. Pure value.
          </p>
          <Link href="/demo" className="btn-outline">
            Book Free Strategy Call →
          </Link>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 px-4 max-w-[1300px] mx-auto" id="pricing">
        <div className="text-center mb-16">
          <div className="label mb-4">Pricing</div>
          <GoldDivider />
          <h2>Simple, Transparent Pricing</h2>
          <p className="text-text-secondary mt-4 max-w-[500px] mx-auto">
            Meeting scheduling is required before purchase to ensure we recommend the right solution.
          </p>
          <p className="text-text-tertiary text-[13px] italic mt-2">
            Prices shown in your local currency based on location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <PlanCard
              key={i}
              name={p.name}
              price={p.price}
              oldPrice={p.oldPrice}
              description={p.description}
              features={p.features}
              featured={p.featured}
              badge={p.badge}
              buyers={p.buyers}
              scarcity={p.scarcity}
              isMonthly={p.isMonthly}
              currencySymbol={currencySymbol}
              checkoutPlan={p.checkoutPlan}
            />
          ))}
        </div>

        {/* Add-ons row */}
        <div className="mt-14">
          <p className="text-center text-text-secondary text-[14px] mb-6">Optional Add-Ons</p>
          <div className="flex gap-4 overflow-x-auto pb-2 justify-start md:justify-center">
            {[
              { name: "Web Scraping", price: "$60" },
              { name: "Meeting AI", price: "$30" },
              { name: "Logo Design", price: "$10" },
              { name: "SEO Boost", price: "$40" },
            ].map((addon) => (
              <div key={addon.name} className="card-base px-6 py-4 shrink-0 flex items-center gap-3">
                <span className="text-text-primary font-medium text-[14px]">{addon.name}</span>
                <span className="price text-[15px]">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-bg-tertiary border-t border-border">
        <TestimonialCarousel />
      </section>

      {/* TRUST + GUARANTEE */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-[1000px] mx-auto">
          <TrustBadges />
        </div>
      </section>


    </div>
  );
}
