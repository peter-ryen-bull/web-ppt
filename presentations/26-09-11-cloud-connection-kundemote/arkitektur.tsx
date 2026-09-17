"use client";

import { Box, Img, pt } from "../parts";
import {
  Body,
  Card,
  DarkPanel,
  FooterNote,
  Header,
  Label,
  MEDIA,
  PinkCard,
  Stack,
} from "./ui";

export function SlideDomener() {
  return (
    <>
      <Header kicker="ARKITEKTUR" title="Domeneoppdeling og eierskap" titleSize={28} />
      <DarkPanel box={[81.3, 168, 400, 453.3]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Label size={14} color="var(--mint)">
            Domener
          </Label>
          {[
            "Hvert domene eier og forvalter sin data",
            "Domener er ikke flaskehals for hverandre",
            "Kjører på felles infrastruktur med separert data",
            "Data publiseres og deles mellom domener, med en tydelig eier",
            "Kostnader fordeles per domene",
          ].map((t) => (
            <Body key={t} size={14} color="var(--mint)">
              {t}
            </Body>
          ))}
        </div>
      </DarkPanel>
      {(
        [
          [505.3, 168, "ERP NO", "Eier: Driftsleder Norge"],
          [865.3, 168, "CRM / salg & support", "Eier: Produktsjef\nChurn, marginer, bruk"],
          [505.3, 402.7, "Konsernfunksjoner", "Eier: CFO\nHR, finans, ordre, IT"],
          [865.3, 402.7, "ERP SE", "Eier: Driftsleder Sverige\nKapasitet"],
        ] as const
      ).map(([x, y, title, body]) => (
        <Card key={title} box={[x, y, 333.3, 218.7]} bar="var(--red-deep)">
          <Box box={[24, 29.3, 285.3, 170.7]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Label size={16}>{title}</Label>
              {body.split("\n").map((line) => (
                <Body key={line} size={14}>
                  {line}
                </Body>
              ))}
            </div>
          </Box>
        </Card>
      ))}
      <FooterNote>Domeneoppdeling fjerner flaskehalser</FooterNote>
    </>
  );
}

function Cylinder({
  box,
  label,
}: {
  box: [number, number, number, number];
  label: string;
}) {
  const [, , w, h] = box;
  return (
    <Box box={box}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        aria-hidden
        style={{ display: "block" }}
      >
        <ellipse cx={w / 2} cy={16} rx={w / 2 - 2} ry={16} fill="var(--teal)" />
        <rect x={2} y={16} width={w - 4} height={h - 32} fill="var(--teal)" />
        <ellipse
          cx={w / 2}
          cy={h - 16}
          rx={w / 2 - 2}
          ry={16}
          fill="#003238"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sans)",
          fontSize: pt(13),
          fontWeight: 700,
          color: "#fff",
          textAlign: "center",
          padding: 8,
        }}
      >
        {label}
      </div>
    </Box>
  );
}

export function SlideDatadeling() {
  return (
    <>
      <Header kicker="ARKITEKTUR" title="Datadeling mellom domener" titleSize={28} />
      <Cylinder box={[82.2, 153.8, 95.6, 120.9]} label="" />
      <Box box={[203.6, 199, 213.3, 40]}>
        <Label>ERP NO</Label>
      </Box>
      <Cylinder box={[81.3, 290.5, 95.6, 120.9]} label="" />
      <Box box={[202.7, 335.7, 213.3, 40]}>
        <Label>ERP SE</Label>
      </Box>
      <Cylinder box={[82.2, 433.3, 95.6, 120.9]} label="" />
      <Box box={[202.7, 480.5, 257.8, 38.8]}>
        <Label>CRM</Label>
      </Box>
      <Cylinder box={[82.2, 576, 95.6, 120.9]} label="" />
      <Box box={[203.6, 624, 213.3, 40]}>
        <Label>Konsern</Label>
      </Box>

      <svg
        style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
        width={1280}
        height={720}
        aria-hidden
      >
        <line x1={306.7} y1={214} x2={346.7} y2={214} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={306.7} y1={351.3} x2={346.7} y2={351.3} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={306.7} y1={494} x2={346.7} y2={494} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={306.7} y1={636.7} x2={346.7} y2={636.7} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={346.7} y1={214} x2={346.7} y2={636.7} stroke="var(--burgundy)" strokeWidth={2} />
        <line x1={346.7} y1={424} x2={507.3} y2={424} stroke="var(--burgundy)" strokeWidth={2} />
        <polygon points="507,419 518,424 507,429" fill="var(--burgundy)" />
        <line x1={682.5} y1={424} x2={845.5} y2={424} stroke="var(--burgundy)" strokeWidth={2} />
        <polygon points="845,419 856,424 845,429" fill="var(--burgundy)" />
      </svg>

      <Box
        box={[529.2, 382.7, 153.3, 85.3]}
        style={{
          background: "var(--red)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(12),
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Datakontrakter
        </div>
      </Box>

      <Cylinder box={[845.5, 281.2, 225.5, 241.9]} label="Dataprodukter" />
    </>
  );
}

export function SlideDataprodukter() {
  const cards = [
    [81.3, 189.3, "var(--teal)", "Eier og team", "Navngitt eier i domenet med ansvar for innhold og kvalitet"],
    [462.7, 189.3, "var(--red-deep)", "Datakontrakt", "Skjema, frekvens, SLA og klassifisering er avtalt"],
    [844, 189.3, "var(--teal)", "Kvalitet og tester", "Automatiske tester kjøres ved hver oppdatering"],
    [81.3, 362.7, "var(--red-deep)", "Dokumentasjon", "Formål, definisjoner, KPI-logikk og lineage i katalogen"],
    [462.7, 362.7, "var(--teal)", "Tilgang og deling", "Tilgang gis til roller, ikke personer, og logges"],
    [844, 362.7, "var(--red-deep)", "Livsløp og versjon", "Versjonert historikk, endringsvarsel og utfasing"],
  ] as const;

  return (
    <>
      <Header kicker="ARKITEKTUR" title="Dataprodukter" titleSize={28} />
      <Box box={[81.3, 133.3, 1117.3, 32]}>
        <Body size={15}>
          Et dataprodukt er et tall eller datasett som er kvalitetssikret, og
          derfor kan stoles på
        </Body>
      </Box>
      {cards.map(([x, y, bar, title, body]) => (
        <Card key={title} box={[x, y, 354.7, 157.3]} bar={bar}>
          <Box box={[24, 26.7, 306.7, 117.3]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Label size={15}>{title}</Label>
              <Body size={14}>{body}</Body>
            </div>
          </Box>
        </Card>
      ))}
      <Box
        box={[81.3, 546.7, 1117.3, 157.3]}
        style={{ background: "var(--burgundy)", padding: "18.6px 24px" }}
      >
        <Label size={14} color="var(--mint)">
          Dataprodukt:
        </Label>
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: 12,
            marginTop: 14,
          }}
        >
          {[
            "Ordre- og fakturadata",
            "Transformering, kvalitetssikring og sammenstilling",
            "Dataprodukt med eier: «ARR across all value streams»",
            "Dashboards, rapporter, analyser og KI",
          ].map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(14),
                  lineHeight: 1.3,
                  padding: "12px 14px",
                  minHeight: 72,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {t}
              </div>
              {i < 3 && (
                <div style={{ color: "var(--mint)", fontSize: pt(18) }}>→</div>
              )}
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

export function SlideDatakontrakter() {
  return (
    <>
      <Header
        kicker="ARKITEKTUR"
        title="Datakontrakter – avtalen mellom produsent og konsument"
        titleSize={28}
      />
      <Card box={[81.3, 168, 533.3, 394.7]} bar="var(--burgundy)">
        <Box box={[24, 29.3, 485.3, 346.7]}>
          <Stack
            title="DETTE STÅR I EN DATAKONTRAKT"
            gap={12}
            size={14}
            items={[
              "Skjema og datatyper – felter, format, nøkler",
              "Eier og konsumenter – hvem leverer, hvem bruker",
              "Frekvens og SLA – når kommer data, hvor ofte",
              "Kvalitetskrav – terskler for feil og avvik",
              "Klassifisering – personopplysninger og sensitivitet",
              "Versjonering – endringsvarsel og bakoverkompatibilitet",
            ]}
          />
        </Box>
      </Card>
      <Box
        box={[652, 168, 546.7, 394.7]}
        style={{ background: "var(--teal)", padding: "29.3px 26.7px" }}
      >
        <Label size={14} color="var(--mint)">
          EKSEMPEL
        </Label>
        <pre
          style={{
            marginTop: 16,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
            fontSize: pt(14),
            lineHeight: 1.55,
            color: "var(--mint)",
            whiteSpace: "pre-wrap",
          }}
        >
          {`produkt:        kunde.kundemaster
eier:           Kundedomenet
frekvens:       daglig kl. 06:00
sla:            99,5 % innen kl. 07:00
kvalitet:       unik kunde_id, orgnr uten null
klassifisering: personopplysninger
versjon:        2.1 – 30 dagers endringsvarsel`}
        </pre>
      </Box>
      <PinkCard
        box={[81.3, 589.3, 354.7, 114.7]}
        title="Endringer er versjonert og kvalitetssikret"
        body="Kontrakten testes automatisk ved hver kjøring, og endringer versjoneres"
      />
      <PinkCard
        box={[462.7, 589.3, 354.7, 114.7]}
        title="Tydelig ansvar"
        body="Eier svarer for kvalitet, konsument for bruk"
      />
      <PinkCard
        box={[844, 589.3, 354.7, 114.7]}
        title="Tydelig tilgangsstyring"
        body="Kontrakten inneholder tilgangsregler"
      />
    </>
  );
}

export function SlideDatakvalitet() {
  const tester = [
    [189.3, "Skjematester", "Felter, datatyper og nøkler finnes og er som avtalt"],
    [290.7, "Integritetstester", "Unike nøkler, gyldige referanser, ingen tomme verdier"],
    [392, "Forretningsregler", "Summer stemmer, KPI-er ligger innenfor forventet intervall"],
    [493.3, "Ferskhet og volum", "Data kom til rett tid og i forventet mengde"],
  ] as const;
  const feil = [
    "Kjøringen stopper før data publiseres",
    "Eier i domenet varsles automatisk",
    "Konsumenter ser status i katalogen",
    "Avviket logges og følges opp i governance-forum",
  ];

  return (
    <>
      <Header kicker="ARKITEKTUR" title="Datakvalitet og datatester" titleSize={28} />
      <Box box={[81.3, 149.3, 613.3, 29.3]}>
        <Label size={14}>FIRE LAG AV TESTER I HVER PIPELINE</Label>
      </Box>
      {tester.map(([y, title, body]) => (
        <Card key={title} box={[81.3, y, 613.3, 88]} bar="var(--teal)" barSide="left">
          <Box box={[29.4, 16, 560, 61.3]}>
            <Label size={15}>{title}</Label>
            <Body size={14}>{body}</Body>
          </Box>
        </Card>
      ))}
      <Box box={[732, 149.3, 466.7, 29.3]}>
        <Label size={14}>NÅR EN TEST FEILER</Label>
      </Box>
      <DarkPanel box={[732, 189.3, 466.7, 405.3]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {feil.map((t, i) => (
            <div key={t} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 42.7,
                  height: 42.7,
                  borderRadius: 21,
                  background: "var(--mint)",
                  color: "var(--teal)",
                  fontFamily: "var(--font-sans)",
                  fontSize: pt(15),
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <Body size={14} color="#fff">
                {t}
              </Body>
            </div>
          ))}
        </div>
      </DarkPanel>
      <PinkCard
        box={[81.3, 616, 354.7, 88]}
        title="Testdekning"
        body="Andel dataprodukter med aktive tester"
      />
      <PinkCard
        box={[462.7, 616, 354.7, 88]}
        title="Kjøringer uten avvik"
        body="Målt per uke og per domene"
      />
      <PinkCard
        box={[844, 616, 354.7, 88]}
        title="Tid til retting"
        body="Fra varsel til publisert korreksjon"
      />
    </>
  );
}

export function SlideDeling() {
  return (
    <>
      <Header
        kicker="ARKITEKTUR"
        title="Deling, tilgang og kostnadsfordeling"
        titleSize={28}
      />
      <Card box={[81.3, 168, 533.3, 386.7]} bar="var(--burgundy)">
        <Box box={[24, 29.3, 485.3, 338.7]}>
          <Stack
            title="DELING OG TILGANG"
            gap={12}
            size={14}
            items={[
              "Tilgang til roller – ikke til enkeltpersoner",
              "Intern deling – via katalogen – bestill tilgang til et dataprodukt",
              "Ekstern deling – API og Delta Sharing – uten å sende kopier",
              "Avtalefestet bruk – formål og varighet er registrert og logget",
              "Personvern – maskering og aggregering før deling",
            ]}
          />
        </Box>
      </Card>
      <Card box={[652, 168, 546.7, 386.7]} bar="var(--teal)">
        <Box box={[24, 29.3, 498.7, 338.7]}>
          <Stack
            title="KOSTNADSFORDELING"
            titleColor="var(--teal)"
            gap={12}
            size={14}
            items={[
              "Tagging – alle ressurser merkes med domene og dataprodukt",
              "Måling – compute, lagring og spørringer måles per tag",
              "Modell – fast plattformbasis + variabelt forbruk per domene",
              "Rapport – månedlig kostnadsoversikt per domene og produkt",
              "Insentiv – eierne ser egen kostnad og kan optimalisere",
            ]}
          />
        </Box>
      </Card>
      <PinkCard
        box={[81.3, 581.3, 354.7, 122.7]}
        title="Plattformbasis"
        body="Felles infrastruktur, katalog og governance – dekkes sentralt"
      />
      <PinkCard
        box={[462.7, 581.3, 354.7, 122.7]}
        title="Domeneforbruk"
        body="Variabel kostnad følger domenets eget forbruk"
      />
      <PinkCard
        box={[844, 581.3, 354.7, 122.7]}
        title="Initiativ og prosjekt"
        body="Nye dataprodukter belastes initiativet som bestiller"
      />
    </>
  );
}

export function SlideSikkerhet() {
  return (
    <>
      <Header kicker="ARKITEKTUR" title="Sikkerhet og infrastruktur" titleSize={28} />
      <Box box={[81.3, 149.3, 520, 29.3]}>
        <Label size={14}>SIKKERHET</Label>
      </Box>
      <DarkPanel box={[81.3, 184, 520, 370.7]}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            "Sikkerhet er en del av plattformen, ikke et tillegg",
            "Identitet og roller styres i Entra ID",
            "Tilgangsstyring på rad- og kolonnenivå",
            "Kryptering",
            "Private nettverk",
            "Full logging og sporbart audit-spor",
            "Sikkerhetsvurdering ved nye dataprodukter",
            "Periodisk gjennomgang av alle tilganger",
          ].map((t) => (
            <Body key={t} size={14} color="var(--mint)">
              {t}
            </Body>
          ))}
        </div>
      </DarkPanel>
      <Box box={[638.7, 149.3, 560, 29.3]}>
        <Label size={14}>INFRASTRUKTUR</Label>
      </Box>
      {(
        [
          [638.7, 184, "Skyplattform", "Azure som felles fundament"],
          [924, 184, "Lakehouse", "Databricks eller Fabric for lagring og compute"],
          [638.7, 309.3, "Orkestrering", "Planlagte og hendelsesdrevne kjøringer"],
          [924, 309.3, "Infrastruktur som kode", "Terraform og Bicep"],
          [638.7, 434.7, "CI/CD og miljøer", "Dev, test og prod med automatisk utrulling"],
          [924, 434.7, "Overvåking", "Ytelse, feil og kostnad i ett dashboard"],
        ] as const
      ).map(([x, y, title, body]) => (
        <Card key={title} box={[x, y, 272, 112]} bar="var(--teal)">
          <Box box={[21.3, 18.7, 229.3, 82.7]}>
            <Label size={15}>{title}</Label>
            <Body size={14}>{body}</Body>
          </Box>
        </Card>
      ))}
      <FooterNote box={[81.3, 586.7, 1117.3, 90.7]}>
        Alt som kjører i produksjon er definert som kode. Infrastruktur,
        pipelines og tilgangsregler versjoneres i Git og rulles ut via CI/CD –
        det gir reproduserbarhet, revisjonsspor og trygge endringer.
      </FooterNote>
    </>
  );
}

export function SlideGovernance() {
  return (
    <>
      <Header
        kicker="GOVERNANCE"
        title="Roller, beslutninger og etterlevelse"
        titleSize={28}
      />
      {(
        [
          [81.3, "var(--red-deep)", "Dataeier", "Leder i domenet. Eier innhold, godkjenner tilgang og prioriterer."],
          [366.7, "var(--red-deep)", "Data steward", "Definisjoner, KPI-logikk, dokumentasjon og datakvalitet."],
          [652, "var(--teal)", "Plattformteam", "Infrastruktur, verktøy og selvbetjening. Bygger ikke alt selv."],
          [937.3, "var(--teal)", "Governance-forum", "Policy, prinsipper, prioritering og unntak – møtes månedlig."],
        ] as const
      ).map(([x, bar, title, body]) => (
        <Card key={title} box={[x, 160, 258.7, 194.7]} bar={bar}>
          <Box box={[21.4, 24, 216, 154.7]}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Label size={15}>{title}</Label>
              <Body size={14}>{body}</Body>
            </div>
          </Box>
        </Card>
      ))}
      <DarkPanel box={[81.3, 381.3, 533.3, 240]}>
        <Stack
          title="BESLUTNINGER OG MØTEPUNKT"
          titleColor="var(--mint)"
          color="var(--mint)"
          gap={12}
          size={14}
          items={[
            "Nye dataprodukter godkjennes i governance-forum",
            "Arkitekturvalg dokumenteres som beslutningsnotat",
            "Felles backlog prioriteres på verdi og risiko",
            "Unntak gis tidsbegrenset, aldri permanent",
          ]}
        />
      </DarkPanel>
      <Card box={[652, 381.3, 546.7, 240]} bar="var(--teal)">
        <Box box={[24, 26.7, 498.7, 194.7]}>
          <Stack
            title="ETTERLEVELSE OG PERSONVERN"
            titleColor="var(--teal)"
            gap={12}
            size={14}
            items={[
              "Behandlingsgrunnlag og sletteregler ligger i katalogen",
              "Klassifisering styrer tilgang, maskering og deling",
              "All bruk logges – audit-spor på tvers av plattformen",
              "Tilganger gjennomgås periodisk og trekkes automatisk",
            ]}
          />
        </Box>
      </Card>
      <FooterNote>
        Governance skal gjøre det enkelt å gjøre riktig – ikke vanskelig å komme
        i gang.
      </FooterNote>
    </>
  );
}

export function SlideTeknologi() {
  return (
    <>
      <Header
        kicker="ARKITEKTUR"
        title="Teknologivalg – mange gode muligheter"
        titleSize={28}
      />
      <Img box={[90.9, 299.4, 185.4, 152.5]} src={`${MEDIA}/fabric.png`} alt="Microsoft Fabric" />
      <Img box={[487.6, 302.2, 304.9, 127.4]} src={`${MEDIA}/databricks.png`} alt="Databricks" />
      <Img box={[937.8, 346, 305.8, 73.2]} src={`${MEDIA}/snowflake.png`} alt="Snowflake" />
      <Img box={[73.4, 556.7, 220.4, 124]} src={`${MEDIA}/azure.png`} alt="Microsoft Azure" />
      <Img box={[389.4, 544.2, 264.9, 149]} src={`${MEDIA}/delta-lake.png`} alt="Delta Lake" />
      <Img box={[743.8, 590.9, 136.2, 51.8]} src={`${MEDIA}/dbt.png`} alt="dbt" />
      <Img box={[958.2, 538.4, 285.3, 160.5]} src={`${MEDIA}/powerbi.png`} alt="Power BI" />
    </>
  );
}
