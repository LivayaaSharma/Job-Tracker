import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import JobForm from "@/components/JobForm";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[var(--pink-50)]">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6">
        <Header title="Add a Job" subtitle="CJSD first. Optional details later." />
        <JobForm />
      </div>
    </main>
  );
}
