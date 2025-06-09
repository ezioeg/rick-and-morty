import {spacing} from '@theme/base/spacing';
import {typography} from '@theme/base/typography';
import {border} from '@theme/base/border';

export const darkTheme = {
  colors: {
    background: '#0D0D0D',
    textPrimary: '#E6F7FF', // Azul muy claro (mejor que blanco puro)
    textSecondary: '#9DD9F3', // Azul pastel, no tan plano como gris
    border: '#333333',
    accent: '#9A6BFF',
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'light-content' as const,
};
