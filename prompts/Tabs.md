# UI Update: Combine Client Inquiries, Quotation, and Billing into One Horizontal Tab Row

## Objective

Refactor the existing navigation for the Client Inquiries, Quotation, and Billing modules so that all three appear as **top-level tabs in a single horizontal row**.

Use the attached screenshot as a reference for the current UI and understand the existing tab structure before making changes.

## 1. Required Tab Structure

Currently:

- Quotation has its own nested tabs: Official Quotes and Client Inquiries.
- Billing has a separate tab and does not display the same nested navigation.
- The current layout has multiple levels of tabs.

Change the structure to:

**Client Inquiries | Quotation | Billing (3)**

All three must be independent, top-level tabs in the same horizontal row.

### Important requirements

- `Client Inquiries` must be a standalone tab.
- `Quotation` must be a standalone tab.
- `Billing` must be a standalone tab.
- Do not place Client Inquiries inside Quotation.
- Do not place Quotation or Billing inside another tab.
- Remove the current nested tab navigation for Official Quotes and Client Inquiries.
- The Official Quotes content should be displayed when the user selects the top-level Quotation tab.
- Client Inquiries should open its own content directly when selected.
- Billing should open its existing Billing content directly when selected.
- Preserve existing record counts in tab labels where they are currently available, for example `Billing (3)`, and show the appropriate counts for other tabs if supported by the existing implementation.

## 2. Layout and Styling

- Display all three tabs in one horizontal row at the top of the relevant page.
- Use the existing design system, colors, icons, typography, borders, spacing, and active-tab styling.
- Keep the design consistent with the current Quotation and Billing interface.
- Use a single shared tab container instead of separate nested tab bars.
- Clearly highlight the currently active tab.
- Keep the content area directly below the tab row.
- Remove unnecessary empty space and the extra tab-container background created by the old nested structure.
- Do not redesign the quotation forms, billing tables, or client inquiry screens.

## 3. Responsive Behavior

- On desktop and laptop screens, display all three tabs in a single horizontal row.
- On tablet and mobile screens, keep the tabs in the same logical top-level navigation row.
- If all tabs cannot fit on smaller screens, use a controlled horizontal scroll or another appropriate responsive solution.
- Do not wrap tabs into multiple rows.
- Do not allow tabs to overlap, shrink until unreadable, or cause page-level horizontal overflow.

## 4. Navigation and Functionality

- Selecting `Client Inquiries` should display the existing Client Inquiries page or content.
- Selecting `Quotation` should display the existing Official Quotes page or content.
- Selecting `Billing` should display the existing Billing page or content.
- Preserve existing create, view, edit, delete, search, filter, pagination, PDF generation, and other actions according to the current permissions and business rules.
- Preserve existing API calls, state management, URL routing, and data fetching.
- Ensure tab switching does not cause unnecessary duplicate API requests or reset unrelated state.
- Keep quotation and billing business logic completely unchanged.
- Preserve existing status rules, including the read-only restriction for published quotations, if already implemented.

## 5. Implementation Requirements

1. Inspect the existing Quotation and Billing components and identify where their tabs are currently rendered.
2. Identify the parent page or shared layout that can own the three top-level tabs.
3. Move Client Inquiries out of the Quotation tab structure without duplicating its component or API logic.
4. Render Official Quotes directly under the Quotation tab.
5. Render the existing Billing component under the Billing tab.
6. Reuse existing components, icons, styling, and data-fetching logic wherever possible.
7. Remove obsolete nested tab controls and their unnecessary wrappers.
8. Avoid duplicate tab state, duplicate API calls, and unnecessary refactoring.
9. Preserve existing routes and direct-link behavior wherever possible.

## 6. Acceptance Criteria

- Exactly three top-level tabs appear in one horizontal row: Client Inquiries, Quotation, and Billing.
- No tab is nested inside another tab.
- There is no second tab row containing Official Quotes or Client Inquiries.
- Each tab displays its correct existing content.
- All current module functionality continues to work.
- Active-tab styling is consistent across all three modules.
- The layout works on desktop, tablet, and mobile.
- No unrelated modules or business logic are changed.

After implementation, summarize the files changed and confirm which existing routes and features were preserved.
