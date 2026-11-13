"""Merges the per-slide PDFs from build-pdf.js into one file.

Adds bookmarks, a small page number on every page after the cover, and turns the contents links
(which Chromium writes as URLs to the local print server) into links to the matching page.
"""
import io
import json
import re
import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, DictionaryObject, NameObject, NumberObject, TextStringObject
from reportlab.lib.colors import Color
from reportlab.pdfgen import canvas

manifest_path, out_path = sys.argv[1], sys.argv[2]
site_url = sys.argv[3].rstrip("/") if len(sys.argv) > 3 else ""
manifest = json.load(open(manifest_path, encoding="utf-8"))

writer = PdfWriter()
first_page = {}
counts = []
for item in manifest:
    reader = PdfReader(item["file"])
    first_page[item["route"]] = len(writer.pages)
    counts.append(len(reader.pages))
    for page in reader.pages:
        writer.add_page(page)
total = len(writer.pages)

# contents links: the placeholder address ending in #route becomes a jump to that slide; links with no target are dropped
for page in writer.pages:
    annots = page.get("/Annots")
    if not annots:
        continue
    keep = ArrayObject()
    for ref in annots:
        annot = ref.get_object()
        action = annot.get("/A")
        uri = str(action.get_object().get("/URI", "")) if action else ""
        local = re.match(r"https?://(?:127\.0\.0\.1|localhost)(?::\d+)?/(.*)", uri)
        if local:
            # a link to a file on the site: point it at the live site, or drop it if no address was given
            if site_url:
                action.get_object()[NameObject("/URI")] = TextStringObject(f"{site_url}/{local.group(1)}")
                keep.append(ref)
            continue
        if uri.startswith("http://agm-pdf.invalid/"):
            route = uri.rsplit("#", 1)[-1] if "#" in uri else ""
            if route in first_page:
                target = writer.pages[first_page[route]].indirect_reference
                annot[NameObject("/A")] = DictionaryObject({
                    NameObject("/S"): NameObject("/GoTo"),
                    NameObject("/D"): ArrayObject([target, NameObject("/Fit")]),
                })
                keep.append(ref)
            continue
        if action is None:
            continue
        keep.append(ref)
    page[NameObject("/Annots")] = keep

# bookmarks
for item in manifest:
    writer.add_outline_item(item["title"], first_page[item["route"]])

# page numbers, from the second page on
for n in range(1, total):
    page = writer.pages[n]
    w, h = float(page.mediabox.width), float(page.mediabox.height)
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(w, h))
    c.setFillColor(Color(0.42, 0.47, 0.53))
    c.setFont("Helvetica", 7.5)
    c.drawRightString(w - 57, 24, f"838 Seneca Ave SW  ·  Management Proposal  ·  {n + 1}")
    c.save()
    buf.seek(0)
    page.merge_page(PdfReader(buf).pages[0])

writer.add_metadata({
    "/Title": "838 Seneca Ave SW: Management Proposal",
    "/Author": "AGM Real Estate Group, LLC",
    "/Subject": "Proposal for management services",
})
writer.page_mode = "/UseOutlines"
with open(out_path, "wb") as f:
    writer.write(f)
print(f"wrote {out_path}: {total} pages ({', '.join(f'{m['route']} {c}' for m, c in zip(manifest, counts))})")
