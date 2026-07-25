import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import JobForm from "@/components/JobForm";
import { useJobs } from "@/hooks/useJobs";

export default function ApplyPage() {
  const { addJob } = useJobs();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Apply • JobTracker</title>
      </Head>
      <main className="min-h-screen bg-page-bg pt-14 font-['Space_Grotesk',sans-serif]">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6">
          <Header
            title="Start an application"
            subtitle="Save the role, analyze the JD, and set your follow-ups."
          />
          <JobForm
            onSave={(values) => {
              addJob(values);
              router.push("/jobs");
            }}
          />
        </div>
      </main>
    </>
  );
}