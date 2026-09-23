export function Pic({ src, alt, className = "", box = "min-h-48" }: { src: string; alt: string; className?: string; box?: string }) {
  if (!src)
    return (
      <div className={"grid w-full place-items-center rounded-lg border-2 border-dashed border-[#9db6c8] bg-white/60 p-6 text-center text-sm text-[#4b6377] " + box}>
        Espacio reservado para imagen
      </div>
    );
  return <img src={src} alt={alt} className={className} loading="lazy" />;
}
