import GoldDivider from "@/components/GoldDivider";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call — Lengenie",
  description: "Schedule a free 30-minute AI strategy call with Lengenie. See exactly how AI can grow your business before you commit to anything.",
};

const benefits = [
  "Identify the exact AI automation opportunities in your workflow — live, on the call.",
  "See real demonstrations of our website builds, chatbots, and promo videos.",
  "Get a transparent, custom quote tailored to your business size and goals.",
];

export default function DemoPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-[860px] mx-auto">

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

        {/* Calendly embed */}
        <div className="card-base overflow-hidden" style={{ height: "700px" }}>
          <iframe
            src="https://calendly.com/lengenie-demo"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a Free Strategy Call with Lengenie"
            className="bg-bg-primary"
          />
        </div>

        <p className="text-center text-text-tertiary text-[12px] mt-5">
          Can't see the calendar? <a href="https://calendly.com/lengenie-demo" target="_blank" rel="noopener noreferrer" className="text-gold-primary hover:text-gold-bright transition-colors duration-150">Open in new tab →</a>
        </p>

      </div>
    </div>
  );
}
