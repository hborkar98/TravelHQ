-- TravelHQ Full Schema Migration
-- Run in Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── Users (extends Supabase auth) ──────────────────────────────────────────
create table if not exists public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'wanderer', 'pro')),
  trips_this_month int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- ─── Travel Profiles ─────────────────────────────────────────────────────────
create table if not exists public.travel_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null unique,
  preferred_style text,
  dietary_preferences jsonb default '[]',
  accessibility_needs text,
  home_city text,
  currency text default 'INR',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.travel_profiles enable row level security;

create policy "Users manage own profile" on public.travel_profiles
  for all using (auth.uid() = user_id);

-- ─── Trips ───────────────────────────────────────────────────────────────────
create table if not exists public.trips (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  destination text not null,
  origin text,
  start_date date not null,
  end_date date not null,
  budget numeric(12,2) default 0,
  currency text default 'INR',
  group_size int default 1,
  style text default 'cultural',
  interests jsonb default '[]',
  status text default 'planning' check (status in ('draft', 'planning', 'active', 'completed', 'archived')),
  cover_image text,
  ai_notes text,
  budget_breakdown jsonb,
  map_center jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists trips_user_id_idx on public.trips(user_id);
create index if not exists trips_status_idx on public.trips(status);

alter table public.trips enable row level security;

create policy "Users manage own trips" on public.trips
  for all using (auth.uid() = user_id);

-- ─── Trip Days ───────────────────────────────────────────────────────────────
create table if not exists public.trip_days (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references public.trips(id) on delete cascade not null,
  day_number int not null,
  date date,
  title text,
  activities jsonb default '[]',
  total_cost numeric(10,2) default 0,
  weather text,
  created_at timestamptz default now()
);

create index if not exists trip_days_trip_idx on public.trip_days(trip_id);

alter table public.trip_days enable row level security;

create policy "Users manage own trip days" on public.trip_days
  for all using (
    auth.uid() = (select user_id from public.trips where id = trip_id)
  );

-- ─── Expenses ────────────────────────────────────────────────────────────────
create table if not exists public.expenses (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references public.trips(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  amount numeric(10,2) not null,
  currency text default 'INR',
  category text not null,
  description text not null,
  date date default current_date,
  receipt_url text,
  created_at timestamptz default now()
);

create index if not exists expenses_trip_id_idx on public.expenses(trip_id);

alter table public.expenses enable row level security;

create policy "Trip members can view expenses" on public.expenses
  for select using (
    auth.uid() = user_id or
    auth.uid() = (select user_id from public.trips where id = trip_id)
  );

create policy "Users insert own expenses" on public.expenses
  for insert with check (auth.uid() = user_id);

-- ─── Media Assets ────────────────────────────────────────────────────────────
create table if not exists public.media_assets (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references public.trips(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  type text not null check (type in ('image', 'video', 'audio')),
  url text not null,
  thumbnail_url text,
  prompt text,
  ai_generated boolean default false,
  day_number int,
  title text,
  created_at timestamptz default now()
);

create index if not exists media_assets_trip_idx on public.media_assets(trip_id);

alter table public.media_assets enable row level security;

create policy "Users manage own media" on public.media_assets
  for all using (auth.uid() = user_id);

-- ─── Group Members ───────────────────────────────────────────────────────────
create table if not exists public.group_members (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid references public.trips(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  role text default 'member' check (role in ('owner', 'editor', 'member')),
  joined_at timestamptz default now(),
  unique(trip_id, user_id)
);

alter table public.group_members enable row level security;

create policy "Members can view trip members" on public.group_members
  for select using (
    auth.uid() = user_id or
    auth.uid() = (select user_id from public.trips where id = trip_id)
  );

-- ─── Enable Realtime ─────────────────────────────────────────────────────────
alter publication supabase_realtime add table public.expenses;
alter publication supabase_realtime add table public.trip_days;
alter publication supabase_realtime add table public.media_assets;

-- ─── Trigger: update trip updated_at ─────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trips_updated_at
  before update on public.trips
  for each row execute function update_updated_at();

create trigger users_updated_at
  before update on public.users
  for each row execute function update_updated_at();

-- ─── Seed Demo Data (optional) ───────────────────────────────────────────────
-- Uncomment to add demo trips
-- insert into public.trips (user_id, title, destination, start_date, end_date, budget, style, interests, status)
-- values (auth.uid(), 'Goa Beach Escape', 'Goa, India', '2024-12-20', '2024-12-25', 25000, 'relaxation', '["beaches","food","nightlife"]', 'completed');
