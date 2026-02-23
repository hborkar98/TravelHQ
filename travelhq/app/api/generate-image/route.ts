import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, style } = await req.json();

  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing STABILITY_API_KEY" }, { status: 500 });
  }

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const styledPrompt = `${prompt}, ${style || "cinematic travel photography, golden hour, highly detailed, 4k"}`;

  const response = await fetch(
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          { text: styledPrompt, weight: 1 },
          { text: "blurry, bad quality, distorted, ugly, watermark", weight: -1 },
        ],
        cfg_scale: 8,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    return NextResponse.json(
      { error: err?.message || "Image generation failed" },
      { status: response.status }
    );
  }

  const data = await response.json();
  const base64 = data.artifacts?.[0]?.base64;

  if (!base64) {
    return NextResponse.json({ error: "No image returned" }, { status: 500 });
  }

  return NextResponse.json({ image: `data:image/png;base64,${base64}` });
}
