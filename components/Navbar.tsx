import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const links = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Add a Job" },
  { href: "/jobs", label: "View Jobs" },
];

export default function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const initial = user?.email?.charAt(0).toUpperCase() ?? "?";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-card-bg px-4 py-3 font-['Space_Grotesk',sans-serif] shadow-md sm:px-6 sm:py-4">
        <Link href="/" className="shrink-0 font-['Fraunces',serif] text-xl font-semibold text-sage-dark">
          JobTracker
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {links.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-2xl px-2 py-1 text-[11px] font-['Space_Grotesk',sans-serif] transition sm:px-3 sm:py-1.5 sm:text-sm ${
                  active
                    ? "bg-sage-dark text-page-bg font-semibold"
                    : "text-sage-mid hover:text-sage-dark opacity-80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {user && (
            <Link
              href="/settings"
              className={`whitespace-nowrap rounded-2xl px-2 py-1 text-[11px] font-['Space_Grotesk',sans-serif] transition sm:px-3 sm:py-1.5 sm:text-sm ${
                router.pathname === "/settings"
                  ? "bg-sage-dark text-page-bg font-semibold"
                  : "text-sage-mid hover:text-sage-dark opacity-80"
              }`}
            >
              Settings
            </Link>
          )}
          {user && (
            <div className="relative ml-1 sm:ml-2" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-dark text-sm font-semibold text-page-bg transition hover:opacity-80"
              >
                {initial}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-card-bg py-2 shadow-xl ring-1 ring-black/10">
                  <p className="truncate px-4 py-2 text-xs text-muted">
                    {user.email}
                  </p>
                  <hr className="border-black/5" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-ink transition hover:bg-sage-light/50 hover:text-pink-bold"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-card-bg p-6 shadow-xl ring-1 ring-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-['Fraunces',serif] text-lg font-bold text-ink">
              Log out?
            </h2>
            <p className="mt-2 text-sm text-muted">
              You&apos;ll need to sign in again to access your jobs.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 rounded-lg border border-black/10 py-2 text-sm text-ink transition hover:bg-sage-light"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/login");
                }}
                className="flex-1 rounded-lg bg-pink-bold py-2 text-sm text-white transition hover:opacity-80"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
