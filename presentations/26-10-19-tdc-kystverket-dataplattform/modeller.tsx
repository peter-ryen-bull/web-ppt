import type { ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, BulletItem, BulletList, ChapterSlide, Reveal, Video, pt, useRevealStyle } from "../parts";

const MEDIA = "/media/26-09-17-ndc-kystverket-dataplatform";
import {
  Bunkring,
  Containerskip,
  HexHierarki,
  Propell,
  Registerhull,
  RisikoSektorer,
  Seilas,
  Soyler,
  SporTilUtslipp,
} from "./figurer/strek";

function SlideTitle({
  children,
  width = 1140,
  height = 70,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <Box box={[66.7, 70, width, height]}>
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(34),
          lineHeight: 1.15,
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
        <Copy k="source" />
      </a>
    </Box>
  );
}

/* Kapittel: Produktene oppå strømmen */
export function SlideModeller() {
  return (
    <>
      <Box box={[0, 430, 1280, 290]}>
        <Containerskip />
      </Box>
      <ChapterSlide
        title={<Copy k="title" as="div" style={{ whiteSpace: "pre-line" }} />}
        titleSize={54}
        showLogo={false}
      />
    </>
  );
}

/* Modulflyt: AIS → HAIS | MarTraf → MarU / KystRisk */
export function SlideModellFlyt() {
  const box = (
    at: number,
    frame: [number, number, number, number],
    i: number,
  ) => (
    <Reveal at={at}>
      <Box
        box={frame}
        style={{
          background: "var(--teal)",
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
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
          <Copy k="cards" i={i} field="tittel" />
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(13),
            lineHeight: 1.3,
            color: "var(--mint)",
          }}
        >
          <Copy k="cards" i={i} field="tekst" />
        </div>
      </Box>
    </Reveal>
  );

  const arrowHead = (x: number, y: number) => (
    <path d={`M ${x - 10} ${y - 6} L ${x} ${y} L ${x - 10} ${y + 6}`} stroke="var(--red)" strokeWidth={2.5} fill="none" />
  );

  return (
    <>
      <SlideTitle width={900}>
        <Copy k="title" />
      </SlideTitle>
      {box(1, [36, 292, 210, 136], 0)}
      <Reveal at={2}>
        <Box box={[246, 188, 104, 332]}>
          <svg width="104" height="332" viewBox="0 0 104 332" fill="none" aria-hidden>
            <path d="M 0 172 H 40 V 64 H 92" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(92, 64)}
          </svg>
        </Box>
      </Reveal>
      {box(2, [350, 188, 250, 128], 1)}
      <Reveal at={3}>
        <Box box={[246, 188, 104, 332]}>
          <svg width="104" height="332" viewBox="0 0 104 332" fill="none" aria-hidden>
            <path d="M 40 172 V 268 H 92" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(92, 268)}
          </svg>
        </Box>
      </Reveal>
      {box(3, [350, 392, 250, 128], 2)}
      <Reveal at={4}>
        <Box box={[600, 328, 160, 256]}>
          <svg width="160" height="256" viewBox="0 0 160 256" fill="none" aria-hidden>
            <path d="M 0 128 H 70 V 58 H 148" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(148, 58)}
          </svg>
        </Box>
      </Reveal>
      <Reveal at={5}>
        <Box box={[600, 328, 160, 256]}>
          <svg width="160" height="256" viewBox="0 0 160 256" fill="none" aria-hidden>
            <path d="M 70 58 V 202 H 148" stroke="var(--red)" strokeWidth={2.5} />
            {arrowHead(148, 202)}
          </svg>
        </Box>
      </Reveal>
      {box(4, [760, 330, 480, 112], 3)}
      {box(5, [760, 474, 480, 112], 4)}
    </>
  );
}

/* HAIS – historisk uttrekk på bestilling */
export function SlideHais() {
  const steg = (at: number, x: number, i: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 500, 280, 118]}
        style={{
          background: "var(--teal)",
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: 14,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(18),
            color: "var(--cream)",
          }}
        >
          <Copy k="cards" i={i} field="tittel" />
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(12),
            lineHeight: 1.3,
            color: "var(--mint)",
          }}
        >
          <Copy k="cards" i={i} field="tekst" />
        </div>
      </Box>
    </Reveal>
  );

  const pil = (at: number, x: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 528, 36, 60]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(28),
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
      <SlideTitle width={760}>
        <Copy k="title" />
      </SlideTitle>
      <Box
        box={[860, 78, 354, 48]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <a
          href="https://hais.kystverket.no/"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            color: "var(--red)",
          }}
        >
          <Copy k="link" />
        </a>
      </Box>
      <Box
        box={[66, 156, 1148, 326]}
        style={{
          overflow: "hidden",
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 8px 28px rgba(45, 20, 30, 0.12)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/hais.png`}
          alt="HAIS – bestill historiske AIS-uttrekk på hais.kystverket.no"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        />
      </Box>
      {steg(1, 90, 0)}
      {pil(2, 384)}
      {steg(2, 434, 1)}
      {pil(3, 728)}
      {steg(3, 778, 2)}
    </>
  );
}

/* Følg ett skip: fra rå punkter til en seilas med faser */
export function SlideFolgEttSkip() {
  const linje = useRevealStyle(1);
  return (
    <>
      <SlideTitle width={760}>
        <Copy k="title" />
      </SlideTitle>
      <Box box={[880, 36, 340, 120]}>
        <Seilas />
      </Box>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          <Copy k="lead" />
        </div>
      </Box>
      <Box
        box={[140, 372, 1000, 3]}
        style={{ background: "var(--cream-dark)", ...linje }}
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 140 + i * 250;
        const aktiv = i === 2;
        return (
          <Reveal key={i} at={i + 1}>
            <Box
              box={[x - 14, 358, 30, 30]}
              style={{
                borderRadius: "50%",
                background: aktiv ? "var(--red)" : "var(--teal)",
                border: "4px solid var(--cream)",
              }}
            />
            <Box box={[x - 100, 270, 200, 70]}>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: pt(22),
                  color: aktiv ? "var(--red)" : "var(--burgundy)",
                  textAlign: "center",
                }}
              >
                <Copy k="faser" i={i} field="fase" />
              </div>
            </Box>
            <Box box={[x - 100, 410, 200, 80]}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(15),
                  lineHeight: 1.4,
                  color: "var(--burgundy-2)",
                  textAlign: "center",
                }}
              >
                <Copy k="faser" i={i} field="sted" />
                <br />
                <span style={{ color: "#9a5068" }}>
                  <Copy k="faser" i={i} field="fart" />
                </span>
              </div>
            </Box>
          </Reveal>
        );
      })}
      <Reveal at={6}>
        <Box box={[100, 560, 1080, 80]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            <Copy k="footer" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Ett skip fra HAIS: Asuka, hele lerretet */
export function SlideAsukaHais() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ background: "#111318" }} />
      <Video
        box={[0, 0, 1280, 720]}
        src={`${MEDIA}/asuka-hais.mp4`}
        fit="contain"
      />
    </>
  );
}

/* Punchline: skipet heter Asuka. Wikipedia-artikkelen også. */
export function SlideAsukaHvem() {
  return (
    <>
      <Box box={[66.7, 36, 1146, 70]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(40),
            color: "var(--burgundy-2)",
          }}
        >
          <Copy k="title" />
        </div>
      </Box>
      <Box
        box={[48, 124, 740, 556]}
        style={{
          background: "#fff",
          border: "1.5px solid var(--cream-dark)",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/asuka-wikipedia.png`}
          alt="Wikipedia-artikkel: Asuka (fribryter)"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top left",
          }}
        />
      </Box>
      <Box
        box={[808, 124, 424, 556]}
        style={{
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${MEDIA}/asuka.jpg`}
          alt="Asuka"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
    </>
  );
}

/* Propellloven: AIS-fart → skipstype → utslipp */
export function SlidePropellloven() {
  return (
    <>
      <SlideTitle>
        <Copy k="title" />
      </SlideTitle>
      <Box box={[880, 200, 360, 360]}>
        <Propell />
      </Box>
      {[0, 1, 2].map((i) => (
        <Reveal key={i} at={i + 1}>
          <Box
            box={[72.4, 188 + i * 128, 760, 112]}
            style={{ display: "flex", gap: 22, alignItems: "flex-start" }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: pt(28),
                lineHeight: 1,
                color: "var(--red)",
                width: 36,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: pt(22),
                  lineHeight: 1.25,
                  color: "var(--burgundy-2)",
                }}
              >
                <Copy k="cards" i={i} field="tittel" />
              </div>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(16),
                  lineHeight: 1.35,
                  color: "var(--burgundy-2)",
                }}
              >
                <Copy k="cards" i={i} field="tekst" />
              </div>
            </div>
          </Box>
        </Reveal>
      ))}
      <Reveal at={4}>
        <Box box={[72.4, 590, 1100, 70]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--red)",
            }}
          >
            <Copy k="footer" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Romlig analyse i denne skalaen: contains-within og nærhet */
export function SlideMathOpt() {
  const kort = (at: number, x: number, i: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 196, 520, 220]}
        style={{
          background: "#fff",
          border: "1.5px solid var(--cream-dark)",
          borderRadius: 14,
          padding: "30px 34px",
        }}
      >
        <span
          style={{
            background: "var(--teal)",
            color: "var(--cream)",
            borderRadius: 999,
            padding: "7px 18px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(11),
            letterSpacing: 1.5,
          }}
        >
          <Copy k="cards" i={i} field="label" />
        </span>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          <Copy k="cards" i={i} field="tittel" />
        </div>
        <div
          style={{
            marginTop: 16,
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.4,
            color: "var(--burgundy)",
          }}
        >
          <Copy k="cards" i={i} field="tekst" />
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <SlideTitle>
        <Copy k="title" />
      </SlideTitle>
      <Box box={[72.4, 150, 1136, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          <Copy k="lead" />
        </div>
      </Box>
      {kort(0, 80, 0)}
      {kort(0, 680, 1)}
      <Reveal at={1}>
        <Box
          box={[72.4, 450, 1136, 70]}
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
              lineHeight: 1.45,
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          >
            <Copy k="body" i={0} />
          </div>
        </Box>
      </Reveal>
      <Reveal at={2}>
        <Box
          box={[72.4, 540, 1136, 80]}
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
              lineHeight: 1.45,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            <Copy k="body" i={1} />
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* H3: hexer inni hexer, unike id-er, oppløsninger ned til ~1 m */
export function SlideH3Hexes() {
  return (
    <>
      <SlideTitle>
        <Copy k="title" />
      </SlideTitle>
      <Box box={[72.4, 150, 1136, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          <Copy k="lead" />
        </div>
      </Box>
      <Box box={[80, 196, 1120, 360]}>
        <HexHierarki />
      </Box>
      <Reveal at={1}>
        <Box
          box={[72.4, 570, 1136, 70]}
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
              lineHeight: 1.45,
              color: "var(--red)",
              textAlign: "center",
            }}
          >
            <Copy k="footer" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Hvorfor hex skalerer: join på et tall, ikke et polygon */
export function SlideHexJoin() {
  const kort = (at: number, x: number, i: number) => (
    <Reveal at={at}>
      <Box
        box={[x, 168, 520, 300]}
        style={{
          background: "#fff",
          border: "1.5px solid var(--cream-dark)",
          borderRadius: 14,
          padding: "30px 34px",
        }}
      >
        <span
          style={{
            background: "var(--teal)",
            color: "var(--cream)",
            borderRadius: 999,
            padding: "7px 18px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: pt(11),
            letterSpacing: 1.5,
          }}
        >
          <Copy k="cards" i={i} field="label" />
        </span>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.2,
            color: "var(--burgundy-2)",
          }}
        >
          <Copy k="cards" i={i} field="tittel" />
        </div>
        <div style={{ marginTop: 22, display: "grid", gap: 18 }}>
          {[0, 1].map((j) => (
            <BulletItem key={j} size={16} color="var(--burgundy)">
              <Copy k={`cards.${i}.items`} i={j} />
            </BulletItem>
          ))}
        </div>
      </Box>
    </Reveal>
  );

  return (
    <>
      <SlideTitle>
        <Copy k="title" />
      </SlideTitle>
      {kort(0, 80, 0)}
      {kort(1, 680, 1)}
      <Reveal at={1}>
        <Box
          box={[72.4, 490, 1136, 40]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(17),
              color: "var(--burgundy)",
              textAlign: "center",
            }}
          >
            <Copy k="caption" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* Ett skip på H3-rutenettet, hele lerretet */
export function SlideH3Ship() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ background: "#111318" }} />
      <Video
        box={[0, 0, 1280, 720]}
        src={`${MEDIA}/h3-ship.mp4`}
        fit="contain"
      />
    </>
  );
}

/* MarTraf på kartet: heksagonene, hele lerretet */
export function SlideMarTrafVideo() {
  return (
    <>
      <Box box={[0, 0, 1280, 720]} style={{ background: "#111318" }} />
      <Video
        box={[0, 0, 1280, 720]}
        src={`${MEDIA}/martraf-video.mov`}
        fit="contain"
      />
    </>
  );
}

/* Maritim utslippsmodell – MarU */
export function SlideMarU() {
  return (
    <>
      <SlideTitle>
        <Copy k="title" />
      </SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          <Copy k="lead" />
        </div>
      </Box>
      <BulletList
        box={[72.4, 250, 640, 380]}
        fromStep={1}
        size={20}
        gap={26}
        items={[
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
          <Copy k="items" i={3} />,
        ]}
      />
      <Box box={[740, 240, 440, 178]}>
        <SporTilUtslipp />
      </Box>
      <SourceLink href="https://www.kystverket.no/klima-og-barekraft/maru/" />
    </>
  );
}

/* MarU – ML for å fylle hull i registerdata */
export function SlideMarUHull() {
  return (
    <>
      <SlideTitle height={90}>
        <Copy k="title" />
      </SlideTitle>
      <Box box={[900, 200, 320, 282]}>
        <Registerhull />
      </Box>
      <BulletList
        box={[72.4, 200, 780, 400]}
        fromStep={1}
        size={20}
        gap={28}
        items={[
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
          <Copy k="items" i={3} />,
        ]}
      />
      <Reveal at={5}>
        <Box box={[86.6, 630, 1080, 50]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            <Copy k="footer" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}

function FactRow({
  at,
  box,
  last,
  children,
}: {
  at: number;
  box: [number, number, number, number];
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal at={at}>
      <Box
        box={box}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(26),
            lineHeight: 1.25,
            color: "var(--burgundy-2)",
          }}
        >
          {children}
        </div>
        {!last && (
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              height: 1.5,
              background: "var(--divider)",
            }}
          />
        )}
      </Box>
    </Reveal>
  );
}

/* Hva kommer ut av MarU */
export function SlideMarUUt() {
  const facts: { box: [number, number, number, number] }[] = [
    { box: [628, 176, 590, 112] },
    { box: [628, 288, 590, 78] },
    { box: [628, 366, 590, 78] },
    { box: [628, 444, 590, 78] },
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
          <Copy k="title" />
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
          <Copy k="subtitle" />
        </div>
      </Box>
      <Reveal at={1}>
        <Box box={[40, 480, 560, 180]}>
          <Soyler at={1} />
        </Box>
      </Reveal>
      {facts.map(({ box }, i) => (
        <FactRow
          key={i}
          at={i + 1}
          box={box}
          last={i === facts.length - 1}
        >
          <Copy
            k="items"
            i={i}
            as="div"
            style={i === 0 ? { whiteSpace: "pre-line" } : undefined}
          />
        </FactRow>
      ))}
    </>
  );
}

/* Hvorfor observert aktivitet slår salgstall */
export function SlideMarUHvorfor() {
  return (
    <>
      <SlideTitle>
        <Copy k="title" />
      </SlideTitle>
      <Reveal at={2}>
        <Box box={[880, 210, 360, 260]}>
          <Bunkring />
        </Box>
      </Reveal>
      <BulletList
        box={[72.4, 200, 760, 380]}
        fromStep={1}
        size={20}
        gap={32}
        items={[
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
        ]}
      />
    </>
  );
}

/* Risikomodell – KystRisk */
export function SlideKystRisk() {
  return (
    <>
      <SlideTitle>
        <Copy k="title" />
      </SlideTitle>
      <Box box={[72.4, 196, 1080, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          <Copy k="lead" />
        </div>
      </Box>
      <BulletList
        box={[72.4, 250, 1100, 300]}
        fromStep={1}
        size={20}
        gap={32}
        items={[
          <Copy k="items" i={0} />,
          <Copy k="items" i={1} />,
          <Copy k="items" i={2} />,
        ]}
      />
      <Reveal at={4}>
        <Box box={[86.6, 620, 1080, 50]}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              color: "var(--red)",
            }}
          >
            <Copy k="footer" />
          </div>
        </Box>
      </Reveal>
    </>
  );
}

/* TTI: tid til inntreff per sektor, risiko 0–1 */
export function SlideKystRiskTti() {
  return (
    <>
      <Box box={[66.7, 48, 1140, 130]}>
        <Copy
          k="title"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(34),
            lineHeight: 1.15,
            color: "var(--burgundy-2)",
            whiteSpace: "pre-line",
          }}
        />
      </Box>
      <Box box={[72.4, 186, 720, 40]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(17),
            color: "var(--red)",
          }}
        >
          <Copy k="lead" />
        </div>
      </Box>
      <Box box={[40, 250, 700, 430]}>
        <RisikoSektorer />
      </Box>
      <Reveal at={1}>
        <Box box={[760, 280, 460, 320]}>
          <Copy
            k="body"
            i={0}
            as="div"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(32),
              lineHeight: 1.25,
              color: "var(--burgundy-2)",
            }}
          />
          <Copy
            k="body"
            i={1}
            as="div"
            style={{
              marginTop: 28,
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.45,
              color: "var(--burgundy)",
              whiteSpace: "pre-line",
            }}
          />
          <Copy
            k="body"
            i={2}
            as="div"
            style={{
              marginTop: 24,
              fontFamily: "var(--font-sans)",
              fontSize: pt(18),
              lineHeight: 1.45,
              color: "var(--red)",
            }}
          />
        </Box>
      </Reveal>
    </>
  );
}
