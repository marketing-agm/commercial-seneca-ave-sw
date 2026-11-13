/*
 * Builds the landscape PDF of the proposal.
 *
 *   node scripts/build-pdf.js [output.pdf]
 *
 * Needs: node, playwright (with its Chromium), python3 with pypdf and reportlab.
 *
 * Each slide is printed on its own at 1440 x 1113 px, the screen width the site is designed for and
 * the 11 : 8.5 ratio of a landscape Letter page. The navy and blue rail is fixed to the left of every
 * page, the way it sticks on screen, and the content flows to as many pages as it needs. The slides are
 * then merged by scripts/merge-pdf.py, which adds bookmarks, page numbers and working contents links.
 */
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

const ROOT = path.resolve(__dirname, '..');
// links inside the PDF that point at files on the site (the Management Agreement button) are written as absolute
// addresses on the live site; set SITE_URL if it moves
const SITE_URL = (process.env.SITE_URL || 'https://commercial-seneca-ave-sw.pages.dev').replace(/\/$/, '');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'AGM-838-Seneca-Management-Proposal.pdf'));
const ROUTES = ['cover', 'property', 'team', 'onboarding', 'operations', 'reporting', 'strategy', 'about', 'fees', 'agreement'];
const W = 1440, H = 1113, RAIL = 384;

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.woff2': 'font/woff2', '.pdf': 'application/pdf' };

const PDF_CSS = `
@page{ size:${W}px ${H}px; margin:0; }
html,body{ background:var(--bg) !important; }
html:has(body.on-cover),body.on-cover{ background:#fff !important; }
body{ min-width:0 !important; }
.topbar,.progress,.pager,.cover-pager,.skip,.theme-toggle,.hamburger,.cp-dl{ display:none !important; }
.reveal,.cellgrid.reveal > .cell{ opacity:1 !important; transform:none !important; transition:none !important; }
.page.active{ animation:none !important; }

/* the rail repeats on every page, as it sticks on screen */
body:not(.on-cover) .shell{ display:block !important; min-height:0 !important; }
.rail{ position:fixed !important; left:0; top:0; width:${RAIL}px !important; height:${H}px !important; z-index:10; }
.rail-stick{ position:static !important; top:auto !important; height:${H}px !important; overflow:hidden !important; }
.rail-navy{ padding:78px 44px 48px !important; }
.rail-blue{ padding:44px 44px 34px !important; }
.rail-title{ font-size:42px !important; }
.main{ margin-left:${RAIL}px !important; }
.content{ padding:0 64px !important; }
.content-inner{ max-width:none !important; margin:0 !important; padding:48px 0 54px !important;
  -webkit-box-decoration-break:clone; box-decoration-break:clone; }

/* the cover: photograph fixed on the left, letter and contents flowing on the right */
.cp-cover{ display:block !important; min-height:0 !important; }
.cp-plate{ position:fixed !important; left:0; top:0; width:44%; height:${H}px; min-height:0 !important; z-index:10; }
.cp-plate-stick{ position:static !important; top:auto !important; height:${H}px !important; }
.cp-letter-body{ margin:0 0 0 44% !important; width:auto !important; max-width:none !important; padding:64px 72px 68px 68px !important;
  -webkit-box-decoration-break:clone; box-decoration-break:clone; }

/* keep small units whole; let the big ones break between their parts */
.cell,.phase,.step,.contact,.person,.fee-card,.asset,.case,.sign-band,.highlight,.swap,.q,.metric,.inline-item,
.portal-feat,.spec,.bio-fact,.bio-body,.footprint,.cp-index li,tr{ break-inside:avoid; page-break-inside:avoid; }
.sec-head,.lead{ break-after:avoid; page-break-after:avoid; }

/* a section that is short enough stays whole; longer ones may flow, but only between rows and cards */
.block{ margin-bottom:34px !important; }
.block.keep{ break-inside:avoid; page-break-inside:avoid; }
.source-note,.footprint{ break-before:avoid; page-break-before:avoid; }

/* slightly tighter than the screen, so fewer sections spill onto a page of their own */
.cell{ padding-top:30px !important; padding-bottom:32px !important; }
.contact{ padding-top:22px !important; padding-bottom:24px !important; }
.phase{ padding-top:22px !important; padding-bottom:26px !important; }
.step{ padding-top:24px !important; padding-bottom:26px !important; }
.fee-card{ padding-top:34px !important; padding-bottom:34px !important; }
.person{ padding-top:20px !important; padding-bottom:22px !important; }
.scope td{ padding-top:11px !important; padding-bottom:11px !important; }
.portal{ grid-template-columns:1.12fr 1fr !important; gap:30px !important; margin-top:16px !important; }
.portal-feats{ gap:20px !important; }
.sign-band{ padding:28px 40px !important; margin-top:20px !important; }
.contacts .contact{ padding-top:18px !important; padding-bottom:20px !important; }
.bio{ padding:30px 38px 26px !important; }
.bio-body{ margin-bottom:11px !important; line-height:1.65 !important; }
.bio-sub{ margin-top:18px !important; margin-bottom:9px !important; }
.bio-facts{ margin-top:20px !important; padding-top:12px !important; }
.bio-fact{ padding-top:7px !important; padding-bottom:7px !important; }
.spec{ padding-top:11px !important; padding-bottom:11px !important; }

/* the cover contents start their own page, with their label */
.cp-index{ break-before:page; page-break-before:always; margin-top:0 !important; padding-top:0 !important; border-top:none !important; }
.cp-index-k{ break-after:avoid; }
`;

function serve() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      const file = path.join(ROOT, p);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    }).listen(0, '127.0.0.1', () => resolve(srv));
  });
}

(async () => {
  const srv = await serve();
  const base = `http://127.0.0.1:${srv.address().port}`;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'agm-pdf-'));
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const manifest = [];

  for (const [i, route] of ROUTES.entries()) {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    await page.goto(`${base}/index.html#${route}`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'screen' });
    await page.addStyleTag({ content: PDF_CSS });
    await page.evaluate(async () => {
      document.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; });
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      // contents links: Chromium drops same-page fragments, so give them an address merge-pdf.py can turn into a page jump
      document.querySelectorAll('a[data-route]').forEach((a) => a.setAttribute('href', 'http://agm-pdf.invalid/#' + a.dataset.route));
      await Promise.all([...document.images].map((img) => (img.decode ? img.decode().catch(() => {}) : null)));
      await document.fonts.ready;
    });
    await page.evaluate((limit) => {
      document.querySelectorAll('.block').forEach((el) => { if (el.getBoundingClientRect().height <= limit) el.classList.add('keep'); });
    }, 760);
    await page.waitForTimeout(400);
    const title = await page.evaluate(() => {
      const label = document.querySelector('.rail-label');
      return label ? label.textContent.trim() : 'Cover letter';
    });
    const file = path.join(tmp, `${String(i).padStart(2, '0')}-${route}.pdf`);
    await page.pdf({ path: file, width: `${W}px`, height: `${H}px`, printBackground: true, preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    manifest.push({ route, title: route === 'cover' ? 'Cover letter and contents' : title, file });
    await page.close();
    console.log(`  ${route}`);
  }
  await browser.close();
  srv.close();

  fs.writeFileSync(path.join(tmp, 'manifest.json'), JSON.stringify(manifest, null, 2));
  execFileSync('python3', ['-I', path.join(__dirname, 'merge-pdf.py'), path.join(tmp, 'manifest.json'), OUT, SITE_URL], { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
})();
