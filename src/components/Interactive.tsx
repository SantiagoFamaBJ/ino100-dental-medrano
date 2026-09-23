"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Content } from "@/lib/content";
import { waLink } from "@/lib/media";
import { WhatsAppIcon } from "@/lib/icons";
import { Pic } from "./Pic";

/* ---------- Header ---------- */

const NAV = [
  { href: "#puntas", label: "Puntas" },
  { href: "#software", label: "Software" },
  { href: "#videos", label: "Videos" },
  { href: "#especificaciones", label: "Especificaciones" },
  { href: "#requisitos", label: "Requisitos de PC" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Header({ site, hasVideos = false, videosHref = "#videos" }: { site: Content["site"]; hasVideos?: boolean; videosHref?: string }) {
  const [open, setOpen] = useState(false);
  const wa = site.whatsapp[0];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="wrap flex h-[72px] items-center justify-between gap-3 sm:gap-6">
        <a href="#top" aria-label="Dental Medrano, inicio" className="shrink-0">
          <img src="/img/logo-dental-medrano.webp" alt="Dental Medrano" className="h-9 w-auto sm:h-11" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {NAV.filter((n) => hasVideos || n.href !== "#videos").map((n0) => {
            const n = n0.href === "#videos" ? { ...n0, href: videosHref } : n0;
            return (
            <a key={n.href} href={n.href} className="font-display text-[0.9rem] font-semibold text-navy hover:text-cta">
              {n.label}
            </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {wa && (
            <a href={waLink(wa.number, wa.message)} target="_blank" rel="noopener" className="btn btn-wa !min-h-11 !gap-1.5 !px-3.5 !text-[0.85rem] sm:!gap-2 sm:!px-5 sm:!text-[0.95rem]">
              <WhatsAppIcon size={18} /> Consultar
            </a>
          )}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Menú móvil" className="border-t border-line bg-white lg:hidden">
          <div className="wrap flex flex-col py-2">
            {NAV.filter((n) => hasVideos || n.href !== "#videos").map((n0) => {
            const n = n0.href === "#videos" ? { ...n0, href: videosHref } : n0;
            return (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 font-display text-base font-semibold text-navy"
              >
                {n.label}
              </a>
            );
            })}
            {wa && (
              <a href={waLink(wa.number, wa.message)} target="_blank" rel="noopener" className="btn btn-wa my-4">
                <WhatsAppIcon size={18} /> Consultar por WhatsApp
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}

/* ---------- Selector de puntas ---------- */

export function TipsPicker({ tips }: { tips: Content["tips"] }) {
  const [i, setI] = useState(0);
  const cur = tips.items[i];
  if (!cur) return null;
  return (
    <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[7fr_5fr]">
      <div className="grid grid-cols-3 gap-3 sm:gap-4" role="group" aria-label="Elegí una punta">
        {tips.items.map((t, idx) => {
          const on = idx === i;
          return (
            <button
              key={idx}
              type="button"
              aria-pressed={on}
              onClick={() => setI(idx)}
              className={
                "flex flex-col items-center rounded-xl px-2 pb-4 pt-6 text-center transition-colors sm:px-4 " +
                (on ? "bg-navy text-white" : "bg-tile text-navy hover:bg-[#cddde9]")
              }
            >
              <span className="flex h-[210px] items-end">
                <Pic src={t.image} alt="" box="min-h-40 w-24" className="max-h-[200px] w-auto" />
              </span>
              <span className="mt-5 font-display text-[0.95rem] font-bold leading-tight">{t.name}</span>
              <span className={"mt-1 font-cond text-lg " + (on ? "text-white/80" : "text-muted")}>{t.size}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-line bg-white p-6 sm:p-8" aria-live="polite">
        <h3 className="text-2xl">{cur.name}</h3>
        <p className="mt-1 font-cond text-xl text-muted">{cur.size}</p>
        <p className="mt-5">{cur.text}</p>
        {cur.use && (
          <p className="mt-5 border-t border-line pt-5">
            <span className="font-display font-semibold text-navy">Ideal para: </span>
            {cur.use}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- Comparador IA off / on ---------- */

export function AiCompare({ ai }: { ai: Content["ai"] }) {
  const [on, setOn] = useState(true);
  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-line bg-[#f4f8fd]">
        <img src={ai.offImage} alt="Escaneo con la IA desactivada: el modelo incluye labios y encía sobrante" className="block w-full" loading="lazy" />
        <img
          src={ai.onImage}
          alt="Escaneo con la IA activada: el modelo queda limpio, sin labios ni lengua"
          className={"absolute inset-0 block h-full w-full object-cover transition-opacity duration-500 " + (on ? "opacity-100" : "opacity-0")}
          loading="lazy"
        />
        <span
          className={
            "absolute bottom-3 left-3 rounded-full px-3.5 py-1.5 font-display text-sm font-semibold text-white " +
            (on ? "bg-navy" : "bg-muted")
          }
        >
          {on ? ai.onLabel : ai.offLabel}
        </span>
      </div>

      <div className="mt-4 inline-flex rounded-full border border-line bg-white p-1" role="group" aria-label="Comparar escaneo">
        {[
          { v: false, l: ai.offLabel },
          { v: true, l: ai.onLabel },
        ].map((o) => (
          <button
            key={String(o.v)}
            type="button"
            aria-pressed={on === o.v}
            onClick={() => setOn(o.v)}
            className={
              "rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-colors " +
              (on === o.v ? "bg-navy text-white" : "text-navy hover:bg-mist")
            }
          >
            {o.l}
          </button>
        ))}
      </div>
    </div>
  );
}
