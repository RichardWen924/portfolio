import { useContext } from 'react';
import { LanguageContext } from './context';
import { translations } from './translations';

export function useT() {
  const { lang } = useContext(LanguageContext);
  return translations[lang];
}

export { LanguageProvider, LanguageContext } from './context';
export { translations } from './translations';
export type { Lang, Translations } from './translations';
