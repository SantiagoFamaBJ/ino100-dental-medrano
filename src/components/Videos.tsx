"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { parseVideo } from "@/lib/media";

// Video individual. Los de YouTube cargan recién al tocar (más liviano en el celular).
export function VideoCard({ title, url, autoplay = false }: { title: string; url: string; autoplay?: boolean }) {
  const p = parseVideo(url);
  const [play, setPlay] = useState(autoplay);
  if (p.kind === "none") return null;
  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-xl bg-ink">
        {p.kind === "youtube" && !play ? (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Reproducir: ${title}`} className="group absolute inset-0 h-full w-full">
            <img src={`https://i.ytimg.com/vi/${p.id}/hqdefault.jpg`} alt="" className="h-full w-full object-cover" loading="lazy" />
            <span className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/10" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lg">
              <Play size={26} fill="currentColor" className="ml-1" />
            </span>
          </button>
        ) : p.kind === "file" ? (
          <video src={p.src} controls preload="metadata" className="h-full w-full" title={title} />
        ) : (
          <iframe
            src={p.kind === "youtube" ? `${p.src}&autoplay=1` : p.src}
            title={title || "Video del INO100+"}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        )}
      </div>
      {title && <figcaption className="mt-3 font-display font-semibold leading-snug text-navy">{title}</figcaption>}
    </figure>
  );
}

// Galería: una pestaña por grupo, el video elegido en tamaño grande y la lista del grupo al costado.
// Solo se muestran los grupos y videos con link cargado.
export function VideoGallery({ groups }: { groups: { name: string; items: { title: string; url: string }[] }[] }) {
  const [g, setG] = useState(0);
  const [v, setV] = useState(0);
  const [auto, setAuto] = useState(false);
  const group = groups[Math.min(g, groups.length - 1)];
  if (!group) return null;
  const cur = group.items[Math.min(v, group.items.length - 1)];

  return (
    <div>
      {groups.length > 1 && (
        <div className="-mx-5 mt-8 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Grupos de videos">
          <div className="inline-flex gap-2">
            {groups.map((gr, idx) => (
              <button
                key={idx}
                type="button"
                aria-pressed={idx === g}
                onClick={() => {
                  setG(idx);
                  setV(0);
                  setAuto(false);
                }}
                className={
                  "whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-sm font-semibold transition-colors " +
                  (idx === g ? "border-navy bg-navy text-white" : "border-navy/30 bg-white text-navy hover:border-navy")
                }
              >
                {gr.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-8">
        <div>
          <VideoCard key={`${g}-${v}-${cur.url}`} title={cur.title} url={cur.url} autoplay={auto} />
        </div>

        {group.items.length > 1 && (
          <ul className="space-y-2.5" aria-label="Videos del grupo">
            {group.items.map((it, k) => {
              const p = parseVideo(it.url);
              const on = k === Math.min(v, group.items.length - 1);
              return (
                <li key={k}>
                  <button
                    type="button"
                    aria-current={on ? "true" : undefined}
                    onClick={() => {
                      setV(k);
                      setAuto(true);
                    }}
                    className={
                      "flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors " +
                      (on ? "bg-navy text-white" : "bg-mist text-navy hover:bg-tile")
                    }
                  >
                    <span className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-lg bg-ink sm:w-32">
                      {p.kind === "youtube" && (
                        <img src={`https://i.ytimg.com/vi/${p.id}/mqdefault.jpg`} alt="" className="h-full w-full object-cover" loading="lazy" />
                      )}
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-navy">
                          <Play size={14} fill="currentColor" className="ml-0.5" />
                        </span>
                      </span>
                    </span>
                    <span className="font-display text-[0.92rem] font-semibold leading-snug">{it.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
