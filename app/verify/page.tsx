"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./verify.module.css";
type VerifyState = "idle" | "verifying" | "success" | "error";

const brand = {
  primary: "#007bff",
  success: "#2ecc40",
  error: "#e74c3c",
  bg: "#f6f8fa",
  card: "#fff",
  border: "#e3e7ee",
  shadow: "0 8px 32px rgba(0,0,0,0.10)",
};

function StatusIcon({ state }: { state: VerifyState }) {
  if (state === "verifying")
    return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ margin: "0 auto" }}>
        <circle cx="30" cy="30" r="28" stroke={brand.primary} strokeWidth="4" opacity="0.2" />
        <circle cx="30" cy="30" r="28" stroke={brand.primary} strokeWidth="4" strokeDasharray="40 100" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg>
    );
  if (state === "success")
    return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ margin: "0 auto" }}>
        <circle cx="30" cy="30" r="28" fill={brand.bg} stroke={brand.success} strokeWidth="4" />
        <path d="M18 32l8 8 16-18" stroke={brand.success} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  if (state === "error")
    return (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={{ margin: "0 auto" }}>
        <circle cx="30" cy="30" r="28" fill={brand.bg} stroke={brand.error} strokeWidth="4" />
        <path d="M20 20l20 20M40 20l-20 20" stroke={brand.error} strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  return null;
}

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState<VerifyState>("idle");
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string | null>(null);

  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const emailParam = useMemo(() => searchParams.get("email"), [searchParams]);

  useEffect(() => {
    const run = async () => {
      if (!token || !emailParam) {
        setState("error");
        setMessage("Missing verification token or email.");
        return;
      }

      setState("verifying");
      setEmail(emailParam);
      try {
        const res = await fetch(`/api/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(emailParam)}`);
        const data = await res.json();
        if (!res.ok) {
          setState("error");
          setMessage(data?.error || "Verification failed. Please try again.");
          return;
        }

        setState("success");
        setMessage(data?.message || "Email verified successfully!");

        // Optional: fetch user to show referral code after success
        try {
          const statsRes = await fetch(`/api/giveaway/stats?email=${encodeURIComponent(emailParam)}`);
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            if (statsData?.user?.referralCode) {
              setReferralCode(statsData.user.referralCode);
            }
          }
        } catch {
          // Ignore secondary fetch errors
        }
      } catch (e) {
        setState("error");
        setMessage("Network error while verifying. Please try again.");
      }
    };

    run();
  }, [token, emailParam]);

  const goHome = () => router.push("/");

  return (
    <main className={`${styles.background}`}  style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        background: brand.card,
        borderRadius: 18,
        padding: "2.5rem 2rem 2rem 2rem",
        boxShadow: brand.shadow,
        border: `1.5px solid ${brand.border}`,
        position: "relative",
        textAlign: "center"
      }}>
        <div style={{ marginBottom: 24 }}>
          <StatusIcon state={state} />
        </div>
        <h1 style={{
          margin: 0,
          fontSize: 26,
          fontWeight: 700,
          color: state === "success" ? brand.success : state === "error" ? brand.error : brand.primary,
          letterSpacing: "-0.5px"
        }}>
          {state === "success" ? "Email Verified!" : state === "verifying" ? "Verifying..." : "Verification"}
        </h1>
        <p style={{
          margin: "1.2rem 0 0.5rem 0",
          color: state === "error" ? brand.error : state === "success" ? brand.success : "#444",
          fontSize: 17,
          fontWeight: 500,
          minHeight: 24
        }}>{message}</p>

        {state === "success" && (
          <div style={{ marginTop: "1.5rem" }}>
            <div style={{ color: "#555", fontSize: 15, marginBottom: 8 }}>
              <span style={{ fontWeight: 500 }}>Verified email:</span> <span style={{ fontWeight: 600 }}>{email}</span>
            </div>
            {referralCode && (
              <div style={{ marginTop: "1.2rem" }}>
                <div style={{ fontSize: 15, color: brand.primary, fontWeight: 600, marginBottom: 6 }}>Your Referral Code</div>
                <code style={{ background: brand.bg, padding: "10px 18px", borderRadius: 8, fontSize: 18, fontWeight: 700, letterSpacing: 1, color: brand.primary, border: `1.5px solid ${brand.primary}` }}>{referralCode}</code>
                <div style={{ marginTop: 10, color: "#888", fontSize: 13 }}>Share this code to earn bonus entries!</div>
              </div>
            )}
            <button onClick={goHome} style={{ marginTop: "2.2rem", background: brand.primary, color: "#fff", border: 0, borderRadius: 8, padding: "13px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,123,255,0.08)" }}>Go to Contest</button>
          </div>
        )}

        {state === "error" && (
          <div style={{ marginTop: "2rem" }}>
            <button onClick={goHome} style={{ background: brand.error, color: "#fff", border: 0, borderRadius: 8, padding: "13px 28px", fontWeight: 600, fontSize: 16, cursor: "pointer" }}>Back to Home</button>
          </div>
        )}

        {state === "verifying" && (
          <div style={{ marginTop: "2rem", color: brand.primary, fontSize: 15, fontWeight: 500 }}>Please wait while we verify your email…</div>
        )}

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 10, textAlign: "center", fontSize: 12, color: "#bbb" }}>
          &copy; {new Date().getFullYear()} Modyon Contest
        </div>
      </div>
    </main>
  );
}
