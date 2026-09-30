# Pocket Ledger Development Harness (`.agents/`)

## 1. Purpose

The `.agents/` directory establishes an autonomous development harness for the local-first Pocket Ledger Expo React Native application. It defines specialized skills, workflows, and operational boundaries to ensure:

* Architectural consistency across independent coding sessions.
* Zero regressions in financial calculations and accounting rules.
* Strict adherence to offline-first, local-database standards.
* Prevention of scope creep and premature feature expansion.

---

## 2. Directory Structure

```text
.agents/
├── README.md                                # This file
└── skills/
    ├── budget-expo-architect/SKILL.md      # Expo Router, RN architecture, hooks, state
    ├── budget-finance-domain/SKILL.md      # Money, balances, accounting, transfer rules
    ├── budget-sqlite-database/SKILL.md     # expo-sqlite, schema, migrations, atomicity
    ├── budget-ui/SKILL.md                  # React Native design system, responsiveness
    ├── budget-local-notifications/SKILL.md # On-device alarms, bill/budget reminders
    ├── budget-backup-security/SKILL.md     # App lock, biometrics, backup, encryption
    ├── budget-migration/SKILL.md           # Flutter → Expo translation rules
    └── budget-qa/SKILL.md                  # Testing, finance regression, validation
```

---

## 3. Governance & Rule Precedence

1. **`AGENTS.md` (Root) is Supreme:** Rules in the root AGENTS.md override any skill instruction. A skill may refine operational procedures but can **NEVER** contradict or weaken root rules.
2. **Specialized Skills Refine Context:** Each skill defines precise boundaries: what it owns, what it must not do, required inputs, and completion criteria.
3. **Strict Scope Control:** Never exceed the boundaries of the user's explicit instructions or current development phase.

---

## 4. Skill Selection Guide

Select skills based on the primary nature of the task:

| Primary Task | Primary Skill | Supporting Skills |
|---|---|---|
| **Feature scaffolding / Routing / State** | `budget-expo-architect` | `budget-ui`, `budget-qa` |
| **Financial formulas / Accounting / Money** | `budget-finance-domain` | `budget-qa` |
| **SQLite tables / Repos / Migrations** | `budget-sqlite-database` | `budget-finance-domain`, `budget-qa` |
| **Screens / Components / Design tokens** | `budget-ui` | `budget-expo-architect` |
| **Scheduled alerts / Bill reminders** | `budget-local-notifications` | `budget-finance-domain`, `budget-qa` |
| **PIN / Biometrics / Backup & Restore** | `budget-backup-security` | `budget-sqlite-database`, `budget-qa` |
| **Flutter → Expo porting decisions** | `budget-migration` | `budget-finance-domain`, `budget-ui` |
| **Test writing / Quality checks** | `budget-qa` | Relevant domain skill |

---

## 5. Multi-Skill Cooperation Protocol

1. **Design Before Persistence:** Financial operations must have domain math defined before schema or repositories are written.
2. **Persistence Before Presentation:** Repositories and hooks must expose validated data before UI components consume them.
3. **Mandatory QA Gate:** Any change impacting financial arithmetic, database queries, or navigation routes must be verified by `budget-qa` before completion.

---

## 6. Required Validation Workflow

Every functional modification must execute appropriate validation:

```powershell
npx tsc --noEmit          # TypeScript check
npx expo-doctor           # Expo health check
npm test                  # Test suite
```

* If any step fails, investigate and fix immediately.
* Never silence legitimate warnings with broad ignore directives.
* Never weaken or delete existing tests to achieve a passing result.
