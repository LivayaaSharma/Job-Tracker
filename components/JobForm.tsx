import * as React from "react";

type JobFormValues = {
  company: string;
  jobTitle: string;
  status: "applied" | "interview" | "offer" | "rejected";
  deadline?: string; // YYYY-MM-DD
  notes?: string;
};

type JobFormProps = {
  onSave?: (values: JobFormValues) => void; // optional for now; logs to console if not provided
};

export default function JobForm({ onSave }: JobFormProps) {
  return (
    <section className="mt-10 flex justify-center">
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
        className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg"
      >
        <h3 id="job-form-title" className="sr-only">
          Add a job application
        </h3>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g. Google"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            required
            autoComplete="organization-title"
            placeholder="e.g. Frontend Intern"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue="applied"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Withdrawn">Withdrawn</option>
            <option value="Rejected">Rejected</option>  
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Optional notes"
            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded bg-pink-500 py-2 text-white transition hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
        >
          Save and Breathe
        </button>
      </form>
    </section>
  );
}
