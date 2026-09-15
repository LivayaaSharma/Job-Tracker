# Job Tracker

A job application tracker for managing the job search: log applications, track status changes, and get reminded to follow up. Built with Next.js and Supabase.

**Live:** https://jobtracker-ls.vercel.app/

## What it does

- Track job applications through statuses: saved, applied, interview, offer, rejected — in a sortable table view
- Bulk select and delete applications at once
- Ingest job postings through a REST API secured with per-user API keys, for external tools/scripts/bots to auto-add jobs
- Email reminders for follow-ups via scheduled Vercel cron jobs (currently works for the app owner; public email delivery is pending domain verification with Resend)
- Installable as a PWA with offline support and a custom 404 page
- Auth and row-level security handled through Supabase

## Tech stack

- Next.js (Pages Router) + React, TypeScript
- Tailwind CSS
- Supabase (Auth, Postgres, RLS)
- Vercel (hosting, cron jobs)
- Resend (email)

## Project structure
/pages # Routes (Pages Router)
/pages/api # API routes — ingestion, key management, reminders
/components # Reusable UI
/hooks # Custom React hooks
/lib # API clients, helpers
/styles # Tailwind/global styles
/public # Static assets


## Getting started

1. Install dependencies
   npm install
   
3. Set up environment variables
   cp .env.example .env.local
   Fill in your Supabase keys and any other secrets listed in `.env.example`.
   
3. Run the dev server
   npm run dev

   App runs at http://localhost:3000

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js in dev mode |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Lint code |

## Environment variables

See `.env.example` for the required keys. Never commit `.env.local`.

## Roadmap

- AI-powered job description auto-fill using the Anthropic API
- Full email reminder support for all users (domain verification with Resend)

## Contributing

PRs welcome. Keep commits focused and include screenshots for UI changes.

## License

MIT © 2025-2026 Livayaa Sharma


