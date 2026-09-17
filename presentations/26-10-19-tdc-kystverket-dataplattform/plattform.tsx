import { Copy } from "@/components/Copy";
import { useStep } from "@/components/steps";
import { Box, BulletList, ChapterSlide, Img, QuotePage, Reveal, pt, useRevealStyle } from "../parts";
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

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";

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
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(54),
            lineHeight: 1.1,
            color: "var(--burgundy)",
            textAlign: "center",
            width: "100%",
          }}
        />
      </Box>
      <Box
        box={[120, 500, 1040, 90]}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(22),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
            ...sitat,
          }}
        />
      </Box>
    </>
  );
}

/* Reid Hoffman: alt er målbart – og det blir rot uten styring */
export function SlideReidHoffman() {
  const pitch = useRevealStyle(2);
  return (
    <QuotePage
      quote={<Copy k="quote" />}
      attribution={<Copy k="attribution" />}
      imageSrc={`${MEDIA}/reid-hoffman.jpg`}
      imageAlt="Reid Hoffman"
      caption={<Copy k="caption" />}
    >
      <Box box={[66, 470, 580, 140]}>
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--red)",
            whiteSpace: "pre-line",
            ...pitch,
          }}
        />
      </Box>
    </QuotePage>
  );
}

/* Dataplattformer i hverdagen: du brukte fire av dem i dag */
export function SlideHvorfor() {
  const ikoner: IkonNavn[] = ["handlekurv", "spill", "skjold", "kart"];
  return (
    <>
      <Box box={[53.7, 210, 540, 200]}>
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
      </Box>
      <Reveal at={ikoner.length + 1}>
        <Box box={[53.9, 440, 540, 160]}>
          <Copy
            k="lead"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          />
        </Box>
      </Reveal>
      {ikoner.map((ikon, i) => (
        <Reveal key={ikon} at={i + 1}>
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
              <Copy k="items" i={i} />
            </div>
            {i < ikoner.length - 1 && (
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
  const p1 = useRevealStyle(1);
  const p2 = useRevealStyle(2);
  const p3 = useRevealStyle(3);
  const vis = [p1, p2, p3];
  return (
    <>
      <Box box={[66, 52, 700, 70]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
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
        {[0, 1, 2].map((i) => (
          <Copy
            key={i}
            k="items"
            i={i}
            as="div"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(26),
              lineHeight: 1.15,
              color: "var(--red)",
              ...vis[i],
            }}
          />
        ))}
      </Box>
      <Reveal at={4}>
        <Box
          box={[66, 340, 640, 1]}
          style={{ background: "var(--divider)" }}
        />
        <Box box={[66, 360, 680, 28]}>
          <Copy
            k="section_label"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: pt(12),
              letterSpacing: 2.2,
              color: "#9a5068",
            }}
          />
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
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
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
              <Copy
                k="platform_items"
                i={i}
                as="div"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(17),
                  lineHeight: 1.2,
                  color: "var(--burgundy-2)",
                }}
              />
            </div>
          ))}
        </Box>
      </Reveal>
      <Reveal at={5}>
        <Box
          box={[66, 580, 680, 64]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Copy
            k="closing"
            as="div"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(34),
              lineHeight: 1.15,
              color: "var(--burgundy)",
            }}
          />
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
}[] = [
  {
    src: `${MEDIA}/databricks-home.png`,
    alt: "Databricks-arbeidsflaten: kataloger, jobber, compute og utforsking i én meny",
  },
  {
    src: `${MEDIA}/databricks-jobs.png`,
    alt: "Jobber og pipelines i Databricks-arbeidsflaten",
  },
  {
    src: `${MEDIA}/databricks-catalog.png`,
    alt: "Katalogutforskeren åpen på en forvaltet tabell",
  },
  {
    src: `${MEDIA}/databricks-ai-chat.png`,
    alt: "Databricks-assistenten: spør plattformen om dataene",
  },
  {
    src: `${MEDIA}/databricks-trollfjord.png`,
    alt: "Trollfjords spor på kart og i tabell, generert fra et spørsmål",
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
        <Copy
          k="captions"
          i={i}
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
          }}
        />
      </Box>
    </>
  );
}

/* Hvordan du strukturerer data: de fire ideene denne delen går gjennom */
const STRUKTUR: IkonNavn[] = ["pakke", "kontrakt", "bok", "skjold"];

export function SlideStrukturereData() {
  return (
    <>
      <Box box={[66, 70, 1148, 70]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Box box={[66, 160, 1148, 70]}>
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--red)",
          }}
        />
      </Box>
      <BulletList
        box={[66, 270, 1100, 360]}
        fromStep={1}
        size={28}
        gap={40}
        items={STRUKTUR.map((ikon, i) => (
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
            <Copy k="items" i={i} />
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
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
            lineHeight: 1.25,
            color: "var(--red)",
            whiteSpace: "pre-line",
          }}
        />
        <Copy
          k="body"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje,
          }}
        />
      </Box>
      <Box box={[720, 170, 500, 380]}>
        <PlattformProdukter />
      </Box>
    </>
  );
}

/* Slide 15c – Hva som gjør et datasett til et produkt */
const KJENNETEGN: IkonNavn[] = ["person", "bok", "skjold", "deling"];

export function SlideDataproduktKjennetegn() {
  return (
    <>
      <Box box={[66, 48, 1148, 64]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        />
      </Box>
      {KJENNETEGN.map((ikon, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cell = (
          <Box key={ikon} box={[66 + col * 590, 150 + row * 200, 540, 170]}>
            <StrekIkon navn={ikon} size={36} color="var(--teal)" strokeWidth={1.6} />
            <Copy
              k="cards"
              i={i}
              field="tittel"
              as="div"
              style={{
                marginTop: 18,
                fontFamily: "var(--font-serif)",
                fontSize: pt(26),
                lineHeight: 1.15,
                color: "var(--burgundy-2)",
              }}
            />
            <Copy
              k="cards"
              i={i}
              field="tekst"
              as="div"
              style={{
                marginTop: 10,
                fontFamily: "var(--font-sans)",
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--red)",
              }}
            />
          </Box>
        );
        return i === 0 ? (
          cell
        ) : (
          <Reveal key={ikon} at={i}>
            {cell}
          </Reveal>
        );
      })}
      <Reveal at={4}>
        <Box box={[66, 560, 1148, 80]}>
          <Copy
            k="footer"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              color: "var(--red)",
            }}
          />
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
        title={<Copy k="title" />}
        subtitle={<Copy k="subtitle" />}
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
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.3,
            color: "var(--red)",
            whiteSpace: "pre-line",
          }}
        />
        <Copy
          k="body"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje,
          }}
        />
      </Box>
    </>
  );
}

/* Hva kontrakten inneholder */
const KONTRAKT_FELT: IkonNavn[] = ["skjema", "bok", "skjold", "kontrakt"];

export function SlideDatakontraktInnhold() {
  return (
    <>
      <Box box={[66, 48, 1148, 64]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        />
      </Box>
      {KONTRAKT_FELT.map((ikon, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cell = (
          <Box key={ikon} box={[66 + col * 590, 150 + row * 200, 540, 170]}>
            <StrekIkon navn={ikon} size={36} color="var(--teal)" strokeWidth={1.6} />
            <Copy
              k="cards"
              i={i}
              field="tittel"
              as="div"
              style={{
                marginTop: 18,
                fontFamily: "var(--font-serif)",
                fontSize: pt(26),
                lineHeight: 1.15,
                color: "var(--burgundy-2)",
              }}
            />
            <Copy
              k="cards"
              i={i}
              field="tekst"
              as="div"
              style={{
                marginTop: 10,
                fontFamily: "var(--font-sans)",
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--red)",
              }}
            />
          </Box>
        );
        return i === 0 ? (
          cell
        ) : (
          <Reveal key={ikon} at={i}>
            {cell}
          </Reveal>
        );
      })}
      <Reveal at={4}>
        <Box box={[66, 560, 1148, 80]}>
          <Copy
            k="footer"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              color: "var(--red)",
            }}
          />
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
        title={<Copy k="title" />}
        subtitle={<Copy k="subtitle" />}
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
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(42),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
        <Copy
          k="lead"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.3,
            color: "var(--red)",
          }}
        />
        <Copy
          k="body"
          i={0}
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje1,
          }}
        />
        <Copy
          k="body"
          i={1}
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(20),
            lineHeight: 1.4,
            color: "var(--burgundy-2)",
            ...linje2,
          }}
        />
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
        <Copy
          k="caption"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(18),
            lineHeight: 1.35,
            color: "var(--red)",
            textAlign: "center",
            ...caption,
          }}
        />
      </Box>
    </>
  );
}

/* Slide 16 – Governance: hvem som får se hva, og hvordan du beviser det */
export function SlideGovernance() {
  return (
    <>
      <Box box={[66, 70, 1148, 70]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <BulletList
        box={[66, 200, 1100, 440]}
        fromStep={1}
        size={28}
        gap={40}
        items={[
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
          <Copy k="items" i={3} />,
        ]}
      />
    </>
  );
}

/* Slide 18 – Roller rundt plattformen */
const ROLLER: {
  at: number;
  hvem: RolleHvem;
}[] = [
  { at: 1, hvem: "plattform" },
  { at: 2, hvem: "byggere" },
  { at: 3, hvem: "governance" },
  { at: 4, hvem: "konsumenter" },
];

export function SlideRoller() {
  const grouped = useStep() >= 5;
  return (
    <>
      <Box box={[66, 44, 1148, 70]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(36),
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Box box={[66, 100, 1148, 28]}>
        <Copy
          k="section_label"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            letterSpacing: 2.2,
            color: "#9a5068",
            opacity: grouped ? 0 : 1,
            transition: "opacity 260ms ease",
          }}
        />
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
            <Copy
              k="cards"
              i={i}
              field="tittel"
              as="div"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(20),
                lineHeight: 1.15,
                color: "var(--burgundy)",
                whiteSpace: "pre-line",
                minHeight: 62,
              }}
            />
            <Copy
              k="cards"
              i={i}
              field="tekst"
              as="div"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(15),
                lineHeight: 1.3,
                color: "var(--red)",
              }}
            />
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
          <Copy
            k="team_label"
            as="div"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(22),
              lineHeight: 1,
              color: "var(--teal)",
              textAlign: "center",
            }}
          />
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
          <Copy
            k="footer"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(16),
              color: "var(--red)",
              textAlign: "center",
            }}
          />
        </Box>
      </Reveal>
    </>
  );
}
