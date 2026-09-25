# Order Tracking Screen

A redesigned mobile order tracking experience for an e-commerce app. Built with React + Vite + Tailwind CSS, no backend — all data is mocked in `src/data/mockOrders.js`.

**Live demo:** _add your deployed URL here_
**Repo:** _add your GitHub URL here_

## Why this design

The old screen only showed a status word (Processing / Shipped / Out for Delivery / Delivered) with no sense of progress, timing, or what to do next. This redesign is built around three things:

1. **Progress at a glance** — a vertical waybill-style timeline shows every stage, what's already happened (with timestamps), what's next, and clearly distinguishes "delayed" from "on schedule" by color and icon, not color alone.
2. **A status banner that always answers two questions** — "what's going on" and "what happens next" — right at the top, so the person never has to interpret the timeline themselves to know if something's wrong.
3. **A next step for every situation**, not just a status: delayed orders get a plain-language reason and reassurance; "delivered but not received" gets a targeted report flow instead of a generic support form; pending tracking gets an explanation instead of a blank timeline.

Visual language borrows from shipping labels and waybills (a tracking-number monospace treatment, a stepped vertical route) since that's literally what the screen represents, rather than a generic card-and-shadow kit.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally to sanity-check it
```

The static output lands in `dist/`. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.) — no environment variables or server are required.

## Reviewing all required states

There is **no login or real order lookup** — this is a static prototype. Use the scenario switcher pinned to the top of the page to jump between every required state without touching code:

| Switcher tab | What it demonstrates |
|---|---|
| On time | Baseline in-progress order, out for delivery |
| Delayed | Estimated window has passed; delay reason + reassurance, no false urgency |
| Delivered, not received | Marked delivered by the carrier but the customer reports it missing; targeted report flow with scenario-specific reasons |
| Tracking not available yet | Order confirmed, carrier hasn't scanned it yet; explained rather than left blank |
| Loading | Skeleton state shown while "fetching" tracking data |
| Error | Simulated network failure with a retry action |

"Contact support" and "Report an issue" are both wired up as functional UI flows (bottom sheets with real interaction and a submit confirmation) — they just don't call a live API, per the mock/static data requirement.

## Project structure

```
src/
  App.jsx                      # scenario switcher + loading/error simulation
  components/
    OrderTrackingScreen.jsx    # main screen: banner, ETA, timeline, summary, actions
    DeliveryTimeline.jsx       # vertical progress timeline (derives state from currentStageIndex)
    OrderSummaryCard.jsx       # collapsible order/product summary + address
    SupportActions.jsx         # "Contact support" / "Report an issue" buttons
    SupportSheets.jsx          # bottom-sheet flows for both actions above
    Sheet.jsx                  # reusable bottom-sheet modal primitive
    StateScreens.jsx           # loading skeleton + error screen
  data/
    mockOrders.js              # static mock data for all four order scenarios
  index.css
  main.jsx
```

## Tech

- React 18 + Vite
- Tailwind CSS (custom tokens in `tailwind.config.js`: palette, `Space Grotesk` / `IBM Plex Sans` / `IBM Plex Mono` type)
- [lucide-react](https://lucide.dev/) for icons
- No backend, no external state/data libraries

## Accessibility notes

- Interactive elements have visible focus rings (`focus-ring` utility) and `aria-*` attributes on the modal, expandable card, and loading state.
- Status is never conveyed by color alone — every state also has an icon and a text label.
- Respects `prefers-reduced-motion` (skeleton pulse and sheet transition are disabled).
- Layout is responsive from ~360px to ~430px wide, with `env(safe-area-inset-*)` handling for notched devices.
# New_File_02
