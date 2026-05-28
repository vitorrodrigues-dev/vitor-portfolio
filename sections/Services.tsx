"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@/components/Icons";
import { LandingPageCard } from "@/components/cards/LandingPageCard";
import { SystemsCard } from "@/components/cards/SystemsCard";
import { ChatbotCard } from "@/components/cards/ChatbotCard";
import type { ServiceId } from "@/types";
import {
  LandingModalContent,
  SystemsModalContent,
  ChatbotModalContent,
} from "@/components/ServiceModalContent";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const MODAL_TITLES: Record<ServiceId, string> = {
  landing: "Projetos desenvolvidos",
  systems: "Projetos desenvolvidos",
  chatbot: "Projetos futuros",
};

const revealVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Services() {
  const [activeService, setActiveService] = useState<ServiceId | null>(null);

  const handleOpen  = (id: ServiceId) => setActiveService(id);
  const handleClose = ()               => setActiveService(null);

  return (
    <>
      <section id="servicos" className="py-16 lg:py-24" aria-label="Serviços">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Section label */}
          <motion.div
            className="mb-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={revealVariant}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              Serviços
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            className="grid lg:grid-cols-5 gap-6 lg:gap-10 mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <motion.div className="lg:col-span-3" variants={revealVariant}>
              <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
                O que posso construir para você.
              </h2>
            </motion.div>
            <motion.div className="lg:col-span-2 flex items-end" variants={revealVariant}>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                Desde presença digital a automações com IA — cada entrega pensada para resolver um problema real.
              </p>
            </motion.div>
          </motion.div>

          {/* Bento grid — Landing + Chatbot no topo, Systems featured como destaque final */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {/* Top row — Landing + Chatbot animam via whileInView próprio */}
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
              <LandingPageCard
                index={0}
                isActive={activeService === "landing"}
                onClick={() => handleOpen("landing")}
              />
              <ChatbotCard
                index={1}
                isActive={activeService === "chatbot"}
                onClick={() => handleOpen("chatbot")}
              />
            </div>

            {/* Featured bottom — Systems crescendo */}
            <SystemsCard
              index={2}
              isActive={activeService === "systems"}
              onClick={() => handleOpen("systems")}
              featured
            />
          </div>

        </div>
      </section>

      {/* ── Modal overlay ── */}
      <AnimatePresence>
        {activeService && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleClose}
              className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              key="modal-wrapper"
              className="fixed inset-0 z-[61] flex items-center justify-center p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.88, opacity: 0, y: 24 }}
                animate={{ scale: 1,    opacity: 1, y: 0  }}
                exit={{    scale: 0.88, opacity: 0, y: 24 }}
                transition={{ type: "spring", stiffness: 340, damping: 32 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white/95 dark:bg-zinc-950/95 border border-zinc-200/60 dark:border-zinc-800/60 backdrop-blur-xl shadow-2xl shadow-black/25 dark:shadow-black/60 p-5 sm:p-6 lg:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(ellipse at 0% 0%, rgba(99,102,241,0.06) 0%, transparent 50%)",
                  }}
                />

                <div className="relative flex items-center gap-3 mb-6">
                  <div className="h-px w-5 bg-zinc-300 dark:bg-zinc-700 shrink-0" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    {MODAL_TITLES[activeService]}
                  </span>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  <button
                    onClick={handleClose}
                    className="w-10 h-10 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 -mr-1.5 sm:mr-0"
                    aria-label="Fechar"
                  >
                    <XIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="relative">
                  {activeService === "landing" && <LandingModalContent />}
                  {activeService === "systems" && <SystemsModalContent />}
                  {activeService === "chatbot" && <ChatbotModalContent />}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
