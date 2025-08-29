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
      <main className="min-h-screen bg-[var(--pink-50)] font-sans">
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

// import Navbar from "@/components/Navbar";
// import Header from "@/components/Header";
// import JobForm from "@/components/JobForm";

// export default function ApplyPage() {
// // ^ Because this file is /pages/apply.tsx,
// //   Next.js automatically makes it available at the route "/apply".

//   return (
//     <main className="min-h-screen bg-[var(--pink-50)]">
//       <Navbar />
//       <div className="mx-auto max-w-3xl px-6">
//         <Header title="Add a Job" subtitle="CJSD first. Optional details later." />
//         <JobForm />
//       </div>
//     </main>
//   );
// }

// //NOTES:

// //<main> tag helps w better seo, ie software engine optimization, so that this site shows up on or near the top on search engines
