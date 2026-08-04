import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export type Job = {
  id: string;
  company: string;
  jobTitle: string;
  status: "saved" | "applied" | "interview" | "offer" | "rejected";
  dateApplied?: string;
  nextAction?: string;
  nextActionDate?: string;
  jobLink?: string;
  notes?: string;
};

type DbRow = {
  id: string;
  company: string;
  job_title: string;
  status: Job["status"];
  date_applied: string | null;
  next_action: string | null;
  next_action_date: string | null;
  job_link: string | null;
  notes: string | null;
};

function rowToJob(row: DbRow): Job {
  return {
    id: row.id,
    company: row.company,
    jobTitle: row.job_title,
    status: row.status,
    dateApplied: row.date_applied ?? undefined,
    nextAction: row.next_action ?? undefined,
    nextActionDate: row.next_action_date ?? undefined,
    jobLink: row.job_link ?? undefined,
    notes: row.notes ?? undefined,
  };
}

function jobToRow(job: Omit<Job, "id">) {
  return {
    company: job.company,
    job_title: job.jobTitle,
    status: job.status,
    date_applied: job.dateApplied || null,
    next_action: job.nextAction || null,
    next_action_date: job.nextActionDate || null,
    job_link: job.jobLink || null,
    notes: job.notes || null,
  };
}

export function useJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    if (!user) {
      setJobs([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch jobs:", error.message);
    } else {
      setJobs((data as DbRow[]).map(rowToJob));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  async function addJob(entry: Omit<Job, "id">) {
    if (!user) return;
    const { error } = await supabase
      .from("jobs")
      .insert({ ...jobToRow(entry), user_id: user.id });

    if (error) {
      console.error("Failed to add job:", error.message);
      return;
    }
    await fetchJobs();
  }

  async function deleteJob(id: string) {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete job:", error.message);
      return;
    }
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  async function updateJob(id: string, updates: Partial<Job>) {
    const rowUpdates: Record<string, unknown> = {};
    if (updates.company !== undefined) rowUpdates.company = updates.company;
    if (updates.jobTitle !== undefined) rowUpdates.job_title = updates.jobTitle;
    if (updates.status !== undefined) rowUpdates.status = updates.status;
    if (updates.dateApplied !== undefined) rowUpdates.date_applied = updates.dateApplied || null;
    if (updates.nextAction !== undefined) rowUpdates.next_action = updates.nextAction || null;
    if (updates.nextActionDate !== undefined) rowUpdates.next_action_date = updates.nextActionDate || null;
    if (updates.jobLink !== undefined) rowUpdates.job_link = updates.jobLink || null;
    if (updates.notes !== undefined) rowUpdates.notes = updates.notes || null;

    const { error } = await supabase
      .from("jobs")
      .update(rowUpdates)
      .eq("id", id);

    if (error) {
      console.error("Failed to update job:", error.message);
      return;
    }
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updates } : job))
    );
  }

  return { jobs, loading, addJob, deleteJob, updateJob };
}
