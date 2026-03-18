# Architect App - Agent Guide

## 1) What this project is about

This is a Next.js App Router platform for an architecture and interior studio.

It has two major sides:

- Public website:
  - Browse products by category (`product`, `premium`, `corporate`)
  - View portfolio and testimonials
  - Submit inquiry / quotation requests
- Admin console (role-based):
  - Manage products, best products, portfolio, testimonials
  - Manage employees and attendance
  - Review quotation requests
  - Create official quotations and export PDF
  - Send customer communication emails

Core stack in this repo:

- Next.js 16 + React 19
- MongoDB + Mongoose
- NextAuth (Google OAuth, JWT session)
- Tailwind CSS v4
- shadcn/ui foundation already initialized (`components.json`, `src/components/ui/*`)

---

## 2) Current project flow

### 2.1 Auth and access flow

1. User signs in with Google via NextAuth.
2. On sign-in, user is upserted into `User` collection.
3. JWT callback reloads role from DB.
4. Middleware protects `/admin/*` and `/quotation/*` pages.

### 2.2 Public flow

1. Home page loads featured products + categories + testimonials + contact section.
2. Category pages call `/api/products` with filters, search, and pagination.
3. Product details page requires login and loads a single product.
4. Quotation request is created through `/api/quotation`.
5. Optional email notification is sent to admin.

### 2.3 Admin flow

1. Admin enters dashboard from `/admin`.
2. Products:
   - CRUD via `/api/products` and `/api/products/[id]/admin`
   - Best product toggling via update endpoint
3. Portfolio and testimonials:
   - CRUD via `/api/portfolio*` and `/api/testimonials*`
4. Quotation management:
   - Client requests from `/api/quotation`
   - Official quotation CRUD via `/api/admin/official-quotations`
   - Reframed response via `/api/admin/quotation/reframe`
5. HR module:
   - Employees CRUD via `/api/admin/employees*`
   - Attendance via `/api/admin/attendance*`

### 2.4 Data and integration flow

- DB connection through `src/lib/mongodb.ts` (global cached connection).
- Email sending through `src/lib/nodemailer.ts`.
- Uploads handled via UploadThing route with admin middleware.
- PDF generation handled in `src/lib/pdfGenerator.ts`.

---

## 3) Speed improvement plan (prioritized)

## P0 (do first)

1. Use `next/image` for major UI images:
   - Replace repeated raw `<img>` usage in public and admin pages.
2. Add DB indexes for hot queries:
   - `Product`: `category`, `subCategory`, `isBestProduct`, `createdAt`
   - `Quotation` / `OfficialQuotation`: `createdAt`, `status`
   - `Employee`: `status`, `firstName`, `lastName`
   - `Attendance`: add index on `date` (in addition to `{ employeeId, date }`)
3. Reduce large list fetches:
   - Avoid `pageSize=1000` in admin product listing.
4. Keep response payloads small:
   - Use `.lean().select(...)` where full document methods are not needed.

## P1 (next)

1. Add server-side caching/revalidation strategy:
   - Product listing and public testimonials/portfolio should have controlled cache or revalidate.
2. Move high-traffic public data fetches to server components when possible.
3. Add query validation and sane pagination caps (`min/max` limits).
4. Replace repeated client polling/re-fetch patterns with SWR or React Query.

## P2 (later)

1. Add CDN/object storage optimization for uploaded images.
2. Add lightweight observability:
   - API latency, slow query logs, error rates.
3. Add load tests for `/api/products`, `/api/quotation`, and admin listing endpoints.

---

## 4) Security hardening plan (prioritized)

## Critical P0

1. Lock down `/api/admin/setup-user`:
   - Require authenticated admin session.
   - Remove hardcoded fallback secret (`architect_secret_99`).
   - Disable or delete this endpoint after bootstrap.
2. Disable verbose auth debug in production:
   - `debug: true` in NextAuth should be environment-based.
3. Add request validation on all write APIs:
   - Use Zod schemas for body and query validation.
4. Add rate limiting:
   - Especially `/api/quotation`, `/api/admin/setup-user`, auth-sensitive actions.

## P1

1. Add security headers in `next.config.ts` or middleware:
   - CSP, X-Frame-Options, Referrer-Policy, etc.
2. Sanitize untrusted text used in email HTML templates.
3. Add audit logging for admin mutations.
4. Ensure strict env requirements:
   - Fail fast when mail/auth secrets are missing.

## P2

1. Add bot protection/CAPTCHA on public inquiry form.
2. Add ownership checks where needed for user-linked resources.
3. Add automated dependency and vulnerability scanning in CI.

---

## 5) shadcn/ui migration flow

Note: shadcn is already partially present. This is a structured migration to complete adoption and standardize UI quality.

## Phase 0: Baseline and rules

1. Freeze design tokens in `globals.css` (`--radius`, colors, typography scale).
2. Define component usage policy:
   - Prefer `@/components/ui/*` primitives over raw inputs/buttons/dialogs.
3. Create UI checklist (spacing, states, accessibility, mobile behavior).

## Phase 1: Foundation components

1. Ensure these are finalized and reused:
   - `Button`, `Input`, `Textarea`, `Select`, `Dialog`, `Card`, `Table`, `Label`, `Popover`, `Calendar`.
2. Add missing primitives if needed:
   - `Form`, `Badge`, `Tabs`, `Skeleton`, `Alert`, `DropdownMenu`.
3. Build app-specific wrappers:
   - `PageHeader`, `EmptyState`, `DataTableToolbar`, `ConfirmDialog`.

## Phase 2: Migrate high-impact pages first

1. Admin pages first (largest consistency gain):
   - `/admin/products`
   - `/admin/portfolio`
   - `/quotation`
   - `/admin/attendance`
2. Replace raw form elements and ad-hoc buttons with ui primitives.
3. Standardize modal patterns (single dialog behavior and close actions).

## Phase 3: Public pages

1. Migrate product cards, category filters, and contact/quotation forms.
2. Keep current visual brand but unify interaction states and spacing system.
3. Convert repeated custom patterns into reusable shadcn-based components.

## Phase 4: Quality and cleanup

1. Accessibility pass:
   - Labels, keyboard focus, aria attributes, contrast.
2. Remove dead styles and duplicate utility classes.
3. Document component patterns in this file + README.

## Definition of done for migration

- 100% form controls use shared `ui` primitives or wrappers.
- Dialogs/tables/buttons are pattern-consistent across admin + public pages.
- No duplicated handcrafted input/button styling for common controls.
- Mobile and desktop behavior remains stable after migration.

---

## 6) Recommended execution order (practical)

1. Security P0 (setup-user lock, auth debug, validation, rate limits)
2. Performance P0 (indexes, image optimization, pagination cleanup)
3. shadcn Phase 0-2 (admin first)
4. shadcn Phase 3-4 (public + polish)

This order reduces risk first, then improves speed, then makes UI migration safer and easier to maintain.
