import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import es from './es.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: 'en', // Idioma por defecto
  fallbackLng: 'en',
  resources: {
    en: {translation: en},
    es: {translation: es},
  },
  interpolation: {
    escapeValue: false, // React ya hace escaping
  },
});

export default i18n;
