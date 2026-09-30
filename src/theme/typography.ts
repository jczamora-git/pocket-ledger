import { TextStyle } from 'react-native';
import { AppColors } from './colors';

export const AppTypography = {
  displayLarge: {
    fontSize: 34,
    fontWeight: '700',
    color: AppColors.ink,
    letterSpacing: -0.5,
  } as TextStyle,

  displayHero: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  } as TextStyle,

  titleLarge: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.ink,
    letterSpacing: -0.3,
  } as TextStyle,

  titleMedium: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.ink,
  } as TextStyle,

  bodyLarge: {
    fontSize: 15,
    fontWeight: '400',
    color: AppColors.ink,
  } as TextStyle,

  bodyMedium: {
    fontSize: 13,
    fontWeight: '400',
    color: AppColors.inkSecondary,
  } as TextStyle,

  labelMedium: {
    fontSize: 12,
    fontWeight: '500',
    color: AppColors.muted,
  } as TextStyle,

  labelSmall: {
    fontSize: 10,
    fontWeight: '600',
    color: AppColors.muted,
  } as TextStyle,

  moneyDisplay: {
    fontSize: 15,
    fontWeight: '600',
    color: AppColors.ink,
    fontVariant: ['tabular-nums'],
  } as TextStyle,

  moneyHero: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.5,
  } as TextStyle,
};
