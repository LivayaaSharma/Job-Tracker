import type { Job } from "@/hooks/useJobs";

type JobCardProps = {
  job: Job;
  onDelete: (id: string) => void;
};

export default function JobCard({ job, onDelete }: JobCardProps) {
  return (
    <div className="rounded-xl bg-card-bg p-3 shadow-sm ring-1 ring-black/5">
      <h4 className="text-sm font-semibold text-ink truncate">{job.company}</h4>
      <p className="text-xs text-sage-mid truncate">{job.jobTitle}</p>

      {job.nextActionDate && (
        <p className="mt-2 text-xs text-muted">Next: {job.nextActionDate}</p>
      )}

      <button
        onClick={() => onDelete(job.id)}
        className="mt-2 text-xs text-pink-bold opacity-60 hover:opacity-100 transition"
      >
        Remove
      </button>
    </div>
  );
}
