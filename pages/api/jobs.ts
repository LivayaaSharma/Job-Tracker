import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

const VALID_STATUSES = ["saved", "applied", "interview", "offer", "rejected"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SAFE_URL = /^https?:\/\//i;
const MAX_STRING = 500;

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing Supabase service role configuration");
  }
  return createClient(url, serviceKey);
}

function sanitize(value: unknown, maxLen = MAX_STRING): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Authenticate via API key
  const header = req.headers.authorization ?? "";
  const rawKey = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!rawKey || !rawKey.startsWith("sk_")) {
    return res.status(401).json({ error: "Missing or invalid API key" });
  }

  const keyHash = createHash("sha256").update(rawKey).digest("hex");
  const admin = createServiceClient();

  // Look up the key — must exist and not be revoked
  const { data: keyRow, error: keyError } = await admin
    .from("api_keys")
    .select("user_id, revoked_at")
    .eq("key_hash", keyHash)
    .maybeSingle();

  if (keyError || !keyRow) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  if (keyRow.revoked_at) {
    return res.status(401).json({ error: "API key has been revoked" });
  }

  const userId = keyRow.user_id;

  // Validate the request body
  const body = req.body;
  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Request body must be JSON" });
  }

  const company = sanitize(body.company);
  const jobTitle = sanitize(body.jobTitle);

  if (!company) {
    return res.status(400).json({ error: "company is required" });
  }
  if (!jobTitle) {
    return res.status(400).json({ error: "jobTitle is required" });
  }

  // Validate optional fields
  const status = sanitize(body.status) || "applied";
  if (!VALID_STATUSES.includes(status)) {
    return res
      .status(400)
      .json({ error: `status must be one of: ${VALID_STATUSES.join(", ")}` });
  }

  const dateApplied = sanitize(body.dateApplied) || new Date().toISOString().slice(0, 10);
  if (!ISO_DATE.test(dateApplied)) {
    return res.status(400).json({ error: "dateApplied must be YYYY-MM-DD" });
  }

  const nextAction = sanitize(body.nextAction);
  const nextActionDate = sanitize(body.nextActionDate);
  if (nextActionDate && !ISO_DATE.test(nextActionDate)) {
    return res.status(400).json({ error: "nextActionDate must be YYYY-MM-DD" });
  }

  const jobLink = sanitize(body.jobLink, 2000);
  if (jobLink && !SAFE_URL.test(jobLink)) {
    return res.status(400).json({ error: "jobLink must start with http:// or https://" });
  }

  const notes = sanitize(body.notes, 2000);

  // Insert the job — user_id comes from the verified key, never from the request
  const { data, error } = await admin.from("jobs").insert({
    user_id: userId,
    company,
    job_title: jobTitle,
    status,
    date_applied: dateApplied || null,
    next_action: nextAction || null,
    next_action_date: nextActionDate || null,
    job_link: jobLink || null,
    notes: notes || null,
  }).select("id").single();

  if (error) {
    return res.status(500).json({ error: "Failed to create job" });
  }

  return res.status(201).json({
    created: true,
    id: data.id,
    company,
    jobTitle,
    status,
  });
}
