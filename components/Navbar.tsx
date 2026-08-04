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

  return (
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
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="whitespace-nowrap rounded-2xl px-2 py-1 text-[11px] text-sage-mid transition hover:text-pink-bold sm:px-3 sm:py-1.5 sm:text-sm"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}
