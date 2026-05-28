"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "@/components/Icons";

export default function ThemeToggle() {
  const [isDark,   setIsDark]   = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored      = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(stored === "dark" || (!stored && prefersDark));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  };

  if (!mounted) {
    return <div className="w-8 h-8 rounded-lg" aria-hidden="true" />;
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors duration-200"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      <motion.div
        key={isDark ? "moon" : "sun"}
        initial={{ scale: 0.5, opacity: 0, rotate: isDark ? -45 : 45 }}
        animate={{ scale: 1,   opacity: 1, rotate: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        {isDark ? <MoonIcon className="w-[15px] h-[15px]" /> : <SunIcon className="w-[15px] h-[15px]" />}
      </motion.div>
    </motion.button>
  );
}
