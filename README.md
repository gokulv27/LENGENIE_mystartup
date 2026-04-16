# 🤖 Lengenie — AI-Powered Business Services Agency

**"Your Business, Powered by AI"**

A complete, production-ready SaaS marketing website built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build && npm start
```

## 📁 Project Structure

```
app/
├── page.tsx          → Home (hero, services, pricing, FAQ)
├── services/         → Full services catalog
├── pricing/          → Pricing table + comparison
├── checkout/         → 3-step checkout with USDC payment
├── demo/             → Calendly booking page
├── onboarding/       → Post-purchase checklist
├── about/            → Company story + team
├── blog/             → Blog listing (3 placeholder posts)
├── privacy/          → Privacy policy
├── terms/            → Terms of service
├── refund/           → Refund policy
├── sitemap.ts        → Auto-generated sitemap
└── robots.ts         → SEO robots.txt

components/
├── Navbar.tsx           → Sticky navbar with mobile hamburger
├── Footer.tsx           → Full footer with USDC badge + socials
├── MobileBottomBar.tsx  → Sticky CTA bar on mobile
├── CountdownTimer.tsx   → 72-hour rolling countdown
├── PlanCard.tsx         → Pricing plan card with scarcity
├── TestimonialCarousel.tsx → Framer Motion testimonial slider
├── FAQAccordion.tsx     → Animated FAQ accordion
├── PaymentModal.tsx     → USDC payment modal with QR code
├── ServiceCard.tsx      → Service feature card
└── TrustBadges.tsx      → Trust signal badges
```

## 🎨 Brand

- **Primary:** #1A56DB (electric blue)
- **Accent:** #7C3AED (purple)  
- **Background:** #0A0A0F (near black)
- **Font:** Inter (Google Fonts)

## 💳 USDC Payment Setup

Replace in `components/PaymentModal.tsx` and `app/checkout/page.tsx`:
```
const WALLET = "0xYOUR_ACTUAL_WALLET_ADDRESS";
```

To set up real payment detection:
1. Create an [Alchemy](https://alchemy.com) account
2. Set up a webhook for your wallet address
3. Add an API route `/api/payment-status` that checks confirmation
4. The checkout page polls this route after QR is shown

## 📅 Calendly Integration

In `app/demo/page.tsx`, replace the placeholder div with:
```html
<div 
  className="calendly-inline-widget" 
  data-url="https://calendly.com/YOUR_LINK"
  style={{ minWidth: "320px", height: "700px" }}
/>
<script src="https://assets.calendly.com/assets/external/widget.js" async />
```

## 🔧 Customization Checklist

- [ ] Replace wallet address in PaymentModal + checkout
- [ ] Add Calendly link in /demo page
- [ ] Replace testimonial photos (use real client photos)
- [ ] Add real blog posts
- [ ] Configure Google Analytics (add NEXT_PUBLIC_GA_ID)
- [ ] Set up Alchemy webhook for payment confirmation
- [ ] Add OG image at /public/og-image.png (1200×630px)
- [ ] Update contact email from hello@lengenie.com
- [ ] Add Telegram link in footer

## 📊 Services & Pricing

| Service | Original | 50% Off |
|---------|---------|---------|
| Basic Plan | $60 | $30 |
| Standard Plan | $120 | $60 |
| Premium Plan | $240 | $120 |
| Web Scraping Pack | $120 | $60 |
| Mobile App (Android + iOS) | $240 | $120 |
| Logo Design | $60 | $30 |

## ⚡ Features

- ✅ Full-screen animated hero with gradient text
- ✅ 72-hour rolling countdown timer
- ✅ Animated service cards (scroll reveal)
- ✅ 3-tier pricing with comparison table
- ✅ Mobile-first responsive design
- ✅ Hamburger menu on mobile
- ✅ Sticky CTA bar on mobile
- ✅ Framer Motion testimonial carousel
- ✅ Animated FAQ accordion
- ✅ 3-step checkout with upsell modal
- ✅ USDC payment with QR code
- ✅ Schema.org structured data
- ✅ Sitemap + robots.txt auto-generated
- ✅ Social proof bar (marquee logos)
- ✅ Scarcity badges ("Only 3 slots left")
- ✅ "X people bought this week" counters
- ✅ Quiz-style plan selector
- ✅ Pain-first hero copy
- ✅ 7-day refund badges everywhere

## 🚢 Deploy to Vercel

```bash
npx vercel
```
Then set environment variables in Vercel dashboard.

---

Built with ❤️ by Lengenie
