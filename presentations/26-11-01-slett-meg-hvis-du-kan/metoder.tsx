"use client";

import { Copy } from "@/components/Copy";
import { useStep } from "@/components/steps";
import { Box, BulletList, ChapterSlide, Reveal, pt } from "../parts";
import { HashFigur } from "./figurer/LineageOgHash";
import { StrekIkon } from "./figurer/ikoner";
import {
  Header,
  Kort,
  MONO,
  Notat,
  ROSA,
  Tabell,
  sans,
  serif,
  type RadTilstand,
} from "./ui";

/* Kapittel: Flere måter å slette på */
export function SlideKapMetoder() {
  return <ChapterSlide subtitle={<Copy k="subtitle" />} />;
}

/* Fire måter, med fordel og pris */
export function SlideMetoder() {
  const farger = [
    "var(--burgundy)",
    "var(--divider)",
    "var(--teal)",
    "var(--red)",
  ];
  return (
    <>
      <Header />
      {[0, 1, 2, 3].map((i) => (
        <Reveal key={i} at={i + 1}>
          <Kort box={[81.3 + i * 284, 170, 265, 420]} bar={farger[i]}>
            <div style={{ padding: "26px 24px" }}>
              <div
                style={{
                  ...serif,
                  fontSize: pt(44),
                  lineHeight: 1,
                  color: "var(--red)",
                  marginBottom: 10,
                }}
              >
                {i + 1}
              </div>
              <Copy
                k="cards"
                i={i}
                field="tittel"
                as="div"
                style={{
                  ...serif,
                  fontSize: pt(22),
                  lineHeight: 1.15,
                  color: "var(--burgundy)",
                  marginBottom: 18,
                }}
              />
              <div
                style={{
                  ...sans,
                  fontSize: pt(12),
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "var(--teal)",
                  marginBottom: 4,
                }}
              >
                <Copy k="fordel_label" />
              </div>
              <Copy
                k="cards"
                i={i}
                field="fordel"
                as="div"
                style={{
                  ...sans,
                  fontSize: pt(14),
                  lineHeight: 1.35,
                  color: "var(--burgundy)",
                  marginBottom: 16,
                }}
              />
              <div
                style={{
                  ...sans,
                  fontSize: pt(12),
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "var(--red-deep)",
                  marginBottom: 4,
                }}
              >
                <Copy k="pris_label" />
              </div>
              <Copy
                k="cards"
                i={i}
                field="pris"
                as="div"
                style={{
                  ...sans,
                  fontSize: pt(14),
                  lineHeight: 1.35,
                  color: "var(--burgundy)",
                }}
              />
            </div>
          </Kort>
        </Reveal>
      ))}
      <Reveal at={5}>
        <Notat box={[81.3, 616, 1117.3, 56]} />
      </Reveal>
    </>
  );
}

/* Oppslagstabell: fjern koblingen */
export function SlideOppslag() {
  const step = useStep();
  const kunde: RadTilstand[] = [
    "normal",
    step >= 1 ? "borte" : "markert",
    "normal",
  ];
  const kjop: RadTilstand[] = [
    "markert",
    "normal",
    "markert",
    "normal",
  ];
  return (
    <>
      <Header />
      <Tabell
        x={81.3}
        y={190}
        w={500}
        radH={44}
        size={15}
        mono
        tittel="kunde · personopplysninger"
        kolonner={["nøkkel", "navn", "e-post"]}
        bredder={[0.9, 1.3, 1.7]}
        rader={[
          ["K-19C2", "Ola Hansen", "ola@example.com"],
          ["K-7F3A", "Kari Nordmann", "kari@example.com"],
          ["K-A041", "Per Olsen", "per@example.com"],
        ]}
        tilstand={kunde}
      />
      <Box
        box={[586, 290, 100, 60]}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div
          style={{
            ...sans,
            fontSize: pt(36),
            color: step >= 1 ? "var(--red)" : "var(--burgundy)",
            fontWeight: 700,
          }}
        >
          {step >= 1 ? "✕" : "↔"}
        </div>
      </Box>
      <Tabell
        x={690}
        y={190}
        w={510}
        radH={44}
        size={15}
        mono
        tittel="kjøp · analyse"
        kolonner={["nøkkel", "dato", "beløp"]}
        bredder={[0.9, 1, 1]}
        rader={[
          ["K-7F3A", "3. mars", "249"],
          ["K-19C2", "4. mars", "89"],
          ["K-7F3A", "9. mars", "1 290"],
          ["K-A041", "11. mars", "59"],
        ]}
        tilstand={kjop}
      />
      <Reveal at={2}>
        <Box
          box={[81.3, 470, 1117.3, 110]}
          style={{
            background: ROSA,
            padding: "0 28px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Copy
            k="advarsel"
            as="div"
            style={{
              ...sans,
              fontSize: pt(18),
              lineHeight: 1.4,
              color: "var(--burgundy)",
            }}
          />
        </Box>
      </Reveal>
    </>
  );
}

/* Kryptering: slett nøkkelen */
export function SlideKrypto() {
  const step = useStep();
  const borte = step >= 2;
  const kari = (hva: string) =>
    borte ? "x7#Kq9·Lm2$vB" : hva;
  const tilstand: RadTilstand[] = [
    "normal",
    step >= 1 ? "markert" : "normal",
    step >= 1 ? "markert" : "normal",
    "normal",
  ];
  const nokler = ["Ola", "Kari", "Per"];
  return (
    <>
      <Header />
      <Tabell
        x={81.3}
        y={190}
        w={640}
        radH={44}
        size={15}
        mono
        tittel="kjøp · lagret kryptert"
        kolonner={["person", "dato", "innhold"]}
        bredder={[0.8, 0.9, 1.6]}
        rader={[
          ["Ola", "3. mars", "Kjøp, 89 kr"],
          ["Kari", "3. mars", kari("Kjøp, 249 kr")],
          ["Kari", "9. mars", kari("Kjøp, 1 290 kr")],
          ["Per", "11. mars", "Kjøp, 59 kr"],
        ]}
        tilstand={tilstand}
      />
      <Reveal at={1}>
        <Kort box={[760, 190, 440, 252]} bar="var(--teal)">
          <div style={{ padding: "22px 26px" }}>
            <Copy
              k="vault"
              as="div"
              style={{
                ...sans,
                fontSize: pt(12),
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: 14,
              }}
            />
            {nokler.map((navn) => {
              const slettet = borte && navn === "Kari";
              return (
                <div
                  key={navn}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    height: 52,
                    borderTop: "1px solid var(--cream-dark)",
                    opacity: slettet ? 0.4 : 1,
                    textDecoration: slettet ? "line-through" : "none",
                    transition: "opacity 260ms ease",
                  }}
                >
                  <StrekIkon
                    navn="nokkel"
                    size={28}
                    color={navn === "Kari" ? "var(--red-deep)" : "var(--teal)"}
                  />
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: pt(16),
                      color: "var(--burgundy)",
                    }}
                  >
                    nøkkel · {navn}
                  </span>
                </div>
              );
            })}
          </div>
        </Kort>
      </Reveal>
      <Reveal at={3}>
        <BulletList
          box={[81.3, 480, 1117, 190]}
          itemsKey="items"
          size={19}
          gap={16}
        />
      </Reveal>
    </>
  );
}

/* Hashing er ikke sletting */
export function SlideHashing() {
  return (
    <>
      <Header />
      <Box box={[81.3, 170, 1117, 330]}>
        <HashFigur />
      </Box>
      <Reveal at={2}>
        <BulletList
          box={[81.3, 520, 1117, 150]}
          itemsKey="items"
          size={19}
          gap={12}
        />
      </Reveal>
    </>
  );
}
