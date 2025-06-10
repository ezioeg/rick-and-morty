import {create} from 'zustand';
import {multiverseTheme, lightTheme} from '@theme/themes';

type ThemeState = {
  theme: typeof multiverseTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
};

export const useThemeStore = create<ThemeState>(set => ({
  theme: multiverseTheme, // tema oscuro por defecto, pon lightTheme si quieres claro por defecto
  isDark: true,
  toggleTheme: () =>
    set(state => {
      const isNowDark = !state.isDark;
      return {
        isDark: isNowDark,
        theme: isNowDark ? multiverseTheme : lightTheme,
      };
    }),
  setLightTheme: () => set({isDark: false, theme: lightTheme}),
  setDarkTheme: () => set({isDark: true, theme: multiverseTheme}),
}));
