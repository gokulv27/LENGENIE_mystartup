"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import GoldDivider from "@/components/GoldDivider";
import { Check } from "lucide-react";

const steps = [
  { title: "Complete Onboarding Form", desc: "Fill out the quick questionnaire sent to your email with business details, logo, and content." },
  { title: "Review Initial Design Concepts", desc: "Approve the customized aesthetic direction within 24h. We send 2 design options." },
  { title: "AI Training & Bot Setup", desc: "Provide any custom FAQs and business context for your autonomous chatbot training." },
  { title: "Connect Your Domain", desc: "Point your DNS records to our servers. We guide you step-by-step." },
  { title: "Launch 🎉", desc: "Your full AI-powered business site goes live. Watch the leads arrive." },
];

export default function OnboardingPage() {
  const [done, setDone] = useState<number[]>([]);

  const toggle = (i: number) =>
    setDone(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="pt-32 pb-20 px-4 min-h-[85vh]">
      <div className="max-w-[700px] mx-auto">

        <div className="text-center mb-12">
          <div className="label mb-4">Welcome</div>
          <GoldDivider />
          <h1 className="mb-4">You're In — Welcome to Lengenie</h1>
          <p className="text-text-secondary max-w-[500px] mx-auto">
            Payment confirmed. Your order is now active. Use this checklist to track your 5-day build progress.
          </p>
        </div>

        <div className="card-base p-6 md:p-10 mb-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h3>Onboarding Checklist</h3>
            <span className="text-text-tertiary text-[13px]">{done.length} / {steps.length} complete</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-bg-raised rounded-full h-1 mb-8">
            <motion.div
              className="h-1 bg-gold-primary rounded-full"
              animate={{ width: `${(done.length / steps.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => {
              const isDone = done.includes(i);
              return (
                <div
                  key={i}
                  onClick={() => toggle(i)}
                  className={`flex items-start gap-4 p-5 rounded-[6px] border-[0.5px] cursor-pointer transition-all duration-150 ${
                    isDone
                      ? "bg-bg-primary border-gold-muted/40 opacity-60"
                      : "bg-bg-tertiary border-border hover:border-gold-muted"
                  }`}
                >
                  <motion.div
                    animate={isDone ? { scale: [1.2, 1] } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`w-7 h-7 rounded-[4px] border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-150 ${
                      isDone ? "bg-gold-primary border-gold-primary" : "border-border-strong bg-bg-primary"
                    }`}
                  >
                    {isDone && <Check size={14} className="text-bg-primary" />}
                  </motion.div>
                  <div>
                    <h4 className={`text-[15px] font-bold mb-1 transition-all duration-150 ${isDone ? "line-through text-text-secondary" : "text-text-primary"}`}>
                      Step {i + 1}: {step.title}
                    </h4>
                    <p className="text-text-secondary text-[13px] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Support */}
        <div className="text-center">
          <p className="text-text-tertiary text-[14px] mb-2">Need help with any step?</p>
          <a href="mailto:support@lengenie.com" className="text-gold-bright font-bold hover:text-gold-primary transition-colors duration-150">
            support@lengenie.com
          </a>
          <p className="text-text-tertiary text-[12px] mt-4">
            Typical response time: under 4 hours
          </p>
        </div>

      </div>
    </div>
  );
}
