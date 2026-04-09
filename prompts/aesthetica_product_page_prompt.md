# Aesthetica — Product Detail Page · Redesign Prompt

## Overview
Redesign the product detail page for **Aesthetica**, a premium home furniture e-commerce brand. The page must look clean, legitimate, and polished — inspired by brands like Pepperfry, Urban Ladder, and IKEA.

---

## Layout Structure

### 1. Breadcrumb
- Single line: `Home › Residential › Center Table`
- Font size: 12px, muted color
- Placed above the hero grid

---

### 2. Hero Section (Two-column grid)

#### Left Column — Image Gallery
- One large main product image (rounded corners, full width)
- Row of 3 thumbnail images below the main image
- Active thumbnail has a highlighted border
- Clicking a thumbnail swaps the main image

#### Right Column — Product Info
In this exact order, with no extra spacing between blocks:

1. **Brand + Rating row**
   - Brand name in small uppercase (e.g. `NSTAYY`)
   - Star rating (★★★★★) and score (e.g. `5.0`) inline

2. **Product title**
   - Shortened, readable title (not keyword-stuffed)
   - Font size: 20px, weight 500

3. **Price block**
   - Sale price (large, e.g. `₹18,000`)
   - Strikethrough MRP (e.g. `₹20,000`)
   - Green savings badge (e.g. `Save 10%`)
   - Sub-text: `Incl. GST · Delivery & installation extra` in 12px muted

4. **Specs grid (2×2 card layout)**
   - Cards: Dimensions, Weight, Material, Max Load
   - Each card has a small label and a value
   - Background: secondary surface color, rounded 8px

5. **Trust badges row**
   - Three items in a single bordered pill: Quality Assured · Fast Delivery · Reliable Support
   - Each separated by an internal border-right

6. **Quote / Enquiry form (inside a card)**
   - Title: `✉ Request a quote`
   - Fields: Full Name + Contact Phone (side by side), then Requirements (textarea)
   - Submit button: dark, full width, `✈ Submit enquiry`
   - Disclaimer: `By submitting, you agree to our Privacy Policy.` in 10px muted

---

### 3. Tabs Section
Three tabs: `Description`, `Specifications`, `Reviews (0)`
- Active tab has a warm accent underline (e.g. `#B4623A`)
- Description tab content: 2–3 clean paragraphs, no duplicate text, no highlighted/colored body text

---

### 4. Frequently Bought Together
Horizontal layout:
- Left: item thumbnails with `+` between them and product labels below
- Right: total bundle price + `Select bundle` CTA button
- Contained in a light card with border

---

### 5. Related Products Grid
- Section title: `Related products · free delivery on eligible orders`
- Responsive card grid: `repeat(auto-fill, minmax(150px, 1fr))`
- Each card: product image (100px height), category tag, name, price
- Borders: 0.5px, rounded 8px corners

---

## Design Tokens

| Token | Value |
|---|---|
| Font | System sans-serif (var(--font-sans)) |
| Border | 0.5px solid, muted |
| Card radius | 8px (specs), 10px (larger cards) |
| Accent color | `#B4623A` (teak/warm brown) |
| Button bg | `#1a1a1a` (near black) |
| Body text size | 14px, line-height 1.8 |
| Label text | 11px uppercase, letter-spacing 0.06em |
| Price size | 26px, weight 500 |

---

## Rules

- **No keyword-stuffed product titles** — shorten to readable form
- **No duplicate paragraphs** in description
- **No colored/highlighted body text** (looks like an error state)
- **No excessive vertical whitespace** between sections
- **No floating icons** without a containing layout element
- Breadcrumb, specs, and trust badges must be compact and single-line where possible
- Thumbnails must be interactive (click to swap main image)
- All prices must include GST disclaimer
- Form must have side-by-side fields for name + phone to save space

---

## Page Sections Order

```
Breadcrumb
↓
Hero Grid (Image Gallery | Product Info)
↓
Tabs (Description / Specifications / Reviews)
↓
Frequently Bought Together
↓
Related Products Grid
```

---

## Sample Product Data (replace with actual data)

```json
{
  "brand": "NSTAYY",
  "rating": 5.0,
  "title": "Home Furniture Wooden Center Coffee Table — Natural Teak Finish",
  "price": 18000,
  "mrp": 20000,
  "currency": "₹",
  "specs": {
    "dimensions": "89D × 46W × 42H cm",
    "weight": "18 kg",
    "material": "Sheesham Wood",
    "max_load": "100 kg"
  },
  "bundle_price": 58000,
  "bundle_items": ["Center Table", "5-Seater Sofa Set"]
}
```

---

*Generated for Aesthetica · architectapp.vercel.app*
