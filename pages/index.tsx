import Head from "next/head";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import JobForm from "@/components/JobForm";
import LogoRow from "@/components/LogoRow";

export default function Home() {
  return (
    <>
      <Head>
        <title>JobTracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" href="/favicon-512x512.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main className="min-h-screen bg-pink-100 font-sans">
        <Navbar />

        <Header
          title="Progress looks better when it’s visible."
          subtitle="Add structure to your ‘apply and hope for the best’ era."
        />

        <JobForm />

        <LogoRow />
      </main>
    </>
  );
}
