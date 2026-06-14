---
name: site-build
description: "Astro + Vercel static site build workflow for service-business clients. Stack: Astro, vanilla CSS (custom properties), Web3Forms, hCaptcha, Vercel. Actions: scaffold new site, add section, add page, add component, deploy checklist. Encodes the ArbCut architecture pattern: single site.js config, reusable InquiryForm, section-based layout."
---
# Site Build — Astro Service-Business Website Workflow

Standard build pattern for client service websites. Based on the ArbCut architecture.

## Stack
- **Framework**: Astro (static output)
- **Styling**: Vanilla CSS with custom properties (`--color-*`, `--space-*`, `--radius`, `--shadow-*`)
- **Forms**: Web3Forms + hCaptcha (keys in `site.js`)
- **Hosting**: Vercel (GitHub → auto-deploy)
- **Analytics**: Vercel Analytics (`@vercel/analytics` package, one import in `BaseLayout.astro`)
- **Images**: local `/public/assets/images/` — WebP preferred

## Architecture Principles

### 1. Single Source of Truth — `src/data/site.js`
All client-specific data lives here and nowhere else:
- Business name, owner, phone (`telefonas` + `telefonasHref`), email
- Social links, service area, geo coordinates
- Web3Forms key, hCaptcha site key
- Feature flags (`features.chatWidget`, `features.reviews`)
- Review URLs (paslaugos.lt → Google when placeId is added)
- Stats (count-up numbers — use real figures from their profiles)

Never hardcode phone numbers, emails, or keys in component files.

### 2. Component Naming
Pattern: `[SectionName].astro` for full sections, `[ElementName].astro` for reusable elements.
- Sections: `Hero.astro`, `Services.astro`, `Process.astro`, `FAQ.astro`, `ContactSection.astro`
- Reusable: `InquiryForm.astro`, `InquiryModal.astro`, `Icon.astro`, `ContactStrip.astro`
- Form is always `InquiryForm.astro` — shared between inline section and modal via props (`id`, `idPrefix`, `subject`)

### 3. CSS Conventions
- Use CSS custom properties, not Tailwind
- Spacing scale: `--space-1` (4px) through `--space-8` (64px)
- Section pattern: `<section class="[name]-section section section--[theme]">` where theme is `cream`, `dark`, or `white`
- Reveal animations: `js-reveal-scroll` class + IntersectionObserver in global script
- Mobile breakpoints: 560px (stack columns), 768px (hide nav items), 1024px (full layout)

### 4. Forms
- Always use `InquiryForm.astro` — never build a one-off form
- Required fields: Vardas (name), Kontaktai (phone or email), Žinutė (message)
- Optional: Miestas (city)
- Always include `redirect` hidden input pointing to `/success`
- hCaptcha renders via script tag in `BaseLayout.astro`, not per-component

## New Client Site Checklist

### Scaffold
- [ ] Copy ArbCut repo structure (or `npm create astro`)
- [ ] Update `src/data/site.js` — all fields
- [ ] Replace all images in `/public/assets/images/`
- [ ] Update `astro.config.mjs` site URL
- [ ] Update `robots.txt` and `sitemap` config

### Content
- [ ] Hero: headline (what they do + where), subheadline (credibility), CTA button, phone visible
- [ ] Services: 4–6 service cards with icons (use `Icon.astro` SVG system)
- [ ] Process: 3–4 steps (how it works)
- [ ] Why Us / Trust: stats, certifications, years of experience
- [ ] FAQ: 6–8 real questions from reviews/calls
- [ ] Reviews section: link to paslaugos.lt or Google
- [ ] Contact: inline form + contact strip (phone, email, social)

### SEO / GEO
- [ ] `<title>` and `<meta description>` in `site.js` (`metaTitle`, `metaDescription`)
- [ ] JSON-LD LocalBusiness schema in `BaseLayout.astro` (pulls from `site.js`)
- [ ] OG image set (`ogImage` in `site.js`)
- [ ] Location pages if multi-city (`src/pages/[slug].astro` with `vietoves` array)
- [ ] `sitemap.xml` auto-generated via `@astrojs/sitemap`

### Deploy
- [ ] Push to GitHub repo under `jarvisworksco/` org (or client's own account)
- [ ] Connect Vercel → GitHub → build command `npm run build`, output dir `dist`
- [ ] Add custom domain in Vercel project settings → Domains
- [ ] Test form submission (check Web3Forms dashboard for delivery)
- [ ] Test hCaptcha renders on mobile

## Adding a New Section
1. Create `src/components/[SectionName].astro`
2. Import in `src/pages/index.astro`
3. Style scoped within the component `<style>` block
4. If it needs data from `site.js`, import at top: `import { site } from '@data/site.js'`

## Common Patterns

### Count-up stats
```astro
{site.statai.map(s => (
  <div class="stat">
    <span class="stat__num js-countup" data-target={s.skaicius}>{s.skaicius}</span>
    <span class="stat__suffix">{s.priesaga}</span>
    <p class="stat__label">{s.etikete}</p>
  </div>
))}
```

### Reveal on scroll
```html
<div class="js-reveal-scroll"><!-- content --></div>
```
IntersectionObserver in global script adds `is-visible` class → CSS transition plays.
