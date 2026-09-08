import { Box, ChapterSlide, Img, Reveal, pt, useRevealStyle } from "../parts";
import { BaatSignal } from "@/components/figures/BaatSignal";

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
      <Box box={[48.4, 230, 1183.1, 260]}>
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
  ) => (
    <Reveal at={at}>
      <Box box={[x, 170, 540, 400]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(34),
            lineHeight: 1.15,
            color: farge,
          }}
        >
          {tittel}
        </div>
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gap: 16,
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
          "Lighthouses, lights and sea marks along the whole coast",
          "The pilot service: someone who knows the waters, on board the big ships",
          "Vessel traffic centers watching the traffic around the clock",
        ],
        "var(--teal)",
      )}
      {halvdel(
        2,
        670,
        "Emergency response to acute pollution",
        [
          "Depots with booms and equipment along the coast",
          "Emergency harbors assessed in advance",
          "Incident command when things do go wrong",
        ],
        "var(--red)",
      )}
      <Reveal at={3}>
        <Box
          box={[66, 600, 1150, 60]}
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
  ) => (
    <Reveal at={at}>
      <Box
        box={[x, 190, 360, 200]}
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
      {tall(1, 80, "~90", "base stations on the mainland and Svalbard", "var(--teal)")}
      {tall(2, 460, "4", "satellites of its own over the ocean areas", "var(--teal)")}
      {tall(3, 840, "8.9 bn", "AIS messages in 2021. In 2006 it was 2 billion", "var(--red)")}
      <Reveal at={4}>
        <Box
          box={[120, 440, 1040, 130]}
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
              lineHeight: 1.5,
              color: "var(--burgundy-2)",
              textAlign: "center",
            }}
          >
            It&apos;s all stored. Back to 2006. Twenty years of every single ship
            saying where it is.
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
      <Box box={[66.7, 130, 900, 73.8]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        >
          AIS: built to avoid collisions
        </div>
      </Box>
      {item(
        1,
        [86.6, 265, 1050, 52.9],
        40,
        "Ships broadcast identity, position, speed and course over VHF. Everyone nearby hears it."
      )}
      {item(
        2,
        [86.6, 360, 1050, 88.5],
        76.5,
        "From a couple of seconds to a few minutes between messages, depending on speed and status"
      )}
      {item(
        3,
        [86.6, 490, 1050, 88.5],
        76.5,
        "Nobody planned it, but today AIS is the backbone of traffic monitoring, emergency response and statistics"
      )}
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
    </>
  );
}
