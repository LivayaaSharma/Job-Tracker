"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  words: string[];
  intervalMs?: number; // default 2500
  className?: string;
  colors?: string[]; // NEW: cycle matching colors (hex or CSS vars)
};

const PASTELS = ["#FF1493", "#813eb6"]; // deep pink, purple

export default function RotatingText({
  words,
  intervalMs = 1500,
  className,
  colors = PASTELS,
}: Props) {
  const shouldReduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const activeWord = useMemo(() => words[Math.max(0, index % words.length)], [words, index]);
  const activeColor = useMemo(() => colors[index % colors.length] || colors[0], [colors, index]);

  useEffect(() => {
    if (shouldReduce || words.length <= 1) return;
    timerRef.current = window.setInterval(() => setIndex((i) => i + 1), intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [intervalMs, shouldReduce, words.length]);

  // Reduced motion: no cross-fade, still color the first word
  if (shouldReduce) {
    return (
      <span className={className} style={{ color: colors[0] }}>
        {words[0]}
      </span>
    );
  }

  return (
    <span className={`inline-block relative ${className || ""}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={activeWord}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-block"
          style={{ color: activeColor }}
        >
          {activeWord}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
