import * as React from "react";

type JobFormValues = {
  company: string;
  jobTitle: string;
  status: "applied" | "interview" | "offer" | "rejected" | "withdrawn";
  deadline?: string;
  notes?: string;
};

type JobFormProps = {
  onSave?: (values: JobFormValues) => void;
};

export default function JobForm({ onSave }: JobFormProps) {
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
            status: (data.status as JobFormValues["status"]) || "applied",
            deadline: (data.deadline as string) || "",
            notes: (data.notes as string) || "",
          };
          if (onSave) onSave(values);
          else console.log("JobForm submit:", values);
        }}
        className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h3 id="job-form-title" className="sr-only">
          Add a job application
        </h3>

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
            className="mt-1 w-full rounded border border-gray-300 p-2
                       text-ink
                       focus:border-sage-mid
                       focus:outline-none focus:ring-2 focus:ring-sage-mid"
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
            className="mt-1 w-full rounded border border-gray-300 p-2
                       text-ink
                       focus:border-sage-mid
                       focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-ink">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue="applied"
            className="mt-1 w-full rounded border border-gray-300 p-2
                       text-ink
                       focus:border-sage-mid
                       focus:outline-none focus:ring-2 focus:ring-sage-mid"
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-ink">
            Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            className="mt-1 w-full rounded border border-gray-300 p-2
                       text-ink
                       focus:border-sage-mid
                       focus:outline-none focus:ring-2 focus:ring-sage-mid"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-ink">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Optional notes"
            className="mt-1 w-full rounded border border-gray-300 p-2
                       text-ink
                       placeholder:text-muted
                       focus:border-sage-mid
                       focus:outline-none focus:ring-2 focus:ring-sage-mid"
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
