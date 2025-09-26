'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.brandName}>MODYON</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <a 
              href="#about" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'about')}
            >
              About
            </a>
            <a 
              href="#form" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'form')}
            >
              Contest Form
            </a>
            <a 
              href="#prizes" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'prizes')}
            >
              Prizes
            </a>
            <a 
              href="#faq" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'faq')}
            >
              FAQ
            </a>
            <Link href="#form" className={styles.ctaButton}>
              Join Contest
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className={styles.mobileMenuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <a 
                href="#about" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'about')}
              >
                About
              </a>
              <a 
                href="#form" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'form')}
              >
                Contest Form
              </a>
              <a 
                href="#prizes" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'prizes')}
              >
                Prizes
              </a>
              <a 
                href="#faq" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'faq')}
              >
                FAQ
              </a>
              <a 
                href="#form" 
                className={styles.mobileCta}
                onClick={(e) => handleSmoothScroll(e, 'form')}
              >
                Join Contest
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}