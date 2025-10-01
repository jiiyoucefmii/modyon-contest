'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!isAnimated) {
        setIsAnimated(true);
        setTimeout(() => {
          setShowContent(true);
        }, 800); // Delay to show content after title animation
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAnimated]);

  return (
    <section id="about" className={styles.hero}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isAnimated ? styles.contentAnimated : ''}`}>
          <div className={styles.textSection}>
            <h1 className={`${styles.title} ${isAnimated ? styles.titleAnimated : styles.titleInitial}`}>
              MODYON
            </h1>
            <p className={`${styles.subtitle} ${showContent ? styles.fadeIn : styles.hidden}`}>
              Where Creativity Meets Community
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
          <div className={`${styles.imageSection} ${showContent ? styles.fadeIn : styles.hidden}`}>
            <Image
              src="/hero.png"
              alt="Modyon Platform Preview"
              width={800}
              height={600}
              className={styles.heroImage}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}