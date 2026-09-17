import Image from "next/image";

/**
 * Ikon på forsiden basert på et bildeutsnitt, f.eks. en figur klippet ut av
 * et eksportert slidebilde. Bildet bør være kvadratisk med gjennomsiktig
 * bakgrunn (PNG), rundt 320 px.
 */
export function BildeIkon({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={84}
      height={84}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}
