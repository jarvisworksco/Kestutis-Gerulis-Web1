---
name: automate
description: "Design and build automations for service businesses. Actions: map workflow, design automation, pick tools, write webhook handler, draft Make/n8n scenario. Use cases: lead routing, review requests, job completion triggers, SMS follow-ups, form-to-CRM flows. Stack: Make.com, Twilio, Web3Forms webhooks, Google Sheets as lightweight CRM."
---
# Automate — Service-Business Automation Design

Use when designing or building automations for client businesses or your own workflows.

## When to Apply

- Client asks "how do I stop doing X manually every time?"
- You need to connect two tools (form → SMS, payment → review request, etc.)
- Building a review request flow after job completion
- Routing leads from a website form to the right person

## Tool Selection Guide

| Need | Tool | Why |
|------|------|-----|
| Visual workflow builder | Make.com | Best for non-devs, rich integrations, Lithuanian-friendly pricing |
| SMS to clients | Twilio | Cheapest per SMS, API simple, LT numbers available |
| WhatsApp to clients | Twilio WhatsApp API | Higher open rate than SMS in LT |
| Email automation | Resend or Brevo | Resend = devs, Brevo = non-devs |
| Lightweight CRM / lead tracking | Google Sheets | Zero cost, easy for client to manage |
| Heavy CRM | HubSpot free tier | Only if client needs pipeline view |
| Payment trigger | Stripe webhooks | Most reliable payment event source |
| Job completion trigger | Simple Google Form | Client marks job done → triggers flow |

## Core Automation Patterns

### Pattern 1: Website Form → SMS Notification
Trigger: Web3Forms webhook (add webhook URL in Web3Forms dashboard)
Flow:
1. Web3Forms receives submission → sends webhook to Make.com
2. Make parses: name, phone, message, city
3. Sends SMS via Twilio to business owner: "Nauja užklausa: [Vardas], [tel], [žinutė]"
4. (Optional) Appends row to Google Sheets

Cost: ~€0.03/SMS (Twilio LT number)

### Pattern 2: Post-Job Review Request
Trigger: Owner fills simple Google Form: "Job completed" + client phone
Flow:
1. Google Form submit → Google Apps Script or Make.com
2. Wait 4 hours (Make.com sleep module)
3. Send SMS via Twilio: "Sveiki [Vardas], ačiū už pasitikėjimą! Jei buvote patenkinti — vienas atsiliepimas padėtų labai: [Google Maps URL]"
4. Log sent timestamp to Google Sheets

Setup time: ~2 hours. No code needed if using Make.com.

### Pattern 3: Lead Qualification + Routing
Trigger: Form submission with service type field
Flow:
1. Webhook → Make.com
2. Filter: if service = "emergency" → immediate SMS to owner
3. If service = "quote" → add to Google Sheets queue + send confirmation email to lead
4. If outside service area → auto-reply with referral message

### Pattern 4: Payment → Onboarding
Trigger: Stripe `payment_intent.succeeded` webhook
Flow:
1. Stripe → Make.com webhook module
2. Extract customer email + amount + product
3. Send welcome email (Resend/Brevo template)
4. Create row in Google Sheets (client name, date, service, paid amount)
5. (Optional) Send internal Slack/Telegram notification

## Design Process

When asked to design an automation:
1. **Map the manual process first** — what does the human do step by step today?
2. **Find the trigger** — what event starts the chain? (form, payment, calendar, manual button)
3. **Identify the bottleneck** — which step takes the most time or gets forgotten?
4. **Choose the simplest stack** — Make.com + Google Sheets beats a custom app for most service businesses
5. **Output a flow diagram in text** — Trigger → Step 1 → [condition] → Step 2a / Step 2b → End
6. **Estimate setup time** — be honest: Make.com flows take 1–4h, custom webhooks 4–8h

## Automation Spec Output Format

When designing an automation, always output:
```
Trigger: [what starts it]
Tools needed: [list]
Steps: [numbered flow with conditions]
Edge cases: [what breaks it]
Setup time: [honest estimate]
Monthly cost: [€ estimate]
```

## Common Gotchas
- Make.com free tier: 1000 operations/month — enough for ~50 automations. Paid from €9/mo.
- Twilio LT numbers need a local address for registration — use client's address
- Web3Forms webhooks require a Pro plan ($0/mo for 250 submissions, webhook needs checking their current plan)
- Google Apps Script has a 6-minute execution timeout — don't use for long chains
- Always test with real phone numbers before handing to client
