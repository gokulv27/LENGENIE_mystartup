import CountdownTimer from "./CountdownTimer";

export default function AnnouncementBar() {
  return (
    <div className="bg-bg-secondary border-b border-border py-2 px-4 text-center text-[13px] text-text-secondary z-50 relative">
      Launch Offer: 50% Off All Plans — Ends in <CountdownTimer className="ml-1" />
    </div>
  );
}
