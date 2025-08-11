import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Add a Job" },
  { href: "/jobs", label: "View Jobs" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { pathname } = useRouter();
  return (
    <nav className="flex items-center justify-between bg-white/80 px-6 py-4 shadow-md backdrop-blur">
      <Link href="/" className="text-xl font-bold text-[var(--pink-500)]">
        JobTracker
      </Link>
      <div className="space-x-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-2xl px-3 py-1.5 text-sm transition ${
                active
                  ? "bg-white/80 text-[var(--pink-400)] hover:text-[var(--pink-600)]"
                  : "text-[var(--pink-400)] hover:bg-white/80 hover:text-[var(--pink-600)]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
