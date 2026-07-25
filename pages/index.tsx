import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion, useReducedMotion } from "framer-motion";

type StatusTone = "applied" | "interview" | "saved";
type FeatureKind = "tracking" | "reminders" | "editing";

type PreviewRow = {
  company: string;
  role: string;
  status: string;
  tone: StatusTone;
  dateApplied: string;
  nextAction: string;
  nextDate: string;
  isOverdue?: boolean;
};

type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  kind: FeatureKind;
};

const previewRows: PreviewRow[] = [
  {
    company: "Northstar Labs",
    role: "Frontend Engineer",
    status: "Interview",
    tone: "interview",
    dateApplied: "May 14",
    nextAction: "Prepare interview",
    nextDate: "May 20",
    isOverdue: false,
  },
  {
    company: "Good Kind Co.",
    role: "Product Designer",
    status: "Applied",
    tone: "applied",
    dateApplied: "May 10",
    nextAction: "Follow up",
    nextDate: "3 days overdue",
    isOverdue: true,
  },
  {
    company: "Ritual Health",
    role: "UX Researcher",
    status: "Saved",
    tone: "saved",
    dateApplied: "—",
    nextAction: "Apply",
    nextDate: "May 25",
    isOverdue: false,
  },
];

const features: Feature[] = [
  {
    eyebrow: "01 — STAY ORIENTED",
    title: "See every application at a glance.",
    body: "Keep the company, role, status, date, and your next move in one calm table.",
    kind: "tracking",
  },
  {
    eyebrow: "02 — KEEP MOVING",
    title: "Know what needs attention next.",
    body: "Next-action reminders make overdue follow-ups visible before they disappear into another tab.",
    kind: "reminders",
  },
  {
    eyebrow: "03 — KEEP IT CURRENT",
    title: "Edit without losing your flow.",
    body: "One-click editing opens an inline modal so details stay fresh without sending you somewhere else.",
    kind: "editing",
  },
];

const statusClasses: Record<StatusTone, string> = {
  applied: "bg-status-applied-bg text-status-applied-text",
  interview: "bg-status-interview-bg text-status-interview-text",
  saved: "bg-status-saved-bg text-status-saved-text",
};

export default function Home() {
  return (
    <>
      <Head>
        <title>JobTracker — Stop losing track of applications</title>
        <meta
          name="description"
          content="A calmer way to keep your job applications, next actions, and follow-ups in one place."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" href="/favicon-512x512.png" />
        <meta name="theme-color" content="#FFF5F6" />
      </Head>

      <main id="main-content" className="min-h-screen overflow-hidden bg-page-bg font-['Space_Grotesk',sans-serif] text-ink">
        <Navbar />

        <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 text-center sm:px-8 sm:pt-32 lg:pb-36 lg:pt-40">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-sage-mid">
              A calmer way to keep moving
            </p>
            <h1 className="font-['Fraunces',serif] text-6xl font-semibold leading-[0.95] tracking-[-0.05em] text-ink sm:text-8xl lg:text-9xl">
              JobTracker
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-xl font-medium tracking-[-0.02em] text-sage-dark sm:text-2xl">
              Stop losing track of applications
            </p>
            <Link
              href="/jobs"
              className="mt-9 inline-flex items-center gap-2 rounded-lg bg-sage-dark px-5 py-3 text-sm font-semibold text-page-bg transition hover:bg-sage-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg"
            >
              Start tracking <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28 sm:px-8 lg:pb-40">
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-mid">Product preview</p>
                <h2 className="mt-3 max-w-xl font-['Fraunces',serif] text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-5xl">
                  See the whole search in one place.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-muted sm:text-right">
                A simple view of what is active, what is moving, and what can wait.
              </p>
            </div>

            <div className="-rotate-1 rounded-xl border border-sage-mid bg-card-bg p-3 shadow-xl sm:rotate-1 sm:p-5">
              <div className="rounded-lg border border-sage-light bg-page-bg p-4 sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-sage-light pb-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">All applications</p>
                    <p className="mt-1 text-xs text-muted">Updated just now</p>
                  </div>
                  <span className="rounded-full bg-sage-light px-3 py-1.5 text-xs font-semibold text-sage-dark">
                    3 active
                  </span>
                </div>
 
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border-collapse text-left text-xs sm:text-sm">
                    <caption className="sr-only">A sample of three tracked job applications</caption>
                    <thead>
                      <tr className="border-b border-sage-light text-xs text-pink-bold">
                        <th className="px-4 py-3 font-medium">Company / Role</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Applied</th>
                        <th className="px-4 py-3 font-medium">Next Action</th>
                        <th className="px-4 py-3 font-medium">Next Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((row) => (
                        <tr
                          key={`${row.company}-${row.role}`}
                          className={`border-b border-sage-light last:border-0 ${row.isOverdue ? "bg-status-rejected-bg/40" : ""}`}
                        >
                          <td className="px-4 py-3">
                            <p className="font-semibold text-ink">{row.company}</p>
                            <p className="text-xs text-sage-mid">{row.role}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusClasses[row.tone]}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted">{row.dateApplied}</td>
                          <td className={`px-4 py-3 ${row.isOverdue ? "text-pink-bold" : "text-ink"}`}>
                            {row.nextAction}
                          </td>
                          <td className={`px-4 py-3 ${row.isOverdue ? "text-pink-bold" : "text-muted"}`}>
                            {row.nextDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="border-y border-sage-mid bg-sage-light px-6 py-24 sm:px-8 lg:py-32">
          <Reveal className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-mid">The problem</p>
              <h2 className="mt-4 max-w-xl font-['Fraunces',serif] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
                Your job search shouldn&apos;t live in 6 tabs.
              </h2>
            </div>
            <div className="space-y-5 border-l border-sage-mid pl-6 text-base leading-7 text-sage-dark sm:text-lg">
              <p>One tab for the job post, one for the resume, and four more you forgot to close.</p>
              <p>Follow-ups get buried. Notes end up in scattered documents.</p>
              <p>You spend more energy remembering the search than doing the search.</p>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-28 sm:px-8 lg:py-40">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-mid">Made for momentum</p>
            <h2 className="mt-4 max-w-2xl font-['Fraunces',serif] text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-5xl">
              The useful stuff, without the noise.
            </h2>
          </Reveal>

          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
            {features.map((feature, index) => {
              const textFromLeft = index % 2 === 0;
              return (
                <div key={feature.kind} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <SlideIn from={textFromLeft ? "left" : "right"} className={index % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-bold">{feature.eyebrow}</p>
                    <h3 className="mt-4 max-w-md font-['Fraunces',serif] text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                      {feature.title}
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-7 text-muted sm:text-lg">{feature.body}</p>
                  </SlideIn>
                  <SlideIn from={textFromLeft ? "right" : "left"} delay={0.15} className={`mx-auto max-w-sm lg:max-w-none ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                    <FeatureVisual kind={feature.kind} />
                  </SlideIn>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-sage-mid bg-pink-light px-6 py-28 sm:px-8 lg:py-36">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-bold">A small personal project</p>
            <h2 className="mt-5 font-['Fraunces',serif] text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-6xl">
              Built by a student tired of spreadsheets.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-sage-dark sm:text-lg">
              Keep the busywork small, keep your next step visible, and give yourself more room to focus on the work that matters.
            </p>
            <Link
              href="/apply"
              className="mt-9 inline-flex items-center rounded-lg bg-sage-dark px-5 py-3 text-sm font-semibold text-page-bg transition hover:bg-sage-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2 focus-visible:ring-offset-pink-light"
            >
              Start tracking
            </Link>
          </Reveal>
        </section>
      </main>
    </>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({ children, from, delay = 0, className = "" }: { children: React.ReactNode; from: "left" | "right"; delay?: number; className?: string }) {
  const shouldReduce = useReducedMotion();
  const x = from === "left" ? -40 : 40;

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? false : { opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FeatureVisual({ kind }: { kind: FeatureKind }) {
  if (kind === "tracking") {
    return (
      <div aria-hidden="true" className="-rotate-1 rounded-xl border border-sage-mid bg-card-bg p-5 shadow-lg sm:p-7">
        <div className="flex items-center justify-between border-b border-sage-light pb-4">
          <span className="text-sm font-semibold text-ink">Your Jobs</span>
          <span className="rounded-full bg-sage-light px-2.5 py-1 text-[10px] font-semibold text-sage-dark">3 tracked</span>
        </div>
        <div className="mt-4 space-y-0 text-xs">
          <MiniTableRow company="Northstar Labs" role="Frontend Engineer" status="Interview" tone="interview" nextAction="Prepare interview" />
          <MiniTableRow company="Good Kind Co." role="Product Designer" status="Applied" tone="applied" nextAction="Follow up" isOverdue />
          <MiniTableRow company="Ritual Health" role="UX Researcher" status="Saved" tone="saved" nextAction="Apply" />
        </div>
      </div>
    );
  }

  if (kind === "reminders") {
    return (
      <div aria-hidden="true" className="rounded-xl border border-sage-mid bg-sage-light p-5 sm:p-7">
        <div className="flex items-center justify-between border-b border-sage-mid pb-4">
          <span className="text-sm font-semibold text-ink">Next actions</span>
          <span className="text-xs font-medium text-sage-mid">This week</span>
        </div>
        <div className="mt-5 space-y-4 text-sm">
          <ReminderRow label="Send thank-you note" detail="Northstar Labs · today" dot="bg-pink-bold" />
          <ReminderRow label="Follow up with recruiter" detail="Ritual Health · tomorrow" dot="bg-sage-dark" />
          <div className="rounded-lg bg-peach px-3 py-3 text-status-interview-text">
            <p className="font-semibold">Overdue: portfolio follow-up</p>
            <p className="mt-1 text-xs">Good Kind Co. · 2 days late</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="rounded-xl border border-pink-bold bg-card-bg p-5 shadow-lg sm:p-7">
      <div className="flex items-center justify-between border-b border-pink-light pb-4">
        <span className="text-sm font-semibold text-ink">Edit application</span>
        <span className="text-xs text-pink-bold">×</span>
      </div>
      <div className="mt-5 space-y-4">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-mid">Company</span>
          <div className="mt-2 rounded-lg border border-pink-light bg-pink-light px-3 py-2 text-sm font-medium text-ink">Northstar Labs</div>
        </div>
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sage-mid">Next action</span>
          <div className="mt-2 rounded-lg border border-sage-light bg-page-bg px-3 py-2 text-sm text-muted">Send thank-you note</div>
        </div>
        <div className="flex justify-end">
          <span className="rounded-lg bg-sage-dark px-3 py-2 text-xs font-semibold text-page-bg">Save changes</span>
        </div>
      </div>
    </div>
  );
}

function MiniTableRow({
  company,
  role,
  status,
  tone,
  nextAction,
  isOverdue,
}: {
  company: string;
  role: string;
  status: string;
  tone: StatusTone;
  nextAction: string;
  isOverdue?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 border-b border-sage-light px-2 py-3 last:border-0 ${isOverdue ? "rounded-lg bg-status-rejected-bg/40" : ""}`}>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-ink">{company}</p>
        <p className="truncate text-[11px] text-sage-mid">{role}</p>
      </div>
      <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${statusClasses[tone]}`}>{status}</span>
      <span className={`shrink-0 text-[11px] ${isOverdue ? "text-pink-bold" : "text-muted"}`}>{nextAction}</span>
    </div>
  );
}

function ReminderRow({ label, detail, dot }: { label: string; detail: string; dot: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
      <div>
        <p className="font-medium text-ink">{label}</p>
        <p className="mt-1 text-xs text-muted">{detail}</p>
      </div>
    </div>
  );
}
