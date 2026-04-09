# Aesthetica — Font Size System Prompt

Apply this font size system **globally across every page, section, and component**. Font families are already configured — do not change them. Only enforce sizes, weights, line heights, and colors below.

---

## Core Scale

```css
:root {
  /* Desktop sizes */
  --text-display: 48px;
  --text-h1: 36px;
  --text-h2: 28px;
  --text-h3: 18px;
  --text-h4: 15px;
  --text-body-lg: 16px;
  --text-body: 14px;
  --text-label: 11px;
  --text-caption: 11px;
  --text-price: 20px;
  --text-price-mrp: 14px;
  --text-discount: 12px;
  --text-stats: 36px;
  --text-button: 14px;
  --text-nav: 14px;
  --text-badge: 10px;
}

@media (max-width: 768px) {
  :root {
    --text-display: 32px;
    --text-h1: 26px;
    --text-h2: 22px;
    --text-h3: 16px;
    --text-h4: 14px;
    --text-body-lg: 15px;
    --text-body: 14px;
    --text-price: 18px;
    --text-stats: 28px;
    --text-nav: 15px;
  }
  /* All other vars stay the same on mobile */
}
```

---

## Role Reference Table

| Role | Desktop | Mobile | Weight | Line Height |
|---|---|---|---|---|
| Display (hero headline) | 48px | 32px | 600 | 1.15 |
| H1 (page title) | 36px | 26px | 600 | 1.25 |
| H2 (section title) | 28px | 22px | 500 | 1.3 |
| H3 (card title) | 18px | 16px | 600 | 1.4 |
| H4 (widget title) | 15px | 14px | 600 | 1.4 |
| Body large (hero sub, intro) | 16px | 15px | 400 | 1.75 |
| Body default (paragraphs) | 14px | 14px | 400 | 1.75 |
| Label / eyebrow | 11px | 11px | 500 | 1.4 |
| Caption / disclaimer | 11px | 11px | 400 | 1.6 |
| Nav link | 14px | 15px | 400 | 1 |
| Button | 14px | 14px | 500 | 1 |
| Badge / category tag | 10px | 10px | 500 | 1 |
| Price (sale) | 20px | 18px | 600 | 1 |
| Price (MRP strikethrough) | 14px | 14px | 400 | 1 |
| Discount label | 12px | 12px | 500 | 1 |
| Stats number (25+, 1500+) | 36px | 28px | 600 | 1 |
| Stats label | 11px | 11px | 500 | 1.4 |

---

## Section-by-Section Sizes

### Navbar
- Logo: **18px**, weight 600
- Nav links: **14px**, weight 400 · active: weight 500

### Hero Section
- Eyebrow tag: **10px**, weight 500, uppercase, letter-spacing 0.1em
- Headline: **48px** desktop · **32px** mobile, weight 600
- Subtext: **16px**, weight 400, line-height 1.75
- CTA button: **14px**, weight 500

### Tagline / "Why From Us" Section
- Large centered text: **36px** desktop · **24px** mobile, weight 500
- Do NOT exceed 40px here — it breaks mobile layout
- Bullet tags (Premium Wood · Eco-Friendly): **11px**, weight 500, uppercase

### Product Catalog / Cards
- Section eyebrow: **10px**, uppercase, letter-spacing 0.1em
- Section title: **28px** desktop · **22px** mobile, weight 500
- Product name: **13px**, weight 500, max 2 lines
- Category tag: **10px**, weight 500, uppercase
- Sale price: **16px**, weight 600
- MRP strikethrough: **12px**, weight 400
- Discount badge: **11px**, weight 500
- "See Details" button: **13px**, weight 500

### Testimonials
- Section eyebrow: **10px**, uppercase
- Section title: **28px** desktop · **22px** mobile, weight 500
- Quote text: **18px**, weight 500, italic
- Reviewer name: **14px**, weight 500
- Reviewer role: **12px**, weight 400

### Stats / Experience Section
- Headline: **36px** desktop · **26px** mobile, weight 600
- Body paragraph: **14px**, weight 400
- Stat number: **36px** desktop · **28px** mobile, weight 600
- Stat label: **11px**, weight 500, uppercase, letter-spacing 0.08em

### Contact Section
- Eyebrow: **10px**, uppercase, letter-spacing 0.1em
- "Get in Touch" headline: **36px** desktop · **26px** mobile, weight 600
- Sub-headline: **16px**, weight 400
- Office detail labels (OUR STUDIO, EMAIL US): **10px**, weight 500, uppercase
- Office detail values: **14px**, weight 400
- Form field labels: **11px**, weight 500, uppercase
- Form input text: **14px**
- Send button: **14px**, weight 500

### Footer
- Brand name: **18px**, weight 600
- Tagline: **13px**, weight 400
- Column headings: **13px**, weight 600, uppercase, letter-spacing 0.06em
- Footer links: **13px**, weight 400
- Newsletter heading: **14px**, weight 500
- Newsletter sub: **12px**, weight 400
- Copyright: **11px**, weight 400
- Watermark "AESTHETICA": decorative only, opacity 0.08, do not treat as a heading

---

## Hard Rules

- **Minimum body size: 14px** — never go below this for readable content
- **Minimum label size: 10px** — never go below this for any text
- **Maximum hero headline: 48px desktop, 32px mobile** — do not exceed
- **Tagline / statement sections: max 36px** — not 60–80px
- **Product names: always truncate at 2 lines** using `overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical`
- **Weights allowed: 400, 500, 600 only** — never use 300, 700, or 800
- **Line height for all headings: 1.15–1.3** — never 1.0 for multi-line headings
- **Line height for all body text: 1.75** — never below 1.5

---

## Quick Reference

```
Display       48px / 32px   weight 600
H1            36px / 26px   weight 600
H2            28px / 22px   weight 500
H3            18px / 16px   weight 600
Body          14px / 14px   weight 400
Label         11px / 11px   weight 500  UPPERCASE
Caption       11px / 11px   weight 400
Price         20px / 18px   weight 600
Stat number   36px / 28px   weight 600
Button        14px / 14px   weight 500
Badge         10px / 10px   weight 500
```

---

*Aesthetica Font Size System · v1.0 · desktop / mobile · weights only — font families unchanged*
