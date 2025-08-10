

import Head from "next/head";
import Image from "next/image";

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

      <main className="min-h-screen bg-pink-100 font-sans ">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
          <h1 className="text-xl font-bold text-pink-600">JobTracker</h1>
          <div className="space-x-4">
            <button className="text-sm text-gray-700 hover:underline">Login</button>
            <button className="text-sm text-white bg-pink-500 px-4 py-2 rounded hover:bg-pink-600">
              Signup
            </button>
          </div>
        </nav>

        {/* Header */}
        <section className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Progress looks better when it’s visible.
          </h2>
          <p className="text-gray-600">
            Add structure to your ‘apply and hope for the best’ era.
          </p>
        </section>

        {/* Form */}
        <section className="mt-12 flex justify-center">
          <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                placeholder="e.g. Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                placeholder="e.g. Frontend Intern"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select className="w-full mt-1 p-2 border border-gray-300 rounded">
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="date"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                placeholder="Optional notes"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
            >
              Save and Breathe
            </button>
          </form>
        </section>

        <div className="flex justify-evenly px-8 ">
        <Image 
          src="/favicon-512x512.png"
          alt="Job Tracker Logo"
          width={128}
          height={128}
        />

                <Image 
          src="/favicon-512x512.png"
          alt="Job Tracker Logo"
          width={128}
          height={128}
        />

                <Image 
          src="/favicon-512x512.png"
          alt="Job Tracker Logo"
          width={128}
          height={128}
        />

                <Image 
          src="/favicon-512x512.png"
          alt="Job Tracker Logo"
          width={128}
          height={128}
        />

                <Image 
          src="/favicon-512x512.png"
          alt="Job Tracker Logo"
          width={128}
          height={128}
        />
        </div>

      </main>
    </>
  );
}
