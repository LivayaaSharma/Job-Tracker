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
  const [mobileOpen, setMobileOpen] = useState(false);
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

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  const initial = user?.email?.charAt(0).toUpperCase() ?? "?";

  const allLinks = user ? [...links, { href: "/settings", label: "Settings" }] : links;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-card-bg font-['Space_Grotesk',sans-serif] shadow-md">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="shrink-0 font-['Fraunces',serif] text-xl font-semibold text-sage-dark">
            JobTracker
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 sm:flex">
            {allLinks.map((link) => {
              const active = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap rounded-2xl px-3 py-1.5 text-sm font-['Space_Grotesk',sans-serif] transition ${
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
              <div className="relative ml-2" ref={menuRef}>
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sage-dark transition hover:bg-sage-light sm:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="border-t border-sage-light px-4 pb-4 pt-2 sm:hidden">
            <div className="flex flex-col gap-1">
              {allLinks.map((link) => {
                const active = router.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-sage-dark text-page-bg font-semibold"
                        : "text-sage-mid hover:bg-sage-light hover:text-sage-dark"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {user && (
                <>
                  <hr className="my-1 border-sage-light" />
                  <div className="flex items-center gap-3 px-3 py-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-dark text-xs font-semibold text-page-bg">
                      {initial}
                    </span>
                    <span className="truncate text-xs text-muted">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="rounded-lg px-3 py-2.5 text-left text-sm text-pink-bold transition hover:bg-status-rejected-bg"
                  >
                    Log Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
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
