import { supabase } from "./supabase";
import { defaultContent, mergeContent, type Content } from "./content";

// Lee el contenido guardado en Supabase y lo mezcla sobre el de fábrica.
// Si Supabase no está configurado o falla, el sitio sigue funcionando con el contenido por defecto.
export async function getContent(): Promise<Content> {
  if (!supabase) return defaultContent;
  try {
    const { data, error } = await supabase.from("ino_content").select("data").eq("id", "main").maybeSingle();
    if (error || !data?.data) return defaultContent;
    return mergeContent(defaultContent, data.data);
  } catch {
    return defaultContent;
  }
}
