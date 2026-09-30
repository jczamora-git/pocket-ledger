export const AppColors = {
  // Canvas & Surfaces
  bg: '#F4F4F6',
  surface: '#FFFFFF',
  surfaceDark: '#17191D',
  surfaceDark2: '#1E222A',
  surfaceDark3: '#272C35',

  // Typography & Inks
  ink: '#111216',
  inkSecondary: '#48484E',
  muted: '#8E8E93',
  faint: '#B8B8BF',
  line: '#ECECEF',

  // Brand & Accents
  accent: '#10B981',
  accentDeep: '#0C8F62',

  // Financial Semantics
  income: '#16C784',
  expense: '#FF4D4F',
  amber: '#F59E0B',
  blue: '#3B82F6',
  violet: '#8B5CF6',
} as const;

export type AppColorToken = keyof typeof AppColors;
