-- Users table to store participant information
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  referral_code VARCHAR(20) UNIQUE NOT NULL,
  entries INTEGER DEFAULT 1,
  referred_by VARCHAR(20) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Referrals table to track referral relationships
CREATE TABLE referrals (
  id SERIAL PRIMARY KEY,
  referrer_code VARCHAR(20) NOT NULL,
  referee_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (referrer_code) REFERENCES users(referral_code),
  FOREIGN KEY (referee_email) REFERENCES users(email)
);

-- Index for better performance
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_referrals_referrer_code ON referrals(referrer_code);