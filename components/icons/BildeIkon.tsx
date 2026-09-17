/**
 * Ikon på forsiden – utsnitt av et slidebilde, eller et firmalogo
 * (SVG/PNG) for pitch. Bildet bør ha gjennomsiktig bakgrunn.
 */
export function BildeIkon({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={84}
      height={84}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}
