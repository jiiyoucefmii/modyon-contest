'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import styles from './IntroOverlay.module.css';
import { useLanguage } from '../lib/LanguageContext';

interface IntroOverlayProps {
  onReveal: () => void;
}

export default function IntroOverlay({ onReveal }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const { t } = useLanguage();

  // Run before paint to avoid flashing overlay on small screens
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const mm = window.matchMedia('(max-width: 640px)');
    const handleChange = () => {
      const mobile = mm.matches;
      setIsMobile(mobile);
      if (mobile) {
        setIsVisible(false);
        setShouldRender(false);
        onReveal();
      }
    };
    // initial check
    handleChange();
    mm.addEventListener('change', handleChange);
    return () => mm.removeEventListener('change', handleChange);
  }, [onReveal]);

  useEffect(() => {
    if (!isVisible || isMobile) return;

    const handleMouseMove = () => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
        onReveal();
      }, 800);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, isMobile, onReveal]);

  if (!shouldRender || isMobile) {
    return null;
  }

  return (
    <div className={`${styles.overlay} ${!isVisible ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {t.hero.title}
        </h1>
        <p className={styles.subtitle}>
          {t.intro.subtitle}
        </p>
      </div>
    </div>
  );
}