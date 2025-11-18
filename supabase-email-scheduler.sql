-- Supabase Database Function to Send Delayed Emails
-- This uses pg_cron (built into Supabase) - no external services needed!
-- Run this in your Supabase SQL Editor

-- Step 1: Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS http;

-- Step 2: Create a function that sends pending emails by calling our API
CREATE OR REPLACE FUNCTION send_pending_demo_emails()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  request_record RECORD;
  api_url TEXT;
  response_status INT;
  response_content TEXT;
BEGIN
  -- Get the API URL from environment or set it directly
  -- Uses database setting if configured, otherwise defaults to production URL
  api_url := COALESCE(
    current_setting('app.api_url', true),
    'https://infini8voice.com/api/send-email'
  );

  -- Find all pending emails that should be sent
  FOR request_record IN
    SELECT 
      id,
      name,
      email,
      phone,
      scheduled_email_at
    FROM call_requests
    WHERE 
      email IS NOT NULL
      AND email_sent_at IS NULL
      AND scheduled_email_at IS NOT NULL
      AND scheduled_email_at <= NOW()
    LIMIT 10  -- Process max 10 at a time to avoid timeouts
  LOOP
    BEGIN
      -- Call the API endpoint to send the email
      SELECT 
        status,
        content
      INTO 
        response_status,
        response_content
      FROM http((
        'POST',
        api_url,
        ARRAY[
          http_header('Content-Type', 'application/json'),
          http_header('Authorization', 'Bearer ' || current_setting('app.api_secret', true))
        ],
        'application/json',
        json_build_object(
          'id', request_record.id,
          'email', request_record.email,
          'name', request_record.name,
          'phone', request_record.phone
        )::text
      )::http_request);

      -- If successful (status 200), mark as sent
      IF response_status = 200 THEN
        UPDATE call_requests
        SET email_sent_at = NOW()
        WHERE id = request_record.id;
        
        RAISE NOTICE 'Email sent successfully for request %', request_record.id;
      ELSE
        RAISE WARNING 'Failed to send email for request %. Status: %, Response: %', 
          request_record.id, response_status, response_content;
      END IF;

    EXCEPTION WHEN OTHERS THEN
      RAISE WARNING 'Error sending email for request %: %', request_record.id, SQLERRM;
    END;
  END LOOP;
END;
$$;

-- Step 3: Schedule the function to run every minute using pg_cron
-- This will automatically run in the background - no external service needed!
SELECT cron.schedule(
  'send-demo-emails',           -- Job name
  '* * * * *',                  -- Run every minute (cron syntax)
  $$SELECT send_pending_demo_emails();$$
);

-- To view scheduled jobs:
-- SELECT * FROM cron.job;

-- To unschedule (if needed):
-- SELECT cron.unschedule('send-demo-emails');

-- To manually test the function:
-- SELECT send_pending_demo_emails();

