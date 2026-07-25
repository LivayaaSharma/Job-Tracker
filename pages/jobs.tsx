import { useState } from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import EditJobModal from "@/components/EditJobModal";
import { useJobs } from "@/hooks/useJobs";
import type { Job } from "@/hooks/useJobs";

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
  const { jobs, deleteJob, updateJob } = useJobs();
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const applied = jobs.filter((j) => j.status === "applied").length;
  const interviews = jobs.filter((j) => j.status === "interview").length;
  const overdue = jobs.filter(
    (j) => j.nextActionDate && daysOverdue(j.nextActionDate) > 0
  ).length;

  return (
    <main className="min-h-screen bg-page-bg font-['Space_Grotesk',sans-serif]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6">
        <Header title="Your Jobs" subtitle="Track every application in one place." />

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
              className={`rounded-xl bg-card-bg p-4 shadow-sm ring-1 ring-sage-mid/20 ${
                stat.highlight ? "text-pink-bold" : "text-ink"
              }`}
            >
              <p className="text-xs text-muted">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {jobs.length === 0 ? (
          <div className="mt-10 rounded-xl bg-card-bg p-8 text-center text-muted shadow">
            No jobs yet. Add one to get started!
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl bg-card-bg font-['Space_Grotesk',sans-serif] shadow-sm ring-1 ring-sage-mid/20">
            <table className="min-w-[900px] w-full text-left text-sm lg:min-w-0">
              <thead>
                <tr className="border-b border-sage-mid/20 text-xs text-pink-bold">
                  <th className="px-4 py-3 font-medium">Company / Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Applied</th>
                  <th className="px-4 py-3 font-medium">Next Action</th>
                  <th className="px-4 py-3 font-medium">Next Date</th>
                  <th className="px-4 py-3 font-medium">Link</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => {
                  const colors = STATUS_COLORS[job.status];
                  const overdueDays =
                    job.nextActionDate ? daysOverdue(job.nextActionDate) : 0;
                  const isOverdue = overdueDays > 0;

                  return (
                    <tr
                      key={job.id}
                      onClick={() => setEditingJob(job)}
                      className={`border-b border-sage-mid/20 last:border-0 cursor-pointer transition hover:bg-sage-light/30 ${
                        isOverdue ? "bg-status-rejected-bg/40" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-['Fraunces',serif] text-lg font-semibold leading-tight text-ink">{job.company}</p>
                        <p className="text-xs text-sage-mid">{job.jobTitle}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {job.dateApplied
                          ? new Date(job.dateApplied).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "—"}
                      </td>
                      <td className={`px-4 py-3 ${isOverdue ? "text-pink-bold" : "text-ink"}`}>
                        {job.nextAction || "—"}
                      </td>
                      <td className={`px-4 py-3 ${isOverdue ? "text-pink-bold" : "text-muted"}`}>
                        {isOverdue
                          ? `${overdueDays} day${overdueDays === 1 ? "" : "s"} overdue`
                          : job.nextActionDate
                            ? new Date(job.nextActionDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "—"}
                      </td>
                      <td className="px-4 py-3">
                        {job.jobLink ? (
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
        )}
      </div>

      {editingJob && (
        <EditJobModal
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
