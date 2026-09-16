# Job Tracker

Track job applications and automatically pull in jobs from any auto-apply tool, AI agent, or script you already use. Built with Next.js and Supabase.

**Live:** https://jobtracker-ls.vercel.app/


<img width="1780" height="643" alt="Screenshot 2026-09-15 155717" src="https://github.com/user-attachments/assets/66e22732-35fa-483b-8ea5-fee18deac55d" />


## Why this exists

Most job trackers make you log applications by hand. If you're mass-applying with tools like Simplify, Sonara, or your own scripts, that defeats the purpose. Job Tracker has a REST API that lets any external tool push applications directly into your table, secured with per-user API keys.

<img width="1757" height="480" alt="Screenshot 2026-09-15 155733" src="https://github.com/user-attachments/assets/4bb8549c-5920-4783-acc0-69274981276f" />


## What it does

- External tools push jobs into your table through a REST API with per-user API keys
- Track applications through statuses: saved, applied, interview, offer, rejected
- Sortable table view with overdue action highlighting
- Bulk select and delete
- Daily email reminders for overdue follow-ups via Vercel cron (currently single-recipient; multi-user delivery pending Resend domain verification)
- Installable as a PWA with offline fallback
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

## Roadmap

- Job description auto-fill via Anthropic API
- Full email reminder support for all users (domain verification with Resend)

## Contributing

This is a personal project, but feedback is welcome.

## License

MIT © 2025-2026 Livayaa Sharma
