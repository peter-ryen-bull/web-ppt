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
        title="Hvem lytter?"
        subtitle="Kystverket tar ansvar for sjøveien"
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
            Verdens sikreste og reneste kyst
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
            Det er hele hvorfor-et. Alt annet er hvordan.
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
          Ett oppdrag, to halvdeler
        </div>
      </Box>
      {halvdel(
        1,
        66,
        "Trygg og effektiv ferdsel",
        [
          "Fyr, lykter og sjømerker langs hele kysten",
          "Lostjenesten: kjentmann om bord på de store skipene",
          "Sjøtrafikksentraler som ser trafikken døgnet rundt",
        ],
        "var(--teal)",
      )}
      {halvdel(
        2,
        670,
        "Beredskap mot akutt forurensning",
        [
          "Depoter med lenser og utstyr langs kysten",
          "Nødhavner som er vurdert på forhånd",
          "Aksjonsledelse når det først går galt",
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
            Begge halvdelene starter med samme spørsmål: hvor er skipene akkurat nå?
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
          Lyttepostene
        </div>
      </Box>
      {tall(1, 80, "~90", "basestasjoner på fastlandet og Svalbard", "var(--teal)")}
      {tall(2, 460, "4", "egne satellitter over havområdene", "var(--teal)")}
      {tall(3, 840, "8,9 mrd", "AIS-meldinger i 2021. I 2006 var det 2 milliarder", "var(--red)")}
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
            Alt er lagret. Tilbake til 2006. Tjue år med hvert eneste skip som
            har sagt hvor det er.
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
          AIS: laget for å ikke kollidere
        </div>
      </Box>
      {item(
        1,
        [86.6, 265, 1050, 52.9],
        40,
        "Skip kringkaster identitet, posisjon, fart og kurs over VHF. Alle rundt hører det."
      )}
      {item(
        2,
        [86.6, 360, 1050, 88.5],
        76.5,
        "Fra et par sekunder til noen minutter mellom hver melding, avhengig av fart og status"
      )}
      {item(
        3,
        [86.6, 490, 1050, 88.5],
        76.5,
        "Ingen planla det, men i dag er AIS ryggraden i trafikkovervåking, beredskap og statistikk"
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
            Så du har 8,9 milliarder meldinger i året.
          </div>
          <div style={{ color: "var(--red)", marginTop: 20, ...linje2 }}>
            Hva gjør du med dem?
          </div>
        </div>
      </Box>
    </>
  );
}
