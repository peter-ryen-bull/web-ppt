import { Box, BulletList, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";
import { BaatSignal } from "@/components/figures/BaatSignal";
import {
  AisKjede,
  Bolgestripe,
  Fyr,
  Lyttepost,
  Skipsradar,
  StrekIkon,
  type IkonNavn,
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
      <ChapterSlide title="Who's listening?" showLogo={false} />
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

/* Om NCA: fire virksomhetsområder */
const NCA_OMRADER: {
  ikon: IkonNavn;
  tittel: string;
  tekst: string;
}[] = [
  {
    ikon: "person",
    tittel: "Pilotage",
    tekst: "A local expert boards the ship and brings it in.",
  },
  {
    ikon: "varsel",
    tittel: "Environment",
    tekst: "National response when oil starts leaking.",
  },
  {
    ikon: "antenne",
    tittel: "Navigation technology",
    tekst: "Lights, vessel traffic centers, and AIS.",
  },
  {
    ikon: "kart",
    tittel: "Transport, ports and fairways",
    tekst: "The physical sea route. Harbors and channels.",
  },
];

export function SlideOppdrag() {
  const omradene = useRevealStyle(1);

  return (
    <>
      <Img
        box={[940, 48, 260, 67]}
        src={`${MEDIA}/kystverket-logo.svg`}
        alt="Norwegian Coastal Administration"
      />
      <Box box={[66, 48, 820, 120]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          About us
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(20),
            color: "var(--red)",
          }}
        >
          The Norwegian Coastal Administration
        </div>
      </Box>
      <Box
        box={[66, 200, 1148, 360]}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 72,
          rowGap: 48,
          ...omradene,
        }}
      >
        {NCA_OMRADER.map((o) => (
          <div
            key={o.tittel}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <StrekIkon
              navn={o.ikon}
              size={34}
              color="var(--teal)"
              strokeWidth={1.6}
            />
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(24),
                lineHeight: 1.2,
                color: "var(--burgundy)",
              }}
            >
              {o.tittel}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--burgundy-2)",
              }}
            >
              {o.tekst}
            </div>
          </div>
        ))}
      </Box>
      <Reveal at={2}>
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
            All four start with the same question: where are the ships right
            now?
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
            Data stored back to 2005
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Hva er AIS, egentlig? */
export function SlideAis() {
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
      <Box box={[800, 380, 420, 170]}>
        <Skipsradar />
      </Box>
      <BulletList
        box={[72.4, 220, 700, 360]}
        fromStep={1}
        gap={36}
        items={[
          "Identity, position, speed, course",
          "Every few seconds, or a few minutes",
          "Built for collisions. Became the backbone.",
        ]}
      />
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
            How do you process them all?
          </div>
        </div>
      </Box>
      <Box box={[0, 600, 1280, 100]}>
        <Bolgestripe />
      </Box>
    </>
  );
}
