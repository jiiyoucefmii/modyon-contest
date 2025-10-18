import { NextResponse } from 'next/server';
import { getAllUsers, getStats } from '../../../../lib/database';

export async function GET() {
  try {
    const [users, stats] = await Promise.all([
      getAllUsers(),
      getStats()
    ]);
    
    const usersWithDetails = users.map(user => ({
      id: user.id,
      email: user.email,
      referralCode: user.referralCode,
      entries: user.entries,
      referredBy: user.referredBy,
      createdAt: user.createdAt
    }));

    return NextResponse.json({
      totalUsers: stats.totalUsers,
      totalEntries: stats.totalEntries,
      totalReferrals: stats.totalReferrals,
      users: usersWithDetails
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}