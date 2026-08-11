import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.push("/jobs");
  }, [loading, user, router]);

  if (loading || user) return null;

  function switchMode(next: "login" | "signup" | "forgot") {
    setMode(next);
    setError("");
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (mode === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a password reset link.");
      }
    } else if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email to confirm your account.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/jobs");
      }
    }

    setSubmitting(false);
  }

  return (
    <>
      <Head>
        <title>
          {mode === "signup" ? "Sign Up" : mode === "forgot" ? "Reset Password" : "Log In"} • JobTracker
        </title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-page-bg font-['Space_Grotesk',sans-serif]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 rounded-xl bg-card-bg p-8 shadow-lg ring-1 ring-black/10"
        >
          <h1 className="text-center font-['Fraunces',serif] text-2xl font-bold text-ink">
            {mode === "signup" ? "Create Account" : mode === "forgot" ? "Reset Password" : "Welcome Back"}
          </h1>

          {error && (
            <p className="rounded-lg bg-status-rejected-bg px-3 py-2 text-sm text-status-rejected-text">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-lg bg-status-applied-bg px-3 py-2 text-sm text-status-applied-text">
              {message}
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 p-2 text-ink
                         focus:border-sage-mid focus:outline-none focus:ring-2 focus:ring-sage-mid"
            />
          </div>

          {mode !== "forgot" && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink">
                Password
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
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-sage-dark py-2 text-page-bg transition
                       hover:bg-sage-mid disabled:opacity-50
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-mid"
          >
            {submitting
              ? "Please wait..."
              : mode === "signup"
                ? "Sign Up"
                : mode === "forgot"
                  ? "Send Reset Link"
                  : "Log In"}
          </button>

          <div className="space-y-1 text-center text-sm text-muted">
            {mode === "login" && (
              <>
                <p>
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => switchMode("signup")}
                    className="text-sage-dark underline underline-offset-2 hover:text-sage-mid">
                    Sign up
                  </button>
                </p>
                <p>
                  <button type="button" onClick={() => switchMode("forgot")}
                    className="text-sage-dark underline underline-offset-2 hover:text-sage-mid">
                    Forgot password?
                  </button>
                </p>
              </>
            )}
            {mode === "signup" && (
              <p>
                Already have an account?{" "}
                <button type="button" onClick={() => switchMode("login")}
                  className="text-sage-dark underline underline-offset-2 hover:text-sage-mid">
                  Log in
                </button>
              </p>
            )}
            {mode === "forgot" && (
              <p>
                <button type="button" onClick={() => switchMode("login")}
                  className="text-sage-dark underline underline-offset-2 hover:text-sage-mid">
                  Back to login
                </button>
              </p>
            )}
          </div>
        </form>
      </main>
    </>
  );
}
