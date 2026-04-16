import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
}

export default function ServiceCard({ icon, title, description, price, oldPrice }: ServiceCardProps) {
  return (
    <div className="card-base p-6 group flex flex-col h-full cursor-pointer">
      <div className="w-12 h-12 flex items-center justify-center border border-gold-muted rounded-md mb-6 text-gold-bright transition-colors trans-150 group-hover:border-gold-primary group-hover:bg-gold-muted/10">
        {icon}
      </div>
      <h3 className="mb-2 transition-colors trans-150 group-hover:text-gold-light">{title}</h3>
      <p className="text-text-secondary text-[14px] flex-1 mb-4">
        {description}
      </p>
      <div className="flex items-center gap-2">
        {oldPrice && (
          <span className="text-text-tertiary font-bold text-[13px] uppercase tracking-wider line-through">
            {oldPrice}
          </span>
        )}
        <div className="text-gold-muted font-bold text-[13px] uppercase tracking-wider group-hover:text-gold-primary transition-colors trans-150">
          from {price}
        </div>
      </div>
    </div>
  );
}
