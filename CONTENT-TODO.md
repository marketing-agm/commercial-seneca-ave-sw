# 838 Seneca: content status

## Outstanding

- **Management agreement PDF.** The "Management Agreement" button on slide 09 is inert
  (`aria-disabled="true"`, a click handler cancels it). To activate it, replace `href="#"` with the
  PDF link and remove `aria-disabled`.

Nothing else is outstanding. The proposal carries no `class="tbd"` placeholders and no `.tbd-note`
boxes. The CSS for both is left in `index.html` so a future placeholder can reuse it.

## Release check

- `grep -c 'class="tbd"' index.html` returns 0
- `grep -c 'class="tbd-note"' index.html` returns 0
- No em dashes in any file. Use `python3 -c "print(open('index.html',encoding='utf-8').read().count(chr(0x2014)))"`

## Changes of 2026-11-12

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
- Lease review removed. The building has no tenant and AGM is doing management operations, not
  leasing, so the "Review the lease before signature" step, the Lease Negotiation Support offer on
  Investment Strategy and every line assuming a lease in negotiation are gone. Next Steps is two
  steps. A purchase option is now framed as something a future tenant may hold.
- All amber notes removed.
