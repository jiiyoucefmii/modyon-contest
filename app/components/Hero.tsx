'use client';

import Image from 'next/image';
import styles from './Hero.module.css';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const { t, isRTL } = useLanguage();

  const scrollToForm = () => {
    const formSection = document.getElementById('form');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="about" className={`${styles.hero} ${isRTL ? styles.rtl : ''}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textSection}>
            <h1 className={styles.title}>
              {t.hero.title}
            </h1>
            <p className={styles.subtitle}>
              {t.hero.subtitle}
            </p>
            <p className={styles.description}>
              {t.hero.description}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.hangerImage} onClick={scrollToForm}>
        <Image
          src="/Hanger.png"
          alt="Hanger Decoration"
          width={500}
          height={500}
          priority
        />
      </div>
      <div className={styles.sofaImage}>
        <Image
          src="/sofahero.png"
          alt="Sofa Decoration"
          width={800}
          height={900}
          priority
        />
      </div>
    </section>
  );
}