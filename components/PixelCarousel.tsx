"use client";

import { motion } from "framer-motion";

type Props = {
  items?: string[];
  className?: string;
  size?: number; // NEW: pixel size (default 38)
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function PixelCarousel({ items, className, size = 38 }: Props) {
  const list = items?.length ? items : Array.from({ length: 14 }, () => "/favicon.ico");
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className={`mx-auto flex w-full max-w-5xl items-center justify-center gap-3 overflow-hidden py-2 ${className || ""}`}
      aria-hidden="true"
    >
      {list.map((src, i) => (
        <motion.li key={`${src}-${i}`} variants={item} className="shrink-0">
          <img src={src} width={size} height={size} alt="" className="opacity-80" />
        </motion.li>
      ))}
    </motion.ul>
  );
}
