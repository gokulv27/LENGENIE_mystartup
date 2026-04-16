import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Demo", href: "/demo" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
  ];

  return (
    <footer className="bg-bg-secondary border-t border-border pt-16 pb-8 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* Col 1 — Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-5">
            <Image
              src="/images/company_logo.jpeg"
              alt="Lengenie Logo"
              width={48}
              height={48}
              className="rounded-full object-cover border border-gold-muted"
            />
            <span className="font-serif text-2xl font-bold text-gold-bright tracking-[0.1em]">LENGENIE</span>
          </Link>
          <p className="text-text-secondary text-[14px] leading-relaxed max-w-[280px]">
            Your Business,{" "}
            <em className="gold font-serif">Powered by AI</em>.
            <br />
            From branded website to AI chatbot, lead bot, and promo video — all in one agency.
          </p>
          <p className="text-text-tertiary text-[12px] mt-5">
            🛡 7-day money-back guarantee
          </p>
        </div>

        {/* Col 2 — Navigation */}
        <div>
          <h4 className="text-text-primary font-bold text-[14px] tracking-widest uppercase mb-5">Navigation</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-text-tertiary text-[14px] hover:text-gold-primary transition-colors duration-150"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Legal + Contact */}
        <div>
          <h4 className="text-text-primary font-bold text-[14px] tracking-widest uppercase mb-5">Legal & Contact</h4>
          <ul className="space-y-3 mb-6">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-text-tertiary text-[14px] hover:text-gold-primary transition-colors duration-150"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <a
              href="mailto:gokulvijayanandbusiness@gmail.com"
              className="text-text-tertiary text-[14px] hover:text-gold-primary transition-colors duration-150 block"
            >
              gokulvijayanandbusiness@gmail.com
            </a>
            {/* <a
              href="mailto:support@lengenie.com"
              className="text-text-tertiary text-[14px] hover:text-gold-primary transition-colors duration-150 block"
            >
              support@lengenie.com
            </a> */}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-text-tertiary text-[13px] mx-auto">
          &copy; {new Date().getFullYear()} Lengenie. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
