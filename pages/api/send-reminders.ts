import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "crypto";
import { Resend } from "resend";

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing Supabase service role configuration");
  }
  return createClient(url, serviceKey);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!cronSecret || !token || !safeEqual(token, cronSecret)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  const resend = new Resend(resendKey);
  const admin = createServiceClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data: overdueJobs, error: queryError } = await admin
    .from("jobs")
    .select("user_id, company, job_title, next_action, next_action_date")
    .lt("next_action_date", today)
    .not("next_action_date", "is", null);

  if (queryError) {
    return res.status(500).json({ error: "Failed to query overdue jobs" });
  }

  if (!overdueJobs || overdueJobs.length === 0) {
    return res.status(200).json({ sent: 0, message: "No overdue jobs found" });
  }

  const byUser = new Map<string, typeof overdueJobs>();
  for (const job of overdueJobs) {
    const list = byUser.get(job.user_id) ?? [];
    list.push(job);
    byUser.set(job.user_id, list);
  }

  const emailMap = new Map<string, string>();
  for (const userId of byUser.keys()) {
    const { data, error: userError } = await admin.auth.admin.getUserById(userId);
    if (userError || !data?.user?.email) continue;
    if (data.user.user_metadata?.email_reminders === false) continue;
    emailMap.set(userId, data.user.email);
  }

  let sent = 0;
  let failed = 0;

  for (const [userId, jobs] of byUser) {
    const email = emailMap.get(userId);
    if (!email) continue;

    const jobRows = jobs
      .map((j) => {
        const days = Math.floor(
          (Date.now() - new Date(j.next_action_date).getTime()) / (1000 * 60 * 60 * 24)
        );
        return `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(j.company)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(j.job_title)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee">${escapeHtml(j.next_action || "—")}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#D4537E;font-weight:600">${days} day${days === 1 ? "" : "s"} overdue</td>
        </tr>`;
      })
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#4A5E3A">JobTracker Reminder</h2>
        <p style="color:#2C3525">You have ${jobs.length} overdue action${jobs.length === 1 ? "" : "s"}:</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead>
            <tr style="background:#DAE5D0">
              <th style="padding:8px 12px;text-align:left">Company</th>
              <th style="padding:8px 12px;text-align:left">Role</th>
              <th style="padding:8px 12px;text-align:left">Action</th>
              <th style="padding:8px 12px;text-align:left">Status</th>
            </tr>
          </thead>
          <tbody>${jobRows}</tbody>
        </table>
        <p style="margin-top:20px">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://your-app.vercel.app"}/jobs"
             style="background:#4A5E3A;color:#FFF5F6;padding:10px 20px;border-radius:8px;text-decoration:none;display:inline-block">
            Open JobTracker
          </a>
        </p>
        <p style="color:#B4B2A9;font-size:12px;margin-top:24px">
          You're receiving this because you have overdue actions in JobTracker.
        </p>
      </div>
    `;

    const { error: sendError } = await resend.emails.send({
      from: "JobTracker <onboarding@resend.dev>",
      to: email,
      subject: `${jobs.length} overdue action${jobs.length === 1 ? "" : "s"} in JobTracker`,
      html,
    });

    if (sendError) {
      failed++;
    } else {
      sent++;
    }
  }

  return res.status(200).json({ sent, failed });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
