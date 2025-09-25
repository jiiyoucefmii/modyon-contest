import crypto from 'crypto';
import pool from './database';

export function generateReferralCode(): string {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
}

export async function generateUniqueReferralCode(): Promise<string> {
  let code: string;
  let isUnique = false;
  
  while (!isUnique) {
    code = generateReferralCode();
    const result = await pool.query('SELECT id FROM users WHERE referral_code = $1', [code]);
    isUnique = result.rows.length === 0;
  }
  
  return code!;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateReferralLink(referralCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}?ref=${referralCode}`;
}