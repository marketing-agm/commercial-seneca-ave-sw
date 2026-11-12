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
- Slide 06: Strategy and Exit became Investment Strategy. The questions for Ownership lead, then the
  lease review offer, then Exit Strategy. Leasing and sale brokerage now reads "AGM will support the
  broker."
- Slide 07: the comparable assets are Pacific Business Park, Mount Si Building (North Bend) and
  Clover Building. The multifamily tiles were removed.
- Slide 09: Agreement and Contact are one page. Key Terms was removed. The Ready to Proceed box now
  says the agreement is a copy to review and nothing needs to be signed. `#contact` still resolves.
- All amber notes removed.
