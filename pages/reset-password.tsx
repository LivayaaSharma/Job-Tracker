import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase sends the user here with a session already set via the URL hash
    supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      router.push("/jobs");
    }
    setSubmitting(false);
  }

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-page-bg font-['Space_Grotesk',sans-serif]">
        <p className="text-muted">Loading...</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>New Password • JobTracker</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-page-bg font-['Space_Grotesk',sans-serif]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 rounded-xl bg-card-bg p-8 shadow-lg ring-1 ring-black/10"
        >
          <h1 className="text-center font-['Fraunces',serif] text-2xl font-bold text-ink">
            Set New Password
          </h1>

          {error && (
            <p className="rounded-lg bg-status-rejected-bg px-3 py-2 text-sm text-status-rejected-text">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 p-2 text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-ink">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 p-2 text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-sage-dark py-2 text-page-bg transition
                       hover:bg-sage-mid disabled:opacity-50
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-mid"
          >
            {submitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </main>
    </>
  );
}
