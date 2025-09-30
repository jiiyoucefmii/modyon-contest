import { Pool } from 'pg';
import { generateReferralCode } from './utils';
import { APP_SETTINGS } from './constants';

export interface User {
  id: string;
  email: string;
  referralCode: string;
  entries: number;
  referredBy?: string;
  createdAt: Date;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  createdAt: Date;
}

// Create connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function createUser(email: string, referredBy?: string): Promise<User> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Generate unique referral code
    let referralCode = generateReferralCode(APP_SETTINGS.REFERRAL_CODE_LENGTH);
    let isUnique = false;
    
    while (!isUnique) {
      const checkResult = await client.query(
        'SELECT id FROM users WHERE referral_code = $1',
        [referralCode]
      );
      
      if (checkResult.rows.length === 0) {
        isUnique = true;
      } else {
        referralCode = generateReferralCode(APP_SETTINGS.REFERRAL_CODE_LENGTH);
      }
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Create the user
    const userResult = await client.query(
      `INSERT INTO users (email, referral_code, entries, referred_by) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, referral_code, entries, referred_by, created_at`,
      [normalizedEmail, referralCode, APP_SETTINGS.DEFAULT_ENTRIES, referredBy]
    );

    const newUser = userResult.rows[0];

    // Handle referral bonus
    if (referredBy) {
      // Find the referrer
      const referrerResult = await client.query(
        'SELECT id FROM users WHERE referral_code = $1',
        [referredBy]
      );

      if (referrerResult.rows.length > 0) {
        const referrerId = referrerResult.rows[0].id;

        // Give bonus entry to referrer
        await client.query(
          'UPDATE users SET entries = entries + $1 WHERE id = $2',
          [APP_SETTINGS.REFERRAL_BONUS, referrerId]
        );

        // Create referral record
        await client.query(
          'INSERT INTO referrals (referrer_id, referred_id) VALUES ($1, $2)',
          [referrerId, newUser.id]
        );
      }
    }

    await client.query('COMMIT');

    return {
      id: newUser.id,
      email: newUser.email,
      referralCode: newUser.referral_code,
      entries: newUser.entries,
      referredBy: newUser.referred_by,
      createdAt: new Date(newUser.created_at),
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await pool.connect();
  
  try {
    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();
    
    const result = await client.query(
      'SELECT id, email, referral_code, entries, referred_by, created_at FROM users WHERE LOWER(email) = LOWER($1)',
      [normalizedEmail]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    return {
      id: user.id,
      email: user.email,
      referralCode: user.referral_code,
      entries: user.entries,
      referredBy: user.referred_by,
      createdAt: new Date(user.created_at),
    };
  } finally {
    client.release();
  }
}


export async function getUserByReferralCode(code: string): Promise<User | null> {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'SELECT id, email, referral_code, entries, referred_by, created_at FROM users WHERE referral_code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    return {
      id: user.id,
      email: user.email,
      referralCode: user.referral_code,
      entries: user.entries,
      referredBy: user.referred_by,
      createdAt: new Date(user.created_at),
    };
  } finally {
    client.release();
  }
}

export async function getStats() {
  const client = await pool.connect();
  
  try {
    const [usersResult, referralsResult, entriesResult] = await Promise.all([
      client.query('SELECT COUNT(*) as count FROM users'),
      client.query('SELECT COUNT(*) as count FROM referrals'),
      client.query('SELECT SUM(entries) as total FROM users')
    ]);

    return {
      totalUsers: parseInt(usersResult.rows[0].count),
      totalReferrals: parseInt(referralsResult.rows[0].count),
      totalEntries: parseInt(entriesResult.rows[0].total || '0'),
    };
  } finally {
    client.release();
  }
}

export async function getAllUsers(): Promise<User[]> {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'SELECT id, email, referral_code, entries, referred_by, created_at FROM users ORDER BY entries DESC, created_at ASC'
    );

    return result.rows.map(user => ({
      id: user.id,
      email: user.email,
      referralCode: user.referral_code,
      entries: user.entries,
      referredBy: user.referred_by,
      createdAt: new Date(user.created_at),
    }));
  } finally {
    client.release();
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await pool.end();
  process.exit(0);
});