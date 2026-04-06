# 🌐 PRODUCT MODULE — USER (PUBLIC) DOCUMENTATION

> **Interlinked with:** [`PRODUCT_ADMIN.md`](./PRODUCT_ADMIN.md)
> Every element on this page is configured by SUPER_ADMIN. Section numbers (1–6) match exactly with admin form sections in `PRODUCT_ADMIN.md`.

---

# 🧭 PAGE OVERVIEW

- Public product detail page — no authentication required
- Route: `/products/:id`
- Page is only visible if product status = **ACTIVE** (configured by admin)
- All content sourced from admin-configured product data

---

---

# 1️⃣ BREADCRUMB NAVIGATION

> **Admin source:** [`PRODUCT_ADMIN.md → Section 1 → category + subCategory`](./PRODUCT_ADMIN.md#-section-1--basic-info)

```
Home  ›  Category  ›  Sub-Category  ›  Product Title
```

| Crumb          | Source Field (Admin)    | Behaviour                              |
| -------------- | ----------------------- | -------------------------------------- |
| Home           | Static                  | Links to `/`                           |
| Category       | `category` field        | Links to `/products?category=…`        |
| Sub-Category   | `subCategory` field     | Links to `/products?subCategory=…`     |
| Product Title  | `title` field           | Current page — no link, text only      |

**UX:**
- Full-width strip, light background
- Font: 11px, muted secondary color
- Current product name highlighted in primary text color

---

---

# 2️⃣ MAIN PRODUCT PANEL — LEFT: IMAGES | RIGHT: INFO + CTA

> **Admin source:** [`PRODUCT_ADMIN.md → Sections 1, 2, 3`](./PRODUCT_ADMIN.md#-section-1--basic-info)

---

## 🖼️ Left Panel — Image Gallery

> Powered by admin fields: `imageUrl` (main) + `additionalImages[]` (thumbnails)

| Element            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| Main image         | Large display of `imageUrl` — fills left panel                 |
| Thumbnail strip    | Row of small squares: image 1 (active, blue border), 2, 3, 360° |
| Active state       | Selected thumbnail gets `border: 1.5px solid #185FA5`          |
| Click behaviour    | Clicking thumbnail swaps the main image                        |
| 360° slot          | Optional — shown if 360° image URL is in `additionalImages`    |

**UX:**
- Image background fill: `#F1EFE8` (warm gray placeholder)
- Thumbnail size: 46×46px
- Smooth swap on thumbnail click (no page reload)

---

## ℹ️ Right Panel — Product Info + CTA

### Badges (top of right panel)

> Powered by: `isBestProduct` + `stock` fields

| Badge        | Condition                      | Style                                          |
| ------------ | ------------------------------ | ---------------------------------------------- |
| Best Seller  | `isBestProduct = true`         | Blue pill — bg `#E6F1FB`, text `#0C447C`       |
| In Stock     | `stock > 0`                    | Green pill — bg `#EAF3DE`, text `#27500A`      |
| Out of Stock | `stock = 0`                    | Gray pill — bg secondary, text secondary       |

---

### Product Identity

> Powered by: `title`, `companyName`, `sku`, reviews relation

| Element    | Source Field   | Style                                      |
| ---------- | -------------- | ------------------------------------------ |
| Title      | `title`        | 15px, font-weight 500, primary color       |
| Brand line | `companyName`  | 11px — "by [Brand]" in blue `#185FA5`      |
| SKU        | `sku`          | 11px — "SKU: [sku]" muted secondary color  |
| Rating     | reviews count  | Gold stars `#BA7517` + "(X reviews)" muted |

---

### Price Block

> Powered by: `mrp`, `discountPercentage`, `price` (all from admin pricing section)

| Element       | Source Field       | Style                                              |
| ------------- | ------------------ | -------------------------------------------------- |
| Sale Price    | `price`            | 20px, font-weight 500 — large and prominent        |
| MRP           | `mrp`              | 11px, strikethrough — "M.R.P: ~~₹XX,XXX~~"        |
| Savings badge | `discountPercentage` | Green `#3B6D11` — "Save X%"                     |
| Tax note      | Static             | 10px muted — "Inclusive of taxes \| Free delivery" |

> Price block sits inside a secondary-background rounded card (`border-radius: 7px`, `padding: 10px 12px`)

---

### Variant Selector

> Powered by: `customFields` — admin adds colour/material swatches as custom fields

| Element         | Description                                             |
| --------------- | ------------------------------------------------------- |
| Label           | "Color" or "Material" (from customField label)          |
| Swatches        | Circular colour dots (22×22px, `border-radius: 50%`)    |
| Selected state  | Active swatch gets `border: 2px solid #185FA5`          |
| Click behaviour | Selecting swatch updates active state                   |

---

### Quantity Selector

| Element     | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| Label       | "Qty:" — 11px, font-weight 500                                  |
| Controls    | `−` button / quantity number / `+` button in a bordered row     |
| Default     | Starts at 1                                                     |
| Min         | 1 (cannot go below 1)                                           |
| Max         | Capped at available `stock`                                     |

---

### CTA Buttons

| Button      | Style                                               | Action                              |
| ----------- | --------------------------------------------------- | ----------------------------------- |
| Add to cart | Full-width, bg `#185FA5`, white text, radius 7px    | Adds selected qty to cart           |
| Buy now     | Full-width, bg secondary, border, radius 7px        | Skips cart → goes to checkout       |

---

### Secondary Actions (below CTA buttons)

| Action      | Icon  | Behaviour                            |
| ----------- | ----- | ------------------------------------ |
| Wishlist    | ♡     | Save product to wishlist             |
| Share       | ↑     | Copy link / share sheet              |
| Easy returns| ↩     | Links to returns policy page         |

---

---

# 3️⃣ KEY HIGHLIGHTS STRIP — SPANS FULL WIDTH

> **Admin source:** [`PRODUCT_ADMIN.md → Section 4 → Custom Fields (label values)`](./PRODUCT_ADMIN.md#-section-4--key-highlights-custom-fields)

- Full-width strip below the main panel
- Displays the **first 4–6 custom field labels** as tick-mark highlights
- 2-column grid layout

```
✓  [customField[0].label]        ✓  [customField[1].label]
✓  [customField[2].label]        ✓  [customField[3].label]
```

**Example (from HTML):**
```
✓  Industry-leading noise cancellation     ✓  30-hour battery life
✓  Multipoint connection (2 devices)       ✓  Speak-to-chat technology
```

| Element        | Style                                                  |
| -------------- | ------------------------------------------------------ |
| Tick icon      | `✓` in green `#3B6D11`, font-weight 500                |
| Text           | 11px, muted secondary color                            |
| Container      | `padding: 12px 16px`, border-top on strip              |
| Grid           | `grid-template-columns: 1fr 1fr`, gap 5px              |

---

---

# 4️⃣ DETAIL TABS — OVERVIEW / SPECS / REVIEWS / Q&A

> **Admin source:** [`PRODUCT_ADMIN.md → Sections 4 & 5`](./PRODUCT_ADMIN.md#-section-4--key-highlights-custom-fields)

Tab bar sits below the highlights strip. One tab active at a time. Active tab has `border-bottom: 2.5px solid #185FA5`, text `#185FA5`, weight 500.

---

## Tab 1 — Overview (default active)

> Powered by: `description` field + `customFields[]`

### Highlights (left column)

> Pulled from `customFields[].label` — displayed as a bulleted list

```
✓  Industry-leading NC — 2 processors + 8 mics
✓  30-hr battery, 3 min charge = 3 hrs
✓  Multipoint — 2 devices simultaneously
✓  Speak-to-chat auto pause
✓  Lightweight 250g redesigned frame
```

### In the box (right column)

> Pulled from `customFields[]` where label = "In the box" or similar

```
·  [Product name]
·  USB-C charging cable
·  3.5mm audio cable
·  Carrying case
·  Quick start guide
```

### Warranty (right column, below "In the box")

> Pulled from `warranty` field

```
1 year manufacturer warranty · 30-day free returns
```

**Layout:** 2-column grid (`grid-template-columns: 1fr 1fr`, gap 16px)

---

## Tab 2 — Specs

> Powered by: `customFields[]` — all label + content pairs rendered as spec rows

Each row:
- Background: secondary color, border-radius 6px, padding `7px 10px`
- Left: label (11px, muted secondary)
- Right: value (11px, primary color, font-weight 500)

**Example (from HTML):**

| Label        | Value             |
| ------------ | ----------------- |
| Weight       | 250g              |
| Battery      | 30 hrs            |
| Bluetooth    | 5.2               |
| Codec        | LDAC, AAC, SBC    |
| Driver       | 30mm              |
| Multipoint   | Yes (2 devices)   |
| Charging     | USB-C             |
| Quick charge | 3 min = 3 hrs     |

**Layout:** 2-column grid, gap 6px

---

## Tab 3 — Reviews

> Powered by: `reviews` relation (from testimonials / reviews model)

### Rating Summary (top)

| Element       | Description                                              |
| ------------- | -------------------------------------------------------- |
| Score         | Large number (36px, font-weight 500) — e.g. "4.8"       |
| Stars         | 5-star row in gold `#BA7517`                             |
| Count         | "X,XXX ratings" muted below stars                       |
| Rating bars   | 5★ to 1★ — each row: star label + progress bar + %      |

**Rating bar colors:**
- 5★ → Green `#639922`
- 4★ → Green `#639922`
- 3★ → Amber `#BA7517`
- 2★ → Coral `#D85A30`
- 1★ → Red `#E24B4A`

### Individual Review Cards

Each card (`border: 0.5px solid border-tertiary`, radius 8px, padding 12px):

| Element        | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| Avatar         | Initials circle (26×26px) — unique bg/text color per reviewer |
| Reviewer name  | 12px, font-weight 500                                         |
| Verified badge | "Verified" — bg `#EAF3DE`, text `#27500A`, radius 8px         |
| Date           | 10px, muted — top-right of card                               |
| Stars          | Gold star row, 11px                                           |
| Review title   | 12px, font-weight 500 (quoted)                                |
| Review body    | 11px, secondary color, line-height 1.6                        |
| Helpful row    | "Helpful? Yes (X) · No (X)" — Yes in blue `#185FA5`          |

---

## Tab 4 — Q&A

> Powered by: questions submitted by users + answers from admin

### Ask a Question (top)

- Text input: "Ask a question about this product…" (`flex: 1`, border, radius 7px)
- Submit button: bg `#185FA5`, white text, radius 7px

### Q&A Cards

Each card (bg secondary, radius 8px, padding 12px):

| Element | Description                                                          |
| ------- | -------------------------------------------------------------------- |
| Q badge | "Q" — bg `#E6F1FB`, text `#0C447C`, radius 6px, font-weight 500     |
| Q text  | 12px, font-weight 500, primary color                                 |
| A badge | "A" — bg `#EAF3DE`, text `#27500A`, radius 6px, font-weight 500     |
| A text  | 11px, secondary color, line-height 1.6, attributed source at end     |

---

---

# 5️⃣ FREQUENTLY BOUGHT TOGETHER — BUNDLE UPSELL

> **Admin source:** [`PRODUCT_ADMIN.md → Section 6 → Bundle Products`](./PRODUCT_ADMIN.md#-section-6--bundle-products-frequently-bought-together)

**Layout:** Horizontal flex row — This item + Accessory 1 + Accessory 2 → Total + CTA

### Bundle Items Row

Each item block:

| Element      | Description                                      |
| ------------ | ------------------------------------------------ |
| Image box    | 70×70px image — "This item" has blue border `#185FA5` |
| Product name | 10px, muted secondary                            |
| Price        | 11px, font-weight 500, primary color             |
| Separator    | `+` between each item — 18px, light weight       |

### Total + CTA (right side, `margin-left: auto`)

| Element       | Description                                              |
| ------------- | -------------------------------------------------------- |
| Original total| Strikethrough — "Total: ~~₹XX,XXX~~" muted 11px         |
| Bundle price  | 14px, font-weight 500 — "₹XX,XXX"                       |
| Savings       | "Save ₹X,XXX" — green `#3B6D11`, 10px, inline           |
| CTA button    | "Add all 3 to cart" — bg `#185FA5`, white, radius 7px, padding `8px 16px` |

---

---

# 6️⃣ RELATED PRODUCTS — CUSTOMERS ALSO VIEWED

> **Admin source:** [`PRODUCT_ADMIN.md → Section 7 → Related Products`](./PRODUCT_ADMIN.md#-section-7--related-products)

---

## Sub-section A — Customers Also Viewed

**Header row:**
- Left: "Customers also viewed" — 14px, font-weight 500
- Right: "See all ›" — 12px, blue `#185FA5`, clickable

**Grid:** `repeat(4, minmax(0, 1fr))`, gap 10px

### Product Card (rel-card)

| Element       | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| Image         | 90px height, full-width, warm gray bg `#F1EFE8`               |
| Brand label   | 10px, muted secondary — above product name                    |
| Product name  | 12px, font-weight 500, line-height 1.4                        |
| Stars         | Gold star row, 11px + rating number (10px muted)              |
| Sale price    | 13px, font-weight 500, primary color                          |
| MRP           | 10px, strikethrough muted + "X% off" in green `#3B6D11`       |
| Delivery      | "Free delivery" — 10px, green `#3B6D11`                       |
| Add to Cart   | Full-width button — secondary bg + border (default) or blue bg (Most Popular) |

### "Most Popular" card variant

- Card border: `2px solid #185FA5` (instead of 0.5px)
- Top banner: "Most popular" — bg `#E6F1FB`, text `#0C447C`, centered, 10px
- Add to Cart button: bg `#185FA5`, white text (instead of secondary)

### Card Hover State

- `border-color: #185FA5` on hover (transition 0.15s)

---

## Sub-section B — From the Same Brand

> Powered by: `companyName` field — shows other products with same `companyName`

**Header row:**
- Left: "From the same brand" — 14px, font-weight 500
- Right: "See all [Brand] ›" — 12px, blue `#185FA5`

**Grid:** `repeat(4, minmax(0, 1fr))`, gap 10px — smaller cards

### Compact Card

| Element      | Description                          |
| ------------ | ------------------------------------ |
| Image        | 70px height, full-width              |
| Product name | 11px, font-weight 500, line-height 1.4 |
| Stars        | Gold star row, 10px                  |
| Price        | 12px, font-weight 500, primary color |

---

---

# 🔒 PAGE FOOTER STRIP

Full-width, secondary background, `padding: 12px 16px`, centered flex row:

| Trust Signal          | Icon | Text                         |
| --------------------- | ---- | ---------------------------- |
| Secure payments       | 🔒   | "Secure payments"            |
| Free delivery         | 📦   | "Free delivery over ₹499"    |
| Easy returns          | ↩    | "30-day returns"             |
| Customer support      | 📞   | "24/7 customer support"      |

Style: 11px, muted secondary color, `gap: 20px`, wraps on narrow screens

---

---

# 📩 QUOTATION / SPECIFICATION ENQUIRY FORM

> **Admin receives at:** [`PRODUCT_ADMIN.md → Quotation Management`](./PRODUCT_ADMIN.md#-admin--quotation-management----adminquotations)

**Heading:** "Have a custom requirement? Request a quote"
**Placement:** Below main product panel, above bundle upsell

| Field            | UI Element | Placeholder / Note      | Validations            |
| ---------------- | ---------- | ----------------------- | ---------------------- |
| customerName     | Text input | Your name               | Required               |
| customerEmail    | Email input| Your email              | Required, email format |
| customerPhone    | Tel input  | Your phone (optional)   | Optional               |
| message          | Textarea   | Describe your custom requirement | Required, min 20 chars |

### Actions

- **Send Enquiry** — submits form, creates Quotation record in DB with `status: PENDING`
- **Cancel / Clear**

### UX

- Inline validation on blur
- Disable button while submitting
- Success message: "Your enquiry has been sent. We'll get back to you with a quote shortly."
- Error toast on failure
- Submitted enquiry appears in admin at `/admin/quotations` with status PENDING

---

---

# 📱 RESPONSIVE DESIGN

## Desktop
- Full 2-column layout (images left, info right)
- 4-column related products grid
- Tab bar visible in full

## Tablet
- 2-column layout maintained but compressed
- Related products: 2-column grid

## Mobile
- Stack: images full-width, then info below
- Tab bar scrollable horizontally
- Related products: horizontal scroll row
- Bundle upsell: stacked vertically
- Footer trust signals: 2-column grid

---

# ⚡ LOADING & EMPTY STATES

## Page Loading
- Skeleton placeholder for main image (left panel)
- Skeleton lines for title, price, badges (right panel)
- Skeleton rows for spec tab
- Skeleton cards for related products grid

## Empty States
- No reviews → "Be the first to review this product" + CTA
- No Q&A → "No questions yet — ask the first one"
- No related products → section hidden

---

# 🔔 FEEDBACK SYSTEM

- Add to Cart → success toast "Added to cart"
- Wishlist → success toast "Saved to wishlist"
- Quotation form submit → inline success message
- Q&A submit → success toast
- All errors → error toast

---

# ✅ USER PAGE FINAL RESULT

✔ Breadcrumb navigation — auto-built from category + subCategory + title
✔ Main product panel — images (primary + thumbnails), badges, title, brand, SKU, pricing, variant swatches, qty selector, Add to Cart, Buy Now, secondary actions
✔ Key highlights strip — first 4–6 custom field labels with ✓ ticks
✔ Detail tabs — Overview (highlights + in-the-box + warranty) / Specs (custom field table) / Reviews (rating bars + review cards) / Q&A (submit question + answer cards)
✔ Quotation / custom enquiry form — sends to admin quotation management
✔ Frequently bought together — bundle items row + total + "Add all 3 to cart"
✔ Related products — "Customers also viewed" 4-col grid (with "Most popular" card) + "From the same brand" compact grid
✔ Page footer trust strip
✔ Responsive (desktop / tablet / mobile)
✔ All sections interlinked with `PRODUCT_ADMIN.md`
