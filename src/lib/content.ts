// Contenido por defecto del sitio INO100+.
// Todo esto se puede editar desde /admin. Lo que se guarda en Supabase pisa estos valores.

export type WhatsApp = { label: string; number: string; display: string; message: string };
export type Pair = { label: string; value: string };

export type Content = {
  site: {
    productName: string;
    whatsapp: WhatsApp[];
    catalogUrl: string;
    pcPdfUrl: string;
    shopUrl: string;
    wholesaleUrl: string;
    retailUrl: string;
    seoTitle: string;
    seoDescription: string;
    ogImage: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    image: string;
    primaryCta: string;
    secondaryCta: string;
    stats: Pair[];
  };
  features: {
    title: string;
    text: string;
    items: { icon: string; title: string; text: string }[];
  };
  comparison: {
    title: string;
    text: string;
    digitalTitle: string;
    analogTitle: string;
    digital: string[];
    analog: string[];
  };
  resources: {
    title: string;
    text: string;
    items: { icon: string; title: string; text: string; href: string }[];
  };
  tips: {
    title: string;
    text: string;
    items: { name: string; size: string; text: string; use: string; image: string }[];
  };
  ai: {
    title: string;
    text: string;
    offImage: string;
    onImage: string;
    offLabel: string;
    onLabel: string;
  };
  tools: {
    title: string;
    items: { title: string; text: string; image: string; badge: string }[];
  };
  setup: {
    title: string;
    text: string;
    image: string;
    formatsLabel: string;
    formats: string[];
  };
  specs: {
    title: string;
    left: Pair[];
    right: Pair[];
  };
  pc: {
    title: string;
    text: string;
    pdfLabel: string;
    rows: Pair[];
    notes: string[];
  };
  videos: {
    title: string;
    text: string;
    groups: { name: string; items: { title: string; url: string }[] }[];
    usageTitle: string;
    usageText: string;
    usageUrl: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    text: string;
    catalogLabel: string;
  };
  footer: {
    brandNote: string;
    locations: { name: string; address: string; phone: string; hours: string; mapUrl: string }[];
  };
};

const MSG = "Hola! Quiero más información sobre el escáner intraoral INO100+";

export const defaultContent: Content = {
  site: {
    productName: "INO100+",
    whatsapp: [
      { label: "Professional Center", number: "5491164362400", display: "11 6436-2400", message: MSG },
      { label: "Dental Medrano Directo", number: "5491166422000", display: "11 6642-2000", message: MSG },
    ],
    catalogUrl: "/catalogo-ino100plus.pdf",
    pcPdfUrl: "/requisitos-pc-ino100plus.pdf",
    shopUrl: "https://dentalmedrano.com/producto/escaner-intraoral-blz-ino100-plus/",
    wholesaleUrl: "https://distribuidores.dentalmedrano.com",
    retailUrl: "https://dentalmedrano.com",
    seoTitle: "Escáner intraoral INO100+ | Dental Medrano",
    seoDescription:
      "Escáner intraoral INO100+ de BLZ Dental: arcada completa en 30 segundos, precisión menor a 20 µm, color real, tres puntas e inteligencia artificial. Consultá en Dental Medrano.",
    ogImage: "/img/og.jpg",
  },
  hero: {
    kicker: "Escáner intraoral",
    title: "Redefiní el comienzo de tu flujo digital",
    subtitle:
      "El INO100+ escanea una arcada completa en 30 segundos, con color real y precisión menor a 20 µm. Tres puntas, inteligencia artificial y archivos STL, PLY y OBJ listos para tu laboratorio.",
    image: "/img/scanner.webp",
    primaryCta: "Consultar por WhatsApp",
    secondaryCta: "Descargar catálogo",
    stats: [
      { label: "arcada completa", value: "30 s" },
      { label: "precisión", value: "< 20 µm" },
      { label: "peso del escáner", value: "270 g" },
      { label: "puntas de escaneo", value: "3" },
    ],
  },
  features: {
    title: "Rápido, preciso y listo apenas se enciende",
    text: "Cinco características que el INO100+ suma a cada escaneo.",
    items: [
      { icon: "zap", title: "Escaneado rápido", text: "30 segundos para escanear una arcada completa." },
      { icon: "ruler", title: "Mayor precisión", text: "Menos de 20 µm, con algoritmos optimizados para mayor exactitud." },
      { icon: "eye", title: "Escaneo a color real", text: "Apto para múltiples tipos de escaneo dental." },
      { icon: "power", title: "Encendido instantáneo", text: "Queda listo para escanear en cuanto se enciende." },
      { icon: "hand", title: "Control remoto", text: "Operación sencilla y eficiente desde el propio escáner." },
    ],
  },
  comparison: {
    title: "Escanear en digital, sin las complicaciones de la impresión tradicional",
    text: "Compará el flujo con el INO100+ frente a la toma de impresiones convencional.",
    digitalTitle: "Con el INO100+",
    analogTitle: "Con el método analógico",
    digital: [
      "Escaneo de una arcada completa en aproximadamente 30 segundos.",
      "Sin alginato ni cubetas: el modelo 3D se genera en pantalla.",
      "Tres puntas para distintos casos: Estándar, 90° y Mini.",
      "La IA filtra automáticamente la lengua y los labios durante el escaneo.",
      "Color real y precisión menor a 20 µm.",
      "Archivos STL, PLY y OBJ listos para enviar al laboratorio.",
    ],
    analog: [
      "La toma de alginato es incómoda para el paciente y puede provocar náuseas.",
      "Los modelos de yeso se pueden romper y requieren vaciado y recorte.",
      "Las cubetas estándar no siempre se adaptan a bocas pequeñas.",
      "Una impresión con errores hay que repetirla.",
      "El traslado físico al laboratorio demora el trabajo.",
    ],
  },
  resources: {
    title: "Recursos para incorporar el escáner",
    text: "Todo lo que necesitás para conocer el INO100+ y empezar a usarlo.",
    items: [
      { icon: "video", title: "Guías en video", text: "Instrucciones de uso, calibración, exportación de archivos y casos reales.", href: "#instrucciones" },
      { icon: "file", title: "Catálogo del INO100+", text: "Características, puntas y especificaciones en un PDF.", href: "@catalog" },
      { icon: "monitor", title: "Requisitos de PC", text: "Verificá que tu computadora sea compatible con el escáner.", href: "@pc" },
      { icon: "message", title: "Asesoramiento", text: "Consultá con un asesor de Dental Medrano por WhatsApp.", href: "@wa" },
    ],
  },
  tips: {
    title: "Tres puntas de escaneo",
    text: "Elegí la punta según el paciente y la zona a escanear. Las puntas a 90° suman ángulos de escaneo.",
    items: [
      {
        name: "Punta Estándar",
        size: "19,5 × 17,5 mm (±1 mm)",
        text: "La punta de uso general, con un campo de visión amplio y buena maniobrabilidad.",
        use: "Escaneos de rutina y de arcada completa.",
        image: "/img/tip-standard.webp",
      },
      {
        name: "Punta 90°",
        size: "19 × 19 mm (±1 mm)",
        text: "Su salida óptica forma 90° con el cuerpo del escáner y agrega ángulos de escaneo.",
        use: "Zonas posteriores y bocas con poca apertura.",
        image: "/img/tip-90.webp",
      },
      {
        name: "Punta Mini",
        size: "16,5 × 16,5 mm (±1 mm)",
        text: "La más compacta de las tres: ocupa menos espacio en boca.",
        use: "Pacientes pediátricos y arcadas estrechas.",
        image: "/img/tip-mini.webp",
      },
    ],
  },
  ai: {
    title: "Escaneo con inteligencia artificial",
    text: "La IA filtra automáticamente los datos que no hacen falta, como la lengua y los labios. El resultado es un escaneo más fluido, con un modelo más limpio desde el primer pase.",
    offImage: "/img/ia-off.webp",
    onImage: "/img/ia-on.webp",
    offLabel: "IA desactivada",
    onLabel: "IA activada",
  },
  tools: {
    title: "Un software pensado para el consultorio",
    items: [
      {
        title: "Informe clínico digital con IA",
        text: "Mejorá la comunicación clínica: generá un informe digital del escaneo y compartilo con tu paciente desde el celular.",
        image: "/img/informe-paciente.webp",
        badge: "Compartí con tu paciente",
      },
      {
        title: "Medición de tonos",
        text: "Comparás el tono directamente sobre el modelo escaneado y tenés una referencia clara para el trabajo con el laboratorio.",
        image: "/img/sw-tonos.webp",
        badge: "",
      },
      {
        title: "Herramienta de medición",
        text: "Medí distancia, ángulo, longitud, área y más sobre los datos 3D del escaneo. Facilita evaluar la preparación dental en detalle.",
        image: "/img/sw-medicion.webp",
        badge: "",
      },
      {
        title: "Biblioteca de scanbodies",
        text: "En el escaneo de implantes, el software reconoce automáticamente los datos del scanbody gracias a su biblioteca integrada.",
        image: "/img/sw-scanbodies.webp",
        badge: "",
      },
    ],
  },
  setup: {
    title: "Se conecta a tu PC y exporta a tu flujo de trabajo",
    text: "El INO100+ se conecta por USB 3.0 Tipo C a una PC con Windows. Genera el modelo 3D con detección de oclusión y de zonas retentivas, y lo exporta en formatos abiertos para integrarlo con distintos flujos digitales.",
    image: "/img/setup.webp",
    formatsLabel: "Formatos de salida",
    formats: ["STL", "PLY", "OBJ"],
  },
  specs: {
    title: "Especificaciones del INO100+",
    left: [
      { label: "Profundidad de escaneo", value: "23 mm" },
      { label: "Peso", value: "270 g" },
      { label: "Dimensiones", value: "264 × 37 × 46 mm" },
      { label: "Punta Estándar", value: "19,5 × 17,5 mm (±1 mm)" },
      { label: "Punta 90°", value: "19 × 19 mm (±1 mm)" },
      { label: "Punta Mini", value: "16,5 × 16,5 mm (±1 mm)" },
      { label: "Control de movimiento", value: "Sí" },
      { label: "Tecnología IA", value: "Sí" },
      { label: "Formatos de salida", value: "STL, PLY, OBJ" },
      { label: "Fuente de alimentación", value: "DC12V 2A" },
    ],
    right: [
      { label: "Fuente de luz", value: "LED" },
      { label: "Interfaz", value: "USB 3.0 Tipo C" },
      { label: "Informe digital con IA", value: "Sí" },
      { label: "Detección de oclusión", value: "Sí" },
      { label: "Detección de zonas retentivas", value: "Sí" },
      { label: "Generador de modelo 3D", value: "Sí" },
      { label: "Plataforma en la nube", value: "Sí" },
      { label: "Escaneo de estructuras metálicas", value: "Sí" },
      { label: "Biblioteca de scanbodies", value: "Sí" },
      { label: "Medición de tonos", value: "Sí" },
    ],
  },
  pc: {
    title: "Requisitos mínimos de la PC",
    pdfLabel: "Descargar requisitos en PDF",
    text: "Para trabajar sin interrupciones, la computadora tiene que cumplir estos requisitos o superarlos.",
    rows: [
      { label: "Sistema operativo", value: "Windows 10 (64 bits)" },
      { label: "CPU", value: "Intel Core i5 de 11.ª generación o superior" },
      { label: "RAM", value: "16 GB" },
      { label: "Disco", value: "SSD de 512 GB o superior" },
      { label: "Placa de video", value: "NVIDIA RTX 3060 6 GB o RTX 4060 6 GB" },
      { label: "Resolución", value: "1920 × 1080 a 60 Hz" },
      { label: "Puertos USB", value: "Mínimo un USB Tipo C y un USB 3.0" },
    ],
    notes: [
      "Placa de video NVIDIA con 6 GB de VRAM o más. No se recomiendan las placas AMD.",
      "Procesador Intel. No se recomienda AMD.",
      "Los equipos Apple no son compatibles con el INO100+.",
    ],
  },
  videos: {
    title: "Mirá el INO100+ en acción",
    text: "",
    groups: [
      {
        name: "Conocé el INO100+",
        items: [
          { title: "Introducción", url: "" },
          { title: "Cámara inteligente", url: "" },
          { title: "Experiencia de escaneo rápido", url: "" },
        ],
      },
      {
        name: "Escaneo en acción",
        items: [
          { title: "Caso real", url: "" },
          { title: "Escaneo de arcada completa en 1 minuto", url: "" },
          { title: "Estrategia de escaneo", url: "" },
        ],
      },
      {
        name: "Paso a paso",
        items: [
          { title: "¿Cómo calibrarlo?", url: "" },
          { title: "Exportar archivos", url: "" },
          { title: "Diseño de coronas con guía", url: "" },
        ],
      },
    ],
    usageTitle: "Instrucciones de uso",
    usageText: "Todo lo que necesitás saber para empezar a usar el INO100+ en tu consultorio.",
    usageUrl: "",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Cuánto tarda el escaneo de una arcada completa?",
        a: "Alrededor de 30 segundos.",
      },
      {
        q: "¿Qué puntas tiene el INO100+?",
        a: "Tres: Estándar (19,5 × 17,5 mm), 90° (19 × 19 mm) y Mini (16,5 × 16,5 mm).",
      },
      {
        q: "¿En qué formatos exporta los modelos?",
        a: "STL, PLY y OBJ, los formatos habituales para trabajar con el laboratorio o con tu software de diseño.",
      },
      {
        q: "¿Qué computadora necesito?",
        a: "Una PC con Windows 10 de 64 bits, procesador Intel Core i5 de 11.ª generación o superior, 16 GB de RAM, SSD de 512 GB y una placa NVIDIA RTX 3060 o 4060 de 6 GB. Mirá la tabla completa de requisitos más arriba.",
      },
      {
        q: "¿Funciona con Mac?",
        a: "No. Los equipos Apple no son compatibles con el INO100+.",
      },
    ],
  },
  cta: {
    title: "¿Querés conocer el INO100+?",
    text: "Escribinos y un asesor de Dental Medrano te cuenta cómo incorporarlo a tu consultorio.",
    catalogLabel: "Descargar catálogo",
  },
  footer: {
    brandNote: "",
    locations: [
      { name: "Professional Center", address: "Marcelo T. de Alvear 2063", phone: "11 6436-2400", hours: "", mapUrl: "" },
      { name: "Dental Medrano Directo", address: "Marcelo T. de Alvear 2159", phone: "11 6642-2000", hours: "", mapUrl: "" },
    ],
  },
};

// Mezcla el contenido guardado sobre el de fábrica: objetos se combinan, listas se reemplazan.
export function mergeContent<T>(base: T, over: any): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base) || typeof base !== "object" || base === null) return over as T;
  const out: any = { ...(base as any) };
  for (const k of Object.keys(over)) {
    out[k] = k in (base as any) ? mergeContent((base as any)[k], over[k]) : over[k];
  }
  return out;
}
