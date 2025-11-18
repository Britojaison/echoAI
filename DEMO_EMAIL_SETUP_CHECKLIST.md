# Demo Form Email Setup Checklist

This checklist ensures the 5-minute delayed email system for demo form submissions is fully configured.

## Prerequisites

### Environment Variables Required

Make sure these are set in your `.env.local` (for development) and production environment:

```bash
# Required for sending emails
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Optional but recommended for API security
EMAIL_API_SECRET=your-random-secret-key

# Required for Supabase connection
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Setup Steps

### ✅ Step 1: Database Migration

Run `database-migration.sql` in your Supabase SQL Editor to add the required columns:

```sql
-- This adds scheduled_email_at and email_sent_at columns
-- Run the entire file: database-migration.sql
```

**Verify it worked:**
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'call_requests' 
AND column_name IN ('scheduled_email_at', 'email_sent_at');
```

### ✅ Step 2: Set Up Email Scheduler Function

Run `supabase-email-scheduler.sql` in your Supabase SQL Editor. This will:
- Enable `pg_cron` and `http` extensions
- Create the `send_pending_demo_emails()` function
- Schedule the cron job to run every minute

**Verify it worked:**
```sql
-- Check function exists
SELECT proname FROM pg_proc WHERE proname = 'send_pending_demo_emails';

-- Check cron job is scheduled
SELECT * FROM cron.job WHERE jobname = 'send-demo-emails';
```

### ✅ Step 3: Configure API Secret (Optional but Recommended)

If you set `EMAIL_API_SECRET`, configure it in Supabase:

```sql
ALTER DATABASE postgres SET app.api_secret = 'your-email-api-secret-value';
```

**Note:** The API URL is already configured to use `https://infini8voice.com/api/send-email`. If you need a different URL, set it with:
```sql
ALTER DATABASE postgres SET app.api_url = 'https://your-domain.com/api/send-email';
```

### ✅ Step 4: Test the Setup

1. **Test the API endpoint directly:**
```bash
curl -X POST https://infini8voice.com/api/send-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_EMAIL_API_SECRET" \
  -d '{
    "id": "test-id",
    "email": "test@example.com",
    "name": "Test User",
    "phone": "+1234567890"
  }'
```

2. **Test the database function manually:**
```sql
SELECT send_pending_demo_emails();
```

3. **Submit a demo form** and verify:
   - Record is created in `call_requests` table
   - `scheduled_email_at` is set to 5 minutes from now
   - After 5+ minutes, check that `email_sent_at` is updated
   - Customer receives the thank-you email

## Verification Queries

### Check Pending Emails
```sql
SELECT id, name, email, phone, scheduled_email_at, email_sent_at
FROM call_requests
WHERE email IS NOT NULL
  AND email_sent_at IS NULL
  AND scheduled_email_at IS NOT NULL
  AND scheduled_email_at <= NOW();
```

### Check Recent Email Sends
```sql
SELECT id, name, email, scheduled_email_at, email_sent_at
FROM call_requests
WHERE email_sent_at IS NOT NULL
ORDER BY email_sent_at DESC
LIMIT 10;
```

### Check Cron Job Status
```sql
-- View scheduled jobs
SELECT * FROM cron.job WHERE jobname = 'send-demo-emails';

-- View recent job runs
SELECT * FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'send-demo-emails')
ORDER BY start_time DESC 
LIMIT 10;
```

## Troubleshooting

### Emails Not Sending

1. **Check environment variables are set:**
   - `GMAIL_USER` and `GMAIL_APP_PASSWORD` must be set
   - Verify in your deployment platform (Vercel, etc.)

2. **Check database function is running:**
   ```sql
   SELECT * FROM cron.job_run_details 
   WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'send-demo-emails')
   ORDER BY start_time DESC LIMIT 5;
   ```

3. **Check for errors in function:**
   ```sql
   SELECT send_pending_demo_emails();
   -- Look for any error messages
   ```

4. **Verify API endpoint is accessible:**
   - Test with curl command above
   - Check deployment logs for errors

### Common Issues

- **pg_cron not enabled**: Run `CREATE EXTENSION IF NOT EXISTS pg_cron;`
- **http extension not available**: Contact Supabase support
- **API returns 401**: Check `EMAIL_API_SECRET` matches in both database and environment
- **API returns 500**: Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set correctly

## Current Configuration

- **API URL**: `https://infini8voice.com/api/send-email`
- **Email Delay**: 5 minutes after demo form submission
- **Cron Schedule**: Every minute (`* * * * *`)
- **Batch Size**: 10 emails per run (to avoid timeouts)

## Files Involved

- `app/api/call/route.ts` - Stores demo booking with scheduled email time
- `app/api/send-email/route.ts` - Sends thank-you emails to customers
- `components/demo-booking-modal.tsx` - Demo form UI
- `database-migration.sql` - Database schema migration
- `supabase-email-scheduler.sql` - Database function and cron setup

