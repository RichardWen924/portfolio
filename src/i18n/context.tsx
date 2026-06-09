import { createContext, useState, useCallback, type ReactNode } from 'react';
import type { Lang } from './translations';

export const LanguageContext = createContext<{
  lang: Lang;
  toggleLang: () => void;
}>({ lang: 'en', toggleLang: () => {} });

function detectLanguage(): Lang {
  const saved = localStorage.getItem('lang');
  if (saved === 'zh' || saved === 'en') return saved;
  if (typeof navigator !== 'undefined' && navigator.language.startsWith('zh')) return 'zh';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLanguage);

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
