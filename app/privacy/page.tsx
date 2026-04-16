import GoldDivider from "@/components/GoldDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Lengenie",
  description: "How Lengenie collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-[780px] mx-auto">
        <div className="text-center mb-12">
          <div className="label mb-4">Legal</div>
          <GoldDivider />
          <h1 className="mb-2">Privacy Policy</h1>
          <p className="text-text-tertiary text-[13px]">Last updated: April 2026</p>
        </div>
        <div className="space-y-8 text-text-secondary text-[15px] leading-relaxed">
          {[
            { title: "1. Information We Collect", body: "We collect information you provide directly, such as your name, email address, and payment details when you purchase a plan. We also collect usage data via analytics to improve our services." },
            { title: "2. How We Use Your Information", body: "Your information is used solely to deliver the services you purchased, communicate about your order, and send relevant updates. We do not sell your data to third parties." },
            { title: "3. Payment Security", body: "Crypto payments (USDT) are processed on-chain. Indian clients using Razorpay are protected by Razorpay's PCI-DSS compliance. We do not store raw card data." },
            { title: "4. Data Retention", body: "We retain your order data for 3 years for legal and accounting purposes. You may request deletion of personal data at any time by emailing gokulvijayanandbusiness@gmail.com." },
            { title: "5. Cookies", body: "We use minimal cookies — only what is necessary for session management and analytics. You can disable cookies in your browser settings." },
            { title: "6. Contact", body: "For privacy questions or data deletion requests, contact: gokulvijayanandbusiness@gmail.com" },
          ].map(s => (
            <div key={s.title}>
              <h3 className="text-text-primary mb-3">{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
