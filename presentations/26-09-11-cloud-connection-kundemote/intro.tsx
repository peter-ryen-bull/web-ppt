"use client";

import { Box, Img, pt } from "../parts";
import { Body, Card, Header, Label, MEDIA, Stack } from "./ui";

export function SlideForside() {
  return (
    <>
      <Box box={[39, 49.1, 832, 160]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: pt(25),
            lineHeight: 1.25,
            color: "var(--burgundy)",
          }}
        >
          Struktur og oversikt med en moderne dataplattform
        </div>
      </Box>
      <Box box={[816.2, 47.9, 400, 80]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.4,
            color: "var(--red)",
            textAlign: "right",
          }}
        >
          Cloud Connection
          <br />
          11. september 2026
        </div>
      </Box>
      <Img
        box={[39, 423.2, 822.5, 254.7]}
        src={`${MEDIA}/miles-wordmark.svg`}
        alt="Miles"
      />
    </>
  );
}

export function SlideMyeData() {
  return (
    <>
      <Header kicker="BAKGRUNN · 1 AV 3" title="Mye data – for lite innsikt" />
      <Card box={[81.3, 168, 1117.3, 421.3]} bar="var(--burgundy)">
        <Box box={[24, 29.3, 1066.7, 362.7]}>
          <Stack
            title="DAGENS SITUASJON"
            gap={16}
            size={18}
            items={[
              "Data spredt på flere systemer med begrenset integrasjon",
              "Manglende felles KPI-rammeverk og ulik beregning av nøkkeltall",
              "Mangler felles sannhetskilde for kunde-, produkt- og inntektsdata",
              "Kundeøkonomi og utvikling er vanskelig å følge på tvers",
              "Begrenset intern kapasitet til å bygge og forvalte",
            ]}
          />
        </Box>
      </Card>
    </>
  );
}

export function SlideMerTid() {
  return (
    <>
      <Header
        kicker="BAKGRUNN · 2 AV 3"
        title="Mer tid på dataarbeid enn på analyse"
      />
      <Card box={[81.3, 168, 1117.3, 421.3]} bar="var(--red-deep)">
        <Box box={[24, 29.3, 1066.7, 362.7]}>
          <Stack
            title="KONSEKVENSER"
            titleColor="var(--red-deep)"
            gap={16}
            size={18}
            items={[
              "Analyser krever manuelle uttrekk og datavask",
              "Nye problemstillinger krever nye modeller",
              "Innsikt er ikke løpende tilgjengelig",
              "Lav selvbetjening gir personavhengighet og lang ledetid",
              "Mer tid på dataarbeid enn på analyse og handling",
            ]}
          />
        </Box>
      </Card>
    </>
  );
}

export function SlideBehovet() {
  return (
    <>
      <Header
        kicker="BAKGRUNN · 3 AV 3"
        title="Behovet: ett felles datagrunnlag"
      />
      <Card box={[81.3, 168, 1117.3, 421.3]} bar="var(--teal)">
        <Box box={[24, 29.3, 1066.7, 362.7]}>
          <Stack
            title="STRATEGISK BEHOV"
            titleColor="var(--teal)"
            gap={16}
            size={18}
            items={[
              "Felles datagrunnlag med finansielle og operasjonelle data",
              "Felles KPI-definisjoner og konsistent historikk",
              "Automatiserte analyser for operasjonell styring",
              "Lavere risiko i due diligence og salgsprosess",
              "Datadrevet equity story – uten verdsettelsesrabatt",
            ]}
          />
        </Box>
      </Card>
      <Box box={[81.3, 626.7, 1117.3, 58.7]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(16),
            lineHeight: 1.35,
            color: "var(--burgundy)",
          }}
        >
          → Redusere «black box» og gjøre verdidriverne målbare, sporbare og
          beslutningsrelevante
        </div>
      </Box>
    </>
  );
}

export function SlideMalbilde() {
  return (
    <>
      <Header
        kicker="MÅLBILDE"
        title="Fra ad-hoc uttrekk til kvalitetssikrede dataprodukter"
      />
      <Card box={[81.3, 168, 546.7, 306.7]} bar="var(--red-deep)">
        <Box box={[24, 29.3, 498.7, 261.3]}>
          <Stack
            title="I DAG"
            titleColor="var(--red-deep)"
            gap={8}
            size={14}
            items={[
              "Manuelle uttrekk og datavask",
              "Regneark og rapporter som blir utdaterte",
              "Spredt datagrunnlag – vanskelig å se data på tvers",
              "Lav sporbarhet fra tall til kilde",
              "Tilgang gis ad hoc, per person",
              "Kostnader og forbruk kan bli uoversiktlig",
            ]}
          />
        </Box>
      </Card>
      <Box
        box={[624, 296, 32, 42.7]}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--burgundy)",
          fontSize: pt(22),
        }}
      >
        →
      </Box>
      <Card box={[652, 168, 546.7, 306.7]} bar="var(--teal)">
        <Box box={[24, 29.3, 498.7, 261.3]}>
          <Stack
            title="MÅLBILDE"
            titleColor="var(--teal)"
            gap={6}
            size={14}
            items={[
              "Dokumenterte datasett (dataprodukter) som er data du kan stole på",
              "Felles KPI-lag med versjonert historikk",
              "PowerBI-rapporter bygges på felles datagrunnlag",
              "Chatte med egne data ved hjelp av LLM",
              "Sporbarhet og auditlogger i alle transaksjoner",
              "Tilgang styrt av policy og roller",
              "Forbruk og kostnad synlig og fordelt per domene",
            ]}
          />
        </Box>
      </Card>
      <Box box={[81.3, 501.3, 800, 29.3]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            letterSpacing: 1.2,
            color: "var(--red)",
          }}
        >
          BÆRENDE PRINSIPPER
        </div>
      </Box>
      {(
        [
          [81.3, "Domeneeierskap", "Domenene eier og forvalter sine egne data"],
          [
            365.3,
            "Data som produkt",
            "Kvalitetssikret, dokumentert og gjenbrukbart",
          ],
          [
            649.3,
            "Selvbetjening",
            "Plattformen er selvbetjent, og man jobber aktivt mot flaskehalser",
          ],
          [
            933.3,
            "Innebygd styring",
            "Sikkerhet, logging og etterlevelse er integrert i flyten",
          ],
        ] as const
      ).map(([x, title, body]) => (
        <Card key={title} box={[x, 538.7, 262.7, 138.7]}>
          <Box box={[21.4, 18.6, 220, 101.3]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Label size={15}>{title}</Label>
              <Body size={14}>{body}</Body>
            </div>
          </Box>
        </Card>
      ))}
    </>
  );
}
