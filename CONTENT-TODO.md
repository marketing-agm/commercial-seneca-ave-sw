# 838 Seneca: content still to be supplied

Everything below renders in the proposal today as an amber `[bracketed]` placeholder
(`<span class="tbd">…</span>` in `index.html`). The structure, layout, and surrounding copy are
finished; only these values are missing. Search `index.html` for `class="tbd"` to find them all
(121 at the time of writing). Delete the whole `<span>`, not just the brackets, when the real value
goes in.

Page-level "To complete" notes also appear in the proposal itself as dashed amber boxes
(`.tbd-note`). Delete each one once that page is finished.

---

## 1 · People (Team page, Contact page, Exhibit D)

| Person | Needed |
|---|---|
| **Cindy**, Property Manager | Last name, headshot, direct phone, mobile, email, years in commercial management, years with AGM, industrial SF under management, two or three comparable properties managed, WA license number and expiry, designations (CPM/RPA/IREM/BOMA), and two or three background sentences |
| **Herman**, Accounting | Last name, direct phone, email |
| **Alix**, Management support | Last name, direct phone, email |
| **Makenzie**, Administration | Last name, direct phone, email |
| **Supervisor / escalation** | Name, title, direct phone, email. This is also the signatory on the management agreement |
| **24/7 emergency** | The after-hours number as it should be published |
| **Office** | Street address, suite, city/state/ZIP, and AGM's Washington firm license number |

Drop Cindy's headshot in `assets/` and replace the `.bio-photo` placeholder `<span class="ph-k">`
with an `<img>`.

## 2 · The property (Property page)

**Building:** year built, clear height, dock and grade door count, zoning designation, King County
parcel number.

**Lease:** current status, tenant name, lease structure (NNN / modified gross), commencement,
expiration, renewal options (number, length, notice window, rent mechanism), **purchase option
(exercise window, price or formula, notice requirement)**, and every date that needs diarizing.

**Scope table:** four rows read `[per lease]`: HVAC, fire sprinkler, landscaping and environmental
compliance. These come from the executed lease and become Exhibit A.

**Environmental:** the single biggest open item. AGM needs the prior Phase I/II reports, any consent
or agreed order, the current consultant of record, the sampling and reporting schedule, and last
year's cost. If there is no continuing obligation, cut that section down to one line.

## 3 · Case studies and references (Track Record page)

Two case studies are structured and empty. Candidates discussed internally: **Pacific Business Park,
the Mt Si building, North Park, the Center Building.** Pick the two with the strongest before-and-after
numbers and the closest resemblance to a single-tenant industrial asset. Each needs:

- Property type, rentable SF, number of buildings, tenancy at takeover, year AGM assumed management
- What AGM found at takeover
- What AGM did in the first year
- What it was worth to the owner, in dollars or percent, over a stated period
- Three figures: operating expense per SF before → after, occupancy before → after, NOI change

**Comparable assets:** six tiles need property type, rentable SF, and tenancy. Reorder so industrial
and single-tenant net lease assets lead. Two tiles currently use images that do not match the
caption (Marysville, Queen Anne). Swap in the right photography or drop the tile.

**References:** three current commercial owner clients, with permission confirmed. Name, title,
entity, property type and size, years as a client, and a quote. If quotes are not available, publish direct numbers
instead; a reference who will take a call is more use than a quote.

## 4 · Commercial terms (Ready to Proceed page)

- Exact legal name and state of formation for Thomas Family Properties, LLC
- Legal description and parcel number for the property
- AGM's exact contracting entity and Washington firm license number
- Proposed commencement date (also used on the Contact page)
- Termination notice: 30 or 60 days
- Unbudgeted spending authority per item (`$X`)
- Whether leasing and sales are carved out to Ownership's listing broker or coordinated with AGM
- Records-return window on termination: 15 or 30 days

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

## 7 · Technology page

Confirm whether Thomas Family Properties, LLC holds 838 Seneca in a structure that issues K-1s, and
who at Ownership's accounting firm should get portal access.

---

## Release check

Before this goes to Ownership, `grep -c 'class="tbd"' index.html` should return **0**, and no
`.tbd-note` blocks should remain in `index.html`.
