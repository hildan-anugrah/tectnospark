import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import idTranslation from '../assets/locales/id.json';
import enTranslation from '../assets/locales/en.json';

// Detect initial language from URL path (/en or /id)
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/id')) return 'id';
  }
  return 'id'; // Default Indonesian
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: idTranslation },
      en: { translation: enTranslation }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export { idTranslation, enTranslation };
export default i18n;
