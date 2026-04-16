"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Loader2, ExternalLink } from "lucide-react";

const WALLET = "0x742d35Cc6634C0532925a3b844Bc9e7595f8A123";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  plan: string;
}

export default function PaymentModal({ open, onClose, amount, plan }: PaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"waiting" | "confirmed">("waiting");

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulate payment confirmation for demo
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setStatus("confirmed"), 30000);
      return () => clearTimeout(t);
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-[#111118] border border-[#2A2A3A] rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-lg">Complete Payment</h3>
              <button onClick={onClose} className="text-[#94A3B8] hover:text-white">
                <X size={20} />
              </button>
            </div>

            {status === "waiting" ? (
              <>
                <div className="bg-[#1A1A26] rounded-xl p-4 mb-4 text-center">
                  <p className="text-[#94A3B8] text-xs mb-2">Send exactly</p>
                  <p className="text-white text-3xl font-black">{amount} USDC</p>
                  <p className="text-[#94A3B8] text-xs mt-1">to this wallet address</p>
                </div>

                {/* QR placeholder */}
                <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-center">
                  <div className="w-40 h-40 grid grid-cols-7 gap-0.5">
                    {Array(49).fill(0).map((_, i) => (
                      <div key={i} className={`aspect-square rounded-sm ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                    ))}
                  </div>
                </div>

                <div className="bg-[#1A1A26] rounded-xl p-3 mb-4 flex items-center gap-2">
                  <p className="text-[#94A3B8] text-xs flex-1 font-mono break-all">{WALLET}</p>
                  <button onClick={copyAddress} className="shrink-0 p-1.5 rounded-lg bg-[#1A56DB]/20 hover:bg-[#1A56DB]/40 transition-colors">
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-[#1A56DB]" />}
                  </button>
                </div>

                <div className="bg-[#1A56DB]/10 border border-[#1A56DB]/30 rounded-xl p-3 mb-4">
                  <p className="text-[#94A3B8] text-xs">✅ Accepts ERC-20 (Ethereum) and Polygon USDC</p>
                  <p className="text-[#94A3B8] text-xs mt-1">⚡ Order starts within 1 hour of blockchain confirmation</p>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#94A3B8] text-sm">
                  <Loader2 size={16} className="animate-spin text-[#1A56DB]" />
                  Awaiting payment confirmation...
                </div>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-white font-bold text-xl mb-2">Payment Confirmed!</h4>
                <p className="text-[#94A3B8] text-sm mb-6">Your {plan} order has been received. Check your email for onboarding details.</p>
                <a href="/onboarding">
                  <button className="btn-primary relative z-10">Go to Onboarding →</button>
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
