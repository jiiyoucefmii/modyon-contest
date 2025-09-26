import { Pool } from 'pg';

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

export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createUser(email: string, referredBy?: string): Promise<User> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Generate unique referral code
    let referralCode = generateReferralCode();
    let isUnique = false;
    
    while (!isUnique) {
      const checkResult = await client.query(
        'SELECT id FROM users WHERE referral_code = $1',
        [referralCode]
      );
      
      if (checkResult.rows.length === 0) {
        isUnique = true;
      } else {
        referralCode = generateReferralCode();
      }
    }

    // Create the user
    const userResult = await client.query(
      `INSERT INTO users (email, referral_code, entries, referred_by) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, referral_code, entries, referred_by, created_at`,
      [email, referralCode, 1, referredBy]
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
          'UPDATE users SET entries = entries + 1 WHERE id = $1',
          [referrerId]
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
    const result = await client.query(
      'SELECT id, email, referral_code, entries, referred_by, created_at FROM users WHERE email = $1',
      [email]
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