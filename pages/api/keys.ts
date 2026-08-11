import type { NextApiRequest, NextApiResponse } from "next";
import { createHash, randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";

function getAuthedUser(req: NextApiRequest) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;
  return token;
}

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Missing Supabase service role configuration");
  }
  return createClient(url, serviceKey);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Authenticate: the browser sends the user's Supabase session token
  const token = getAuthedUser(req);
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const admin = createServiceClient();

  // Verify the session token to get the user
  const {
    data: { user },
    error: authError,
  } = await admin.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: "Invalid session" });
  }

  // POST — generate a new API key
  if (req.method === "POST") {
    const label =
      typeof req.body?.label === "string" ? req.body.label.trim().slice(0, 100) : "";

    // Generate a cryptographically random key
    const raw = "sk_" + randomBytes(32).toString("hex");
    const prefix = raw.slice(0, 11);
    const hash = createHash("sha256").update(raw).digest("hex");

    const { error } = await admin.from("api_keys").insert({
      user_id: user.id,
      key_hash: hash,
      key_prefix: prefix,
      label,
    });

    if (error) {
      return res.status(500).json({ error: "Failed to create API key" });
    }

    // Return the raw key — this is the ONLY time it's visible
    return res.status(201).json({ key: raw, prefix, label });
  }

  // GET — list the user's keys (never returns raw keys or hashes)
  if (req.method === "GET") {
    const { data, error } = await admin
      .from("api_keys")
      .select("id, key_prefix, label, created_at, revoked_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: "Failed to fetch keys" });
    }

    return res.status(200).json({ keys: data });
  }

  // DELETE — revoke a key (soft delete: sets revoked_at)
  if (req.method === "DELETE") {
    const keyId = req.body?.id;
    if (typeof keyId !== "string") {
      return res.status(400).json({ error: "Missing key id" });
    }

    const { error } = await admin
      .from("api_keys")
      .update({ revoked_at: new Date().toISOString() })
      .eq("id", keyId)
      .eq("user_id", user.id);

    if (error) {
      return res.status(500).json({ error: "Failed to revoke key" });
    }

    return res.status(200).json({ revoked: true });
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
