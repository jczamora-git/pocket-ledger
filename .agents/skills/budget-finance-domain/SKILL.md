---
name: budget-finance-domain
description: Authoritative skill governing financial rules, integer-centavo Money, account balances, transfers, credit cards, budgets, bills, debts, and accounting logic.
---

# budget-finance-domain

## Purpose
Acts as the ultimate authority on mathematical accuracy, accounting standards, and financial integrity. Guarantees that currency representation avoids floating-point drift and that all financial workflows adhere to strict ledger-derivation principles.

## Use When
* Implementing or modifying any financial formula or calculation.
* Handling monetary storage, transformation, or parsing.
* Calculating balances for regular accounts, credit cards, net worth, or cash flow.
* Processing transfers and transfer fee computations.
* Updating budget progress, spending thresholds, or debt settlements.
* Defining semantics for untracked/historical transactions.

## Responsibilities
* Enforce integer centavos (₱1.00 = 100) across all monetary fields.
* Maintain a `Money` utility with integer-centavo arithmetic and formatted output.
* Define explicit mathematical formulas for all domain aggregators.
* Mandate deterministic unit test coverage for every financial rule.

## Non-Negotiable Rules
1. **Never Use Floats for Money:** Currency must **NEVER** be represented as `number` with decimal semantics for authoritative state. Use integer centavos.
2. **Ledger Derivation:** Balances derive from `opening_balance + Σ transactions`. No independent mutable balance field.
3. **Credit Cards Are Liabilities:** Outstanding balances reduce net worth. Available credit ≠ available cash.
4. **Consistent Untracked Semantics:** Untracked transactions have explicit, tested exclusion from balances, budgets, and cash-flow.
5. **Atomic Transfer Model:** Source debited `(amount + fee)`, destination credited `amount`, fee borne by source.

## Mathematical Formulas

**Regular Account Balance:**
```
Balance = opening_cents + Σ income + Σ transfer_in − Σ expense − Σ (transfer_out + fee)
```
*(excluding is_untracked = true)*

**Credit Card:**
```
Outstanding = opening_debt + Σ expenses + Σ transfers_out − Σ payments_in
Available_Credit = max(credit_limit − outstanding, 0)
```

**Net Worth:**
```
Net_Worth = Liquid_Cash + Receivables − Credit_Card_Debt − Liabilities
```

**Transfer Fee:**
```
Fee = fixed_fee_cents + round(amount_cents × rate_basis_points / 10000)
```

**Budget Progress:**
```
Spent = Σ expenses for (category, month) where is_untracked = false
Remaining = max(limit − spent, 0)
```

**Bill Status:**
```
remaining = max(bill_amount − Σ payments, 0)
status = paid | partially_paid | pending | overdue (derived from date)
```

**Debt Remaining:**
```
remaining = max(original_amount − Σ debt_payments, 0)
```

## Workflow
1. **Define the Formula** explicitly in centavos before writing TypeScript.
2. **Encapsulate** in pure domain functions free of UI or framework dependencies.
3. **Write Tests First** for positive cases, zero amounts, edges, fee rounding, date boundaries.
4. **Review Against Legacy** — correct known Flutter/PrivTRack bugs (e.g., untracked budget leakage, float hacks).
5. **Handoff** clean domain interfaces to database and architect skills.

## Validation
* [ ] All monetary values use integer centavos.
* [ ] Zero `number` with decimal currency semantics in domain code.
* [ ] Edge cases (zero, negative, overdrawn, over-limit) handled.
* [ ] Comprehensive unit tests pass.
* [ ] No UI or database dependencies in domain files.

## Must Not Do
* Must NOT permit floating-point storage or authoritative arithmetic.
* Must NOT embed business logic inside screen components.
* Must NOT duplicate calculation logic across UI and notification modules.

## Related Skills
* `budget-sqlite-database` — column types (INTEGER) and SQL aggregation queries.
* `budget-ui` — currency formatting for read-only rendering.
* `budget-qa` — define test matrices for financial regression.

## Completion Criteria
All financial formulas are documented, implemented using integer centavos, accompanied by deterministic unit tests, and verified to be precision-safe.
