---
name: budget-sqlite-database
description: Governs the future expo-sqlite persistence layer, schema design, migrations, repositories, indexing, and atomic multi-table transactions.
---

# budget-sqlite-database

## Purpose
Owns the local persistent storage layer using expo-sqlite over SQLite. Guarantees relational data integrity, on-device query performance, schema migration versioning, and strict transactional atomicity for all financial mutations.

## Use When
* Designing or modifying SQLite table schemas.
* Writing or updating repository classes / data access layers.
* Creating database migration steps.
* Configuring indexes, foreign keys, and cascading rules.
* Executing multi-table financial operations requiring rollback guarantees.

## Responsibilities
* Define SQLite tables with appropriate constraints (CHECK, FOREIGN KEY, UNIQUE).
* Enforce `INTEGER` column type for all monetary storage — never `REAL`.
* Guarantee atomic multi-step mutations via `db.withTransactionAsync()` or equivalent.
* Expose async query functions for UI consumption via repository interfaces.
* Document schema version increments and migration paths.

## Non-Negotiable Rules
1. **Zero Remote Dependencies:** Never introduce cloud databases, sync protocols, or remote APIs.
2. **Monetary Columns Must Be INTEGER:** All money columns store centavos as integers. Never use REAL for currency.
3. **Mandatory Transaction Boundaries:** Operations spanning multiple tables (bill payment + transaction insert, transfer, restore) MUST run within a SQLite transaction.
4. **No UI Imports in Database Layer:** Database modules must not import React Native components.
5. **No Blind Schema Wipes:** Never drop tables or destroy user data during upgrades. Implement explicit migration steps.

## Schema Overview (from Flutter Drift design)

Target tables for future implementation:

| Table | Key Columns | Notes |
|---|---|---|
| `accounts` | id, name, type, opening_balance_centavos, credit_limit_centavos, is_archived | Type: cash/ewallet/bank/savings/debit/credit |
| `categories` | id, name, kind, icon, is_system, is_archived | Kind: income/expense |
| `transactions` | id, account_id, category_id, type, amount_centavos, transfer_fee_centavos, is_untracked, transaction_date | CHECK(amount_centavos > 0) |
| `budgets` | id, category_id, month_key, limit_centavos, alert_percentage | UNIQUE(category_id, month_key) |
| `bills` | id, name, kind, amount_centavos, due_date, status, recurring_rule | Status: pending/partially_paid/paid |
| `bill_payments` | id, bill_id, transaction_id, amount_centavos, paid_date | Links bill settlement to ledger |
| `debts` | id, person_or_company, direction, original_amount_centavos, interest_rate_bp | Direction: i_owe/owed_to_me |
| `debt_payments` | id, debt_id, transaction_id, amount_centavos, paid_date | Installment audit trail |
| `app_settings` | key, value | Key-value preferences |

## Transaction Pattern (TypeScript)
```typescript
await db.withTransactionAsync(async () => {
  // 1. Update bill status
  await updateBillPayment(billId, paymentCentavos);
  // 2. Insert ledger transaction
  await insertTransaction({ ... });
  // If any step throws, entire transaction rolls back
});
```

## Migration Policy
* Schema starts at version 1. Each alteration increments by 1.
* New columns must be NULLABLE or have safe defaults.
* Never DROP TABLE on user devices.
* Foreign key checks remain active at runtime: `PRAGMA foreign_keys = ON`.

## Workflow
1. **Review Domain Models** from `budget-finance-domain`.
2. **Design Tables** with foreign keys, cascading rules, and indexes.
3. **Implement Repositories** exposing typed async functions.
4. **Wrap Multi-Table Writes** in explicit transactions.
5. **Write Migration Tests** verifying schema transitions preserve data.

## Validation
* [ ] All currency columns use INTEGER.
* [ ] Foreign keys and cascades match domain requirements.
* [ ] Multi-record mutations are wrapped in transactions.
* [ ] Indexes exist for frequent query filters.
* [ ] Rollback behavior verified by test.

## Must Not Do
* Must NOT introduce remote database clients.
* Must NOT call database functions directly from screen components.
* Must NOT use REAL SQLite column types for money.

## Related Skills
* `budget-finance-domain` — column types and calculation triggers.
* `budget-expo-architect` — injects repositories into feature hooks.
* `budget-qa` — tests database operations and rollback.

## Completion Criteria
Schema compiles cleanly, multi-step financial operations execute atomically, indexes optimize reads, and rollback tests pass.
