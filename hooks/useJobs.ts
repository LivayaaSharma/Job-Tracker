import { useState, useEffect } from "react";

export type Job = {
  id: string;
  company: string;
  jobTitle: string;
  status: "saved" | "applied" | "interview" | "offer" | "rejected";
  deadline?: string;
  notes?: string;
};

const STORAGE_KEY = "jobtracker-jobs";

function loadJobs(): Job[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveJobs(jobs: Job[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>(loadJobs);

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  function addJob(entry: Omit<Job, "id">) {
    const newJob: Job = { ...entry, id: crypto.randomUUID() };
    setJobs((prev) => [...prev, newJob]);
  }

  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function updateJob(id: string, updates: Partial<Job>) {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, ...updates } : job))
    );
  }

  return { jobs, addJob, deleteJob, updateJob };
}
