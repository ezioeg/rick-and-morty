import {spacing} from '@theme/base/spacing';
import {typography} from '@theme/base/typography';
import {border} from '@theme/base/border';

export const darkTheme = {
  colors: {
    background: '#0D0D0D',
    textPrimary: '#E6F7FF',
    textSecondary: '#9DD9F3',
    border: '#333333',
    accent: '#9A6BFF',
    textButton: '#FFF',
    backgroundButton: '#0D0D0D',
    shadowColor: '#E6F7FF',
    aliveBadge: '#00FF00',
    deadBadge: '#FF0000',
    unknownBadge: '#FFC107',
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'light-content' as const,
};
