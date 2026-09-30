---
name: budget-migration
description: Governs the Flutter → Expo React Native translation, preserving domain semantics while avoiding Flutter-specific implementation copying.
---

# budget-migration

## Purpose
Oversees the technical transition from the Flutter codebase to the Expo React Native codebase. Ensures faithful translation of visual designs, financial rules, and user experience while filtering out Flutter-specific architectural patterns.

## Use When
* Porting a Flutter screen or widget to React Native.
* Translating Flutter navigation patterns to Expo Router.
* Cross-referencing Flutter financial behavior against new Expo implementations.
* Deciding what to preserve vs. what to improve during translation.

## Responsibilities
* Treat `C:\Users\JC Zamora\Documents\Jeizi_Programming_Apps\budget-tracker-flutter` as **STRICTLY READ-ONLY**.
* Map Flutter widgets to idiomatic React Native components.
* Preserve user experience, terminology, and Philippine financial conventions.
* Identify Flutter bugs that must **NOT** be reproduced in Expo.
* Consult `docs/PORTING_CONTEXT.md` before reading Flutter source files.

## Non-Negotiable Rules
1. **Never Touch the Source:** Never modify, format, install, or change Git state in the Flutter repository.
2. **No Line-for-Line Porting:** Translate concepts to native React Native idioms. Don't create awkward Flutter wrappers.
3. **No Legacy Flaw Reproduction:** Do not replicate known bugs (float arithmetic, untracked leakage, monolithic state).
4. **Read PORTING_CONTEXT.md First:** Only consult Flutter source when the porting context doc lacks necessary detail.

## Flutter → Expo Mapping Reference

| Flutter | Expo / React Native |
|---|---|
| `Widget` | React component (functional) |
| `StatefulWidget` / `setState` | `useState` / `useReducer` hook |
| `Riverpod` providers | React hooks / Zustand stores |
| `GoRouter` / `StatefulShellRoute` | Expo Router / `(tabs)` layout |
| `Drift` tables + DAOs | expo-sqlite + repository functions |
| `ThemeData` / `AppColors` | TypeScript theme tokens (`src/theme/`) |
| `BackdropFilter` | `expo-blur` / `BlurView` |
| `SafeArea` | `react-native-safe-area-context` |
| `Material Icons` | `@expo/vector-icons` (MaterialIcons) |
| `showModalBottomSheet` | React Native `Modal` or bottom sheet library |
| `Scaffold` | `SafeAreaView` + `View` layout |
| `SizedBox` | `View` with `width`/`height` style |
| `Expanded` / `Flexible` | `flex: 1` / `flexShrink` styles |
| `ListView` / `CustomScrollView` | `ScrollView` / `FlatList` |
| `GestureDetector` / `InkWell` | `Pressable` / `TouchableOpacity` |
| `dart format . → flutter analyze → flutter test` | `npx tsc --noEmit → npx expo-doctor → npm test` |

## Workflow
1. **Read PORTING_CONTEXT.md** for the target screen/feature summary.
2. **If needed**, inspect the specific Flutter source file (read-only).
3. **Extract Core UX:** Identify essential flow, fields, validation, and visual design.
4. **Filter Flutter Idioms:** Strip Riverpod, GoRouter, Drift-specific patterns.
5. **Implement Native RN Equivalent:** Build using Expo Router, hooks, and design tokens.
6. **Verify Parity:** Check that financial edge cases are handled correctly.

## Must Not Do
* Must NOT modify any Flutter project file.
* Must NOT import Flutter/Dart concepts directly.
* Must NOT replicate monolithic state providers.

## Related Skills
* `budget-finance-domain` — resolves mathematical discrepancies.
* `budget-sqlite-database` — maps Drift schema to expo-sqlite.
* `budget-ui` — matches visual layouts and animations.

## Completion Criteria
Features are cleanly ported to native React Native architecture, Flutter-specific patterns are eliminated, and zero changes occur in the Flutter repository.
