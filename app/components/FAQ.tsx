'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';
import { useLanguage } from '../lib/LanguageContext';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t, isRTL } = useLanguage();

  return (
    <section id="faq" className={`${styles.faqSection} ${isRTL ? styles.rtl : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {t.faq.title}
          </h2>
          <p className={styles.description}>
            {t.faq.subtitle}
          </p>
        </div>
        
        <div className={styles.faqContainer}>
          {t.faq.questions.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqButton} ${openIndex === index ? styles.active : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={styles.question}>{faq.question}</span>
                <svg
                  className={`${styles.chevron} ${openIndex === index ? styles.rotated : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}