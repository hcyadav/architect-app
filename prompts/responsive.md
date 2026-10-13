# Universal Prompt: Make the Entire Application Fully Responsive

## Objective

Make the entire existing application fully responsive across **all modules, pages, components, forms, tables, dialogs, and layouts**, ensuring a consistent and user-friendly experience on mobile phones, tablets, laptops, desktops, and large monitors.

## 1. First, Analyze the Entire Application

Before making changes:

- Inspect the complete project structure, routing, layouts, shared components, CSS, styling framework, and all modules.
- Identify every page and component that is not responsive or causes horizontal overflow, clipped content, overlapping elements, or poor usability on smaller screens.
- Inspect shared components such as headers, sidebars, navigation menus, tables, filters, search bars, forms, cards, dropdowns, modals, buttons, pagination, and footers.
- Identify reusable components and global styles that can solve responsiveness issues across multiple modules.
- Create a checklist of all routes and modules to ensure that no page is missed.

Do not start by modifying only the currently open page. The goal is to make the **whole application responsive**.

## 2. Support All Screen Dimensions

Ensure the application adapts smoothly to the following viewport sizes and everything in between:

- Small mobile: 320px–375px
- Standard mobile: 376px–480px
- Large mobile: 481px–767px
- Tablet: 768px–1023px
- Small laptop: 1024px–1279px
- Desktop: 1280px–1599px
- Large desktop: 1600px and above

These are testing ranges, not rigid breakpoints. Use the existing framework's responsive utilities and breakpoints wherever possible.

The application must also work in both portrait and landscape orientations.

## 3. Responsive Layout and Navigation

### Main layout

- Prevent horizontal page overflow at all supported screen widths.
- Use flexible containers, fluid widths, and appropriate maximum widths.
- Avoid unnecessary fixed widths and heights that cause content to overflow or become clipped.
- Use responsive spacing, padding, margins, and gaps.
- Ensure content expands or contracts naturally according to the available viewport.
- Keep content aligned and readable without unwanted blank space.

### Header and navigation

- Ensure the header, logo, application name, search, user profile, notifications, and action buttons fit within the available width.
- Keep desktop navigation behavior consistent with the existing application.
- On mobile, use an appropriate collapsible menu or drawer where needed.
- Make the sidebar collapsible or convert it into a mobile navigation drawer if the current layout requires it.
- Ensure the main content adjusts when the sidebar opens, closes, or changes layout.
- Prevent navigation items and header controls from overlapping.

### Content layout

- Use responsive grids and flexible columns.
- Stack content vertically on smaller screens when necessary.
- Preserve the intended visual hierarchy, alignment, and spacing.
- Do not shrink desktop content excessively just to fit a mobile screen.

## 4. Make Every Module Responsive

Apply the same responsive standards to every existing module, including, but not limited to:

- Dashboard
- User management
- Company management
- Quotation
- Billing
- Global repository
- Document management
- Categories, keywords, languages, and application settings
- Reports, profile pages, and other existing modules

For each module, inspect its list views, detail views, create/edit forms, filters, search controls, action menus, and empty/loading/error states.

Do not assume that making the shared layout responsive automatically makes every module responsive. Verify each individual page and its components.

## 5. Tables, Lists, and Data Grids

Tables must remain usable even when they contain many columns or long values.

- On desktop, preserve the existing table layout when sufficient space is available.
- On smaller screens, use a suitable approach based on the content:
  - Horizontal scrolling within the table container.
  - Responsive card/list layouts where appropriate.
  - Hiding or repositioning secondary information only when it remains accessible.
- Keep important fields and row actions accessible.
- Prevent long names, email addresses, document names, and other values from breaking the layout.
- Ensure search, filters, sorting, pagination, and bulk actions fit or wrap appropriately.
- Keep horizontal scrolling contained within the table area instead of allowing the entire page to overflow.
- Preserve existing table functionality and data.

## 6. Forms, Buttons, and Input Fields

- Make all create and edit forms responsive across every module.
- Use multi-column forms on larger screens when appropriate and stack fields on smaller screens.
- Ensure labels, inputs, textareas, dropdowns, date pickers, checkboxes, radio buttons, and validation messages remain visible and usable.
- Prevent fields from extending beyond their containers.
- Allow button groups and toolbars to wrap or stack when necessary.
- Make primary actions easy to locate and accessible on mobile.
- Preserve form validation, field behavior, data submission, and existing business rules.
- Ensure forms remain usable when the mobile keyboard is open.

## 7. Modals, Dialogs, and Popovers

- Ensure every modal, confirmation dialog, dropdown menu, and popover fits within the viewport.
- Apply appropriate maximum widths, responsive margins, and internal scrolling.
- On mobile, use full-width or near-full-width dialogs where suitable.
- Prevent modal content, footer buttons, and form fields from being clipped.
- Keep dialogs usable when their content is taller than the screen.
- Ensure dropdowns and menus are not hidden behind containers or clipped by overflow rules.
- Preserve existing interactions and confirmation behavior.

## 8. Cards, Charts, Documents, and Media

- Make dashboard cards and summary panels responsive.
- Adjust the number of grid columns according to available screen width.
- Ensure charts resize correctly and their labels, legends, and tooltips remain usable.
- Make images and previews scale within their containers without distortion.
- Ensure document previews, PDF viewers, file lists, and repository content remain usable on mobile.
- Preserve aspect ratios where appropriate.
- Ensure long text, code, filenames, and metadata wrap or scroll correctly.

## 9. Styling and Technical Standards

- Follow the styling framework already used in the project, such as Tailwind CSS, CSS Modules, or the existing CSS system.
- Reuse existing responsive utilities, design tokens, breakpoints, and shared components.
- Prefer flexible layouts such as Flexbox and CSS Grid.
- Use `min-width: 0`, `max-width: 100%`, and `box-sizing: border-box` where appropriate to prevent overflow.
- Use fluid sizing and `minmax()` for responsive grids where suitable.
- Use fixed dimensions only when they are necessary for the component's intended behavior.
- Avoid excessive absolute positioning for primary page layouts.
- Avoid adding arbitrary breakpoints or duplicate CSS rules when existing utilities can solve the issue.
- Do not apply global overflow hiding as a workaround for layout problems.
- Avoid using `transform: scale()` to shrink entire pages.
- Do not introduce unnecessary dependencies or a new styling framework.
- Keep the implementation maintainable, reusable, and consistent with the current codebase.

## 10. Preserve the Existing UI and Functionality

This task is a responsive improvement, not a redesign.

- Preserve the existing color palette, typography, logo, branding, icons, component styles, visual hierarchy, and overall design language.
- Do not change the existing desktop design unnecessarily.
- Do not remove or rename existing routes, modules, components, fields, buttons, or actions.
- Do not change business logic, database schemas, API contracts, authentication, authorization, validation, or permissions unless a change is strictly required to fix a confirmed responsiveness issue.
- Preserve all existing features, including search, filtering, sorting, pagination, CRUD operations, uploads, downloads, PDF generation, and document previews.
- Avoid unrelated refactoring.
- Prefer fixing shared components once rather than implementing inconsistent solutions separately across pages.

## 11. Accessibility and Mobile Usability

- Maintain readable text sizes and sufficient contrast.
- Ensure interactive controls have appropriate touch targets, ideally around 44 × 44 CSS pixels where practical.
- Do not rely exclusively on hover interactions because touch devices do not have hover.
- Preserve keyboard navigation and visible focus states.
- Keep labels and accessible names available for icon-only buttons.
- Ensure focus remains manageable when drawers and dialogs open or close.
- Respect browser zoom and increased text sizing as much as possible.

## 12. Testing and Verification

After implementation, test the application at representative viewport sizes, including:

- 320 × 568
- 375 × 812
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900
- 1920 × 1080

For every existing route and module:

1. Check for horizontal page overflow.
2. Check for overlapping, clipped, or inaccessible content.
3. Check header, sidebar, navigation, tables, forms, modals, and action buttons.
4. Verify portrait and landscape behavior where relevant.
5. Verify that long text, large tables, and empty states are handled correctly.
6. Test primary interactions, including opening menus, submitting forms, pagination, and dialogs.
7. Verify that existing business logic and API integrations continue to work.
8. Run the project's available lint, type-check, build, and test commands.
9. Fix any regressions introduced by the changes.

If browser automation or screenshot testing is available, use it to inspect representative pages at different viewport sizes. Do not claim a page has been tested at a size unless it was actually verified.

## 13. Implementation Strategy

Implement the work in this order:

1. Fix global layout and shared responsive components.
2. Fix header, sidebar, and navigation behavior.
3. Fix reusable tables, forms, toolbars, cards, modals, and dropdowns.
4. Update individual module pages that still have responsive issues.
5. Test every route across representative screen sizes.
6. Fix regressions and verify the final build.

Work incrementally and inspect the result after each major change. Do not perform a risky, application-wide CSS replacement.

## Final Acceptance Criteria

The task is complete only when:

- Every existing module and route has been reviewed.
- The application adapts to mobile, tablet, laptop, desktop, and large desktop screens.
- No unintended page-level horizontal overflow remains.
- Tables and complex forms remain usable on small screens.
- Headers, sidebars, modals, dropdowns, and action buttons behave correctly.
- The original design and desktop experience are preserved as much as possible.
- All existing features and business rules continue to work.
- The project builds successfully, and available tests pass.

At the end, provide a concise report containing:

- Shared components updated.
- Modules and routes reviewed or modified.
- Responsive issues fixed.
- Screen sizes and test methods actually used.
- Build, lint, and test results.
- Any remaining issues that could not be verified or resolved.

**Important:** Do not stop after fixing only a few pages. Audit the entire application, implement reusable responsive fixes, and verify each existing module. If the project is too large to handle in one pass, work module by module using a checklist until every route has been covered.
