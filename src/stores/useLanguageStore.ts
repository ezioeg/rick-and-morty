import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

type LanguageState = {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
};

export const useLanguageStore = create(
  persist<LanguageState>(
    set => ({
      language: 'en',
      setLanguage: lang => {
        i18n.changeLanguage(lang);
        set({language: lang});
      },
    }),
    {
      name: 'language-storage',
      storage: {
        getItem: async name => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);
