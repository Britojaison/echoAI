# Delayed Email Setup Guide

This document explains how the delayed email system works and how to set it up.

## Overview

When a user books a demo and provides their email, the system:
1. Stores the email in the database with a `scheduled_email_at` timestamp (5 minutes from booking)
2. A cron job runs every minute to check for pending emails
3. Emails are sent 5 minutes after the user books the demo
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

Add these to your `.env.local` and Vercel environment variables:

```bash
# Gmail SMTP (required for sending emails)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Cron Secret (optional, but recommended for security)
CRON_SECRET=your-random-secret-key
```

### Getting Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `GMAIL_APP_PASSWORD`

## Vercel Cron Jobs Setup

### 1. Deploy to Vercel

The `vercel.json` file is already configured with the cron job:

```json
{
  "crons": [
    {
      "path": "/api/cron/send-delayed-emails",
      "schedule": "* * * * *"
    }
  ]
}
```

This runs every minute (`* * * * *`).

### 2. Enable Cron Jobs in Vercel

1. Go to your Vercel project settings
2. Navigate to "Cron Jobs" section
3. The cron job should appear automatically after deployment
4. Verify it's enabled

### 3. Set CRON_SECRET (Recommended)

For security, set a `CRON_SECRET` environment variable in Vercel:
1. Go to Project Settings → Environment Variables
2. Add `CRON_SECRET` with a random string
3. The cron endpoint will verify this secret

## How It Works

### Flow Diagram

```
User Books Demo
    ↓
Email stored with scheduled_email_at = NOW() + 5 minutes
    ↓
Cron job runs every minute
    ↓
Query: scheduled_email_at <= NOW() AND email_sent_at IS NULL
    ↓
Send email via SMTP
    ↓
Update email_sent_at = NOW()
```

### Files Involved

- **`app/api/call/route.ts`** - Sets `scheduled_email_at` when storing demo booking
- **`app/api/cron/send-delayed-emails/route.ts`** - Cron job that sends pending emails
- **`lib/email.ts`** - Email utility with follow-up email template
- **`vercel.json`** - Cron job configuration

## Testing

### Manual Testing

You can manually trigger the cron job by calling:

```bash
curl -X GET https://your-domain.com/api/cron/send-delayed-emails \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Local Testing

1. Set `scheduled_email_at` to a past date in your database
2. Set `email_sent_at` to NULL
3. Call the endpoint manually or wait for cron

## Monitoring

Check Vercel logs to monitor:
- Cron job execution
- Email sending success/failures
- Database query results

## Troubleshooting

### Emails Not Sending

1. **Check Gmail credentials**: Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set
2. **Check cron job**: Verify it's running in Vercel dashboard
3. **Check database**: Verify `scheduled_email_at` is set correctly
4. **Check logs**: Look for errors in Vercel function logs

### Cron Job Not Running

1. Verify `vercel.json` is deployed
2. Check Vercel Cron Jobs dashboard
3. Ensure you're on a Vercel plan that supports cron jobs (Pro/Enterprise)

### Database Errors

1. Verify migration was run successfully
2. Check column names match exactly
3. Verify Supabase connection is working

## Email Template

The follow-up email includes:
- Thank you message
- Demo call information
- What to expect next
- Contact information
- Professional HTML styling

You can customize the template in `lib/email.ts`.

## Future Enhancements

Potential improvements:
- Retry logic for failed emails
- Email templates for different scenarios
- Analytics on email open rates
- A/B testing different email content
- Queue system for better reliability

