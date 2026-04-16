import { ShieldAlert, RefreshCcw, Lock } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="py-10 border-y border-border max-w-[1000px] mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
        <div className="flex items-center gap-3 text-text-secondary">
          <RefreshCcw size={24} className="text-gold-primary" />
          <span className="text-[14px] font-medium tracking-wide">7-Day Refund Policy</span>
        </div>
        <div className="flex items-center gap-3 text-text-secondary">
          <ShieldAlert size={24} className="text-gold-primary" />
          <span className="text-[14px] font-medium tracking-wide">Secure Crypto & Fiat</span>
        </div>
        <div className="flex items-center gap-3 text-text-secondary">
          <Lock size={24} className="text-gold-primary" />
          <span className="text-[14px] font-medium tracking-wide">SSL Encrypted Checkout</span>
        </div>
      </div>
    </div>
  );
}
