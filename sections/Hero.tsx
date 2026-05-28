"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRightIcon } from "@/components/Icons";

const WHATSAPP_NUMBER  = "553399875063";
const WHATSAPP_MESSAGE = "Olá, Vitor! Gostaria de conversar sobre um projeto.";
const AUTOPLAY_MS      = 5000;
const TRANSITION_S     = 1.4;
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

const SLIDES = [
  { src: "/images/foto_principal-1.jpg",    alt: "Vitor Rodrigues — apresentação profissional" },
  { src: "/images/foto_pensativa-2.jpg",    alt: "Vitor Rodrigues — foco e processo analítico" },
  { src: "/images/foto_descontraida-3.jpg", alt: "Vitor Rodrigues — personalidade e proximidade" },
];

const slideVariants = {
  enter:  { opacity: 0, scale: 1.08, filter: "blur(4px)" },
  center: {
    opacity: 1,
    scale:   1.03,
    filter:  "blur(0px)",
    transition: {
      opacity: { duration: TRANSITION_S,        ease: EASE },
      filter:  { duration: TRANSITION_S,        ease: EASE },
      scale:   { duration: AUTOPLAY_MS / 1000,  ease: "linear" as const },
    },
  },
  exit: {
    opacity: 0,
    scale:   1,
    filter:  "blur(4px)",
    transition: { duration: TRANSITION_S, ease: EASE },
  },
};

const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── Film Intro ──────────────────────────────────────────────────────────────

function FilmIntro() {
  const phrase = "Sistemas que funcionam. Automações que economizam tempo. Experiências que ficam.";

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center gap-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ delay: 0.7, duration: 1.1, ease: EASE }}
        className="relative h-28 w-28"
      >
        <Image
          src="/images/logo-modo-escuro-SVG.svg"
          alt="Vitor Rodrigues"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      <p
        aria-label={phrase}
        className="text-white/70 font-light text-center"
        style={{
          fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)",
          paddingInline: "clamp(20px, 8vw, 60px)",
          maxWidth: "80vw",
          lineHeight: 1.35,
          textWrap: "balance",
        }}
      >
        {phrase.split(/( )/).map((seg, si, arr) => {
          const prevLen = arr.slice(0, si).join("").length;
          if (seg === " ") return <span key={si}>{" "}</span>;
          return (
            <span key={si} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {Array.from(seg).map((char, ci) => (
                <motion.span
                  key={ci}
                  aria-hidden="true"
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: EASE, delay: 1.6 + (prevLen + ci) * 0.022 }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          );
        })}
      </p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 3.2, duration: 1, ease: EASE }}
        className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
      />
    </motion.div>
  );
}

// ─── Cinematic Carousel ───────────────────────────────────────────────────────

function CinematicCarousel() {
  const [current,  setCurrent]  = useState(0);
  const [shimmer,  setShimmer]  = useState(false);
  const [paused,   setPaused]   = useState(false);
  const transitioning = useRef(false);
  const touchX        = useRef(0);

  const goNext = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;
    setShimmer(true);
    setCurrent((c) => (c + 1) % SLIDES.length);
    setTimeout(() => {
      transitioning.current = false;
      setShimmer(false);
    }, TRANSITION_S * 1000);
  }, []);

  const goPrev = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;
    setShimmer(true);
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => {
      transitioning.current = false;
      setShimmer(false);
    }, TRANSITION_S * 1000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(goNext, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, paused, goNext]);

  return (
    <div
      className="relative w-full max-w-[360px] aspect-[3/4] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e)  => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e)    => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 48) diff > 0 ? goNext() : goPrev();
      }}
    >
      {/* Images with Ken Burns */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <AnimatePresence initial={false}>
          {SLIDES.map((slide, i) =>
            i === current ? (
              <motion.div
                key={i}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 80vw, 360px"
                  priority={i === 0}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>

        {/* Shimmer during transition */}
        <AnimatePresence>
          {shimmer && (
            <motion.div
              key="shimmer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 35%, rgba(59,130,246,0.1) 0%, transparent 65%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Bottom gradient for counter legibility */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}
        />
      </div>

      {/* Subtle glass border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      />

      {/* Click zones */}
      <button onClick={goPrev} className="absolute left-0 top-0 w-1/2 h-full z-30 cursor-w-resize focus-visible:outline-none" aria-label="Foto anterior" />
      <button onClick={goNext} className="absolute right-0 top-0 w-1/2 h-full z-30 cursor-e-resize focus-visible:outline-none" aria-label="Próxima foto" />

      {/* Counter */}
      <div className="absolute bottom-3.5 left-4 z-30 pointer-events-none text-white/70 text-[11px] font-mono tracking-[0.18em]">
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/10 overflow-hidden rounded-b-2xl">
        <motion.div
          key={`progress-${current}`}
          className="h-full bg-white/60 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
        />
      </div>
    </div>
  );
}

// ─── Hero Visual (orb glow behind + carousel) ────────────────────────────────

function HeroVisual() {
  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 28, damping: 24 });
  const springY = useSpring(rawY, { stiffness: 28, damping: 24 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      rawX.set((e.clientX / innerWidth  - 0.5) * 22);
      rawY.set((e.clientY / innerHeight - 0.5) * 22);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [rawX, rawY]);

  return (
    <div className="relative flex justify-center lg:justify-end overflow-hidden">

      {/* ── Orb glow layers — parallax, sit behind the photo ── */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Outer ambient glow */}
        <motion.div
          className="absolute inset-[-15%]"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 55% 50%, rgba(99,102,241,0.18) 0%, rgba(59,130,246,0.08) 42%, transparent 68%)",
            filter: "blur(48px)",
          }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle outer ring */}
        <motion.div
          className="absolute inset-[5%] rounded-full"
          style={{
            border: "1px solid rgba(99,102,241,0.1)",
            filter: "blur(4px)",
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Inner ring */}
        <motion.div
          className="absolute inset-[18%] rounded-full"
          style={{
            border: "1px solid rgba(147,197,253,0.12)",
            filter: "blur(2px)",
          }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Bottom depth shadow */}
        <div
          className="absolute inset-x-[10%] bottom-[-5%] h-[30%] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.1) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
      </motion.div>

      {/* ── Carousel — foreground ── */}
      <div className="relative z-10 w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[360px] mx-auto lg:mx-0">
        <CinematicCarousel />
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [showIntro,     setShowIntro]     = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  useEffect(() => {
    const t1 = setTimeout(() => setShowIntro(false),    4400);
    const t2 = setTimeout(() => setIntroComplete(true), 5400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && <FilmIntro key="film-intro" />}
      </AnimatePresence>

      <section
        id="inicio"
        className="min-h-screen flex items-center pt-20"
        aria-label="Apresentação"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full py-10 lg:py-0">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-20 items-center">

            {/* ── Text content ── */}
            <motion.div
              className="lg:col-span-3 space-y-7"
              variants={textContainer}
              initial="hidden"
              animate={introComplete ? "show" : "hidden"}
            >
              {/* Status badge */}
              <motion.div variants={textItem}>
                <div className="inline-flex items-center gap-2.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 rounded-full px-4 py-1.5 bg-white/75 dark:bg-zinc-950/60 backdrop-blur-sm shadow-sm shadow-zinc-900/[0.04] dark:shadow-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" aria-hidden="true" />
                  Disponível para projetos
                </div>
              </motion.div>

              {/* Name + subtitle */}
              <motion.div variants={textItem} className="space-y-4">
                <h1 className="text-[2.15rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-[1.05]">
                  Vitor
                  <br />
                  Rodrigues
                </h1>
                <p className="text-lg lg:text-xl font-medium text-zinc-600 dark:text-zinc-300 leading-snug">
                  Front-end, sistemas e automações — do briefing ao deploy.
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={textItem}
                className="text-base lg:text-lg text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed"
              >
                Transformo necessidades reais em sistemas precisos, interfaces que funcionam e automações que economizam tempo.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={textItem} className="flex flex-wrap gap-3 pt-1">
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200"
                >
                  Solicitar projeto
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="#servicos"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/60 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 font-medium text-sm shadow-sm shadow-zinc-900/[0.04] dark:shadow-none hover:shadow-md hover:shadow-zinc-900/[0.06] dark:hover:shadow-none transition-all duration-200"
                >
                  Explorar serviços
                </motion.a>
              </motion.div>
            </motion.div>

            {/* ── Hero visual (orb + carousel) ── */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 160, damping: 30, delay: 0.1 }}
            >
              <HeroVisual />
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
