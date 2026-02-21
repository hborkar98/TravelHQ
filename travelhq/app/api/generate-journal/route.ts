import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { tripId } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      journal: "Your amazing journey began with excitement and anticipation...\n\n(Add ANTHROPIC_API_KEY to generate a real journal)",
    });
  }

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Write a beautiful, first-person travel journal for a trip (trip ID: ${tripId}). 
Make it evocative, personal, and detailed — covering the sights, sounds, food, and emotions. 
Write 3-5 paragraphs. No headings, just flowing prose.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response");

    return NextResponse.json({ journal: content.text });
  } catch (err) {
    console.error("Journal generation failed:", err);
    return NextResponse.json(
      { error: "Journal generation failed" },
      { status: 500 }
    );
  }
}
