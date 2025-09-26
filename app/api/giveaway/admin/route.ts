import { NextResponse } from 'next/server';
import { getAllUsers, getStats } from '@/app/lib/database';

export async function GET() {
  try {
    const stats = await getStats();
    const users = await getAllUsers();

    return NextResponse.json({
      stats,
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        referralCode: user.referralCode,
        entries: user.entries,
        referredBy: user.referredBy,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}