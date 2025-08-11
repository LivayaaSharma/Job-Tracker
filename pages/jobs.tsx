import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[var(--pink-50)]">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6">
        <Header title="Your Jobs" subtitle="Cards + filters coming in Phase 4." />
        <div className="mt-12 rounded-2xl bg-white p-8 text-[var(--muted)] shadow">
          Placeholder — job cards grid will live here.
        </div>
      </div>
    </main>
  );
}
