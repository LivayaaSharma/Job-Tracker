import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobForm from "@/components/JobForm";
import { useJobs } from "@/hooks/useJobs";
import { useAuth } from "@/lib/auth";

export default function ApplyPage() {
  const { user, loading } = useAuth();
  const { addJob } = useJobs();
  const router = useRouter();

  if (loading) return null;
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <>
      <Head>
        <title>Apply • JobTracker</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-page-bg pt-14 font-['Space_Grotesk',sans-serif]">
        <Navbar />
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 sm:px-5">
          <Header
            title="Add application"
            subtitle="Enter the details now. Update status and next steps as you go."
          />
          <JobForm
            onSave={(values) => {
              addJob(values);
              router.push("/jobs");
            }}
          />
        </div>
        <div className="mt-10">
          <Footer />
        </div>
      </main>
    </>
  );
}
