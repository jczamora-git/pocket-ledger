---
name: budget-expo-architect
description: Governs Expo Router, React Native architecture, hooks, state management, feature structure, and dependency direction.
---

# budget-expo-architect

## Purpose
Establishes and enforces a decoupled, testable, feature-first React Native architecture using Expo Router, React hooks, and Zustand where appropriate. Prevents monolithic state, WebView shortcuts, and tight coupling between UI and business logic.

## Use When
* Scaffolding new feature modules or screen routes.
* Configuring or modifying Expo Router layout files.
* Deciding state ownership (local state vs Zustand store vs context).
* Structuring the `src/` and `app/` directories.
* Making dependency direction decisions across features.

## Responsibilities
* Maintain feature-first folder conventions: `src/features/<feature>/`.
* Keep Expo Router `app/` files thin — delegate to feature components in `src/`.
* Design focused Zustand stores scoped to specific concerns — no giant global store.
* Enforce unidirectional data flow: UI → hooks/controllers → repositories → database.
* Prevent circular dependencies across features.

## Non-Negotiable Rules
1. **No WebView Architecture:** The app is native React Native. Never wrap a web page.
2. **No Monolithic Stores:** Never replicate a single global store holding all entities.
3. **UI Independence:** Screen components must not contain SQL queries or authoritative financial calculations.
4. **No Unsafe State Mutations:** State updates must produce new objects, not mutate existing references.
5. **Offline First:** Never introduce remote network clients or cloud endpoints.

## Workflow
1. **Analyze Placement:** Determine if functionality belongs in an existing feature or requires a new module.
2. **Define Contracts:** Establish TypeScript interfaces for domain models in `src/domain/` or `src/features/<feature>/`.
3. **Wire State:** Implement focused hooks or Zustand slices.
4. **Configure Routing:** Register routes in `app/` respecting the tab/stack hierarchy.
5. **Verify Decoupling:** Confirm UI components depend only on hooks and typed props, never on raw database modules.

## Validation
* [ ] Feature files are placed under `src/features/<feature_name>/`.
* [ ] No screen component imports database modules directly.
* [ ] Zustand stores are granular and scoped.
* [ ] TypeScript compiles with zero errors (`npx tsc --noEmit`).

## Must Not Do
* Must NOT invent or alter financial formulas (delegate to `budget-finance-domain`).
* Must NOT write raw SQLite schemas (delegate to `budget-sqlite-database`).
* Must NOT bypass AGENTS.md governance rules.

## Related Skills
* `budget-finance-domain` — domain model interfaces and accounting logic.
* `budget-sqlite-database` — repository implementations.
* `budget-ui` — presentation components consume state via hooks.
* `budget-qa` — verify architecture layers.

## Completion Criteria
Architectural boundaries are defined, all routes and state providers compile cleanly, and no layering violations exist between UI and data.
