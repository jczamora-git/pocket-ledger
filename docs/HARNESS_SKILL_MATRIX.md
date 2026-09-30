# Harness Skill Matrix — Pocket Ledger Expo

Quick reference mapping common development tasks to the required skill(s).

---

## Task → Skill Mapping

| Task | Primary Skill | Supporting Skills |
|---|---|---|
| **Port Dashboard UI** | `budget-ui` | `budget-migration`, `budget-expo-architect` |
| **Port floating dock** | `budget-ui` | `budget-expo-architect`, `budget-migration` |
| **Port More menu + backdrop blur** | `budget-ui` | `budget-expo-architect`, `budget-migration` |
| **Create Expo Router shell** | `budget-expo-architect` | `budget-migration`, `budget-qa` |
| **Port design system / theme tokens** | `budget-ui` | `budget-migration` |
| **Port Activity screen** | `budget-ui` | `budget-migration` |
| **Port Budgets screen** | `budget-ui` | `budget-migration`, `budget-finance-domain` |
| **Port Bills screen** | `budget-ui` | `budget-migration`, `budget-finance-domain` |
| **Port Accounts screen** | `budget-ui` | `budget-migration` |
| **Port Debts screen** | `budget-ui` | `budget-migration`, `budget-finance-domain` |
| **Implement Money utility** | `budget-finance-domain` | `budget-qa` |
| **Implement income/expense CRUD** | `budget-finance-domain` | `budget-sqlite-database`, `budget-qa` |
| **Implement transfer** | `budget-finance-domain` | `budget-sqlite-database`, `budget-qa` |
| **Implement balance engine** | `budget-finance-domain` | `budget-sqlite-database`, `budget-qa` |
| **Implement budget tracking** | `budget-finance-domain` | `budget-sqlite-database`, `budget-qa` |
| **Implement bill payments** | `budget-finance-domain` | `budget-sqlite-database`, `budget-qa` |
| **Implement debt payments** | `budget-finance-domain` | `budget-sqlite-database`, `budget-qa` |
| **Create SQLite schema** | `budget-sqlite-database` | `budget-finance-domain`, `budget-qa` |
| **Schema migration** | `budget-sqlite-database` | `budget-qa` |
| **Repository layer** | `budget-sqlite-database` | `budget-expo-architect`, `budget-qa` |
| **Local bill reminders** | `budget-local-notifications` | `budget-finance-domain`, `budget-qa` |
| **Budget threshold alerts** | `budget-local-notifications` | `budget-finance-domain`, `budget-qa` |
| **App lock / biometrics** | `budget-backup-security` | `budget-qa` |
| **Backup export/import** | `budget-backup-security` | `budget-sqlite-database`, `budget-qa` |
| **Encrypted backup** | `budget-backup-security` | `budget-qa` |
| **Port sample data** | `budget-migration` | `budget-finance-domain` |
| **Write finance unit tests** | `budget-qa` | `budget-finance-domain` |
| **Write component tests** | `budget-qa` | `budget-ui` |
| **Write database tests** | `budget-qa` | `budget-sqlite-database` |
| **Zustand store design** | `budget-expo-architect` | `budget-qa` |
| **State management refactor** | `budget-expo-architect` | `budget-qa` |
| **New feature module** | `budget-expo-architect` | `budget-ui`, `budget-qa` |

---

## Reading Priority

For most implementation tasks:

1. **AGENTS.md** — global non-negotiable rules
2. **docs/PORTING_CONTEXT.md** — Flutter state and Expo mapping
3. **Relevant SKILL.md files** from the table above
4. **Target Expo source** related to the task
5. **Flutter source** — only when porting context lacks needed detail

This reading order is an explicit design goal of this harness.
