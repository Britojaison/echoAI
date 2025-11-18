# Delayed Email Setup Guide

This document explains how the delayed email system works and how to set it up.

## Overview

When a user books a demo and provides their email, the system:
1. Stores the email in the database with a `scheduled_email_at` timestamp (5 minutes from booking)
2. An external cron service calls the API endpoint every minute to check for pending emails
3. Emails are sent 5 minutes after the user books the demo using the same SMTP setup as the contact form
4. The `email_sent_at` field is updated after successful sending

## Database Setup

### 1. Run the Migration

Execute the SQL in `database-migration.sql` in your Supabase SQL Editor:

```sql
ALTER TABLE call_requests 
ADD COLUMN IF NOT EXISTS scheduled_email_at TIMESTAMPTZ;

ALTER TABLE call_requests 
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_call_requests_scheduled_email 
ON call_requests(scheduled_email_at) 
WHERE email_sent_at IS NULL AND email IS NOT NULL;
```

## Environment Variables

Add these to your `.env.local` and production environment:

```bash
# Gmail SMTP (required for sending emails - same as contact form)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Optional: Secret for securing the cron endpoint
EMAIL_CRON_SECRET=your-random-secret-key
```

### Getting Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `GMAIL_APP_PASSWORD`

## External Cron Service Setup

Since we're not using Vercel Cron, you need to set up an external cron service to call the endpoint every minute.

### Option 1: cron-job.org (Free)

1. Go to [cron-job.org](https://cron-job.org) and create a free account
2. Create a new cron job:
   - **URL**: `https://your-domain.com/api/cron/send-delayed-emails`
   - **Schedule**: Every minute (`* * * * *`)
   - **Request Method**: GET or POST
   - **Headers**: `Authorization: Bearer YOUR_EMAIL_CRON_SECRET` (if you set EMAIL_CRON_SECRET)
3. Save and activate the cron job

### Option 2: EasyCron (Free tier available)

1. Go to [EasyCron](https://www.easycron.com) and sign up
2. Create a new cron job with the same settings as above

### Option 3: Any other cron service

Any service that can make HTTP requests on a schedule will work. Just point it to:
```
https://your-domain.com/api/cron/send-delayed-emails
```

## How It Works

### Flow Diagram

```
User Books Demo
    ↓
Email stored with scheduled_email_at = NOW() + 5 minutes
    ↓
External cron service calls endpoint every minute
    ↓
Query: scheduled_email_at <= NOW() AND email_sent_at IS NULL
    ↓
Send email via SMTP (same as contact form)
    ↓
Update email_sent_at = NOW()
```

### Files Involved

- **`app/api/call/route.ts`** - Sets `scheduled_email_at` when storing demo booking
- **`app/api/cron/send-delayed-emails/route.ts`** - Simple endpoint that sends pending emails using nodemailer (same as contact form)

## Testing

### Manual Testing

You can manually trigger the endpoint:

```bash
# Without secret
curl -X GET https://your-domain.com/api/cron/send-delayed-emails

# With secret (if EMAIL_CRON_SECRET is set)
curl -X GET https://your-domain.com/api/cron/send-delayed-emails \
  -H "Authorization: Bearer YOUR_EMAIL_CRON_SECRET"
```

### Local Testing

1. Set `scheduled_email_at` to a past date in your database
2. Set `email_sent_at` to NULL
3. Call the endpoint manually:
   ```bash
   curl http://localhost:3000/api/cron/send-delayed-emails
   ```

## Monitoring

Check your deployment logs to monitor:
- Endpoint calls from cron service
- Email sending success/failures
- Database query results

## Troubleshooting

### Emails Not Sending

1. **Check Gmail credentials**: Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set (same as contact form)
2. **Check cron service**: Verify it's calling the endpoint successfully
3. **Check database**: Verify `scheduled_email_at` is set correctly
4. **Check logs**: Look for errors in your deployment logs

### Cron Service Not Working

1. Verify the cron service is active and running
2. Check the cron service logs for failed requests
3. Test the endpoint manually to ensure it works
4. Verify the URL is correct and accessible

### Database Errors

1. Verify migration was run successfully
2. Check column names match exactly
3. Verify Supabase connection is working

## Email Template

The follow-up email uses the same styling approach as the contact form and includes:
- Thank you message
- Demo call information
- What to expect next
- Contact information
- Professional HTML styling

The email template is embedded directly in the cron endpoint (same pattern as contact form).

## Advantages of This Approach

- ✅ Simple - uses the same nodemailer setup as contact form
- ✅ No vendor lock-in - works with any hosting provider
- ✅ Free - can use free external cron services
- ✅ Easy to debug - just a simple API endpoint
- ✅ Same reliability as contact form emails

