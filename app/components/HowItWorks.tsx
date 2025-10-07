"use client";

import { useState, useEffect } from "react";
import styles from "./HowItWorks.module.css";
import { useLanguage } from "../lib/LanguageContext";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineSocialDistance } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

export default function HowItWorks() {
  const { t, isRTL } = useLanguage();

  return (
    <section
      id="how-it-works"
      className={`${styles.howItWorks} ${isRTL ? styles.rtl : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.howItWorks.howItWorks}</h2>
          <p className={styles.subtitle}>Simple steps to win amazing prizes</p>
        </div>

        <div className={styles.stepsContainer}>
          {/* Step 1 */}
          <div className={`${styles.step} ${styles.step1}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <div className={styles.stepIcon}>
                <FaRegEnvelope />
              </div>
              <h3 className={styles.stepTitle}>{t.howItWorks.step1}</h3>
              <p className={styles.stepDescription}>
                Enter your email and join our giveaway community
              </p>
            </div>
            <div className={styles.stepLine}></div>
          </div>

          {/* Step 2 */}
          <div className={`${styles.step} ${styles.step2}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <div className={styles.stepIcon}>
                <MdOutlineSocialDistance />
              </div>
              <h3 className={styles.stepTitle}>{t.howItWorks.step2}</h3>
              <p className={styles.stepDescription}>
                Share your unique referral link with friends and family
              </p>
            </div>
            <div className={styles.stepLine}></div>
          </div>

          {/* Step 3 */}
          <div className={`${styles.step} ${styles.step3}`}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <div className={styles.stepIcon}>
                <BsCashCoin />
              </div>
              <h3 className={styles.stepTitle}>{t.howItWorks.step3}</h3>
              <p className={styles.stepDescription}>
                Win incredible prizes and exclusive rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
