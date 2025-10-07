'use client';

import { useState, useEffect } from 'react';
import styles from './IntroOverlay.module.css';
import { useLanguage } from '../lib/LanguageContext';

interface IntroOverlayProps {
  onReveal: () => void;
}

export default function IntroOverlay({ onReveal }: IntroOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const handleMouseMove = () => {
      if (isVisible) {
        setIsVisible(false);
        setTimeout(() => {
          onReveal();
        }, 800); // Match the fade out duration
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, onReveal]);

  if (!isVisible) {
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