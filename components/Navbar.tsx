import Link from "next/link";
import { useRouter } from "next/router"; //In Next.js, useRouter() tells you about the current URL and lets you navigate.
//Analogy: a hook is like calling “front desk” to ask “what room am I in?” (pathname) or “please move me to room 402” (push).

const links = [
  { href: "/", label: "Home" },
  { href: "/apply", label: "Add a Job" },
  { href: "/jobs", label: "View Jobs" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { pathname } = useRouter(); //const router = useRouter(); const pathname = router.pathname;

  return (
    <nav className="flex items-center justify-between bg-card-bg px-6 py-4 shadow-md backdrop-blur">
      <Link href="/" className="text-xl font-bold text-sage-dark">
        JobTracker
      </Link>
      <div className="space-x-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-2xl px-3 py-1.5 text-sm transition ${
                active
                  ? "bg-sage-dark text-white font-semibold"
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

// NOTES:

// Backticks allow multiline and embedding expressions.
// ${ ... } means “evaluate this JavaScript right here and put the result into the string.”

//Anytime you see {something} inside JSX, it means:
//"Evaluate this JavaScript code and insert the result right here."

//useRouter is a hook that gives info about the current route (and some methods to navigate).
// pathname is specifically the current URL path (like "/jobs").
// we use it in Navbar to highlight which link is “active.”
