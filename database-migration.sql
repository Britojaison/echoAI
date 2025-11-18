-- Migration: Add email scheduling columns to call_requests table
-- Run this in your Supabase SQL Editor

-- Add scheduled_email_at column (timestamp when email should be sent)
ALTER TABLE call_requests 
ADD COLUMN IF NOT EXISTS scheduled_email_at TIMESTAMPTZ;

-- Add email_sent_at column (timestamp when email was actually sent)
ALTER TABLE call_requests 
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMPTZ;

-- Add index for better query performance on scheduled emails
CREATE INDEX IF NOT EXISTS idx_call_requests_scheduled_email 
ON call_requests(scheduled_email_at) 
WHERE email_sent_at IS NULL AND email IS NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN call_requests.scheduled_email_at IS 'Timestamp when follow-up email should be sent (3 minutes after booking)';
COMMENT ON COLUMN call_requests.email_sent_at IS 'Timestamp when follow-up email was actually sent';

