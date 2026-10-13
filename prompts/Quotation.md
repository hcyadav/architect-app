# Implement Quotation Status Dropdown and Published-State Lock

## Objective

Add a **Quotation Status** dropdown to the existing Quotation module when creating and editing a quotation. The status controls whether the quotation can be edited.

## 1. Add Quotation Status Dropdown

- Add a dropdown field named **Quotation Status** to the existing Create Quotation form.
- Add the following options:
  - `Ready`
  - `Inprogress`
  - `Published`
- Set `Ready` as the default status when creating a new quotation.
- Display the current status when viewing or editing an existing quotation.
- Follow the existing UI design, styling, spacing, form layout, and component conventions. Do not redesign the page.
- Ensure the selected status is saved to the database and correctly loaded when reopening the quotation.

## 2. Editing Rules Based on Status

Implement the following business rules:

| Quotation Status | Edit Quotation | Change Status |
| ---------------- | -------------- | ------------- |
| Ready            | Allowed        | Allowed       |
| Inprogress       | Allowed        | Allowed       |
| Published        | Not allowed    | Not allowed   |

### Ready

- The quotation can be edited completely.
- All existing editable fields, line items, pricing, totals, client details, and other quotation information must remain editable.
- The status can be changed to `Inprogress` or `Published`.

### Inprogress

- The quotation can still be edited completely.
- All existing quotation fields and line items remain editable.
- The status can be changed to `Ready` or `Published`.

### Published

- Once a quotation becomes `Published`, permanently lock it against editing.
- Disable all editable inputs, dropdowns, buttons, and actions that can modify quotation data.
- Prevent adding, editing, or removing quotation items.
- Hide or disable the Save, Update, and other mutation actions for that quotation.
- Display the quotation in read-only mode.
- Show a clear message such as: **"This quotation has been published and can no longer be edited."**
- Do not allow users to change the status back to `Ready` or `Inprogress`.
- Viewing, downloading, printing, and exporting the published quotation should continue to work as before, wherever those features already exist.

## 3. Backend Enforcement and Data Integrity

Do not implement this restriction only in the frontend.

- Validate quotation status on the backend.
- Reject all update requests for a quotation whose existing status is `Published`, even if the request is sent directly through an API or browser developer tools.
- Do not allow a request to modify a published quotation by sending a different status in the payload.
- Ensure that the status transition to `Published` is saved successfully before the quotation becomes read-only.
- Validate status values against the allowed set: `Ready`, `Inprogress`, and `Published`.
- Return an appropriate HTTP error response and a clear message when an update is rejected because the quotation is already published.
- Use a database transaction or suitable concurrency control where necessary to prevent simultaneous requests from modifying a quotation while it is being published.
- Preserve existing authentication, authorization, validation, and error-handling conventions.

## 4. Database and API Changes

- Inspect the existing quotation model, database schema, create/update APIs, frontend forms, and types/interfaces before making changes.
- Add a quotation status field to the existing schema/model if one does not already exist.
- Use `Ready` as the default value for newly created quotations at both the application and database levels where appropriate.
- Update the relevant TypeScript interfaces, API request/response types, validation schemas, and database migrations.
- Ensure existing quotations without a status are safely migrated or treated as `Ready`.
- Persist the status so it remains correct after page refreshes, logout/login, and reopening the quotation.
- Use the project's existing database and migration approach. Do not introduce a new database or unnecessary dependencies.

## 5. UI and User Experience

- Place the status dropdown in a logical location within the existing quotation form.
- Keep the existing layout and visual styling consistent with the Quotation module.
- In create mode, show `Ready` as the initial selection.
- In edit mode, load and display the quotation's saved status.
- When a user selects `Published`, save the status using the existing save/update flow. After the backend confirms success, immediately switch the quotation to read-only mode.
- If publishing fails, retain the previous saved state and display an error message.
- Once the quotation is published, refreshing the page must not restore editability.
- Avoid accidental publishing through unsaved form changes; handle the transition through the existing form submission flow, and add a confirmation dialog if consistent with the application's UX patterns.

## 6. Preserve Existing Functionality

- Do not remove or break existing quotation creation, editing, calculations, item management, search, filters, pagination, PDF generation, printing, or other current features.
- Do not modify unrelated modules, including Billing, unless an existing shared component requires a compatible change.
- Reuse existing components, API services, validation logic, and styling wherever possible.
- Avoid unnecessary refactoring or changes to the current design.

## 7. Testing and Acceptance Criteria

Verify the following scenarios:

1. Creating a quotation without changing the status saves it as `Ready`.
2. A `Ready` quotation can be edited and saved.
3. An `Inprogress` quotation can be edited and saved.
4. A quotation can transition from `Ready` to `Inprogress` and back.
5. A quotation can transition from `Ready` or `Inprogress` to `Published`.
6. After successful publishing, all quotation editing and mutation actions are disabled or unavailable.
7. Refreshing the page or logging in again does not unlock a published quotation.
8. Direct API update attempts against a published quotation are rejected.
9. Attempts to change a published quotation back to another status are rejected.
10. Invalid status values are rejected.
11. Existing quotation records continue to work correctly.
12. PDF generation, printing, viewing, and other existing non-mutating actions continue to work.
13. Existing Billing functionality and unrelated modules remain unaffected.

## Implementation Instructions

First inspect the existing codebase and identify the quotation form, model/schema, APIs, database migrations, and shared components. Then implement the smallest complete change across the frontend, backend, and database.

Follow the project's existing architecture and naming conventions. Do not create duplicate forms, APIs, or status fields if equivalent functionality already exists.

After implementation, provide a concise summary of the files changed, database migration or update steps required, business rules implemented, and tests performed. Fix any TypeScript, lint, build, or test errors introduced by the changes.
