'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useLanguage } from '../lib/LanguageContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnWhiteSection, setIsOnWhiteSection] = useState(false);
  const { currentLanguage, setLanguage, t, isRTL } = useLanguage();

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'AR', name: 'العربية', flag: '🇸🇦' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Check if we're on a white section
      const heroSection = document.querySelector('#hero');
      
      const heroHeight = heroSection?.getBoundingClientRect().height || 0;
      const heroBottom = heroHeight;
      
      // If we're past the hero section (which is blue), we're likely on white sections
      if (scrollPosition > heroBottom - 100) {
        setIsOnWhiteSection(true);
      } else {
        setIsOnWhiteSection(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false);
  };

  const handleLanguageSelect = (languageCode: string) => {
    setLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isRTL ? styles.rtl : ''} ${isScrolled ? styles.scrolled : ''} ${isOnWhiteSection ? styles.onWhite : ''} ${isMenuOpen ? styles.menuOpen : ''}`}>
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
              {t.navbar.about}
            </a>
            <a 
              href="#how-it-works" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
            >
              {t.navbar.howItWorks}
            </a>
            <a 
              href="#form" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'form')}
            >
              {t.navbar.contestForm}
            </a>
            <a 
              href="#prizes" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'prizes')}
            >
              {t.navbar.prizes}
            </a>
            <a 
              href="#faq" 
              className={styles.navLink}
              onClick={(e) => handleSmoothScroll(e, 'faq')}
            >
              {t.navbar.faq}
            </a>
            
            {/* Language Dropdown */}
            <div className={styles.languageDropdown}>
              <button 
                className={styles.languageButton}
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              >
                <span className={styles.languageFlag}>
                  {languages.find(lang => lang.code === currentLanguage)?.flag}
                </span>
                <span className={styles.languageCode}>{currentLanguage}</span>
                <svg 
                  className={`${styles.dropdownArrow} ${isLanguageDropdownOpen ? styles.dropdownArrowOpen : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className={styles.languageDropdownMenu}>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`${styles.languageOption} ${currentLanguage === language.code ? styles.languageOptionActive : ''}`}
                      onClick={() => handleLanguageSelect(language.code)}
                    >
                      <span className={styles.languageFlag}>{language.flag}</span>
                      <span className={styles.languageName}>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="#form" className={styles.ctaButton}>
              {t.navbar.joinContest}
            </Link>
          </div>
          
          {/* Mobile Hamburger Menu Button */}
          <button 
            className={`${styles.hamburgerButton} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
            onClick={toggleMobileMenu}
            aria-label={isMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" stroke="currentColor" style={{ color: isScrolled ? '#ffffff' : 'white' }}>
                <path d="M6 6 L18 18 M18 6 L6 18" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            ) : (
              <>
                <div className={styles.hamburgerLine}></div>
                <div className={styles.hamburgerLine}></div>
                <div className={styles.hamburgerLine}></div>
              </>
            )}
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenuOverlay} ${isMenuOpen ? styles.mobileMenuOverlayOpen : ''}`}>
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuContent}>
              <a 
                href="#about" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'about')}
              >
                {t.navbar.about}
              </a>
              <a 
                href="#how-it-works" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
              >
                {t.navbar.howItWorks}
              </a>
              <a 
                href="#prizes" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'prizes')}
              >
                {t.navbar.prizes}
              </a>
              <a 
                href="#form" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'form')}
              >
                {t.navbar.contestForm}
              </a>
              <a 
                href="#faq" 
                className={styles.mobileNavLink}
                onClick={(e) => handleSmoothScroll(e, 'faq')}
              >
                {t.navbar.faq}
              </a>
              
              {/* Mobile Language Selector */}
              <div className={styles.mobileLanguageSection}>
                <span className={styles.mobileLanguageLabel}>Language:</span>
                <div className={styles.mobileLanguageOptions}>
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`${styles.mobileLanguageOption} ${currentLanguage === language.code ? styles.mobileLanguageOptionActive : ''}`}
                      onClick={() => handleLanguageSelect(language.code)}
                    >
                      <span className={styles.languageFlag}>{language.flag}</span>
                      <span className={styles.languageCode}>{language.code}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <a 
                href="#form" 
                className={styles.mobileCta}
                onClick={(e) => handleSmoothScroll(e, 'form')}
              >
                {t.navbar.joinContest}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}