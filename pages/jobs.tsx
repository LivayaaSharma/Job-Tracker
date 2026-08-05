import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EditJobModal from "@/components/EditJobModal";
import { useJobs } from "@/hooks/useJobs";
import type { Job } from "@/hooks/useJobs";
import { useAuth } from "@/lib/auth";

const STATUS_COLORS: Record<Job["status"], { bg: string; text: string }> = {
  saved: { bg: "bg-status-saved-bg", text: "text-status-saved-text" },
  applied: { bg: "bg-status-applied-bg", text: "text-status-applied-text" },
  interview: { bg: "bg-status-interview-bg", text: "text-status-interview-text" },
  offer: { bg: "bg-status-offer-bg", text: "text-status-offer-text" },
  rejected: { bg: "bg-status-rejected-bg", text: "text-status-rejected-text" },
};

function daysOverdue(dateStr: string): number {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function JobsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { jobs, loading: jobsLoading, deleteJob, updateJob } = useJobs();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || jobsLoading || !user) return null;

  const applied = jobs.filter((j) => j.status === "applied").length;
  const interviews = jobs.filter((j) => j.status === "interview").length;
  const overdue = jobs.filter(
    (j) => j.nextActionDate && daysOverdue(j.nextActionDate) > 0
  ).length;

  const allSelected = jobs.length > 0 && selected.size === jobs.length;

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(jobs.map((j) => j.id)));
  }

  async function deleteSelected() {
    await Promise.all([...selected].map((id) => deleteJob(id)));
    setSelected(new Set());
  }

  return (
    <main className="flex min-h-screen flex-col bg-page-bg pt-14 font-['Space_Grotesk',sans-serif]">
      <Navbar />
      <div className="mx-auto w-full max-w-[1400px] flex-1 px-4 sm:px-5">
        <Header title="Applications" subtitle="Track every application in one place." />

        {/* Summary bar */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Tracked", value: jobs.length },
            { label: "Applied", value: applied },
            { label: "Interviews", value: interviews },
            { label: "Overdue", value: overdue, highlight: overdue > 0 },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl bg-card-bg p-4 shadow-md ring-1 ring-black/10 ${
                stat.highlight ? "text-pink-bold" : "text-ink"
              }`}
            >
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <div className="mt-4 flex items-center gap-3 rounded-lg bg-sage-light px-4 py-2">
            <span className="text-sm text-ink font-medium">{selected.size} selected</span>
            <button
              onClick={deleteSelected}
              className="rounded-lg bg-pink-bold px-3 py-1 text-xs font-semibold text-white transition hover:opacity-80"
            >
              Delete selected
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-xs text-muted hover:text-ink transition"
            >
              Clear
            </button>
          </div>
        )}

        {/* Jobs list */}
        {jobs.length === 0 ? (
          <div className="mt-10 rounded-xl bg-card-bg p-8 text-center text-muted shadow">
            No jobs yet. Add one to get started!
          </div>
        ) : (
          <>
            {/* Mobile: select-all toggle */}
            <div className="mt-4 flex items-center gap-2 px-1 md:hidden">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-3.5 w-3.5 cursor-pointer"
              />
              <span className="text-xs text-muted">Select all</span>
            </div>

            {/* Mobile cards — compact for density */}
            <div className="mt-1.5 space-y-1.5 md:hidden">
              {jobs.map((job) => {
                const colors = STATUS_COLORS[job.status];
                const overdueDays =
                  job.nextActionDate ? daysOverdue(job.nextActionDate) : 0;
                const isOverdue = overdueDays > 0;
                const isSelected = selected.has(job.id);

                return (
                  <div
                    key={job.id}
                    onClick={() => setEditingJob(job)}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg bg-card-bg px-3 py-2.5 shadow-sm ring-1 ring-black/10 transition active:scale-[0.99] ${
                      isOverdue ? "ring-pink-bold/30" : ""
                    } ${isSelected ? "bg-sage-light/50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(job.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-3.5 w-3.5 shrink-0 cursor-pointer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-['Fraunces',serif] text-sm font-semibold text-ink">
                          {job.company}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${colors.bg} ${colors.text}`}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted">
                        <span className="truncate">{job.jobTitle}</span>
                        {isOverdue && (
                          <span className="shrink-0 text-pink-bold">
                            {overdueDays}d overdue
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteJob(job.id);
                        setSelected((prev) => {
                          const next = new Set(prev);
                          next.delete(job.id);
                          return next;
                        });
                      }}
                      className="shrink-0 text-[11px] text-muted hover:text-pink-bold transition"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Desktop table */}
            <div className="mt-6 hidden overflow-x-auto rounded-xl bg-card-bg font-['Space_Grotesk',sans-serif] shadow-md ring-1 ring-black/10 md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/5 text-xs text-pink-bold">
                    <th className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                        className="h-3.5 w-3.5 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 font-medium">Company / Role</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="hidden px-4 py-3 font-medium lg:table-cell">Applied</th>
                    <th className="hidden px-4 py-3 font-medium lg:table-cell">Next Action</th>
                    <th className="hidden px-4 py-3 font-medium lg:table-cell">Next Date</th>
                    <th className="hidden px-4 py-3 font-medium lg:table-cell">Link</th>
                    <th className="px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => {
                    const colors = STATUS_COLORS[job.status];
                    const overdueDays =
                      job.nextActionDate ? daysOverdue(job.nextActionDate) : 0;
                    const isOverdue = overdueDays > 0;
                    const isSelected = selected.has(job.id);

                    return (
                      <tr
                        key={job.id}
                        onClick={() => setEditingJob(job)}
                        className={`border-b border-black/5 last:border-0 cursor-pointer transition hover:bg-sage-light/30 ${
                          isOverdue ? "bg-status-rejected-bg/40" : ""
                        } ${isSelected ? "bg-sage-light/50" : ""}`}
                      >
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOne(job.id)}
                            className="h-3.5 w-3.5 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-['Fraunces',serif] text-sm font-semibold text-ink">{job.company}</p>
                          <p className="text-xs text-sage-mid">{job.jobTitle}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
                          >
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-muted lg:table-cell">
                          {job.dateApplied
                            ? new Date(job.dateApplied).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "—"}
                        </td>
                        <td className={`hidden px-4 py-3 lg:table-cell ${isOverdue ? "text-pink-bold" : "text-ink"}`}>
                          {job.nextAction || "—"}
                        </td>
                        <td className={`hidden px-4 py-3 lg:table-cell ${isOverdue ? "text-pink-bold" : "text-muted"}`}>
                          {isOverdue
                            ? `${overdueDays} day${overdueDays === 1 ? "" : "s"} overdue`
                            : job.nextActionDate
                              ? new Date(job.nextActionDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "—"}
                        </td>
                        <td className="hidden px-4 py-3 lg:table-cell">
                          {job.jobLink && /^https?:\/\//i.test(job.jobLink) ? (
                            <a
                              href={job.jobLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs text-sage-dark underline underline-offset-2 hover:text-sage-mid"
                            >
                              View
                            </a>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingJob(job);
                              }}
                              className="text-xs text-muted hover:text-sage-dark transition"
                            >
                              Edit
                            </button>
                            <span className="text-muted">·</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteJob(job.id);
                                setSelected((prev) => {
                                  const next = new Set(prev);
                                  next.delete(job.id);
                                  return next;
                                });
                              }}
                              className="text-xs text-muted hover:text-pink-bold transition"
                            >
                              Delete
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="mt-10">
        <Footer />
      </div>

      {editingJob && (
        <EditJobModal
          key={editingJob.id}
          job={editingJob}
          onSave={(id, updates) => {
            updateJob(id, updates);
            setEditingJob(null);
          }}
          onClose={() => setEditingJob(null)}
        />
      )}
    </main>
  );
}
