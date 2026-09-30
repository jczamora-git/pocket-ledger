---
name: budget-qa
description: Governs testing strategy, automated test suites, financial regression tests, component tests, navigation tests, and static code quality verification.
---

# budget-qa

## Purpose
Guarantees reliability, stability, and mathematical correctness through automated testing and static analysis. Ensures no regressions in financial calculations, database transactions, UI rendering, or navigation flows.

## Use When
* Writing or modifying unit tests for financial formulas and models.
* Creating component tests for screens, forms, and navigation flows.
* Testing database operations, migrations, and transactional rollbacks.
* Executing the validation pipeline before completing any task.
* Verifying TypeScript compilation and lint rules.

## Responsibilities
* Implement deterministic unit tests for accounting and finance rules.
* Implement component smoke and interaction tests.
* Verify database operations execute atomically and roll back on errors.
* Execute the validation pipeline:
  ```powershell
  npx tsc --noEmit       # TypeScript compilation
  npx expo-doctor        # Expo health check
  npm test               # Test suite
  ```
* Reject any attempt to silence errors via broad ignore directives.

## Non-Negotiable Rules
1. **Never Skip or Delete Tests:** Failing tests indicate bugs. Never delete or weaken tests to pass.
2. **Deterministic Finance Tests:** Use exact integer-centavo assertions. Never use fuzzy tolerances (`expect.closeTo`).
3. **Zero TypeScript Errors:** `npx tsc --noEmit` must exit clean.
4. **Sequential Verification:** Run checks sequentially: typecheck → doctor → test. Don't skip steps.
5. **No Silent Ignores:** Fix root causes rather than adding `@ts-ignore` or `eslint-disable`.

## Mandatory Finance Test Matrix

Every financial feature must include tests for:
* **Normal Cases:** Standard income, expense, transfer arithmetic.
* **Zero Boundary:** ₱0.00 balances, zero limits, zero fees.
* **Negative & Limit Boundaries:** Overdrawn accounts, budget overruns, over-credit-limit.
* **Transfer Fee Deductions:** Fixed fees, percentage basis points, sender balance impact.
* **Untracked Flag Isolation:** Proving untracked transactions don't alter live balances.
* **Date & Month Boundaries:** Transactions on 1st/last day of month, leap years.
* **Rollback Verification:** Simulated exception during multi-table mutation verifying zero persistence.

## Workflow
1. **Identify Test Type:** Unit (domain math), component (UI interaction), or database (transactions).
2. **Write Targeted Test:** Use Given-When-Then pattern.
3. **Execute Specific Test:** Run targeting the modified test file.
4. **Run Full Pipeline:** TypeScript → Doctor → Tests.
5. **Review Results:** All must exit code 0.

## Validation
* [ ] Unit tests cover all branches of financial functions.
* [ ] Component tests verify absence of layout overflow on phone widths.
* [ ] Database tests use in-memory or test SQLite instances.
* [ ] `npx tsc --noEmit` reports zero errors.
* [ ] `npm test` reports all tests passed.

## Must Not Do
* Must NOT delete or disable existing tests to bypass failures.
* Must NOT add `@ts-ignore` or `eslint-disable` to suppress warnings.
* Must NOT claim UI behavior passed without actual test or runtime evidence.

## Related Skills
* `budget-finance-domain` — financial test cases and edge cases.
* `budget-sqlite-database` — tests repository operations and rollback.
* `budget-ui` — verifies component rendering and navigation routing.

## Completion Criteria
Comprehensive tests exist, cover happy paths and failure edges, and the validation pipeline exits cleanly across typecheck, doctor, and test execution.
