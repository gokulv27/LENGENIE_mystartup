"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import AnnouncementBar from "./AnnouncementBar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Demo", href: "/demo" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 w-full transition-colors trans-200 ${
          scrolled ? "bg-bg-primary/95 backdrop-blur-md border-b border-border" : "bg-bg-primary"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-[80px] flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/company_logo.jpeg" alt="Lengenie Logo" width={56} height={56} className="rounded-full object-cover border border-gold-muted" />
            <span className="font-serif text-3xl font-bold text-gold-bright tracking-[0.1em]">LENGENIE</span>
          </Link>

          {/* Center: Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-text-secondary hover:text-gold-primary transition-colors trans-150"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/checkout" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button  */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-text-primary p-2 -mr-2"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[110px] z-30 bg-bg-primary p-6 md:hidden overflow-y-auto">
          <nav className="flex flex-col gap-6 mt-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-serif text-text-primary hover:text-gold-primary transition-colors trans-150"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t border-border">
              <Link
                href="/checkout"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center py-4"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
