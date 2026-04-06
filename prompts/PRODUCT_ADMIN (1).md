# 🛡️ PRODUCT MODULE — ADMIN DOCUMENTATION

> **Interlinked with:** [`PRODUCT_USER.md`](./PRODUCT_USER.md)
> Every section the admin configures directly powers what the user sees on the public product detail page. The section numbers below (1–6) match exactly with the user-facing page sections in `PRODUCT_USER.md`.

---

# 🧭 MODULE OVERVIEW

- Accessible only by **SUPER_ADMIN**
- Full CRUD: Create, Read, Update, Delete
- Everything admin saves here renders live on the public product detail page

---

# 🖥️ ADMIN PRODUCT LIST PAGE — `/admin/products`

## 🔹 Header Section

- Title: **Product Management**
- CTA Button: **+ Add Product**

---

## 🔹 Toolbar Section

- 🔍 Search (by title / SKU / company name)
- Filter by: Category / Sub-category / Status / Best Product
- Clear Filters button

---

## 🔹 DataTable Section

| Column       | Description                                   | Powers (User Page)                        |
| ------------ | --------------------------------------------- | ----------------------------------------- |
| Image        | Main featured image thumbnail (imageUrl)       | Section 2 → Left image gallery            |
| Title        | Product title                                  | Section 2 → Product title (h1)            |
| Category     | Category + Sub-category                        | Section 1 → Breadcrumb trail              |
| MRP          | Original price                                 | Section 2 → Strikethrough MRP             |
| Discount     | Discount % badge                               | Section 2 → "Save X%" badge               |
| Sale Price   | Calculated price                               | Section 2 → Sale price (prominent)        |
| Company      | Company / brand name                           | Section 2 → "by [Brand]" line             |
| Best Product | Yes / No badge                                 | Section 2 → "Best Seller" pill badge      |
| Status       | ACTIVE / INACTIVE / DRAFT                      | Visibility on storefront                  |
| Created At   | Date                                           | —                                         |
| Actions      | View / Edit / Delete                           | —                                         |

---

## 📊 DATATABLE BEHAVIOR

- Pagination (10 / 25 / 50 rows)
- Column sorting
- Responsive design
- Empty state ("No products found" + Add Product button)
- Loading skeleton rows

---

---

# ➕ ADD PRODUCT (CREATE) — `/admin/products/create`

> Accessible only by **SUPER_ADMIN**

---

## 🔹 Section 1 — Basic Info
> Powers → **User Page Section 1 (Breadcrumb)** + **Section 2 (Title, Brand, SKU, Badge)**

| Field         | UI Element   | Placeholder / Note        | Validations  | Powers (User Page)                    |
| ------------- | ------------ | ------------------------- | ------------ | ------------------------------------- |
| title         | Text input   | Ex. Minimalist Vista Home | Required     | Section 2 → Product title (h1)        |
| category      | Dropdown     | Select Category           | Required     | Section 1 → Breadcrumb (2nd crumb)    |
| subCategory   | Dropdown     | Select Subcategory        | Optional     | Section 1 → Breadcrumb (3rd crumb)    |
| sku           | Text input   | Ex. SN-WH1000XM5          | Required, Unique | Section 2 → "SKU: …" line         |
| companyName   | Text input   | Ex. Sony                  | Optional     | Section 2 → "by [Brand]" line         |
| isBestProduct | Toggle       | Mark as Best Product      | Default: Off | Section 2 → "Best Seller" pill badge  |
| status        | Dropdown     | ACTIVE / INACTIVE / DRAFT | Required     | Controls storefront visibility        |

---

## 🔹 Section 2 — Pricing
> Powers → **User Page Section 2 (Price block: MRP, Discount, Sale Price)**

| Field              | UI Element      | Placeholder / Note                     | Validations     | Powers (User Page)                 |
| ------------------ | --------------- | -------------------------------------- | --------------- | ---------------------------------- |
| mrp                | Number input    | Ex. 46890 — M.R.P (Original Price)     | Optional        | Section 2 → Strikethrough MRP      |
| discountPercentage | Number input    | Ex. 36 — Discount (%)                  | Optional, 0–100 | Section 2 → "Save X%" badge        |
| price              | Read-only input | Auto-calculated Sale Price             | Auto-calculated | Section 2 → Sale price (large)     |

> **Calculation:** `price = mrp − (mrp × discountPercentage / 100)`
> Sale Price is **read-only / disabled** — updates live as MRP and Discount % are filled.

---

## 🔹 Section 3 — Images
> Powers → **User Page Section 2 (Image gallery, thumbnails)**

| Field            | UI Element                      | Note                                 | Validations                          | Powers (User Page)                       |
| ---------------- | ------------------------------- | ------------------------------------ | ------------------------------------ | ---------------------------------------- |
| imageUrl         | Grey dashed upload zone         | Main Featured Image — "Upload Image" | Required, max 4MB                    | Section 2 → Primary large image          |
| additionalImages | Yellow dashed upload zone       | Additional Images — "Add Images"     | Optional, max 4 images, max 4MB each | Section 2 → Thumbnail strip (2, 3, 360°) |

**UX:**
- Both show helper text: "Images up to 4MB, max 4"
- Preview thumbnails shown after upload with individual delete (×)
- First image = primary display image; rest populate thumbnail strip

---

## 🔹 Section 4 — Key Highlights (Custom Fields)
> Powers → **User Page Section 3 (Key Highlights Strip)** + **User Page Section 4 Tab 2 (Specs)**

**Heading:** Custom Details
**Sub-heading:** Add custom label and content fields for extra product information
**CTA:** `+ Add Field` button (top-right of section)

Each custom field row:

| Sub-field | UI Element | Placeholder    | Validations | Powers (User Page)                                              |
| --------- | ---------- | -------------- | ----------- | --------------------------------------------------------------- |
| label     | Text input | Field Label    | Required    | Section 3 → Highlight label (✓ text) + Section 4 Tab 2 → Spec key   |
| content   | Text input | Field Content  | Required    | Section 4 Tab 2 → Spec value + Section 4 Tab 1 → "In the box" items |

- Click `+ Add Field` to append a new row
- Each row has a delete (×) button
- First 4–6 label values auto-populate the **Key Highlights Strip** (Section 3)
- All label + content pairs render in the **Specs tab** table (Section 4, Tab 2)

---

## 🔹 Section 5 — Description
> Powers → **User Page Section 4 Tab 1 (Overview — Highlights & description)**

| Field       | UI Element | Placeholder                                                        | Validations |
| ----------- | ---------- | ------------------------------------------------------------------ | ----------- |
| description | Textarea   | Describe the architectural aspects, client goals, materials used…  | Required    |

---

## 🔹 Section 6 — Bundle Products (Frequently Bought Together)
> Powers → **User Page Section 5 (Frequently Bought Together)**

- Admin selects up to 2 additional products to bundle with this product
- Each bundle item shows: image, name, individual price
- Combined total + savings auto-calculated
- "Add all 3 to cart" button shown on the user page

---

## 🔹 Section 7 — Related Products
> Powers → **User Page Section 6 (Related Products — Customers Also Viewed)**

- **"Customers also viewed"** — auto-populated from same category / sub-category
- **"From the same brand"** — auto-populated from same companyName
- Admin can manually pin specific products to appear here

---

## Actions (Create / Edit form)

- **Submit** — full-width dark button at bottom
- **Save as Draft** — saves without publishing
- **Cancel**

## UX

- Inline validation on blur (per field)
- Disable Submit while saving
- Success toast on save
- Error toast on failure
- Auto-redirect to product list on success

---

---

# ✏️ EDIT PRODUCT — `/admin/products/edit/:id`

- Same UI as Create
- All sections pre-filled with existing values
- Custom Fields pre-populated as editable rows (add / remove)
- Images show as previews — remove and re-upload supported
- Sale Price recalculates live if MRP or Discount % changes
- Accessible only by SUPER_ADMIN

---

# 🗑️ DELETE PRODUCT

## Confirmation Modal

- Message: "Are you sure you want to delete this product? This action cannot be undone."
- Buttons: Delete / Cancel

## UX

- Prevent accidental deletion
- Success / error toast after action

---

---

# 🔐 ADMIN — QUOTATION MANAGEMENT — `/admin/quotations`

> Receives enquiries submitted via **User Page Section 5 → Quotation Form**
> Interlinked with: [`PRODUCT_USER.md → Section 5 → Quotation Form`](./PRODUCT_USER.md#5-quotation--specification-enquiry-form)

## 🔹 Header Section

- Title: **Quotations**

## 🔹 Toolbar Section

- 🔍 Search (by customer name / email / product title)
- Filter by Status: PENDING / QUOTED / CLOSED
- Clear Filters button

## 🔹 DataTable Section

| Column        | Description                       |
| ------------- | --------------------------------- |
| Customer Name | Enquirer name                     |
| Email         | Enquirer email                    |
| Product       | Linked product title (clickable)  |
| Requirement   | Short preview of message          |
| Status        | PENDING / QUOTED / CLOSED badge   |
| Created At    | Date                              |
| Actions       | View / Quote / Close              |

## 📊 DATATABLE BEHAVIOR

- Pagination (10 / 25 / 50 rows)
- Column sorting
- Empty state ("No quotations found")
- Loading skeleton

---

## 📄 QUOTATION DETAIL PAGE — `/admin/quotations/:id`

| Element       | Description                               |
| ------------- | ----------------------------------------- |
| Customer Info | Name, Email, Phone                        |
| Product       | Linked product title (clickable → product detail) |
| Message       | Full requirement from customer            |
| Status        | PENDING / QUOTED / CLOSED badge           |
| Quoted Price  | Number input (admin fills to send quote)  |
| Admin Notes   | Textarea (internal notes only)            |

### Actions

- **Send Quote** → saves quotedPrice + adminNotes, status → QUOTED
- **Close Quotation** → status → CLOSED
- **Back to list**

### UX

- Inline validation
- Disable button while submitting
- Success / error toast

---

# 🔄 STATUS HANDLING

## Product Status

| Status   | Badge  | Storefront Visibility            |
| -------- | ------ | -------------------------------- |
| ACTIVE   | Green  | Visible to all users             |
| INACTIVE | Gray   | Hidden from storefront           |
| DRAFT    | Amber  | Saved, not published             |

## isBestProduct

| Value | Effect                                           |
| ----- | ------------------------------------------------ |
| true  | "Best Seller" blue pill shown on user detail page |
| false | No badge shown                                   |

## Quotation Status

| Status  | Badge  | Meaning                              |
| ------- | ------ | ------------------------------------ |
| PENDING | Amber  | Submitted, not yet reviewed          |
| QUOTED  | Blue   | Admin sent a quoted price            |
| CLOSED  | Gray   | Enquiry resolved / closed            |

---

# 🔍 SEARCH UX

- Real-time search (debounced)
- Filters: category / subCategory / isBestProduct / status
- Clear Filters button

---

# 📱 RESPONSIVE DESIGN

## Desktop
- Full table view

## Tablet
- Compact table

## Mobile
- Card layout, actions in dropdown

---

# ⚡ LOADING & EMPTY STATES

## Loading
- Skeleton rows in datatable

## Empty
- "No products found"
- Button: Add Product

---

# 🔔 FEEDBACK SYSTEM

- Success toast
- Error toast
- Inline form validation (on blur, per field)

---

# 🛡️ ACCESS CONTROL (UI)

Only SUPER_ADMIN can:
- Add / Edit / Delete product
- Toggle product status
- View and action quotations

- Hide Add / Edit / Delete for non-admin users
- Show "Access Denied" if unauthorized route accessed

---

# 🔐 PROTECTED ROUTES

| Route                      | Access           | Links To (User Page)         |
| -------------------------- | ---------------- | ---------------------------- |
| `/admin/products`          | SUPER_ADMIN only | —                            |
| `/admin/products/create`   | SUPER_ADMIN only | —                            |
| `/admin/products/edit/:id` | SUPER_ADMIN only | —                            |
| `/admin/quotations`        | SUPER_ADMIN only | User page quotation form     |
| `/admin/quotations/:id`    | SUPER_ADMIN only | User page quotation form     |
| `/products`                | Public           | → `PRODUCT_USER.md`          |
| `/products/:id`            | Public           | → `PRODUCT_USER.md`          |

---

# ✅ ADMIN FINAL RESULT

✔ Product list datatable with full CRUD
✔ Create / Edit form — 7 sections (basic info, pricing, images, custom fields, description, bundle, related)
✔ Auto-calculated sale price (read-only, live)
✔ Main image + additional images upload
✔ Custom Details — `+ Add Field` rows (label + content) → powers highlights strip + specs tab
✔ Bundle product selector → powers "Frequently Bought Together"
✔ Related product config → powers "Customers Also Viewed" + "From the same brand"
✔ Quotation management (list + detail + quote/close actions)
✔ Status management (ACTIVE / INACTIVE / DRAFT + isBestProduct toggle)
✔ Access control — SUPER_ADMIN only
✔ All sections interlinked with `PRODUCT_USER.md`
