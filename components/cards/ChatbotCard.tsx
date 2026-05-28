"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { BotIcon, ArrowRightIcon } from "@/components/Icons";

interface ChatbotCardProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function ChatbotCard({ index, isActive, onClick }: ChatbotCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [stage, setStage] = useState<"idle" | "user" | "typing" | "bot">("idle");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (!isHovered) {
      setStage("idle");
      return;
    }
    const t1 = setTimeout(() => setStage("user"),   180);
    const t2 = setTimeout(() => setStage("typing"), 720);
    const t3 = setTimeout(() => setStage("bot"),    2300);
    timersRef.current = [t1, t2, t3];
    return () => timersRef.current.forEach(clearTimeout);
  }, [isHovered]);

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
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 18% 18%, rgba(99,102,241,0.07) 0%, transparent 58%)",
              }}
            />
          )}
        </AnimatePresence>

        <div className="relative p-6 lg:p-8 flex flex-col min-h-[240px]">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
              backgroundColor: isHovered ? "rgba(99,102,241,0.1)" : undefined,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-zinc-100 dark:bg-zinc-800"
          >
            <BotIcon
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
                    Chatbots Inteligentes
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Automação de atendimento e comunicação contextual com IA.
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
                  <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-4">
                    Projetos futuros
                  </p>

                  <div className="space-y-3">
                    {/* User message */}
                    <AnimatePresence>
                      {stage !== "idle" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 420, damping: 26 }}
                          className="flex justify-end"
                        >
                          <div className="bg-indigo-50 dark:bg-indigo-600/15 border border-indigo-100 dark:border-indigo-500/20 text-zinc-700 dark:text-zinc-200 text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                            Olá
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {stage === "typing" && (
                        <motion.div
                          key="typing"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 420, damping: 26 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center flex-shrink-0">
                            <span className="text-[7px] font-bold text-zinc-500 dark:text-zinc-400 tracking-tighter">
                              AI
                            </span>
                          </div>
                          <div className="bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 px-3 py-2 rounded-2xl rounded-tl-sm">
                            <div className="flex gap-[3px] items-center h-4">
                              {[0, 1, 2].map((i) => (
                                <motion.span
                                  key={i}
                                  animate={{ y: [0, -3, 0] }}
                                  transition={{
                                    duration: 0.55,
                                    repeat: Infinity,
                                    delay: i * 0.14,
                                    ease: "easeInOut",
                                  }}
                                  className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500 block"
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bot reply */}
                    <AnimatePresence>
                      {stage === "bot" && (
                        <motion.div
                          key="bot"
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ type: "spring", stiffness: 420, damping: 26 }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[7px] font-bold text-zinc-500 dark:text-zinc-400 tracking-tighter">
                              AI
                            </span>
                          </div>
                          <div className="bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 text-xs px-3 py-2 rounded-2xl rounded-tl-sm leading-relaxed">
                            Estou aprendendo continuamente para construir soluções melhores.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
              Clique para explorar
              <ArrowRightIcon className="w-3 h-3" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
