import { Box, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";
import { HvorViEr, HvorViSkal } from "@/components/figures/Domenekataloger";
import { BaatSignal } from "@/components/figures/BaatSignal";

const MEDIA = "/media/26-ndc-kystverket";

/* Avslutning: tilbake til skipet utenfor Stad */
export function SlideTilbakeTilStad() {
  const linje2 = useRevealStyle(1);
  const linje3 = useRevealStyle(2);
  return (
    <>
      <Box
        box={[80, 130, 1120, 380]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 26,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
          }}
        >
          Klokka er 03:14.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        >
          Ti sekunder senere ligger meldingen i plattformen.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            lineHeight: 1.2,
            color: "var(--red)",
            ...linje3,
          }}
        >
          Om et år ligger den i klimaregnskapet til en kommune.
        </div>
      </Box>
      <Reveal at={3}>
        <Box box={[430, 520, 420, 170]}>
          <BaatSignal />
        </Box>
      </Reveal>
    </>
  );
}

/* Takk, og «prøv selv» til utviklerne i salen */
export function SlideTakk() {
  const lenker: [string, string][] = [
    ["Sanntidskartet", "nais.kystverket.no"],
    ["Historikk på bestilling", "hais.kystverket.no"],
    ["Rå AIS-strøm over TCP", "153.44.253.27:5631"],
    ["Live-API for utviklere", "developer.barentswatch.no"],
    ["Hele utslippsmodellen", "github.com/Kystverket/maru"],
  ];
  return (
    <>
      <Box box={[66, 80, 600, 120]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(64),
            color: "var(--burgundy)",
          }}
        >
          Takk.
        </div>
      </Box>
      <Box box={[66, 190, 600, 60]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            color: "var(--red)",
          }}
        >
          Alt dette er åpent. Prøv selv i pausen.
        </div>
      </Box>
      <Box box={[66, 270, 700, 360]}>
        {lenker.map(([hva, hvor]) => (
          <div
            key={hvor}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 30,
              padding: "12px 0",
              borderBottom: "1px solid var(--divider)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(16),
                color: "var(--burgundy-2)",
              }}
            >
              {hva}
            </span>
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: pt(15),
                color: "var(--teal)",
              }}
            >
              {hvor}
            </span>
          </div>
        ))}
      </Box>
      <Box box={[860, 100, 360, 100]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
            color: "var(--burgundy)",
          }}
        >
          Peter Bull
        </div>
        <div
          style={{
            marginTop: 6,
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            color: "var(--burgundy-2)",
          }}
        >
          Miles · peterbull.no
        </div>
      </Box>
      <Img
        box={[860, 240, 300, 77]}
        src={`${MEDIA}/kystverket-logo.svg`}
        alt="Kystverket"
      />
      <Img box={[860, 340, 95.4, 29.5]} src="/media/miles-logo.svg" alt="Miles" />
    </>
  );
}

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
            og dataproduktene finner du fortsatt på ett sted
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
    "Enda mer åpne data. Til dere.",
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