---
name: photo-grab
description: "Download all real photos from a web page (a client's existing site, Facebook, paslaugos.lt) into a folder, filtering out icons/logos/tracking pixels and deduplicating. Uses a real Chromium browser (Playwright) so JS-rendered galleries work. Outputs renamed files + a manifest mapping each to a template image slot. Use to fill a new site's images from the client's existing online presence."
---

# Photo Grab — Download a Page's Photos into the Template

`brand-scrape` only *lists* image URLs; this skill actually **downloads the files** — into `public/assets/images/` of a template copy, ready to use. Uses Playwright (real Chromium) because galleries are often JS-rendered.

## When to Apply

- New client has an existing website / Facebook page / paslaugos.lt profile with usable photos
- You need real work photos to replace `Templatev3` placeholders
- Running `/template-fill` and step 6 (images) needs real assets

⚠️ **Copyright:** only download photos the client owns / has rights to use. Confirm with the client. Don't scrape third-party stock or competitors.

## Intake

- **URL(s)** of the page(s) to grab from (one or several)
- **Destination folder** (default: `./public/assets/images/` of the current template copy)
- Optional: **min size** filter (default skip < 400px on the long edge), **max count**

## Process — generate and run a Python + Playwright script

Write `photo_grab.py` and run it via Bash. The script must:

### 1. Auto-install deps (first run)
```python
import subprocess, sys
def install(p): subprocess.check_call([sys.executable, "-m", "pip", "install", p], stdout=subprocess.DEVNULL)
try:
    from playwright.sync_api import sync_playwright
except ImportError:
    install("playwright")
    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium", "--with-deps"])
    from playwright.sync_api import sync_playwright
# Pillow optional (resize/convert); httpx or urllib for downloads
```

### 2. Collect image candidates (headless Chromium)
Navigate to each URL, scroll to bottom in steps (lazy-load), then gather, in priority order:
- `<a href>` linking to full-size images (lightbox originals) — best quality
- `<img>` `currentSrc` / `srcset` → pick the **largest** candidate
- `<img src>`
- CSS `background-image` URLs on hero/section elements
- `<meta property="og:image">`
Resolve all to absolute URLs.

```python
page.goto(url, wait_until="networkidle")
for _ in range(12):
    page.mouse.wheel(0, 2000); page.wait_for_timeout(600)
urls = page.eval_on_selector_all("img", "els => els.map(e => e.currentSrc || e.src)")
# + srcset parsing, + <a> hrefs ending in .jpg/.png/.webp, + background-image
```

### 3. Filter & dedupe
- Drop data: URIs, SVG sprites, tracking pixels, 1×1, and tiny icons/logos (skip if filename or alt contains `logo`, `icon`, `favicon`, `sprite`, `avatar`, or rendered size < min).
- Download to memory, check real dimensions (Pillow); drop below min size.
- Dedupe by content hash (md5 of bytes) and by URL.

### 4. Download, rename, classify
- Save to destination. Rename predictably:
  - first large hero-area image → `hero.jpg`
  - about/team-context image → `about.jpg`
  - the rest → `galerija/galerija-01.jpg`, `-02`, … (zero-padded)
- Optional: downscale very large images (> 2000px) and convert webp→jpg with Pillow for broad compatibility.

### 5. Output a manifest
Write `photo-grab-manifest.json` and print a summary table mapping each saved file → suggested template slot:
```
file                          | suggested slot           | size
hero.jpg                      | turinys.js hero.nuotrauka | 1920x1080
about.jpg                     | turinys.js apie.nuotrauka | 1200x1500
galerija/galerija-01.jpg      | galerija.js (KIEKIS++)    | 1600x1200
paslaugos/svc-01.jpg          | paslaugos.js [0].nuotrauka| 1200x900
```
Remind to set `galerija.js` `EXT='jpg'` and `KIEKIS` to the count, and to point `og.svg`→a real OG image.

### 6. Robustness
- Add `wait_for_timeout` between actions; set a realistic user-agent.
- If a site blocks headless (Cloudflare/login) or shows little, report what was grabbed and suggest the user save images manually or provide a Facebook album link.
- Facebook: public page photos often need scrolling the photos tab; if login-walled, note it.

## Output Principles
- Never overwrite existing real photos without asking.
- Keep aspect ratios; don't stretch.
- Report: total found, kept after filtering, saved paths, anything skipped and why.
- Pair with **/template-fill** step 6 — after grabbing, wire the paths into the data files.

## Example
`/photo-grab https://senas-kliento-saitas.lt → d:\Code projects\Klientas-Santechnikas\public\assets\images`
→ downloads 18 photos, names hero/about + galerija-01..16, writes manifest, reminds to set EXT='jpg'.
