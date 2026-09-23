import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

// Se llama desde el admin después de guardar, para que el sitio muestre los cambios al instante.
// Solo funciona con la sesión de un usuario que esté en la tabla ino_admins.
export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!url || !key || !token) return Response.json({ ok: false }, { status: 401 });

  const sb = createClient(url, key, { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data: userData, error } = await sb.auth.getUser(token);
  if (error || !userData.user) return Response.json({ ok: false }, { status: 401 });

  const { data: isAdmin } = await sb.rpc("ino_is_admin");
  if (isAdmin !== true) return Response.json({ ok: false }, { status: 403 });

  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
