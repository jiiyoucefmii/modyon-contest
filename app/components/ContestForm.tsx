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
  const [signupCount, setSignupCount] = useState(0);
  const [placeholder, setPlaceholder] = useState("jane@example.com");
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, isRTL } = useLanguage();

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Read userType from URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userTypeParam = urlParams.get('userType');
    if (userTypeParam === 'creator' || userTypeParam === 'client') {
      setUserType(userTypeParam as 'creator' | 'client');
    }
  }, []);

  // Fetch signup count
  useEffect(() => {
    const fetchSignupCount = async () => {
      try {
        const response = await fetch("/api/giveaway/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setSignupCount(data.totalUsers || 0);
        }
      } catch (err) {
        console.error("Error fetching signup count:", err);
      }
    };
    fetchSignupCount();
  }, []);

  // Update placeholder based on screen size
  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 360) {
        setPlaceholder("email@domain.com");
      } else if (window.innerWidth <= 480) {
        setPlaceholder("your@email.com");
      } else {
        setPlaceholder("jane@example.com");
      }
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  // Check for referral code in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");
    if (refCode) {
      setReferralCode(refCode);
    }
  }, []);

  // Check for existing user - FIXED to preserve userType selection
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
          // IMPORTANT: Set user type from existing user data
          setUserType(data.user.userType || 'client');
          setUser(data.user);
          setIsReturningUser(true);
          setIsSubmitted(true);
        }
      } else {
        setIsReturningUser(false);
        setUser(null);
        // Keep the current userType selection when not a returning user
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Invalid email or temporary email addresses are not allowed");
      return;
    }

    setIsLoading(true);

    try {
      console.log('Submitting with userType:', userType);
      
      const response = await fetch("/api/giveaway/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          referralCode: referralCode || undefined,
          userType, // Ensure this is sent
        }),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Ensure userType is set from response
      const userWithType = {
        ...data.user,
        userType: data.user.userType || userType
      };
      
      console.log('Setting user with userType:', userWithType);
      setUser(userWithType);
      setIsSubmitted(true);
      setSignupCount((prev) => prev + 1);
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
  }, [user, copyReferralLink, t]);

  const shareOnWhatsApp = useCallback(() => {
    if (!user) return;
    copyReferralLink();
    const referralLink = `${window.location.origin}?ref=${user.referralCode}`;
    const text = `${t.contestForm.shareText} ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  }, [user, copyReferralLink, t]);

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

  // Success state rendering remains the same...
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
                      {/* Share buttons remain the same */}
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
                          disabled={isReturningUser} // Disable if returning user
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
                          disabled={isReturningUser} // Disable if returning user
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

                {/* Rest of form remains the same */}
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
                  disabled={isLoading || isCheckingUser || isReturningUser}
                  className={styles.submitButton}
                >
                  {isLoading || isCheckingUser 
                    ? t.contestForm.submitting 
                    : isReturningUser 
                    ? "Already Registered"
                    : `${t.contestForm.submitButton} ${userType === 'creator' ? t.contestForm.creatorTitle : t.contestForm.clientTitle}`
                  }
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

            <div className={styles.rightSection}></div>
          </div>
        </div>
      </div>
    </section>
  );
}