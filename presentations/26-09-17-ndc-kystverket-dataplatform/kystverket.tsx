import {
  Box,
  BulletList,
  ChapterSlide,
  Img,
  Reveal,
  pt,
  useRevealStyle,
} from "../parts";
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

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";

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
    tekst: "The physical coastline. Harbors and channels.",
  },
];

function OmradeKort({
  at,
  ikon,
  tittel,
  tekst,
}: {
  at: number;
  ikon: IkonNavn;
  tittel: string;
  tekst: string;
}) {
  const reveal = useRevealStyle(at);
  return (
    <div
      style={{
        background: "#fff",
        border: "1.5px solid var(--cream-dark)",
        borderRadius: 14,
        padding: "26px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxSizing: "border-box",
        height: "100%",
        ...reveal,
      }}
    >
      <StrekIkon navn={ikon} size={34} color="var(--teal)" strokeWidth={1.6} />
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(22),
          lineHeight: 1.2,
          color: "var(--burgundy)",
        }}
      >
        {tittel}
      </div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(16),
          lineHeight: 1.35,
          color: "var(--burgundy-2)",
        }}
      >
        {tekst}
      </div>
    </div>
  );
}

export function SlideOppdrag() {
  const spoersmaalIntro = useRevealStyle(5);
  const spoersmaal = useRevealStyle(6);

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
        box={[66, 188, 1148, 400]}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 20,
          rowGap: 20,
        }}
      >
        {NCA_OMRADER.map((o, i) => (
          <OmradeKort key={o.tittel} at={i + 1} {...o} />
        ))}
      </Box>
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
          <span style={spoersmaalIntro}>
            All four start with the same question:
          </span>
          <span style={spoersmaal}> where are the ships right now?</span>
        </div>
      </Box>
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
      {tall(3, 840, "100M", "messages a day", "var(--red)", "meldinger")}
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
      <Box box={[66.7, 48, 720, 80]}>
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
      <Box box={[850, 28, 390, 390]}>
        <Skipsradar />
      </Box>
      <BulletList
        box={[72.4, 160, 700, 280]}
        fromStep={1}
        gap={36}
        items={[
          "Identity, position, speed, course",
          "Every few seconds, or a few minutes",
          "Built for collisions. Became the backbone.",
        ]}
      />
      <Box box={[0, 470, 1280, 250]}>
        <AisKjede />
      </Box>
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
            So you&apos;ve got 100 million messages a day.
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
