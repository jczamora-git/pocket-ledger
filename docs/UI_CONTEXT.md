# UI Context — Pocket Ledger

Current Flutter UI decisions captured for Expo translation. No Flutter code — only design intent and behavior.

---

## 1. Screen Structure

| Screen | Route | Tab Index | Content Summary |
|---|---|---|---|
| Dashboard | `/` | 0 | Greeting, cash hero, net worth, quick actions, alerts, spending, budgets, bills, debts, activity |
| Activity | `/transactions` | 1 | Filter tabs, month selector, inflow/outflow summary, transaction list |
| Budgets | `/budgets` | 2 | Month selector, budget cards with progress bars |
| Bills | `/bills` | 3 | Filter tabs, bill cards with priority/status badges |
| Accounts | `/more/accounts` | via More | Account cards with type icon, balance, institution |
| Debts | `/more/debts` | via More | Direction filter, debt cards with progress |
| Reports | `/more/reports` | via More | Placeholder |
| Settings | `/more/settings` | via More | Placeholder |
| Notifications | `/notifications` | modal | Notification center |

---

## 2. Navigation Dock

### Primary Dock (4 items)
- **Shape:** Dark pill, rounded corners, floating above content
- **Background:** `#17191D` (surfaceDark)
- **Icons:** Home, Activity (receipt), Budgets (pie chart), Bills (description)
- **Active indicator:** Accent dot below icon
- **Labels:** None visible — icon-only with accessibility labels
- **Width:** Constrained to ~280px total (dock + more node), responsive via FittedBox

### More Action Node
- **Shape:** 54×54 dark circle, separate from dock, to the right
- **Icon:** Grid view (closed) → Close X (open), animated rotation
- **Border:** White 10% opacity normally; accent green when active
- **Shadow:** Accent glow when open, dark shadow when closed

### More Tools Menu
- **Position:** Drop-up above More node, right-aligned
- **Width:** 190px
- **Background:** `#17191D` with subtle white 12% border
- **Items:** Accounts, Debts, Reports, Settings
- **Item layout:** 30px icon circle + label text + active dot
- **Animation:** Scale (0.85→1) + opacity (0→1) + slide (0.08→0), ~200ms ease

---

## 3. Backdrop Blur Behavior

When More menu is open:
- Full-screen `BackdropFilter` blur (sigma 10, 10) + black 35% overlay
- Covers ALL content including the primary dock
- More node + tools menu remain sharp (rendered above blur layer)
- Tapping blurred area closes menu
- Blur layer blocks interaction with underlying controls

**Stack layer order:**
1. Screen content (branch body)
2. Primary dock (bottom-aligned)
3. Blur overlay (full-screen, blocks touch)
4. More node + tools menu (sharp, interactive)

---

## 4. Card Design

### PocketCard (Standard)
- Background: white (`#FFFFFF`)
- Radius: 24px
- Padding: 20px
- Border: `#ECECEF` at 60% opacity
- Shadow: blur 16, offset(0,4), black 5%

### Dark Cards (Debts summary)
- Gradient: `#1E222A` → `#17191D`
- Radius: 20px
- White text with opacity variations

### Shadows
- Card: `rgba(0,0,0,0.05)` blur 16, offset(0,4)
- Pop (dock): `rgba(0,0,0,0.18)` blur 28, offset(0,8)
- Glow (accent): `rgba(16,185,129,0.45)` blur 18, offset(0,6)

---

## 5. Dashboard Layout Hierarchy

1. **Greeting** — "Good morning, Jeizi" with notification bell + settings gear
2. **Available Cash** — Dark gradient hero card, large ₱ amount, "Net worth" subtitle
3. **Quick Actions** — Row of 3 icon circles: Add Income (green), Add Expense (red), Transfer (blue)
4. **Alert Banner** — Amber card with warning icon, dismissible
5. **Spending Activity** — Inflow vs Outflow bar comparison
6. **Budgets Preview** — 3 budget progress bars with "View all" link
7. **Upcoming Bills** — Bill rows with due date and priority badge
8. **Debts Summary** — Dark gradient card with "You owe" + "Owed to you"
9. **Recent Activity** — Last 5 transaction list items with "View all" link

---

## 6. Responsive Lessons (from Flutter)

### Solved Overflow Issues
- FittedBox wrapping the dock + More node prevents horizontal overflow
- Width constraint (280px) keeps layout compact on narrow screens
- All text rows use `Expanded` + `TextOverflow.ellipsis` / `maxLines`
- Bill amounts use `FittedBox` for graceful shrinking
- Budget spent/limit labels use `FittedBox` with `scaleDown`

### Rules for Expo
- Use `flex` and `flexShrink` instead of hardcoded widths
- Use `numberOfLines` + `ellipsizeMode="tail"` on all text in cards/lists
- Constrain dock width with `maxWidth` instead of fixed pixel values
- Test on 360dp (narrow) and 412dp (normal) Android widths
- Avoid horizontal `Row` layouts that exceed screen width without wrapping

---

## 7. Typography Patterns

- Currency amounts: tabular figures (monospace numbers) for alignment
- Hero amounts: 36px bold white on dark backgrounds
- Card titles: 16px semibold
- Body text: 15px normal / 13px secondary
- Labels/badges: 12px medium
- Money in lists: 15px semibold with tabular figures

---

## 8. Status Badges & Priority Colors

| Priority | Color |
|---|---|
| Urgent | `#FF4D4F` (expense red) |
| High | `#F59E0B` (amber) |
| Normal | `#3B82F6` (blue) |
| Low | `#8E8E93` (muted) |

| Bill Status | Color |
|---|---|
| Pending | `#F59E0B` (amber) |
| Partial | `#3B82F6` (blue) |
| Paid | `#16C784` (income green) |
| Overdue | `#FF4D4F` (expense red) |

---

## 9. Icon Mapping (Flutter → Expo)

| Usage | Flutter Icon | Expo Equivalent |
|---|---|---|
| Home | `Icons.home_outlined` | `home-outline` (MaterialCommunityIcons) or `home` |
| Activity | `Icons.receipt_long_outlined` | `receipt-long` or `receipt` |
| Budgets | `Icons.pie_chart_outline` | `pie-chart-outline` |
| Bills | `Icons.description_outlined` | `description` |
| More (closed) | `Icons.grid_view_rounded` | `grid-view` or `apps` |
| More (open) | `Icons.close_rounded` | `close` |
| Accounts | `Icons.account_balance_wallet_outlined` | `account-balance-wallet` |
| Debts | `Icons.handshake_outlined` | `handshake-outline` (MaterialCommunityIcons) |
| Reports | `Icons.insert_chart_outlined` | `insert-chart-outlined` |
| Settings | `Icons.settings_outlined` | `settings` |
| Notifications | `Icons.notifications_outlined` | `notifications-outline` |
