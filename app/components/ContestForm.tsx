"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ContestForm.module.css";
import { isValidEmail } from "../lib/utils";
import { useLanguage } from "../lib/LanguageContext";

interface User {
  id: string;
  email: string;
  referralCode: string;
  entries: number;
  referredBy?: string;
  userType: 'creator' | 'client';
  createdAt: Date;
  emailVerified?: boolean;
}

export default function ContestForm() {
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [userType, setUserType] = useState<'creator' | 'client'>('client');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode) {
      setReferralCode(refCode);
    }
  }, []);

  // Check for existing user when email changes
  const checkExistingUser = useCallback(async (emailValue: string) => {
    if (!emailValue || !emailValue.includes("@")) return;

    setIsCheckingUser(true);
    setError("");

    try {
      const response = await fetch(
        `/api/giveaway/stats?email=${encodeURIComponent(emailValue)}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setIsReturningUser(true);
          setUser(data.user);
          setUserType(data.user.userType || 'client');
          
          // Only show success screen if email is verified
          if (data.user.emailVerified) {
            setIsSubmitted(true);
          } else {
            // Show email verification screen for unverified returning users
            setShowEmailVerification(true);
            setVerificationMessage("Please verify your email to access your referrals.");
          }
        }
      } else {
        setIsReturningUser(false);
        setUser(null);
      }
    } catch (err) {
      console.error("Error checking user:", err);
    } finally {
      setIsCheckingUser(false);
    }
  }, []);

  // Debounced email check
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (email && !isSubmitted) {
        checkExistingUser(email);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [email, checkExistingUser, isSubmitted]);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email on the client side too
    if (!isValidEmail(email)) {
      setError("Invalid email or temporary email addresses are not allowed");
      return;
    }

    setIsLoading(true);

    try {
      
      const response = await fetch("/api/giveaway/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          referralCode: referralCode || undefined,
          userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Show email verification screen instead of success screen
      setShowEmailVerification(true);
      setVerificationMessage(data.message || "Please check your email to verify your address.");
      
      // Store user data for later use after verification
      if (data.user) {
        const userWithType = {
          ...data.user,
          userType: data.user.userType || userType || 'client'
        };
        setUser(userWithType);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralLink = useCallback(async () => {
    if (!user) return;

    const referralLink = `${window.location.origin}?ref=${user.referralCode}`;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [user]);

  const shareOnFacebook = useCallback(() => {
    if (!user) return;
    copyReferralLink();
    const referralLink = `${window.location.origin}?ref=${user.referralCode}`;
    const text = `${t.contestForm.shareText}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, "_blank");
  }, [user, copyReferralLink, t.contestForm.shareText]);

  const shareOnWhatsApp = useCallback(() => {
    if (!user) return;
    copyReferralLink();
    const referralLink = `${window.location.origin}?ref=${user.referralCode}`;
    const text = `${t.contestForm.shareText} ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  }, [user, copyReferralLink]);

  const shareOnInstagram = useCallback(() => {
    if (!user) return;
    copyReferralLink();
    alert(t.contestForm.linkCopied);
  }, [user, copyReferralLink, t]);

  const shareOnMessenger = useCallback(() => {
    if (!user) return;
    copyReferralLink();
    const referralLink = `${window.location.origin}?ref=${user.referralCode}`;
    const messengerUrl = `https://m.me/?text=${encodeURIComponent(referralLink)}`;
    window.open(messengerUrl, "_blank");
  }, [user, copyReferralLink, t]);

  const resendVerificationEmail = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/giveaway/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          referralCode: referralCode || undefined,
          userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationMessage(t.contestForm.emailResent);
      } else {
        setError(data.error || "Failed to resend email");
      }
    } catch {
      setError("Failed to resend email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is verified and redirect to referrals page
  useEffect(() => {
    if (showEmailVerification && email) {
      const checkVerificationStatus = async () => {
        try {
          const response = await fetch(`/api/giveaway/stats?email=${encodeURIComponent(email)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.user && data.user.emailVerified) {
              // User is verified, show referrals page
              setUser(data.user);
              setIsSubmitted(true);
              setShowEmailVerification(false);
            }
          }
        } catch (err) {
          console.error("Error checking verification status:", err);
        }
      };

      // Check every 5 seconds
      const interval = setInterval(checkVerificationStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [showEmailVerification, email]);

  // Show email verification screen
  if (showEmailVerification) {
    return (
      <section
        ref={sectionRef}
        className={`${styles.waitlistSection} ${
          isVisible ? styles.visible : ""
        } ${isRTL ? styles.rtl : ''}`}
      >
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.emailVerificationState}>
              <div className={styles.emailIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="22,6 12,13 2,6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>{t.contestForm.checkEmailTitle}</h3>
              <p>{t.contestForm.checkEmailMessage}</p>
              
              <div className={styles.emailSentTo}>
                <strong>{t.contestForm.emailSentTo}</strong> {email}
              </div>
              
              <div className={styles.verificationActions}>
                <button
                  onClick={resendVerificationEmail}
                  disabled={isLoading}
                  className={styles.resendButton}
                >
                  {isLoading ? t.contestForm.submitting : t.contestForm.resendEmail}
                </button>
              </div>
              
              {verificationMessage && (
                <div className={styles.verificationMessage}>
                  {verificationMessage}
                </div>
              )}
              
              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}
              
              <div className={styles.verificationNote}>
                <p>{t.contestForm.verificationPending}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isSubmitted && user) {
    return (
      <section
        ref={sectionRef}
        className={`${styles.waitlistSection} ${
          isVisible ? styles.visible : ""
        } ${isRTL ? styles.rtl : ''}`}
      >
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.successState}>
              <div className={styles.checkIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>
                {isReturningUser ? t.contestForm.successMessage : t.contestForm.successMessage}
              </h3>
              <p>
                {isReturningUser
                  ? `Here are your current stats for ${email} (${user.userType || 'client'})`
                  : `Thank you for joining as a ${user.userType || userType || 'client'}! Confirmation sent to ${email}`}
              </p>

              <div className={styles.dashboard}>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>{user.entries}</div>
                    <div className={styles.statLabel}>{t.contestForm.entriesEarned}</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>
                      {Math.max(0, user.entries - 1)}
                    </div>
                    <div className={styles.statLabel}>Successful Referrals</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>
                      {user.userType === 'creator' ? '🎨' : '🛍️'}
                    </div>
                    <div className={styles.statLabel}>
                      {user.userType === 'creator' ? 'Creator' : 'Client'}
                    </div>
                  </div>
                </div>

                <div className={styles.referralSection}>
                  <h4>{t.contestForm.referralLink}</h4>
                  <p>
                    {user.userType === 'creator' 
                      ? 'Share with potential clients and fellow creators!' 
                      : t.contestForm.shareText
                    }
                  </p>

                  <div className={styles.referralCode}>
                    <code>{user.referralCode}</code>
                    <button
                      onClick={copyReferralLink}
                      className={styles.copyButton}
                    >
                      {copied ? t.contestForm.linkCopied : t.contestForm.copyLink}
                    </button>
                  </div>

                  <div className={styles.shareSection}>
                    <h5 className={styles.shareTitle}>Share on</h5>
                    <div className={styles.shareButtons}>
                      <button
                        onClick={shareOnFacebook}
                        className={`${styles.shareButton} ${styles.facebook}`}
                        title="Share on Facebook"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                      <button
                        onClick={shareOnWhatsApp}
                        className={`${styles.shareButton} ${styles.whatsapp}`}
                        title="Share on WhatsApp"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                      </button>
                      <button
                        onClick={shareOnInstagram}
                        className={`${styles.shareButton} ${styles.instagram}`}
                        title="Share on Instagram"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </button>
                      <button
                        onClick={shareOnMessenger}
                        className={`${styles.shareButton} ${styles.messenger}`}
                        title="Share on Messenger"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.13 3.26L19.752 8.1l-6.561 6.863z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="form"
      ref={sectionRef}
      className={`${styles.waitlistSection} ${isVisible ? styles.visible : ""} ${isRTL ? styles.rtl : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            {/* Left Section - Current Form Content */}
            <div className={styles.leftSection}>
              <h1 className={styles.mainHeading}>
                {t.contestForm.title}
              </h1>

              <form onSubmit={handleSubmit} className={styles.emailForm}>
                {/* User Type Selection */}
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>{t.contestForm.userTypeLabel}</label>
                  <div className={styles.userTypeContainer}>
                    <div className={styles.userTypeOptions} id="user-type">
                      <label className={`${styles.userTypeOption} ${userType === 'client' ? styles.selected : ''}`} id="user-type-client">
                        <input
                          type="radio"
                          name="userType"
                          value="client"
                          checked={userType === 'client'}
                          onChange={(e) => setUserType(e.target.value as 'creator' | 'client')}
                          className={styles.userTypeRadio}
                        />
                        <div className={styles.userTypeContent}>
                          <div className={styles.userTypeIcon}>🛍️</div>
                          <div className={styles.userTypeInfo}>
                            <span className={styles.userTypeTitle}>{t.contestForm.clientTitle}</span>
                            <span className={styles.userTypeDesc}>{t.contestForm.clientDescription}</span>
                          </div>
                        </div>
                      </label>
                      
                      <label className={`${styles.userTypeOption} ${userType === 'creator' ? styles.selected : ''}`} id="user-type-creator">
                        <input
                          type="radio"
                          name="userType"
                          value="creator"
                          checked={userType === 'creator'}
                          onChange={(e) => setUserType(e.target.value as 'creator' | 'client')}
                          className={styles.userTypeRadio}
                        />
                        <div className={styles.userTypeContent}>
                          <div className={styles.userTypeIcon}>🎨</div>
                          <div className={styles.userTypeInfo}>
                            <span className={styles.userTypeTitle}>{t.contestForm.creatorTitle}</span>
                            <span className={styles.userTypeDesc}>{t.contestForm.creatorDescription}</span>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>{t.contestForm.emailLabel}</label>
                  <div className={styles.emailInputContainer}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.contestForm.emailPlaceholder}
                      required
                      className={styles.emailInputField}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>{t.contestForm.referralLabel}</label>
                  <div className={styles.referralInputContainer}>
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder={t.contestForm.referralPlaceholder}
                      className={styles.referralInputField}
                    />
                  </div>
                </div>

                    <button
                      type="submit"
                      disabled={isLoading || isCheckingUser}
                      className={styles.submitButton}
                    >
                      {isLoading || isCheckingUser ? t.contestForm.submitting : `${t.contestForm.submitButton} ${userType === 'creator' ? t.contestForm.creatorTitle : t.contestForm.clientTitle}`}
                    </button>

                {isCheckingUser && (
                  <div className={styles.checkingMessage}>
                    {t.contestForm.checkingMessage}
                  </div>
                )}

                {isReturningUser && user && (
                  <div className={styles.returningUserMessage}>
                    {t.contestForm.returningUserMessage
                      .replace('{entries}', user.entries.toString())
                      .replace('{userType}', user.userType === 'creator' ? t.contestForm.creatorTitle : t.contestForm.clientTitle)}
                  </div>
                )}

                {error && <div className={styles.errorMessage}>{error}</div>}
              </form>
            </div>

            {/* Right Section - Prize Image Only */}
            <div className={styles.rightSection}>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}