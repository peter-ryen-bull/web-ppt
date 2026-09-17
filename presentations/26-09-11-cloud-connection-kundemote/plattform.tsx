"use client";

import { Box, pt } from "../parts";
import {
  Body,
  Caption,
  Card,
  DarkPanel,
  Header,
  Label,
  MUTED,
  Pill,
  RowLabel,
  WhyList,
} from "./ui";

function SourceCard({
  box,
  title,
  sub,
}: {
  box: [number, number, number, number];
  title: string;
  sub: string;
}) {
  return (
    <Card box={box}>
      <Box
        box={[21.4, 21.4, 34.7, 34.7]}
        style={{ background: "var(--teal)" }}
      />
      <Box
        box={[21.4, 58.7, 13.3, 5.3]}
        style={{ background: "var(--mint)" }}
      />
      <Box box={[69.4, 18.7, 197.3, 64]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Label size={15}>{title}</Label>
          <Body size={14}>{sub}</Body>
        </div>
      </Box>
    </Card>
  );
}

function Connector({
  box,
}: {
  box: [number, number, number, number];
}) {
  return (
    <Box
      box={box}
      style={{
        borderTop: "1.5px solid #A8907C",
      }}
    />
  );
}

export function SlideOversikt() {
  return (
    <>
      <Header kicker="OVERSIKT" title="Dataplattformen" titleSize={24} />
      <Box box={[53.3, 122.7, 285.3, 40]}>
        <Label size={14} color="var(--teal)">
          KILDER OG INNHENTING
        </Label>
      </Box>
      <Box box={[984, 122.7, 242.7, 40]} style={{ textAlign: "right" }}>
        <Label size={14} color="var(--teal)">
          VERDI OG BRUK
        </Label>
      </Box>

      <SourceCard
        box={[53.3, 181.3, 285.3, 96]}
        title="Driftssystemer"
        sub="ERP · CRM · fagsystem"
      />
      <SourceCard
        box={[53.3, 293.3, 285.3, 96]}
        title="API"
        sub="tjenester · integrasjoner"
      />
      <SourceCard
        box={[53.3, 405.3, 285.3, 96]}
        title="Filer"
        sub="dokumenter · eksporter"
      />
      <SourceCard
        box={[53.3, 517.3, 285.3, 96]}
        title="Sensor og IoT"
        sub="målinger · telemetri"
      />

      <Connector box={[341.3, 228, 56, 1]} />
      <Connector box={[341.3, 340, 56, 1]} />
      <Connector box={[341.3, 452, 56, 1]} />
      <Connector box={[341.3, 564, 56, 1]} />

      <Box
        box={[400, 181.3, 480, 432]}
        style={{
          background: "var(--teal)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "61.4px 26.7px 26.7px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(32),
            color: "#fff",
            textAlign: "center",
          }}
        >
          Dataplattform
        </div>
        <div
          style={{
            width: 66.7,
            height: 4,
            background: "var(--mint)",
            margin: "20px 0 20px",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            color: "#D8EDEA",
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          Ett felles sannhetslag for hele virksomheten.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14.7,
            width: "100%",
          }}
        >
          {["LAGRING", "PROSESSERING", "PUBLISERING", "STYRING"].map((t) => (
            <div
              key={t}
              style={{
                background: "rgba(120, 232, 219, 0.18)",
                color: "var(--mint)",
                fontFamily: "var(--font-sans)",
                fontSize: pt(14),
                letterSpacing: 0.6,
                height: 42.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </Box>

      <Connector box={[882.7, 228, 56, 1]} />
      <Connector box={[882.7, 340, 56, 1]} />
      <Connector box={[882.7, 452, 56, 1]} />
      <Connector box={[882.7, 564, 56, 1]} />

      <SourceCard
        box={[941.3, 181.3, 285.3, 96]}
        title="Automatisering"
        sub="agenter · integrasjoner"
      />
      <SourceCard
        box={[941.3, 293.3, 285.3, 96]}
        title="Applikasjoner"
        sub="app · innbyggerflate"
      />
      <SourceCard
        box={[941.3, 405.3, 285.3, 96]}
        title="Innsikt og analyse"
        sub="dashboard · KI-chat"
      />
      <SourceCard
        box={[941.3, 517.3, 285.3, 96]}
        title="Maskinlæring"
        sub="prediksjon · modeller"
      />

      {(
        [
          [53.3, "OVERVÅKING OG FORVALTNING"],
          [453.3, "INFRASTRUKTUR OG SIKKERHET"],
          [853.3, "SAMHANDLING OG METODIKK"],
        ] as const
      ).map(([x, text]) => (
        <Box
          key={text}
          box={[x, 640, 373.3, 48]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Label size={14} color="var(--burgundy)">
            {text}
          </Label>
        </Box>
      ))}
    </>
  );
}

function CapabilityRow({
  y,
  bar,
  label,
  pills,
  caption,
  left = 81.3,
}: {
  y: number;
  bar: string;
  label: string;
  pills: [number, string][];
  caption?: string;
  left?: number;
}) {
  const h = caption ? 116 : 77.3;
  return (
    <>
      <Card box={[left, y, 840, h]} bar={bar} barSide="left">
        <RowLabel box={[24, 0, 173.3, h]}>{label}</RowLabel>
      </Card>
      {pills.map(([x, text]) => (
        <Pill key={text} box={[x, y + (caption ? 13.4 : 16), 196, 45.3]}>
          {text}
        </Pill>
      ))}
      {caption && <Caption box={[left + 205.4, y + 66.7, 614.7, 37.3]}>{caption}</Caption>}
    </>
  );
}

export function SlideLagring() {
  return (
    <>
      <Header
        kicker="PLATTFORM"
        title="Lagring – arkiv, struktur og lagring med governance"
        lead="Ett felles, styrt datalag."
        titleSize={24}
      />
      <DarkPanel box={[49.3, 224.9, 261.3, 357.3]}>
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 16,
          }}
        >
          <Body size={15} color="#fff">
            Billig lagring
          </Body>
          <Body size={15} color="#fff">
            Åpne formater
          </Body>
          <Body size={15} color="#fff">
            Sikret backup
          </Body>
        </div>
      </DarkPanel>
      <CapabilityRow
        y={224.9}
        left={358.7}
        bar="var(--burgundy)"
        label="Stegvis lagring"
        pills={[
          [564, "Bronse – arkiv"],
          [773.3, "Sølv – prosessert"],
          [982.7, "Gull – dataprodukt"],
        ]}
      />
      <CapabilityRow
        y={365.8}
        left={358.7}
        bar="var(--teal)"
        label="GOVERNANCE"
        pills={[
          [564, "Katalog og eierskap"],
          [773.3, "Tilgang og roller"],
          [982.7, "Lineage og audit"],
        ]}
      />
      <CapabilityRow
        y={504.9}
        left={358.7}
        bar="var(--teal)"
        label="BACKUP"
        pills={[
          [564, "Versjonering"],
          [773.3, "Replika og snapshot"],
          [982.7, "Gjenoppretting"],
        ]}
      />
    </>
  );
}

export function SlideProsessering() {
  return (
    <>
      <Header
        kicker="PLATTFORM"
        title="Prosessering – fra rådata til dataprodukt"
        lead="Automatiserte og testede pipelines som kjører likt hver gang."
        titleSize={24}
      />
      <CapabilityRow
        y={189.3}
        bar="var(--burgundy)"
        label="INNHENTING"
        pills={[
          [286.7, "Batch og strøm"],
          [496, "ELT-mønster"],
          [705.3, "Landingssone"],
        ]}
        caption="Kilder hentes uten å endre rådata."
      />
      <CapabilityRow
        y={316}
        bar="var(--teal)"
        label="MODELLERING"
        pills={[
          [286.7, "Bronse til sølv"],
          [496, "Forretningslogikk"],
          [705.3, "Inkrementelt"],
        ]}
        caption="Modellert i kode og versjonert i Git."
      />
      <CapabilityRow
        y={442.7}
        bar="var(--teal)"
        label="KVALITET"
        pills={[
          [286.7, "Datatester"],
          [496, "Overvåking"],
          [705.3, "Varsling"],
        ]}
        caption="Avvik oppdages før de når konsumentene."
      />
      <DarkPanel box={[937.3, 189.3, 261.3, 496]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 200 }}>
          {[
            "Versjonskontrollert",
            "Batch og streaming",
            "Automatisert",
            "KI i dataflyten",
          ].map((t) => (
            <Body key={t} size={14} color="#fff">
              {t}
            </Body>
          ))}
        </div>
      </DarkPanel>
    </>
  );
}

export function SlidePublisering() {
  return (
    <>
      <Header
        kicker="PLATTFORM"
        title="Publisering – til forretning og bruk"
        lead="Data gjort tilgjengelig der brukerne faktisk jobber."
        titleSize={24}
      />
      <WhyList
        box={[58.4, 185.9, 320, 496]}
        items={[
          "Én sannhet",
          "Selvbetjening",
          "Mindre ad hoc",
          "Målbar verdi",
          "Kostnadskontroll",
          "Klar for KI",
        ]}
      />
      <Card box={[405.8, 185.3, 840, 263.1]} bar="var(--teal)" barSide="left">
        <div
          style={{
            height: "100%",
            display: "flex",
            gap: 18,
            padding: "36px 28px 24px 28px",
          }}
        >
          <div
            style={{
              width: 130,
              display: "flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              fontWeight: 700,
              letterSpacing: 0.4,
              color: "var(--burgundy)",
            }}
          >
            KANALER
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              {[
                "BI og rapporter",
                "Selvbetjening",
                "Chat med data",
                "Koble KI på samme data",
                "Apper og systemer",
                "API",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    background: "var(--cream)",
                    minHeight: 45,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 10px",
                    fontFamily: "var(--font-sans)",
                    fontSize: pt(14),
                    color: "var(--burgundy)",
                    textAlign: "center",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(14),
                color: MUTED,
              }}
            >
              Samme tall uansett hvor de konsumeres.
            </div>
          </div>
        </div>
      </Card>
      <Card box={[405.8, 460.4, 840, 220.9]} bar="var(--teal)" barSide="left">
        <div
          style={{
            height: "100%",
            display: "flex",
            gap: 18,
            padding: "36px 28px 24px 28px",
          }}
        >
          <div
            style={{
              width: 130,
              display: "flex",
              alignItems: "center",
              fontFamily: "var(--font-sans)",
              fontSize: pt(14),
              fontWeight: 700,
              letterSpacing: 0.4,
              color: "var(--burgundy)",
            }}
          >
            STATISTIKK
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
              }}
            >
              {[
                "Bruksstatistikk",
                "Kostnad per produkt",
                "Tilbakemeldinger",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    background: "var(--cream)",
                    minHeight: 45,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 10px",
                    fontFamily: "var(--font-sans)",
                    fontSize: pt(14),
                    color: "var(--burgundy)",
                    textAlign: "center",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: pt(14),
                color: MUTED,
              }}
            >
              Vi ser hva som brukes – og hva som kan avvikles.
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export function SlideStyring() {
  return (
    <>
      <Header
        kicker="PLATTFORM"
        title="Styring – eierskap, tilgang og etterlevelse"
        lead="Felles spilleregler for data, uansett kilde og konsument."
        titleSize={24}
      />
      <CapabilityRow
        y={189.3}
        bar="var(--burgundy)"
        label="EIERSKAP"
        pills={[
          [286.7, "Domeneeier"],
          [496, "Datakontrakt"],
          [705.3, "SLA og ansvar"],
        ]}
        caption="Hvert datasett har en navngitt eier."
      />
      <CapabilityRow
        y={316}
        bar="var(--teal)"
        label="TILGANG"
        pills={[
          [286.7, "Roller og grupper"],
          [496, "Rad- og kolonnenivå"],
          [705.3, "Tidsbegrenset"],
        ]}
        caption="Minste nødvendige tilgang, styrt sentralt."
      />
      <CapabilityRow
        y={442.7}
        bar="var(--red-deep)"
        label="REGELVERK"
        pills={[
          [286.7, "Personvern og GDPR"],
          [496, "Klassifisering"],
          [705.3, "Sletteregler"],
        ]}
        caption="Krav dokumentert og teknisk håndhevet."
      />
      <CapabilityRow
        y={569.3}
        bar="var(--teal)"
        label="SPORBARHET"
        pills={[
          [286.7, "Lineage"],
          [496, "Oversikt"],
          [705.3, "Logg og audit"],
        ]}
        caption="Alltid mulig å svare på hvor tallet kommer fra."
      />
      <WhyList
        box={[937.3, 189.3, 261.3, 496]}
        items={[
          "Tillit til tallene",
          "Trygg deling",
          "Revisjonsklart",
          "Raskere onboarding",
        ]}
      />
    </>
  );
}
