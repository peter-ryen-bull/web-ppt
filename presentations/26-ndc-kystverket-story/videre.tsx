import { Box, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";
import { HvorViEr } from "@/components/figures/Domenekataloger";
import { HelePlattformen } from "@/components/figures/DomenerOgProdukter";
import { BaatSignal } from "@/components/figures/BaatSignal";
import {
  Fyr,
  Kompass,
  StrekIkon,
  TreKataloger,
  type IkonNavn,
} from "@/components/figures/strek";

const MEDIA = "/media/26-ndc-kystverket";

/* Avslutning: tilbake til skipet utenfor Stad */
export function SlideTilbakeTilStad() {
  const linje2 = useRevealStyle(1);
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
          It's 03:14.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            lineHeight: 1.2,
            color: "var(--red)",
            ...linje2,
          }}
        >
          A year from now, it's in a municipality's climate accounts.
        </div>
      </Box>
      <Reveal at={2}>
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
    ["The live map", "nais.kystverket.no"],
    ["Historical data on demand", "hais.kystverket.no"],
    ["Raw AIS stream over TCP", "153.44.253.27:5631"],
    ["Live API for developers", "developer.barentswatch.no"],
    ["The whole emissions model", "github.com/Kystverket/maru"],
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
          Thanks.
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
          All of this is open. Try it yourself during the break.
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
      {/* Fyret fra åpningen, nederst til venstre under lenkene */}
      <Box box={[60, 530, 380, 181]}>
        <Fyr />
      </Box>
    </>
  );
}

/* Slide 26 – Kapittel: Veien videre */
export function SlideVeienVidere() {
  return (
    <>
      <Box box={[430, 60, 420, 150]}>
        <Kompass />
      </Box>
      <ChapterSlide
        title="The road ahead for the data platform"
        titleSize={54}
        showLogo={false}
      />
    </>
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

/* Slide 26c – Hvorfor arkitekturen må skalere: flere domener enn AIS */
export function SlideFlereDomener() {
  const domener: [string, string, IkonNavn][] = [
    ["customs", "declarations and cargo", "skjema"],
    ["internal_hr_finance", "payroll and the ledger", "mynt"],
    ["lighthouse_predictive_maintenance", "sensors on the lights", "verktoy"],
    ["and many more", "whatever Kystverket already collects", "deling"],
  ];
  const punchline = useRevealStyle(domener.length + 1);
  return (
    <>
      <Box box={[53.7, 160, 540, 280]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(38),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          Not just AIS
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            lineHeight: 1.4,
            color: "var(--red)",
            ...punchline,
          }}
        >
          So we need an architecture that scales. Shared data stays high
          quality. And findable.
        </div>
      </Box>
      {domener.map(([navn, sub, ikon], i) => (
        <Reveal key={navn} at={i + 1}>
          <Box box={[600, 168 + i * 112, 620, 100]}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <div style={{ marginTop: 4 }}>
                <StrekIkon navn={ikon} size={34} color="var(--teal)" strokeWidth={1.6} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily:
                      i === domener.length - 1
                        ? "var(--font-serif)"
                        : "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: pt(18),
                    lineHeight: 1.25,
                    color: "var(--burgundy-2)",
                  }}
                >
                  {navn}
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
              </div>
            </div>
            {i < domener.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 94,
                  width: 620,
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

/* Hvor vi skal, zoomet ut – ett bilde, ett klikk per del */
export function SlideHvorViSkalHelhet() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <HelePlattformen />
    </Box>
  );
}

/* Slide 26d – Det domenene gir oss: tydelig eierskap, kostnad og forvaltning */
export function SlideDomeneEffekt() {
  const punkter = [
    ["Clear ownership", "the domain owns its data — and the contract"],
    ["Clear cost center", "each catalog has its own bill"],
    ["Clear stewardship", "who answers when something breaks"],
  ];
  const linje2 = useRevealStyle(punkter.length + 1);
  return (
    <>
      <Box box={[53.7, 180, 540, 160]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(38),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          One domain, one catalog
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
            and you still find the data products in one place
        </div>
      </Box>
      <Reveal at={1}>
        <Box box={[40, 480, 540, 180]}>
          <TreKataloger />
        </Box>
      </Reveal>
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
  const facts: [string, IkonNavn][] = [
    ["More of Kystverket's own data in the data platform", "kart"],
    ["Customs analysis", "soyler"],
    ["Predictive maintenance on lighthouses", "verktoy"],
    ["Faster and better organization", "person"],
  ];
  return (
    <>
      <Box box={[53.7, 240, 540, 180]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(38),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          What we want to achieve
        </div>
      </Box>
      {facts.map(([f, ikon], i) => (
        <Reveal key={f} at={i + 1}>
          <Box box={[600, 210 + i * 96, 620, 86]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: "var(--font-serif)",
                fontSize: pt(20),
                lineHeight: 1.25,
                color: "var(--burgundy-2)",
              }}
            >
              <StrekIkon navn={ikon} size={34} color="var(--teal)" strokeWidth={1.6} />
              <span>{f}</span>
            </div>
            {i < facts.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 80,
                  width: 620,
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