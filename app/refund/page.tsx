import GoldDivider from "@/components/GoldDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — Lengenie",
  description: "Lengenie's 7-day money-back guarantee and refund process.",
};

export default function RefundPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-[780px] mx-auto">
        <div className="text-center mb-12">
          <div className="label mb-4">Legal</div>
          <GoldDivider />
          <h1 className="mb-2">Refund Policy</h1>
          <p className="text-text-tertiary text-[13px]">Last updated: April 2026</p>
        </div>
        <div className="space-y-8 text-text-secondary text-[15px] leading-relaxed">
          {[
            { title: "7-Day Money-Back Guarantee", body: "Every Lengenie plan includes a 7-day money-back guarantee from the date of purchase. If you are not satisfied with the delivered work, you may request a full refund within 7 days." },
            { title: "How to Request a Refund", body: "Email refund@lengenie.com with your Order ID and a brief reason. We process all refund requests within 24 hours of confirmation." },
            { title: "Crypto Refunds (USDT)", body: "Refunds for USDT payments are sent to the original wallet address used during checkout within 24 hours. Network fees are not refunded." },
            { title: "Fiat Refunds (Razorpay / UPI)", body: "Refunds for Razorpay transactions are processed back to the original payment method within 5–7 business days, depending on your bank." },
            { title: "Non-Refundable Items", body: "Domain registration fees and third-party service fees (e.g., Twilio, Calendly API costs) are non-refundable once incurred." },
            { title: "Questions", body: "For refund questions, contact: refund@lengenie.com" },
          ].map(s => (
            <div key={s.title}>
              <h3 className="text-gold-bright mb-3">{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
