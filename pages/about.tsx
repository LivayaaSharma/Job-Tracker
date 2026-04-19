import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6">
        <Header title="About" subtitle="Pixel‑core, pastel, zero‑clutter." />
        <p className="mt-6 text-center text-muted">
          Short story + links come later. For now this route just exists.
        </p>
      </div>
    </main>
  );
}
