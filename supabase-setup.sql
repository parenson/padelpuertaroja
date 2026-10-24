-- La Víbora Invitational: backend setup for the Gallery and Bracket features.
-- Paste this whole file into the Supabase SQL Editor and click Run. Safe to run more than once.
--
-- The "admins" list below decides who can edit the bracket and delete photos. Those people
-- also need a login under Authentication → Users. Anyone with the site link can view and add photos.

-- ---------- tables ----------
create table if not exists public.tournament (
  id int primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.tournament (id, data) values (1, '{}'::jsonb) on conflict (id) do nothing;

create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path text not null,
  thumb text not null,
  caption text not null default '',
  uploader text not null default '',
  w int,
  h int
);

create table if not exists public.admins (email text primary key);
insert into public.admins (email) values
  ('parenson@yahoo.com')
on conflict (email) do nothing;

alter table public.tournament enable row level security;
alter table public.photos enable row level security;
alter table public.admins enable row level security;

-- true when the signed-in user's email is in the admins table
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---------- table policies ----------
drop policy if exists "tournament read" on public.tournament;
create policy "tournament read" on public.tournament for select using (true);
drop policy if exists "tournament admin write" on public.tournament;
create policy "tournament admin write" on public.tournament for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "photos read" on public.photos;
create policy "photos read" on public.photos for select using (true);
drop policy if exists "photos anyone adds" on public.photos;
create policy "photos anyone adds" on public.photos for insert with check (
  char_length(caption) <= 140 and char_length(uploader) <= 40
  and path like 'full/%' and thumb like 'thumb/%'
);
drop policy if exists "photos admin delete" on public.photos;
create policy "photos admin delete" on public.photos for delete to authenticated using (public.is_admin());

-- ---------- pro showcase betting pool ----------
-- Pool settings (teams, open / closed / settled, winner, bet limits) live in tournament row 2, edited on admin.html.
-- Bets are rows in the bets table. Anyone can add a bet while the pool is open; only organizers can remove one.
insert into public.tournament (id, data) values (2, '{"title":"Pro Showcase","teamA":"Gio Carillo & Neil Scantlebury","teamB":"Alvaro Pecos & Eduardo Villaseñor","status":"open","winner":null,"min":5,"max":500}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.bets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  pool int not null default 2,
  name text not null,
  team text not null check (team in ('a', 'b')),
  amount int not null check (amount >= 1 and amount <= 10000),
  device text not null default ''
);
alter table public.bets enable row level security;

-- true while the pool is open and the amount is within the organizer's limits
create or replace function public.bet_allowed(p int, amt int) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.tournament
    where id = p and data ->> 'status' = 'open'
      and amt >= coalesce((data ->> 'min')::int, 1) and amt <= coalesce((data ->> 'max')::int, 10000)
  );
$$;

drop policy if exists "bets read" on public.bets;
create policy "bets read" on public.bets for select using (true);
drop policy if exists "bets anyone adds" on public.bets;
create policy "bets anyone adds" on public.bets for insert with check (
  char_length(name) between 1 and 40 and char_length(device) <= 40 and public.bet_allowed(pool, amount)
);
drop policy if exists "bets admin delete" on public.bets;
create policy "bets admin delete" on public.bets for delete to authenticated using (public.is_admin());

-- ---------- storage bucket for photos ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 6291456, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "gallery public read" on storage.objects;
create policy "gallery public read" on storage.objects for select using (bucket_id = 'gallery');
drop policy if exists "gallery anyone uploads" on storage.objects;
create policy "gallery anyone uploads" on storage.objects for insert with check (
  bucket_id = 'gallery' and (name like 'full/%' or name like 'thumb/%')
);
drop policy if exists "gallery admin delete" on storage.objects;
create policy "gallery admin delete" on storage.objects for delete to authenticated
  using (bucket_id = 'gallery' and public.is_admin());
