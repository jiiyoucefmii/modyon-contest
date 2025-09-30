import { TEMP_EMAIL_DOMAINS, TEMP_EMAIL_PATTERNS } from './constants';

/**
 * Validates if an email is legitimate (not a temporary/disposable email)
 * @param email Email address to validate
 * @returns Boolean indicating if the email is valid (not temporary)
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  // Extract domain from email
  const domain = email.split('@')[1].toLowerCase();
  
  // Check against known temporary email domains
  if (TEMP_EMAIL_DOMAINS.includes(domain)) return false;
  
  // Check if domain contains common temporary email patterns
  for (const pattern of TEMP_EMAIL_PATTERNS) {
    if (domain.includes(pattern)) return false;
  }
  
  return true;
}

/**
 * Generates a referral code of specified length
 * @param length Length of the referral code
 * @returns Generated referral code
 */
export function generateReferralCode(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a referral link with the given referral code
 * @param referralCode Referral code to include in the link
 * @returns Full referral link
 */
export function generateReferralLink(referralCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}?ref=${referralCode}`;
}