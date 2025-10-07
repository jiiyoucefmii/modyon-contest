'use client';

import { useState, useEffect } from 'react';
import styles from './Prizes.module.css';
import { useLanguage } from '../lib/LanguageContext';

export default function Prizes() {
  const { t, isRTL } = useLanguage();

  const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('form');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="prizes" className={`${styles.prizes} ${isRTL ? styles.rtl : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.prizes.title}</h2>
          <p className={styles.subtitle}>{t.prizes.subtitle}</p>
        </div>

        <div className={styles.prizeGrid}>
          {/* First Place */}
          <div className={`${styles.prizeCard} ${styles.firstPlace}`}>
            <div className={styles.prizeRank}>🥇</div>
            <h3 className={styles.prizeTitle}>{t.prizes.firstPlace.title}</h3>
            <p className={styles.prizeAmount}>{t.prizes.firstPlace.description}</p>
          </div>

          {/* Second Place */}
          <div className={`${styles.prizeCard} ${styles.secondPlace}`}>
            <div className={styles.prizeRank}>🥈</div>
            <h3 className={styles.prizeTitle}>{t.prizes.secondPlace.title}</h3>
            <p className={styles.prizeAmount}>{t.prizes.secondPlace.description}</p>
          </div>

          {/* Third Place */}
          <div className={`${styles.prizeCard} ${styles.thirdPlace}`}>
            <div className={styles.prizeRank}>🥉</div>
            <h3 className={styles.prizeTitle}>{t.prizes.thirdPlace.title}</h3>
            <p className={styles.prizeAmount}>{t.prizes.thirdPlace.description}</p>
          </div>
        </div>

        {/* Creator Bonus Section */}
        <div className={styles.creatorBonus}>
          <div className={styles.bonusContent}>
            <div className={styles.bonusText}>
              <h3 className={styles.bonusTitle}>{t.prizes.creatorBonus.title}</h3>
            <p className={styles.bonusDescription}>{t.prizes.creatorBonus.description}</p>
            </div>
            <button className={styles.bonusCta} onClick={handleScrollToForm}>
              {t.prizes.creatorBonus.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}