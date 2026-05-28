"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon, XIcon } from "./Icons";

const NAV_ITEMS = [
  { label: "Início",        href: "#inicio",      id: "inicio" },
  { label: "Sobre",         href: "#sobre",        id: "sobre" },
  { label: "Serviços",      href: "#servicos",     id: "servicos" },
  { label: "Competências",  href: "#tecnologias",  id: "tecnologias" },
  { label: "Contato",       href: "#contato",      id: "contato" },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]        = useState(false);
  const [activeSection,  setActiveSection]   = useState("inicio");
  const [hoveredItem,    setHoveredItem]     = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 32, delay: 0.05 }}
      >
        <div
          className={[
            "flex items-center justify-between transition-all duration-500",
            "backdrop-blur-xl border rounded-2xl",
            scrolled
              ? "bg-white/85 dark:bg-zinc-950/85 border-white/40 dark:border-zinc-800/70 shadow-xl shadow-black/[0.07] dark:shadow-black/40 px-4 py-2"
              : "bg-white/65 dark:bg-zinc-950/65 border-zinc-200/50 dark:border-zinc-800/40 px-5 py-3",
          ].join(" ")}
        >
          {/* Logo */}
          <a
            href="#inicio"
            aria-label="Vitor Rodrigues — início"
            className="flex items-center shrink-0 hover:scale-[1.03] transition-transform duration-300"
          >
            <span className="relative h-[40px] w-[40px] md:h-[48px] md:w-[48px]">
              <Image
                src="/images/logo-modo-claro-SVG.svg"
                alt="Vitor Rodrigues"
                fill
                sizes="48px"
                className="object-contain transition-opacity duration-300 dark:opacity-0"
                priority
              />
              <Image
                src="/images/logo-modo-escuro-SVG.svg"
                alt=""
                fill
                sizes="48px"
                className="object-contain transition-opacity duration-300 opacity-0 dark:opacity-100"
                priority
                aria-hidden="true"
              />
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredItem === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={[
                    "relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 overflow-hidden",
                    isActive
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200",
                  ].join(" ")}
                >
                  {item.label}

                  {/* Animated underline — grows left→right on hover, stays when active */}
                  <motion.span
                    className="absolute bottom-0.5 left-3 right-3 h-[1.5px] rounded-full origin-left"
                    style={{
                      background: isActive
                        ? "rgb(59,130,246)"
                        : "rgb(99,102,241)",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors duration-200"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden max-w-5xl mx-auto mt-2 backdrop-blur-xl bg-white/90 dark:bg-zinc-950/90 border border-zinc-200/50 dark:border-zinc-800/60 rounded-2xl overflow-hidden shadow-xl shadow-black/[0.07] dark:shadow-black/40"
          >
            <nav className="px-4 py-3 flex flex-col gap-1" aria-label="Menu móvel">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "px-3 py-3.5 text-sm font-medium rounded-xl transition-colors duration-200 min-h-[44px] flex items-center",
                    activeSection === item.id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900/60",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
