// Helpers para links de WhatsApp y videos.

export function waLink(number: string, message: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export type VideoInfo =
  | { kind: "youtube"; src: string; id: string }
  | { kind: "vimeo"; src: string }
  | { kind: "file"; src: string }
  | { kind: "none" };

export function parseVideo(url: string): VideoInfo {
  const u = (url || "").trim();
  if (!u) return { kind: "none" };
  const yt = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "youtube", id: yt[1], src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0` };
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "vimeo", src: `https://player.vimeo.com/video/${vm[1]}` };
  return { kind: "file", src: u };
}
