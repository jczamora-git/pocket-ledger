---
name: budget-ui
description: Governs the React Native design system, reusable components, responsive layouts, animation, accessibility, and mobile UI aesthetics.
---

# budget-ui

## Purpose
Maintains visual excellence, responsive layout integrity, and component consistency across the Pocket Ledger React Native UI. Ensures strict separation between presentation and business logic.

## Use When
* Implementing or modifying screens, pages, or layout shells.
* Building reusable UI components (cards, badges, buttons, sheets, form inputs).
* Applying design tokens (colors, typography, spacing, radii, shadows).
* Handling mobile responsiveness and safe areas.
* Creating empty, loading, and error states.

## Responsibilities
* Maintain the Pocket Ledger design palette:
  * Dark dock/surface: `#17191d`, `#1e222a`, `#272c35`
  * Background canvas: `#f4f4f6`
  * Brand emerald accent: `#10b981`
  * Income green: `#16c784`
  * Expense coral: `#ff4d4f`
  * Card radius: `24`
  * Sheet radius: `28`
* Ensure tabular/monospace numeric alignment for currency displays.
* Ensure all text in cards/lists uses `numberOfLines` + `ellipsizeMode` to prevent overflow.
* Maintain the floating dark pill bottom navigation with icon-only tabs and separate More action node.

## Non-Negotiable Rules
1. **No Authoritative Math in UI:** Components must NEVER calculate balances, derive credit availability, or compute fees. Display pre-calculated values from hooks/state.
2. **No Direct Database Calls:** Components must NEVER call SQLite or repository functions directly.
3. **No Hardcoded Ad-Hoc Styling:** Use centralized design tokens from `src/theme/`. Avoid inline hex values.
4. **Responsive Layouts:** Never hardcode fixed screen dimensions. Use `flex`, `flexShrink`, `minWidth`, `maxWidth`.
5. **Safe Area Handling:** All screens must handle device safe areas via `react-native-safe-area-context`.

## Workflow
1. **Token Verification:** Check that needed colors, radii, and text styles exist in `src/theme/`.
2. **Build Shared Components First:** If an element repeats across screens, build it in `src/components/`.
3. **Assemble Feature Screens:** Compose screens using ScrollView/FlatList bodies.
4. **Connect to State:** Bind components to hooks/Zustand stores via typed props.
5. **Layout Testing:** Verify on common Android widths (~360dp narrow, ~412dp normal) for zero overflow.

## Validation
* [ ] No RenderFlex-style overflow on common device widths.
* [ ] Tabular numerals applied to currency amounts.
* [ ] Card radii conform to `24`; sheet radii conform to `28`.
* [ ] Loading and empty states rendered when data is absent.
* [ ] Zero business logic or database imports in component files.
* [ ] All icon-only buttons have `accessibilityLabel` and `accessibilityRole`.

## Must Not Do
* Must NOT calculate financial balances in components.
* Must NOT import database modules in presentation files.
* Must NOT use WebView or HTML/CSS for layout.

## Related Skills
* `budget-expo-architect` — routes and state providers.
* `budget-finance-domain` — `Money` and currency formatting for read-only rendering.
* `budget-qa` — tests widget rendering and navigation.

## Completion Criteria
Screens look polished, adhere to the design system, render responsively without overflow, and are completely decoupled from data persistence.
