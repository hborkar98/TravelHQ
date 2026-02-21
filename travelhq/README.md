# TravelHQ 🌍✈️

AI-powered Travel Planning SaaS — Plan complete trips in seconds.

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your API keys in .env.local
npm run dev
```

## Required Environment Variables

See `.env.example` for all required keys:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from supabase.com
- `ANTHROPIC_API_KEY` — from console.anthropic.com
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` — from mapbox.com
- `STRIPE_SECRET_KEY` — from stripe.com (global payments)
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` — from razorpay.com (India)
- `ELEVENLABS_API_KEY` — from elevenlabs.io
- `RUNWAY_API_KEY` — from runwayml.com

## Deploy

### Vercel
```bash
npx vercel --prod
```

### Supabase
```bash
npx supabase db push
npx supabase functions deploy generate-trip
```

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Auth, Postgres, Storage, Realtime)
- **AI**: Anthropic Claude (itinerary), Runway (visuals), ElevenLabs (voice)
- **Maps**: Mapbox GL JS + Directions API
- **Payments**: Razorpay (India) + Stripe (global)
- **State**: Zustand + localStorage offline cache
