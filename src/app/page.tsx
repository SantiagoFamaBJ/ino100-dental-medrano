import { getContent } from "@/lib/getContent";
import { Header } from "@/components/Interactive";
import {
  Hero, Features, Comparison, Resources, Tips, Software, Setup, Videos, UsageVideo, Specs, PcRequirements, Faq, CtaBand, Footer, WhatsAppFloat, hasVideos,
} from "@/components/Sections";

// El contenido se refresca solo cada 60 segundos; al guardar en el admin se actualiza al instante.
export const revalidate = 60;

export default async function Page() {
  const c = await getContent();
  return (
    <>
      <Header site={c.site} hasVideos={hasVideos(c)} videosHref={c.videos.usageUrl ? "#instrucciones" : "#videos"} />
      <main>
        <Hero c={c} />
        <Features c={c} />
        <Comparison c={c} />
        <Tips c={c} />
        <Software c={c} />
        <Setup c={c} />
        <UsageVideo c={c} />
        <Videos c={c} />
        <Resources c={c} />
        <Specs c={c} />
        <PcRequirements c={c} />
        <Faq c={c} />
        <CtaBand c={c} />
      </main>
      <Footer c={c} />
      <WhatsAppFloat c={c} />
    </>
  );
}
