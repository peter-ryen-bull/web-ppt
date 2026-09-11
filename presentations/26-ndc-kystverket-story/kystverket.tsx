import type { ReactNode } from "react";
import { Box, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";
import { BaatSignal } from "@/components/figures/BaatSignal";
import {
  AisKjede,
  Bolgestripe,
  Fyr,
  Lyttepost,
  Oljevern,
  Skipsradar,
  type LyttepostType,
} from "@/components/figures/strek";

const MEDIA = "/media/26-ndc-kystverket";

/* Kapittel: Kystverket – hvem lytter, og hvorfor */
export function SlideKystverket() {
  return (
    <>
      <Img
        box={[490, 112, 300, 77]}
        src={`${MEDIA}/kystverket-logo.svg`}
        alt="Kystverket"
      />
      <ChapterSlide
        title="Who's listening?"
        subtitle="Kystverket takes responsibility for the sea route"
        showLogo={false}
      />
      <Box box={[430, 550, 420, 170]}>
        <BaatSignal />
      </Box>
    </>
  );
}

/* Visjonen: det store hvorfor-et */
export function SlideVisjon() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[430, 30, 420, 200]}>
        <Fyr />
      </Box>
      <Box box={[48.4, 250, 1183.1, 260]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(54),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>
            The world&apos;s safest and cleanest coast
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: pt(22),
              color: "var(--red)",
              ...linje2,
            }}
          >
            That&apos;s the whole why. Everything else is how.
          </div>
        </div>
      </Box>
    </>
  );
}

/* Samfunnsoppdraget: to halvdeler */
export function SlideOppdrag() {
  const halvdel = (
    at: number,
    x: number,
    tittel: string,
    punkter: string[],
    farge: string,
    figur: ReactNode,
  ) => (
    <Reveal at={at}>
      <Box box={[x + 140, 462, 260, 124]}>{figur}</Box>
      <Box box={[x, 150, 540, 300]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
            lineHeight: 1.2,
            color: farge,
          }}
        >
          {tittel}
        </div>
        <div
          style={{
            marginTop: 22,
            display: "grid",
            gap: 14,
          }}
        >
          {punkter.map((p) => (
            <div
              key={p}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(19),
                lineHeight: 1.35,
                color: "var(--burgundy-2)",
                paddingLeft: 18,
                borderLeft: `3px solid ${farge}`,
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <Box box={[66, 70, 1100, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          One mission, two halves
        </div>
      </Box>
      {halvdel(
        1,
        66,
        "Safe and efficient passage",
        [
          "Lighthouses, lights and sea marks",
          "The pilot service",
          "Vessel traffic centers, around the clock",
        ],
        "var(--teal)",
        <Fyr />,
      )}
      {halvdel(
        2,
        670,
        "Emergency response to acute pollution",
        [
          "Depots with booms and equipment",
          "Emergency harbors, assessed in advance",
          "Incident command when it goes wrong",
        ],
        "var(--red)",
        <Oljevern />,
      )}
      <Reveal at={3}>
        <Box
          box={[66, 610, 1150, 60]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            Both halves start with the same question: where are the ships right now?
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Lyttepostene: basestasjoner, satellitter og veksten i meldinger */
export function SlideLyttepostene() {
  const tall = (
    at: number,
    x: number,
    verdi: string,
    label: string,
    farge: string,
    figur: LyttepostType,
  ) => (
    <Reveal at={at}>
      <Box box={[x + 100, 158, 160, 100]}>
        <Lyttepost type={figur} />
      </Box>
      <Box
        box={[x, 258, 360, 170]}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(64),
            color: farge,
          }}
        >
          {verdi}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            color: "var(--burgundy-2)",
            textAlign: "center",
            lineHeight: 1.35,
          }}
        >
          {label}
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <Box box={[66, 70, 1100, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          The listening posts
        </div>
      </Box>
      {tall(1, 80, "~90", "base stations", "var(--teal)", "base")}
      {tall(2, 460, "4", "satellites", "var(--teal)", "satellitt")}
      {tall(3, 840, "8.9 bn", "messages in 2021", "var(--red)", "meldinger")}
      <Reveal at={4}>
        <Box
          box={[120, 500, 1040, 80]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            Stored back to 2006
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Hva er AIS, egentlig? */
export function SlideAis() {
  const item = (
    at: number,
    box: [number, number, number, number],
    lineH: number,
    text: string
  ) => (
    <Reveal at={at}>
      <Box
        box={[72.4, box[1] - 1.7, 3, lineH]}
        style={{ background: "var(--red)" }}
      />
      <Box box={box}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(22),
            lineHeight: 1.3,
            color: "var(--burgundy-2)",
          }}
        >
          {text}
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <Box box={[66.7, 70, 720, 80]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            color: "var(--burgundy-2)",
          }}
        >
          AIS: built to avoid collisions
        </div>
      </Box>
      <Box box={[800, 200, 420, 150]}>
        <AisKjede />
      </Box>
      <Reveal at={3}>
        <Box box={[800, 380, 420, 170]}>
          <Skipsradar />
        </Box>
      </Reveal>
      {item(1, [86.6, 220, 680, 70], 54, "Identity, position, speed, course")}
      {item(2, [86.6, 330, 680, 70], 54, "Every few seconds, or a few minutes")}
      {item(3, [86.6, 440, 680, 70], 54, "Built for collisions. Became the backbone.")}
    </>
  );
}

/* Spørsmålet som åpner neste kapittel */
export function SlideSporsmalet() {
  const linje2 = useRevealStyle(1);
  return (
    <>
      <Box box={[48.4, 240, 1183.1, 260]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(50),
            lineHeight: 1.2,
            textAlign: "center",
          }}
        >
          <div style={{ color: "var(--burgundy)" }}>
            So you&apos;ve got 8.9 billion messages a year.
          </div>
          <div style={{ color: "var(--red)", marginTop: 20, ...linje2 }}>
            What do you do with them?
          </div>
        </div>
      </Box>
      <Box box={[0, 600, 1280, 100]}>
        <Bolgestripe />
      </Box>
    </>
  );
}
