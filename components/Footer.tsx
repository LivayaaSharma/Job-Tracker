import Image from "next/image";

const GITHUB_URL = "https://github.com/LivayaaSharma";
const LINKEDIN_URL = "https://www.linkedin.com/in/livayaa-sharma-01803b284/";
const EMAIL = "livayaasharma777@gmail.com";

const mascots = Array.from({ length: 12 });

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-sage-light font-['Space_Grotesk',sans-serif]">
      <div className="mx-auto max-w-[1400px] px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between">
          <p className="font-['Fraunces',serif] text-sm font-semibold text-ink">JobTracker</p>
          <div className="flex items-center gap-3">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-md p-1 text-sage-dark/50 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage-dark">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 0 0-1.33-1.76c-1.09-.74.08-.73.08-.73a2.52 2.52 0 0 1 1.84 1.24 2.56 2.56 0 0 0 3.5 1 2.56 2.56 0 0 1 .76-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 0 1 1.24-3.22 4.3 4.3 0 0 1 .12-3.18s1-.32 3.3 1.23a11.38 11.38 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23a4.3 4.3 0 0 1 .12 3.18 4.64 4.64 0 0 1 1.24 3.22c0 4.61-2.8 5.63-5.48 5.92a2.86 2.86 0 0 1 .82 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3"/></svg>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-md p-1 text-sage-dark/50 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage-dark">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.45A1.75 1.75 0 0 0 24 22.27V1.73A1.75 1.75 0 0 0 22.22 0Z"/></svg>
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="rounded-md p-1 text-sage-dark/50 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage-dark">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-sage-dark/40">
          <p>Built by Livayaa Sharma</p>
          <p>&copy; 2026 JobTracker</p>
        </div>
      </div>

      <div className="relative h-8" aria-hidden="true">
        <div className="marquee-track absolute inset-0 flex items-center">
          <div className="marquee-scroll flex shrink-0 items-center">
            {mascots.map((_, i) => (
              <div key={`a-${i}`} className="flex w-[60px] shrink-0 items-center justify-center">
                <Image src="/apple-touch-icon.png" alt="" width={24} height={24} />
              </div>
            ))}
          </div>
          <div className="marquee-scroll flex shrink-0 items-center">
            {mascots.map((_, i) => (
              <div key={`b-${i}`} className="flex w-[60px] shrink-0 items-center justify-center">
                <Image src="/apple-touch-icon.png" alt="" width={24} height={24} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
