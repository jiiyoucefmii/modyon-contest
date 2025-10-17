import { Pool } from "pg";
import { generateReferralCode } from "./utils";
import { APP_SETTINGS } from "./constants";

export interface User {
  id: string;
  email: string;
  referralCode: string;
  entries: number;
  userType: "creator" | "client";
  referredBy?: string;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
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
    rejectUnauthorized: false,
  },
});

export async function createUser(
  email: string,
  referredBy?: string,
  userType: "creator" | "client" = "client",
  verificationToken?: string,
  verificationTokenExpiry?: Date
): Promise<User> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Generate unique referral code
    let referralCode = generateReferralCode(APP_SETTINGS.REFERRAL_CODE_LENGTH);
    let isUnique = false;

    while (!isUnique) {
      const checkResult = await client.query(
        "SELECT id FROM users WHERE referral_code = $1",
        [referralCode]
      );

      if (checkResult.rows.length === 0) {
        isUnique = true;
      } else {
        referralCode = generateReferralCode(APP_SETTINGS.REFERRAL_CODE_LENGTH);
      }
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Create the user with verification fields
    const userResult = await client.query(
      `INSERT INTO users (email, referral_code, entries, referred_by, user_type, email_verified, verification_token, verification_token_expiry) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, email, referral_code, entries, referred_by, user_type, email_verified, verification_token, verification_token_expiry, created_at`,
      [
        normalizedEmail,
        referralCode,
        APP_SETTINGS.DEFAULT_ENTRIES,
        referredBy,
        userType,
        false, // email_verified starts as false
        verificationToken,
        verificationTokenExpiry,
      ]
    );

    const newUser = userResult.rows[0];

    // IMPORTANT: Only process referral bonus if email is verified
    // For now, skip referral processing until verification

    await client.query("COMMIT");

    return {
      id: newUser.id,
      email: newUser.email,
      referralCode: newUser.referral_code,
      entries: newUser.entries,
      referredBy: newUser.referred_by,
      userType: newUser.user_type,
      createdAt: new Date(newUser.created_at),
      emailVerified: newUser.email_verified,
      verificationToken: newUser.verification_token,
      verificationTokenExpiry: newUser.verification_token_expiry
        ? new Date(newUser.verification_token_expiry)
        : undefined,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating user:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const client = await pool.connect();

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const result = await client.query(
      // Add verification fields to SELECT
      "SELECT id, email, referral_code, entries, referred_by, user_type, email_verified, verification_token, verification_token_expiry, created_at FROM users WHERE email = $1",
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
      userType: user.user_type,
      createdAt: new Date(user.created_at),
      emailVerified: user.email_verified,
      verificationToken: user.verification_token,
      verificationTokenExpiry: user.verification_token_expiry
        ? new Date(user.verification_token_expiry)
        : undefined,
    };
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getUserByReferralCode(
  code: string
): Promise<User | null> {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT id, email, referral_code, entries, referred_by, user_type, created_at FROM users WHERE referral_code = $1",
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
      userType: user.user_type,
      createdAt: new Date(user.created_at),
      emailVerified: user.email_verified,
    };
  } catch (error) {
    console.error("Error getting user by referral code:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getStats() {
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT 
        COUNT(*) FILTER (WHERE email_verified = true) as total_users,
        COUNT(*) FILTER (WHERE user_type = 'creator' AND email_verified = true) as total_creators,
        COUNT(*) FILTER (WHERE user_type = 'client' AND email_verified = true) as total_clients,
        SUM(entries) FILTER (WHERE email_verified = true) as total_entries,
        COUNT(*) FILTER (WHERE referred_by IS NOT NULL AND email_verified = true) as total_referrals
      FROM users
    `);

    return result.rows[0];
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  } finally {
    client.release();
  }
}

export async function getAllUsers(): Promise<User[]> {
  const client = await pool.connect();

  try {
    // Only return verified users to prevent unverified fake emails from appearing in stats/admin
    const result = await client.query(
      "SELECT id, email, referral_code, entries, referred_by, user_type, email_verified, created_at FROM users WHERE email_verified = true ORDER BY created_at DESC"
    );

    return result.rows.map((user) => ({
      id: user.id,
      email: user.email,
      referralCode: user.referral_code,
      entries: user.entries,
      referredBy: user.referred_by,
      userType: user.user_type,
      createdAt: new Date(user.created_at),
      emailVerified: user.email_verified,
    }));
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  } finally {
    client.release();
  }
}
export async function updateUser(
  email: string,
  updates: Partial<{
    emailVerified: boolean;
    verificationToken: string | undefined;
    verificationTokenExpiry: Date | undefined;
    entries: number;
  }>
): Promise<void> {
  const client = await pool.connect();

  try {
    const normalizedEmail = email.toLowerCase().trim();

    const setClauses: string[] = [];
    const values: any[] = [];
    let index = 1;

    // Map camelCase -> snake_case
    if ('emailVerified' in updates) {
      setClauses.push(`email_verified = $${index++}`);
      values.push(updates.emailVerified ?? false);
    }
    if ('verificationToken' in updates) {
      setClauses.push(`verification_token = $${index++}`);
      values.push(updates.verificationToken ?? null); // set NULL when undefined
    }
    if ('verificationTokenExpiry' in updates) {
      setClauses.push(`verification_token_expiry = $${index++}`);
      values.push(updates.verificationTokenExpiry ?? null); // set NULL when undefined
    }
    if ('entries' in updates) {
      setClauses.push(`entries = $${index++}`);
      values.push(updates.entries ?? null);
    }

    if (setClauses.length === 0) {
      return; // nothing to update
    }

    const query = `UPDATE users SET ${setClauses.join(', ')} WHERE email = $${index}`;
    values.push(normalizedEmail);

    await client.query(query, values);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  } finally {
    client.release();
  }
}
export async function processReferralBonus(
  userId: string,
  referredBy: string
): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Find the referrer
    const referrerResult = await client.query(
      "SELECT id FROM users WHERE referral_code = $1 AND email_verified = true",
      [referredBy]
    );

    if (referrerResult.rows.length > 0) {
      const referrerId = referrerResult.rows[0].id;

      // Give bonus entry to referrer
      await client.query(
        "UPDATE users SET entries = entries + $1 WHERE id = $2",
        [APP_SETTINGS.REFERRAL_BONUS, referrerId]
      );

      // Create referral record
      await client.query(
        "INSERT INTO referrals (referrer_id, referred_id) VALUES ($1, $2)",
        [referrerId, userId]
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error processing referral bonus:", error);
    throw error;
  } finally {
    client.release();
  }
}
// Graceful shutdown
process.on("SIGINT", async () => {
  await pool.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});
