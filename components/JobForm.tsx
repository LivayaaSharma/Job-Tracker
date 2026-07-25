import * as React from "react";
import type { Job } from "@/hooks/useJobs";

type JobFormValues = Omit<Job, "id">;

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

type JobFormProps = {
  onSave?: (values: JobFormValues) => void;
};

export default function JobForm({ onSave }: JobFormProps) {
  const [status, setStatus] = React.useState<Job["status"]>("saved");

  return (
    <section className="mt-12 flex justify-center">
      <form
        aria-labelledby="job-form-title"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = Object.fromEntries(new FormData(form).entries());
          const values: JobFormValues = {
            company: (data.company as string) || "",
            jobTitle: (data.jobTitle as string) || "",
            status,
            dateApplied: (data.dateApplied as string) || "",
            nextAction: (data.nextAction as string) || "",
            nextActionDate: (data.nextActionDate as string) || "",
            jobLink: (data.jobLink as string) || "",
            notes: (data.notes as string) || "",
          };
          if (onSave) onSave(values);
          else console.log("JobForm submit:", values);
        }}
        className="w-full max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h3 id="job-form-title" className="sr-only">
          Add a job application
        </h3>

        {/* Row 1: Company + Job Title */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-ink">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              placeholder="e.g. Google"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-ink">
              Job Title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              required
              placeholder="e.g. Frontend Intern"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
        </div>

        {/* Row 2: Status pills */}
        <div>
          <span className="block text-sm font-medium text-ink mb-2">Status</span>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => {
              const colors = STATUS_COLORS[s.value];
              const selected = status === s.value;
              return (
                <button
                  key={s.value}
                  type="button"
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

        {/* Row 3: Date Applied + Next Action Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="dateApplied" className="block text-sm font-medium text-ink">
              Date Applied
            </label>
            <input
              id="dateApplied"
              name="dateApplied"
              type="date"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
          <div>
            <label htmlFor="nextActionDate" className="block text-sm font-medium text-ink">
              Next Action Date
            </label>
            <input
              id="nextActionDate"
              name="nextActionDate"
              type="date"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>
        </div>

        {/* Row 4: Next Action */}
        <div>
          <label htmlFor="nextAction" className="block text-sm font-medium text-ink">
            Next Action
          </label>
          <input
            id="nextAction"
            name="nextAction"
            type="text"
            placeholder="e.g. Follow up, Prepare interview"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink
                       focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        {/* Row 5: Job Link */}
        <div>
          <label htmlFor="jobLink" className="block text-sm font-medium text-ink">
            Job Link
          </label>
          <input
            id="jobLink"
            name="jobLink"
            type="url"
            placeholder="https://..."
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink
                       focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        {/* Row 6: Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-ink">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Optional notes"
            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-ink
                       placeholder:text-muted
                       focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-sage-dark py-2 text-white transition
                     hover:bg-sage-mid
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-mid"
        >
          Save and Breathe
        </button>
      </form>
    </section>
  );
}
