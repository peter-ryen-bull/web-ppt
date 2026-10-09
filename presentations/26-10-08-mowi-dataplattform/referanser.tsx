import type { SlideDef } from "../types";

const MEDIA = "/media/26-10-08-mowi-dataplattform";

function ReferanseBilde({ n, alt }: { n: number; alt: string }) {
  const src = `${MEDIA}/miles-referanse-${String(n).padStart(2, "0")}.png`;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
        background: "var(--cream)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}

function s(n: number, id: string, name: string): SlideDef {
  function Slide() {
    return <ReferanseBilde n={n} alt={name} />;
  }
  Slide.displayName = `Referanse${String(n).padStart(2, "0")}`;
  return { id, name, component: Slide };
}

/** Én slide per side i Miles Referanser 2026. */
export const REFERANSER: SlideDef[] = [
  s(1, "ref-miles", "Miles"),
  s(2, "ref-hvor-er-vi", "Hvor er vi?"),
  s(3, "ref-tjenesteomrader", "Våre tjenesteområder"),
  s(4, "ref-anthropic", "Anthropic x Claude"),
  s(5, "ref-kunder", "Kunder"),
  s(6, "ref-metizoft", "Metizoft: Metizone IHM"),
  s(7, "ref-slb", "SLB: IDEX"),
  s(8, "ref-fiskeridirektoratet", "Fiskeridirektoratet: akvakultur"),
  s(9, "ref-havforskningsinstituttet", "Havforskningsinstituttet: Kystfiskeappen"),
  s(10, "ref-jet-seafood", "JET Seafood"),
  s(11, "ref-optoscale", "OptoScale"),
  s(12, "ref-scaleaq", "ScaleAQ"),
  s(13, "ref-fiizk", "FiiZK: Omnia"),
  s(14, "ref-skretting", "Skretting"),
  s(15, "ref-iteam", "Iteam: havbruk dataplattform"),
  s(16, "ref-fjordbank", "Fjordbank"),
  s(17, "ref-techouse", "Techouse"),
  s(18, "ref-western-bulk", "Western Bulk"),
  s(19, "ref-nordic-semiconductor", "Nordic Semiconductor"),
  s(20, "ref-sikt", "Sikt: KI-lab"),
  s(21, "ref-banenor", "Bane NOR: digital tvilling"),
  s(22, "ref-skatteetaten", "Skatteetaten"),
  s(23, "ref-takk", "Takk for oss"),
];
