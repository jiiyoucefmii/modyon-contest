'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I enter the Modyon giveaway?",
      answer: "Simply fill out the contest entry form above with your email address. That's it! you've successfully entered."
    },
    {
      question: "When will the winners be announced?",
      answer: "Winners will be selected randomly and announced on oct 31st, 2025. We'll notify winners via email and also announce them on our social media channels."
    },
    {
      question: "Can I enter multiple times?",
      answer: "No, only one entry per person is allowed. Multiple entries from the same person will be disqualified. However, you can increase your chances by sharing your code with your friends!"
    },
    {
      question: "What happens to my email address?",
      answer: "Your email will only be used for contest communication and occasional updates about Modyon platform. You can unsubscribe at any time, and we never share your information with third parties."
    },
    
  ];

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Frequently Asked Questions
          </h2>
          <p className={styles.description}>
            Got questions? We've got answers! Find everything you need to know about the Modyon giveaway.
          </p>
        </div>
        
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqButton} ${openIndex === index ? styles.active : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={styles.question}>{faq.question}</span>
                <svg
                  className={`${styles.chevron} ${openIndex === index ? styles.rotated : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`${styles.answerContainer} ${openIndex === index ? styles.open : ''}`}>
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.contactSection}>
          <p className={styles.contactText}>
            Still have questions? We're here to help!
          </p>
          <a href="mailto:support@modyon.com" className={styles.contactButton}>
            <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}