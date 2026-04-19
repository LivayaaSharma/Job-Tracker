import Head from "next/head";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import JobForm from "@/components/JobForm";

export default function ApplyPage() {
  return (
    <>
      <Head>
        <title>Apply • JobTracker</title>
      </Head>
      <main className="min-h-screen bg-page-bg font-sans">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6">
          <Header
            title="Start an application"
            subtitle="Save the role, analyze the JD, and set your follow-ups."
          />
          <JobForm />
        </div>
      </main>
    </>
  );
}