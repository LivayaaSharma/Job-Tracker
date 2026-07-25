import * as React from "react";
import type { Job } from "@/hooks/useJobs";

const STATUSES: { value: Job["status"]; label: string }[] = [
  { value: "saved", label: "Saved" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_COLORS: Record<Job["status"], { bg: string; text: string; ring: string }> = {
  saved: { bg: "bg-status-saved-bg", text: "text-status-saved-text", ring: "ring-status-saved-text" },
  applied: { bg: "bg-status-applied-bg", text: "text-status-applied-text", ring: "ring-status-applied-text" },
  interview: { bg: "bg-status-interview-bg", text: "text-status-interview-text", ring: "ring-status-interview-text" },
  offer: { bg: "bg-status-offer-bg", text: "text-status-offer-text", ring: "ring-status-offer-text" },
  rejected: { bg: "bg-status-rejected-bg", text: "text-status-rejected-text", ring: "ring-status-rejected-text" },
};

type EditJobModalProps = {
  job: Job;
  onSave: (id: string, updates: Partial<Job>) => void;
  onClose: () => void;
};

export default function EditJobModal({ job, onSave, onClose }: EditJobModalProps) {
  const [status, setStatus] = React.useState<Job["status"]>(job.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget).entries());
          onSave(job.id, {
            company: (data.company as string) || "",
            jobTitle: (data.jobTitle as string) || "",
            status,
            dateApplied: (data.dateApplied as string) || "",
            nextAction: (data.nextAction as string) || "",
            nextActionDate: (data.nextActionDate as string) || "",
            jobLink: (data.jobLink as string) || "",
            notes: (data.notes as string) || "",
          });
          onClose();
        }}
        className="w-full max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink">Edit Job</h3>
          <button type="button" onClick={onClose} className="text-muted hover:text-ink text-xl leading-none">
            &times;
          </button>
        </div>

        {/* Row 1: Company + Job Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="edit-company" className="block text-sm font-medium text-ink">Company</label>
            <input
              id="edit-company" name="company" type="text" required
              defaultValue={job.company}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
          <div>
            <label htmlFor="edit-jobTitle" className="block text-sm font-medium text-ink">Job Title</label>
            <input
              id="edit-jobTitle" name="jobTitle" type="text" required
              defaultValue={job.jobTitle}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
        </div>

        {/* Status pills */}
        <div>
          <span className="block text-sm font-medium text-ink mb-2">Status</span>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => {
              const colors = STATUS_COLORS[s.value];
              const selected = status === s.value;
              return (
                <button
                  key={s.value} type="button"
                  onClick={() => setStatus(s.value)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition
                    ${colors.bg} ${colors.text}
                    ${selected ? `ring-2 ${colors.ring} ring-offset-1` : "opacity-60 hover:opacity-80"}`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="edit-dateApplied" className="block text-sm font-medium text-ink">Date Applied</label>
            <input
              id="edit-dateApplied" name="dateApplied" type="date"
              defaultValue={job.dateApplied}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
          <div>
            <label htmlFor="edit-nextActionDate" className="block text-sm font-medium text-ink">Next Action Date</label>
            <input
              id="edit-nextActionDate" name="nextActionDate" type="date"
              defaultValue={job.nextActionDate}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
        </div>

        {/* Next Action */}
        <div>
          <label htmlFor="edit-nextAction" className="block text-sm font-medium text-ink">Next Action</label>
          <input
            id="edit-nextAction" name="nextAction" type="text"
            defaultValue={job.nextAction}
            placeholder="e.g. Follow up, Prepare interview"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        {/* Job Link */}
        <div>
          <label htmlFor="edit-jobLink" className="block text-sm font-medium text-ink">Job Link</label>
          <input
            id="edit-jobLink" name="jobLink" type="url"
            defaultValue={job.jobLink}
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="edit-notes" className="block text-sm font-medium text-ink">Notes</label>
          <textarea
            id="edit-notes" name="notes" rows={3}
            defaultValue={job.notes}
            placeholder="Optional notes"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink placeholder:text-muted focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-2xl bg-sage-dark py-2 text-white transition hover:bg-sage-mid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-mid"
          >
            Save Changes
          </button>
          <button
            type="button" onClick={onClose}
            className="rounded-2xl px-6 py-2 text-sm text-muted transition hover:text-ink"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
