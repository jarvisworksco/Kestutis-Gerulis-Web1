# ONE-SHOT PROMPT — paslaugų verslo svetainė iš šio šablono

> **Workflow:** nukopijuok VISĄ šį folderį naujam klientui → įklijuok šį promptą į
> Claude Code kartu su kliento informacija → agentas „one-shot'u" paverčia šabloną
> baigta kliento svetaine.
>
> **Modelis:** kadangi struktūra jau sukurta, šis šablono užpildymas tinka ir
> **Sonnet high** (tokenų taupymui) — su sąlyga, kad PRIVALOMAI naudoji `ui-ux-pro-max`
> ir `frontend-design` skillus (žr. 4 sk.) ir atlieki screenshot self-check'ą (8 sk.).
> Pilnam build'ui iš nulio — Opus/Fable. Tikėkis 1–2 mažų pataisymo ėjimų su Sonnet.

---

## 0. KLIENTO DUOMENYS (užpildo Matas prieš paleidžiant)

```
Įmonės pavadinimas:   ...
Nišos tipas:          ...  (santechnikas, elektrikas, stogdengys, kraštovaizdis, valymas…)
Profilio / nuotraukų nuoroda: ...  (paslaugos.lt profilis / Facebook / sena svetainė)
Atsiliepimų nuoroda:  ...  (kur klientai mato/palieka atsiliepimus — paslaugos.lt ar Google)
Telefonas:            ...
El. paštas:           ...  (jei nėra — palik tuščią)
Miestas / teritorija: ...
Papildoma info:       ...  (patirtis metais, įvertinimas, sertifikatai, soc. tinklai)
```

Viskas, ko nėra aukščiau ar profilyje — **NEIŠGALVOK**. Trūkstamą lauką palik tuščią/pašalink.

---

## 1. KĄ DARYTI (apžvalga)

Šis folderis JAU yra pilnai veikianti svetainė su placeholder turiniu (Astro 5 +
Tailwind 4). Tavo darbas — **užpildyti realiais kliento duomenimis, pakeisti
placeholder nuotraukas/logotipą realiais, ir suteikti svetainei UNIKALŲ dizainą**.
Struktūros (sekcijų, puslapių) keisti NEREIKIA — ji jau gera ir konversinė.

Pagrindinis principas: **beveik viskas redaguojama VIENAME faile —
`src/data/site.js`**. Puslapiai patys atsinaujina iš jo. Plius dizaino sistema
viename faile — `src/styles/global.css` (`@theme`).

---

## 2. DUOMENŲ SURINKIMAS (pirmas žingsnis)

1. **Nuotraukos:** paleisk `photo-grab` skillą ant pateiktos nuorodos. Pereik
   VISUS profilio tabus (Apie, Galerija, Paslaugos, Atsiliepimai — atsiliepimų
   nuotraukos irgi yra realūs darbai). Filtruok < 400 px, dedupe, konvertuok į
   WebP (max 1600 px, q≈82) į `public/images/`. Išmesk profilio avatarą/logotipą.
2. **Klasifikuok nuotraukas:** sugeneruok Pillow kontaktinius lapus (po ~12) ir
   peržiūrėk juos. Kiekvienai nuotraukai nustatyk turinį (kuri paslauga, prieš/po,
   technika, rezultatas) ir kokybę.
3. **Tekstai:** iš profilio surink paslaugas su kainomis, aprašymo tekstą, VISUS
   atsiliepimus (vardas, data, žvaigždutės, tekstas — pažodžiui), patirtį,
   įvertinimą, aptarnaujamas vietoves.
4. Trumpai parodyk inventorių (paslaugos + kainos, atsiliepimų sąrašas, nuotraukų
   priskyrimo planas) ir TĘSK — leidimo klausti nereikia.

---

## 3. UŽPILDYK `src/data/site.js`

Pakeisk VISUS placeholder'ius (`PAKEISTI`, „Pavyzdys", „Pirmoji paslauga" ir t.t.):
- `imone` — pavadinimas, telefonas (+ `telefonasHref` be tarpų), el. paštas (jei
  yra), miestas, aptarnavimo spindulys, patirtis, įvertinimas, atsiliepimų skaičius,
  ir **`profilis`** = kliento atsiliepimų nuoroda (naudojama „Žiūrėti visus
  atsiliepimus" IR „Įvertinkite mus" mygtukuose).
- `vietoves` — realios aptarnaujamos vietovės.
- `turinys.hero` — antraštė (su pagrindine paslauga + miestu), paantraštė, hero nuotrauka.
- `turinys.apie` — antraštė, 2–3 pastraipos (iš realaus profilio teksto), nuotrauka, privalumai.
- `paslaugos[]` — po vieną įrašą kiekvienai realiai paslaugai (slug be lietuviškų
  raidžių, kaina, trumpas + detalus aprašymas, ir nuotraukos PRISKIRTOS PAGAL TURINĮ).
- `atsiliepimai[]` — visi realūs atsiliepimai, pažodžiui.
- `duk[]` — 4–6 klausimai/atsakymai iš realių duomenų (kainos, vietovės, terminai…).
- `galerija[]` — visos realios darbo nuotraukos (`plati:true` plačioms/koliažams).
- `procesas[]` — pritaikyk žingsnius nišai.

---

## 4. ⭐ UNIKALUS DIZAINAS (svarbu — kiekvienas klientas KITOKS)

Kad svetainės nebūtų vienodos, **kiekvienam klientui parink kitą vizualinį
charakterį**. Tau suteikiama laisvė, BET išlaikyk visas sekcijas ir konversinę logiką.

**0. PRIVALOMA — pasitelk dizaino skillus PRIEŠ keisdamas spalvas** (būtent tai
   leidžia gauti aukštą rezultatą ir su lengvesniu modeliu, pvz. Sonnet):
   - Paleisk **`ui-ux-pro-max`** skillą — gauk dizaino sistemos rekomendaciją pagal
     nišą (paletė, šriftų pora, efektai, anti-patternai). Komanda:
     `--design-system` su nišos raktažodžiais (pvz. „plumber home service trust local").
   - Paleisk **`frontend-design`** skillą — vizualinio poliravimo ir „ne generinio
     AI" estetikos kryčiai.
   - Pritaikyk jų išvadas keisdamas `@theme` (paletė/šriftai) ir layout detales —
     NE aklai, o derindamas prie nišos ir su jau esama struktūra. Trumpai įvardink,
     kokią kryptį pasirinkai ir kuo ji skiriasi nuo ankstesnių klientų.

1. **Paletė** — `src/styles/global.css` `@theme` bloke pakeisk `--color-brand-50…950`
   ir `--color-accent`. Faile yra 4 paruošti paletės pavyzdžiai (žalia/mėlyna/
   antracitas/terakota) — parink nišai tinkančią ARBA sukurk savą. Tai persidažo
   VISĄ svetainę (komponentų liesti nereikia).
2. **Šriftai** — pakeisk `--font-display` / `--font-sans` (poros su latin-ext sąraše
   tame pačiame faile) IR atitinkamą Google Fonts `<link>` `src/layouts/Base.astro`.
3. **Smulkios layout variacijos** (parink 2–3, kad nesikartotų su ankstesniais):
   hero formos pozicija (forma dešinėje / po antrašte / centre), sekcijų kraštai
   (tiesūs vs. įstriži/banguoti), kortelių kampų apvalumas ir šešėliai, antraščių
   lygiavimas, „eyebrow" ženkliukų stilius. Nedaryk struktūrinių pakeitimų — tik
   estetinius.
4. Privaloma visada: latin-ext šriftai, kontrastas ≥ 4.5:1, SVG ikonos (ne emoji),
   subtilios animacijos su `prefers-reduced-motion`.

---

## 5. LOGOTIPAS IR HERO (AI)

- **Logotipas — VISADA sukuriamas naujas.** Jei yra AI vaizdų generavimo įrankis —
  sugeneruok profesionalų logotipą (nišos tematika, derantis prie paletės) + apvalų
  avatarą (chatbot/„Įvertinkite mus"). Pakeisk `public/logo.svg`, `public/avatar.svg`,
  `public/favicon.svg`. Jei AI įrankio NĖRA — sukurk švarų vektorinį SVG logotipą.
  Logotipas header'yje turi būti didelis (žr. `Header.astro`), avatar — apvalus.
- **Hero nuotrauka — pageidautina AI generuota** (plataus formato, fotorealistinė,
  atitinkanti nišą ir Lietuvos kontekstą, derantis su realiomis nuotraukomis). Jei
  AI nėra — naudok įspūdingiausią realią. Įrašyk kelią į `turinys.hero.nuotrauka`.
- AI failus laikyk `public/images/ai/` ir išvardink ataskaitoje.

---

## 6. PAKEISK PLACEHOLDER NUOTRAUKAS

Visi `/images/placeholder-*.svg` keliai `site.js` faile → pakeisk realiais WebP
keliais (priskirtais pagal turinį, ne atsitiktinai). Galerija rodo nuotraukas PILNU
dydžiu (neapkarpytas) — prieš/po koliažai turi matytis. Žemėlapio `bbox`/`marker`
`index.astro` ir `kontaktai.astro` — pakeisk pagal kliento miestą.

---

## 7. NEDERYBINIAI REIKALAVIMAI

- **Lietuvių kalba** be klaidų: latin-ext šriftai, „lietuviškos kabutės",
  antraštėms `line-height ≥ 1.15` (diakritikai neapsipjauna), nulis angliškų likučių.
- **Jokių išgalvotų faktų** — tik realūs kontaktai, kainos, atsiliepimai.
- **Nuotraukos pagal kontekstą**, ne random.
- **Footer kreditas „Sukurta jarvisweb.lt"** — palik (jau yra).
- **Web3Forms:** įrašyk raktą `InquiryForm.astro` (`WEB3FORMS_KEY`). Be rakto forma
  mandagiai nukreipia skambinti — tai OK, jei rakto dar nėra.
- **Be bugų:** žr. 8 skyrių.

---

## 8. PALEIDIMAS IR PATIKRA

1. `npm install`
2. `npm run build` — turi sukompiliuoti be klaidų (patikrina visus puslapius).
3. `npm run dev` ir fetch'ink visus maršrutus (/, /paslaugos/[kiekvienas-slug],
   /galerija, /kontaktai, /apie-mus, /privatumo-politika, /taisykles) → visi 200.
4. Padaryk Playwright screenshot'us (desktop 1440 + mobile 390: pradžia, paslauga,
   galerija) ir PERŽIŪRĖK juos pats — sulūžęs layout'as, apkarpytos nuotraukos,
   neperskaitomi diakritikai, neveikiantis chatbot/meniu — taisyk IŠ KARTO.
5. Atlik lietuvių kalbos savikontrolę (peržiūrėk visus tekstus).

⚠️ Windows: `npm create astro` / interaktyvių CLI nenaudok — viskas jau yra.
   `Get-Content -Raw` su `[bracket]` failais lūžta — `[slug].astro` redaguok per
   Edit/Write įrankius, ne per PowerShell.

---

## 9. ATASKAITA (pabaigoje)

Pateik: lokalų adresą, kas pakeista, pasirinktą paletę/šriftus (kuo skiriasi nuo
ankstesnių), nuotraukų priskyrimo santrauką, AI sugeneruotų vaizdų sąrašą, likusius
TODO (Web3Forms raktas, domenas, žemėlapio koordinatės).

## 10. KO NEDARYTI
- ❌ Keisti sekcijų struktūrą ar puslapių rinkinį (jis jau geras).
- ❌ Palikti `PAKEISTI` / placeholder turinį ar nuotraukas.
- ❌ Identiškos paletės/šriftų kaip ankstesnio kliento.
- ❌ Apkarpytų nuotraukų galerijoje, angliškų likučių, sugadintų diakritikų.
- ❌ Išgalvotų faktų.
