import { ICON_OPTIONS } from "./icons";

export type Field =
  | { key: string; label: string; type: "text" | "textarea" | "url"; hint?: string; rows?: number }
  | { key: string; label: string; type: "image" | "video" | "file"; hint?: string }
  | { key: string; label: string; type: "select"; options: { value: string; label: string }[]; hint?: string }
  | { key: string; label: string; type: "strings"; hint?: string; addLabel?: string }
  | { key: string; label: string; type: "videoGroups"; hint?: string }
  | {
      key: string;
      label: string;
      type: "list";
      fields: Field[];
      itemName: string; // cómo se llama cada elemento ("Característica", "Pregunta"…)
      titleKey: string; // campo que se muestra como título de cada elemento
      hint?: string;
      max?: number;
    };

export type Section = { id: string; label: string; help?: string; fields: Field[] };

const pairFields: Field[] = [
  { key: "label", label: "Nombre", type: "text" },
  { key: "value", label: "Valor", type: "text" },
];

export const SECTIONS: Section[] = [
  {
    id: "site",
    label: "Contacto, enlaces y SEO",
    help: "WhatsApp, catálogo, enlaces a la tienda y datos para Google y redes.",
    fields: [
      {
        key: "whatsapp",
        label: "Números de WhatsApp",
        type: "list",
        itemName: "Número",
        titleKey: "label",
        hint: "El primero es el del botón flotante y del botón del encabezado.",
        fields: [
          { key: "label", label: "Nombre (ej: Professional Center)", type: "text" },
          { key: "display", label: "Cómo se muestra (ej: 11 6436-2400)", type: "text" },
          { key: "number", label: "Número para el link, con código de país (ej: 5491164362400)", type: "text" },
          { key: "message", label: "Mensaje que aparece escrito al abrir WhatsApp", type: "textarea", rows: 2 },
        ],
      },
      { key: "catalogUrl", label: "Catálogo PDF", type: "file", hint: "Subí un PDF nuevo o pegá el link de uno existente." },
      { key: "pcPdfUrl", label: "PDF de requisitos de PC", type: "file" },
      { key: "shopUrl", label: "Link a la ficha en la tienda", type: "url" },
      { key: "retailUrl", label: "Link acceso minorista", type: "url" },
      { key: "wholesaleUrl", label: "Link acceso mayorista", type: "url" },
      { key: "seoTitle", label: "Título en Google (hasta 60 caracteres)", type: "text" },
      { key: "seoDescription", label: "Descripción en Google (hasta 160 caracteres)", type: "textarea", rows: 3 },
      { key: "ogImage", label: "Imagen al compartir el link (1200 × 630 px)", type: "image" },
    ],
  },
  {
    id: "hero",
    label: "Portada",
    fields: [
      { key: "kicker", label: "Texto junto al logo BLZ", type: "text" },
      { key: "title", label: "Título principal", type: "text" },
      { key: "subtitle", label: "Bajada", type: "textarea", rows: 4 },
      { key: "image", label: "Imagen del escáner (PNG o WebP con fondo transparente)", type: "image" },
      { key: "primaryCta", label: "Botón principal (WhatsApp)", type: "text" },
      { key: "secondaryCta", label: "Botón secundario (catálogo)", type: "text" },
      {
        key: "stats",
        label: "Datos destacados",
        type: "list",
        itemName: "Dato",
        titleKey: "value",
        max: 4,
        hint: "Se ven en la franja debajo de la portada. Lo ideal son 4.",
        fields: [
          { key: "value", label: "Valor (ej: 30 s)", type: "text" },
          { key: "label", label: "Descripción (ej: arcada completa)", type: "text" },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "Características",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto de apoyo", type: "textarea", rows: 2 },
      {
        key: "items",
        label: "Características",
        type: "list",
        itemName: "Característica",
        titleKey: "title",
        fields: [
          { key: "icon", label: "Ícono", type: "select", options: ICON_OPTIONS },
          { key: "title", label: "Título", type: "text" },
          { key: "text", label: "Texto", type: "textarea", rows: 2 },
        ],
      },
    ],
  },
  {
    id: "comparison",
    label: "Comparativa",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto de apoyo", type: "textarea", rows: 2 },
      { key: "digitalTitle", label: "Título de la columna digital", type: "text" },
      { key: "digital", label: "Ventajas del INO100+", type: "strings", addLabel: "Agregar ventaja" },
      { key: "analogTitle", label: "Título de la columna analógica", type: "text" },
      { key: "analog", label: "Desventajas del método analógico", type: "strings", addLabel: "Agregar punto" },
    ],
  },
  {
    id: "tips",
    label: "Puntas de escaneo",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto de apoyo", type: "textarea", rows: 2 },
      {
        key: "items",
        label: "Puntas",
        type: "list",
        itemName: "Punta",
        titleKey: "name",
        fields: [
          { key: "name", label: "Nombre", type: "text" },
          { key: "size", label: "Medidas", type: "text" },
          { key: "text", label: "Descripción", type: "textarea", rows: 3 },
          { key: "use", label: "Ideal para", type: "text" },
          { key: "image", label: "Imagen (fondo transparente)", type: "image" },
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "Escaneo con IA",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto", type: "textarea", rows: 4 },
      { key: "offImage", label: "Imagen con IA desactivada", type: "image" },
      { key: "onImage", label: "Imagen con IA activada", type: "image", hint: "Usá la misma proporción que la otra imagen." },
      { key: "offLabel", label: "Nombre del botón (desactivada)", type: "text" },
      { key: "onLabel", label: "Nombre del botón (activada)", type: "text" },
    ],
  },
  {
    id: "tools",
    label: "Software",
    fields: [
      { key: "title", label: "Título", type: "text" },
      {
        key: "items",
        label: "Herramientas",
        type: "list",
        itemName: "Herramienta",
        titleKey: "title",
        fields: [
          { key: "title", label: "Título", type: "text" },
          { key: "text", label: "Texto", type: "textarea", rows: 3 },
          { key: "image", label: "Imagen", type: "image" },
          { key: "badge", label: "Círculo sobre la imagen (opcional)", type: "text", hint: "Dejalo vacío si no querés círculo." },
        ],
      },
    ],
  },
  {
    id: "setup",
    label: "Conexión y formatos",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto", type: "textarea", rows: 4 },
      { key: "image", label: "Imagen", type: "image" },
      { key: "formatsLabel", label: "Título de los formatos", type: "text" },
      { key: "formats", label: "Formatos de salida", type: "strings", addLabel: "Agregar formato" },
    ],
  },
  {
    id: "resources",
    label: "Recursos",
    help: "En Link podés escribir @catalog (catálogo), @pc (PDF de requisitos), @wa (WhatsApp), #instrucciones (video de uso) o pegar cualquier link.",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto de apoyo", type: "textarea", rows: 2 },
      {
        key: "items",
        label: "Recursos",
        type: "list",
        itemName: "Recurso",
        titleKey: "title",
        fields: [
          { key: "icon", label: "Ícono", type: "select", options: ICON_OPTIONS },
          { key: "title", label: "Título", type: "text" },
          { key: "text", label: "Texto", type: "textarea", rows: 2 },
          { key: "href", label: "Link", type: "text" },
        ],
      },
    ],
  },
  {
    id: "specs",
    label: "Especificaciones",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "left", label: "Columna izquierda", type: "list", itemName: "Fila", titleKey: "label", fields: pairFields },
      { key: "right", label: "Columna derecha", type: "list", itemName: "Fila", titleKey: "label", fields: pairFields },
    ],
  },
  {
    id: "pc",
    label: "Requisitos de PC",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto", type: "textarea", rows: 2 },
      { key: "pdfLabel", label: "Texto del botón del PDF", type: "text" },
      { key: "rows", label: "Requisitos", type: "list", itemName: "Requisito", titleKey: "label", fields: pairFields },
      { key: "notes", label: "Advertencias", type: "strings", addLabel: "Agregar advertencia" },
    ],
  },
  {
    id: "videos",
    label: "Videos",
    help: "Los videos sin link no se muestran. Cada grupo aparece como una pestaña, y la sección completa aparece sola cuando cargás el primer link de YouTube.",
    fields: [
      { key: "title", label: "Título de la sección", type: "text" },
      { key: "text", label: "Texto (opcional)", type: "textarea", rows: 2 },
      {
        key: "groups",
        label: "Grupos de videos",
        type: "videoGroups",
        hint: "Cada grupo es una pestaña en la página. Con \"Mover a\" pasás un video de un grupo a otro.",
      },
      { key: "usageTitle", label: "Instrucciones de uso: título", type: "text" },
      { key: "usageText", label: "Instrucciones de uso: texto", type: "textarea", rows: 2 },
      { key: "usageUrl", label: "Instrucciones de uso: video", type: "video" },
    ],
  },
  {
    id: "faq",
    label: "Preguntas frecuentes",
    fields: [
      { key: "title", label: "Título", type: "text" },
      {
        key: "items",
        label: "Preguntas",
        type: "list",
        itemName: "Pregunta",
        titleKey: "q",
        fields: [
          { key: "q", label: "Pregunta", type: "text" },
          { key: "a", label: "Respuesta", type: "textarea", rows: 3 },
        ],
      },
    ],
  },
  {
    id: "cta",
    label: "Llamado final",
    fields: [
      { key: "title", label: "Título", type: "text" },
      { key: "text", label: "Texto", type: "textarea", rows: 2 },
      { key: "catalogLabel", label: "Botón del catálogo", type: "text" },
    ],
  },
  {
    id: "footer",
    label: "Pie de página",
    fields: [
      { key: "brandNote", label: "Nota sobre la marca", type: "text" },
      {
        key: "locations",
        label: "Sucursales",
        type: "list",
        itemName: "Sucursal",
        titleKey: "name",
        fields: [
          { key: "name", label: "Nombre", type: "text" },
          { key: "address", label: "Dirección", type: "text" },
          { key: "phone", label: "Teléfono", type: "text" },
          { key: "hours", label: "Horarios (opcional, ej: Lunes a viernes de 9 a 18 h)", type: "text" },
          { key: "mapUrl", label: "Link de Google Maps (opcional; si lo dejás vacío se arma solo con la dirección)", type: "url" },
        ],
      },
    ],
  },
];

export function emptyItem(fields: Field[]): any {
  const o: any = {};
  for (const f of fields) {
    if (f.type === "list" || f.type === "strings") o[f.key] = [];
    else if (f.type === "select") o[f.key] = f.options[0]?.value ?? "";
    else o[f.key] = "";
  }
  return o;
}
