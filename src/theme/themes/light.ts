import {spacing} from '@theme/base/spacing';
import {typography} from '@theme/base/typography';
import {border} from '@theme/base/border';

export const lightTheme = {
  colors: {
    background: '#FFFFFF',
    textPrimary: '#1A1A1A',
    textSecondary: '#666F80',
    border: '#CCCCCC',
    accent: '#7ECF6B',
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'dark-content' as const,
};
