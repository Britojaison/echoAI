import nodemailer from "nodemailer";

interface SendFollowUpEmailParams {
  to: string;
  name: string;
  phone?: string;
}

/**
 * Creates and configures nodemailer transporter
 */
function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Gmail credentials not configured");
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
}

/**
 * Sends a follow-up email to users who booked a demo
 */
export async function sendDemoFollowUpEmail({ to, name, phone }: SendFollowUpEmailParams): Promise<void> {
  const transporter = createTransporter();

  const mailOptions = {
    from: `Infini8 Voice <${process.env.GMAIL_USER}>`,
    to: to,
    replyTo: process.env.GMAIL_USER,
    subject: `Thank you for booking a demo with Infini8 Voice! 🎉`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff;
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center;
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px;
            font-weight: 600;
          }
          .header p { 
            margin: 10px 0 0 0; 
            opacity: 0.9;
            font-size: 16px;
          }
          .content { 
            padding: 40px 30px; 
          }
          .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
          }
          .info-box {
            background: #f9fafb;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
          }
          .info-box p {
            margin: 5px 0;
            color: #555;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
          }
          .footer { 
            background: #f3f4f6; 
            padding: 30px; 
            text-align: center; 
            font-size: 14px; 
            color: #6b7280; 
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin: 5px 0;
          }
          .contact-info {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
          }
          .contact-info p {
            margin: 8px 0;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Thank You for Booking a Demo!</h1>
            <p>We're excited to show you what Infini8 Voice can do</p>
          </div>
          <div class="content">
            <div class="greeting">
              Hi ${name || 'there'},
            </div>
            
            <div class="message">
              Thank you for booking a demo with Infini8 Voice! We're thrilled that you're interested in learning how our AI voice calling agents can transform your customer engagement.
            </div>

            <div class="info-box">
              <p><strong>📞 Your Demo Call</strong></p>
              <p>Our AI agent should have reached out to you shortly. If you haven't received a call yet, don't worry - we'll be in touch soon!</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            </div>

            <div class="message">
              <strong>What's Next?</strong>
            </div>
            
            <div class="message">
              During your demo, you'll experience firsthand how Infini8 Voice can:
              <ul style="margin: 15px 0; padding-left: 20px; color: #555;">
                <li>Automate customer interactions in multiple languages</li>
                <li>Collect valuable feedback and insights</li>
                <li>Qualify leads and schedule appointments</li>
                <li>Integrate seamlessly with your existing systems</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <a href="https://infini8voice.com" class="cta-button">Visit Our Website</a>
            </div>

            <div class="contact-info">
              <p><strong>Need help or have questions?</strong></p>
              <p>Email: connect@88gb.in</p>
              <p>We're here to help you succeed!</p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Infini8 Voice</strong></p>
            <p>Powered by 88GB</p>
            <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
              This email was sent because you booked a demo on our website.<br>
              If you have any questions, please don't hesitate to reach out.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log(`✅ Follow-up email sent successfully to ${to}`);
}

/**
 * Checks if email service is configured
 */
export function isEmailConfigured(): boolean {
  return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

