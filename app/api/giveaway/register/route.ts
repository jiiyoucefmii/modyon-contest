import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, getUserByReferralCode } from '../../../lib/database';
import { isValidEmail } from '../../../lib/utils';
import { APP_SETTINGS } from '../../../lib/constants';

export async function POST(request: NextRequest) {
  try {
    const { email, referralCode } = await request.json();

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check email format and against temporary email domains
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email or temporary email addresses are not allowed' },
        { status: 400 }
      );
    }

    // Check if email length is within limits
    if (email.length > APP_SETTINGS.MAX_EMAIL_LENGTH || email.length < APP_SETTINGS.MIN_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: `Email must be between ${APP_SETTINGS.MIN_EMAIL_LENGTH} and ${APP_SETTINGS.MAX_EMAIL_LENGTH} characters` },
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
      
      // Prevent self-referrals by email matching
      if (referrer.email.toLowerCase() === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'You cannot use your own referral code' },
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