'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Translations } from './translations';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    // Update document direction and language for RTL languages
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
      document.documentElement.lang = language === 'AR' ? 'ar' : language.toLowerCase();
      
      // Add Arabic class to body for font styling
      if (language === 'AR') {
        document.body.classList.add('arabic-text');
      } else {
        document.body.classList.remove('arabic-text');
      }
    }
  };

  // Set initial language attributes on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = currentLanguage === 'AR' ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLanguage === 'AR' ? 'ar' : currentLanguage.toLowerCase();
      
      if (currentLanguage === 'AR') {
        document.body.classList.add('arabic-text');
      } else {
        document.body.classList.remove('arabic-text');
      }
    }
  }, [currentLanguage]);

  const t = translations[currentLanguage] || translations.EN;
  const isRTL = currentLanguage === 'AR';

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}