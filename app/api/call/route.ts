import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, name } = await req.json();

    console.log("API Call Request:", { phone, name });

    if (!phone || !/^\+?[1-9]\d{7,14}$/.test(phone))
      return NextResponse.json({ error: "Use E.164 phone, e.g. +919876543210" }, { status: 400 });

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

    const requestBody = {
      agent_id: process.env.ELEVENLABS_AGENT_ID,
      agent_phone_number_id: process.env.ELEVENLABS_AGENT_PHONE_ID,
      to_number: phone.startsWith("+") ? phone : `+${phone}`,
      customer: { name: name || "Guest" },
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
