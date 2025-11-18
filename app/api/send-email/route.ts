import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Simple API endpoint to send follow-up emails
 * Called by Supabase pg_cron database function
 * Uses the same SMTP setup as contact form
 */
export async function POST(req: Request) {
  try {
    // Optional: Simple secret check
    const apiSecret = process.env.EMAIL_API_SECRET;
    const authHeader = req.headers.get("authorization");
    
    if (apiSecret && authHeader !== `Bearer ${apiSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, email, name, phone } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if email is configured (same as contact form)
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const customerName = name || "Valued Customer";

    // Create transporter (same as contact form)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Send follow-up email (same style as contact form)
    const mailOptions = {
      from: `Infini8 Voice <${process.env.GMAIL_USER}>`,
      to: email,
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
                Hi ${customerName},
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
    console.log(`✅ Email sent successfully to ${email} (ID: ${id})`);

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully",
      id 
    });

  } catch (error) {
    console.error("❌ Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

