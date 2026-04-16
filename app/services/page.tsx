import { Monitor, MessageSquare, Video, Database, PhoneCall, Calendar } from "lucide-react";
import GoldDivider from "@/components/GoldDivider";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  const services = [
    { id: "web", icon: <Monitor size={32}/>, title: "Website Design", desc: "Blazing-fast, custom websites tailored for high lead conversion. Mobile-first and SEO-ready on day one.", oldPrice: "$60", price: "$30", features: ["Performance Optimized", "Fully Responsive", "Custom Branding", "CMS Enabled"], image: "/images/Services section .jpeg" },
    { id: "chat", icon: <MessageSquare size={32}/>, title: "AI Chatbot", desc: "A 24/7 intelligent agent trained specifically on your business documentation. Embeds in minutes.", oldPrice: "$100", price: "$50", features: ["Trained on your data", "Lead capture forms", "Multilingual", "Human handoff"], image: "/images/AI chatbot card.jpeg" },
    { id: "video", icon: <Video size={32}/>, title: "Promo Video", desc: "AI-generated professional promotional videos for social media, ads, and landing pages.", oldPrice: "$120", price: "$60", features: ["1080p HD Export", "Professional Voiceover", "Royalty-free B-roll", "Custom scripts"], image: "/images/Promo video card.jpeg" },
  ];

  return (
    <div className="pt-32 pb-20 px-4">
       <div className="max-w-[1000px] mx-auto text-center mb-24">
         <div className="label mb-4">Our Services</div>
         <GoldDivider />
         <h1 className="mb-4">Premium Business Solutions</h1>
         <p className="text-text-secondary max-w-[600px] mx-auto">
            From establishing your online presence to automating customer interactions. Every service is delivered in under 5 days.
         </p>
       </div>

       {/* Full detail sections */}
       <div className="max-w-[1000px] mx-auto space-y-32">
          {services.map((svc, i) => (
             <div key={svc.id} className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Visual Block Mockup */}
                <div className="flex-1 w-full bg-bg-secondary border border-border rounded-[6px] aspect-square relative overflow-hidden group">
                   <Image src={svc.image} alt={svc.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                
                {/* Text Block */}
                <div className="flex-1">
                   <h2 className="mb-4">{svc.title}</h2>
                   <p className="text-text-secondary mb-8">{svc.desc}</p>
                   
                   <ul className="space-y-3 mb-8">
                      {svc.features.map((f, j) => (
                         <li key={j} className="flex items-center gap-3">
                           <span className="text-gold-primary text-xs tracking-widest uppercase">✦</span>
                           <span className="text-text-primary text-[15px]">{f}</span>
                         </li>
                      ))}
                   </ul>

                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                         <span className="text-text-tertiary line-through text-2xl">{svc.oldPrice}</span>
                         <span className="price text-3xl">{svc.price}</span>
                      </div>
                      <Link href={`/checkout?addon=${svc.id}`} className="btn-primary">
                         Add to Order &raquo;
                      </Link>
                   </div>
                </div>
             </div>
          ))}

          {/* Special Web Scraping Block */}
          <div className="bg-bg-tertiary border border-gold-strong rounded-[6px] p-8 md:p-16 text-center transform hover:-translate-y-1 trans-200">
             <div className="inline-block bg-gold-primary text-black font-bold uppercase tracking-widest text-[11px] px-3 py-1 mb-6 rounded-sm">
                NEW RELEASE
             </div>
             <div className="flex justify-center mb-6">
                <Image src="/images/Web scraping card.jpeg" alt="Web Scraping" width={600} height={400} className="rounded border border-border-strong w-full max-w-[600px] object-cover aspect-video mb-8" />
             </div>
             <h2 className="mb-4">Competitor Intel &amp; Lead Pack</h2>
             <p className="text-text-secondary max-w-[600px] mx-auto mb-8">
                Get up to 10,000 records scraped from competitors, industry directories, and social platforms. Delivered as clean CSVs ready for cold outreach.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                   <span className="text-text-tertiary line-through text-2xl">$120</span>
                   <span className="price text-4xl">$60</span>
                </div>
                <Link href="/checkout?addon=scraping" className="btn-primary">
                   Order Scraping &raquo;
                </Link>
             </div>
          </div>
       </div>
    </div>
  );
}
