import { useStep } from "@/components/steps";
import { Box, BulletList, ChapterSlide, Img, QuotePage, Reveal, pt, useRevealStyle } from "../parts";

const MEDIA = "/media/26-ndc-kystverket";
import {
  DataplattformFlyt,
  DataplattformFlytDetaljert,
} from "./figurer/DataplattformFlyt";
import { DataproduktAnatomi } from "./figurer/Dataprodukt";
import {
  DatakontraktApi,
  DatakontraktBrudd,
} from "./figurer/Datakontrakt";
import {
  PlattformProdukter,
  KontraktArk,
  KatalogKart,
  RolleFigur,
  StrekIkon,
  VarehusVsPlattform,
  type IkonNavn,
  type RolleHvem,
} from "./figurer/strek";

/* Kapittel: Hvorfor bygger alle dataplattform? */
export function SlideHvaEr() {
  const sitat = useRevealStyle(1);
  return (
    <>
      <Box
        box={[81.5, 226, 1117.1, 268]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(54),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        >
          Hvorfor bygger alle dataplattform?
        </div>
      </Box>
      <Box
        box={[120, 500, 1040, 90]}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(22),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
            ...sitat,
          }}
        >
          Data blir mer og mer verdifullt.
        </div>
      </Box>
    </>
  );
}

/* Reid Hoffman: alt er målbart – og det blir rot uten styring */
export function SlideReidHoffman() {
  const pitch = useRevealStyle(2);
  return (
    <QuotePage
      quote={
        <>
          «I dataenes verden er alt målbart, og alt kan vites.»
        </>
      }
      attribution="— Reid Hoffman"
      imageSrc={`${MEDIA}/reid-hoffman.jpg`}
      imageAlt="Reid Hoffman"
      caption="Reid Hoffman. Medgründer av LinkedIn."
    >
      <Box box={[66, 470, 580, 140]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--red)",
            ...pitch,
          }}
        >
          Du får enormt mye data.
          <br />
          Og det blir et skikkelig rot hvis du ikke håndterer det ordentlig.
        </div>
      </Box>
    </QuotePage>
  );
}

/* Dataplattformer i hverdagen: du brukte fire av dem i dag */
export function SlideHvorfor() {
  const eksempler: [string, IkonNavn][] = [
    ["Nettbutikken som foreslår varer", "handlekurv"],
    ["Strømmetjenesten som treffer", "spill"],
    [
      "I banken din kjører svindeldeteksjon og antihvitvasking på hver transaksjon",
      "skjold",
    ],
    [
      "Nye veier planlagt ut fra år med trafikkdata, prognoser og støyberegninger",
      "kart",
    ],
  ];
  return (
    <>
      <Box box={[53.7, 210, 540, 200]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(38),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          Dataplattformer er overalt
        </div>
      </Box>
      <Reveal at={eksempler.length + 1}>
        <Box box={[53.9, 440, 540, 160]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          >
            Hundrevis av terabyte med data, brukt til å ta de beste
            beslutningene ut fra mest mulig data. Det skjer overalt.
          </div>
        </Box>
      </Reveal>
      {eksempler.map(([f, ikon], i) => (
        <Reveal key={f} at={i + 1}>
          <Box box={[600, 200 + i * 110, 620, 100]}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                fontFamily: "var(--font-serif)",
                fontSize: pt(18),
                lineHeight: 1.3,
                color: "var(--burgundy-2)",
              }}
            >
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <StrekIkon navn={ikon} size={34} color="var(--teal)" strokeWidth={1.6} />
              </div>
              <span>{f}</span>
            </div>
            {i < eksempler.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 2,
                  top: 96,
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

/* Slide 11 – Dataflyten overordnet: kilder -> plattform -> konsumenter */
export function SlideDataflyt() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataplattformFlyt />
    </Box>
  );
}

/* Slide 12 – Arkitekturfiguren (detaljert, inkl. governance-laget) */
export function SlideArkitektur() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataplattformFlytDetaljert />
    </Box>
  );
}

/* Slide 14 – Mer enn et datavarehus */
export function SlideMerEnnVarehus() {
  const lakehouse = [
    "Strukturert og ustrukturert",
    "Tilbakerulling",
    "Raske iterasjoner",
  ];
  const platform = [
    "Governance",
    "Revisjonslogging",
    "Gjenfinnbarhet",
    "Pipelines",
    "Utviklerverktøy",
    "Kodekjøring",
    "Compute",
    "AI-modeller",
  ];
  const p1 = useRevealStyle(1);
  const p2 = useRevealStyle(2);
  const p3 = useRevealStyle(3);
  const vis = [p1, p2, p3];
  return (
    <>
      <Box box={[66, 52, 700, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Er det bare en database?
        </div>
      </Box>
      <Box
        box={[66, 148, 680, 168]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 20,
        }}
      >
        {lakehouse.map((tekst, i) => (
          <div
            key={tekst}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(26),
              lineHeight: 1.15,
              color: "var(--red)",
              ...vis[i],
            }}
          >
            {tekst}
          </div>
        ))}
      </Box>
      <Reveal at={4}>
        <Box
          box={[66, 340, 640, 1]}
          style={{ background: "var(--divider)" }}
        />
        <Box box={[66, 360, 680, 28]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: pt(12),
              letterSpacing: 2.2,
              color: "#9a5068",
            }}
          >
            RESTEN AV BYGNINGEN
          </div>
        </Box>
        <Box
          box={[66, 396, 680, 132]}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 28,
            rowGap: 16,
            alignContent: "start",
          }}
        >
          {platform.map((tekst) => (
            <div
              key={tekst}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 99,
                  background: "var(--teal)",
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(17),
                  lineHeight: 1.2,
                  color: "var(--burgundy-2)",
                }}
              >
                {tekst}
              </div>
            </div>
          ))}
        </Box>
      </Reveal>
      <Reveal at={5}>
        <Box
          box={[66, 580, 680, 64]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(34),
              lineHeight: 1.15,
              color: "var(--burgundy)",
            }}
          >
            Det er en plattform.
          </div>
        </Box>
      </Reveal>
      <Box box={[760, 80, 460, 500]}>
        <VarehusVsPlattform />
      </Box>
    </>
  );
}

const PLATTFORM_SKJERM: {
  src: string;
  alt: string;
  caption: string;
}[] = [
  {
    src: `${MEDIA}/databricks-home.png`,
    alt: "Databricks-arbeidsflaten: kataloger, jobber, compute og utforsking i én meny",
    caption: "Katalog. Compute. Jobber. Utforsk.",
  },
  {
    src: `${MEDIA}/databricks-jobs.png`,
    alt: "Jobber og pipelines i Databricks-arbeidsflaten",
    caption: "Jobber som kjører.",
  },
  {
    src: `${MEDIA}/databricks-catalog.png`,
    alt: "Katalogutforskeren åpen på en forvaltet tabell",
    caption: "En katalog du kan åpne.",
  },
  {
    src: `${MEDIA}/databricks-ai-chat.png`,
    alt: "Databricks-assistenten: spør plattformen om dataene",
    caption: "Og så spør du.",
  },
  {
    src: `${MEDIA}/databricks-trollfjord.png`,
    alt: "Trollfjords spor på kart og i tabell, generert fra et spørsmål",
    caption: "Og den svarer.",
  },
];

/* Fem klikk gjennom Databricks: arbeidsflate, jobber, katalog, spørsmål, svar */
export function SlideMerEnnVarehusKatalog() {
  const step = useStep();
  const i = Math.min(step, PLATTFORM_SKJERM.length - 1);
  return (
    <>
      <Box
        box={[20, 16, 1240, 628]}
        style={{
          overflow: "hidden",
          borderRadius: 10,
          background: "#1b1b1b",
        }}
      >
        {PLATTFORM_SKJERM.map((shot, idx) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center top",
              opacity: idx === i ? 1 : 0,
              transition: "opacity 260ms ease",
            }}
          />
        ))}
      </Box>
      <Box
        box={[66, 654, 1148, 48]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
          }}
        >
          {PLATTFORM_SKJERM[i].caption}
        </div>
      </Box>
    </>
  );
}

/* Hvordan du strukturerer data: de fire ideene denne delen går gjennom */
const STRUKTUR: { label: string; ikon: IkonNavn }[] = [
  { label: "Dataprodukt", ikon: "pakke" },
  { label: "Datakontrakt", ikon: "kontrakt" },
  { label: "Datakatalog", ikon: "bok" },
  { label: "Governance", ikon: "skjold" },
];

export function SlideStrukturereData() {
  return (
    <>
      <Box box={[66, 70, 1148, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Hvordan strukturerer vi dataene for å holde orden?
        </div>
      </Box>
      <Box box={[66, 160, 1148, 70]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--red)",
          }}
        >
          Når data vokser i mengde og variasjon, trenger vi struktur og
          fleksibilitet.
        </div>
      </Box>
      <BulletList
        box={[66, 270, 1100, 360]}
        fromStep={1}
        size={28}
        gap={40}
        items={STRUKTUR.map(({ label, ikon }) => (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <StrekIkon
              navn={ikon}
              size={32}
              color="var(--teal)"
              strokeWidth={1.6}
            />
            {label}
          </span>
        ))}
      />
    </>
  );
}

/* Slide 15 – Dataprodukt: tittel og kjernen i ett */
export function SlideDataprodukt() {
  const linje = useRevealStyle(1);
  return (
    <>
      <Box
        box={[66, 130, 640, 460]}
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
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Dataprodukt
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
            lineHeight: 1.25,
            color: "var(--red)",
          }}
        >
          En dataplattform finnes
          <br />
          for å levere dataprodukter.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje,
          }}
        >
          Et produkt har brukere. Brukere har forventninger.
        </div>
      </Box>
      <Box box={[720, 170, 500, 380]}>
        <PlattformProdukter />
      </Box>
    </>
  );
}

/* Slide 15c – Hva som gjør et datasett til et produkt */
const KJENNETEGN: { tittel: string; sub: string; ikon: IkonNavn }[] = [
  { tittel: "En navngitt eier", sub: "som svarer, og kan forbedre det", ikon: "person" },
  { tittel: "Dokumentasjon", sub: "betydning, opphav og bruk", ikon: "bok" },
  { tittel: "Kvalitetsgarantier", sub: "ferskhet, tester, en kontrakt", ikon: "skjold" },
  { tittel: "Kjente konsumenter", sub: "så en endring kan varsles", ikon: "deling" },
];

export function SlideDataproduktKjennetegn() {
  return (
    <>
      <Box box={[66, 48, 1148, 64]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Hva som gjør det til et produkt
        </div>
      </Box>
      {KJENNETEGN.map((k, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cell = (
          <Box key={k.tittel} box={[66 + col * 590, 150 + row * 200, 540, 170]}>
            <StrekIkon navn={k.ikon} size={36} color="var(--teal)" strokeWidth={1.6} />
            <div
              style={{
                marginTop: 18,
                fontFamily: "var(--font-serif)",
                fontSize: pt(26),
                lineHeight: 1.15,
                color: "var(--burgundy-2)",
              }}
            >
              {k.tittel}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: "var(--font-sans)",
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--red)",
              }}
            >
              {k.sub}
            </div>
          </Box>
        );
        return i === 0 ? (
          cell
        ) : (
          <Reveal key={k.tittel} at={i}>
            {cell}
          </Reveal>
        );
      })}
      <Reveal at={4}>
        <Box box={[66, 560, 1148, 80]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              color: "var(--red)",
            }}
          >
            Ikke hvert datasett. De som folk er avhengige av.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Slide 15d – Dataprodukt: mer enn en tabell */
export function SlideDataproduktAnatomi() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DataproduktAnatomi />
    </Box>
  );
}

/* Kapittel: Datakontrakt */
export function SlideDatakontraktKapittel() {
  return (
    <>
      <Box box={[430, 60, 420, 150]}>
        <KontraktArk />
      </Box>
      <ChapterSlide
        title="Datakontrakt"
        subtitle="En avtale mellom de som endrer et datasett og de som bruker det."
        showLogo={false}
      />
    </>
  );
}

/* Hva en datakontrakt er */
export function SlideDatakontraktHva() {
  const linje = useRevealStyle(1);
  return (
    <>
      <Box
        box={[66, 140, 1148, 460]}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Tydelig dokumentasjon av dataene dine
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        >
          Et dokument både mennesker og maskiner kan lese,
          <br />
          som avklarer forventninger begge veier.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje,
          }}
        >
          Skjemaet sier at fart er et tall. Kontrakten sier null til seksti
          knop, ferskere enn fem minutter, og hvem du vekker når det ryker.
        </div>
      </Box>
    </>
  );
}

/* Hva kontrakten inneholder */
const KONTRAKT_FELT: { tittel: string; sub: string; ikon: IkonNavn }[] = [
  { tittel: "Skjema", sub: "felter, typer, hva som er påkrevd", ikon: "skjema" },
  { tittel: "Betydning", sub: "hva feltene betyr, hvor de kommer fra", ikon: "bok" },
  { tittel: "Valideringsregler", sub: "min, maks, relasjoner, tester", ikon: "skjold" },
  { tittel: "SLA og governance", sub: "ferskhet, sensitivitet, hvem som eier det", ikon: "kontrakt" },
];

export function SlideDatakontraktInnhold() {
  return (
    <>
      <Box box={[66, 48, 1148, 64]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Hva en kontrakt inneholder
        </div>
      </Box>
      {KONTRAKT_FELT.map((k, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cell = (
          <Box key={k.tittel} box={[66 + col * 590, 150 + row * 200, 540, 170]}>
            <StrekIkon navn={k.ikon} size={36} color="var(--teal)" strokeWidth={1.6} />
            <div
              style={{
                marginTop: 18,
                fontFamily: "var(--font-serif)",
                fontSize: pt(26),
                lineHeight: 1.15,
                color: "var(--burgundy-2)",
              }}
            >
              {k.tittel}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: "var(--font-sans)",
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--red)",
              }}
            >
              {k.sub}
            </div>
          </Box>
        );
        return i === 0 ? (
          cell
        ) : (
          <Reveal key={k.tittel} at={i}>
            {cell}
          </Reveal>
        );
      })}
      <Reveal at={4}>
        <Box box={[66, 560, 1148, 80]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              color: "var(--red)",
            }}
          >
            I motsetning til en wikiside blir denne testet.
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Datakontrakt: tydelig dokumentasjon av dataene dine */
export function SlideDatakontrakt() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DatakontraktApi />
    </Box>
  );
}

/* Slide 15d – Kontrakten stopper feilen tidlig */
export function SlideDatakontraktBrudd() {
  return (
    <Box box={[20, 42, 1240, 636]}>
      <DatakontraktBrudd />
    </Box>
  );
}

/* Kapittel: Datakatalog */
export function SlideDatakatalog() {
  return (
    <>
      <Box box={[430, 60, 420, 150]}>
        <KatalogKart />
      </Box>
      <ChapterSlide
        title="Datakatalog"
        subtitle="Kartet organisasjonen din mangler."
        showLogo={false}
      />
    </>
  );
}

/* Hva en datakatalog er */
export function SlideDatakatalogHva() {
  const linje1 = useRevealStyle(1);
  const linje2 = useRevealStyle(2);
  return (
    <>
      <Box
        box={[66, 130, 1148, 500]}
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
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Hva en katalog er
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        >
          En oversikt over datasettene i en organisasjon.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje1,
          }}
        >
          Søk opp, forstå og vurder et datasett uten å spørre rundt,
          eller grave gjennom databaser på egen hånd.
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        >
          Dataene blir i kildesystemene. Katalogen beskriver dem
          og peker på hvor de ligger.
        </div>
      </Box>
    </>
  );
}

/* DataHub-skjermbilde – fyller flaten så UI-teksten er lesbar bakerst i salen */
export function SlideDatakatalogDatahub() {
  const caption = useRevealStyle(1);
  return (
    <>
      <Box
        box={[0, 0, 1280, 720]}
        style={{ overflow: "hidden", background: "#fff" }}
      >
        <Img
          box={[0, 0, 1280, 720]}
          src={`${MEDIA}/datahub.png`}
          alt="DataHub-søk: 141 datasett på tvers av Looker, dbt, Snowflake, Airflow og S3"
          fit="cover"
        />
      </Box>
      <Box
        box={[0, 668, 1280, 52]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(transparent, rgba(251, 240, 229, 0.92))",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
            ...caption,
          }}
        >
          DataHub. Åpen kildekode. Søk på tvers av mange systemer, ikke bare én sky.
        </div>
      </Box>
    </>
  );
}

/* Slide 16 – Governance: hvem som får se hva, og hvordan du beviser det */
export function SlideGovernance() {
  return (
    <>
      <Box box={[66, 70, 1148, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          Governance
        </div>
      </Box>
      <BulletList
        box={[66, 200, 1100, 440]}
        fromStep={1}
        size={28}
        gap={40}
        items={[
          "Brukeradministrasjon og tilganger",
          "Maskering av persondata",
          "Revisjonslogging",
          "GDPR-etterlevelse",
        ]}
      />
    </>
  );
}

/* Slide 18 – Roller rundt plattformen */
const ROLLER: {
  at: number;
  hvem: RolleHvem;
  tittel: string;
  sub: string;
}[] = [
  { at: 1, hvem: "plattform", tittel: "Plattform", sub: "eier grunnmuren" },
  {
    at: 2,
    hvem: "byggere",
    tittel: "Utviklere og\nanalytikere",
    sub: "bygger på den",
  },
  { at: 3, hvem: "governance", tittel: "Governance", sub: "setter rammene" },
  {
    at: 4,
    hvem: "konsumenter",
    tittel: "BI og\nkonsumenter",
    sub: "bruker det som kommer ut",
  },
];

export function SlideRoller() {
  const grouped = useStep() >= 5;
  return (
    <>
      <Box box={[66, 44, 1148, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        >
          Tydelige roller
        </div>
      </Box>
      <Box box={[66, 100, 1148, 28]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            letterSpacing: 2.2,
            color: "#9a5068",
            opacity: grouped ? 0 : 1,
            transition: "opacity 260ms ease",
          }}
        >
          ROLLER FØR TEKNOLOGI
        </div>
      </Box>

      <Box
        box={[70, 358, 1140, 82]}
        style={{
          background: "var(--cream-dark)",
          borderRadius: "50%",
        }}
      />
      <Box
        box={[140, 384, 1000, 7]}
        style={{
          background: "var(--teal)",
          borderRadius: 8,
        }}
      />

      <Reveal at={5}>
        <Box
          box={[16, 140, 942, 442]}
          style={{
            border: "2px solid var(--teal)",
            borderRadius: 22,
            background: "color-mix(in srgb, var(--teal) 6%, var(--cream))",
            pointerEvents: "none",
          }}
        />
      </Reveal>

      {ROLLER.map((r, i) => (
        <Reveal key={r.hvem} at={r.at}>
          <Box box={[40 + i * 310, 118, 300, 300]}>
            <RolleFigur hvem={r.hvem} />
          </Box>
          <Box
            box={[40 + i * 310, 458, 300, 120]}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(20),
                lineHeight: 1.15,
                color: "var(--burgundy)",
                whiteSpace: "pre-line",
                minHeight: 62,
              }}
            >
              {r.tittel}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(15),
                lineHeight: 1.3,
                color: "var(--red)",
              }}
            >
              {r.sub}
            </div>
          </Box>
        </Reveal>
      ))}

      <Reveal at={5}>
        <Box
          box={[247, 122, 480, 38]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--cream)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(22),
              lineHeight: 1,
              color: "var(--teal)",
              textAlign: "center",
            }}
          >
            Dataplattform-team
          </div>
        </Box>
      </Reveal>

      <Reveal at={4}>
        <Box
          box={[80, 598, 1120, 48]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(16),
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            Fra at data er noe IT tar seg av, til at det er en del av hvert
            domenes eget ansvar
          </div>
        </Box>
      </Reveal>
    </>
  );
}
