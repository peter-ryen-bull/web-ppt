"use client";

import { Copy, useCopyCount } from "@/components/Copy";
import { useStep } from "@/components/steps";
import { Box, BulletList, ChapterSlide, Reveal, pt } from "../parts";
import { LineageKart } from "./figurer/LineageOgHash";
import { Lesere } from "./figurer/Tidslinjer";
import { StrekIkon } from "./figurer/ikoner";
import {
  DEMPET,
  Header,
  IkonKort,
  Kort,
  MONO,
  Notat,
  Tabell,
  sans,
  serif,
  type RadTilstand,
} from "./ui";

/* Kapittel: Slik gjør du det i praksis */
export function SlideKapDrift() {
  return <ChapterSlide subtitle={<Copy k="subtitle" />} />;
}

/* Alle leser samme tabell samtidig */
export function SlideSamtidig() {
  return (
    <>
      <Header />
      <Box box={[81.3, 175, 680, 360]}>
        <Lesere />
      </Box>
      <BulletList
        box={[800, 190, 400, 400]}
        itemsKey="items"
        fromStep={1}
        size={19}
        gap={24}
      />
    </>
  );
}

/* Kilden sier ikke at noe er borte */
export function SlideNedstroms() {
  const step = useStep();
  const kilde: RadTilstand[] = [
    "normal",
    step >= 1 ? "borte" : "markert",
    "normal",
  ];
  const plattform: RadTilstand[] = ["normal", "markert", "normal"];
  const rader = [
    ["41", "Ola Hansen"],
    ["42", "Kari Nordmann"],
    ["43", "Per Olsen"],
  ];
  return (
    <>
      <Header />
      <Tabell
        x={81.3}
        y={190}
        w={430}
        radH={44}
        size={16}
        tittel="kilde: kundesystem"
        kolonner={["id", "navn"]}
        bredder={[0.5, 1.5]}
        rader={rader}
        tilstand={kilde}
      />
      <Reveal at={2}>
        <Box
          box={[530, 200, 240, 200]}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div style={{ ...sans, fontSize: pt(36), color: "var(--burgundy)" }}>→</div>
          <Copy
            k="lasting"
            as="div"
            style={{
              ...sans,
              fontSize: pt(15),
              lineHeight: 1.3,
              color: "var(--burgundy)",
            }}
          />
          <Copy
            k="resultat"
            as="div"
            style={{
              fontFamily: MONO,
              fontSize: pt(15),
              fontWeight: 700,
              color: "var(--red-deep)",
            }}
          />
        </Box>
      </Reveal>
      <Tabell
        x={770}
        y={190}
        w={430}
        radH={44}
        size={16}
        tittel="plattformen: renset"
        kolonner={["id", "navn"]}
        bredder={[0.5, 1.5]}
        rader={rader}
        tilstand={plattform}
      />
      <Reveal at={3}>
        <BulletList
          box={[81.3, 440, 1117, 210]}
          itemsKey="items"
          size={20}
          gap={18}
        />
      </Reveal>
    </>
  );
}

/* Fra e-post til bekreftet sletting */
export function SlideBestilling() {
  const ikoner = ["innboks", "person", "sok", "kryss", "konvolutt", "bok"] as const;
  const x = [81.3, 473.8, 866.3];
  return (
    <>
      <Header />
      {ikoner.map((ikon, i) => (
        <Reveal key={i} at={i + 1}>
          <IkonKort
            box={[x[i % 3], i < 3 ? 170 : 400, 352, 210]}
            i={i}
            ikon={ikon}
            titleSize={21}
            textSize={14}
            bar={i === 3 ? "var(--red)" : "var(--burgundy)"}
          />
        </Reveal>
      ))}
    </>
  );
}

/* Sletteregisteret */
export function SlideSletteregister() {
  const antall = useCopyCount("konsumenter");
  return (
    <>
      <Header />
      <Tabell
        x={81.3}
        y={190}
        w={520}
        radH={44}
        size={15}
        mono
        tittel="sletteregister"
        kolonner={["nøkkel", "mottatt", "ferdig"]}
        bredder={[1, 1, 1]}
        rader={[
          ["K-7F3A", "12. mars", "13. mars"],
          ["K-C310", "2. april", "2. april"],
        ]}
      />
      <BulletList
        box={[81.3, 380, 520, 280]}
        itemsKey="items"
        fromStep={1}
        size={18}
        gap={18}
      />
      <Reveal at={2}>
        <Kort box={[650, 190, 550, 380]} bar="var(--teal)">
          <div style={{ padding: "24px 28px" }}>
            <Copy
              k="konsumenter_tittel"
              as="div"
              style={{
                ...sans,
                fontSize: pt(12),
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: 12,
              }}
            />
            {Array.from({ length: antall }, (_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  minHeight: 62,
                  borderTop: "1px solid var(--cream-dark)",
                }}
              >
                <StrekIkon navn="skjold" size={28} />
                <Copy
                  k="konsumenter"
                  i={i}
                  as="div"
                  style={{
                    ...sans,
                    fontSize: pt(17),
                    lineHeight: 1.3,
                    color: "var(--burgundy)",
                  }}
                />
              </div>
            ))}
          </div>
        </Kort>
      </Reveal>
    </>
  );
}

/* Lineage: hva verktøyet ser – og ikke ser */
export function SlideLineage() {
  return (
    <>
      <Header />
      <Box box={[81.3, 170, 1117, 360]}>
        <LineageKart />
      </Box>
      <Reveal at={2}>
        <Box box={[101.3, 372, 720, 100]}>
          <Copy
            k="merking"
            as="div"
            style={{
              ...sans,
              fontSize: pt(17),
              lineHeight: 1.4,
              color: DEMPET,
            }}
          />
        </Box>
      </Reveal>
      <Reveal at={3}>
        <Notat box={[81.3, 570, 1117.3, 76]} />
      </Reveal>
    </>
  );
}

function ListeKort({
  box,
  tittelK,
  itemsK,
  bar,
  ikon,
}: {
  box: [number, number, number, number];
  tittelK: string;
  itemsK: string;
  bar: string;
  ikon: "skjold" | "varsel";
}) {
  const antall = useCopyCount(itemsK);
  return (
    <Kort box={box} bar={bar}>
      <div style={{ padding: "24px 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <StrekIkon navn={ikon} size={34} color={bar} />
          <Copy
            k={tittelK}
            as="div"
            style={{ ...serif, fontSize: pt(24), color: "var(--burgundy)" }}
          />
        </div>
        {Array.from({ length: antall }, (_, i) => (
          <div
            key={i}
            style={{
              borderTop: "1px solid var(--cream-dark)",
              padding: "12px 0",
            }}
          >
            <Copy
              k={itemsK}
              i={i}
              as="div"
              style={{
                ...sans,
                fontSize: pt(17),
                lineHeight: 1.35,
                color: "var(--burgundy)",
              }}
            />
          </div>
        ))}
      </div>
    </Kort>
  );
}

/* Hva verktøy gjør – og ikke gjør */
export function SlideVerktoy() {
  return (
    <>
      <Header />
      <Reveal at={1}>
        <ListeKort
          box={[81.3, 170, 545, 338]}
          tittelK="hjelper_tittel"
          itemsK="hjelper"
          bar="var(--teal)"
          ikon="skjold"
        />
      </Reveal>
      <Reveal at={2}>
        <ListeKort
          box={[653.3, 170, 545, 338]}
          tittelK="hjelper_ikke_tittel"
          itemsK="hjelper_ikke"
          bar="var(--red)"
          ikon="varsel"
        />
      </Reveal>
      <Reveal at={3}>
        <Notat box={[81.3, 530, 1117.3, 110]} k="eksempler" />
      </Reveal>
    </>
  );
}
