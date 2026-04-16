import GoldDivider from "@/components/GoldDivider";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Lengenie — AI-Powered Business Agency",
  description: "Learn about Lengenie — who we are, what we believe, and why we built an AI agency that launches businesses in 5 days.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-[800px] mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="label mb-4">Our Story</div>
          <GoldDivider />
          <h1 className="mb-4">Built for Businesses That Can't Wait</h1>
          <p className="text-text-secondary max-w-[600px] mx-auto">
            Lengenie was born from a simple frustration: quality web and AI services were only accessible to large companies.
            Small businesses were left behind — paying agencies tens of thousands for results they could have had in days.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full h-[300px] rounded-[6px] overflow-hidden border border-border mb-16">
          <Image
            src="/images/ team section.jpeg"
            alt="Lengenie Team"
            fill
            className="object-cover opacity-80"
          />
        </div>

        {/* Mission */}
        <div className="card-base p-8 mb-10">
          <h2 className="mb-4">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed">
            To democratize premium AI-powered business infrastructure for entrepreneurs, startups, and small businesses worldwide.
            Every business — regardless of size or budget — deserves a professional online presence with the intelligence to grow.
          </p>
        </div>

        {/* Values */}
        <h2 className="mb-6">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {[
            { title: "Speed", desc: "We deliver in 5 days because your business can't afford to wait. Time is competitive advantage." },
            { title: "Quality", desc: "Premium doesn't have to be expensive. We use AI to achieve agency-quality at startup prices." },
            { title: "Trust", desc: "7-day money-back guarantee, no contracts, transparent pricing. We earn trust through results." },
          ].map((v, i) => (
            <div key={i} className="card-base p-6">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-gold-primary ml-6 mt-2" />
              <h3 className="text-gold-bright mb-3 mt-2">{v.title}</h3>
              <p className="text-text-secondary text-[14px] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/demo" className="btn-primary mr-4">Book a Free Call →</Link>
          <Link href="/pricing" className="btn-outline">View Pricing</Link>
        </div>

      </div>
    </div>
  );
}
