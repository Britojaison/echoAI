# Email Setup Instructions

## Contact Form Email Notifications

The contact form is now configured to send email notifications to **tech@88gb.in** for every submission.

### Current Status: ✅ WORKING

Emails are being sent successfully to tech@88gb.in using Resend test mode.

### Setup Steps

1. **Get a Resend API Key**
   - Go to [https://resend.com](https://resend.com)
   - Sign up for a free account (includes 3,000 emails/month for free)
   - Navigate to API Keys section
   - Create a new API key

2. **Add Environment Variable**
   
   Create or update the `.env.local` file in the root directory:
   ```bash
   # Resend API Configuration
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

### What Happens

When someone submits the "Talk to Sales" form:
1. Form data is validated
2. A beautifully formatted email is sent to **tech@88gb.in** containing:
   - Customer's name
   - Email address (set as reply-to for easy responses)
   - Phone number (clickable)
   - Company name (if provided)
   - Use case selection
   - Additional notes (if provided)
   - Timestamp in IST timezone
3. Success message shown to the user
4. Form is cleared and ready for next submission

### Email Template Features

✅ Professional design with gradient header  
✅ All contact details clearly organized  
✅ Clickable email and phone links  
✅ Reply-To set to customer's email for easy responses  
✅ Timestamp in Indian Standard Time  
✅ Mobile-friendly responsive design  

### Testing

You can test the email functionality by:
1. Filling out the contact form on your website
2. Checking the inbox at **tech@88gb.in**
3. The email should arrive within seconds

---

## 📧 To Send to Other Email Addresses (like brito.jaison@88gb.in)

Currently, Resend is in **test mode** and can only send to your verified email (tech@88gb.in). To send to any email address:

### Option 1: Verify Your Domain (Recommended for Production)

1. **Go to Resend Dashboard**
   - Visit [https://resend.com/domains](https://resend.com/domains)
   - Click "Add Domain"

2. **Add Your Domain**
   - Enter your domain: `88gb.in`
   - Follow DNS configuration instructions (add TXT, MX, and CNAME records)

3. **Update the Code**
   Once verified, change in `/app/api/contact/route.ts`:
   ```typescript
   from: 'Infini8 Voice <noreply@88gb.in>',  // Use your domain
   to: ['brito.jaison@88gb.in'],        // Can now send to any email
   ```

### Option 2: Use Email Forwarding (Quick Solution)

Set up email forwarding in your email client:
- Forward all emails from tech@88gb.in to brito.jaison@88gb.in
- This works immediately without code changes

### Troubleshooting

If emails are not arriving:
- Check that `RESEND_API_KEY` is set correctly in `.env.local`
- Restart your development server after adding the environment variable
- Check the console logs for any error messages
- Verify your Resend account is active and has remaining email quota

### Production Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add `RESEND_API_KEY` to your hosting platform's environment variables
2. The same email configuration will work automatically

---

**Note:** The free tier of Resend (3,000 emails/month) is more than enough for a sales form. If you need more, paid plans are very affordable.

