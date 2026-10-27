-- 在 Supabase SQL Editor 執行。服務金鑰只能放在 Vercel 環境變數。
create extension if not exists pgcrypto;
create table if not exists public.posts (
 id uuid primary key default gen_random_uuid(),
 month smallint not null check (month between 1 and 12),
 flower varchar(60) not null check (length(trim(flower)) > 0),
 place varchar(100) not null check (length(trim(place)) > 0),
 nickname varchar(40) not null check (length(trim(nickname)) > 0),
 story varchar(500) not null default '',
 image_path text not null,
 status text not null default 'pending' check (status in ('pending','approved','rejected')),
 created_at timestamptz not null default now()
);
alter table public.posts enable row level security;
-- 不開放 anon / authenticated 直接查詢或寫入。所有存取由 Vercel API 執行。
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('flower-photos','flower-photos',false,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
create index if not exists posts_status_created_idx on public.posts(status,created_at desc);
