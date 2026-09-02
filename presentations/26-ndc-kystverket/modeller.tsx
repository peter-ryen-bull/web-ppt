import type { ReactNode } from "react";
import { Box, ChapterSlide, Reveal, pt } from "../parts";

function BarItem({
  box,
  lineH,
  text,
  at,
  size = 22,
}: {
  box: [number, number, number, number];
  lineH: number;
  text: string;
  /** Klikk-steget der punktet dukker opp */
  at: number;
  size?: number;
}) {
  return (
    <Reveal at={at}>
      <Box
        box={[72.4, box[1] - 1.7, 3, lineH]}
        style={{ background: "var(--red)" }}
      />
      <Box box={box}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(size),
            lineHeight: 1.3,
            color: "var(--burgundy-2)",
          }}
        >
          {text}
        </div>
      </Box>
    </Reveal>
  );
}

function SlideTitle({ children }: { children: ReactNode }) {
  return (
    <Box box={[66.7, 120, 900, 73.8]}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(44),
          color: "var(--burgundy-2)",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

function SourceLink({ href, top = 662 }: { href: string; top?: number }) {
  return (
    <Box box={[72.4, top, 900, 32.3]}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: pt(13),
          color: "#9A5068",
        }}
      >
        {href}
      </a>
    </Box>
  );
}

/* Kapittel: Modellene oppå strømmen */
export function SlideModeller() {
  return (
    <ChapterSlide
      title="Fra posisjoner til utslipp"
      subtitle="MarTraf og MarU – modellene som gjør AIS-punkter til kunnskap"
      titleSize={54}
      showLogo={false}
    />
  );
}

/* Modulflyt: AIS → MarTraf → MarU → statistikk */
export function SlideModellFlyt() {
  const step = (at: number, x: number, title: string, sub: string) => (
    <Reveal at={at}>
      <Box
        box={[x, 300, 260, 150]}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 16,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(20),
            color: "var(--cream)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            lineHeight: 1.3,
            color: "var(--mint)",
          }}
        >
          {sub}
        </div>
      </Box>
    </Reveal>
  );

  const arrow = (at: number, x: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 345, 40, 60]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(30),
            color: "var(--red)",
          }}
        >
          →
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <SlideTitle>Fire moduler, ikke én modell</SlideTitle>
      {step(1, 40, "AIS-rådata", "statiske og dynamiske meldinger")}
      {arrow(2, 300)}
      {step(2, 340, "MarTraf", "trafikkmodellen – vasker og beriker")}
      {arrow(3, 600)}
      {step(3, 640, "MarU", "utslippsmodellen – energi og utslipp")}
      {arrow(4, 900)}
      {step(4, 940, "Statistikk og klimaregnskap", "kommune, fylke, havområde")}
      <Reveal at={5}>
        <Box
          box={[100, 520, 1080, 80]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            Forgjengeren Havbase gjorde alt i én modell. Nå har skipsregister,
            geografi, trafikk og utslipp hvert sitt ansvar – og hvert sitt output
            andre kan bygge på.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Maritim trafikkmodell – MarTraf */
export function SlideMarTraf() {
  const steps = [
    "Geografisk berikelse – havner, kystkontur, ankringsområder, oljeinstallasjoner",
    "Operasjonsfase – elleve faser: cruising, manøvrering, ved kai, ankring, fiske, dynamisk posisjonering",
    "Seilassegmenter – sammenhengende sekvenser, aldri kortere enn fem minutter",
    "Komplette seilaser – havn til havn, med håndtering av hull i signalet",
    "Trafikktype – innenriks, til og fra utlandet, gjennomfart",
  ];
  return (
    <>
      <SlideTitle>Maritim trafikkmodell – MarTraf</SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Fra rå posisjoner til seilaser du kan analysere
        </div>
      </Box>
      {steps.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 268 + i * 78, 1080, 66]}
          lineH={54}
          size={20}
          text={text}
        />
      ))}
      <SourceLink href="https://github.com/Kystverket/maru" />
    </>
  );
}

/* MarTraf – de tekniske valgene */
export function SlideMarTrafValg() {
  const items = [
    "Full oppløsning – ingen nedsampling. Nedsampler du først, risikerer du å beholde støyen og kaste gyldige data",
    "H3-indeksering på Databricks gjør romlige joins raske – på oppløsning 8 er «én celle unna» rundt 1 100 meter",
    "Presisjonstapet er et bevisst valg: modellen trenger bare å vite innenfor eller utenfor, ikke nøyaktig avstand",
  ];
  return (
    <>
      <SlideTitle>Valgene som gjør det mulig</SlideTitle>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 260 + i * 120, 1080, 100]}
          lineH={88}
          size={20}
          text={text}
        />
      ))}
    </>
  );
}

/* Maritim utslippsmodell – MarU */
export function SlideMarU() {
  const items = [
    "Bottom-up etter IMOs fjerde klimagasstudie og ICCT-metodikk",
    "Lastfaktor = (fart over grunn / servicefart)³ – propellloven",
    "Hvert AIS-punkt blir en utslippsberegning, med tiden siden forrige punkt som operasjonstid",
    "Rundt 330 inputvariabler: utslippsfaktorer, svovelgrenser per sone, GWP-faktorer",
  ];
  return (
    <>
      <SlideTitle>Maritim utslippsmodell – MarU</SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          Her møter volumet metoden
        </div>
      </Box>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 268 + i * 90, 1080, 78]}
          lineH={66}
          size={20}
          text={text}
        />
      ))}
      <SourceLink href="https://www.kystverket.no/klima-og-barekraft/maru/" />
    </>
  );
}

/* MarU – ML for å fylle hull i registerdata */
export function SlideMarUHull() {
  const items = [
    "Skipsregistrene er hullete – særlig for de små fartøyene",
    "Medianverdier per skipstype og lengdeintervall dekker det enkleste",
    "Nevrale nett estimerer servicefart, turtall og slagtype",
    "Rundt 70 prosent manglet drivstofftype i 2022 og 2023 – den fylles etter IMOs metode",
  ];
  return (
    <>
      <SlideTitle>Maskinlæring som datakvalitetsverktøy</SlideTitle>
      {items.map((text, i) => (
        <BarItem
          key={text}
          at={i + 1}
          box={[86.6, 250 + i * 95, 1080, 82]}
          lineH={70}
          size={20}
          text={text}
        />
      ))}
      <Reveal at={5}>
        <Box box={[86.6, 630, 1080, 50]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            Modellen er åpen – hele beregningen kan leses på GitHub
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Hva kommer ut av MarU */
export function SlideMarUUt() {
  const facts = [
    "CO₂, metan, NOx, SOx, svevestøv",
    "14 skipstyper, 9 størrelser",
    "Kommune, fylke, havområde",
    "Energibehov og landstrøm",
    "Innenriks, utenriks, gjennomfart",
  ];
  return (
    <>
      <Box box={[53.7, 258, 560, 220]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
          }}
        >
          Hva kommer ut?
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.4,
            color: "var(--red)",
          }}
        >
          Miljødirektoratet legger opp til å bruke MarU-tallene i klimaregnskapet
          for kommunene
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

/* Hvorfor observert aktivitet slår salgstall */
export function SlideMarUHvorfor() {
  return (
    <>
      <SlideTitle>Hvorfor ikke bare bruke salgstall?</SlideTitle>
      <BarItem
        at={1}
        box={[86.6, 250, 1080, 100]}
        lineH={88}
        size={20}
        text="Utslipp fra sjøfart er tradisjonelt regnet ut fra hvor mye drivstoff som selges i Norge"
      />
      <BarItem
        at={2}
        box={[86.6, 370, 1080, 100]}
        lineH={88}
        size={20}
        text="Men fartøy bunkrer i utlandet og seiler her – og bunkrer her og seiler ut. Tallene treffer ikke norske farvann"
      />
      <BarItem
        at={3}
        box={[86.6, 490, 1080, 100]}
        lineH={88}
        size={20}
        text="MarU regner fra observert aktivitet i stedet, og skiller innenriks fra gjennomfart"
      />
      <Reveal at={4}>
        <Box box={[86.6, 620, 1080, 60]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          >
            Tidsserien starter i 2016 – vi bygde ut mange nye basestasjoner i
            2015, og bedre dekning ville gitt kunstig vekst i utslippene
          </div>
        </Box>
      </Reveal>
    </>
  );
}
