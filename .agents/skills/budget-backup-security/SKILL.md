---
name: budget-backup-security
description: Governs future on-device security, PIN/biometric auth, secure storage, backup export/import, encrypted archives, and atomic restore.
---

# budget-backup-security

## Purpose
Guarantees privacy, confidentiality, and data survivability of Pocket Ledger records on the user's device. Manages local authentication, backup creation, payload versioning, and safe restoration.

## Use When
* Implementing app-lock security (PIN, biometric).
* Exporting user data to JSON or database archive files.
* Implementing encrypted backup archives.
* Importing or restoring backups into local database.
* Managing secure storage of secrets on-device.

## Responsibilities
* Clearly distinguish three security layers:
  1. **App Lock:** Local biometric/PIN gate preventing unauthorized access.
  2. **Database Encryption:** At-rest encryption of the SQLite file (future SQLCipher or equivalent).
  3. **Backup Encryption:** Symmetric encryption (AES-256-GCM) protecting exported files.
* Maintain backup format versioning and schema validation.
* Guarantee atomic restoration — no partial imports.
* Zero cloud or third-party tracking in exported files.

## Non-Negotiable Rules
1. **No False Security Claims:** Never claim SQLite is encrypted unless explicitly verified. Never conflate App Lock with Database Encryption.
2. **Atomic Restoration:** Restore must validate the payload and replace data atomically. Never leave the database half-imported.
3. **No Cleartext PIN Storage:** Use `expo-secure-store` or salted cryptographic hash. Never plain text in AsyncStorage.
4. **Offline Export/Import:** Backup files saved via local file pickers. Never transmit over network.

## Backup Format
```json
{
  "format": "pocket_ledger_backup",
  "version": 1,
  "exported_at": "2026-10-01T02:00:00.000Z",
  "data": {
    "accounts": [],
    "transactions": [],
    "categories": [],
    "budgets": [],
    "bills": [],
    "debts": [],
    "debt_payments": [],
    "settings": {}
  }
}
```

## Workflow
1. **Validate Format:** On import, confirm `format === "pocket_ledger_backup"` and supported `version`.
2. **Integrity Check:** Validate foreign key references in payload.
3. **Atomic Replace:** Within a transaction, clear and re-insert all records.
4. **Post-Restore Verify:** Assert record counts and reload state.

## Must Not Do
* Must NOT store cleartext PINs.
* Must NOT perform partial imports.
* Must NOT transmit backup archives over the internet.

## Related Skills
* `budget-sqlite-database` — atomic transaction restoration.
* `budget-finance-domain` — validates integer-centavo compliance of imported data.
* `budget-qa` — tests corrupted backup handling and rollback.

## Completion Criteria
Backup generates clean versioned archives, restore runs atomically, and app-lock uses secure cryptographic storage.
