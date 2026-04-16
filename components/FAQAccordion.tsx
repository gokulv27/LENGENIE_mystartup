"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldDivider from "./GoldDivider";

const faqs = [
  {
    q: "What exactly is included in the 5-day delivery?",
    a: "Everything listed in your chosen plan — custom design, AI chatbot training, SSL setup, hosting configuration, and mobile responsiveness. We work fast without cutting corners. You'll receive a staging preview on day 3 for approval before final launch.",
  },
  {
    q: "Do you offer a money-back guarantee?",
    a: "Yes — every plan includes a 7-day money-back guarantee, no questions asked. If you're not satisfied with the delivered work, we'll refund to your original payment method (or USDT wallet) within 24 hours.",
  },
  {
    q: "How does the AI chatbot work on my website?",
    a: "We train a GPT-4 powered agent on your business documents, FAQ content, pricing, and website copy. It embeds directly into your site and handles inquiries, qualifies leads, books calls, and escalates to you only when necessary.",
  },
  {
    q: "Can the chatbot work on WhatsApp and Telegram too?",
    a: "Yes — Standard and Premium plans include WhatsApp and Telegram bot integration via Twilio and the respective platform APIs. Customers can reach your AI agent on the channels they already use daily.",
  },
  {
    q: "What happens after delivery? Do you offer ongoing support?",
    a: "The Monthly plan includes continuous server monitoring, updates, and 30-day rolling support. The One-Time plan allocates a server during setup only — no maintenance or updates follow. We'll recommend the right option on your strategy call.",
  },
  {
    q: "Why do I need to schedule a meeting before purchasing?",
    a: "Because cookie-cutter solutions don't work. A 15-minute call ensures we understand your business, niche, and goals — so you get a setup that actually converts, not just a template with your logo on it.",
  },
  {
    q: "What payment methods are accepted?",
    a: "For international clients: USDT (SOL / TRC-20 / ERC-20 networks). For Indian clients: UPI, Credit/Debit Card, Net Banking, and Razorpay. Cryptocurrency is not available in India per local regulations.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. Start with Basic, upgrade to Standard or Premium anytime. We'll credit the difference and migrate your existing setup seamlessly — no rebuilds, no downtime.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="py-20 px-4 max-w-[800px] mx-auto">
      <div className="text-center mb-12">
        <div className="label mb-4">FAQ</div>
        <GoldDivider />
        <h2>Frequently Asked Questions</h2>
      </div>

      <div className="border-t border-border">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-border">
              <button
                className="w-full text-left py-6 flex justify-between items-start gap-4 group"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={`font-serif text-[17px] leading-snug transition-colors duration-150 ${isOpen ? "text-gold-bright" : "text-text-primary group-hover:text-gold-primary"}`}>
                  {faq.q}
                </span>
                <span className={`text-gold-primary text-xl font-mono leading-none shrink-0 transition-transform duration-150 ${isOpen ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-text-secondary text-[15px] leading-relaxed pr-8">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
