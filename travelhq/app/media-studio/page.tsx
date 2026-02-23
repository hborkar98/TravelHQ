"use client";
import { useState, useRef } from "react";
import { Sparkles, Mic, Wand2, Download, Play, Pause, RefreshCw, ImageIcon, Volume2 } from "lucide-react";

const IMAGE_STYLES = [
  { label: "Cinematic",      value: "cinematic travel photography, golden hour, film grain, anamorphic lens" },
  { label: "Watercolor",     value: "watercolor painting, soft brushstrokes, artistic, travel illustration" },
  { label: "Aerial Drone",   value: "aerial drone shot, bird's eye view, ultra wide angle, stunning landscape" },
  { label: "Golden Hour",    value: "golden hour photography, warm tones, dramatic lighting, travel magazine" },
  { label: "Moody Dark",     value: "moody dark travel photography, dramatic shadows, high contrast, atmospheric" },
  { label: "Vibrant Street", value: "vibrant street photography, candid, colorful, bustling city life" },
];

const VOICES = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel",  desc: "Warm & Professional" },
  { id: "pNInz6obpgDQGcFmaJgB", name: "Adam",    desc: "Deep & Authoritative" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella",   desc: "Soft & Friendly" },
  { id: "ErXwobaYiN019PkySvjV", name: "Antoni",  desc: "Crisp & Clear" },
];

const SAMPLE_PROMPTS = [
  "Sunset view over the Taj Mahal with golden reflections in the pool",
  "Narrow cobblestone streets of Santorini with blue domed churches",
  "Cherry blossom trees lining a path to a traditional Japanese temple",
  "Aerial view of Goa coastline with turquoise waters and palm trees",
];

export default function MediaStudioPage() {
  const [imagePrompt, setImagePrompt]         = useState("");
  const [imageStyle, setImageStyle]           = useState(IMAGE_STYLES[0].value);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage]   = useState<string | null>(null);
  const [imageError, setImageError]           = useState<string | null>(null);

  const [voiceText, setVoiceText]             = useState("");
  const [selectedVoice, setSelectedVoice]     = useState(VOICES[0].id);
  const [generatingVoice, setGeneratingVoice] = useState(false);
  const [audioSrc, setAudioSrc]               = useState<string | null>(null);
  const [voiceError, setVoiceError]           = useState<string | null>(null);
  const [isPlaying, setIsPlaying]             = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setGeneratingImage(true);
    setImageError(null);
    setGeneratedImage(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt, style: imageStyle }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setGeneratedImage(data.image);
    } catch (e: any) {
      setImageError(e.message);
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleGenerateVoice = async () => {
    if (!voiceText.trim()) return;
    setGeneratingVoice(true);
    setVoiceError(null);
    setAudioSrc(null);
    setIsPlaying(false);
    try {
      const res = await fetch("/api/generate-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: voiceText, voiceId: selectedVoice }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Voice generation failed");
      setAudioSrc(data.audio);
    } catch (e: any) {
      setVoiceError(e.message);
    } finally {
      setGeneratingVoice(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const a = document.createElement("a");
    a.href = generatedImage; a.download = "travelhq-image.png"; a.click();
  };

  const downloadAudio = () => {
    if (!audioSrc) return;
    const a = document.createElement("a");
    a.href = audioSrc; a.download = "travelhq-narration.mp3"; a.click();
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", transition: "background 0.3s ease" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">

        {/* Header */}
        <div className="animate-fade-up-1">
          <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>✦ AI Studio</p>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Media Studio</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Generate stunning visuals and voice narrations powered by AI
          </p>
        </div>

        {/* ── IMAGE GENERATION ── */}
        <div className="animate-fade-up-2 glass rounded-2xl overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.25)" }}>
              <ImageIcon className="w-4 h-4" style={{ color: "#a78bfa" }} />
            </div>
            <div>
              <h2 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>AI Image Generator</h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Powered by Stability AI · SDXL 1.0</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Quick prompts</p>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((p) => (
                  <button key={p} onClick={() => setImagePrompt(p)}
                    className="text-xs px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>
                    {p.slice(0, 35)}…
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Describe your image
              </label>
              <textarea value={imagePrompt} onChange={e => setImagePrompt(e.target.value)}
                placeholder='e.g. "Sunset over the Taj Mahal with golden reflections"'
                rows={3} className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "DM Sans, sans-serif" }}
                onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Visual style</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {IMAGE_STYLES.map((s) => (
                  <button key={s.label} onClick={() => setImageStyle(s.value)}
                    className="text-xs px-3 py-2 rounded-xl text-left transition-all font-medium"
                    style={imageStyle === s.value
                      ? { background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#000" }
                      : { background: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleGenerateImage} disabled={generatingImage || !imagePrompt.trim()}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-black transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", boxShadow: "0 4px 20px var(--accent-bg)" }}>
              {generatingImage
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating image...</>
                : <><Wand2 className="w-4 h-4" /> Generate Image</>}
            </button>
            {imageError && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                ⚠️ {imageError}
              </div>
            )}
            {generatedImage && (
              <div className="rounded-2xl overflow-hidden relative group" style={{ border: "1px solid var(--border)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={generatedImage} alt="AI Generated" className="w-full object-cover" />
                <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}>
                  <button onClick={downloadImage}
                    className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl text-black"
                    style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))" }}>
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── VOICE NARRATION ── */}
        <div className="animate-fade-up-3 glass rounded-2xl overflow-hidden">
          <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.25)" }}>
              <Mic className="w-4 h-4" style={{ color: "#60a5fa" }} />
            </div>
            <div>
              <h2 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Voice Narration</h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Powered by ElevenLabs · Multilingual v2</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-secondary)" }}>Choose voice</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {VOICES.map((v) => (
                  <button key={v.id} onClick={() => setSelectedVoice(v.id)}
                    className="px-3 py-2.5 rounded-xl text-left transition-all"
                    style={selectedVoice === v.id
                      ? { background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#000" }
                      : { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    <p className="text-xs font-bold">{v.name}</p>
                    <p className="text-[10px] opacity-70">{v.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-secondary)" }}>Narration text</label>
              <textarea value={voiceText} onChange={e => setVoiceText(e.target.value)}
                placeholder='e.g. "Welcome to Goa — a coastal paradise where golden sands meet the sparkling Arabian Sea..."'
                rows={4} className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none transition-all"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontFamily: "DM Sans, sans-serif" }}
                onFocus={e => (e.target.style.borderColor = "#60a5fa")}
                onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
              <p className="text-[10px] mt-1 text-right" style={{ color: "var(--text-muted)" }}>
                {voiceText.length} chars · ~{Math.ceil(voiceText.split(" ").filter(Boolean).length / 150)} min audio
              </p>
            </div>
            <button onClick={handleGenerateVoice} disabled={generatingVoice || !voiceText.trim()}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.25)" }}>
              {generatingVoice
                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating voice...</>
                : <><Volume2 className="w-4 h-4" /> Generate Narration</>}
            </button>
            {voiceError && (
              <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }}>
                ⚠️ {voiceError}
              </div>
            )}
            {audioSrc && (
              <div className="rounded-2xl p-4 space-y-3" style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)" }}>
                <audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} />
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                    style={{ background: "rgba(96,165,250,0.2)", border: "1px solid rgba(96,165,250,0.3)" }}>
                    {isPlaying
                      ? <Pause className="w-4 h-4" style={{ color: "#60a5fa" }} />
                      : <Play  className="w-4 h-4 ml-0.5" style={{ color: "#60a5fa" }} />}
                  </button>
                  <div className="flex-1">
                    <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                      {VOICES.find(v => v.id === selectedVoice)?.name} · Narration ready
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Click play to preview</p>
                  </div>
                  <button onClick={downloadAudio}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)" }}>
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="animate-fade-up-4 glass-gold rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" style={{ color: "var(--accent)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>Pro Tips</p>
          </div>
          <ul className="space-y-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
            <li>🎨 <strong>Images:</strong> Mention lighting, time of day, and style for best results</li>
            <li>🎙️ <strong>Voice:</strong> Write naturally — use commas and periods for natural pauses</li>
            <li>📥 <strong>Download:</strong> Hover over generated images to reveal the download button</li>
            <li>🔑 <strong>Keys needed:</strong> Add STABILITY_API_KEY and ELEVENLABS_API_KEY in Vercel settings</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
