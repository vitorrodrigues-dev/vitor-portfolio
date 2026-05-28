"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const revealVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const TOOLS = [
  { badge: "PY",  name: "Python",       description: "Programação e automações" },
  { badge: "JS",  name: "JavaScript",   description: "Interatividade e lógica" },
  { badge: "WEB", name: "HTML / CSS",   description: "Interfaces modernas" },
  { badge: "GIT", name: "Git",          description: "Versionamento e controle" },
];

const KNOWLEDGE = [
  { badge: "DB",   name: "Banco de Dados",    description: "Modelagem e fundamentos relacionais" },
  { badge: "AI",   name: "IA aplicada",       description: "Produtividade e automações com IA" },
  { badge: "CRUD", name: "MVP e CRUD",        description: "Estruturação de aplicações" },
  { badge: "AGIL", name: "Scrum / Kanban",    description: "Organização e fluxo ágil" },
  { badge: "UML",  name: "UML / Requisitos",  description: "Modelagem de sistemas" },
];

function SkillCard({
  badge, name, description, index,
}: { badge: string; name: string; description: string; index: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay: index * 0.055 } },
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="card-surface group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm p-4 lg:p-5 flex flex-col gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: "radial-gradient(ellipse at 30% 30%, rgba(99,102,241,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Badge */}
      <div className="relative z-10 w-10 h-6 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/50 flex items-center justify-center shrink-0">
        <span className="text-[9px] font-bold font-mono text-zinc-500 dark:text-zinc-400 tracking-tight">
          {badge}
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {name}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-0.5">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Technologies() {
  return (
    <section
      id="tecnologias"
      className="py-16 lg:py-24 bg-slate-50/30 dark:bg-transparent"
      aria-label="Competências e ferramentas"
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
            Competências &amp; Ferramentas
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="mb-10 max-w-xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
            variants={revealVariant}
            className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug"
          >
            Ferramentas que uso no dia a dia.
          </motion.h2>
          <motion.p
            variants={revealVariant}
            className="mt-4 text-zinc-500 dark:text-zinc-400 leading-relaxed"
          >
            Stack em constante evolução — cada projeto aprofunda o que já sei e incorpora o que estou aprendendo.
          </motion.p>
        </motion.div>

        {/* ── Grupo 1: Ferramentas ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          <motion.div variants={revealVariant} className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              Ferramentas
            </span>
            <div className="h-px flex-1 bg-zinc-200/60 dark:bg-zinc-800/50" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOOLS.map((skill, i) => (
              <SkillCard key={skill.name} {...skill} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="my-6" />

        {/* ── Grupo 2: Conhecimentos aplicados ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          <motion.div variants={revealVariant} className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              Conhecimentos aplicados
            </span>
            <div className="h-px flex-1 bg-zinc-200/60 dark:bg-zinc-800/50" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {KNOWLEDGE.map((skill, i) => (
              <SkillCard key={skill.name} {...skill} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
