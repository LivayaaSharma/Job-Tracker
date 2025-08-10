# Job Tracker

A lightweight job application tracker built with **Next.js (Pages Router)**, **Tailwind CSS**, and **Supabase**.  
Plan: track applications, statuses (applied/withdrawn/rejected), and analyze job descriptions with OpenAI.

## Tech Stack
- Next.js (Pages Router) + React
- Tailwind CSS
- Supabase (Auth + DB)
- Deployed on Vercel (planned)

## Getting Started

1. Install dependencies:
   npm install

2. Create a local env file:
   cp .env.example .env
   (Fill in Supabase keys and any other secrets)

3. Run the dev server:
   npm run dev
   App will be on http://localhost:3000

## Scripts
- npm run dev – start Next.js in dev
- npm run build – production build
- npm run start – start production server
- npm run lint – lint code

## Project Structure
/pages          # Pages Router
/components     # Reusable UI
/styles         # Tailwind/global styles
/public         # Static assets (favicons, images)

## Environment Variables
See `.env.example`. Do **not** commit `.env`.

## Roadmap
- [ ] Job status filters (applied / withdrawn / rejected)
- [ ] Supabase schema + auth
- [ ] OpenAI-powered JD analysis
- [ ] Notifications
- [ ] Deploy to Vercel

## Contributing
PRs welcome. Keep commits focused; include screenshots for UI changes.

## License
MIT © 2025 Livayaa Sharma
