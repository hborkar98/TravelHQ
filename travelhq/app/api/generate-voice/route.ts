import { NextRequest, NextResponse } from "next/server";

// Default voice IDs from ElevenLabs
const VOICES = {
  rachel:  "21m00Tcm4TlvDq8ikWAM",
  adam:    "pNInz6obpgDQGcFmaJgB",
  bella:   "EXAVITQu4vr4xnSDxMaL",
  antoni:  "ErXwobaYiN019PkySvjV",
};

export async function POST(req: NextRequest) {
  const { text, voiceId } = await req.json();

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing ELEVENLABS_API_KEY" }, { status: 500 });
  }

  if (!text?.trim()) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const selectedVoice = voiceId || VOICES.rachel;

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    return NextResponse.json(
      { error: err?.detail?.message || "Voice generation failed" },
      { status: response.status }
    );
  }

  // Return audio as base64
  const audioBuffer = await response.arrayBuffer();
  const base64Audio = Buffer.from(audioBuffer).toString("base64");

  return NextResponse.json({
    audio: `data:audio/mpeg;base64,${base64Audio}`,
  });
}
