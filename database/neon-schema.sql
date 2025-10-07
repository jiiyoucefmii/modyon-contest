-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    referral_code VARCHAR(8) UNIQUE NOT NULL,
    entries INTEGER DEFAULT 1,
    referred_by VARCHAR(8),
    user_type VARCHAR(10) DEFAULT 'client' CHECK (user_type IN ('client', 'creator')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES users(id),
    referred_id UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_id);

-- Add user_type column if it doesn't exist (for existing databases)
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(10) DEFAULT 'client' CHECK (user_type IN ('client', 'creator'));