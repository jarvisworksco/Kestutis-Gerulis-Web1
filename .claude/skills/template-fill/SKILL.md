---
name: template-fill
description: "Adapt the Templatev3 Astro site to a new client/niche in one repeatable pass. Takes raw client data (any service business — plumber, landscaper, phone repair, etc.), then writes client.js (brand + theme + schema type), rewrites all content data files, picks palette/fonts/icons, and verifies the build. Use after copying the Templatev3 folder for a new client."
---

# Template Fill — Adapt Templatev3 to Any Client

Turns a fresh copy of `Templatev3` into a working, themed, niche-specific site in one consistent pass. Same process every iteration: copy folder → run this → working site.

## Prerequisites

1. The user has **copied** `d:\Code projects\Templatev3` to a new folder (e.g. `Klientas-Santechnikas`). Never fill the template master in place — always work on a copy. If they haven't copied yet, do it first:
   - `robocopy "d:\Code projects\Templatev3" "d:\Code projects\[KLIENTAS]" /E /XD .git node_modules dist .astro`
   - then `cd` into the copy and `git init`.
2. You know the target folder path. All edits happen inside it.

## Required Client Data (intake)

Gather from the user's prompt or `CLIENT-INTAKE.md`. If something is missing, ask once, concisely. Minimum:
- **Niša** (service type) — e.g. „santechnikas", „kraštovaizdžio tvarkymas", „telefonų remontas"
- **Pavadinimas** + **savininkas/atstovas**
- **Telefonas**, **el. paštas**, **Facebook** (jei yra)
- **Domenas** (jei žinomas; jei ne — placeholder)
- **Miestai** (aptarnaujami) + **bazės miestas**
- **Paslaugos** (sąrašas; jei nepateikta — sugeneruok 6–8 tipines tai nišai)
- **Tonas** (premium / draugiškas / techninis), jei nurodyta

Optional: realūs atsiliepimai, realios nuotraukos (žr. `/photo-grab`), Web3Forms raktas, hCaptcha raktas, statistika.

## Fill Process — do in this order

### 1. Design: pick palette + fonts (ui-ux-pro-max + frontend-design)
- Invoke **ui-ux-pro-max** to choose a niche-appropriate **palette** and **font pairing** (e.g. plumber → cool blues; landscaper → greens; phone repair → techy dark + electric accent).
- Apply **frontend-design** principles: a distinctive, intentional direction — NOT generic. Avoid Inter/Roboto/Arial; avoid purple-on-white cliché. Vary across clients (don't reuse the same look every time).
- Decide light vs dark theme based on niche tone.

### 2. Write `src/data/client.js`
Rewrite the whole object:
- identity (pavadinimas, savininkas, tagline, kontaktai — kontaktai ŠVENTI, turi sutapti visur)
- `businessType` → correct schema.org type (Plumber, HVACBusiness, Electrician, RoofingContractor, LandscapingBusiness, HousePainter, AutoRepair, MovingCompany, GeneralContractor… else 'LocalBusiness')
- `schemaAlternateName` → "[Pavadinimas] — [niša]"
- `slugBase` + `vietoveFraze` → niche phrase for location pages (e.g. 'Santechnikos paslaugos')
- `url`, `metaTitle`, `metaDescription`, `kalba`, `locale`, `geoPlacename`
- `web3formsKey` / `hcaptchaSiteKey` → client's real keys if given; otherwise leave placeholder + flag in checklist
- `theme.colors` (semantic: primary, primaryDeep, secondary, accent, accentHover, accentLight, bark, dark, cream, sand, card, text, textMuted, textLight, border), `theme.themeColor`, `theme.grain` (true/false), `theme.fonts` (displayStack, bodyStack, googleUrl — include latin-ext for LT diacritics).

Also sync `astro.config.mjs` `SITE_URL` to the same `url`.

### 3. Rewrite content data files (`src/data/`)
- **paslaugos.js** — real client services (or niche-typical). Each: slug, pavadinimas, aprasymas, seo (longer paragraph), kaina, nuotrauka (`/assets/images/paslaugos/svc-NN.svg` until real photos), `ikona` from Icon.astro set, `featured`. Update `kategorijos` (6 cards) to match.
- **turinys.js** — hero (eyebrow/antraste/akcentas/paantraste/trust/form text), `sekcijos` headings, `cta`, `apie`, `paslaugaPrivalumai`, `procesas`, `kodel`, `duk`, `pokalbis` (chat Q&A). All in client's voice; nothing fabricated.
- **vietoves.js** — UNIQUE intro+tekstas per city (no duplicate text — Google penalises). Keys = `${slugBase}-${citySlug}` (slugify diacritics: Š→s, ė→e…).
- **site.js** — `vietoves` list (cities + slugs + pagrindinis), `statai` (real numbers if known), `features`, `atsiliepimai` URLs.
- **atsiliepimai.js** — REAL reviews only. If none, keep a few neutral demo ones and flag „pakeisti realiais". Set `atsiliepimuVidurkis`, `atsiliepimuKiekis`, `atsiliepimuSaltinis`, `atsiliepimuSaltinisLabel`.
- **straipsniai.js** — 3 niche GEO articles (how people ask questions). Optional; can keep generic.
- **galerija.js** — set `KIEKIS`/`EXT` to match available images.

### 4. Icons
Pick `ikona` values for services from `src/components/Icon.astro` (has generic trade icons: irankis, raktas, vamzdis, elektra, sildymas, automobilis, sodas, langas, spyna, valymas, remontas, teptukas… + originals). If a needed icon is missing, add a new inline-SVG entry to Icon.astro.

### 5. Logo
If client provided a logo, place it as the 6 `public/assets/logo-*.svg` variants. Otherwise regenerate the placeholder wordmark SVGs with the client's name + theme accent (keep same filenames + viewBoxes). Update favicon.svg mark color to the accent.

### 6. Images
- If real photos available → run **/photo-grab** (downloads from client's old site/FB) or have the user drop them into `public/assets/images/` (+ `paslaugos/`, `galerija/`). Match the paths referenced in data files; set `galerija.js` EXT to `jpg`.
- If not → keep placeholders; flag in checklist.

### 7. SEO / static files
- `public/llms.txt` — rewrite with real niche facts (static file; can't read client.js).
- `public/robots.txt` — sitemap URL = client domain.
- Update `og:image:alt` is automatic (from client.js); ensure `ogImage` points to a real OG image when available.

### 8. Verify
- `cd [KLIENTAS] && npm install && npm run build` — must build clean.
- Optionally `npm run dev` and screenshot to confirm theme + content look right.
- Grep the build for the old brand name / placeholder phone to confirm nothing leaked:
  `grep -r "Meistrai\|600 00000\|pavyzdys.lt" dist/` should return nothing once a real domain/phone is set.

### 9. Hand-off checklist (always output at the end)
- [ ] Web3Forms raktas įrašytas (client.js `web3formsKey`) — gauti iš web3forms.com
- [ ] hCaptcha site key įrašytas (arba palikti test key kūrimui)
- [ ] Realios nuotraukos įkeltos (hero, about, paslaugos, galerija) — kol kas placeholder
- [ ] Realūs atsiliepimai (atsiliepimai.js) — kol kas demo
- [ ] Domenas patvirtintas (client.js `url` + astro.config `SITE_URL` + robots.txt)
- [ ] Telefonas/el. paštas sutampa visur (ŠVENTI kontaktai)
- [ ] Logo (jei klientas turi) vietoj placeholder
- [ ] Deploy į Vercel (žr. [[feedback-hosting-vercel]] — visada Vercel, ne Cloudflare)

## Principles
- **Reskin, ne perrašymas**: struktūra ir sekcijos lieka; keičiasi tema + turinys.
- **Nieko nepramanyk**: kainos, atsiliepimai, faktai — tik iš kliento. Trūkstama pažymėk, neišgalvok.
- **Kontaktai ŠVENTI**: telefonas/el. paštas identiški visur.
- **Vienas šaltinis**: viskas eina per `client.js` + `src/data/*.js`. Komponentų nekeisk, nebent reikia naujos sekcijos.
- **Kalba**: LT pagal nutylėjimą; jei klientas užsienietis — `client.kalba` + turinys EN.
- **Kiekviena iteracija = tas pats procesas.** Skirtingos nišos turi atrodyti skirtingai (tema), bet pildymo žingsniai identiški.

## Example
`/template-fill d:\Code projects\Klientas-Santechnikas — santechnikas „Vandenė", savininkas Tomas, tel +370 612 34567, Vilnius+Kaunas, paslaugos: avarinė santechnika, vamzdynų keitimas, nuotekų valymas, šildymo montavimas`
→ mėlyna tema, „Plumber" schema, santechnikos paslaugos/turinys, slug `santechnikos-paslaugos-vilnius`, build OK, checklist.
