# Finance Context — Pocket Ledger

Compact financial domain reference for Codex sessions. Avoids rereading the larger Flutter finance documents.

---

## 1. Money Representation

- **Authoritative format:** Integer centavos (`number` typed as integer).
- ₱1,500.25 = `150025` centavos.
- **Prohibited:** Floating-point (`1500.25`) as persistent or authoritative state.
- Percentages/rates: Integer basis points (1% = 100 bp, 1.75% = 175 bp).
- Transaction amounts are **always strictly positive** (`amount_centavos > 0`). Direction is determined by transaction `type`, not sign.

---

## 2. Regular Account Balance

```
Balance = opening_centavos
        + Σ income_centavos
        + Σ transfer_in_centavos
        − Σ expense_centavos
        − Σ (transfer_out_centavos + transfer_fee_centavos)
```

Excludes transactions where `is_untracked = true`.

---

## 3. Transfer Rules

A transfer is a **single logical financial operation**:
- **Source account:** debited `(amount + fee)`
- **Destination account:** credited `amount`
- **Fee:** expense borne solely by source
- **Constraint:** `source_account_id ≠ destination_account_id`
- Never recorded as unlinked separate income + expense records.

Fee calculation:
```
fee_centavos = fixed_fee_centavos + round(amount_centavos × rate_bp / 10000)
```

---

## 4. Credit Card Rules

Credit cards are **liabilities**, not positive cash assets.

```
Outstanding = opening_debt_centavos + Σ expenses + Σ transfers_out − Σ payments_in
Available_Credit = max(credit_limit_centavos − outstanding, 0)
```

**Available credit must NEVER be summed into "Available Cash" or "Net Worth".**

---

## 5. Available Cash

Sum of all regular (non-credit-card) account balances. Credit card available credit is excluded.

---

## 6. Net Worth

```
Net_Worth = Available_Cash + Σ Receivables(owed_to_me) − Σ Credit_Card_Outstanding − Σ Liabilities(i_owe)
```

---

## 7. Budget Behavior

- One budget per category per month: `UNIQUE(category_id, month_key)`
- `limit_centavos > 0`
- Spent = Σ expense amounts for (category, month) where `is_untracked = false`
- Remaining = `max(limit − spent, 0)`
- Alert at configurable percentage (default 80%)
- Color coding: green (<80%), amber (80-99%), red (≥100%)

---

## 8. Bill Payment Linkage

- Settling a bill inserts a `bill_payments` record AND a ledger `transaction`
- `remaining = max(bill_amount − Σ payments, 0)`
- Status derived:
  - `paid`: payments ≥ amount
  - `partially_paid`: 0 < payments < amount
  - `pending`: payments = 0
  - `overdue`: not paid AND current_date > due_date

---

## 9. Debt Payment Linkage

- Repaying/collecting inserts a `debt_payments` record AND a ledger transaction
- `remaining = max(original_amount − Σ payments, 0)`
- Debts have direction: `i_owe` (liability) or `owed_to_me` (receivable)
- Optional interest rate in basis points

---

## 10. Untracked / Historical Transactions

`is_untracked = true` means:
- **Excluded from:** account balances, available cash, monthly budgets, cash-flow totals
- **Visible in:** transaction history with "Untracked" badge
- **Purpose:** Historical/informational logging that doesn't impact live operating funds

Every aggregator must explicitly handle this flag. Inconsistent filtering is forbidden.

---

## 11. Atomicity Rule

Any mutation affecting multiple tables/records MUST execute within an atomic SQLite transaction.

Examples requiring transactions:
- Transfer (debit source + credit destination)
- Bill payment (update bill + insert transaction + insert payment record)
- Debt payment (update debt + insert transaction + insert payment record)
- Backup restore (clear + re-insert all data)

Failure → full rollback. Database is never left partially updated.

---

## 12. Archive / Delete Policy

| Entity | Deletion Rule |
|---|---|
| Accounts with transactions | `ON DELETE RESTRICT` → must archive (`is_archived = true`) |
| Categories with transactions | `ON DELETE RESTRICT` → must archive |
| System categories | Cannot be deleted |
| Transactions | Authoritative ledger reversal; payment links become `NULL` |
| Bills / Debts | Cascade to payment records; linked ledger transactions become `NULL` |

---

## 13. Date Semantics

- **Date-only** (due dates, budget months): `YYYY-MM-DD`, `YYYY-MM` — local calendar, no UTC conversion
- **Timestamps** (created_at, updated_at): UTC epoch milliseconds or ISO strings
