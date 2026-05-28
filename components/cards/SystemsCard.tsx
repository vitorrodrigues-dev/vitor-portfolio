"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { TerminalIcon, ArrowRightIcon } from "@/components/Icons";

const LINES = [
  "iniciando RemoteFit AI...",
  "monitorando RSS feeds...",
  "processando com Claude API...",
  "salvando no Google Sheets...",
];

const TECH_TAGS = ["Python", "n8n", "Claude API", "Automação"];

interface SystemsCardProps {
  index:    number;
  isActive: boolean;
  onClick:  () => void;
  featured?: boolean;
}

export function SystemsCard({ index, isActive, onClick, featured = false }: SystemsCardProps) {
  const [isHovered, setIsHovered]     = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (featured) {
      // Auto-animate terminal on mount for featured card
      LINES.forEach((_, i) => {
        const t = setTimeout(() => setVisibleCount(i + 1), i * 520 + 900);
        timersRef.current.push(t);
      });
      return () => timersRef.current.forEach(clearTimeout);
    }

    // Hover-triggered for non-featured
    if (!isHovered) {
      setVisibleCount(0);
      return;
    }
    LINES.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), i * 480 + 120);
      timersRef.current.push(t);
    });
    return () => timersRef.current.forEach(clearTimeout);
  }, [isHovered, featured]);

  const terminalVisible = featured || isHovered;

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
            ? "0 24px 64px -12px rgba(0,0,0,0.32), 0 0 0 1.5px rgba(99,102,241,0.65), 0 0 56px -8px rgba(99,102,241,0.16)"
            : isActive
            ? "0 4px 20px -4px rgba(99,102,241,0.22), 0 0 0 1.5px rgba(99,102,241,0.50)"
            : isHovered
            ? "0 20px 52px -10px rgba(0,0,0,0.28), 0 0 0 1px rgba(99,102,241,0.35), 0 0 40px -8px rgba(99,102,241,0.09)"
            : featured
            ? "0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(99,102,241,0.18)"
            : "0 1px 4px rgba(0,0,0,0.06)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className={`relative rounded-2xl border overflow-hidden cursor-pointer bg-white dark:bg-zinc-950 ${
          featured
            ? "border-indigo-500/20 dark:border-indigo-500/15"
            : "border-zinc-200 dark:border-zinc-800"
        }`}
      >
        {/* Featured: top accent gradient line */}
        {featured && (
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 35%, rgba(99,102,241,0.6) 65%, transparent 100%)",
            }}
          />
        )}

        {/* Ambient background glow */}
        <AnimatePresence>
          {(isHovered || featured) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 18% 22%, rgba(99,102,241,0.07) 0%, transparent 55%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── FEATURED layout (full-width bento hero) ── */}
        {featured ? (
          <div className="relative p-8 lg:p-10">
            <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-8 xl:grid-cols-[1fr_290px] xl:gap-10 lg:items-center">

              {/* Left: content */}
              <div className="flex flex-col">
                {/* Pulsing badge */}
                <div className="flex items-center gap-2 mb-5">
                  <motion.span
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 block"
                    />
                    Foco Principal
                  </motion.span>
                </div>

                {/* Icon + Title */}
                <div className="flex items-start gap-3.5 mb-4">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.06 : 1,
                      backgroundColor: isHovered
                        ? "rgba(99,102,241,0.14)"
                        : "rgba(99,102,241,0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-indigo-500/20 dark:border-indigo-500/15"
                  >
                    <TerminalIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                      Sistemas & Automações
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1.5">
                      Soluções inteligentes para otimizar processos, eliminar tarefas repetitivas e escalar resultados com IA aplicada.
                    </p>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {TECH_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
                  <motion.span
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-500 dark:text-indigo-400"
                  >
                    Clique para explorar projetos
                    <ArrowRightIcon className="w-3 h-3" />
                  </motion.span>
                </div>
              </div>

              {/* Right: Terminal — desktop only, always visible */}
              <div className="hidden lg:block mt-4 lg:mt-0">
                <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/60 dark:bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 dark:bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/60 dark:bg-green-500/60" />
                    <span className="ml-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">~/remotefit-ai</span>
                  </div>
                  <div className="p-3.5 font-mono text-xs space-y-1.5 min-h-[116px]">
                    {LINES.slice(0, visibleCount).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-indigo-500 dark:text-indigo-400 select-none">&gt;</span>
                        <span className="text-zinc-600 dark:text-zinc-300">{line}</span>
                      </motion.div>
                    ))}
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-500 dark:text-indigo-400 select-none">&gt;</span>
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-[7px] h-[13px] bg-zinc-500 dark:bg-zinc-400 rounded-[1px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile terminal — shown on hover for sm/md */}
            <div className="lg:hidden">
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-zinc-200 dark:border-zinc-800">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60 dark:bg-red-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 dark:bg-yellow-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60 dark:bg-green-500/60" />
                        <span className="ml-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">~/remotefit-ai</span>
                      </div>
                      <div className="p-3.5 font-mono text-xs space-y-1.5">
                        {LINES.map((line, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-indigo-500 dark:text-indigo-400 select-none">&gt;</span>
                            <span className="text-zinc-600 dark:text-zinc-300">{line}</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-500 dark:text-indigo-400 select-none">&gt;</span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-[7px] h-[13px] bg-zinc-500 dark:bg-zinc-400 rounded-[1px]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ── Standard layout (non-featured) ── */
          <div className="relative p-8 lg:p-10 flex flex-col min-h-[260px]">
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                backgroundColor: isHovered ? "rgba(99,102,241,0.1)" : undefined,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 bg-zinc-100 dark:bg-zinc-800"
            >
              <TerminalIcon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isHovered
                    ? "text-indigo-500 dark:text-indigo-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              />
            </motion.div>

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
                      Sistemas e Automações
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Soluções para otimizar processos e eliminar tarefas repetitivas.
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
                      RemoteFit AI — workflow em execução
                    </p>
                    <div className="flex-1 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-zinc-200 dark:border-zinc-800">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60 dark:bg-red-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 dark:bg-yellow-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60 dark:bg-green-500/60" />
                        <span className="ml-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">~/remotefit-ai</span>
                      </div>
                      <div className="p-3.5 font-mono text-xs space-y-1.5">
                        {LINES.slice(0, visibleCount).map((line, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="flex items-center gap-2"
                          >
                            <span className="text-indigo-500 dark:text-indigo-400 select-none">&gt;</span>
                            <span className="text-zinc-600 dark:text-zinc-300">{line}</span>
                          </motion.div>
                        ))}
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-500 dark:text-indigo-400 select-none">&gt;</span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-[7px] h-[13px] bg-zinc-500 dark:bg-zinc-400 rounded-[1px]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
        )}
      </motion.div>
    </motion.div>
  );
}
