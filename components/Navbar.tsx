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
    <nav className="flex items-center justify-between bg-card-bg px-4 py-3 font-['Space_Grotesk',sans-serif] shadow-md backdrop-blur sm:px-6 sm:py-4">
      <Link href="/" className="shrink-0 font-['Fraunces',serif] text-xl font-semibold text-sage-dark">
        JobTracker
      </Link>
      <div className="flex items-center gap-0.5 sm:gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
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
      </div>
    </nav>
  );
}
