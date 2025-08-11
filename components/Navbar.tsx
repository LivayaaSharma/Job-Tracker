import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold text-pink-600">JobTracker</h1>

      <div className="space-x-4">
        {/* Use Link if these become real pages later */}
        <Link href="/login" className="text-sm text-gray-700 hover:underline">
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-600"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
