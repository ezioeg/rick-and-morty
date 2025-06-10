import {spacing} from '@theme/base/spacing';
import {typography} from '@theme/base/typography';
import {border} from '@theme/base/border';

export const portalTheme = {
  colors: {
    background: '#E0FFDE',
    textPrimary: '#D63384',
    textSecondary: '#F199C1',
    border: '#D8B4FE',
    accent: '#D63384',
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'dark-content' as const,
};
