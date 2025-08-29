import { Html, Head, Main, NextScript } from "next/document";
// ^ Next.js gives you these building blocks to customize the <html> skeleton.
//   - <Html>: the root <html> tag
//   - <Head>: things that belong in the <head> (like <meta>, fonts, styles)
//   - <Main>: where your actual page content goes
//   - <NextScript>: Next.js’s scripts (for React hydration, routing, etc.)

export default function Document() {
  return (
    <Html lang="en">
      {/* <html lang="en">: sets the page language.
          Important for screen readers, SEO, and browsers. */}

      <Head />
      {/* Inserts whatever <Head> content Next.js (and you) added:
          - <title>, meta tags, fonts, etc.
          This is different from "next/head" you used earlier:
          - "next/head" = per-page head
          - this <Head> = global head applied to all pages. */}

      <body className="antialiased">
        {/* The <body> of your document.
            - className="antialiased": Tailwind utility that smooths font edges 
              (makes text look cleaner, especially at smaller sizes). */}

        <Main />
        {/* Where Next.js renders your page content (e.g., Home, Apply, Jobs, About). */}

        <NextScript />
        {/* Adds Next.js's JS:
            - React hydration (making the static HTML interactive)
            - route preloading
            - client-side navigation, etc.
            Without this, your app would show HTML but not be interactive. */}
      </body>
    </Html>
  );
}

//NOTES

//1. Diff bw document.tsx and app.tsx:
//_document.tsx = customizes the overall HTML document structure: the building’s blueprint (walls, doors, foundation). Same for everyone.
//_app.tsx = wraps every page in your app: the furniture/layout inside that changes per tenant/page.

//2. Difference between <Head> here vs <Head> in index.tsx
// <Head> in _document.tsx → the global head. Runs once, shared by all pages. You’d put things like fonts, global meta tags, analytics here.
//<Head> from next/head (used in index.tsx) → the per-page head. Lets you set the <title> and meta info specific to that page.
//👉 global vs page-specific. */}

//3. The underscore is a signal to Next.js:
//“This file is special → don’t make a route, use it to control app behavior.”
