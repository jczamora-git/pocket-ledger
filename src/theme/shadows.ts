import { ViewStyle } from 'react-native';

export const AppShadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  } as ViewStyle,

  pop: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 20,
    elevation: 8,
  } as ViewStyle,

  menu: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 12,
  } as ViewStyle,

  glow: {
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  } as ViewStyle,
};
