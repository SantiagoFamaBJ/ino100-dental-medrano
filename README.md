# INO100+ | Dental Medrano

Landing del escáner intraoral INO100+ (Next.js + Tailwind + Supabase + Vercel).

## Puesta en marcha

1. Supabase → SQL Editor: ejecutar `supabase/setup.sql` (después de reemplazar el email).
2. Supabase → Authentication → Users → Add user (con Auto Confirm) usando ese mismo email.
3. Copiar `.env.local.example` a `.env.local` y pegar la anon key.
4. `npm install` y `npm run dev` → http://localhost:3000 (admin en `/admin`).
5. Vercel: importar el repo y cargar las mismas dos variables de entorno.

Si Supabase no está configurado, el sitio funciona igual con el contenido original (`src/lib/content.ts`).
