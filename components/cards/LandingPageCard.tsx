"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GlobeIcon, ArrowRightIcon } from "@/components/Icons";

interface LandingPageCardProps {
  index:    number;
  isActive: boolean;
  onClick:  () => void;
}

export function LandingPageCard({ index, isActive, onClick }: LandingPageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        animate={{
          y: isHovered ? -6 : 0,
          boxShadow: isActive && isHovered
            ? "0 24px 64px -12px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(99,102,241,0.6)"
            : isActive
            ? "0 4px 20px -4px rgba(99,102,241,0.18), 0 0 0 1.5px rgba(99,102,241,0.45)"
            : isHovered
            ? "0 20px 52px -10px rgba(0,0,0,0.26), 0 0 0 1px rgba(99,102,241,0.30)"
            : "0 1px 4px rgba(0,0,0,0.06)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden cursor-pointer"
      >
        {/* Hover gradient */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 18% 18%, rgba(99,102,241,0.07) 0%, transparent 58%)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative p-6 lg:p-8 flex flex-col min-h-[240px]">
          {/* Icon */}
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              backgroundColor: isHovered ? "rgba(99,102,241,0.1)" : undefined,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-zinc-100 dark:bg-zinc-800"
          >
            <GlobeIcon
              className={`w-5 h-5 transition-colors duration-300 ${
                isHovered
                  ? "text-indigo-500 dark:text-indigo-400"
                  : "text-zinc-500 dark:text-zinc-400"
              }`}
            />
          </motion.div>

          {/* Content — swap on hover */}
          <div className="flex-1">
            <AnimatePresence mode="wait" initial={false}>
              {!isHovered ? (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="space-y-2.5"
                >
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    Landing Pages
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Páginas modernas focadas em experiência, presença digital e conversão.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="hover"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="flex flex-col h-full"
                >
                  <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-3">
                    Preview de projeto
                  </p>

                  {/* Mini browser mockup */}
                  <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-800/50">
                      <span className="w-2 h-2 rounded-full bg-red-400/60" />
                      <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                      <span className="w-2 h-2 rounded-full bg-green-400/60" />
                      <div className="ml-2 flex-1 h-4 rounded bg-zinc-200 dark:bg-zinc-700/60 flex items-center px-2 overflow-hidden">
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono truncate">
                          jbpousada.com.br
                        </span>
                      </div>
                    </div>
                    {/* Fake page layout */}
                    <div className="p-3 space-y-2">
                      <div className="h-7 rounded-md bg-zinc-200/80 dark:bg-zinc-800" />
                      <div className="grid grid-cols-3 gap-1.5">
                        <div className="h-10 rounded-md bg-indigo-100/60 dark:bg-indigo-900/25 border border-indigo-200/50 dark:border-indigo-700/20" />
                        <div className="h-10 rounded-md bg-zinc-200/60 dark:bg-zinc-800/70" />
                        <div className="h-10 rounded-md bg-zinc-200/40 dark:bg-zinc-800/50" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 rounded-full bg-zinc-200/80 dark:bg-zinc-700/60 w-4/5" />
                        <div className="h-1.5 rounded-full bg-zinc-200/60 dark:bg-zinc-700/40 w-3/5" />
                        <div className="h-1.5 rounded-full bg-zinc-200/40 dark:bg-zinc-700/30 w-2/5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
            <motion.span
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-500 dark:text-indigo-400"
            >
              Clique para explorar projetos
              <ArrowRightIcon className="w-3 h-3" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
