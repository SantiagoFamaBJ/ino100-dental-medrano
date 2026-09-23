"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowDown, ArrowUp, ExternalLink, LogOut, Plus, RotateCcw, Save, Trash2, Upload } from "lucide-react";
import { supabase, BUCKET } from "@/lib/supabase";
import { defaultContent, mergeContent, type Content } from "@/lib/content";
import { SECTIONS, emptyItem, type Field } from "@/lib/schema";
import { parseVideo } from "@/lib/media";

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[0.95rem] text-slate-900 outline-none focus:border-[#083e67] focus:ring-2 focus:ring-[#6aaab4]/40";
const btnCls =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50";

/* ---------- Subida de archivos a Supabase Storage ---------- */

function safeName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function UploadButton({ accept, label, onDone, onError }: { accept: string; label: string; onDone: (url: string) => void; onError: (m: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !supabase) return;
    setBusy(true);
    const path = `${new Date().getFullYear()}/${Date.now()}-${safeName(file.name)}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
    if (error) {
      onError(
        /exceeded|too large|size/i.test(error.message)
          ? "El archivo pesa demasiado. Probá con uno más liviano o, para videos, pegá un link de YouTube."
          : `No se pudo subir el archivo: ${error.message}`
      );
    } else {
      onDone(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
    }
    setBusy(false);
  }
  return (
    <>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={pick} />
      <button type="button" className={btnCls} disabled={busy} onClick={() => ref.current?.click()}>
        <Upload size={16} /> {busy ? "Subiendo…" : label}
      </button>
    </>
  );
}

/* ---------- Editor de un campo ---------- */

function FieldEditor({ field, value, onChange, onError }: { field: Field; value: any; onChange: (v: any) => void; onError: (m: string) => void }) {
  const label = (
    <label className="mb-1.5 block text-sm font-semibold text-slate-800">
      {field.label}
    </label>
  );
  const hint = "hint" in field && field.hint ? <p className="mt-1.5 text-xs text-slate-500">{field.hint}</p> : null;

  switch (field.type) {
    case "text":
    case "url":
      return (
        <div>
          {label}
          <input className={inputCls} type={field.type === "url" ? "url" : "text"} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
          {hint}
        </div>
      );
    case "textarea":
      return (
        <div>
          {label}
          <textarea className={inputCls} rows={field.rows ?? 3} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
          {hint}
        </div>
      );
    case "select":
      return (
        <div>
          {label}
          <select className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {hint}
        </div>
      );
    case "image":
    case "video":
    case "file": {
      const accept = field.type === "image" ? "image/*" : field.type === "video" ? "video/*" : "application/pdf";
      const up = field.type === "image" ? "Subir imagen" : field.type === "video" ? "Subir video" : "Subir PDF";
      const vid = field.type === "video" ? parseVideo(value || "") : null;
      return (
        <div>
          {label}
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className={inputCls}
              value={value ?? ""}
              placeholder={field.type === "video" ? "Link de YouTube/Vimeo o archivo subido" : "Link o ruta del archivo"}
              onChange={(e) => onChange(e.target.value)}
            />
            <UploadButton accept={accept} label={up} onDone={onChange} onError={onError} />
          </div>
          {field.type === "image" && value ? (
            <img src={value} alt="" className="mt-3 max-h-36 rounded-lg border border-slate-200 bg-slate-100 p-1" />
          ) : null}
          {vid && vid.kind !== "none" ? (
            <p className="mt-2 text-xs text-slate-500">
              {vid.kind === "youtube" ? "Detectado: video de YouTube." : vid.kind === "vimeo" ? "Detectado: video de Vimeo." : "Detectado: archivo de video."}
            </p>
          ) : null}
          {field.type === "file" && value ? (
            <a href={value} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#083e67] underline">
              Ver archivo actual <ExternalLink size={12} />
            </a>
          ) : null}
          {hint}
        </div>
      );
    }
    case "strings": {
      const arr: string[] = Array.isArray(value) ? value : [];
      return (
        <div>
          {label}
          <div className="space-y-2">
            {arr.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input className={inputCls} value={s} onChange={(e) => onChange(arr.map((x, j) => (j === i ? e.target.value : x)))} />
                <button type="button" className={btnCls} aria-label="Eliminar" onClick={() => onChange(arr.filter((_, j) => j !== i))}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button type="button" className={btnCls + " mt-2"} onClick={() => onChange([...arr, ""])}>
            <Plus size={16} /> {field.addLabel ?? "Agregar"}
          </button>
          {hint}
        </div>
      );
    }
    case "videoGroups":
      return <VideoGroupsEditor label={field.label} hint={"hint" in field ? field.hint : undefined} value={value} onChange={onChange} onError={onError} />;
    case "list": {
      const arr: any[] = Array.isArray(value) ? value : [];
      const move = (i: number, d: number) => {
        const j = i + d;
        if (j < 0 || j >= arr.length) return;
        const c = [...arr];
        [c[i], c[j]] = [c[j], c[i]];
        onChange(c);
      };
      return (
        <div>
          {label}
          {hint}
          <div className="mt-2 space-y-3">
            {arr.map((it, i) => (
              <details key={i} className="rounded-xl border border-slate-200 bg-slate-50" open={arr.length <= 3}>
                <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-800">
                  <span className="truncate">
                    {field.itemName} {i + 1}
                    {it?.[field.titleKey] ? `: ${String(it[field.titleKey]).slice(0, 60)}` : ""}
                  </span>
                  <span className="flex shrink-0 gap-1" onClick={(e) => e.preventDefault()}>
                    <button type="button" className={btnCls + " !px-2 !py-1.5"} aria-label="Subir" onClick={() => move(i, -1)}>
                      <ArrowUp size={15} />
                    </button>
                    <button type="button" className={btnCls + " !px-2 !py-1.5"} aria-label="Bajar" onClick={() => move(i, 1)}>
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      className={btnCls + " !px-2 !py-1.5 !text-red-700"}
                      aria-label="Eliminar"
                      onClick={() => {
                        if (confirm(`¿Eliminar ${field.itemName.toLowerCase()} ${i + 1}?`)) onChange(arr.filter((_, j) => j !== i));
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </span>
                </summary>
                <div className="space-y-4 border-t border-slate-200 p-4">
                  <FieldsEditor fields={field.fields} value={it} onChange={(v) => onChange(arr.map((x, j) => (j === i ? v : x)))} onError={onError} />
                </div>
              </details>
            ))}
          </div>
          {(!field.max || arr.length < field.max) && (
            <button type="button" className={btnCls + " mt-3"} onClick={() => onChange([...arr, emptyItem(field.fields)])}>
              <Plus size={16} /> Agregar {field.itemName.toLowerCase()}
            </button>
          )}
        </div>
      );
    }
  }
}

function FieldsEditor({ fields, value, onChange, onError }: { fields: Field[]; value: any; onChange: (v: any) => void; onError: (m: string) => void }) {
  const v = value ?? {};
  return (
    <>
      {fields.map((f) => (
        <FieldEditor key={f.key} field={f} value={v[f.key]} onChange={(nv) => onChange({ ...v, [f.key]: nv })} onError={onError} />
      ))}
    </>
  );
}

/* ---------- Grupos de videos (con "mover a otro grupo") ---------- */

const videoFields: Field[] = [
  { key: "title", label: "Título del video", type: "text" },
  { key: "url", label: "Link de YouTube (o archivo subido)", type: "video" },
];

function VideoGroupsEditor({ label, hint, value, onChange, onError }: { label: string; hint?: string; value: any; onChange: (v: any) => void; onError: (m: string) => void }) {
  const groups: { name: string; items: { title: string; url: string }[] }[] = Array.isArray(value) ? value : [];
  const mini = btnCls + " !px-2 !py-1.5";

  const setGroup = (gi: number, g: any) => onChange(groups.map((x, i) => (i === gi ? g : x)));
  const swap = <T,>(arr: T[], i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= arr.length) return arr;
    const c = [...arr];
    [c[i], c[j]] = [c[j], c[i]];
    return c;
  };
  const moveVideo = (gi: number, vi: number, target: number) => {
    const item = groups[gi].items[vi];
    onChange(
      groups.map((g, i) =>
        i === gi ? { ...g, items: g.items.filter((_, j) => j !== vi) } : i === target ? { ...g, items: [...(g.items || []), item] } : g
      )
    );
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800">{label}</label>
      {hint && <p className="mb-2 text-xs text-slate-500">{hint}</p>}
      <div className="space-y-4">
        {groups.map((g, gi) => (
          <details key={gi} className="rounded-xl border border-slate-300 bg-slate-50" open={gi === 0}>
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-slate-900">
              <span className="truncate">
                Grupo {gi + 1}: {g.name || "sin nombre"} ({(g.items || []).length} {(g.items || []).length === 1 ? "video" : "videos"})
              </span>
              <span className="flex shrink-0 gap-1" onClick={(e) => e.preventDefault()}>
                <button type="button" className={mini} aria-label="Subir grupo" onClick={() => onChange(swap(groups, gi, -1))}>
                  <ArrowUp size={15} />
                </button>
                <button type="button" className={mini} aria-label="Bajar grupo" onClick={() => onChange(swap(groups, gi, 1))}>
                  <ArrowDown size={15} />
                </button>
                <button
                  type="button"
                  className={mini + " !text-red-700"}
                  aria-label="Eliminar grupo"
                  onClick={() => {
                    const n = (g.items || []).length;
                    if (confirm(n ? `¿Eliminar el grupo "${g.name}" y sus ${n} videos? Si querés conservarlos, movelos antes a otro grupo.` : `¿Eliminar el grupo "${g.name}"?`))
                      onChange(groups.filter((_, i) => i !== gi));
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </span>
            </summary>

            <div className="space-y-4 border-t border-slate-200 p-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-800">Nombre de la pestaña</label>
                <input className={inputCls} value={g.name ?? ""} onChange={(e) => setGroup(gi, { ...g, name: e.target.value })} />
              </div>

              {(g.items || []).map((it, vi) => (
                <details key={vi} className="rounded-lg border border-slate-200 bg-white" open={!it.url}>
                  <summary className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-sm font-semibold text-slate-800">
                    <span className="truncate">
                      {it.url ? "✓ " : ""}
                      {it.title || `Video ${vi + 1}`}
                    </span>
                    <span className="flex shrink-0 gap-1" onClick={(e) => e.preventDefault()}>
                      <button type="button" className={mini} aria-label="Subir video" onClick={() => setGroup(gi, { ...g, items: swap(g.items, vi, -1) })}>
                        <ArrowUp size={15} />
                      </button>
                      <button type="button" className={mini} aria-label="Bajar video" onClick={() => setGroup(gi, { ...g, items: swap(g.items, vi, 1) })}>
                        <ArrowDown size={15} />
                      </button>
                      <button
                        type="button"
                        className={mini + " !text-red-700"}
                        aria-label="Eliminar video"
                        onClick={() => {
                          if (confirm(`¿Eliminar "${it.title || "este video"}"?`)) setGroup(gi, { ...g, items: g.items.filter((_, j) => j !== vi) });
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </span>
                  </summary>
                  <div className="space-y-4 border-t border-slate-200 p-3">
                    <FieldsEditor fields={videoFields} value={it} onChange={(v) => setGroup(gi, { ...g, items: g.items.map((x, j) => (j === vi ? v : x)) })} onError={onError} />
                    {groups.length > 1 && (
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-800">Mover a otro grupo</label>
                        <select
                          className={inputCls}
                          value=""
                          onChange={(e) => {
                            if (e.target.value !== "") moveVideo(gi, vi, Number(e.target.value));
                          }}
                        >
                          <option value="">Elegí el grupo de destino…</option>
                          {groups.map((o, oi) => (oi === gi ? null : <option key={oi} value={oi}>{o.name || `Grupo ${oi + 1}`}</option>))}
                        </select>
                      </div>
                    )}
                  </div>
                </details>
              ))}

              <button type="button" className={btnCls} onClick={() => setGroup(gi, { ...g, items: [...(g.items || []), { title: "", url: "" }] })}>
                <Plus size={16} /> Agregar video a este grupo
              </button>
            </div>
          </details>
        ))}
      </div>
      <button type="button" className={btnCls + " mt-4"} onClick={() => onChange([...groups, { name: "", items: [] }])}>
        <Plus size={16} /> Agregar grupo
      </button>
    </div>
  );
}

/* ---------- App ---------- */

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [content, setContent] = useState<Content>(defaultContent);
  const [sectionId, setSectionId] = useState(SECTIONS[0].id);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data: ok } = await supabase.rpc("ino_is_admin");
    setAllowed(ok === true);
    const { data } = await supabase.from("ino_content").select("data").eq("id", "main").maybeSingle();
    setContent(mergeContent(defaultContent, data?.data ?? {}));
    setDirty(false);
  }, []);

  useEffect(() => {
    if (session) load();
    else setAllowed(null);
  }, [session, load]);

  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setLoggingIn(true);
    setLoginErr("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setLoginErr("El email o la contraseña no son correctos.");
    setLoggingIn(false);
  }

  async function save() {
    if (!supabase || !session) return;
    setSaving(true);
    setMsg(null);
    const { error } = await supabase.from("ino_content").upsert({ id: "main", data: content, updated_at: new Date().toISOString() });
    if (error) {
      setMsg({ type: "err", text: `No se pudo guardar: ${error.message}` });
    } else {
      setDirty(false);
      let live = true;
      try {
        const r = await fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } });
        live = r.ok;
      } catch {
        live = false;
      }
      setMsg({
        type: "ok",
        text: live ? "Guardado. El sitio ya muestra los cambios." : "Guardado. El sitio va a mostrar los cambios en menos de un minuto.",
      });
    }
    setSaving(false);
  }

  function setSection(id: string, v: any) {
    setContent((c) => ({ ...c, [id]: v }));
    setDirty(true);
    setMsg(null);
  }

  function resetSection(id: string) {
    if (!confirm("¿Restaurar esta sección a los textos e imágenes originales? Se pierden los cambios de esta sección hasta que guardes.")) return;
    setSection(id, (defaultContent as any)[id]);
  }

  const box = "mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";

  if (!ready) return <div className="grid min-h-screen place-items-center text-slate-500">Cargando…</div>;

  if (!supabase)
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 p-4">
        <div className={box}>
          <h1 className="text-xl font-bold text-slate-900">Falta conectar Supabase</h1>
          <p className="mt-3 text-sm text-slate-600">
            Agregá las variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY (en .env.local y en Vercel) y volvé a cargar.
          </p>
        </div>
      </div>
    );

  if (!session)
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 p-4">
        <form onSubmit={login} className={box}>
          <h1 className="text-xl font-bold text-slate-900">Administrar página INO100+</h1>
          <p className="mt-1 text-sm text-slate-600">Ingresá con tu usuario.</p>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">Email</label>
              <input className={inputCls} type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">Contraseña</label>
              <input className={inputCls} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {loginErr && <p className="text-sm font-medium text-red-700">{loginErr}</p>}
            <button type="submit" disabled={loggingIn} className="w-full rounded-lg bg-[#083e67] px-4 py-3 font-semibold text-white hover:bg-[#052b49] disabled:opacity-60">
              {loggingIn ? "Ingresando…" : "Ingresar"}
            </button>
          </div>
        </form>
      </div>
    );

  if (allowed === false)
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 p-4">
        <div className={box}>
          <h1 className="text-xl font-bold text-slate-900">Sin permiso para editar</h1>
          <p className="mt-3 text-sm text-slate-600">
            Este usuario ({session.user.email}) no está autorizado. Agregalo a la tabla ino_admins en Supabase.
          </p>
          <button className={btnCls + " mt-5"} onClick={() => supabase!.auth.signOut()}>
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </div>
    );

  const section = SECTIONS.find((s) => s.id === sectionId)!;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <h1 className="text-base font-bold">Administrar página INO100+</h1>
            <p className="text-xs text-slate-500">{session.user.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dirty && <span className="text-xs font-semibold text-amber-700">Cambios sin guardar</span>}
            <a href="/" target="_blank" rel="noopener" className={btnCls}>
              <ExternalLink size={16} /> Ver sitio
            </a>
            <button className={btnCls} onClick={() => supabase!.auth.signOut()}>
              <LogOut size={16} /> Salir
            </button>
            <button
              onClick={save}
              disabled={saving || !dirty}
              className="inline-flex items-center gap-2 rounded-lg bg-[#d4450c] px-4 py-2 text-sm font-bold text-white hover:bg-[#b93a08] disabled:opacity-50"
            >
              <Save size={16} /> {saving ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </div>
        {msg && (
          <div className={"px-4 py-2 text-center text-sm font-semibold " + (msg.type === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800")}>{msg.text}</div>
        )}
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Secciones" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSectionId(s.id)}
              className={
                "shrink-0 rounded-lg px-3 py-2.5 text-left text-sm font-semibold " +
                (s.id === sectionId ? "bg-[#083e67] text-white" : "bg-white text-slate-700 hover:bg-slate-50")
              }
            >
              {s.label}
            </button>
          ))}
        </nav>

        <main className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">{section.label}</h2>
              {section.help && <p className="mt-1 text-sm text-slate-500">{section.help}</p>}
            </div>
            <button className={btnCls} onClick={() => resetSection(section.id)}>
              <RotateCcw size={15} /> Restaurar original
            </button>
          </div>
          <div className="space-y-5">
            <FieldsEditor
              key={section.id}
              fields={section.fields}
              value={(content as any)[section.id]}
              onChange={(v) => setSection(section.id, v)}
              onError={(t) => setMsg({ type: "err", text: t })}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
