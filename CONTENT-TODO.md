# 838 Seneca: content still to be supplied

Everything below renders in the proposal today as an amber `[bracketed]` placeholder
(`<span class="tbd">…</span>` in `index.html`). The structure, layout and surrounding copy are
finished; only these values are missing. Search `index.html` for `class="tbd"` to find them all
(63 at the time of writing). Delete the whole `<span>`, not just the brackets, when the real value
goes in.

Page-level "To complete" notes also appear in the proposal itself as dashed amber boxes
(`.tbd-note`). Delete each one once that page is finished.

---

## 1 · People (Team page, Contact page, Exhibit D)

Names are in. What is still missing is contact detail.

| Person | Role | Still needed |
|---|---|---|
| **Cindy Miller** | Property Manager | Headshot, direct phone, mobile, email, years in commercial management, years with AGM, industrial SF under management, comparable properties managed, WA license number and expiry, designations (CPM/RPA/IREM/BOMA), two background sentences |
| **Herman Chan** | Accounting | Direct phone, email |
| **Alix Vanwagoner** | Property management support | Direct phone, email |
| **Makenzie Burks** | Administration | Direct phone, email |
| **Office** | | Street address and suite confirmed. Public directories give 12330 Northup Way, Bellevue, WA 98005, which is in the page marked `[confirm: …]` |
| **24/7 emergency** | | The after-hours number as it should be published |

Drop Cindy's headshot in `assets/` and replace the `.bio-photo` placeholder `<span class="ph-k">`
with an `<img>`.

There is no named escalation contact in the proposal, per the 2026-11-04 review.

## 2 · The property (Property page)

**Done.** Building, site, year built, present use, zoning, parcel number, legal description and the
2026 assessed value are taken from the King County Assessor record for parcel 214600-0040 and are
cited on the page.

**Still open:** clear height, dock door and grade door counts. The assessor record does not carry
them, and the page says they are confirmed on the first site inspection.

**Lease:** current status, tenant name, lease structure (NNN or modified gross), commencement,
expiration, renewal options (number, length, notice window, rent mechanism), **purchase option
(exercise window, price or formula, notice requirement)**, and every date that needs diarizing.

**Scope table:** four rows read `[per lease]`: HVAC, fire sprinkler, landscaping and environmental
compliance. These come from the executed lease and become Exhibit A.

**Environmental:** the single biggest open item. AGM needs the prior Phase I and Phase II reports,
any consent or agreed order, the current consultant of record, the sampling and reporting schedule,
and last year's cost. If there is no continuing obligation, cut that section down to one line.

## 3 · Case studies (Track Record page)

**Pacific Business Park is populated** from AGM's own published acquisition record of 14 June 2023
and the portfolio data behind agmrealestategroup.com: 136 Stewart Road SE, 42,000 SF on 2.78 acres,
$8.2M in May 2023 through a 1031 exchange, 22 tenants, 100% occupancy at acquisition, AGM brokered
the sale, syndicated the fund and manages the property. Still needed is the operating result since
2023: occupancy held, expense change, and net operating income against the acquisition proforma.

**Mount Si Building is a frame only.** The AGM portfolio carries it as two phases, Phase I on a core
strategy and Phase II on a value-add strategy, and nothing further. It needs what AGM found at
takeover, what AGM did, what it was worth, and three figures. North Park and the Center Building are
the alternatives if either has stronger numbers.

Comparable assets and the references section are settled: references were removed on 2026-11-04,
and the five comparable tiles now carry name, place and asset type only.

## 4 · Commercial terms (Ready to Proceed page)

- Exact legal name and state of formation for Thomas Family Properties, LLC
- Proposed commencement date (also used on the Contact page)
- Termination notice: 30 or 60 days
- Unbudgeted spending authority per item (`$X`)
- Whether leasing and sales are carved out to Ownership's listing broker or coordinated with AGM
- Records-return window on termination: 15 or 30 days

AGM's contracting entity is **AGM Real Estate Group, LLC**. No firm license number is published in
the proposal.

## 5 · The agreement itself (Ready to Proceed page)

Six attachments are listed and none are attached:

| | Document |
|---|---|
| Agreement | Commercial Property Management Agreement for 838 Seneca Ave SW |
| Exhibit A | Scope of services, matched to the executed lease |
| Exhibit B | Fee schedule |
| Exhibit C | Manager's insurance certificates |
| Exhibit D | Team biographies with licenses |
| Exhibit E | Approval thresholds and owner call tree |

The two buttons in the navy signature band are inert (`aria-disabled="true"`, a click handler
cancels them). To activate: replace `href="#"` with the e-signature envelope URL (DocuSign, Dropbox
Sign, or Adobe Acrobat Sign) and a direct link to the agreement PDF, and remove `aria-disabled`.

**The final agreement form must be reviewed by counsel before it is sent for signature.** The Key
Terms page is a summary and not the agreement itself. The page says so.

## 6 · Next steps (Contact page)

- Proposed date and time for the site walk
- Turnaround commitment for the lease review (`[X]` business days)
- Proposed management start date

## 7 · Reporting page

Confirm whether Thomas Family Properties, LLC holds 838 Seneca in a structure that issues K-1s, and
who at Ownership's accounting firm should get portal access.

---

## House style

No em dashes anywhere, in any file. No question marks in headings, labels or FAQ-style items. No
serial comma, except where a list element contains its own "and" or the comma joins two independent
clauses. This follows the approved site copy in `marketing-agm/agm-inc-website`
(`docs/content/copy-2026-11-02.md`).

## Release check

Before this goes to Ownership, `grep -c 'class="tbd"' index.html` should return **0**, no
`.tbd-note` blocks should remain, and `LC_ALL=C grep -c $'\xe2\x80\x94' index.html` (the em dash check) should return **0**.
