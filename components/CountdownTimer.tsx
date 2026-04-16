"use client";
import { useState, useEffect } from "react";

function pad(num: number) {
  return num.toString().padStart(2, "0");
}

export default function CountdownTimer({ className = "" }: { className?: string }) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // 72 hours in ms
    const duration = 72 * 60 * 60 * 1000;
    
    // Check sessionStorage for existing end time so it persists across navigation
    let endTimeStr = sessionStorage.getItem("lengenie_countdown");
    if (!endTimeStr) {
      const newEndTime = Date.now() + duration;
      sessionStorage.setItem("lengenie_countdown", newEndTime.toString());
      endTimeStr = newEndTime.toString();
    }
    
    const endTime = parseInt(endTimeStr, 10);

    const updateTimer = () => {
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        // Reset timer if expired for the sake of the rolling demo
        const newEndTime = Date.now() + duration;
        sessionStorage.setItem("lengenie_countdown", newEndTime.toString());
        setTimeLeft({ hours: 71, minutes: 59, seconds: 59 });
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return <span className={`font-mono text-gold-bright opacity-0 ${className}`}>00:00:00</span>;
  }

  const isEndingSoon = timeLeft.hours < 1;

  return (
    <span className={`font-mono text-gold-bright transition-colors ${isEndingSoon ? "animate-pulse font-bold" : ""} ${className}`}>
      {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
    </span>
  );
}
