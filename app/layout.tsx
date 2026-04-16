import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Lengenie — Your Business, Powered by AI", template: "%s | Lengenie" },
  description: "AI-powered web design, chatbots, lead generation, video & mobile apps. Launch your business website for 50% off today. USDC payments · 7-day refund.",
  keywords: "AI web design, AI chatbot, lead generation, promotional video, web scraping, business website, mobile app, USDC",
  metadataBase: new URL("https://lengenie.com"),
  openGraph: {
    title: "Lengenie — Your Business, Powered by AI",
    description: "AI-powered web & business services. 50% off today.",
    type: "website",
    url: "https://lengenie.com",
    siteName: "Lengenie",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lengenie — AI-Powered Business Services" }],
  },
  twitter: { card: "summary_large_image", title: "Lengenie — Your Business, Powered by AI", description: "AI-powered web & business services. 50% off today." },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lengenie",
  url: "https://lengenie.com",
  description: "AI-powered web design, chatbots, and business services agency",
  offers: [
    { "@type": "Offer", name: "Website Design", price: "30", priceCurrency: "USD" },
    { "@type": "Offer", name: "AI Chatbot", price: "30", priceCurrency: "USD" },
    { "@type": "Offer", name: "Web Scraping", price: "60", priceCurrency: "USD" },
    { "@type": "Offer", name: "Mobile App (Android + iOS)", price: "120", priceCurrency: "USD" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} light`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
