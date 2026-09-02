import { Box, ChapterSlide, Reveal, pt, useRevealStyle } from "../parts";
import { HvorViEr, HvorViSkal } from "@/components/figures/Domenekataloger";

/* Slide 26 – Kapittel: Veien videre */
export function SlideVeienVidere() {
  return (
    <ChapterSlide
      title="Veien videre for dataplattformen"
      titleSize={54}
      showLogo={false}
    />
  );
}

/* Slide 26b – Hvor vi er: én kilde gjennom bronze/silver/gold */
export function SlideHvorViEr() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <HvorViEr />
    </Box>
  );
}

/* Slide 26c – Hvor vi skal: domenekataloger + sentral dataprodukt-katalog */
export function SlideHvorViSkal() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <HvorViSkal />
    </Box>
  );
}

/* Slide 26d – Det domenene gir oss: tydelig eierskap, kostnad og forvaltning */
export function SlideDomeneEffekt() {
  const punkter = [
    ["Tydelig eierskap", "domenet eier sine data – og kontrakten"],
    ["Tydelig kostnadssenter", "hver katalog har sin egen regning"],
    ["Tydelig forvaltningsansvar", "hvem svarer når noe ryker"],
  ];
  const linje2 = useRevealStyle(punkter.length + 1);
  return (
    <>
      <Box box={[53.7, 240, 540, 200]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        >
          Ett domene, én katalog
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            lineHeight: 1.4,
            color: "var(--red)",
            ...linje2,
          }}
        >
          – og dataproduktene finner du fortsatt på ett sted
        </div>
      </Box>
      {punkter.map(([tittel, sub], i) => (
        <Reveal key={tittel} at={i + 1}>
          <Box box={[628.2, 220 + i * 100, 582, 90]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(28),
                color: "var(--burgundy-2)",
              }}
            >
              {tittel}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: "var(--font-sans)",
                fontSize: pt(15),
                color: "var(--red)",
              }}
            >
              {sub}
            </div>
            {i < punkter.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 84,
                  width: 582,
                  height: 1.5,
                  background: "var(--divider)",
                }}
              />
            )}
          </Box>
        </Reveal>
      ))}
    </>
  );
}

/* Slide 27 – Dette vil vi få til */
export function SlideVidereListe() {
  const facts = [
    "SafeSeaNet, los og geodata inn",
    "Dataprodukter med kontrakter",
    "Sanntidsvarsling for beredskap",
    "ML: ETA-prediksjon og avvik",
    "Enda mer åpne data – til dere",
  ];
  return (
    <>
      <Box box={[53.7, 278.8, 560, 162.4]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        >
          Dette vil vi få til
        </div>
      </Box>
      {facts.map((f, i) => (
        <Reveal key={f} at={i + 1}>
          <Box box={[628.2, 201.9 + i * 77.5, 582, 66.4]}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(28),
                color: "var(--burgundy-2)",
              }}
            >
              {f}
            </div>
            {i < facts.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 61,
                  width: 582,
                  height: 1.5,
                  background: "var(--divider)",
                }}
              />
            )}
          </Box>
        </Reveal>
      ))}
    </>
  );
}