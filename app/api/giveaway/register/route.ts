import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, getUserByReferralCode } from '@/app/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { email, referralCode } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Validate referral code if provided
    if (referralCode) {
      const referrer = await getUserByReferralCode(referralCode);
      if (!referrer) {
        return NextResponse.json(
          { error: 'Invalid referral code' },
          { status: 400 }
        );
      }
    }

    // Create new user
    const user = await createUser(email, referralCode);

    return NextResponse.json({
      success: true,
      user,
      message: 'Successfully registered for the giveaway!',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}