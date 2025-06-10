import {spacing} from '@theme/base/spacing';
import {typography} from '@theme/base/typography';
import {border} from '@theme/base/border';

export const multiverseTheme = {
  colors: {
    background: '#1E1E2F',
    textPrimary: '#7FFFD4',
    textSecondary: '#66B2B2',
    border: '#2C3A47',
    accent: '#00FFFF',
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'light-content' as const,
};
