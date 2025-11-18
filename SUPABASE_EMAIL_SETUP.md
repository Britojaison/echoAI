# Supabase Database-Triggered Email Setup

This solution uses Supabase's built-in `pg_cron` extension - **no external cron services or logins needed!**

## How It Works

1. User books demo → Email stored with `scheduled_email_at = NOW() + 5 minutes`
2. Supabase `pg_cron` runs a database function every minute (automatically)
3. Database function calls your API endpoint to send emails
4. API sends email using SMTP (same as contact form)
5. Database updates `email_sent_at` after successful send

**Everything runs inside Supabase - no external services!**

## Setup Steps

### 1. Database Migration

Run the SQL in `database-migration.sql` first to add the columns:

```sql
ALTER TABLE call_requests 
ADD COLUMN IF NOT EXISTS scheduled_email_at TIMESTAMPTZ;

ALTER TABLE call_requests 
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_call_requests_scheduled_email 
ON call_requests(scheduled_email_at) 
WHERE email_sent_at IS NULL AND email IS NOT NULL;
```

### 2. Enable Extensions & Create Function

Run the SQL in `supabase-email-scheduler.sql` in your Supabase SQL Editor:

This will:
- Enable `pg_cron` and `http` extensions
- Create a database function that sends pending emails
- Schedule it to run every minute automatically

**Note:** The API URL is already configured in `supabase-email-scheduler.sql` to use `https://infini8voice.com/api/send-email`. If you need to use a different URL, you can either:
- Set it via database setting: `ALTER DATABASE postgres SET app.api_url = 'your-url';`
- Or update the default value in the SQL file

### 3. Environment Variables

Add to your `.env.local` and production:

```bash
# Gmail SMTP (same as contact form)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Optional: Secret for API endpoint security
EMAIL_API_SECRET=your-random-secret-key
```

### 4. Set Database Configuration (Optional)

If you set `EMAIL_API_SECRET`, configure it in Supabase:

```sql
-- Set the API secret in Supabase
ALTER DATABASE postgres SET app.api_secret = 'your-random-secret-key';

-- Set the API URL (optional - defaults to https://infini8voice.com/api/send-email)
ALTER DATABASE postgres SET app.api_url = 'https://infini8voice.com/api/send-email';
```

Or update the SQL function directly with your values.

## How It Works

### Database Function Flow

```
pg_cron (runs every minute)
    ↓
Calls send_pending_demo_emails() function
    ↓
Finds pending emails (scheduled_email_at <= NOW())
    ↓
Calls your API endpoint via HTTP
    ↓
API sends email via SMTP
    ↓
Updates email_sent_at in database
```

## Testing

### Test the Database Function Manually

```sql
-- Run this in Supabase SQL Editor
SELECT send_pending_demo_emails();
```

### Test the API Endpoint

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

### View Scheduled Jobs

```sql
-- See all pg_cron jobs
SELECT * FROM cron.job;

-- See job run history
SELECT * FROM cron.job_run_details 
WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'send-demo-emails')
ORDER BY start_time DESC 
LIMIT 10;
```

## Management

### View Cron Jobs

```sql
SELECT * FROM cron.job;
```

### Unschedule (if needed)

```sql
SELECT cron.unschedule('send-demo-emails');
```

### Reschedule

```sql
-- Remove old schedule
SELECT cron.unschedule('send-demo-emails');

-- Add new schedule (runs every 2 minutes instead)
SELECT cron.schedule(
  'send-demo-emails',
  '*/2 * * * *',  -- Every 2 minutes
  $$SELECT send_pending_demo_emails();$$
);
```

## Advantages

✅ **No external services** - Everything runs in Supabase  
✅ **No logins needed** - pg_cron runs automatically  
✅ **Free** - pg_cron is built into Supabase  
✅ **Reliable** - Database-level scheduling  
✅ **Simple** - Uses same SMTP as contact form  
✅ **No vendor lock-in** - Standard PostgreSQL features  

## Troubleshooting

### Emails Not Sending

1. **Check pg_cron is enabled**: 
   ```sql
   SELECT * FROM pg_extension WHERE extname = 'pg_cron';
   ```

2. **Check function exists**:
   ```sql
   SELECT proname FROM pg_proc WHERE proname = 'send_pending_demo_emails';
   ```

3. **Check cron job is scheduled**:
   ```sql
   SELECT * FROM cron.job WHERE jobname = 'send-demo-emails';
   ```

4. **Check recent job runs**:
   ```sql
   SELECT * FROM cron.job_run_details 
   WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'send-demo-emails')
   ORDER BY start_time DESC LIMIT 5;
   ```

5. **Test API endpoint manually** (see Testing section above)

6. **Check Gmail credentials** - Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set

### Database Function Errors

Check Supabase logs or run the function manually to see errors:
```sql
SELECT send_pending_demo_emails();
```

### HTTP Extension Not Working

If `http` extension is not available, you may need to enable it:
```sql
CREATE EXTENSION IF NOT EXISTS http;
```

If it's still not available, contact Supabase support or use an alternative approach.

## Notes

- The database function processes max 10 emails per run to avoid timeouts
- If there are more than 10 pending emails, they'll be processed in the next run
- The function is idempotent - safe to run multiple times
- All email sending uses the same SMTP configuration as your contact form

