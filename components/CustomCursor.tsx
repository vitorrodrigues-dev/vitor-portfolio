"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [hovering, setHovering] = useState(false);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const ringX   = useRef(0);
  const ringY   = useRef(0);
  const rafId   = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    // Track first-show via ref so setVisible(true) only triggers once
    const shown = { value: false };

    const onMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      if (!shown.value) {
        shown.value = true;
        setVisible(true);
      }
    };

    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest(INTERACTIVE_SELECTOR)) setHovering(true);
    };

    const onLeave = (e: MouseEvent) => {
      if (!(e.target as Element).closest(INTERACTIVE_SELECTOR)) setHovering(false);
    };

    const onDocLeave  = () => setVisible(false);
    const onDocEnter  = () => setVisible(true);

    window.addEventListener("mousemove",    onMove,     { passive: true });
    window.addEventListener("mouseover",    onEnter,    { passive: true });
    window.addEventListener("mouseout",     onLeave,    { passive: true });
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${targetX.current}px, ${targetY.current}px) translate(-50%, -50%)`;
      }

      ringX.current += (targetX.current - ringX.current) * 0.12;
      ringY.current += (targetY.current - ringY.current) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mouseover",    onEnter);
      window.removeEventListener("mouseout",     onLeave);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []); // runs once — no dependency on state

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${hovering ? "cursor-hover" : ""}`}
        style={{ opacity: visible ? 1 : 0, willChange: "transform" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? "cursor-hover" : ""}`}
        style={{ opacity: visible ? 1 : 0, willChange: "transform" }}
        aria-hidden="true"
      />
    </>
  );
}
