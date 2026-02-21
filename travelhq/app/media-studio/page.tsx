"use client";
import { useState } from "react";
import { Sparkles, Mic, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function MediaStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    alert("AI Media generation requires Runway API key. Connect it in .env.local");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-500" /> AI Media Studio
        </h1>
        <p className="text-slate-500 mt-1">Generate stunning visuals and voice narrations for your trips</p>
      </div>

      <div className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="font-bold text-slate-800">🎨 Generate Visual</h2>
        <Textarea
          placeholder='e.g. "Sunset view at Taj Mahal with golden light, cinematic style"'
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={3}
        />
        <Button onClick={handleGenerate} disabled={generating} className="gap-2">
          <Wand2 className="w-4 h-4" />
          {generating ? "Generating..." : "Generate with Runway AI"}
        </Button>
      </div>

      <div className="bg-white rounded-2xl border p-6 space-y-4">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          <Mic className="w-5 h-5 text-blue-500" /> Voice Narration
        </h2>
        <p className="text-sm text-slate-500">Upload a 30-second voice sample to clone your voice for audio guides.</p>
        <Button variant="outline" className="gap-2">
          <Mic className="w-4 h-4" /> Upload Voice Sample (ElevenLabs)
        </Button>
      </div>
    </div>
  );
}
