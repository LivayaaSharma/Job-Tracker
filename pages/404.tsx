import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col bg-page-bg pt-14 font-['Space_Grotesk',sans-serif]">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <Image
          src="/favicon-512x512.png"
          alt=""
          width={80}
          height={80}
          className="mb-6 drop-shadow-md"
        />
        <h1 className="font-['Fraunces',serif] text-5xl font-bold text-ink">404</h1>
        <p className="mt-3 text-lg text-sage-mid">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/jobs"
          className="mt-8 rounded-lg bg-sage-dark px-6 py-2.5 text-sm font-semibold text-page-bg transition hover:bg-sage-mid"
        >
          Back to your jobs
        </Link>
      </div>
      <Footer />
    </main>
  );
}
