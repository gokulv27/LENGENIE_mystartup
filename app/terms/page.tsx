import GoldDivider from "@/components/GoldDivider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Lengenie",
  description: "Lengenie's terms of service governing use of our platform and services.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-[780px] mx-auto">
        <div className="text-center mb-12">
          <div className="label mb-4">Legal</div>
          <GoldDivider />
          <h1 className="mb-2">Terms of Service</h1>
          <p className="text-text-tertiary text-[13px]">Last updated: April 2026</p>
        </div>
        <div className="space-y-8 text-text-secondary text-[15px] leading-relaxed">
          {[
            { title: "1. Agreement to Terms", body: "By purchasing any service from Lengenie, you agree to these Terms of Service. These terms govern all client relationships and service deliveries." },
            { title: "2. Services", body: "Lengenie provides AI-powered web design, chatbot development, promo video creation, web scraping, and digital marketing services as described in individual plan descriptions." },
            { title: "3. Payment", body: "Payment is due in full at the time of order. We accept USDT (crypto) and Razorpay/UPI for Indian clients. All prices are shown in your local currency." },
            { title: "4. Delivery", body: "Standard delivery is 5 business days from order confirmation. Premium plan delivery is 48 hours. Delays caused by incomplete client information are not covered by these timelines." },
            { title: "5. Client Responsibilities", body: "Clients must provide all required content (logo, text, images) within 48 hours of order. Failure to do so may delay delivery without entitlement to a refund." },
            { title: "6. Intellectual Property", body: "Upon final payment, all deliverables become the client's property. Lengenie retains no rights to use client work in portfolios without written consent." },
            { title: "7. Limitation of Liability", body: "Lengenie's liability is limited to the amount paid for the specific service. We are not liable for indirect, incidental, or consequential damages." },
            { title: "8. Governing Law", body: "These terms are governed by the laws of the jurisdiction where Lengenie is registered. Disputes will be resolved via binding arbitration." },
            { title: "9. Contact", body: "Legal questions: legal@lengenie.com" },
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
