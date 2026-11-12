# 838 Seneca: content status

## Outstanding

- **Management agreement PDF.** The "Management Agreement" button on slide 09 is inert
  (`aria-disabled="true"`, a click handler cancels it). To activate it, replace `href="#"` with the
  PDF link and remove `aria-disabled`.

Nothing else is outstanding. The proposal carries no `class="tbd"` placeholders and no `.tbd-note`
boxes. The CSS for both is left in `index.html` so a future placeholder can reuse it.

## PDF

`AGM-838-Seneca-Management-Proposal.pdf` is built by `node scripts/build-pdf.js` and has to be rebuilt
after any change to the proposal. The deck and the PDF are separate files and will drift otherwise.

## Release check

- Rebuild the PDF
- `grep -c 'class="tbd"' index.html` returns 0
- `grep -c 'class="tbd-note"' index.html` returns 0
- No em dashes in any file. Use `python3 -c "print(open('index.html',encoding='utf-8').read().count(chr(0x2014)))"`

## Changes of 2026-11-12

- Password gate removed. `functions/_middleware.js` and `.dev.vars.example` are deleted, so the page
  is served openly (`_headers` still sets noindex). PostHog analytics is now off until a key is
  pasted into `index.html`; see the README.
- Investment Strategy is an unnumbered grid under "Items that would be considered are the following."
  The exit section is gone. "Packaged for Sale" is the first item and says the objective over the
  first 90 days is a conversation about holding or selling.
- Sale and exit language removed elsewhere: the Exit and Option Modeling feature and the buyer line
  on Reporting, the buyer line on Property, and "sales" from the fee footnote. The Pacific Business
  Park case study still says the firm handled the sale, as a record of a past transaction.
- Slide 02: Cindy's photo removed and her full bio added, from her own account of her experience.
- Slide 03: the stages are now Take Over the Building, Get Vendors Going, Get Reports In and
  Outcome. A "Once a Tenant Is Secured" block carries the second track, with a general-overview note.
  The "At Day 90" recap was removed because Outcome now says it.
- Slide 06: Strategy and Exit became Investment Strategy. The questions for Ownership lead, then
  Exit Strategy. Leasing and sale brokerage now reads "AGM will support the broker."
- Slide 07: the comparable assets are Pacific Business Park, Mount Si Building (North Bend) and
  Clover Building. The multifamily tiles were removed.
- Slide 09: Agreement and Contact are one page. Key Terms was removed. The page runs Next Steps,
  Contact, then the Ready to Proceed band last, which says the agreement is a copy to review and
  nothing needs to be signed. The closing call band was removed. `#contact` still resolves.
- Marketing broker. Another broker is marketing the building and AGM supports that broker as
  needed. This is stated in the tenancy row on slide 01, the vacancy scope on slide 04, the
  leasing and sale brokerage answer on slide 06 and the fee footnote on slide 08.
- Lease review removed. The building has no tenant and AGM is doing management operations, not
  leasing, so the "Review the lease before signature" step, the Lease Negotiation Support offer on
  Investment Strategy and every line assuming a lease in negotiation are gone. Next Steps is two
  steps. A purchase option is now framed as something a future tenant may hold.
- All amber notes removed.
