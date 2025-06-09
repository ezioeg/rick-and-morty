import {spacing} from '../base/spacing';
import {typography} from '../base/typography';
import {border} from '../base/border';

export const multiverseTheme = {
  colors: {
    background: '#1E1E2F', // Gris azulado oscuro (charcoal)
    textPrimary: '#7FFFD4', // Aqua claro (neón suave)
    textSecondary: '#66B2B2', // Azul grisáceo suave
    border: '#2C3A47', // Gris azulado medio
    accent: '#00FFFF', // Cian brillante
  },
  spacing,
  typography,
  border,
  statusBarStyle: 'light-content' as const,
};
