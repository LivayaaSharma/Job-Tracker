# Job Tracker

Track job applications in one place. Add them yourself or connect your tools so new applications show up automatically. Built with Next.js and Supabase.

**Live:** https://jobtracker-ls.vercel.app/


<img width="1780" height="643" alt="Screenshot 2026-09-15 155717" src="https://github.com/user-attachments/assets/66e22732-35fa-483b-8ea5-fee18deac55d" />


## Why this exists

Most job trackers make you log every application by hand. JobTracker lets you connect your own tools so applications can show up automatically, secured with per-user API keys.

<img width="1757" height="480" alt="Screenshot 2026-09-15 155733" src="https://github.com/user-attachments/assets/4bb8549c-5920-4783-acc0-69274981276f" />


## What it does

- Connect your tools to add jobs automatically via API, secured with per-user keys
- Track applications through statuses: saved, applied, interview, offer, rejected
- Sortable table view with overdue action highlighting
- Bulk select and delete
- Daily email reminders for overdue follow-ups via Vercel cron (currently single-recipient; multi-user delivery pending Resend domain verification)
- Installable as a PWA
- Auth and row-level security through Supabase

## Tech stack

- Next.js (Pages Router) + React, TypeScript
- Tailwind CSS
- Supabase (Auth, Postgres, RLS)
- Vercel (hosting, cron jobs)
- Resend (email)

## Project structure

- `/pages`: routes (Pages Router)
- `/pages/api`: API routes: ingestion, key management, reminders
- `/components`: reusable UI
- `/hooks`: custom React hooks
- `/lib`: API clients, helpers
- `/styles`: Tailwind and global styles
- `/public`: static assets

## Getting started

1. Install dependencies
   ```
   npm install
   ```
2. Set up environment variables
   ```
   cp .env.example .env.local
   ```
   Fill in your Supabase keys and other secrets listed in `.env.example`.

3. Run the dev server
   ```
   npm run dev
   ```
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

## Contributing

This is a personal project, but feedback is welcome.

## License

MIT © 2025-2026 Livayaa Sharma
