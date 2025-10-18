import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, updateUser, processReferralBonus } from '../../lib/database';


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Missing verification token or email' },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: 'Email already verified' },
        { status: 200 }
      );
    }

    if (user.verificationToken !== token) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    if (user.verificationTokenExpiry && new Date() > user.verificationTokenExpiry) {
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      );
    }

    // Verify the email
    await updateUser(email, {
      emailVerified: true,
      verificationToken: undefined,
      verificationTokenExpiry: undefined
    });

    // Process referral bonus now that email is verified
    if (user.referredBy) {
      await processReferralBonus(user.id, user.referredBy);
    }

    // Send welcome email with referral code (don't fail verification if email fails)

    return NextResponse.json(
      { message: 'Email verified successfully! You can now participate in the giveaway.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}