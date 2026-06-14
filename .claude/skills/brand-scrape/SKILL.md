---
name: brand-scrape
description: "Scrape a client's existing website to extract brand identity: colors, fonts, logo, images, key copy, and site structure. Outputs a structured Brand Brief ready to feed into site-build. Actions: scrape site, extract colors, extract fonts, extract images, extract copy, output brand brief."
---
# Brand Scrape — Extract Brand Identity from Existing Website

Use this before building a new client site when the client already has a website (even a bad one). Pulls everything useful out of it so you don't start from zero.

## When to Apply

- Client has an existing website you need to match or migrate from
- Need to extract brand colors/fonts before designing
- Want to reuse their copy (services, about text, contact info) without typing it out
- Running `site-build` and want a pre-filled starting point

## How to Run

### Step 1 — Fetch the HTML

Use `WebFetch` on the target URL. Also try fetching `/` and any linked CSS files found in `<link rel="stylesheet">` tags.

If the site has sub-pages that matter (e.g. `/paslaugos`, `/apie`, `/kontaktai`), fetch those too — 2–3 pages max.

### Step 2 — Extract Colors

Look in this order (most reliable → least):
1. **CSS custom properties** in `<style>` tags or linked CSS: `--color-*`, `--primary`, `--accent`, `--bg`, `--text`
2. **Inline styles** on hero sections, buttons, headers: `background-color`, `color`, `border-color`
3. **Tailwind / utility classes**: map `bg-[color]`, `text-[color]` to hex if recognizable
4. **`<meta name="theme-color">`** tag
5. **Dominant image colors** — note the hero image's likely tone (warm/cool/neutral) if nothing found in CSS

Output: a palette of 3–6 hex values with role labels:
```
Primary:    #2D5016  (dark green — buttons, headings)
Accent:     #7AB32E  (lime green — highlights, hover)
Background: #F8F5F0  (cream — page background)
Text:       #1A1A1A  (near-black — body copy)
Surface:    #FFFFFF  (white — cards)
```

### Step 3 — Extract Fonts

Look for:
- `<link href="fonts.googleapis.com/...">` → extract family names from the URL params
- `@import url('...')` in `<style>` tags → same
- `font-family` declarations in CSS: capture the first 2–3 distinct families found
- If no Google Fonts found: note the system font stack used

Output:
```
Heading font: Playfair Display (Google Fonts — serif)
Body font:    Inter (Google Fonts — sans-serif)
```

### Step 4 — Extract Images

Scan all `<img>` tags and CSS `background-image` values. Categorize:
- **Logo**: `<img>` inside `<header>` or `<nav>`, or filename contains `logo`
- **Hero**: large image in first `<section>` or element with class `hero`
- **Gallery / Work photos**: repeated `<img>` in a grid or carousel
- **Team / About**: images near words "about", "team", "apie", "komanda"

Output: a list of image URLs with role tags. Flag which ones are worth reusing vs. replacing.

### Step 5 — Extract Key Copy

Pull text from semantic elements:
- `<title>` and `<meta name="description">` — their current SEO copy
- `<h1>` — main headline (what they claim to do)
- `<h2>` tags — section headlines (maps to site structure)
- Nav items — tells you what pages/sections exist
- CTA buttons (`<a class="btn">`, `<button>`) — their action language
- Phone number and email — scan for `tel:` links and `mailto:` links, also text patterns like `+370`
- Footer: address, working hours, social links

### Step 6 — Identify Site Structure

From nav + h2 tags, map out what sections/pages exist:
```
Pages found: / (home), /paslaugos, /galerija, /kontaktai
Sections on home: Hero → Paslaugos → Apie mus → Galerija → Kontaktai
```

### Step 7 — Output Brand Brief

Produce a single structured markdown document:

---

## Brand Brief — [Business Name]

**Source URL:** [url]
**Scraped:** [date]

### Identity
- **Business name:** ...
- **Tagline / H1:** ...
- **Service type:** ...
- **Location:** ...

### Contact
- **Phone:** ...
- **Email:** ...
- **Address:** ...
- **Hours:** ...

### Color Palette
| Role | Hex | Where used |
|------|-----|------------|
| Primary | #... | buttons, headings |
| Accent | #... | hover, highlights |
| Background | #... | page bg |
| Text | #... | body copy |

### Typography
- **Headings:** ... (source: Google Fonts / system)
- **Body:** ...

### Images
- **Logo:** [url] — reuse / replace
- **Hero:** [url] — reuse / replace
- **Gallery:** [n] photos found — links below
  - [url]
  - [url]

### Site Structure
- Pages: ...
- Home sections: ...

### Copy to Reuse
**Meta description:** "..."
**Hero headline:** "..."
**Services listed:** ..., ..., ...
**CTA text:** "..."

### Notes for site-build
- [ ] Replace logo? [yes/no — reason]
- [ ] Fonts available on Google Fonts? [yes/no]
- [ ] Quality work photos to reuse? [yes/no]
- [ ] Anything missing that a good site needs? [gap list]

---

## Output Principles

- Always flag when something is a guess vs. confirmed from the HTML
- If the site is SPA/React/Vue-rendered, WebFetch will get the shell only — note this and extract what you can from the shell (meta tags, title, linked assets)
- Keep the brief to one page — drop low-confidence or redundant data
- Default language for the brief: match the site's language (LT for Lithuanian sites)
- After outputting the brief, ask: "Pradėti site-build su šiais duomenimis?" — if yes, pre-fill `site.js` fields from the brief
