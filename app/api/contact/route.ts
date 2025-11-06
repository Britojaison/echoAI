import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company?: string;
  useCase: string;
  notes?: string;
}

export async function POST(req: Request) {
  try {
    const formData: ContactFormData = await req.json();

    // Validate required fields
    if (!formData.firstName || !formData.firstName.trim()) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 });
    }
    if (!formData.lastName || !formData.lastName.trim()) {
      return NextResponse.json({ error: "Last name is required" }, { status: 400 });
    }
    if (!formData.email || !formData.email.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Log the contact form submission
    console.log("=== New Contact Form Submission ===");
    console.log("Date:", new Date().toISOString());
    console.log("Name:", `${formData.firstName} ${formData.lastName}`);
    console.log("Email:", formData.email);
    console.log("Phone:", formData.phoneNumber);
    console.log("Company:", formData.company || "Not provided");
    console.log("Use Case:", formData.useCase);
    console.log("Notes:", formData.notes || "None");
    console.log("===================================");

    // Send email notification using Gmail SMTP
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
          }
        });

        const mailOptions = {
          from: `Infini8 Voice Website <${process.env.GMAIL_USER}>`,
          to: 'brito.jaison@88gb.in', // Your email address
          replyTo: formData.email,
          subject: `🔔 New Sales Inquiry from ${formData.firstName} ${formData.lastName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
                .field { margin-bottom: 20px; }
                .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
                .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #667eea; }
                .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">🎯 New Sales Inquiry</h1>
                  <p style="margin: 10px 0 0 0; opacity: 0.9;">Infini8 Voice Contact Form</p>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">👤 Name</div>
                    <div class="value">${formData.firstName} ${formData.lastName}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">📧 Email</div>
                    <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">📱 Phone Number</div>
                    <div class="value"><a href="tel:${formData.phoneNumber}">${formData.phoneNumber}</a></div>
                  </div>
                  
                  <div class="field">
                    <div class="label">🏢 Company</div>
                    <div class="value">${formData.company || '<em>Not provided</em>'}</div>
                  </div>
                  
                  <div class="field">
                    <div class="label">🎯 Use Case</div>
                    <div class="value">${formData.useCase}</div>
                  </div>
                  
                  ${formData.notes ? `
                  <div class="field">
                    <div class="label">📝 Additional Notes</div>
                    <div class="value">${formData.notes}</div>
                  </div>
                  ` : ''}
                </div>
                <div class="footer">
                  <p style="margin: 0;">Submitted at: ${new Date().toLocaleString('en-US', { 
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'full',
                    timeStyle: 'long'
                  })}</p>
                  <p style="margin: 10px 0 0 0;">Infini8 Voice - Powered by 88GB</p>
                </div>
              </div>
            </body>
            </html>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email notification sent successfully via Gmail SMTP");
      } catch (emailError) {
        console.error("❌ Failed to send email notification:", emailError);
        // Don't fail the request if email fails - log it and continue
      }
    } else {
      console.warn("⚠️ Gmail credentials not configured - skipping email notification");
    }

    // Return success response
    return NextResponse.json({ 
      success: true,
      message: "Form submitted successfully" 
    }, { status: 200 });

  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json({ 
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}

