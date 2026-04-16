"use client";

import { Star } from "lucide-react";
import GoldDivider from "./GoldDivider";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Restaurant Owner, Lagos",
    initials: "MT",
    quote: "In 5 days I had a complete branded website, WhatsApp bot, and a promo video. My bookings are up 40% in the first month alone. Absolute game-changer.",
  },
  {
    name: "Priya S.",
    role: "Boutique Consultant, Mumbai",
    initials: "PS",
    quote: "The AI chatbot handles 90% of my client queries automatically. I wake up to qualified leads every morning. Best ROI I've seen for any software investment.",
  },
  {
    name: "James K.",
    role: "E-commerce Founder, Toronto",
    initials: "JK",
    quote: "I was skeptical about the 5-day turnaround. They delivered in 4. The quality is premium — you'd never guess it cost a fraction of a traditional agency.",
  },
];

export default function TestimonialCarousel() {
  return (
    <div className="py-20 px-4 max-w-[1200px] mx-auto">
      <div className="text-center mb-14">
        <div className="label mb-4">Social Proof</div>
        <GoldDivider />
        <h2>What Our Clients Say</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="card-base p-8 flex flex-col justify-between hover:border-border-strong transition-colors duration-150">
            <div>
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={15} className="text-gold-primary" fill="currentColor" />
                ))}
              </div>
              <p className="text-text-primary text-[15px] leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div className="w-11 h-11 rounded-full bg-bg-raised border border-gold-muted flex items-center justify-center text-gold-bright font-bold text-[13px] shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="text-text-primary font-bold text-[14px]">{t.name}</p>
                <p className="text-text-tertiary text-[12px]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-text-tertiary text-[13px] mt-10">
        ✦ 22 businesses launched this month
      </p>
    </div>
  );
}
