import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import RotatingText from "@/components/RotatingText";
import PixelCarousel from "@/components/PixelCarousel";
import { motion, useReducedMotion } from "framer-motion";

export default function Home() {
  const shouldReduce = useReducedMotion();

  return (
    <>
      <Head>
        <title>JobTracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" href="/favicon-512x512.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className="min-h-screen bg-[var(--pink-50)] font-sans">
        <Navbar />

        {/* Landing hero */}
        <section className="mx-auto max-w-7xl px-8 pt-16 pb-8 text-center sm:pt-20">
          <motion.div
            initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduce ? 0 : 0.5, ease: "easeOut" }}
          >
            <h1
              className="mx-auto max-w-5xl text-4xl font-extrabold tracking-tight sm:text-6xl"
              style={{ color: "var(--ink-900)" }}
            >
              Progress looks better when it’s visible.
            </h1>

            <p
              className="mx-auto mt-4 max-w-2xl text-lg sm:text-xl"
              style={{ color: "var(--ink-700)" }}
            >
              Add structure to your job hunt—{" "}
              <RotatingText
                words={["apply", "track", "reflect", "win"]}
                intervalMs={1500}   //speed for the 4 words
                className="font-semibold"
              />
              .
            </p>

            <div className="mx-auto mt-8 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 ">
              <CTA
                href="/apply"
                title="Add a Job"
                desc="Quickly save a role, parse the Job Description, and plan next steps."
              />
              <CTA
                href="/jobs"
                title="View your Jobs"
                desc="See statuses at a glance and never miss a follow-up."
              />
            </div>
          </motion.div>

          {/* Pixel icon strip */}
          <div className="mt-6 w-full">
            <PixelCarousel size={40} />
          </div>
        </section>
      </main>
    </>
  );
}

function CTA({ href, title, desc }: { href: string; title: string; desc: string }) {
  const reduce = useReducedMotion();

  return (
    <Link href={href} className="group focus:outline-none">
      <motion.div
        whileHover={reduce ? undefined : { scale: 1.03 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="rounded-2xl p-6 text-left shadow-sm ring-1 transition hover:shadow-md
                   focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          background: "var(--surface, #fff)",
          boxShadow: "0 10px 20px -15px rgba(0,0,0,0.25)",
          borderColor: "var(--border-200, rgba(0,0,0,0.06))",
          color: "var(--ink-800)",
        }}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm opacity-80">{desc}</p>
        <div className="mt-4 text-sm font-medium opacity-90 underline underline-offset-4">Go →</div>
      </motion.div>
    </Link>
  );
}
