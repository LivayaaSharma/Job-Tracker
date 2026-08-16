import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    eyebrow: "01 APPLICATIONS",
    title: "See every application at a glance.",
    body: "Company, role, status, date applied, and next steps in one table. No switching between tabs or documents.",
    kind: "tracking",
  },
  {
    eyebrow: "02 FOLLOW-UPS",
    title: "Never miss a follow-up.",
    body: "Set a next action and due date on any application. When something is overdue, you get a daily email so nothing slips through.",
    kind: "reminders",
  },
  {
    eyebrow: "03 EDITING",
    title: "Edit without leaving the page.",
    body: "Click any row to update details in a modal. No page reloads, no lost context.",
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
        <title>JobTracker</title>
        <meta
          name="description"
          content="Track every job application in one place. Statuses, deadlines, follow-ups, and reminders."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" href="/favicon-512x512.png" />
        <meta name="theme-color" content="#FFF5F6" />
      </Head>

      <main id="main-content" className="min-h-screen overflow-x-hidden bg-page-bg pt-14 font-['Space_Grotesk',sans-serif] text-ink">
        <Navbar />

        {/* ── Hero ── */}
        <section className="flex min-h-[calc(100svh-3.5rem)] items-center">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 py-16 sm:px-5 lg:grid-cols-2 lg:gap-20 lg:py-0">
            <Reveal className="text-center lg:text-left">
              <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
                <Image
                  src="/favicon-512x512.png"
                  alt=""
                  width={52}
                  height={52}
                  className="drop-shadow-sm"
                />
                <span className="font-['Fraunces',serif] text-3xl font-semibold text-ink sm:text-4xl">
                  JobTracker
                </span>
              </div>
              <h1 className="font-['Fraunces',serif] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
                All your applications.<br />One place to check.
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg lg:mx-0">
                Track statuses, deadlines, and follow-ups for every job you apply to. Add
                them yourself, or connect your auto-apply tools, browser extensions,
                or scripts so new applications show up automatically.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 rounded-lg bg-sage-dark px-6 py-3 text-sm font-semibold text-page-bg transition hover:bg-sage-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg"
                >
                  Start tracking
                </Link>
                <a
                  href="#preview"
                  className="inline-flex items-center gap-1 text-sm font-medium text-sage-dark transition hover:text-sage-mid"
                >
                  See how it looks
                  <span aria-hidden="true" className="text-xs">&#8595;</span>
                </a>
              </div>
            </Reveal>

            <SlideIn from="right" className="mx-auto hidden w-full max-w-md lg:block lg:max-w-none">
              <div
                aria-hidden="true"
                className="rotate-1 rounded-xl border border-sage-mid bg-card-bg p-4 shadow-lg sm:p-5"
              >
                <div className="flex items-center justify-between border-b border-sage-light pb-3">
                  <span className="text-sm font-semibold text-ink">Recent</span>
                  <span className="rounded-full bg-sage-light px-2.5 py-1 text-[10px] font-semibold text-sage-dark">
                    3 jobs
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {[
                    { company: "Northstar Labs", action: "Prep for interview", tone: "interview" as StatusTone, status: "Interview" },
                    { company: "Good Kind Co.", action: "Follow up", tone: "applied" as StatusTone, status: "Applied" },
                    { company: "Ritual Health", action: "Submit application", tone: "saved" as StatusTone, status: "Saved" },
                  ].map((row) => (
                    <div
                      key={row.company}
                      className="flex items-center gap-3 rounded-lg border border-sage-light/60 bg-page-bg px-3 py-2.5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-ink">{row.company}</p>
                        <p className="truncate text-[11px] text-muted">{row.action}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${statusClasses[row.tone]}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── Product Preview ── */}
        <section id="preview" className="mx-auto max-w-[1400px] px-4 pb-20 sm:px-5 lg:pb-24">
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-mid">Product preview</p>
                <h2 className="mt-3 max-w-xl font-['Fraunces',serif] text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-5xl">
                  Your job search, organized.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-muted sm:text-right">
                Applications, statuses, deadlines, and next steps, all visible at once.
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

        {/* ── The Problem ── */}
        <section className="border-y border-sage-mid bg-sage-light px-4 py-16 sm:px-5 lg:py-20">
          <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-mid">The problem</p>
              <h2 className="mt-4 max-w-xl font-['Fraunces',serif] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
                Your job search shouldn&apos;t live in 6 tabs.
              </h2>
            </div>
            <div className="space-y-5 border-l border-sage-mid pl-6 text-base leading-7 text-sage-dark sm:text-lg">
              <p>Applications, interview notes, deadlines, and follow-ups add up quickly.</p>
              <p>Most people track them across spreadsheets, browser tabs, and scattered documents.</p>
              <p>JobTracker keeps everything together so you always know what&apos;s next.</p>
            </div>
          </Reveal>
        </section>

        {/* ── Connect Your Tools ── */}
        <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-5 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-bold">
                Connect your tools
              </p>
              <h2 className="mt-4 max-w-xl font-['Fraunces',serif] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
                Already auto-applying? Those jobs can land here too.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                If you use an auto-apply tool, a browser extension, or even your own
                script to send out applications, you can connect it to JobTracker.
                Every job it submits shows up in your table automatically.
              </p>
              <p className="mt-3 max-w-xl text-sm text-muted">
                Set it up from your{" "}
                <Link href="/settings" className="font-medium text-sage-dark underline underline-offset-2 hover:text-sage-mid">
                  Settings
                </Link>{" "}
                page in a few clicks.
              </p>
            </Reveal>

            <SlideIn from="right">
              <div aria-hidden="true" className="rounded-xl border border-sage-mid bg-card-bg p-5 shadow-lg sm:p-7">
                <div className="flex flex-col gap-4">
                  {/* Flow steps */}
                  <div className="flex items-stretch gap-3">
                    <div className="flex flex-1 flex-col items-center rounded-xl border border-sage-light bg-page-bg p-4 text-center">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage-light text-base">
                        &#9881;
                      </div>
                      <p className="text-sm font-semibold text-ink">Your tool applies</p>
                    </div>

                    <div className="flex items-center text-xl text-pink-bold">&#8594;</div>

                    <div className="flex flex-1 flex-col items-center rounded-xl border border-pink-light bg-pink-light/30 p-4 text-center">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-pink-light text-base">
                        &#9993;
                      </div>
                      <p className="text-sm font-semibold text-ink">Sends it here</p>
                    </div>

                    <div className="flex items-center text-xl text-pink-bold">&#8594;</div>

                    <div className="flex flex-1 flex-col items-center rounded-xl border border-sage-mid bg-sage-light p-4 text-center">
                      <Image
                        src="/favicon-512x512.png"
                        alt=""
                        width={40}
                        height={40}
                        className="mb-2"
                      />
                      <p className="text-sm font-semibold text-ink">In your table</p>
                    </div>
                  </div>

                  {/* Result preview */}
                  <div className="rounded-lg border border-sage-light bg-page-bg px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-ink">Google</p>
                        <p className="text-[11px] text-muted">SWE Intern</p>
                      </div>
                      <span className="rounded-full bg-status-applied-bg px-2.5 py-1 text-[10px] font-medium text-status-applied-text">
                        Applied
                      </span>
                      <span className="text-[10px] text-muted">just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="border-y border-sage-mid bg-sage-light px-4 py-16 sm:px-5 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sage-mid">How it works</p>
              <h2 className="mt-4 max-w-2xl font-['Fraunces',serif] text-4xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-5xl">
                Simple on purpose.
              </h2>
            </Reveal>

            <div className="mt-10 space-y-12 lg:mt-14 lg:space-y-16">
              {features.map((feature, index) => {
                const textFromLeft = index % 2 === 0;
                return (
                  <div key={feature.kind} className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
                    <SlideIn from={textFromLeft ? "left" : "right"} className={index % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-bold">{feature.eyebrow}</p>
                      <h3 className="mt-3 max-w-md font-['Fraunces',serif] text-3xl font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                        {feature.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-7 text-muted sm:text-lg">{feature.body}</p>
                    </SlideIn>
                    <SlideIn from={textFromLeft ? "right" : "left"} delay={0.15} className={`mx-auto w-full max-w-lg lg:max-w-none ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                      <FeatureVisual kind={feature.kind} />
                    </SlideIn>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-pink-light px-4 py-16 sm:px-5 lg:py-20">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Image
              src="/favicon-512x512.png"
              alt=""
              width={80}
              height={80}
              className="mb-6 drop-shadow-md"
            />
            <h2 className="font-['Fraunces',serif] text-3xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-5xl">
              Ready when you are.
            </h2>
            <Link
              href="/jobs"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-sage-dark px-6 py-3 text-sm font-semibold text-page-bg transition hover:bg-sage-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-dark focus-visible:ring-offset-2 focus-visible:ring-offset-pink-light"
            >
              Start tracking
            </Link>
          </Reveal>
        </section>

        <Footer />
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
      <div aria-hidden="true" className="rounded-xl border border-sage-mid bg-card-bg p-5 sm:p-7">
        <div className="flex items-center justify-between border-b border-sage-light pb-4">
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
        <span className="text-xs text-pink-bold">&times;</span>
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
