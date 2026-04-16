import GoldDivider from "@/components/GoldDivider";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Lengenie AI Agency",
  description: "Insights on AI automation, web design, lead generation, and growing your business online.",
};

const posts = [
  {
    slug: "why-ai-chatbots-convert-more-leads",
    title: "Why AI Chatbots Convert 3× More Leads Than Contact Forms",
    date: "April 10, 2026",
    tag: "AI Automation",
    excerpt: "Most contact forms convert at under 2%. An AI chatbot that responds instantly, qualifies, and books — converts at 6–8%. Here's the data.",
  },
  {
    slug: "5-day-website-launch-playbook",
    title: "The 5-Day Business Website Launch Playbook",
    date: "April 5, 2026",
    tag: "Web Design",
    excerpt: "From zero to live in 5 days. Here's the exact process we follow to build and launch premium business websites without cutting corners.",
  },
  {
    slug: "usdc-crypto-payments-for-freelancers",
    title: "Why USDT Is the Best Payment Method for Global Service Businesses",
    date: "March 28, 2026",
    tag: "Payments",
    excerpt: "No chargebacks. No fees eating 3% of revenue. No 30-day payment delays. Here's why we use USDT and why you should too.",
  },
  {
    slug: "web-scraping-for-lead-generation",
    title: "How to Generate 10,000 B2B Leads in 5 Days with Web Scraping",
    date: "March 20, 2026",
    tag: "Lead Generation",
    excerpt: "Cold outreach doesn't work without a quality list. Here's how our web scraping service delivers 10,000-record lead lists ready for campaigns.",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 px-4 min-h-screen">
      <div className="max-w-[900px] mx-auto">

        <div className="text-center mb-16">
          <div className="label mb-4">Insights</div>
          <GoldDivider />
          <h1 className="mb-4">The Lengenie Blog</h1>
          <p className="text-text-secondary max-w-[500px] mx-auto">
            Practical guides on AI automation, web strategy, lead generation, and scaling your business online.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="card-base p-8 hover:border-border-strong transition-colors duration-150 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="label text-[10px]">{post.tag}</span>
                  <span className="text-text-tertiary text-[12px]">{post.date}</span>
                </div>
                <h3 className="text-[18px] font-serif font-semibold mb-2 text-text-primary">{post.title}</h3>
                <p className="text-text-secondary text-[14px] leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="btn-outline text-[12px] px-5 py-2 whitespace-nowrap"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
