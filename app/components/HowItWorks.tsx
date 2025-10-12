"use client";

import styles from "./HowItWorks.module.css";
import { useLanguage } from "../lib/LanguageContext";
import { FaRegEnvelope } from "react-icons/fa";
import { MdOutlineSocialDistance } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";

export default function HowItWorks() {
  const { t, isRTL } = useLanguage();

  const steps = [
    {
      icon: <FaRegEnvelope />,
      title: t.howItWorks.step1,
      description: "Enter your email and join our giveaway community"
    },
    {
      icon: <MdOutlineSocialDistance />,
      title: t.howItWorks.step2,
      description: "Share your unique referral link with friends and family"
    },
    {
      icon: <BsCashCoin />,
      title: t.howItWorks.step3,
      description: "Win incredible prizes and exclusive rewards"
    }
  ];

  return (
    <section
      id="how-it-works"
      className={`${styles.howItWorks} ${isRTL ? styles.rtl : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t.howItWorks.howItWorks}</h2>
          <p className={styles.subtitle}>Three simple steps to win amazing prizes</p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}