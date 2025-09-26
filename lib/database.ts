import { Pool } from 'pg';

export interface User {
  id: string;
  email: string;
  referral_code: string;
  entries: number;
  referred_by?: string;
  created_at: Date;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  created_at: Date;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
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

    // Create user
    const userResult = await client.query(
      `INSERT INTO users (email, referral_code, entries, referred_by) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, referral_code, entries, referred_by, created_at`,
      [email, referralCode, 1, referredBy]
    );

    const newUser = userResult.rows[0];

    // Handle referral bonus
    if (referredBy) {
      // Find referrer and give bonus entry
      const referrerResult = await client.query(
        'UPDATE users SET entries = entries + 1 WHERE referral_code = $1 RETURNING id',
        [referredBy]
      );

      if (referrerResult.rows.length > 0) {
        const referrerId = referrerResult.rows[0].id;
        
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
      referral_code: newUser.referral_code,
      entries: newUser.entries,
      referred_by: newUser.referred_by,
      created_at: newUser.created_at,
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
      referral_code: user.referral_code,
      entries: user.entries,
      referred_by: user.referred_by,
      created_at: user.created_at,
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
      referral_code: user.referral_code,
      entries: user.entries,
      referred_by: user.referred_by,
      created_at: user.created_at,
    };
  } finally {
    client.release();
  }
}

export async function getStats() {
  const client = await pool.connect();
  
  try {
    const [usersResult, referralsResult] = await Promise.all([
      client.query('SELECT COUNT(*) as total_users, SUM(entries) as total_entries FROM users'),
      client.query('SELECT COUNT(*) as total_referrals FROM referrals')
    ]);

    return {
      totalUsers: parseInt(usersResult.rows[0].total_users) || 0,
      totalEntries: parseInt(usersResult.rows[0].total_entries) || 0,
      totalReferrals: parseInt(referralsResult.rows[0].total_referrals) || 0,
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
      referral_code: user.referral_code,
      entries: user.entries,
      referred_by: user.referred_by,
      created_at: user.created_at,
    }));
  } finally {
    client.release();
  }
}

export default pool;