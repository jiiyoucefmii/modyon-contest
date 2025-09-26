import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '../../../../lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId; // This should be an email or referral code
    
    // Try to get user by email first
    let user = await getUserByEmail(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      stats: {
        user: {
          email: user.email,
          referralCode: user.referralCode,
          entries: user.entries
        },
        referralLink: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}?ref=${user.referralCode}`
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}