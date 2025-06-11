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
    textButton: '#FFF',
    backgroundButton: '#D63384',
    shadowColor: '#000',
    aliveBadge: '#00FF00',
    deadBadge: '#FF0000',
    unknownBadge: '#FFC107',
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'dark-content' as const,
};
