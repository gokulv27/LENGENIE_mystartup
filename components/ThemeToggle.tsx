"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check initial format
    if (document.documentElement.classList.contains("light")) {
      setIsLight(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove("light");
      setIsLight(false);
    } else {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-bg-secondary border border-border text-gold-primary hover:border-gold-primary transition-colors trans-150"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isLight ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLight ? <Moon size={18} /> : <Sun size={18} />}
      </motion.div>
    </button>
  );
}
