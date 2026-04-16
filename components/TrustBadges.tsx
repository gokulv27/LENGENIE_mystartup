import Image from "next/image";

export default function TrustBadges() {
  return (
    <div className="py-8 border-y border-border max-w-[1000px] mx-auto">
      <div className="relative w-full aspect-[4/1] max-w-[800px] mx-auto rounded-[6px] overflow-hidden">
        <Image src="/images/guarantee section icons.jpeg" alt="Lengenie Guarantees" fill className="object-contain" />
      </div>
    </div>
  );
}
