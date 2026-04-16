"use client";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-t border-[#2A2A3A] px-4 py-3">
      <div className="flex gap-3">
        <Link href="/checkout" className="flex-1">
          <button className="btn-primary w-full py-3 text-sm relative z-10 flex items-center justify-center gap-2">
            <Zap size={14} fill="white" />
            Get Started — $30
          </button>
        </Link>
        <Link href="/demo">
          <button className="btn-secondary py-3 px-4 text-sm">
            Book Demo
          </button>
        </Link>
      </div>
    </div>
  );
}
