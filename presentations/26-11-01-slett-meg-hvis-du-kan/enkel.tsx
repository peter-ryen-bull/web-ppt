"use client";

import type { ReactNode } from "react";
import { Copy, useCopyCount } from "@/components/Copy";
import { useStep } from "@/components/steps";
import { Box, BulletList, ChapterSlide, Reveal, pt } from "../parts";
import { KariSpredning, RapportFigur } from "./figurer/Kart";
import {
  Header,
  Kode,
  Kort,
  MONO,
  Notat,
  Stempel,
  Tabell,
  sans,
  serif,
  type RadTilstand,
} from "./ui";

/* Kapittel: Den enkle løsningen */
export function SlideKapEnkel() {
  return <ChapterSlide subtitle={<Copy k="subtitle" />} />;
}

/* Én tabell, én rad, én kommando */
export function SlideNaiv() {
  const step = useStep();
  const tilstand: RadTilstand[] = [
    "normal",
    step >= 1 ? "borte" : "markert",
    "normal",
    "normal",
  ];
  return (
    <>
      <Header />
      <Tabell
        x={81.3}
        y={190}
        w={620}
        radH={46}
        size={16}
        tittel="kunde"
        kolonner={["id", "navn", "e-post", "by"]}
        bredder={[0.5, 1.4, 1.9, 1.1]}
        rader={[
          ["41", "Ola Hansen", "ola@example.com", "Bergen"],
          ["42", "Kari Nordmann", "kari@example.com", "Tromsø"],
          ["43", "Per Olsen", "per@example.com", "Oslo"],
          ["44", "Siri Berg", "siri@example.com", "Stavanger"],
        ]}
        tilstand={tilstand}
      />
      <Kode
        box={[740, 190, 460, 216]}
        size={20}
        linjer={[
          "DELETE FROM kunde",
          "WHERE id = 42;",
          "",
          step >= 1 ? "-- 1 rad slettet" : "",
        ]}
      />
      <Reveal at={2}>
        <Box box={[81.3, 500, 1117, 110]}>
          <Copy
            k="caption"
            as="div"
            style={{ ...serif, fontSize: pt(44), color: "var(--red)" }}
          />
        </Box>
      </Reveal>
      <Stempel />
    </>
  );
}

/* Kari er mange steder */
export function SlideKart() {
  return (
    <>
      <Header />
      <Box box={[81.3, 160, 1117, 440]}>
        <KariSpredning />
      </Box>
      <Reveal at={5}>
        <Notat />
      </Reveal>
      <Stempel box={[981, 602, 200, 24]} />
    </>
  );
}

/* Slack-meldingen */
export function SlideSlack() {
  const antall = useCopyCount("svar");
  const step = useStep();
  const avatar = (bokstav: string, farge: string) => (
    <div
      style={{
        width: 38,
        height: 38,
        borderRadius: 8,
        background: farge,
        color: "#fff",
        ...sans,
        fontWeight: 700,
        fontSize: pt(16),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {bokstav}
    </div>
  );
  return (
    <>
      <Header />
      <Kort box={[81.3, 170, 720, 440]} bar="var(--teal)">
        <div
          style={{
            ...sans,
            padding: "22px 20px 0",
            fontSize: pt(15),
            fontWeight: 700,
            color: "var(--burgundy)",
            paddingBottom: 12,
            borderBottom: "1.5px solid var(--cream-dark)",
          }}
        >
          # dataplattform
        </div>
        <div style={{ padding: "18px 20px", display: "flex", gap: 14 }}>
          {avatar("N", "var(--teal)")}
          <div style={{ ...sans, color: "var(--burgundy)" }}>
            <div style={{ fontSize: pt(14), marginBottom: 4 }}>
              <strong>
                <Copy k="avsender" />
              </strong>{" "}
              <span style={{ opacity: 0.55 }}>08:47</span>
            </div>
            <Copy
              k="melding"
              as="div"
              style={{ fontSize: pt(17), lineHeight: 1.4 }}
            />
          </div>
        </div>
        <div
          style={{
            margin: "0 20px 0 72px",
            paddingLeft: 16,
            borderLeft: "3px solid var(--cream-dark)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            opacity: step >= 1 ? 1 : 0,
            transition: "opacity 260ms ease",
          }}
        >
          {Array.from({ length: antall }, (_, i) => (
            <div key={i} style={{ ...sans, color: "var(--burgundy)" }}>
              <div style={{ fontSize: pt(13) }}>
                <strong>
                  <Copy k="svar" i={i} field="navn" />
                </strong>
              </div>
              <Copy
                k="svar"
                i={i}
                field="tekst"
                as="div"
                style={{ fontSize: pt(15), lineHeight: 1.35 }}
              />
            </div>
          ))}
        </div>
      </Kort>
      <Reveal at={2}>
        <Box box={[850, 200, 350, 160]}>
          <Copy
            k="poeng1"
            as="div"
            style={{
              ...serif,
              fontSize: pt(32),
              lineHeight: 1.15,
              color: "var(--red)",
            }}
          />
        </Box>
      </Reveal>
      <Reveal at={3}>
        <Box box={[850, 380, 350, 200]}>
          <Copy
            k="poeng2"
            as="div"
            style={{
              ...sans,
              fontSize: pt(20),
              lineHeight: 1.35,
              color: "var(--burgundy)",
            }}
          />
        </Box>
      </Reveal>
      <Stempel box={[600, 618, 200, 24]} />
    </>
  );
}

/* Rapporten har sin egen kopi */
export function SlideRapport() {
  return (
    <>
      <Header />
      <Box box={[81.3, 170, 1117, 150]}>
        <RapportFigur />
      </Box>
      <BulletList
        box={[81.3, 350, 1117, 290]}
        itemsKey="items"
        fromStep={1}
        size={21}
        gap={20}
      />
    </>
  );
}

/* Loggen husker det du slettet */
export function SlideLogg() {
  const step = useStep();
  const rod = { color: "var(--red-deep)", fontWeight: 700 } as const;
  const linje = (tid: string, hvem: string, tekst: ReactNode) => (
    <div
      style={{
        padding: "10px 0",
        borderTop: "1px solid var(--cream-dark)",
      }}
    >
      <div
        style={{
          ...sans,
          fontSize: pt(12),
          color: "var(--burgundy)",
          opacity: 0.6,
          marginBottom: 2,
        }}
      >
        {tid} · {hvem}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: pt(13),
          color: "var(--burgundy)",
        }}
      >
        {tekst}
      </div>
    </div>
  );
  return (
    <>
      <Header />
      <Kode
        box={[81.3, 180, 560, 232]}
        size={15}
        linjer={[
          "-- mandag 08:41",
          "SELECT * FROM kunde",
          "WHERE navn = 'Kari Nordmann';",
          "",
          "DELETE FROM kunde",
          "WHERE navn = 'Kari Nordmann';",
        ]}
      />
      <Reveal at={1}>
        <Kort box={[690, 180, 510, 290]} bar="var(--teal)">
          <div style={{ padding: "22px 24px" }}>
            <Copy
              k="logg_tittel"
              as="div"
              style={{
                ...sans,
                fontSize: pt(12),
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "var(--teal)",
                marginBottom: 10,
              }}
            />
            {linje("08:41", "ola", <>…WHERE navn = <span style={step >= 2 ? rod : undefined}>&apos;Kari Nordmann&apos;</span></>)}
            {linje("08:43", "ola", <>DELETE … navn = <span style={step >= 2 ? rod : undefined}>&apos;Kari Nordmann&apos;</span></>)}
            {linje("08:50", "saksbehandling", <>«Slett <span style={step >= 2 ? rod : undefined}>Kari Nordmann</span>»</>)}
          </div>
        </Kort>
      </Reveal>
      <Reveal at={2}>
        <Box box={[81.3, 444, 560, 80]}>
          <Copy
            k="poeng"
            as="div"
            style={{ ...serif, fontSize: pt(32), color: "var(--red)" }}
          />
        </Box>
      </Reveal>
      <Reveal at={3}>
        <Notat box={[81.3, 540, 1117.3, 70]} k="fix" />
      </Reveal>
      <Stempel box={[981, 640, 200, 24]} />
    </>
  );
}
