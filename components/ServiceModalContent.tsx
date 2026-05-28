"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Landing Pages ─────────────────────────────────────────────────────────────

const LANDING_PROJECTS = [
  {
    name: "Pousada JB",
    description:
      "Landing page desenvolvida para uma pousada com foco em experiência do usuário, SEO e navegação intuitiva. Estruturada para melhorar presença digital e criar uma experiência fluida em desktop e mobile.",
    tags: ["SEO", "UX", "Responsividade", "Performance"],
    url: "https://jbpousada.com.br/",
  },
  {
    name: "Express Fibra",
    description:
      "Landing page criada para apresentar serviços de internet de forma clara e objetiva, com foco em conversão, desempenho e experiência responsiva.",
    tags: ["Conversão", "UI", "Responsividade", "Performance"],
    url: "https://vitorrodrigues-dev.github.io/landing-page-express-fibra/",
  },
];

export function LandingModalContent() {
  const [current, setCurrent] = useState(0);
  const total = LANDING_PROJECTS.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          {LANDING_PROJECTS.map((project, i) =>
            i === current ? (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -32 }}
                transition={{ duration: 0.36, ease: EASE }}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 p-5 flex flex-col gap-3"
              >
                <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {project.name}
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors group/link mt-1 w-fit"
                >
                  Visualizar projeto
                  <ArrowRightIcon className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                </a>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {LANDING_PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={[
                "rounded-full transition-all duration-300",
                i === current
                  ? "w-5 h-2 bg-indigo-500"
                  : "w-2 h-2 bg-zinc-300 dark:bg-zinc-700",
              ].join(" ")}
              aria-label={`Ir para projeto ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Anterior"
          >
            <ArrowRightIcon className="w-3.5 h-3.5 rotate-180" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Próximo"
          >
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-4">
        Mais projetos em desenvolvimento.
      </p>
    </div>
  );
}

// ── Systems ───────────────────────────────────────────────────────────────────

const SYSTEMS_PROJECTS = [
  {
    id: "remotefit-ai",
    name: "RemoteFit AI",
    description:
      "Agente autônomo que analisa vagas remotas utilizando IA generativa e organiza oportunidades automaticamente.",
    fullDescription:
      "O sistema monitora vagas remotas automaticamente via RSS, processa cada oportunidade utilizando IA generativa através da Claude API e avalia o alinhamento com o perfil profissional definido. Após a análise, os dados são estruturados em categorias como compatibilidade, habilidades exigidas, gaps técnicos e insights estratégicos, sendo armazenados automaticamente no Google Sheets.",
    tags: ["n8n", "Claude API", "JavaScript", "Automation", "AI"],
    stackAll: ["n8n", "Claude API", "JavaScript", "RSS Feed", "Google Sheets", "AI Automation"],
    highlights: [
      "Análise contextual com IA",
      "Execução automática diária",
      "Organização inteligente de vagas",
      "Workflow autônomo",
    ],
    videoSrc: "/images/automacao-vagas.mp4",
  },
] as const;

const DETAIL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SystemsModalContent() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const project = SYSTEMS_PROJECTS.find((p) => p.id === activeId) ?? null;

  return (
    <AnimatePresence mode="wait">
      {project ? (
        <motion.div
          key="detail"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, ease: DETAIL_EASE }}
          className="space-y-5"
        >
          <button
            onClick={() => setActiveId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors group/back"
          >
            <ArrowRightIcon className="w-3 h-3 rotate-180 transition-transform group-hover/back:-translate-x-0.5" />
            Voltar
          </button>

          <div
            className="relative rounded-xl overflow-hidden"
            style={{
              background: "#09090b",
              boxShadow: "0 0 0 1px rgba(99,102,241,0.14), 0 8px 32px -8px rgba(0,0,0,0.3)",
            }}
          >
            <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/40 border border-white/10">
              <motion.span
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 block shrink-0"
              />
              <span className="text-[10px] font-medium text-white/60 tracking-wide">Demo</span>
            </div>
            <video autoPlay muted loop playsInline className="w-full block">
              <source src={project.videoSrc} type="video/mp4" />
            </video>
          </div>

          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                Automação com IA
              </span>
              <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <h3 className="text-[18px] font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
              {project.name}
            </h3>
            <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1 leading-relaxed">
              {project.description}
            </p>
          </div>

          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {project.fullDescription}
          </p>

          <div className="grid grid-cols-2 gap-2">
            {project.highlights.map((label) => (
              <div
                key={label}
                className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-100 dark:border-zinc-800"
              >
                <span className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 text-[8px] leading-none">◆</span>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">{label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
              Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.stackAll.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="list"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: DETAIL_EASE }}
          className="space-y-6"
        >
          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              {SYSTEMS_PROJECTS.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.36, ease: EASE }}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 p-5 flex flex-col gap-3"
                >
                  <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {proj.name}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveId(proj.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors group/link mt-1 w-fit"
                  >
                    Visualizar projeto
                    <ArrowRightIcon className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <p className="text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            Mais projetos em desenvolvimento.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Chatbot ───────────────────────────────────────────────────────────────────

export function ChatbotModalContent() {
  const [stage, setStage] = useState<"idle" | "user" | "typing" | "bot">("idle");
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("user"),   300);
    const t2 = setTimeout(() => setStage("typing"), 1000);
    const t3 = setTimeout(() => setStage("bot"),    2700);
    timersRef.current = [t1, t2, t3];
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  return (
    <div className="space-y-4">
      <div className="max-w-sm space-y-3">
        <AnimatePresence>
          {stage !== "idle" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="flex justify-end"
            >
              <div className="bg-indigo-50 dark:bg-indigo-600/15 border border-indigo-100 dark:border-indigo-500/20 text-zinc-700 dark:text-zinc-200 text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]">
                Olá
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === "typing" && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                <span className="text-[7px] font-bold text-zinc-500 dark:text-zinc-400">AI</span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3.5 py-2.5 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
                      className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 block"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === "bot" && (
            <motion.div
              key="bot"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="flex items-start gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[7px] font-bold text-zinc-500 dark:text-zinc-400">AI</span>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm leading-relaxed">
                Estou sendo preparado para futuras soluções inteligentes.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Projetos de chatbot e IA aplicada em planejamento.
      </p>
    </div>
  );
}
