'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      if (mobile) {
        // On mobile, show content immediately
        setIsAnimated(true);
        setShowContent(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = () => {
      if (!isAnimated && !isMobile) {
        setIsAnimated(true);
        setTimeout(() => {
          setShowContent(true);
        }, 800); // Delay to show content after title animation
      }
    };

    // Only add mousemove listener on desktop
    if (!isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isAnimated, isMobile]);

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
        <div className={`${styles.content} ${isAnimated ? styles.contentAnimated : ''}`}>
          <div className={styles.textSection}>
            <h1 className={`${styles.title} ${isAnimated ? styles.titleAnimated : styles.titleInitial}`}>
              {t.hero.title}
            </h1>
            <p className={`${styles.subtitle} ${showContent ? styles.fadeIn : styles.hidden}`}>
              {t.hero.subtitle}
            </p>
            <p className={`${styles.description} ${showContent ? styles.fadeIn : styles.hidden}`}>
              Modyon is a creative online marketplace where independent artists, designers, and makers 
              can showcase and sell their unique creations. Similar to Etsy or Redbubble, it connects creators 
              with an interested audience, offering everything from pre-made goods and art prints to 
              personalized accessories and lifestyle products. Whether you&apos;re looking to express your 
              creativity or discover one-of-a-kind items, <strong>Modyon</strong> is the place where originality meets 
              community.
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