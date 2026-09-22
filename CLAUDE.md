# JobTracker

## Overview
A job application tracker with a table-based UI and an API for external tools to push jobs in automatically.

## Tech stack
- **Framework:** Next.js 15 (Pages Router)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS + CSS custom properties
- **Animation:** Framer Motion
- **Database/Auth:** Supabase (Postgres + Auth + RLS)
- **Email:** Resend
- **Hosting:** Vercel (with cron jobs)
- **Fonts:** Fraunces (headings) + Space Grotesk (body) via Google Fonts

## Current state
- Full CRUD for job applications (add, edit, delete, bulk delete)
- Auth (signup, login, logout, password reset)
- Row-level security on all tables
- Ingestion API with per-user API key management
- Daily email reminders for overdue actions (Vercel cron)
- PWA with offline fallback
- Security audit completed and fixes applied

## Design system

### Palette
| Token         | Hex       | Usage                                      |
|---------------|-----------|---------------------------------------------|
| Page bg       | #FFF5F6   | Main background (soft blush)                |
| Card bg       | #FFFFFF   | Cards, inputs, modals                       |
| Sage light    | #DAE5D0   | Column headers, subtle fills, badge bg      |
| Sage mid      | #8FA878   | Muted text, secondary info, subtitles       |
| Sage dark     | #4A5E3A   | Buttons, nav active state, strong accents   |
| Pink light    | #F4C0D1   | Hover states, decorative fills              |
| Pink bold     | #D4537E   | Highlights, deadlines, attention moments    |
| Peach         | #F0997B   | Warm accent, interview status               |
| Text primary  | #2C3525   | Headings, body text (dark green-brown)      |
| Text muted    | #B4B2A9   | Timestamps, tertiary info                   |

### Status badges
| Status    | Background | Text color |
|-----------|-----------|------------|
| Saved     | #EEEDFE   | #534AB7    |
| Applied   | #DAE5D0   | #3B6D11    |
| Interview | #FFE8DE   | #993C1D    |
| Offer     | #FBEAF0   | #72243E    |
| Rejected  | #FCEBEB   | #A32D2D    |

### Typography
- **Headings:** Fraunces (serif, Google Fonts)
- **Body/UI:** Space Grotesk (sans, Google Fonts)
- Use Fraunces for page titles, card company names, logo text
- Use Space Grotesk for everything else (nav links, form labels, body text, badges)

### Shape language
- Cards: 12px border-radius
- Buttons/inputs: 8px border-radius
- Badges/pills: 99px border-radius (full round)
- Borders: 0.5px solid with low opacity

### Layout
- **Nav:** Top bar, white background, logo left, links right. Active link has sage dark color + 2px bottom border
- **Main view:** Table with one row per job. Summary bar above with counts (Tracked, Applied, Interviews, Overdue)
- **Table columns:** Company/Role | Status (colored pill) | Date Applied | Next Action | Next Action Date | Job Link | Delete
- **Density:** Tight padding, fit more jobs on screen
- **Overdue rows:** Subtle pink highlight, date replaced with "N days overdue" text in pink-bold

### Job data fields
Each job tracks: Company, Job Title, Status, Date Applied, Next Action, Next Action Date, Job Link, Notes

### Visual style
- Pixel mascot character in empty states and offline page
- No blue anywhere in the palette

## Development guidelines

### Code style
- Use Tailwind utility classes, mapped to design tokens via CSS custom properties
- Keep components small and focused
- Use meaningful variable and function names
- Add comments only when the "why" isn't obvious from the code
- Prefer named exports
- Don't add new dependencies without discussion

### Workflow
- Explain changes before making them
- No surprise refactors or unrequested features
- Review code for bugs, bad patterns, and improvements
