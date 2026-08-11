import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type ApiKey = {
  id: string;
  key_prefix: string;
  label: string;
  created_at: string;
  revoked_at: string | null;
};

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [keysLoading, setKeysLoading] = useState(true);
  const [label, setLabel] = useState("");
  const [generating, setGenerating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (user) fetchKeys();
  }, [user]);

  async function getAuthHeader() {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? "";
  }

  const fetchKeys = useCallback(async () => {
    setKeysLoading(true);
    const token = await getAuthHeader();
    const res = await fetch("/api/keys", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setKeys(data.keys);
    }
    setKeysLoading(false);
  }, []);

  async function generateKey() {
    setGenerating(true);
    const token = await getAuthHeader();
    const res = await fetch("/api/keys", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: label.trim() }),
    });
    if (res.ok) {
      const data = await res.json();
      setNewKey(data.key);
      setLabel("");
      await fetchKeys();
    }
    setGenerating(false);
  }

  async function revokeKey(id: string) {
    setRevoking(id);
    const token = await getAuthHeader();
    await fetch("/api/keys", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await fetchKeys();
    setRevoking(null);
  }

  function copyKey() {
    if (newKey) {
      navigator.clipboard.writeText(newKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading || !user) return null;

  const activeKeys = keys.filter((k) => !k.revoked_at);
  const revokedKeys = keys.filter((k) => k.revoked_at);

  return (
    <main className="flex min-h-screen flex-col bg-page-bg pt-14 font-['Space_Grotesk',sans-serif]">
      <Navbar />
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 sm:px-5">
        <Header title="Settings" subtitle="Manage your API keys for external integrations." />

        {/* Generate new key */}
        <section className="mt-8 rounded-xl bg-card-bg p-6 shadow-md ring-1 ring-black/10">
          <h3 className="font-['Fraunces',serif] text-lg font-semibold text-ink">
            Generate API Key
          </h3>
          <p className="mt-1 text-sm text-muted">
            Create a key to let external tools add jobs to your tracker automatically.
          </p>
          <div className="mt-4 flex gap-3">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Label (e.g. My apply bot)"
              maxLength={100}
              className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
            <button
              onClick={generateKey}
              disabled={generating}
              className="shrink-0 rounded-lg bg-sage-dark px-4 py-2 text-sm text-page-bg transition
                         hover:bg-sage-mid disabled:opacity-50"
            >
              {generating ? "Generating..." : "Generate"}
            </button>
          </div>
        </section>

        {/* Newly generated key (shown once) */}
        {newKey && (
          <section className="mt-4 rounded-xl border-2 border-sage-dark bg-sage-light/30 p-6">
            <h3 className="font-['Fraunces',serif] text-lg font-semibold text-ink">
              Your new API key
            </h3>
            <p className="mt-1 text-sm text-pink-bold font-medium">
              Copy it now — you won&apos;t be able to see it again.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 overflow-x-auto rounded-lg bg-card-bg px-3 py-2 text-xs text-ink ring-1 ring-black/10">
                {newKey}
              </code>
              <button
                onClick={copyKey}
                className="shrink-0 rounded-lg bg-sage-dark px-3 py-2 text-xs text-page-bg transition hover:bg-sage-mid"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={() => setNewKey(null)}
              className="mt-3 text-xs text-muted hover:text-ink transition"
            >
              Dismiss
            </button>
          </section>
        )}

        {/* Active keys */}
        <section className="mt-8">
          <h3 className="font-['Fraunces',serif] text-lg font-semibold text-ink">
            Active Keys
          </h3>
          {keysLoading ? (
            <p className="mt-3 text-sm text-muted">Loading...</p>
          ) : activeKeys.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No active keys. Generate one above.</p>
          ) : (
            <div className="mt-3 space-y-2">
              {activeKeys.map((k) => (
                <div
                  key={k.id}
                  className="flex items-center justify-between rounded-lg bg-card-bg px-4 py-3 shadow-sm ring-1 ring-black/10"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">
                      <code className="text-xs">{k.key_prefix}...</code>
                      {k.label && (
                        <span className="ml-2 text-muted">— {k.label}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted">
                      Created{" "}
                      {new Date(k.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => revokeKey(k.id)}
                    disabled={revoking === k.id}
                    className="shrink-0 rounded-lg border border-pink-bold/30 px-3 py-1.5 text-xs text-pink-bold transition
                               hover:bg-pink-bold hover:text-white disabled:opacity-50"
                  >
                    {revoking === k.id ? "Revoking..." : "Revoke"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Revoked keys */}
        {revokedKeys.length > 0 && (
          <section className="mt-8 mb-10">
            <h3 className="text-sm font-medium text-muted">Revoked Keys</h3>
            <div className="mt-2 space-y-1.5">
              {revokedKeys.map((k) => (
                <div
                  key={k.id}
                  className="flex items-center justify-between rounded-lg bg-card-bg/50 px-4 py-2.5 ring-1 ring-black/5"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-muted line-through">
                      <code className="text-xs">{k.key_prefix}...</code>
                      {k.label && <span className="ml-2">— {k.label}</span>}
                    </p>
                    <p className="text-xs text-muted">
                      Revoked{" "}
                      {new Date(k.revoked_at!).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Usage instructions */}
        <section className="mt-8 mb-10 rounded-xl bg-card-bg p-6 shadow-md ring-1 ring-black/10">
          <h3 className="font-['Fraunces',serif] text-lg font-semibold text-ink">
            How to use your API key
          </h3>
          <p className="mt-2 text-sm text-muted">
            Your scripts, AI agents, or custom tools can send job data to your tracker
            using the request format below. This works with anything you build or set up yourself.
            It does not connect to platforms like LinkedIn or Indeed directly.
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-[#2C3525] px-4 py-3 text-xs text-page-bg leading-relaxed">
{`POST /api/jobs
Authorization: Bearer PASTE_YOUR_API_KEY_HERE
Content-Type: application/json

{
  "company": "Google",
  "jobTitle": "SWE Intern",
  "status": "applied"
}`}
          </pre>
          <div className="mt-3 space-y-1.5 text-xs text-muted">
            <p>
              Replace <code className="font-medium text-ink">PASTE_YOUR_API_KEY_HERE</code> with
              the key you copied above. The job details (company, title, etc.) will be
              filled in automatically by whatever tool you connect.
            </p>
            <p>
              <span className="font-medium text-ink">Required:</span>{" "}
              <code className="text-ink">company</code>, <code className="text-ink">jobTitle</code>
            </p>
            <p>
              <span className="font-medium text-ink">Optional:</span>{" "}
              <code className="text-ink">status</code> (defaults to &quot;applied&quot;),{" "}
              <code className="text-ink">dateApplied</code> (defaults to today),{" "}
              <code className="text-ink">nextAction</code>,{" "}
              <code className="text-ink">nextActionDate</code>,{" "}
              <code className="text-ink">jobLink</code>,{" "}
              <code className="text-ink">notes</code>
            </p>
          </div>
        </section>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}
