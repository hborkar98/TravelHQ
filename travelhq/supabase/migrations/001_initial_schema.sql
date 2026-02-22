-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'wanderer', 'pro')),
  trips_this_month INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Travel profiles
CREATE TABLE IF NOT EXISTS public.travel_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  preferences JSONB DEFAULT '{}',
  dietary TEXT,
  style TEXT DEFAULT 'comfort',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trips
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget_inr NUMERIC(12,2) DEFAULT 0,
  actual_spend_inr NUMERIC(12,2) DEFAULT 0,
  group_size INT DEFAULT 1,
  style TEXT DEFAULT 'comfort',
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning','confirmed','active','completed','cancelled')),
  cover_image TEXT,
  json_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trip days
CREATE TABLE IF NOT EXISTS public.trip_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  day_number INT NOT NULL,
  date DATE NOT NULL,
  title TEXT,
  activities JSONB DEFAULT '[]',
  total_cost_inr NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  amount_inr NUMERIC(10,2) NOT NULL,
  category TEXT DEFAULT 'other',
  date DATE DEFAULT CURRENT_DATE,
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media assets
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  type TEXT CHECK (type IN ('image','video','audio')) NOT NULL,
  ai_generated BOOLEAN DEFAULT FALSE,
  prompt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group members
CREATE TABLE IF NOT EXISTS public.group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('owner','editor','viewer')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);

-- Saved templates
CREATE TABLE IF NOT EXISTS public.saved_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  json_data JSONB NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON public.trips(user_id);
CREATE INDEX IF NOT EXISTS idx_trip_days_trip_id ON public.trip_days(trip_id);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_id ON public.expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_media_trip_id ON public.media_assets(trip_id);

-- Trigger: update actual_spend on expense insert
CREATE OR REPLACE FUNCTION update_trip_spend()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.trips
  SET actual_spend_inr = (
    SELECT COALESCE(SUM(amount_inr), 0) FROM public.expenses WHERE trip_id = NEW.trip_id
  ),
  updated_at = NOW()
  WHERE id = NEW.trip_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER expense_after_insert
AFTER INSERT OR UPDATE OR DELETE ON public.expenses
FOR EACH ROW EXECUTE FUNCTION update_trip_spend();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.trips;
ALTER PUBLICATION supabase_realtime ADD TABLE public.media_assets;

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_profiles ENABLE ROW LEVEL SECURITY;

-- Users: only their own record
CREATE POLICY "users_own" ON public.users FOR ALL USING (auth.uid() = id);

-- Trips: owner or group member
CREATE POLICY "trips_owner" ON public.trips FOR ALL
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.group_members WHERE trip_id = id AND user_id = auth.uid()
  ));

-- Trip days
CREATE POLICY "trip_days_owner" ON public.trip_days FOR ALL
  USING (EXISTS (SELECT 1 FROM public.trips WHERE id = trip_id AND (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.group_members WHERE trip_id = id AND user_id = auth.uid()
  ))));

-- Expenses
CREATE POLICY "expenses_owner" ON public.expenses FOR ALL USING (auth.uid() = user_id);

-- Media assets
CREATE POLICY "media_owner" ON public.media_assets FOR ALL USING (auth.uid() = user_id);

-- Group members
CREATE POLICY "group_members_trip" ON public.group_members FOR ALL
  USING (EXISTS (SELECT 1 FROM public.trips WHERE id = trip_id AND user_id = auth.uid()));

-- Travel profiles
CREATE POLICY "profiles_own" ON public.travel_profiles FOR ALL USING (auth.uid() = user_id);
