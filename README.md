# AGM Real Estate Group Commercial Proposal Micro-Site

**CONFIDENTIAL: proposal material. Private repository. Do not make public.**

A digital micro-site version of AGM's *Proposal for Management Services · Commercial Property*.
Each proposal slide is its own page in a single-file static site (`index.html`, no build step, no
dependencies). Fonts load from Google Fonts; everything else is inline. This repo is the commercial
counterpart to AGM's HOA proposal micro-site and shares its design system.

## What this is
Twelve sections, rebuilt as an institutional, navigable micro-site:

A single Cover page (letter, property plate and contents), then nine sections:

1. The Property · 2. Your Team · 3. The First 90 Days · 4. Day-to-Day Management · 5. Reporting &
the Owner Portal · 6. Investment Strategy · 7. Track Record · 8. Management Fees · 9. Agreement &
Contact.

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
`index.html#strategy`.

## Deploy to Cloudflare Pages (AGM standard pattern)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → select this repo.
2. Settings: Framework preset **None** · Build command **(empty)** · Build output directory **/**
3. Every push to `main` auto-deploys production; every branch/PR gets its own preview URL.

## Access
The proposal has no password screen. It is a static page, served as is, so anyone with the link can
read it. `_headers` still sets `noindex` so search engines skip it. The gate was removed on
2026-11-12 along with `functions/_middleware.js` and `.dev.vars.example`. The `SITE_PASSWORD` and
`GATE_SECRET` variables in the Cloudflare Pages project are now unused and can be deleted.

## Analytics (PostHog)
Analytics is off. The gate function used to switch it on by writing the PostHog key from a
Cloudflare variable into `index.html` as it was served, and with the gate gone nothing does that.

To turn it on, paste the **Project API Key** (PostHog, Settings, Project, starts with `phc_`) into the
marked block in the `<head>` of `index.html`, replacing `phc_REPLACE_WITH_YOUR_PROJECT_API_KEY`, and
set the host to the US or EU address. The key is a public, client-side key, so it is safe to commit.

Once on, it tracks:
- **Visits**, a virtual `$pageview` per section (the URL carries the `#section` hash).
- **Tab navigation**, a `tab_click` event with `to`, `from` and `method` (`nav_tab`, `pager`,
  `rail_ticker`, `keyboard`, `brand`).
- **Time on each tab**, a `section_time` event with `section`, `section_label` and `seconds`.
- **Everything**, `autocapture`, session replays and click and scroll heatmaps.

All events are tagged with `proposal: commercial-microsite`.

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
- **Old links keep working.** `#letter` and `#contents` resolve to the Cover, `#technology` to
  Reporting, `#insurance` to Fees and `#contact` to Agreement, via the `ALIAS` map in the routing script.
- **Printing.** A print stylesheet renders every section in order with the nav, rail, pager and the
  amber placeholder highlights suppressed, so the owner can save or forward a clean PDF.
- Fee figures are live: $750/month while vacant, 3% of gross rents with a $1,500 monthly minimum once
  leased, $1,500 one-time onboarding. Update them per engagement.
- The `topbar-prop` label in `index.html` and the `prop-name` on the cover page read
  `[ Commercial Property Name ]` / `[ Property Name ]`, set these to the actual property per deal.
