# AGM Real Estate Group Commercial Proposal Micro-Site

**CONFIDENTIAL: proposal material. Private repository. Do not make public.**

A digital micro-site version of AGM's *Proposal for Management Services · Commercial Property*.
Each proposal slide is its own page in a single-file static site (`index.html`, no build step, no
dependencies). Fonts load from Google Fonts; everything else is inline. This repo is the commercial
counterpart to AGM's HOA proposal micro-site and shares its design system.

## What this is
Twelve sections, rebuilt as an institutional, navigable micro-site:

1. The Property · 2. Your Team · 3. The First 90 Days · 4. Day-to-Day Management · 5. Financial
Management & Reporting · 6. AGM Master Insurance Program · 7. Tools & Technology · 8. Investment
Strategy & Exit · 9. Track Record & About AGM · 10. Management Fees · 11. Ready to Proceed ·
12. Contact & Next Steps.

**Restructured 2026-11-04** in response to the principal's review. The original eight sections were a
capabilities brochure about AGM; the deck now opens on the building, names the people who would run
it, sets the scope against the lease, lays out the first ninety days, states what Ownership stops
doing, ties management to the exit, and ends with an executable agreement and a contact page. Case
studies, references, a named-manager bio, the environmental/compliance scope, questions for
Ownership, and the agreement section are new. See `CONTENT-TODO.md`.

Remaining slide copy is reproduced from the source commercial deck. The layout, palette (navy `#00202F`, brand
blue `#3A8DDE`, serif/sans pairing), and rail-and-content structure follow the AGM proposal design
system shared with AGM's other proposal micro-sites. Each page adds whitespace and interaction, a
per-page navy/blue summary rail, an interactive history timeline, hover-reactive cards and pills,
reveal-on-scroll, prev/next paging, a reading-progress bar, and a light/dark toggle.

## Local preview
Open `index.html` in a browser. That's it. Deep-link a section with the URL hash, e.g.
`index.html#investment`.

## Deploy to Cloudflare Pages (AGM standard pattern)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → select this repo.
2. Settings: Framework preset **None** · Build command **(empty)** · Build output directory **/**
3. Every push to `main` auto-deploys production; every branch/PR gets its own preview URL.

## Access gate: custom password screen (Pages Functions)
The site is protected by a **custom-designed cover / login screen** (a minimal, institutional
white split layout, explanatory copy on the left, password panel on the right, AGM logo top-right),
served by a Cloudflare Pages Function (`functions/_middleware.js`). This runs **server-side**: until
the correct password is submitted, the visitor only ever receives the cover page, the actual
proposal (`index.html`) is never sent to the browser. The password lives only as an encrypted
Cloudflare secret, never in the code or the client.

This replaces the standard Zero Trust login screen with AGM's own branded page.

### One-time setup (required before the site will unlock)
Cloudflare dashboard → **Workers & Pages → this project → Settings → Variables and Secrets**. Add
both of these for **Production _and_ Preview**, then redeploy:

| Name | Value | Mark as |
|------|-------|---------|
| `SITE_PASSWORD` | the shared password you give recipients | **Secret** |
| `GATE_SECRET` | any long random string (40+ chars), used to sign the session cookie | **Secret** |

- Until `SITE_PASSWORD` is set, the site fails closed (shows a "not configured yet" notice).
- **Change the password** anytime by editing `SITE_PASSWORD` (existing links keep working; open
  sessions stay valid because `GATE_SECRET` is unchanged).
- **Force everyone to re-enter** by rotating `GATE_SECRET` (or bumping `TOKEN_VERSION` in the
  middleware).
- Sessions last 7 days (`MAX_AGE`); `/__logout` clears the cookie.
- The cover screen's copy (title, description, "Inside this proposal" list, contact line) lives in the
  `coverHTML()` function at the bottom of `functions/_middleware.js`.

### Local preview
Copy `.dev.vars.example` → `.dev.vars` (git-ignored), fill in the two values, and run
`npx wrangler pages dev .`.

### Note on Zero Trust
This shared-password gate is intentionally simple and needs no per-user setup. If you ever need
**per-person access with an audit trail** (who opened it, when), use Cloudflare Zero Trust Access
instead, but that uses Cloudflare's own login flow, not this custom screen. Don't enable both at once.

## Analytics (PostHog)
The site is fully instrumented for PostHog across **both** the login/cover page and the proposal.
Turn it on by setting these as **environment variables** in the Cloudflare Pages project (Settings →
Variables and Secrets), for **Production _and_ Preview**, then redeploy:

| Name | Value |
|------|-------|
| `POSTHOG_KEY` | your **Project API Key** (PostHog → Settings → Project → *Project API Key*, starts with `phc_`) |
| `POSTHOG_HOST` | *(optional)* `https://us.i.posthog.com` (US, default) or `https://eu.i.posthog.com` (EU) |

Until `POSTHOG_KEY` is set, analytics stays off, no requests, no errors. The key lives only in
Cloudflare (nothing committed to the repo): the gate function injects it into the cover page and fills
in the proposal's inline placeholder as `index.html` is served. (You can still hard-code the key
directly in `index.html`'s marked `<head>` block instead, but that only covers the proposal, not the
gate page, and puts the key in the repo, the env var is preferred.)

What it tracks once the key is set:
- **Cover / login page**, a `$pageview` on load and a `gate_viewed` event (tagged `surface: gate`),
  plus autocapture of the Access click. Lets you see who reaches the gate and whether they bounce.
  The password field is masked in session replays.
- **Proposal, visits**, a virtual `$pageview` per section (URL carries the `#section` hash).
- **Proposal, tab navigation**, a `tab_click` event with `to`, `from`, and `method` (`nav_tab`,
  `pager`, `rail_ticker`, `keyboard`, `brand`).
- **Proposal, time on each tab**, a `section_time` event with `section`, `section_label`, and
  `seconds` when a section is left (open section flushed on tab-hide / exit via `capture_pageleave`).
- **Everything, both pages**, `autocapture` (every click/interaction), **session replays**, and
  click/scroll **heatmaps** are enabled.

All events are tagged with `proposal: commercial-microsite` (and `surface: gate` on the cover
page) so you can filter gate traffic from in-proposal activity.

## Operational notes
- `_headers` enforces `noindex` and security headers at the edge.
- **Unfinished content is flagged in the page itself.** Every value AGM still has to supply renders
  as an amber `[bracketed]` chip (`<span class="tbd">`), and each unfinished page carries a dashed
  amber "To complete" box (`.tbd-note`). `CONTENT-TODO.md` lists every one of them, grouped by who
  has to answer. Before this goes to Ownership, `grep -c 'class="tbd"' index.html` must return 0 and
  no `.tbd-note` blocks should remain.
- The two buttons in the Ready to Proceed signature band are inert until the e-signature envelope URL
  and the agreement PDF link replace their `href="#"` (and `aria-disabled="true"` is removed).
- The final management agreement form is to be reviewed by counsel before it is sent for signature.
  The Key Terms page is a summary and says so.
- Fee figures are live: $750/month while vacant, 3% of gross rents with a $1,500 monthly minimum once
  leased, $1,500 one-time onboarding. Update them per engagement.
- The `topbar-prop` label in `index.html` and the `prop-name` on the cover page read
  `[ Commercial Property Name ]` / `[ Property Name ]`, set these to the actual property per deal.
