import type { Content } from "@/lib/content";
import { waLink } from "@/lib/media";
import { Icon, WhatsAppIcon } from "@/lib/icons";
import { AlertTriangle, Check, Plus, X } from "lucide-react";
import { TipsPicker, AiCompare } from "./Interactive";
import { Pic } from "./Pic";
import { VideoGallery, VideoCard } from "./Videos";

/* ---------- Hero ---------- */

export function Hero({ c }: { c: Content }) {
  const { hero, site } = c;
  const wa = site.whatsapp[0];
  return (
    <section id="top" className="bg-navy text-white">
      <div className="wrap grid items-center gap-8 pb-10 pt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-6 lg:pb-14 lg:pt-16">
        <div>
          <p className="flex items-center gap-4 font-display text-[0.95rem] font-semibold text-white/85">
            <img src="/img/logo-blz-blanco.png" alt="BLZ" className="h-7 w-auto" />
            <span className="border-l border-white/30 pl-4">{hero.kicker}</span>
          </p>
          <h1 className="mt-6 max-w-[15ch]">{hero.title}</h1>
          <p className="mt-6 max-w-[34rem] text-lg text-white/85">{hero.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {wa && (
              <a href={waLink(wa.number, wa.message)} target="_blank" rel="noopener" className="btn btn-wa">
                <WhatsAppIcon size={20} /> {hero.primaryCta}
              </a>
            )}
            <a href={site.catalogUrl} target="_blank" rel="noopener" className="btn btn-outline-light">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="rise">
          <Pic src={hero.image} alt="Escáner intraoral INO100+" box="min-h-72" className="mx-auto w-full max-w-[720px] drop-shadow-[0_30px_40px_rgba(2,20,40,.35)]" />
        </div>
      </div>

      <div className="border-t border-white/20">
        <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div key={i} className={"py-6 pr-4 lg:py-7 " + (i > 0 ? "lg:border-l lg:border-white/20 lg:pl-8" : "") + (i % 2 === 1 ? " border-l border-white/20 pl-5 lg:pl-8" : "")}>
              <dd className="font-cond text-[2.6rem] font-semibold leading-none sm:text-5xl">{s.value}</dd>
              <dt className="mt-1.5 text-[0.95rem] text-white/75">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------- Características ---------- */

export function Features({ c }: { c: Content }) {
  const f = c.features;
  return (
    <section id="caracteristicas" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="max-w-[16ch]">{f.title}</h2>
          {f.text && <p className="mt-5 max-w-[30rem] text-muted">{f.text}</p>}
        </div>
        <ul>
          {f.items.map((it, i) => (
            <li key={i} className={"flex gap-5 py-6 " + (i === 0 ? "border-t " : "") + "border-b border-line"}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mist text-navy">
                <Icon name={it.icon} size={22} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-lg">{it.title}</h3>
                <p className="mt-1 text-muted">{it.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Comparativa digital vs analógico ---------- */

export function Comparison({ c }: { c: Content }) {
  const k = c.comparison;
  return (
    <section id="comparativa" className="section bg-navy text-white">
      <div className="wrap">
        <h2 className="max-w-[26ch]">{k.title}</h2>
        {k.text && <p className="mt-5 max-w-[36rem] text-lg text-white/80">{k.text}</p>}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-14">
          <div className="rounded-2xl bg-white p-6 text-text sm:p-8">
            <div className="flex items-center gap-4 border-b border-line pb-5">
              <img src="/img/logo-blz-azul.png" alt="BLZ" className="h-8 w-auto" />
              <h3 className="text-navy">{k.digitalTitle}</h3>
            </div>
            <ul className="mt-5 space-y-4">
              {k.digital.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <Check size={20} strokeWidth={2.6} className="mt-1 shrink-0 text-wa" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/25 p-6 sm:p-8">
            <div className="border-b border-white/25 pb-5">
              <h3 className="flex min-h-8 items-center">{k.analogTitle}</h3>
            </div>
            <ul className="mt-5 space-y-4 text-white/90">
              {k.analog.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <X size={20} strokeWidth={2.6} className="mt-1 shrink-0 text-[#ff9b8a]" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Recursos ---------- */

function resolveHref(h: string, c: Content) {
  const t = (h || "").trim();
  if (t === "@catalog") return c.site.catalogUrl;
  if (t === "@pc") return c.site.pcPdfUrl;
  if (t === "@wa") {
    const w = c.site.whatsapp[0];
    return w ? waLink(w.number, w.message) : "";
  }
  return t;
}

export function Resources({ c }: { c: Content }) {
  const r = c.resources;
  const videos = hasVideos(c);
  const items = (r.items || [])
    .map((it) => ({ ...it, link: resolveHref(it.href, c) }))
    .filter((it) => it.link && (videos || !["#instrucciones", "#videos"].includes(it.href.trim())));
  if (items.length === 0) return null;
  return (
    <section id="recursos" className="section bg-mist">
      <div className="wrap">
        <h2 className="max-w-[24ch]">{r.title}</h2>
        {r.text && <p className="mt-5 max-w-[36rem] text-muted">{r.text}</p>}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const external = /^https?:|\.pdf$/i.test(it.link);
            return (
              <li key={i}>
                <a
                  href={it.link}
                  {...(external ? { target: "_blank", rel: "noopener" } : {})}
                  className="group flex h-full flex-col rounded-xl bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(8,62,103,.12)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-mist text-navy">
                    <Icon name={it.icon} size={22} strokeWidth={1.8} />
                  </span>
                  <span className="mt-5 font-display text-lg font-bold text-navy group-hover:text-cta">{it.title}</span>
                  <span className="mt-2 text-muted">{it.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Puntas ---------- */

export function Tips({ c }: { c: Content }) {
  return (
    <section id="puntas" className="section bg-mist">
      <div className="wrap">
        <h2 className="max-w-[22ch]">{c.tips.title}</h2>
        {c.tips.text && <p className="mt-5 max-w-[40rem] text-muted">{c.tips.text}</p>}
        <TipsPicker tips={c.tips} />
      </div>
    </section>
  );
}

/* ---------- IA + herramientas del software ---------- */

export function Software({ c }: { c: Content }) {
  const { ai, tools } = c;
  return (
    <>
      <section id="software" className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div>
            <h2 className="max-w-[18ch]">{ai.title}</h2>
            <p className="mt-5 max-w-[32rem] text-muted">{ai.text}</p>
          </div>
          <AiCompare ai={ai} />
        </div>
      </section>

      <section className="section bg-mist pt-16 lg:pt-20">
        <div className="wrap">
          <h2 className="max-w-[24ch]">{tools.title}</h2>
          <div className="mt-12 space-y-14 lg:space-y-20">
            {tools.items.map((t, i) => (
              <article key={i} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                <div className={"relative overflow-hidden rounded-xl bg-white " + (t.badge ? "flex justify-end pl-4 pt-6 sm:pl-6 " : "p-4 sm:p-6 ") + (i % 2 === 1 ? "md:order-2" : "")}>
                  <Pic src={t.image} alt={t.title} box="min-h-56" className={t.badge ? "block max-h-[420px] w-auto" : "mx-auto block w-full"} />
                  {t.badge && (
                    <span className="absolute left-4 top-4 grid h-24 w-24 place-items-center rounded-full bg-navy p-3 text-center font-display text-[0.82rem] font-semibold leading-tight text-white sm:left-6 sm:top-6 sm:h-28 sm:w-28">
                      {t.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl">{t.title}</h3>
                  <p className="mt-4 max-w-[30rem] text-muted">{t.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Conexión y formatos ---------- */

export function Setup({ c }: { c: Content }) {
  const s = c.setup;
  return (
    <section className="section">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <Pic src={s.image} alt="Escáner INO100+ conectado a una notebook con el software de escaneo" box="min-h-64" className="w-full mix-blend-multiply" />
        <div>
          <h2 className="max-w-[20ch]">{s.title}</h2>
          <p className="mt-5 text-muted">{s.text}</p>
          {s.formats.length > 0 && (
            <div className="mt-8">
              <p className="font-display text-sm font-semibold text-navy">{s.formatsLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.formats.map((f, i) => (
                  <li key={i} className="rounded-full border border-navy px-5 py-1.5 font-cond text-xl font-semibold text-navy">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Especificaciones ---------- */

function SpecTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <table className="w-full border-collapse text-left">
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-white/15">
            <th scope="row" className="w-[52%] py-3.5 pr-4 align-top font-normal text-white/70">
              {r.label}
            </th>
            <td className="py-3.5 align-top font-medium text-white">{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Specs({ c }: { c: Content }) {
  return (
    <section id="especificaciones" className="section bg-navy text-white">
      <div className="wrap">
        <h2>{c.specs.title}</h2>
        <div className="mt-10 grid gap-x-16 gap-y-2 border-t border-white/25 md:grid-cols-2">
          <SpecTable rows={c.specs.left} />
          <SpecTable rows={c.specs.right} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Requisitos de PC ---------- */

export function PcRequirements({ c }: { c: Content }) {
  const pc = c.pc;
  return (
    <section id="requisitos" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 className="max-w-[16ch]">{pc.title}</h2>
          <p className="mt-5 max-w-[30rem] text-muted">{pc.text}</p>
          {c.site.pcPdfUrl && (
            <a href={c.site.pcPdfUrl} target="_blank" rel="noopener" className="btn btn-outline mt-6">
              {pc.pdfLabel}
            </a>
          )}
          {pc.notes.length > 0 && (
            <ul className="mt-8 space-y-3 rounded-xl border border-line bg-mist p-5">
              {pc.notes.map((n, i) => (
                <li key={i} className="flex gap-3">
                  <AlertTriangle size={20} className="mt-1 shrink-0 text-cta" aria-hidden="true" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <table className="h-fit w-full border-collapse text-left">
          <tbody>
            {pc.rows.map((r, i) => (
              <tr key={i} className={"border-b border-line " + (i === 0 ? "border-t" : "")}>
                <th scope="row" className="w-[38%] py-4 pr-4 align-top font-display text-[0.95rem] font-semibold text-navy">
                  {r.label}
                </th>
                <td className="py-4 align-top">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- Videos ---------- */

export function hasVideos(c: Content) {
  return validGroups(c).length > 0 || !!c.videos.usageUrl;
}

function validGroups(c: Content) {
  return (c.videos.groups || [])
    .map((g) => ({ name: g.name, items: (g.items || []).filter((v) => v.url) }))
    .filter((g) => g.items.length > 0);
}

export function Videos({ c }: { c: Content }) {
  const v = c.videos;
  const groups = validGroups(c);
  if (groups.length === 0) return null;
  return (
    <section id="videos" className="section border-t border-line">
      <div className="wrap">
        <h2 className="max-w-[24ch]">{v.title}</h2>
        {v.text && <p className="mt-5 max-w-[40rem] text-muted">{v.text}</p>}
        <VideoGallery groups={groups} />
      </div>
    </section>
  );
}

export function UsageVideo({ c }: { c: Content }) {
  const v = c.videos;
  if (!v.usageUrl) return null;
  return (
    <section id="instrucciones" className="section bg-mist">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div>
          <h2 className="max-w-[16ch]">{v.usageTitle}</h2>
          {v.usageText && <p className="mt-5 max-w-[30rem] text-muted">{v.usageText}</p>}
        </div>
        <VideoCard title={v.usageTitle} url={v.usageUrl} />
      </div>
    </section>
  );
}

/* ---------- Preguntas frecuentes ---------- */

export function Faq({ c }: { c: Content }) {
  const f = c.faq;
  if (!f.items.length) return null;
  return (
    <section id="preguntas" className="section border-t border-line">
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <h2 className="max-w-[14ch]">{f.title}</h2>
        <div className="border-t border-line">
          {f.items.map((it, i) => (
            <details key={i} className="group border-b border-line py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-[1.02rem] font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {it.q}
                <Plus size={22} className="shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-[40rem] pb-5 text-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Llamado final ---------- */

export function CtaBand({ c }: { c: Content }) {
  const { cta, site } = c;
  return (
    <section id="contacto" className="bg-orange text-white">
      <div className="wrap section grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
        <div>
          <h2 className="max-w-[18ch] text-white">{cta.title}</h2>
          <p className="mt-4 max-w-[30rem] text-lg text-white">{cta.text}</p>
        </div>
        <div className="flex flex-col gap-3">
          {site.whatsapp.map((w, i) => (
            <a key={i} href={waLink(w.number, w.message)} target="_blank" rel="noopener" className="btn btn-white justify-between !rounded-2xl !px-5 !py-4 text-left">
              <span className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wa text-white">
                  <WhatsAppIcon size={24} />
                </span>
                <span>
                  <span className="block text-base">{w.label}</span>
                  <span className="block font-body text-sm font-medium text-muted">{w.display}</span>
                </span>
              </span>
              <span className="rounded-full bg-wa px-4 py-1.5 text-sm text-white">Escribir</span>
            </a>
          ))}
          <a href={site.catalogUrl} target="_blank" rel="noopener" className="btn btn-outline-light !rounded-2xl !py-4">
            {cta.catalogLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer({ c }: { c: Content }) {
  const { footer, site } = c;
  return (
    <footer className="border-t border-line bg-white">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[minmax(0,4fr)_minmax(0,5fr)_minmax(0,3fr)] md:items-center">
        <div className="flex w-fit flex-col items-center gap-7">
          <img src="/img/logo-dental-medrano.webp" alt="Dental Medrano" className="h-12 w-auto" />
          <img src="/img/logo-blz-azul.png" alt="BLZ" className="h-11 w-auto" />
          {footer.brandNote && <p className="max-w-[16rem] text-center text-sm text-muted">{footer.brandNote}</p>}
        </div>

        <ul className="space-y-6">
          {footer.locations.map((l, i) => {
            const wa = site.whatsapp.find((w) => w.label.trim().toLowerCase() === l.name.trim().toLowerCase());
            const map = l.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address + ", Buenos Aires, Argentina")}`;
            return (
              <li key={i}>
                <p className="font-display font-semibold text-navy">{l.name}</p>
                <p className="text-muted">
                  {l.address}
                  <br />
                  {l.phone}
                </p>
                {l.hours && <p className="mt-1 text-muted">{l.hours}</p>}
                <div className="mt-1.5 flex flex-wrap gap-x-6 font-display text-[0.9rem] font-semibold">
                  {wa && (
                    <a href={waLink(wa.number, wa.message)} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 py-2 text-wa hover:underline">
                      <WhatsAppIcon size={16} /> Escribir por WhatsApp
                    </a>
                  )}
                  <a href={map} target="_blank" rel="noopener" className="inline-block py-2 text-navy hover:underline">
                    Cómo llegar
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <ul className="font-display text-[0.95rem] font-semibold text-navy">
          <li><a className="inline-block py-2 hover:text-cta" href={site.shopUrl} target="_blank" rel="noopener">Ver en la tienda</a></li>
          <li><a className="inline-block py-2 hover:text-cta" href={site.retailUrl} target="_blank" rel="noopener">Acceso minorista</a></li>
          <li><a className="inline-block py-2 hover:text-cta" href={site.wholesaleUrl} target="_blank" rel="noopener">Acceso mayorista</a></li>
          <li><a className="inline-block py-2 hover:text-cta" href={site.catalogUrl} target="_blank" rel="noopener">Catálogo PDF</a></li>
        </ul>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-5 text-sm text-muted">© {new Date().getFullYear()} Dental Medrano. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ---------- Botón flotante de WhatsApp ---------- */

export function WhatsAppFloat({ c }: { c: Content }) {
  const wa = c.site.whatsapp[0];
  if (!wa) return null;
  return (
    <a
      href={waLink(wa.number, wa.message)}
      target="_blank"
      rel="noopener"
      aria-label={`Escribir por WhatsApp a ${wa.label}`}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_8px_24px_rgba(0,0,0,.28)] transition-transform hover:scale-105"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
