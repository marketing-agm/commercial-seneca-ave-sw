# 838 Seneca: content still to be supplied

Everything below renders in the proposal today as an amber `[bracketed]` placeholder
(`<span class="tbd">…</span>` in `index.html`). The structure, layout and surrounding copy are
finished; only these values are missing. Search `index.html` for `class="tbd"` to find them all
(4 at the time of writing, all on the Team page). Delete the whole `<span>`, not just the brackets, when the real value
goes in.

Page-level "To complete" notes also appear in the proposal itself as dashed amber boxes
(`.tbd-note`). Delete each one once that page is finished.

---

## 1 · People (Team page, Contact page, Exhibit D)

Contact details arrived on 2026-11-06 from the business cards and are in the deck:

| Person | Role | Contact |
|---|---|---|
| **Cindy Miller** | Senior Property Manager | 206.694.1726, m. 206.843.5290, ext. 140, cmiller@agmrealestategroup.com |
| **Herman Chan** | Director of Accounting and Finance | 206.694.1713, ext. 113, hchan@agmrealestategroup.com |
| **Makenzie Burks** | Paralegal | ext. 109, burks@agmrealestategroup.com |
| **Alix Vanwagoner** | Management support | 206.694.1783, avanwagoner@agmrealestategroup.com |

Two titles were corrected against the cards: Cindy is Senior Property Manager and Makenzie is
Paralegal, not Administration. Makenzie was added to the contact page.

Still needed for Cindy: headshot, years in commercial management, comparable properties, WA license
number and expiry, and the background paragraph. The "why she fits this building" paragraph was cut
on 2026-11-06. Drop the headshot in `assets/` and replace the
`.bio-photo` placeholder span with an `<img>` tag.

The 24/7 emergency number is 206.622.8600, the main line with after-hours routing, and the office is
12330 Northup Way, Bellevue, WA 98005. Both are published. The contact page carries no placeholders.

There is no named escalation contact in the proposal, per the 2026-11-04 review.

## 2 · The property (Property page)

**Done.** Building, site, year built, present use, zoning, parcel number, legal description and the
2026 assessed value are taken from the King County Assessor record for parcel 214600-0040 and are
cited on the page.

**Lease.** The block was collapsed on 2026-11-06. The building is vacant with terms under
negotiation, so the eight-row abstract was unanswerable. It now states the status, asks only for the
purchase option if one is on the table, and says AGM abstracts the executed lease at commencement.

**Scope table.** Now states the split AGM recommends for a single-tenant industrial NNN lease rather
than asking Ownership for it, with a note that AGM advises on each line during the lease review.

**Environmental:** asked on the page as an open item for Ownership, not a blocker to sending. AGM
needs the prior Phase I and Phase II reports, any consent or agreed order, the current consultant of
record, the sampling and reporting schedule, and last year's cost. If there is no continuing
obligation, cut that section down to one line.

## 3 · Case studies (Track Record page)

**Nothing outstanding.** Pacific Business Park is drawn from AGM's own published acquisition record
of 14 June 2023 and the portfolio data behind agmrealestategroup.com: 136 Stewart Road SE, 42,000 SF
on 2.78 acres, $8.2M in May 2023 through a 1031 exchange, 22 tenants, 100% occupancy at acquisition,
AGM brokered the sale, syndicated the fund and manages the property.

The study runs two steps, what AGM found and what AGM did, over three sourced figures. The third
step, "what it was worth", was cut on 2026-11-06 because the operating result since 2023 was not
available and the figures carry the result on their own.

**Mount Si was cut on 2026-11-04.** A second study can be added when North Park or the Center
Building has before-and-after figures worth publishing.

Comparable assets and references are settled: references were removed on 2026-11-04, and the five
comparable tiles carry name, place and asset type only.

## 4 · Commercial terms (Ready to Proceed page)

Nothing outstanding. On 2026-11-06 the owner entity confirmation, the commencement date row and the
leasing and sales row were removed from the key terms, and spending authority now reads as a
per-item limit "to be set with Ownership" rather than a blank. Leasing and sales commissions are
still covered by the fee footnote on slide 08.

AGM's contracting entity is **AGM Real Estate Group, LLC**. No firm license number is published.

AGM has taken a position rather than asking: 30 days' termination notice either way, 30 days to
return records, and five business days to turn the lease review. Change them if the firm wants
different numbers.

## 5 · The agreement (Ready to Proceed page)

The exhibit list was removed on 2026-11-06. The page is the key terms, a counsel note and the
signature band. The key terms still cite Exhibit A, B and C, which are exhibits of the agreement
itself rather than a list on the slide.

The two buttons in the navy band are inert (`aria-disabled="true"`, a click handler cancels them).
To activate: replace `href="#"` with the e-signature envelope URL and a direct link to the agreement
PDF, then remove `aria-disabled`.

**The final agreement form must be reviewed by counsel before it is sent for signature.** The Key
Terms page is a summary and not the agreement itself. The page says so.

## 6 · Next steps (Contact page)

- Proposed date and time for the site walk
- Turnaround commitment for the lease review (`[X]` business days)
- Proposed management start date

## House style

No em dashes anywhere, in any file. No question marks in headings, labels or FAQ-style items. No
serial comma, except where a list element contains its own "and" or the comma joins two independent
clauses. This follows the approved site copy in `marketing-agm/agm-inc-website`
(`docs/content/copy-2026-11-02.md`).

## Release check

Before this goes to Ownership, `grep -c 'class="tbd"' index.html` should return **0**, no
`.tbd-note` blocks should remain, and `LC_ALL=C grep -c $'\xe2\x80\x94' index.html` (the em dash check) should return **0**.
