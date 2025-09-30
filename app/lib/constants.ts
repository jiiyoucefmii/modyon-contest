/**
 * Constants for the application
 * Contains lists of temporary email domains and other constant data
 */

// Common temporary/disposable email domains to block
export const TEMP_EMAIL_DOMAINS = [
  'tempmail.com',
  'temp-mail.org',
  'disposablemail.com',
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'sharklasers.com',
  'trashmail.com',
  'yopmail.com',
  '10minutemail.com',
  'temp-mail.ru',
  'discard.email',
  'maildrop.cc',
  'mailnesia.com',
  'throwawaymail.com',
  'tempemail.net',
  'emailondeck.com',
  'getnada.com',
  'tempmail.io',
];

// Common patterns in temporary email domains
export const TEMP_EMAIL_PATTERNS = [
  'temp',
  'disposable',
  'trash',
  'throw',
  'one-time',
  'temporary',
  'fake',
  'dispos',
  'discard',
  'nada',
  'guerrilla',
  'junk',
  'spam',
];

// Application settings
export const APP_SETTINGS = {
  DEFAULT_ENTRIES: 1,
  REFERRAL_BONUS: 1,
  REFERRAL_CODE_LENGTH: 8,
  MAX_EMAIL_LENGTH: 255,
  MIN_EMAIL_LENGTH: 5,
};