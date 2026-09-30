---
name: budget-local-notifications
description: Governs future on-device local notification scheduling, bill reminders, budget alerts, and notification deduplication using expo-notifications.
---

# budget-local-notifications

## Purpose
Owns the local notification and reminder subsystem. Replaces legacy cloud cron architecture with on-device scheduled notifications via `expo-notifications`.

## Use When
* Configuring scheduled reminders for bills approaching due dates.
* Triggering credit card payment alerts.
* Scheduling overdue debt follow-ups.
* Emitting budget threshold warnings.
* Managing notification permissions and cancellation.

## Responsibilities
* Schedule local notifications without requiring internet or backend servers.
* Reuse authoritative domain rules from `budget-finance-domain`.
* Implement idempotent scheduling with deterministic notification IDs.
* Cancel pending notifications when bills/debts are paid or deleted.

## Non-Negotiable Rules
1. **Zero Cloud Cron:** Never introduce cloud endpoints, external push servers, or service-role queries.
2. **Reuse Domain Calculations:** Do NOT write a parallel financial engine for notifications. Consume domain services directly.
3. **Idempotence:** Notification IDs must be deterministically derived from entity IDs so updates overwrite rather than duplicate.
4. **Immediate Cancel on Settle:** When a bill or debt is settled, its scheduled notification must be canceled immediately.

## Notification Trigger Matrix

| Event | Condition | Lead Time |
|---|---|---|
| Bill Due Today | `daysUntil == 0 && !paid` | Day of (9:00 AM) |
| Bill Due Tomorrow | `daysUntil == 1 && !paid` | 1 day before |
| Bill Overdue | `daysUntil < 0 && !paid` | On app launch |
| Budget Warning | `spent >= limit × alertPct / 100` | On expense insert |
| Budget Exceeded | `spent > limit` | On expense insert |

## Workflow
1. **Initialize:** Configure `expo-notifications` with channels and permissions.
2. **Schedule:** On bill/budget create/update, compute trigger time and schedule notification.
3. **Cancel on Mutation:** On settle/delete, cancel by deterministic ID.
4. **App Resume Sync:** On launch, evaluate overdue items and update notification feed.

## Must Not Do
* Must NOT depend on external push servers or cloud APIs.
* Must NOT invent divergent financial calculations.
* Must NOT trigger notifications for settled or archived items.

## Related Skills
* `budget-finance-domain` — criteria for budget limits and due dates.
* `budget-sqlite-database` — triggers scheduling hooks within repository mutations.
* `budget-qa` — tests scheduling and cancellation logic.

## Completion Criteria
All notifications run 100% locally, alarms reflect bill/debt due dates accurately, duplicates are prevented, and settlement clears pending reminders.
