import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { sendDemoFollowUpEmail, isEmailConfigured } from "@/lib/email";

/**
 * Cron job endpoint to send delayed follow-up emails
 * This runs every minute via Vercel Cron Jobs
 * 
 * It finds all call_requests where:
 * - scheduled_email_at <= NOW()
 * - email_sent_at IS NULL
 * - email IS NOT NULL
 * 
 * Sends follow-up emails and updates email_sent_at
 */
export async function GET(req: Request) {
  // Vercel Cron Jobs can use either GET or POST
  // Verify this is a cron request (Vercel adds authorization header)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  // If CRON_SECRET is set, verify it. Otherwise, allow (for development)
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if email is configured
    if (!isEmailConfigured()) {
      console.warn("⚠️ Email service not configured - skipping email sending");
      return NextResponse.json({
        success: true,
        message: "Email service not configured",
        processed: 0
      });
    }

    const supabase = createSupabaseClient();
    const now = new Date().toISOString();

    // Find all pending emails that should be sent
    const { data: pendingRequests, error: fetchError } = await supabase
      .from("call_requests")
      .select("id, name, email, phone, scheduled_email_at")
      .not("email", "is", null)
      .is("email_sent_at", null)
      .lte("scheduled_email_at", now);

    if (fetchError) {
      console.error("❌ Error fetching pending emails:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch pending emails", details: fetchError.message },
        { status: 500 }
      );
    }

    if (!pendingRequests || pendingRequests.length === 0) {
      console.log("ℹ️ No pending emails to send");
      return NextResponse.json({
        success: true,
        message: "No pending emails",
        processed: 0
      });
    }

    console.log(`📧 Found ${pendingRequests.length} pending email(s) to send`);

    let successCount = 0;
    let failureCount = 0;
    const errors: Array<{ id: string; error: string }> = [];

    // Process each pending email
    for (const request of pendingRequests) {
      try {
        if (!request.email) {
          console.warn(`⚠️ Skipping request ${request.id} - no email address`);
          continue;
        }

        // Send follow-up email
        await sendDemoFollowUpEmail({
          to: request.email,
          name: request.name || "Valued Customer",
          phone: request.phone || undefined,
        });

        // Update email_sent_at in database
        const { error: updateError } = await supabase
          .from("call_requests")
          .update({ email_sent_at: new Date().toISOString() })
          .eq("id", request.id);

        if (updateError) {
          console.error(`❌ Failed to update email_sent_at for ${request.id}:`, updateError);
          // Email was sent but DB update failed - log but don't fail
        }

        successCount++;
        console.log(`✅ Successfully sent email to ${request.email} (ID: ${request.id})`);

      } catch (error) {
        failureCount++;
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        errors.push({ id: request.id || "unknown", error: errorMessage });
        console.error(`❌ Failed to send email for request ${request.id}:`, error);

        // Optionally: Mark as failed with retry logic in the future
        // For now, we'll leave it so it can be retried on next cron run
      }
    }

    const response = {
      success: true,
      message: `Processed ${pendingRequests.length} pending email(s)`,
      processed: pendingRequests.length,
      successful: successCount,
      failed: failureCount,
      ...(errors.length > 0 && { errors })
    };

    console.log(`📊 Email processing complete: ${successCount} successful, ${failureCount} failed`);

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error("❌ Cron job error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Also handle POST requests (Vercel Cron can use either)
export async function POST(req: Request) {
  return GET(req);
}

