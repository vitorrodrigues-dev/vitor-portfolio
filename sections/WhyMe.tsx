"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "@/components/Icons";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const revealVariant = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const DIFFERENTIALS = [
  {
    title:       "Clareza em cada etapa",
    description: "Você acompanha o processo com transparência — do que está sendo construído até o que será entregue.",
  },
  {
    title:       "Do conceito ao deploy",
    description: "Cada detalhe é pensado para funcionar fora do ambiente de desenvolvimento, com consistência visual, performance e experiência real.",
  },
  {
    title:       "IA aplicada com propósito",
    description: "Automação e inteligência artificial entram para acelerar processos e elevar qualidade — não apenas como tendência.",
  },
  {
    title:       "Estrutura limpa e escalável",
    description: "Projetos organizados, legíveis e preparados para evoluir sem depender de uma caixa-preta.",
  },
];

export default function WhyMe() {
  return (
    <section
      id="diferenciais"
      className="py-16 lg:py-24"
      aria-label="Por que trabalhar comigo"
    >
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
            Diferenciais
          </span>
        </motion.div>

        {/* Único stagger container — heading + cards animam juntos */}
        <motion.div
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.02 } },
          }}
        >

          {/* Left — heading */}
          <div className="space-y-5">
            <motion.h2
              variants={revealVariant}
              className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug"
            >
              Por que trabalhar comigo?
            </motion.h2>
            <motion.p
              variants={revealVariant}
              className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md"
            >
              Cada detalhe é pensado para funcionar com consistência, fluidez e presença no produto final.
            </motion.p>
          </div>

          {/* Right — differential cards */}
          <div className="grid sm:grid-cols-2 gap-3">
            {DIFFERENTIALS.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0 }}
                variants={revealVariant}
                custom={i}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="card-surface rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm p-5 flex flex-col gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
