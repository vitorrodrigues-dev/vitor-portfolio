"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon, GitHubIcon, LinkedInIcon, InstagramIcon, ArrowRightIcon } from "@/components/Icons";

const WHATSAPP_NUMBER  = "553399875063";
const WHATSAPP_MESSAGE = "Olá, Vitor! Gostaria de conversar sobre um projeto.";

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const revealVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const SOCIAL_LINKS = [
  {
    href:        "https://github.com/vitorrodrigues-dev",
    icon:        GitHubIcon,
    label:       "GitHub",
    description: "Veja o código",
  },
  {
    href:        "https://www.linkedin.com/in/vitor-rodrigues-da-silva/",
    icon:        LinkedInIcon,
    label:       "LinkedIn",
    description: "Conecte-se",
  },
  {
    href:        "https://www.instagram.com/devvitor7/",
    icon:        InstagramIcon,
    label:       "Instagram",
    description: "Acompanhe bastidores, estudos e projetos",
  },
];

export default function Contact() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      id="contato"
      className="py-16 lg:py-24"
      aria-label="Contato"
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
            Contato
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left: Heading + description + CTA */}
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
              Vamos construir algo juntos.
            </motion.h2>

            <motion.p
              variants={revealVariant}
              className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md"
            >
              Tem um projeto para colocar no ar, um processo para automatizar ou uma ideia que precisa de estrutura técnica? Me conta o que você precisa.
            </motion.p>

            {/* WhatsApp CTA */}
            <motion.div variants={revealVariant}>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-lg shadow-blue-600/20 transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                Conversar no WhatsApp
                <ArrowRightIcon className="w-4 h-4 ml-auto" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: Social links */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={revealVariant}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
              Ou me encontre em
            </p>
            <div className="space-y-px">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="flex items-center gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 group hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors duration-200"
                  >
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors duration-200 shrink-0">
                      <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {link.label}
                        {link.label === "Instagram" && (
                          <span className="ml-2 text-[10px] font-normal text-zinc-400 dark:text-zinc-500">
                            @devvitor7
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 truncate">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRightIcon className="w-4 h-4 text-zinc-300 dark:text-zinc-600 shrink-0 group-hover:text-blue-500 transition-colors duration-200" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
