import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { phone, name, email } = await req.json();

    const rawPhone =
      typeof phone === "string"
        ? phone.trim()
        : typeof phone === "number"
          ? phone.toString()
          : "";
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";

    console.log("API Call Request:", { phone: rawPhone, name: trimmedName, email: trimmedEmail });

    if (!rawPhone || !/^\+?[1-9]\d{7,14}$/.test(rawPhone))
      return NextResponse.json({ error: "Use E.164 phone, e.g. +919876543210" }, { status: 400 });

    const normalizedPhone = rawPhone.startsWith("+") ? rawPhone : `+${rawPhone}`;
    const customerName = trimmedName || "Guest";

    // Check if environment variables are set
    if (!process.env.ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY not found in environment variables");
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    if (!process.env.ELEVENLABS_AGENT_ID) {
      console.error("ELEVENLABS_AGENT_ID not found in environment variables");
      return NextResponse.json({ error: "Agent ID not configured" }, { status: 500 });
    }

    if (!process.env.ELEVENLABS_AGENT_PHONE_ID) {
      console.error("ELEVENLABS_AGENT_PHONE_ID not found in environment variables");
      return NextResponse.json({ error: "Agent Phone ID not configured" }, { status: 500 });
    }

    try {
      const supabase = createSupabaseClient();
      
      // Calculate scheduled email time (5 minutes from now)
      const scheduledEmailAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
      
      const { error: supabaseError } = await supabase.from("call_requests").insert({
        name: trimmedName || null,
        email: trimmedEmail || null,
        phone: normalizedPhone,
        created_at: new Date().toISOString(),
        scheduled_email_at: trimmedEmail ? scheduledEmailAt.toISOString() : null,
        email_sent_at: null,
      });

      if (supabaseError) {
        console.error("Failed to store call request in Supabase:", supabaseError);
      } else {
        console.info("Stored call request in Supabase");
      }
    } catch (supabaseClientError) {
      console.error("Supabase client error:", supabaseClientError);
    }

    const requestBody = {
      agent_id: process.env.ELEVENLABS_AGENT_ID,
      agent_phone_number_id: process.env.ELEVENLABS_AGENT_PHONE_ID,
      to_number: normalizedPhone,
      customer: { name: customerName },
      language: "en-IN",
      metadata: { source: "infini8voice-site" }
    };

    console.log("Making ElevenLabs API call with body:", requestBody);

    const r = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("ElevenLabs API response status:", r.status);

    if (!r.ok) {
      const errorText = await r.text();
      console.error("ElevenLabs API error:", errorText);
      return NextResponse.json({ error: `ElevenLabs API error: ${errorText}` }, { status: 502 });
    }

    const responseData = await r.json();
    console.log("ElevenLabs API success:", responseData);
    return NextResponse.json(responseData);

  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
