import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, getUserByReferralCode } from '../../../lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const referralCode = searchParams.get('code');
    
    let user = null;
    
    if (email) {
      user = await getUserByEmail(email);
    } else if (referralCode) {
      user = await getUserByReferralCode(referralCode);
    }
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        email: user.email,
        referralCode: user.referralCode,
        entries: user.entries,
        userType: user.userType,
        emailVerified: user.emailVerified, // Add email verification status
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