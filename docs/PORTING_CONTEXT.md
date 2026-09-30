# Porting Context — Flutter → Expo React Native

This document captures the current Flutter application state so future Codex sessions can work without repeatedly rereading the Flutter repository.

---

## 1. Project Goal

Migrate a private, local-first, offline-first budget tracker from Flutter to Expo React Native + TypeScript, preserving:
- Current visual direction
- Navigation behavior
- Financial domain rules
- Database design concepts
- Screen structure

---

## 2. Source & Target Paths

| | Path |
|---|---|
| **Flutter (read-only)** | `C:\Users\JC Zamora\Documents\Jeizi_Programming_Apps\budget-tracker-flutter` |
| **Expo (active)** | `C:\Users\JC Zamora\Documents\Jeizi_Programming_Apps\budget-tracker-expo` |

---

## 3. Current Flutter Architecture

### Project Structure
```
lib/
  main.dart
  app/
    app.dart              # MaterialApp + GoRouter
    router.dart           # StatefulShellRoute with 5 branches
    theme/
      app_colors.dart     # Color palette
      app_typography.dart # Text styles
      app_theme.dart      # ThemeData + card/sheet radius
  core/
    constants/app_constants.dart  # Enums: AccountType, TransactionType, Priority, BillStatus, DebtDirection
    database/                     # Drift schema, DAOs, repositories, seeds
    utils/
      money.dart            # Money value object (integer centavos)
      currency_formatter.dart # ₱ formatting (standard, whole, compact)
      date_helpers.dart
  features/
    dashboard/    # Main home screen
    transactions/ # Activity/transaction list
    budgets/      # Monthly budget tracker
    bills/        # Bill obligations
    accounts/     # Account management
    debts/        # Peer debts
    reports/      # Financial reports
    settings/     # App settings
    more/         # More screen (secondary nav target)
    notifications/ # Notification center
  shared/
    models/
      financial_models.dart  # AccountModel, CategoryModel, TransactionModel, BillModel, DebtModel, BudgetModel
      sample_data.dart       # Demo data for all models
    widgets/
      bottom_nav_shell.dart  # Main navigation scaffold with dock + more + blur
      floating_budget_dock.dart # PrimaryDock, MoreActionNode, MoreToolsMenu
      pocket_cards.dart      # PocketCard (white rounded card)
      badges.dart            # Status badges
      empty_state_widget.dart
      transaction_list_item.dart
```

### State Management
- **Riverpod** (`flutter_riverpod`) — feature-scoped providers
- Currently using sample data; Drift database schema exists but real persistence is early-phase

### Navigation (GoRouter)
- `StatefulShellRoute.indexedStack` with 5 branches
- Branch 0: `/` → Dashboard
- Branch 1: `/transactions` → Activity
- Branch 2: `/budgets` → Budgets
- Branch 3: `/bills` → Bills
- Branch 4: `/more` → More (with sub-routes: accounts, debts, reports, settings)
- Modal routes: `/notifications`, `/settings` (root-level)

---

## 4. Current Navigation Design

### Primary Floating Dock
- 4 icon-only items: Home, Activity, Budgets, Bills
- Dark pill shape (`#17191d` background)
- Floating above content with bottom padding
- No visible text labels
- Width constrained to 280px via FittedBox

### More Action Node
- Separate 54×54 circular dark button to the right of the dock
- Grid icon → Close icon rotation on toggle
- Accent border when active
- Glow shadow when open

### More Tools Menu
- Drop-up panel (190px wide) positioned above More node
- Dark surface (`#17191d`) with rounded corners (20px)
- Contains: Accounts, Debts, Reports, Settings
- Each item has icon circle + label + active indicator dot
- Animated: scale + opacity + slide transitions

### Full-Screen Backdrop
- When More is open: blur (sigma 10) + dim (black 35% opacity) covers entire screen
- Blur layer covers BOTH screen content AND primary dock
- More node + tools menu remain sharp (above blur layer)
- Tapping backdrop closes More menu
- Uses `BackdropFilter` with `ImageFilter.blur`

### Layer Architecture (Stack order)
1. Screen content
2. Primary floating dock
3. Full-screen blur/dim overlay (blocks interaction when open)
4. More action node + tools menu (always sharp)

### No Quick-Add FAB
The green "+" floating action button was intentionally removed. Bottom area is: `[Dock] [More]`

---

## 5. Current Visual Language

### Colors (AppColors)
| Token | Hex | Usage |
|---|---|---|
| `bg` | `#F4F4F6` | Canvas background |
| `surface` | `#FFFFFF` | Card/sheet background |
| `surfaceDark` | `#17191D` | Dark dock/surface |
| `surfaceDark2` | `#1E222A` | Dark variant |
| `surfaceDark3` | `#272C35` | Dark variant |
| `ink` | `#111216` | Primary text |
| `inkSecondary` | `#48484E` | Secondary text |
| `muted` | `#8E8E93` | Tertiary text |
| `faint` | `#B8B8BF` | Disabled/faint |
| `line` | `#ECECEF` | Borders/dividers |
| `accent` | `#10B981` | Brand emerald |
| `accentDeep` | `#0C8F62` | Deep emerald |
| `income` | `#16C784` | Income green |
| `expense` | `#FF4D4F` | Expense red |
| `amber` | `#F59E0B` | Warning amber |
| `blue` | `#3B82F6` | Info blue |
| `violet` | `#8B5CF6` | Accent purple |

### Typography (AppTypography)
| Style | Size | Weight | Usage |
|---|---|---|---|
| `displayLarge` | 34 | bold | Large headers |
| `displayHero` | 36 | w700 | Hero amounts (white) |
| `titleLarge` | 20 | w600 | Section titles |
| `titleMedium` | 16 | w600 | Card titles |
| `bodyLarge` | 15 | normal | Body text |
| `bodyMedium` | 13 | normal | Secondary body |
| `labelMedium` | 12 | w500 | Labels |
| `moneyDisplay` | 15 | w600 | Money values (tabular) |

### Spacing & Radius
| Token | Value |
|---|---|
| Card radius | 24px |
| Sheet radius | 28px |
| Card padding | 20px |
| Card shadow | blur 16, offset(0,4), black 5% |

### Cards
- `PocketCard`: White surface, 24px radius, 20px padding, subtle border + shadow
- Gradient cards for debts summary (dark gradient `surfaceDark2` → `surfaceDark`)

---

## 6. Current Screens

### Dashboard
- Greeting header ("Good morning") with notification + settings icons
- Available Cash hero card (gradient dark, large amount)
- Net Worth display
- Quick actions row: Add Income / Add Expense / Transfer (icon circles)
- Alert card (amber warning banner)
- Spending Activity section (Inflow vs Outflow bars)
- Budgets preview (progress bars: Food, Groceries, Transport)
- Upcoming Bills (bill rows with priority badges)
- Debts summary card (dark gradient, "You owe" + "Owed to you")
- Recent Activity (transaction list items)

### Activity (Transactions)
- Header "Activity"
- Segmented filter: All / Income / Expense / Transfer
- Month/period selector
- Summary: inflow vs outflow totals
- Transaction list (TransactionListItem: icon, merchant, category, amount, date)

### Budgets
- Header "Budgets" with month selector
- Budget cards with category, progress bar, spent/limit text
- Color coding: green (<80%), amber (80-99%), red (≥100%)

### Bills
- Header "Bills"
- Filter tabs: All / Pending / Paid / Overdue
- Bill cards with name, amount, due date, priority badge, status badge
- Progress indicator for partially paid

### Accounts
- Header "Accounts"
- Account cards with type icon, name, institution, balance
- Credit cards show outstanding + available credit

### Debts
- Header "Debts"
- Direction filter: I Owe / Owed to Me
- Debt cards with person, original amount, remaining, progress, due date

### Reports
- Placeholder screen

### Settings
- Placeholder screen

---

## 7. Financial Domain Enums & Constants

```
AccountType: cash, ewallet, bank, savings, debitCard, creditCard
TransactionType: income, expense, transfer
Priority: urgent, high, normal, low
BillStatus: pending, partiallyPaid, paid, overdue (derived)
DebtDirection: iOwe, owedToMe
```

---

## 8. Money Implementation

```typescript
// Flutter Money class → TypeScript equivalent needed
class Money {
  cents: number;  // integer centavos

  static fromCentavos(cents: number): Money
  static fromPesos(pesos: number): Money  // pesos * 100
  static fromDouble(amount: number): Money // round(amount * 100)
  static zero = Money.fromCentavos(0)

  toDouble(): number  // cents / 100 (display only)
  inPesos: number     // Math.floor(cents / 100)

  // Arithmetic: +, -, *, negate, abs
  // Comparison: <, <=, >, >=, ==
}
```

### Currency Formatter
- Standard: `₱1,234.56`
- Whole: `₱1,235`
- Short: `₱1,235`
- Compact: `₱1.2K`, `₱35K`, `₱1.5M`
- Parse: accepts "₱1,234.50" or "500" → Money

---

## 9. Sample Data Summary

| Entity | Count | Examples |
|---|---|---|
| Categories | 10 | Salary, Freelance, Food, Groceries, Utilities, Rent, Transport, Subscriptions, Shopping, Healthcare, Entertainment |
| Accounts | 6 | Wallet Cash, GCash, Maya, BPI Debit, UnionBank Savings, BDO Credit Card |
| Transactions | 7 | Salary ₱30K, Jollibee ₱285, SM ₱620, Netflix ₱449, Grab ₱145, Manila Water ₱850, Transfer ₱2K |
| Bills | 5 | Water ₱850, Electricity ₱2,850, Internet ₱1,699, BDO CC ₱3,200, Rent ₱7,000 |
| Debts | 3 | Kuya ₱5K/₱3K remaining, Marco ₱2.5K/₱1K remaining, Momo Lending ₱10K/₱4K remaining |
| Budgets | 5 | Food ₱6K, Groceries ₱5K, Transport ₱2.5K, Shopping ₱3K, Utilities ₱4.5K |

---

## 10. Database Design (Conceptual — for future expo-sqlite)

9 tables: accounts, categories, transactions, budgets, bills, bill_payments, debts, debt_payments, app_settings

Key constraints:
- All money columns are INTEGER (centavos)
- `CHECK(amount_centavos > 0)` on transactions
- `UNIQUE(category_id, month_key)` on budgets
- Foreign keys with ON DELETE RESTRICT (accounts, categories) or CASCADE (bill_payments, debt_payments)
- Indexes on frequently queried columns

See `docs/FINANCE_CONTEXT.md` for detailed financial rules.

---

## 11. Expo Replacement Mapping

| Flutter | Expo / React Native |
|---|---|
| `go_router` | Expo Router (`expo-router`) |
| `StatefulShellRoute.indexedStack` | Expo Router `(tabs)` layout |
| `Riverpod` | React hooks + Zustand |
| `Drift` + `sqlite3_flutter_libs` | `expo-sqlite` |
| `ThemeData` / `AppColors` | TypeScript theme tokens (`src/theme/`) |
| `BackdropFilter(ImageFilter.blur)` | `expo-blur` (`BlurView`) |
| `SafeArea` | `react-native-safe-area-context` |
| `Material Icons` | `@expo/vector-icons` (MaterialIcons family) |
| `dart format` + `flutter analyze` + `flutter test` | `npx tsc --noEmit` + `npx expo-doctor` + `npm test` |
| `pubspec.yaml` | `package.json` |
| `lib/` | `src/` + `app/` |

---

## 12. Deferred Features (NOT in initial Expo port)

- Real SQLite persistence (expo-sqlite implementation)
- Real CRUD operations for any entity
- Real balance engine / ledger derivation
- Real budget tracking engine
- Real bill payment settlement
- Real debt payment settlement
- Recurring bill automation
- Local notifications (expo-notifications)
- Biometrics / PIN lock
- Encrypted backup / restore
- SQLCipher database encryption
- Reports (currently placeholder in Flutter too)
- Settings functionality
