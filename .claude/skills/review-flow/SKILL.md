---
name: review-flow
description: "Design and build automated post-job review request flows for service businesses. Actions: design flow, write SMS/email copy, pick tools, build Make.com scenario, set up Google Form trigger. Stack: Make.com, Twilio SMS, Google Forms, Google Sheets. Goal: get more Google/paslaugos.lt reviews on autopilot after job completion."
---
# Review Flow — Automated Post-Job Review Requests

Use when a client wants to automatically ask customers for reviews after completing a job.

## When to Apply

- Client has happy customers but few online reviews
- Client manually forgets to ask for reviews after jobs
- Setting up post-payment or post-job automations
- Building credibility infrastructure for a new business

## The Core Principle

The best time to ask for a review is 2–6 hours after job completion — while the result is visible and the emotion is fresh. Waiting until the next day drops conversion by ~50%.

---

## Trigger Options (pick one per client)

| Trigger | Best for | Setup effort |
|---------|----------|-------------|
| Owner fills Google Form: "job done" | Solo operators, no tech | 30 min |
| Stripe payment webhook | Clients who invoice digitally | 2h |
| Google Calendar event marked complete | Clients who schedule in Calendar | 1h |
| Manual WhatsApp message to a bot | Highest adoption, feels natural | 3h |

**Default recommendation**: Google Form trigger — zero friction, works on any phone, no app needed.

---

## Standard Flow (Google Form → Twilio SMS)

```
Trigger: Owner submits Google Form
  Fields: Client name, Client phone, Service done, Date

↓ Make.com receives form data (Google Sheets new row trigger)

↓ Wait 3 hours (Make.com Sleep module)

↓ Twilio: send SMS to client phone

↓ Log sent timestamp back to Google Sheet
```

**Total setup time**: ~2 hours
**Monthly cost**: ~€0.03/SMS + Make.com free tier (up to 1000 ops/month)

---

## SMS Copy Templates

### Lithuanian (service businesses — friendly tone)
```
Sveiki, [Vardas]! Šiandien buvo malonu dirbti pas jus 🌳
Jei buvote patenkinti mūsų darbu — vienas atsiliepimas padėtų labai:
[NUORODA]
Ačiū! — [Savininko vardas], ArbCut
```

### Lithuanian (more formal)
```
Sveiki, [Vardas]. Ačiū, kad pasirinkote ArbCut.
Jei darbu likote patenkinti, labai džiaugtumėmės dėl atsiliepimo:
[NUORODA]
Pagarbiai, Mantas Gerulis
```

### English (international clients)
```
Hi [Name], great working with you today!
If you're happy with the result, a quick review would mean a lot:
[LINK]
Thanks — [Owner name]
```

**Rules for SMS copy:**
- First line: reference the specific job or day — shows it's personal, not a blast
- One link only — never two CTAs
- Under 160 characters if possible (one SMS segment = lower cost)
- Never send after 20:00 or before 09:00

---

## Review URL Setup

| Platform | How to get the direct link |
|----------|---------------------------|
| Google Maps | Google Business Profile → "Get more reviews" → copy short link |
| paslaugos.lt | Profile → "Palikti atsiliepimą" button → copy URL |
| Facebook | Page → Reviews tab → copy URL |

**If client has no Google Business Profile yet**: use paslaugos.lt URL now, swap to Google later by updating the Make.com scenario — takes 2 minutes.

---

## Make.com Scenario Setup Steps

1. **Module 1**: Google Sheets — "Watch new rows" on the job log sheet
2. **Module 2**: Sleep — 3 hours (10800 seconds)
3. **Module 3**: Twilio — "Send an SMS"
   - To: `{{1.phone}}` (mapped from sheet column)
   - Body: template with `{{1.clientName}}` substitution
4. **Module 4**: Google Sheets — "Update a row" → write sent timestamp to column F

Filter: only run if column "SMS sent" is empty (prevents duplicate sends on sheet edits).

---

## Edge Cases to Handle

- **No phone number**: route to email fallback instead of SMS
- **Job cancelled**: add a "cancelled" column check — skip if true
- **Client already left a review**: no automatic way to detect; accept that ~10% will get a request they don't need — that's fine
- **Wrong number**: Twilio will return an error; log it to the sheet as "FAILED"

---

## Measuring Success

Track in Google Sheets:
- SMS sent date
- Review received (manually mark Y/N when checking profiles weekly)
- Target: 20–30% conversion rate from sent → review left is strong for SMS

If below 15%: test different timing (try 1h vs. 6h) or rewrite the copy — the link and timing matter more than the exact wording.
