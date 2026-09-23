import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "./globals.css";
import { getContent } from "@/lib/getContent";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const base = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
  return {
    metadataBase: new URL(base),
    title: c.site.seoTitle,
    description: c.site.seoDescription,
    openGraph: {
      title: c.site.seoTitle,
      description: c.site.seoDescription,
      images: c.site.ogImage ? [{ url: c.site.ogImage, width: 1200, height: 630, alt: "Escáner intraoral INO100+ | Dental Medrano" }] : undefined,
      type: "website",
      locale: "es_AR",
    },
    twitter: {
      card: "summary_large_image",
      title: c.site.seoTitle,
      description: c.site.seoDescription,
      images: c.site.ogImage ? [c.site.ogImage] : undefined,
    },
  };
}

export const viewport: Viewport = { themeColor: "#083e67", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
