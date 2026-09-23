-- INO100+ | Dental Medrano
-- Crea tablas nuevas con prefijo ino_ y el bucket ino-media. No toca ninguna tabla existente.
-- El admin queda habilitado para marketing@dental-medrano.com.ar (última línea). Podés sumar más mails en la tabla ino_admins.

begin;

create table if not exists public.ino_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.ino_admins (
  email text primary key
);

alter table public.ino_content enable row level security;
alter table public.ino_admins enable row level security;

create or replace function public.ino_is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.ino_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.ino_is_admin() to anon, authenticated;

drop policy if exists "ino_content lectura publica" on public.ino_content;
create policy "ino_content lectura publica" on public.ino_content
  for select using (true);

drop policy if exists "ino_content escritura admin" on public.ino_content;
create policy "ino_content escritura admin" on public.ino_content
  for all to authenticated
  using (public.ino_is_admin())
  with check (public.ino_is_admin());

commit;

begin;

insert into storage.buckets (id, name, public)
values ('ino-media', 'ino-media', true)
on conflict (id) do nothing;

drop policy if exists "ino_media lectura publica" on storage.objects;
create policy "ino_media lectura publica" on storage.objects
  for select using (bucket_id = 'ino-media');

drop policy if exists "ino_media escritura admin" on storage.objects;
create policy "ino_media escritura admin" on storage.objects
  for all to authenticated
  using (bucket_id = 'ino-media' and public.ino_is_admin())
  with check (bucket_id = 'ino-media' and public.ino_is_admin());

insert into public.ino_admins (email) values ('marketing@dental-medrano.com.ar') on conflict do nothing;

commit;
