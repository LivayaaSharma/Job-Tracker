import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6">
        <Header title="Your Jobs" subtitle="Cards + filters coming in Phase 4." />
        <div className="mt-10 rounded-2xl bg-white p-8 text-muted shadow">
          No jobs yet. Add one to get started!
        </div>
      </div>
    </main>
  );
}

//NOTES:

//max-w-*  3xl vs 5xl
//Think of max-w-3xl as a blog/article column—ideal for reading and single forms.
//Think of max-w-5xl as a gallery board—roomy enough to place several items in a row.
