import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, getUserByReferralCode,updateUser } from '../../../lib/database';
import { isValidEmail } from '../../../lib/utils';
import { APP_SETTINGS } from '../../../lib/constants';
import { generateVerificationToken, sendVerificationEmail } from '../../../lib/sendMail';

export async function POST(request: NextRequest) {
  try {
    const { email, referralCode, userType } = await request.json();

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (userType && !['creator', 'client'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type. Must be either "creator" or "client"' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email or temporary email addresses are not allowed' },
        { status: 400 }
      );
    }

    if (email.length > APP_SETTINGS.MAX_EMAIL_LENGTH || email.length < APP_SETTINGS.MIN_EMAIL_LENGTH) {
      return NextResponse.json(
        { error: `Email must be between ${APP_SETTINGS.MIN_EMAIL_LENGTH} and ${APP_SETTINGS.MAX_EMAIL_LENGTH} characters` },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      if (existingUser.emailVerified) {
        return NextResponse.json(
          { error: 'Email already registered and verified' },
          { status: 400 }
        );
      } else {
        // Resend verification email for unverified user
        const newToken = generateVerificationToken();
        const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        
        await updateUser(email, {
          verificationToken: newToken,
          verificationTokenExpiry: tokenExpiry
        });
        
        const emailSent = await sendVerificationEmail(email, newToken);
        
        if (!emailSent) {
          return NextResponse.json(
            { error: 'Failed to send verification email. Please try again.' },
            { status: 500 }
          );
        }
        
        return NextResponse.json({
          success: true,
          message: 'Verification email resent. Please check your email to complete registration.',
        });
      }
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
      
      // Only allow referrals from verified users
      if (!referrer.emailVerified) {
        return NextResponse.json(
          { error: 'Referrer must have verified email' },
          { status: 400 }
        );
      }
      
      if (referrer.email.toLowerCase() === email.toLowerCase()) {
        return NextResponse.json(
          { error: 'You cannot use your own referral code' },
          { status: 400 }
        );
      }
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user (unverified)
    const user = await createUser(
      email, 
      referralCode, 
      userType || 'client',
      verificationToken,
      tokenExpiry
    );

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken);
    
    if (!emailSent) {
      // If email fails, you might want to delete the user or mark for retry
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful! Please check your email to verify your address before you can participate.',
      referralCode: user.referralCode,
      // Include the user so the client can access userType and other fields immediately
      user: {
        id: user.id,
        email: user.email,
        referralCode: user.referralCode,
        entries: user.entries,
        referredBy: user.referredBy,
        userType: user.userType,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}