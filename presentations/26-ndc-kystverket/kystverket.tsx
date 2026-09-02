import { Box, ChapterSlide, Img, Reveal, pt } from "../parts";
import { BaatSignal } from "@/components/figures/BaatSignal";

const MEDIA = "/media/26-ndc-kystverket";

/* Slide 6 – Kapittel: Kystverket */
export function SlideKystverket() {
  return (
    <>
      <Img
        box={[490, 112, 300, 77]}
        src={`${MEDIA}/kystverket-logo.svg`}
        alt="Kystverket"
      />
      <ChapterSlide
        title="Kystverket"
        subtitle="– tar ansvar for sjøveien"
        showLogo={false}
      />
      <Box box={[430, 550, 420, 170]}>
        <BaatSignal />
      </Box>
    </>
  );
}

/* Slide 7 – Fakta om Kystverket (samme layout som "Stø har et enormt datagrunnlag") */
export function SlideKystverketFakta() {
  const facts = [
    "Fyr, merker og lostjeneste",
    "Sjøtrafikksentraler (VTS)",
    "Beredskap mot forurensning",
    "~90 basestasjoner + 4 satellitter",
    "AIS-data lagret siden 2006",
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
          Transportetaten for sjøveien
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
      <Box box={[53.9, 655.2, 640.5, 32.3]}>
        <a
          href="https://www.kystverket.no/om-kystverket/"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            color: "#9A5068",
          }}
        >
          https://www.kystverket.no/om-kystverket/
        </a>
      </Box>
    </>
  );
}

/* Slide 8 – Hva er AIS? */
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
      <Box box={[66.7, 130, 700, 73.8]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(48),
            color: "var(--burgundy-2)",
          }}
        >
          Hva er AIS?
        </div>
      </Box>
      {item(
        1,
        [86.6, 265, 1050, 52.9],
        40,
        "Skip kringkaster identitet, posisjon, fart og kurs over VHF"
      )}
      {item(
        2,
        [86.6, 360, 1050, 88.5],
        76.5,
        "Laget som antikollisjonssystem – i dag ryggraden i sjøtrafikkovervåking, beredskap og statistikk"
      )}
      {item(
        3,
        [86.6, 490, 1050, 52.9],
        40,
        "Fra 2 milliarder meldinger i 2006 til 8,9 milliarder i 2021"
      )}
    </>
  );
}
