import { Copy } from "@/components/Copy";
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

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";

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
        <Copy
          k="lines"
          i={0}
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(66),
            lineHeight: 1.1,
            color: "var(--burgundy)",
          }}
        />
        <Copy
          k="lines"
          i={1}
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        />
        <Copy
          k="lines"
          i={2}
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            ...linje3,
          }}
        />
        <Copy
          k="lines"
          i={3}
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(44),
            lineHeight: 1.15,
            color: "var(--red)",
            ...linje4,
          }}
        />
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
  const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";
  return (
    <>
      {/* Venstre: takk, én setning, og adressene som det man faktisk skal taste */}
      <Box box={[80, 88, 700, 100]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(72),
            lineHeight: 1,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Box box={[80, 196, 700, 40]}>
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            color: "var(--red)",
          }}
        />
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
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: "contents" }}>
            <Copy
              k="links"
              i={i}
              field="url"
              style={{
                fontFamily: mono,
                fontSize: pt(17),
                lineHeight: 1.3,
                color: "var(--teal)",
                whiteSpace: "nowrap",
              }}
            />
            <Copy
              k="links"
              i={i}
              field="label"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(15),
                lineHeight: 1.5,
                color: "var(--burgundy-2)",
                opacity: 0.7,
                whiteSpace: "nowrap",
              }}
            />
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
        <Copy
          k="contact"
          field="name"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
        <Copy
          k="contact"
          field="org"
          as="div"
          style={{
            marginTop: 4,
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            color: "var(--burgundy-2)",
            opacity: 0.7,
          }}
        />
        <img
          src={`${MEDIA}/peterbull-qr.svg`}
          alt="QR-kode til peterbull.no"
          style={{ width: 240, height: 240, marginTop: 24, display: "block" }}
        />
        <Copy
          k="contact"
          field="url"
          as="div"
          style={{
            marginTop: 16,
            fontFamily: mono,
            fontSize: pt(15),
            color: "var(--teal)",
          }}
        />
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
        title={<Copy k="title" />}
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
const DOMENE_IKONER: IkonNavn[] = ["skjema", "mynt", "verktoy", "deling"];

export function SlideFlereDomener() {
  const punchline = useRevealStyle(DOMENE_IKONER.length + 1);
  return (
    <>
      <Box box={[53.7, 160, 540, 280]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(38),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        />
        <Copy
          k="lead"
          as="div"
          style={{
            marginTop: 22,
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            lineHeight: 1.4,
            color: "var(--red)",
            ...punchline,
          }}
        />
      </Box>
      {DOMENE_IKONER.map((ikon, i) => (
        <Reveal key={ikon} at={i + 1}>
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
                <Copy
                  k="rows"
                  i={i}
                  field="label"
                  as="div"
                  style={{
                    fontFamily:
                      i === DOMENE_IKONER.length - 1
                        ? "var(--font-serif)"
                        : "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: pt(18),
                    lineHeight: 1.25,
                    color: "var(--burgundy-2)",
                  }}
                />
                <Copy
                  k="rows"
                  i={i}
                  field="tekst"
                  as="div"
                  style={{
                    marginTop: 6,
                    fontFamily: "var(--font-sans)",
                    fontSize: pt(15),
                    color: "var(--red)",
                  }}
                />
              </div>
            </div>
            {i < DOMENE_IKONER.length - 1 && (
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
const VIDERE_IKONER: IkonNavn[] = ["kart", "soyler", "verktoy", "person"];

export function SlideVidereListe() {
  return (
    <>
      <Box box={[53.7, 200, 540, 280]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(38),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        />
        <Copy
          k="subtitle"
          as="div"
          style={{
            marginTop: 28,
            fontFamily: "var(--font-serif)",
            fontSize: pt(22),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        />
      </Box>
      {VIDERE_IKONER.map((ikon, i) => (
        <Reveal key={ikon} at={i + 1}>
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
              <Copy k="items" i={i} />
            </div>
            {i < VIDERE_IKONER.length - 1 && (
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