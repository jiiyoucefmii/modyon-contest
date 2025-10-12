import crypto from 'crypto';
import nodemailer from 'nodemailer';

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Create Gmail transporter
const createGmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, 
    },
  });
};

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}&email=${encodeURIComponent(email)}`;
  
  const transporter = createGmailTransporter();

  const mailOptions = {
    from: {
      name: 'Modyon Contest',
      address: process.env.GMAIL_USER as string,
    },
    to: email,
    subject: 'Verify your email address - Modyon Contest',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #007bff; margin: 0; font-size: 28px;">Modyon Contest</h1>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Thank you for registering for our exciting giveaway! To complete your registration and start earning entries, please verify your email address by clicking the button below.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block; 
                      font-weight: 600;
                      font-size: 16px;
                      box-shadow: 0 4px 15px rgba(0,123,255,0.3);
                      transition: all 0.3s ease;">
              ✅ Verify Email Address
            </a>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <p style="color: #666; margin: 0; font-size: 14px;">
              <strong>Can't click the button?</strong> Copy and paste this link into your browser:
            </p>
            <p style="word-break: break-all; color: #007bff; margin: 10px 0 0 0; font-size: 13px;">
              ${verificationUrl}
            </p>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
              ⏰ This verification link will expire in 24 hours for security reasons.
            </p>
            <p style="color: #999; font-size: 12px; margin: 10px 0 0 0; text-align: center;">
              If you didn't request this verification, please ignore this email.
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
      Verify Your Email Address - Modyon Contest
      
      Thank you for registering for our giveaway! 
      
      Please verify your email address by visiting this link:
      ${verificationUrl}
      
      This link will expire in 24 hours.
      
      If you can't click the link, copy and paste it into your browser.
      
      If you didn't request this verification, please ignore this email.
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return false;
  }
}

// Optional: Function to send welcome email after verification
export async function sendWelcomeEmail(email: string, referralCode: string): Promise<boolean> {
  const transporter = createGmailTransporter();
  const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}?ref=${referralCode}`;

  const mailOptions = {
    from: {
      name: 'Modyon Contest',
      address: process.env.GMAIL_USER as string,
    },
    to: email,
    subject: 'Welcome to Modyon Contest! 🎉',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; padding: 20px;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #28a745; margin: 0; font-size: 28px;">🎉 Welcome to Modyon Contest!</h1>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
            Congratulations! Your email has been successfully verified and you're now officially entered in our giveaway.
          </p>
          
          <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #007bff;">
            <h3 style="color: #007bff; margin: 0 0 10px 0;">Your Referral Code: <strong>${referralCode}</strong></h3>
            <p style="color: #666; margin: 0; font-size: 14px;">
              Share your referral link with friends to earn bonus entries!
            </p>
            <p style="word-break: break-all; color: #007bff; margin: 10px 0 0 0; font-size: 13px;">
              ${referralLink}
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}" 
               style="background: linear-gradient(135deg, #28a745 0%, #20a83c 100%); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block; 
                      font-weight: 600;
                      font-size: 16px;">
              🏆 View Contest Details
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Good luck in the contest! 🍀
            </p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return false;
  }
}