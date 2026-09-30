# Architecture Decision Records (ADRs) — Pocket Ledger Expo

Foundational architectural decisions for the Expo React Native application.

---

## ADR-001: Expo + React Native Native-Mobile Architecture
* **Status:** Accepted
* **Decision:** Build the application using Expo and React Native as a native mobile application.
* **Consequences:** Native performance, access to device APIs, platform-specific UI capabilities. No web-first compromises.

---

## ADR-002: No WebView Application Architecture
* **Status:** Accepted
* **Decision:** The application must use native React Native components (View, Text, Pressable, FlatList, etc.). Never wrap a web page in a WebView.
* **Consequences:** Ensures native performance and UX. Eliminates Ionic/Cordova-style hybrid architectures.

---

## ADR-003: Local-First / Offline-First
* **Status:** Accepted
* **Context:** The predecessor Flutter application was designed as local-first after migrating away from cloud-dependent Supabase.
* **Decision:** All data resides on the user's device. The application functions with zero internet connectivity.
* **Consequences:** Zero latency, complete privacy, no remote service dependency.

---

## ADR-004: No Mandatory Backend
* **Status:** Accepted
* **Decision:** No mandatory user registration, login, cloud profiles, or external backend infrastructure.
* **Consequences:** Eliminates authentication services, REST API clients, and session management. Single-owner local data model.

---

## ADR-005: Expo Router
* **Status:** Accepted
* **Decision:** Use Expo Router for file-based declarative navigation.
* **Consequences:** Tab and stack navigation with preserved scroll state. Clean URL-based routing pattern.

---

## ADR-006: expo-sqlite for Future Persistence
* **Status:** Accepted
* **Context:** The Flutter application uses Drift over SQLite. The Expo equivalent is expo-sqlite.
* **Decision:** Use `expo-sqlite` as the primary persistence engine for complex relational financial data.
* **Consequences:** ACID transactions, foreign key constraints, fast indexing, and offline-capable storage. AsyncStorage is reserved for lightweight UI preferences only.

---

## ADR-007: Integer-Centavo Money Representation
* **Status:** Accepted
* **Context:** Floating-point (IEEE-754) causes rounding drift in currency calculations.
* **Decision:** All currency is stored and manipulated as integer centavos (₱1.00 = 100). A `Money` utility provides arithmetic and formatting.
* **Consequences:** Exact arithmetic, integer database columns, zero rounding drift.

---

## ADR-008: Feature-Oriented Structure
* **Status:** Accepted
* **Decision:** Organize code by feature domain (`src/features/<feature>/`) rather than by layer.
* **Consequences:** Isolated feature boundaries, modular development, prevention of cross-domain coupling.

---

## ADR-009: Atomic Financial Multi-Step Writes
* **Status:** Accepted
* **Decision:** All multi-step financial mutations must execute within atomic SQLite transactions. Failure rolls back everything.
* **Consequences:** Guarantees database consistency, prevents orphaned records, ensures balance integrity.

---

## ADR-010: Flutter Project is Read-Only Migration Reference
* **Status:** Accepted
* **Decision:** The Flutter project at `budget-tracker-flutter` is strictly read-only reference material. It must never be modified.
* **Consequences:** Protects the original codebase. Migration extracts concepts but does not copy Flutter idioms literally.

---

## ADR-011: Android-First
* **Status:** Accepted
* **Decision:** Optimize layouts, touch targets, and safe areas for Android phones first. iOS is a secondary future target.
* **Consequences:** Responsive layouts using flex, adaptive sizing, and Android-first testing with Expo Go.

---

## ADR-012: No Giant Global State Store
* **Status:** Accepted
* **Context:** The legacy PrivTRack application used a monolithic React Context bundling all entities.
* **Decision:** Use local React state for component-scoped UI state. Use Zustand for shared state when needed. Never create a single store holding all application state.
* **Consequences:** Fine-grained updates, no unnecessary re-renders, clean feature isolation.
