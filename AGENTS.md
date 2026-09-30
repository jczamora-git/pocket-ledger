# Pocket Ledger — Expo React Native

## 1. Project Identity

Private, local-first, offline-first personal budget tracker.

**Stack:** Expo · React Native · TypeScript · Expo Router
**Persistence (future):** expo-sqlite
**Primary platform:** Android — Secondary: iOS
**Architecture:** Native mobile — NOT WebView, NOT embedded web.

---

## 2. Token-Efficient Resume Workflow

For future sessions, agents must follow this reading order to minimize token usage:

1. **AGENTS.md** — global non-negotiable rules
2. **docs/LAST_SESSION.md** — latest handoff state & next recommended work
3. **Relevant `.agents/skills/*/SKILL.md`** — task-specific rules
4. **Target Expo source files** involved in the task
5. **docs/PHASE_TRACKER.md** — only when phase context is required
6. **docs/PORTING_CONTEXT.md** — only when Flutter migration detail is needed
7. **Flutter source** — only as a last resort when porting context lacks needed detail

Do NOT reread the entire Flutter repository or docs for every task.

---

## 3. Filesystem Safety

All changes must occur only inside:

`C:\Users\JC Zamora\Documents\Jeizi_Programming_Apps\budget-tracker-expo`

The Flutter project at:

`C:\Users\JC Zamora\Documents\Jeizi_Programming_Apps\budget-tracker-flutter`

is **STRICTLY READ-ONLY**. Never modify, format, install, or change Git state there.

---

## 4. Machine Safety

Do NOT modify without explicit approval:
* Windows PATH or Registry
* Global Node/npm/Expo CLI installs
* Global Git configuration
* Android SDK settings
* Symlinks or junctions outside the project

---

## 5. Money & Precision Rules

* **Integer Centavos Standard:** Monetary amounts must **NEVER** use floating-point as authoritative finance state.
* All currency is stored and calculated as integer centavos (₱1,500.25 = `150025`).
* Future database columns for currency must be `INTEGER`.
* A `Money` utility / value object must be used for currency arithmetic and formatting.
* Percentages and rates are stored as integer basis points (1% = 100 bp).

---

## 6. Financial Source of Truth

* **Ledger-Derived Balances:** Account balances must always be mathematically derived from opening balance + ledger transactions.
* Never maintain an independent mutable `current_balance` field.
* Credit card available credit must **NEVER** be summed into "Available Cash" or "Net Worth".

---

## 7. Transaction & Transfer Accounting

* **Canonical types:** `income`, `expense`, `transfer`.
* **Transfer:** Source loses `(amount + fee)`, destination gains `amount`. Fee is a source-only expense.
* Transfers must never be recorded as unrelated, unlinked income/expense records.
* `source_account_id !== transfer_account_id` (self-transfer rejected).

---

## 8. Historical & Untracked Transactions

`is_untracked` transactions represent historical records excluded from:
* Account balances
* Available cash
* Monthly budgets
* Cash-flow totals

They remain visible in activity history with an "Untracked" badge.

---

## 9. Database & Atomicity

* **Future engine:** expo-sqlite over local SQLite.
* **Layering:** Screen components must never execute direct SQL. All database access flows through repositories.
* **Atomic writes:** Multi-step financial mutations (bill payment, transfer, debt payment, restore) must execute inside a SQLite transaction. Partial updates are forbidden.

---

## 10. State Management

* Use local React state where global state is unnecessary.
* If shared state is needed, prefer Zustand — avoid Redux.
* Avoid monolithic global stores.
* Business logic must remain independent of UI presentation components.

---

## 11. Architecture

* **Feature-first structure:** `src/features/<feature>/`
* Routing files stay thin — no feature logic inside `app/` route files.
* Shared models represent genuinely cross-cutting primitives only.
* Unidirectional data flow: UI → hooks/controllers → repositories → database.
* No circular cross-feature dependencies.

---

## 12. Privacy & No-Cloud Rule

Do NOT introduce without explicit user request:
* Supabase, Firebase, Appwrite, PocketBase
* Cloud databases or authentication backends
* Telemetry, analytics, or advertising SDKs
* WebView-based application architecture

---

## 13. Validation Pipeline

For implementation work, run appropriate checks:

```powershell
npx expo-doctor
npx tsc --noEmit
npm test
```

Never silence legitimate errors with broad ignore directives.

---

## 14. Scope Enforcement

Implement only the requested task scope:
* Harness task → harness only
* UI task → UI only
* Database task → database only
* Finance task → finance + persistence + tests

Do not automatically continue to the next phase.

---

## 15. Source Reference Rule

For the current migration stage, the Flutter project is the primary read-only reference. Do NOT use older PrivTRack / Pocket Ledger source unless explicitly instructed.

---

## 16. Testing

* Never delete, skip, or weaken tests to achieve a passing result.
* Financial tests must use deterministic integer-centavo assertions — no fuzzy tolerances.
* Verification commands run sequentially — do not start the next until the previous completes.

---

## 17. Date & Time

* **Date-only** concepts (due dates, budget months): local calendar strings (`YYYY-MM-DD`, `YYYY-MM`).
* **Timestamps** (created_at, updated_at): UTC epoch milliseconds or ISO strings.
* Never derive local budget months by parsing UTC without respecting local calendar context.

---

## 18. Deletion & Archive Policy

* Accounts/categories referenced by transactions must be archived (`is_archived`), not deleted.
* System categories cannot be deleted.
* Deleting a bill/debt cascades to payment records but NOT to linked ledger transactions.

---

## 19. Session Documentation Protocol

At the end of every meaningful implementation session:

1. **Update `docs/PHASE_TRACKER.md`** if the phase state has changed.
2. **Append a concise entry to `docs/SESSION_LOG.md`** (append-only, never delete past entries).
3. **Replace `docs/LAST_SESSION.md`** with the latest handoff state and instructions for the next agent.
4. Execute this protocol **only after validation results (tsc, expo-doctor, test) are known**.

