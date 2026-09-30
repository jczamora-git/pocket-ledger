# Project Phase Tracker

## Phase 0 — Expo Harness Bootstrap
Status: COMPLETE

Summary:
Expo governance, skills, and condensed Flutter porting context established.

## Phase 1 — Expo Native UI Shell Port
Status: COMPLETE

Deliverables:
- Expo app initialization (SDK 57, React Native 0.86, React 19, TypeScript, Expo Router)
- Centralized design system (`src/theme/`: colors, spacing, radius, shadows, typography)
- Sample data ported with integer centavos (`src/data/sample/`)
- Money domain foundation (`src/domain/money/`: Money class, CurrencyFormatter)
- Native React Native screens ported:
  - Dashboard (`src/features/dashboard/DashboardScreen.tsx`)
  - Activity (`src/features/transactions/ActivityScreen.tsx`)
  - Budgets (`src/features/budgets/BudgetsScreen.tsx`)
  - Bills (`src/features/bills/BillsScreen.tsx`)
  - Accounts (`src/features/accounts/AccountsScreen.tsx`)
  - Debts (`src/features/debts/DebtsScreen.tsx`)
  - Reports (`src/features/reports/ReportsScreen.tsx`)
  - Settings (`src/features/settings/SettingsScreen.tsx`)
- Floating navigation dock:
  - Primary dock with 4 icon-only tabs (Home, Activity, Budgets, Bills), accessibility labels, no text labels
  - MoreActionNode: separate 54x54 circular action node with animated rotation and active glow
  - MoreToolsMenu: drop-up menu containing Accounts, Debts, Reports, Settings with visible icons + labels
  - 4-layer architecture with full-screen `BlurView` backdrop covering underlying content and dock
  - No quick-action FAB
- Sequential validation:
  - `npx tsc --noEmit`: PASS (0 errors)
  - `npx expo-doctor`: PASS (21/21 checks)
  - `npm test`: PASS (3 test suites, 25 tests)
  - `npx expo export` / `start`: PASS (iOS, Android, Web bundles generated cleanly)

## Phase 2 — Core Finance MVP
Status: PENDING

Planned:
- expo-sqlite setup and schema migrations
- Accounts CRUD
- Income / Expense / Transfer transactions
- Mathematical balance engine derived from ledger
- Reactive UI connected to repositories

## Phase 3 — Budget & Obligations
Status: PENDING

Planned:
- Monthly budgets tracking engine
- Bill payments & debt settlements
- Cascade handling & partial payment tracking

## Phase 4 — Private Device Features
Status: PENDING

Planned:
- On-device local notifications (expo-notifications)
- App lock / PIN authentication & biometrics
- Encrypted export/import and atomic restore

## Phase 5 — Reports & Polish
Status: PENDING

Planned:
- Financial analytics & reporting
- UI/UX polish & accessibility review
- Release preparation for Android / iOS
