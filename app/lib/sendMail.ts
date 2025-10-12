import crypto from 'crypto';

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/giveaway/verify?token=${token}&email=${encodeURIComponent(email)}`;
  
  // Replace this with your preferred email service (SendGrid, Mailgun, etc.)
  const emailData = {
    to: email,
    subject: 'Verify your email address',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2>Verify Your Email Address</h2>
        <p>Thank you for registering for our giveaway! Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email Address
        </a>
        <p style="margin-top: 20px;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${verificationUrl}</p>
        <p style="margin-top: 20px; color: #666;">This link will expire in 24 hours.</p>
      </div>
    `
  };

  // Example using fetch to send email (replace with your email service)
  try {
    const response = await fetch(`${process.env.EMAIL_SERVICE_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAIL_SERVICE_API_KEY}`
      },
      body: JSON.stringify(emailData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}