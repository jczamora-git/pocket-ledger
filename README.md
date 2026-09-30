# Pocket Ledger

A private, local-first, offline-first personal budget tracker built with **Expo**, **React Native**, **TypeScript**, and **Expo Router**.

## Features (Phase 1 — Native UI Shell Port)

- **Native Mobile Experience**: Android and iOS native mobile performance.
- **Custom Floating Navigation**:
  - 4 icon-only primary destinations (Home, Activity, Budgets, Bills) with accessibility support.
  - Separate 54×54 circular More action node with animated rotation.
  - Upward tools menu (Accounts, Debts, Reports, Settings).
  - 4-layer stack architecture with full-screen `BlurView` backdrop covering underlying content and dock.
- **Strict Integer-Centavo Standard**: All currency calculations and domain values use exact integer centavos (₱1,500.25 = 150025) with zero floating-point arithmetic drift.
- **8 Native Feature Screens**:
  - **Dashboard**: Greeting, Available Cash hero card, quick actions, monthly flow, budgets preview, upcoming bills, debts summary, and recent transactions.
  - **Activity**: Inflow vs outflow summary, filter tabs (All, Income, Expense, Transfers), and transaction history.
  - **Budgets**: Category progress bars with threshold alerts (<80% green, 80–99% amber, ≥100% red).
  - **Bills**: Priority and status badges, due date countdowns, and responsive row layouts.
  - **Accounts**: Account cards with distinct credit card separation (outstanding balance vs available credit) and strict exclusion from available cash.
  - **Debts**: Direction filter (I Owe vs Owed to Me) with repayment progress visualization.
  - **Reports**: Net savings metrics and spending distribution breakdown.
  - **Settings**: Local-first security, backup, preferences, and system information.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Metro development server:
   ```bash
   npx expo start
   ```

3. Run the test suite:
   ```bash
   npm test
   ```

4. Run the TypeScript check:
   ```bash
   npx tsc --noEmit
   ```

5. Run Expo doctor:
   ```bash
   npx expo-doctor
   ```

## Architecture & Roadmap

Refer to `docs/` for project governance:
- `docs/PHASE_TRACKER.md` — Project milestone tracking (Phase 0–5).
- `docs/SESSION_LOG.md` — Detailed session changelog.
- `docs/LAST_SESSION.md` — Latest handoff state for future sessions.
- `AGENTS.md` — Engineering rules and domain constraints.
