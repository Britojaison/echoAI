# Gmail SMTP Setup Instructions

## Quick Setup for Contact Form Emails

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click "Security" → "2-Step Verification"
3. Enable 2-factor authentication if not already enabled

### Step 2: Generate App Password
1. In Google Account Settings, go to "Security"
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" as the app
4. Select "Other" as the device and name it "ECHO AI Website"
5. Click "Generate"
6. **Copy the 16-character password** (like: `abcd efgh ijkl mnop`)

### Step 3: Add Environment Variables
Add these to your `.env.local` file:

```bash
# Gmail SMTP Configuration
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

**Example:**
```bash
GMAIL_USER=brito.jaison@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
```

### Step 4: Restart Server
```bash
npm run dev
```

## What Happens Now

✅ **Emails will be sent to:** brito.jaison@88gb.in  
✅ **From:** Your Gmail address  
✅ **Reply-To:** Customer's email address  
✅ **Subject:** 🔔 New Sales Inquiry from [Customer Name]  

## Testing

After setup, submit the contact form and check brito.jaison@88gb.in inbox!

## Troubleshooting

**If emails don't arrive:**
1. Check spam folder
2. Verify Gmail credentials are correct
3. Ensure 2FA is enabled
4. Check server logs for error messages

**Common Errors:**
- `Invalid login`: Wrong email or app password
- `Less secure app access`: Need to use App Password, not regular password
- `Authentication failed`: App password expired or incorrect

## Security Notes

- App passwords are safer than regular passwords
- Only works with 2FA enabled
- Can be revoked anytime from Google Account settings
- Each app password is unique and can be deleted individually

---

**Ready to test?** Set up the credentials and submit the contact form!
