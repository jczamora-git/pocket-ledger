export const AppRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  card: 24,
  sheet: 28,
  full: 9999,
} as const;

export type AppRadiusToken = keyof typeof AppRadius;
