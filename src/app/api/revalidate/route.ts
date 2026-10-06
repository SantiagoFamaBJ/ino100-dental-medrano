import { revalidatePath } from "next/cache";

// Se llama desde el admin después de guardar, para que el sitio muestre los cambios al instante.
// Solo funciona con la clave de admin (variable DM_ADMIN_PASSWORD en Vercel, sin NEXT_PUBLIC_).
const PASSWORD = process.env.DM_ADMIN_PASSWORD || "dm2026";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (typeof password !== "string" || password.trim() !== PASSWORD) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
