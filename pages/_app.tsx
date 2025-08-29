import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

//this is like:
// 💡 easy analogy:
// Think of AppProps like an airport checklist for boarding a plane:

// Must have passport ✅

// Must have boarding pass ✅

// Passport must have your photo (not a pizza menu) ✅

// If anything is missing/wrong, you don’t get through security.
