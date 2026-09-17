import { Box, ChapterSlide, Reveal, pt, useRevealStyle } from "../parts";
import { HvorViEr } from "./figurer/Domenekataloger";
import { HelePlattformen } from "./figurer/DomenerOgProdukter";
import { BaatSignal } from "./figurer/BaatSignal";
import {
  Fyr,
  Kompass,
  StrekIkon,
  type IkonNavn,
} from "./figurer/strek";

const MEDIA = "/media/26-ndc-kystverket";

/* Avslutning: tilbake til skipet utenfor Stad */
export function SlideTilbakeTilStad() {
  const linje2 = useRevealStyle(1);
  const linje3 = useRevealStyle(2);
  const linje4 = useRevealStyle(3);
  return (
    <>
      <Box
        box={[80, 110, 1120, 400]}
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
          It&apos;s 03:14.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        >
          The sea off Stad. February. A gale from the northwest.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            ...linje3,
          }}
        >
          A cargo ship heading north at nine knots.
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--red)",
            ...linje4,
          }}
        >
          We are listening.
        </div>
      </Box>
      <Reveal at={3}>
        <Box box={[430, 530, 420, 170]}>
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
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <>
      {/* Venstre: takk, én setning, og adressene som det man faktisk skal taste */}
      <Box box={[80, 88, 700, 100]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(72),
            lineHeight: 1,
            color: "var(--burgundy)",
          }}
        >
          Thanks.
        </div>
      </Box>
      <Box box={[80, 196, 700, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            color: "var(--red)",
          }}
        >
          All of this is open. Try it yourself during the break.
        </div>
      </Box>
      <Box
        box={[80, 272, 720, 240]}
        style={{
          display: "grid",
          gridTemplateColumns: "370px 1fr",
          alignContent: "start",
          columnGap: 28,
          rowGap: 18,
        }}
      >
        {lenker.map(([hva, hvor]) => (
          <div key={hvor} style={{ display: "contents" }}>
            <span
              style={{
                fontFamily: mono,
                fontSize: pt(17),
                lineHeight: 1.3,
                color: "var(--teal)",
                whiteSpace: "nowrap",
              }}
            >
              {hvor}
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(15),
                lineHeight: 1.5,
                color: "var(--burgundy-2)",
                opacity: 0.7,
                whiteSpace: "nowrap",
              }}
            >
              {hva}
            </span>
          </div>
        ))}
      </Box>

      {/* Høyre: én kolonne – navn, QR, adresse. Sentrert rundt QR-en. */}
      <Box
        box={[900, 96, 300, 420]}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Peter Bull
        </div>
        <div
          style={{
            marginTop: 4,
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            color: "var(--burgundy-2)",
            opacity: 0.7,
          }}
        >
          Miles
        </div>
        <img
          src={`${MEDIA}/peterbull-qr.svg`}
          alt="QR code to peterbull.no"
          style={{ width: 240, height: 240, marginTop: 24, display: "block" }}
        />
        <div
          style={{
            marginTop: 16,
            fontFamily: mono,
            fontSize: pt(15),
            color: "var(--teal)",
          }}
        >
          peterbull.no
        </div>
      </Box>

      {/* Fyret fra åpningen, nederst til venstre */}
      <Box box={[60, 530, 380, 181]}>
        <Fyr />
      </Box>

      {/* Logoene små og dempet, på linje nederst til høyre */}
      <Box
        box={[900, 640, 300, 44]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 32,
          opacity: 0.85,
        }}
      >
        <img
          src={`${MEDIA}/kystverket-logo.svg`}
          alt="Kystverket"
          style={{ height: 36, display: "block" }}
        />
        <img
          src="/media/miles-logo.svg"
          alt="Miles"
          style={{ height: 18, display: "block" }}
        />
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
    ["and many more", "", "deling"],
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
                {sub ? (
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
                ) : null}
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
    <Box box={[0, 0, 1280, 720]}>
      <HelePlattformen />
    </Box>
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
      <Box box={[53.7, 200, 540, 280]}>
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
        <div
          style={{
            marginTop: 28,
            fontFamily: "var(--font-serif)",
            fontSize: pt(22),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        >
          The world&apos;s safest and cleanest coast
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