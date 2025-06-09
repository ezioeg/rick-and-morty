import {spacing} from '@theme/base/spacing';
import {typography} from '@theme/base/typography';
import {border} from '@theme/base/border';

export const portalTheme = {
  colors: {
    background: '#E0FFDE', // Verde pastel
    textPrimary: '#D63384', // Fucsia intenso
    textSecondary: '#F199C1', // Rosa pastel
    border: '#D8B4FE', // Lila claro
    accent: '#38BDF8', // Azul claro vibrante
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'dark-content' as const,
};
