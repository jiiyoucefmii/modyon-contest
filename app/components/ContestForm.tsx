"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./ContestForm.module.css";
import { isValidEmail } from "../lib/utils";

interface User {
  id: string;
  email: string;
  referralCode: string;
  entries: number;
  referredBy?: string;
  createdAt: Date;
}

export default function ContestForm() {
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
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

  // Fix hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Fetch initial signup count from server
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
      } else if (window.innerWidth <= 768) {
        setPlaceholder("jane@example.com");
      } else {
        setPlaceholder("jane@example.com");
      }
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  // Check for referral code in URL on component mount
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
          setUser(data.user);
          setIsReturningUser(true);
          setIsSubmitted(true);
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
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setUser(data.user);
      setIsSubmitted(true);
      setSignupCount((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (!user) return;

    const referralLink = `${window.location.origin}${window.location.pathname}?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    if (!user) return;

    const referralLink = `${window.location.origin}${window.location.pathname}?ref=${user.referralCode}`;
    const text = `Join this amazing giveaway! Use my referral link to get started: ${referralLink}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(twitterUrl, "_blank");
  };

  if (isSubmitted && user) {
    return (
      <section
        ref={sectionRef}
        className={`${styles.waitlistSection} ${
          isVisible ? styles.visible : ""
        }`}
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
                {isReturningUser ? "Welcome Back!" : "Welcome to the Contest!"}
              </h3>
              <p>
                {isReturningUser
                  ? `Here are your current stats for ${email}`
                  : `Thank you for joining! Confirmation sent to ${email}`}
              </p>

              <div className={styles.dashboard}>
                <div className={styles.statsGrid}>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>{user.entries}</div>
                    <div className={styles.statLabel}>Contest Entries</div>
                  </div>
                  <div className={styles.statCard}>
                    <div className={styles.statNumber}>
                      {Math.max(0, user.entries - 1)}
                    </div>
                    <div className={styles.statLabel}>Successful Referrals</div>
                  </div>
                </div>

                <div className={styles.referralSection}>
                  <h4>Share Your Referral Code</h4>
                  <p>Invite friends to earn more entries!</p>

                  <div className={styles.referralCode}>
                    <code>{user.referralCode}</code>
                    <button
                      onClick={copyReferralLink}
                      className={styles.copyButton}
                    >
                      {copied ? "Copied!" : "Copy Link"}
                    </button>
                  </div>

                  <div className={styles.shareButtons}>
                    <button
                      onClick={shareOnTwitter}
                      className={styles.shareButton}
                    >
                      Share on Twitter
                    </button>
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
      className={`${styles.waitlistSection} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.comingSoonBadge}>COMING SOON</div>

          <h1 className={styles.mainHeading}>
            A new kind of project
            <br />
            management app
          </h1>

          <p className={styles.mainDescription}>
            We are changing the way people collaborate remotely
            <br />
            in a radically new way. Sign up and get early access.
          </p>

          <form onSubmit={handleSubmit} className={styles.emailForm}>
            <div className={styles.emailInputContainer}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                required
                className={styles.emailInputField}
              />
              <button
                type="submit"
                disabled={isLoading || isCheckingUser}
                className={styles.arrowButton}
                aria-label="Submit email"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className={styles.referralInputContainer}>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code (optional)"
                className={styles.referralInputField}
              />
              <div className={styles.referralHint}>
                Have a friend's referral code? Enter it above to give them
                credit!
              </div>
            </div>

            {isCheckingUser && (
              <div className={styles.checkingMessage}>
                Checking if you're already registered...
              </div>
            )}

            {isReturningUser && user && (
              <div className={styles.returningUserMessage}>
                Welcome back! You have {user.entries} entries. Click submit to
                view your stats.
              </div>
            )}

            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>

          <div className={styles.signupStats}>
            <div className={styles.avatarStack}>
              <div
                className={styles.avatarItem}
                style={{ backgroundImage: "url(/men1.png" }}
              ></div>
              <div
                className={styles.avatarItem}
                style={{ backgroundImage: "url(/men2.png)" }}
              ></div>
              <div
                className={styles.avatarItem}
                style={{ backgroundImage: "url(/men3.png)" }}
              ></div>
            </div>
            <span className={styles.signupText}>
              {isClient ? signupCount.toLocaleString() : signupCount} people
              signed up
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
