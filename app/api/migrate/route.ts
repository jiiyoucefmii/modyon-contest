import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function POST() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Add user_type column if it doesn't exist
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS user_type VARCHAR(10) 
      DEFAULT 'client' 
      CHECK (user_type IN ('client', 'creator'))
    `);
    
    // Update any existing users without user_type to have 'client' as default
    await client.query(`
      UPDATE users 
      SET user_type = 'client' 
      WHERE user_type IS NULL
    `);
    
    await client.query('COMMIT');
    
    // Verify the migration
    const result = await client.query(`
      SELECT 
        column_name, 
        data_type, 
        column_default, 
        is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'user_type'
    `);
    
    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      columnInfo: result.rows[0]
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration error:', error);
    return NextResponse.json(
      { error: 'Migration failed', details: error },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}