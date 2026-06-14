---
name: lead-hunt
description: "Lead collection from Google Business Profile and paslaugos.lt by criteria. Searches, scores, and exports leads to a structured Excel file (.xlsx) with pipeline tracking and analytics sheet. Use when building a prospect list for a specific service type and region."
---

# Lead Hunt — GBP & Paslaugos.lt → Excel

Collects leads from Google Business Profile and paslaugos.lt, scores them, and writes a fully formatted `.xlsx` file with pipeline tracking and analytics.

## When to Apply

- Building a cold outreach list for a specific service niche + city
- Refreshing an existing lead list with new prospects
- Preparing for a sales sprint and need prioritised targets
- Researching how saturated a local market is

## Intake — Required Criteria

Always ask for (or extract from the prompt):
- **Service type** — e.g. "medžių priežiūra", "stogų dengimas", "valymo paslaugos"
- **City / region** — e.g. "Vilnius", "Kaunas", "visa Lietuva"
- **Target count** — how many leads to collect (default: 20)
- **Output path** — where to save the .xlsx (default: current directory, filename = `leads_[service]_[date].xlsx`)

Optional filters:
- Minimum GBP reviews threshold (default: none)
- Has website: yes / no / any (default: any — no-website leads scored higher)
- Source priority: GBP first / paslaugos.lt first / both equally (default: both)

---

## Search Process — Playwright Browser Scraper

**Primary method: generate and run a Python + Playwright script** that opens a real Chromium browser. This handles JavaScript-rendered pages (Google Maps, paslaugos.lt). Only fall back to WebSearch if Playwright fails to install.

### Step 0 — Setup Check & Script Generation

Always write a single Python scraper script (`lead_scraper.py`) and run it via Bash. The script must:

1. **Auto-install dependencies** on first run:
```python
import subprocess, sys

def install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", pkg], stdout=subprocess.DEVNULL)

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    install("playwright")
    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium", "--with-deps"])
    from playwright.sync_api import sync_playwright

try:
    import openpyxl
except ImportError:
    install("openpyxl")
    import openpyxl
```

2. **Accept criteria as variables at top of script:**
```python
SERVICE = "medžių priežiūra"   # filled from user prompt
CITY    = "Vilnius"             # filled from user prompt
TARGET  = 25                    # number of leads wanted
```

### Step 1 — paslaugos.lt Scrape (Playwright)

Navigate to paslaugos.lt search results for the service + city. Use headless Chromium.

```python
# Example URL pattern for paslaugos.lt search:
# https://www.paslaugos.lt/paslaugos/[category]?city=[city]
# Or use their search: https://www.paslaugos.lt/paieska?q=[service]&city=[city]
```

For each listing card on the results page, extract:
- Business name (`.provider-name` or similar)
- Rating + review count
- Profile URL
- Phone (may require clicking into profile page)
- Service tags

If the search results span multiple pages, paginate until TARGET is reached or pages run out.

### Step 2 — Google Maps Scrape (Playwright)

Navigate to `https://www.google.com/maps/search/[SERVICE]+[CITY]` using Playwright.

```python
# Scroll the results panel to load more listings
# Wait for `.Nv2PK` cards (Maps result cards) to appear
# For each card: click → wait for sidebar → extract details
```

From each Maps listing, extract:
- Business name
- Phone (click "Skambinti" / phone button)
- Website URL (if shown)
- Review count + rating
- Address

**Important:** add `page.wait_for_timeout(1500)` between actions to avoid rate limiting. If Google shows a CAPTCHA, fall back to WebSearch for that batch and note it in output.

### Step 3 — Cross-reference & Deduplicate
- Match by business name + phone to avoid duplicates
- If a business appears on both sources, mark Source as "GBP + Paslaugos.lt" and merge data
- Prefer paslaugos.lt phone if both sources differ

### Step 4 — Score Each Lead (1–5)

| Condition | Points |
|-----------|--------|
| No website at all | +2 |
| Website exists but looks outdated/bad | +1 |
| GBP reviews ≥ 20 (proven demand) | +1 |
| GBP rating 4.0–4.7 (not perfect = approachable) | +1 |
| Active on paslaugos.lt (has reviews there too) | +1 |
| Phone number found | +1 (required for outreach) |

Score 5 = 🔥 Hot, 3–4 = ✅ Warm, 1–2 = 🧊 Cold

**Priority rule:** No website + active reviews = hottest leads. They have real customers but zero digital infrastructure — easiest sell.

---

## Excel Output

Use Python with `openpyxl` to generate the file. Always write and execute a Python script.

### Sheet 1: "Pipeline"

Columns (in order):
| Column | Header | Notes |
|--------|--------|-------|
| A | # | Row number |
| B | Pavadinimas | Business name |
| C | Paslauga | Service type |
| D | Miestas | City |
| E | Telefonas | Phone number |
| F | Svetainė | Website URL or "—" |
| G | GBP Atsiliepimai | Review count (integer) |
| H | GBP Įvertinimas | Rating (e.g. 4.5) |
| I | GBP Nuoroda | Google Maps URL or "—" |
| J | Paslaugos.lt URL | Profile URL or "—" |
| K | Šaltinis | "GBP" / "Paslaugos.lt" / "Abu" |
| L | Balas | Lead score 1–5 |
| M | Kodėl Dabar | One-line reason to contact now |
| N | Statusas | "🆕 Naujas" (default for all new rows) |
| O | Pridėta | Date added (today's date) |
| P | Paskutinis Kontaktas | Empty (to be filled manually) |
| Q | Pastabos | Empty (to be filled manually) |

**Formatting rules:**
- Row 1: header row, bold, white text, dark blue fill (`1F3864`)
- Column widths: auto-fit to content, min 12
- Freeze row 1 and column A (freeze_panes = "B2")
- Alternate row colors: white and very light blue (`EBF3FF`)
- Score column: conditional color fill:
  - 5 = green fill (`C6EFCE`)
  - 3–4 = yellow fill (`FFEB9C`)
  - 1–2 = red fill (`FFC7CE`)
- Status column: data validation dropdown with options:
  `🆕 Naujas`, `📧 Susisiekta`, `💬 Atsakė`, `🤝 Derybos`, `✅ Laimėtas`, `❌ Prarastas`
- Add a "Table" (ListObject) so Excel can auto-filter

### Sheet 2: "Analitika"

Auto-calculated summary. Write with formulas referencing Sheet1 data.

Layout:
```
[A1] LEAD HUNT ATASKAITA        [bold, large, dark blue]
[A2] Sugeneruota: [today's date]
[A3] Paslauga: [service type]
[A4] Regionas: [city/region]

[A6] BENDRA SUVESTINĖ
[A7] Iš viso leadų:             [=COUNTA(Pipeline!B2:B1000)-1 or count]
[A8] Su telefonu:               [count where phone ≠ "—"]
[A9] Be svetainės:              [count where website = "—"]
[A10] Vidutinis balas:          [=AVERAGE(Pipeline!L2:L...)]

[A12] PAGAL ŠALTINĮ
[A13] GBP:                      [count]
[A14] Paslaugos.lt:             [count]
[A15] Abu:                      [count]

[A17] PAGAL BALĄ
[A18] 🔥 Karšti (5):            [count]
[A19] ✅ Šilti (3-4):           [count]
[A20] 🧊 Šalti (1-2):          [count]

[A22] PIPELINE STATUSAS
[A23] 🆕 Naujas:                [count]
[A24] 📧 Susisiekta:            [count]
[A25] 💬 Atsakė:               [count]
[A26] 🤝 Derybos:              [count]
[A27] ✅ Laimėtas:             [count]
[A28] ❌ Prarastas:            [count]
[A29] Konversija:              [Won / (Won+Lost) %]
```

Formatting:
- Section headers: bold, medium blue fill (`BDD7EE`)
- Value cells: right-aligned numbers
- Konversija: percentage format

### Sheet 3: "Kaip Naudoti"

Simple instructions in Lithuanian:
```
Kaip naudoti šį failą:
1. Pipeline lape — filtruok pagal Balą (Z→A) ir pradėk nuo karštiausių
2. Susisiekus — pakeisk Statusą į "📧 Susisiekta" ir įrašyk datą
3. Analitika lape — seka tavo pipeline konversiją automatiškai
4. Naujus leadus — pridėk apačioje laikydamasis tos pačios struktūros
5. Filtrai — spustelk ant stulpelio pavadinimo ir filtruok pagal miestą, balą ar statusą
```

---

## Full Python Script Structure

Write the complete script as `lead_scraper.py`, then run it with `python lead_scraper.py`. Structure:

```python
# ─── 1. DEPS ────────────────────────────────────────────────
import subprocess, sys
def install(pkg):
    subprocess.check_call([sys.executable, "-m", "pip", "install", pkg], stdout=subprocess.DEVNULL)
try:
    from playwright.sync_api import sync_playwright
except ImportError:
    install("playwright")
    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium", "--with-deps"])
    from playwright.sync_api import sync_playwright
try:
    import openpyxl
except ImportError:
    install("openpyxl"); import openpyxl
from openpyxl.styles import PatternFill, Font, Alignment
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.utils import get_column_letter
from datetime import date

# ─── 2. CRITERIA ────────────────────────────────────────────
SERVICE = "..."   # from user prompt
CITY    = "..."   # from user prompt
TARGET  = 20

# ─── 3. SCRAPE ──────────────────────────────────────────────
leads = []

def scrape_paslaugos(pw):
    browser = pw.chromium.launch(headless=True)
    page = browser.new_page()
    # navigate, scroll, extract → append to leads[]
    browser.close()

def scrape_gbp(pw):
    browser = pw.chromium.launch(headless=True)
    page = browser.new_page()
    # navigate maps, scroll panel, click each card → append to leads[]
    browser.close()

with sync_playwright() as pw:
    scrape_paslaugos(pw)
    scrape_gbp(pw)

# deduplicate by (name, phone)
seen = set()
unique_leads = []
for l in leads:
    key = (l["name"].lower(), l["phone"])
    if key not in seen:
        seen.add(key)
        unique_leads.append(l)
leads = unique_leads[:TARGET]

# ─── 4. SCORE ───────────────────────────────────────────────
def score_lead(l):
    s = 0
    if l["website"] == "—": s += 2
    elif "wix" in l["website"] or "facebook" in l["website"]: s += 1
    if l["gbp_reviews"] >= 20: s += 1
    if 4.0 <= l["gbp_rating"] <= 4.7: s += 1
    if l["paslaugos_url"] != "—": s += 1
    if l["phone"] != "—": s += 1
    return min(s, 5)

for l in leads:
    l["score"] = score_lead(l)
leads.sort(key=lambda x: x["score"], reverse=True)

# ─── 5. EXCEL ───────────────────────────────────────────────
# (full openpyxl code per spec: Pipeline sheet, Analitika sheet, Kaip Naudoti sheet)

output_path = f"leads_{SERVICE.replace(' ','_')}_{date.today()}.xlsx"
wb.save(output_path)
print(f"✅ Išsaugota: {output_path} ({len(leads)} leadų)")
```

---

## Output Principles

- Never fabricate phone numbers or review counts — mark unknown as "—"
- If a business has no phone visible online, still include them but note "Tel. nerastas" in Pastabos
- Always mark data confidence: add "[?]" suffix to any field that is a guess
- Target count is a goal, not a hard limit — quality over padding
- If fewer than target found, say so and explain why (market may be small)
- Save file to the current working directory unless user specifies otherwise
- Report: total found, breakdown by source, top 3 hottest leads by name

## Example Prompts

- `/lead-hunt medžių priežiūra Vilnius 25 leadų`
- `/lead-hunt stogų dengimas Kaunas`
- `/lead-hunt valymo paslaugos visa Lietuva 50`
- `/lead-hunt santechnikos paslaugos Klaipėda — tik be svetainės`
