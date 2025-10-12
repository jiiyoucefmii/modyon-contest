import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail, sendWelcomeEmail } from '../../lib/sendMail';

export async function POST(request: NextRequest) {
  try {
    const { email, type = 'verification' } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    let success = false;
    let message = '';

    if (type === 'verification') {
      success = await sendVerificationEmail(email, 'test-token-123456');
      message = success ? 'Verification email sent successfully!' : 'Failed to send verification email';
    } else if (type === 'welcome') {
      success = await sendWelcomeEmail(email, 'TEST123');
      message = success ? 'Welcome email sent successfully!' : 'Failed to send welcome email';
    } else {
      return NextResponse.json({ error: 'Invalid email type. Use "verification" or "welcome"' }, { status: 400 });
    }
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message,
        emailSentTo: email,
        type 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        error: message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}