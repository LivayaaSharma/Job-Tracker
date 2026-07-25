# JobTracker — Project Context for Claude Code

## What this is
A personal job application tracker web app. Kanban-style board where you can add, organize, and track job applications through stages (Saved → Applied → Interview → Offer → Rejected). Built as a learning project — the goal is to develop real engineering skills, not just ship fast.

## Who's building this
A 2nd-year CS student who wants to learn properly. Previously paused this project after recognizing over-reliance on AI-generated code ("vibe coding"). Resuming it with intentional learning practices.

## Tech stack
- **Framework:** Next.js 15 (Pages Router)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS + CSS custom properties
- **Animation:** Framer Motion
- **Fonts:** Fraunces (headings) + Space Grotesk (body) — load from Google Fonts
- **No backend yet** — start with localStorage, plan for a real database later

## Current state
- Landing page exists with hero section (has broken imports: RotatingText, PixelCarousel)
- Job form exists at /apply but submits to console.log (no persistence)
- /jobs and /about are placeholder pages
- JobCard.tsx is empty
- No shared layout component — each page manually includes Navbar
- No data layer at all

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
- **Headings:** Fraunces (serif, Google Fonts) — gives personality and warmth
- **Body/UI:** Space Grotesk (sans, Google Fonts) — clean and modern
- Use Fraunces for page titles, card company names, logo text
- Use Space Grotesk for everything else (nav links, form labels, body text, badges)

### Shape language
- Cards: 12px border-radius
- Buttons/inputs: 8px border-radius
- Badges/pills: 99px border-radius (full round)
- Borders: 0.5px solid with low opacity

### Layout
- **Nav:** Top bar, white background, logo left, links right. Active link has sage dark color + 2px bottom border
- **Main view:** Table — one row per job. Summary bar above with counts (Tracked, Applied, Interviews, Overdue)
- **Table columns:** Company/Role | Status (colored pill) | Date Applied | Next Action | Next Action Date | Job Link | Delete
- **Density:** Tight — minimize padding, fit more jobs on screen. People mass-apply and need to see everything at a glance
- **Overdue rows:** Subtle pink highlight, date replaced with "N days overdue" text in pink-bold

### Job data fields
Each job tracks: Company, Job Title, Status, Date Applied, Next Action, Next Action Date, Job Link, Notes

### Empty states
Use the pixel mascot character with a speech bubble. Friendly and encouraging tone ("No applications yet — let's change that!"). The mascot adds personality and makes empty columns feel intentional, not broken.

### Personality
- Pixel mascot character (already exists as an asset) appears in empty states, possibly nav
- Warm and playful overall — this should feel like a cozy personal tool, not a corporate SaaS product
- No blue anywhere in the palette

## How to work with me

### Learning rules (IMPORTANT)
- **Explain changes before making them.** Don't just edit files — tell me what you're about to do and why.
- **Don't write code I haven't asked for.** No surprise refactors, no "while I'm at it" changes.
- **When I ask how to do something, guide me through it — don't just do it.** Ask me what I think the approach should be first.
- **Prefer teaching over doing.** If I need to learn a concept (like how useState works, or how to map over an array), explain it with a small example before applying it to the codebase.
- **Review my code when I write it.** Point out bugs, bad patterns, and better approaches — but don't rewrite it for me.
- **Say "I'm not sure" instead of guessing** if you genuinely don't know something.
- **Don't add new dependencies without asking.** Explain why we'd need them and what alternatives exist.

### Session start routine
At the start of each session:
1. Read this file
2. Ask what mode I want to work in today:
   - **Explain mode** — help me understand existing code
   - **Rubber duck mode** — help me think through a problem without writing code
   - **Code review mode** — review code I've written
   - **Debug mode** — help me find and fix a bug
   - **Build mode** — actually write code together (use sparingly)
3. Ask what I want to work on this session
4. Don't start making changes until we've agreed on the plan

### Code style
- Use Tailwind utility classes, mapped to the design tokens above via CSS custom properties
- Keep components small and focused
- Use meaningful variable and function names
- Add comments only when the "why" isn't obvious from the code
- Prefer named exports
