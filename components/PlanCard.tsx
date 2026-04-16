import Link from "next/link";

interface PlanCardProps {
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  buyers?: number;
  scarcity?: string;
  currencySymbol?: string;
  isMonthly?: boolean;
  checkoutPlan?: string;
}

export default function PlanCard({
  name,
  price,
  oldPrice,
  description,
  features,
  featured,
  badge,
  buyers,
  scarcity,
  currencySymbol = "$",
  isMonthly = true,
  checkoutPlan,
}: PlanCardProps) {
  return (
    <div className={`relative p-8 rounded-[6px] transition-all duration-200 flex flex-col h-full ${
      featured
        ? "bg-bg-tertiary border border-gold-primary hover:-translate-y-1"
        : "bg-bg-secondary border-[0.5px] border-border hover:border-border-strong"
    }`}>
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-primary text-bg-primary text-[11px] font-bold uppercase tracking-[0.15em] py-1 px-4 rounded-sm whitespace-nowrap">
          {badge}
        </div>
      )}

      {/* Scarcity */}
      {scarcity && (
        <div className="mb-4 text-[12px] text-gold-bright border border-gold-muted rounded-sm px-3 py-1.5 inline-block">
          ⚠ {scarcity}
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-2xl font-serif mb-2">{name}</h3>
        <p className="text-text-secondary text-[13px] leading-relaxed">{description}</p>
      </div>

      {/* Price anchor */}
      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-text-tertiary line-through text-[18px]">{currencySymbol}{oldPrice}</span>
        <span className="price text-4xl">{currencySymbol}{price}</span>
        <span className="text-text-tertiary text-[13px]">/{isMonthly ? "mo" : "one-time"}</span>
      </div>

      {/* Social proof */}
      {buyers && (
        <p className="text-text-tertiary text-[12px] mb-6 -mt-3">
          🔥 {buyers} people bought this week
        </p>
      )}

      {/* Features */}
      <div className="flex-1 mb-8">
        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-gold-primary text-[13px] mt-0.5 shrink-0">✦</span>
              <span className="text-text-primary text-[14px] leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Guarantee badge */}
      <p className="text-text-tertiary text-[12px] mb-4 text-center">
        🛡 7-day money-back guarantee
      </p>

      <Link
        href={`/checkout?plan=${checkoutPlan || name.toLowerCase()}`}
        className={`w-full text-center ${featured ? "btn-primary" : "btn-outline"}`}
      >
        {featured ? `Get ${name} →` : `Choose ${name}`}
      </Link>
    </div>
  );
}
