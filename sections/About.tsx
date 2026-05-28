"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const revealVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const STAT_CARDS = [
  {
    Icon:        CheckIcon,
    value:       "2",
    label:       "Projetos publicados",
    description: "Páginas no ar para clientes reais, com foco em conversão e performance.",
  },
  {
    Icon:        LayersIcon,
    value:       "3",
    label:       "Frentes de entrega",
    description: "Landing pages, sistemas web e automações com Python e IA.",
  },
  {
    Icon:        ZapIcon,
    value:       "100%",
    label:       "Foco no resultado",
    description: "Do briefing ao deploy — sem intermediários, sem promessas que dependem de terceiros.",
  },
];

export default function About() {
  return (
    <section
      id="sobre"
      className="py-16 lg:py-24 bg-zinc-50/40 dark:bg-transparent"
      aria-label="Sobre mim"
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
            Sobre
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Main content */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.h2
              variants={revealVariant}
              className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug"
            >
              Construindo fundações sólidas para sistemas que funcionam de verdade.
            </motion.h2>

            <div className="space-y-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {[
                "Comecei a programar para entender como as coisas funcionam por dentro — e continuo porque cada projeto resolve algo concreto. Trabalho com Python para automações e lógica de back-end, JavaScript para interfaces interativas e Git para manter tudo organizado e versionado.",
                "Formação em Análise e Desenvolvimento de Sistemas em curso — onde teoria de banco de dados, arquitetura de APIs e modelagem de sistemas alimenta o que vai para produção. Cada disciplina vira ferramenta aplicável, não só nota na prova.",
                "Meu objetivo é direto: entregar trabalho que funciona, que escala e que as pessoas conseguem usar. Sem complicação desnecessária, com foco no que importa.",
              ].map((text, i) => (
                <motion.p key={i} variants={revealVariant}>
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Sidebar highlights */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={revealVariant}
          >
            <div className="space-y-px">
              {[
                { label: "Formação",    value: "Análise e Desenvolvimento de Sistemas" },
                { label: "Foco atual",  value: "Front-end · Sistemas · IA Aplicada" },
                { label: "Modalidade",  value: "Remoto · Freelance" },
                { label: "Status",      value: "Disponível para projetos" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-0.5 py-4 border-b border-zinc-200/70 dark:border-zinc-800/70 first:pt-0"
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    {item.label}
                  </span>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Stat cards ── */}
        <motion.div
          className="mt-12 grid sm:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
          }}
        >
          {STAT_CARDS.map((card) => (
            <motion.div
              key={card.label}
              variants={revealVariant}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="card-surface rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm p-5 flex flex-col gap-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/50 flex items-center justify-center text-zinc-500 dark:text-zinc-400 shrink-0">
                <card.Icon />
              </div>
              <div>
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {card.value}
                </span>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-0.5">
                  {card.label}
                </p>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
