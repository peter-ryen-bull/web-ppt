import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation, embedAsChapter } from "../chapters";
import { FyrIkon } from "@/components/icons/FyrIkon";
import {
  SlideScene,
  SlideSignal,
  SlideNais,
  SlideHundreMillioner,
  SlideHundreMillionerFyll,
  SlideForside,
  SlideOmPeter,
} from "./intro";
import {
  SlideKystverket,
  SlideVisjon,
  SlideOppdrag,
  SlideLyttepostene,
  SlideAis,
  SlideSporsmalet,
} from "./kystverket";
import { historyOfTheDataPlatform } from "./historie";
import {
  SlideHvaEr,
  SlideReidHoffman,
  SlideHvorfor,
  SlideDataflyt,
  SlideArkitektur,
  SlideMerEnnVarehus,
  SlideMerEnnVarehusKatalog,
  SlideStrukturereData,
  SlideDataprodukt,
  SlideDataproduktKjennetegn,
  SlideDataproduktAnatomi,
  SlideDatakontraktKapittel,
  SlideDatakontraktHva,
  SlideDatakontraktInnhold,
  SlideDatakontrakt,
  SlideDatakontraktBrudd,
  SlideDatakatalog,
  SlideDatakatalogHva,
  SlideDatakatalogDatahub,
  SlideGovernance,
  SlideRoller,
} from "./plattform";
import {
  SlideBatchStreamingKapittel,
  SlideBatchVsStreaming,
  SlideBatchStreamingValg,
} from "./batch-streaming";
import {
  SlideEffekter,
  SlideEffektKvalitet,
  SlideEffektEtterlevelse,
  SlideEffektEffektivitet,
  SlideEffektFremtid,
} from "./effekter";
import {
  SlideProsjekt,
  SlideDagEn,
  SlideAzureDatabricks,
  SlideAzure,
  SlideDatabricks,
  SlideTerraform,
  SlideTerraformKode,
  SlideTekniskImplementasjon,
  SlideFireStates,
  SlideIngest,
  SlideAisPipeline,
  SlideServerless,
} from "./sky";
import {
  SlideStordataVolum,
  SlideDatabricksCompute,
  SlideStordataCompute,
} from "./stordata";
import {
  SlideModeller,
  SlideModellFlyt,
  SlideHais,
  SlideFolgEttSkip,
  SlideAsukaHais,
  SlideAsukaHvem,
  SlideMathOpt,
  SlideH3Hexes,
  SlideHexJoin,
  SlideH3Ship,
  SlideMarTrafVideo,
  SlidePropellloven,
  SlideMarU,
  SlideMarUHull,
  SlideMarUUt,
  SlideMarUHvorfor,
  SlideKystRisk,
  SlideKystRiskTti,
} from "./modeller";
import {
  SlideVeienVidere,
  SlideHvorViEr,
  SlideFlereDomener,
  SlideHvorViSkalHelhet,
  SlideVidereListe,
  SlideTilbakeTilStad,
  SlideTakk,
} from "./videre";

/*
 * Dramaturgi (60 min). Tid = første slide i kapittelet.
 *
 *  Åpningen                 00:00   5 min   scene, signal, 100 million, Peter
 *  Hvem lytter              05:00   6 min   Kystverket, visjon, lytteposter, AIS
 *  Hvorfor dataplattform    11:00   3 min   Hoffman, hverdagen
 *  Historien                14:00   6 min   femti år, ett slag per epoke
 *  Hvordan dataplattform    20:00  11 min   arkitektur, produkter, kontrakter
 *  Hva får du igjen         31:00   4 min   fire effekter
 *  Prosjektet               35:00   4 min   dag én, verktøykassa, terraform
 *  Produktene               39:00   8 min   HAIS, Asuka, MarTraf, MarU, KystRisk
 *  Teknisk                  47:00   2 min   ingest, den daglige jobben
 *  Scaling                  49:00   3 min   historikk, batch vs streaming
 *  H3                       52:00   3 min   hexer. Hopp over hvis du lander etter 52
 *  Veien videre             55:00   5 min   domener, tilbake til Stad, takk
 */
const APNING: SlideDef[] = [
  { id: "scene", name: "Klokka er 03:14", component: SlideScene, steps: 3 },
  {
    id: "signal",
    name: "Hvert tiende sekund sier skipet",
    component: SlideSignal,
    steps: 1,
  },
  {
    id: "nais",
    name: "Noen lytter: NAIS",
    component: SlideNais,
    steps: 1,
  },
  {
    id: "hundre-millioner",
    name: "100 000 000 hver dag",
    component: SlideHundreMillioner,
    steps: 1,
  },
  {
    id: "hundre-millioner-fyll",
    name: "Meldingene fyller skjermen",
    component: SlideHundreMillionerFyll,
  },
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "om-peter", name: "Peter Bull", component: SlideOmPeter, steps: 6 },
];

const HVEM_LYTTER: SlideDef[] = [
  {
    id: "kystverket",
    name: "Hvem lytter? Kystverket",
    component: SlideKystverket,
  },
  {
    id: "visjon",
    name: "Verdens sikreste og reneste kyst",
    component: SlideVisjon,
    steps: 1,
  },
  {
    id: "oppdrag",
    name: "Om oss: Kystverket",
    component: SlideOppdrag,
    steps: 6,
  },
  {
    id: "lyttepostene",
    name: "Lyttepostene",
    component: SlideLyttepostene,
    steps: 4,
  },
  {
    id: "ais",
    name: "AIS: laget for å ikke kollidere",
    component: SlideAis,
    steps: 3,
  },
  {
    id: "sporsmalet",
    name: "Hva gjør du med 100 millioner meldinger om dagen?",
    component: SlideSporsmalet,
    steps: 1,
  },
];

const HISTORIE = embedAsChapter(historyOfTheDataPlatform, {
  id: "historie",
  title: "Historien om dataplattformen",
});

const PLATTFORM: SlideDef[] = [
  {
    id: "hva-er",
    name: "Hvorfor bygger alle dataplattform?",
    component: SlideHvaEr,
    steps: 1,
  },
  {
    id: "reid-hoffman",
    name: "Alt kan måles",
    component: SlideReidHoffman,
    steps: 2,
  },
  {
    id: "hvorfor",
    name: "Dataplattformer er overalt",
    component: SlideHvorfor,
    steps: 5,
  },
];

const HVORDAN: SlideDef[] = [
  {
    id: "batch-streaming",
    name: "Slik fungerer det",
    component: SlideBatchStreamingKapittel,
  },
  {
    id: "dataflyt",
    name: "Dataflyt: kilder til konsumenter",
    component: SlideDataflyt,
    steps: 4,
  },
  {
    id: "arkitektur",
    name: "Arkitektur: kilde til konsument",
    component: SlideArkitektur,
  },
  {
    id: "mer-enn-varehus",
    name: "Er det bare en database?",
    component: SlideMerEnnVarehus,
    steps: 5,
  },
  {
    id: "mer-enn-varehus-katalog",
    name: "Katalog. Jobber. Spør. Svar.",
    component: SlideMerEnnVarehusKatalog,
    steps: 4,
  },
  {
    id: "strukturere-data",
    name: "Hvordan strukturerer vi dataene?",
    component: SlideStrukturereData,
    steps: 4,
  },
  { id: "dataprodukt", name: "Dataprodukt", component: SlideDataprodukt, steps: 1 },
  {
    id: "dataprodukt-kjennetegn",
    name: "Hva gjør det til et produkt",
    component: SlideDataproduktKjennetegn,
    steps: 4,
  },
  {
    id: "dataprodukt-anatomi",
    name: "Mer enn en tabell",
    component: SlideDataproduktAnatomi,
    steps: 9,
  },
  {
    id: "datakontrakt-kapittel",
    name: "Datakontrakt",
    component: SlideDatakontraktKapittel,
  },
  {
    id: "datakontrakt-hva",
    name: "Tydelig dokumentasjon av dataene",
    component: SlideDatakontraktHva,
    steps: 1,
  },
  {
    id: "datakontrakt-innhold",
    name: "Hva står i en kontrakt",
    component: SlideDatakontraktInnhold,
    steps: 4,
  },
  {
    id: "datakontrakt",
    name: "Datakontrakt: et API for data",
    component: SlideDatakontrakt,
  },
  {
    id: "datakontrakt-brudd",
    name: "Kontrakten stopper feilen tidlig",
    component: SlideDatakontraktBrudd,
  },
  {
    id: "datakatalog",
    name: "Datakatalog",
    component: SlideDatakatalog,
  },
  {
    id: "datakatalog-hva",
    name: "Hva en katalog er",
    component: SlideDatakatalogHva,
    steps: 2,
  },
  {
    id: "datakatalog-datahub",
    name: "DataHub",
    component: SlideDatakatalogDatahub,
    steps: 1,
  },
  {
    id: "governance",
    name: "Governance",
    component: SlideGovernance,
    steps: 4,
  },
  { id: "roller", name: "Tydelige roller", component: SlideRoller, steps: 5 },
];

const EFFEKTER: SlideDef[] = [
  {
    id: "effekter",
    name: "Hva får du igjen?",
    component: SlideEffekter,
  },
  {
    id: "effekt-1",
    name: "Effekt 1: Datakvalitet",
    component: SlideEffektKvalitet,
    steps: 1,
  },
  {
    id: "effekt-2",
    name: "Effekt 2: Etterlevelse",
    component: SlideEffektEtterlevelse,
    steps: 1,
  },
  {
    id: "effekt-3",
    name: "Effekt 3: Selvbetjening",
    component: SlideEffektEffektivitet,
    steps: 1,
  },
  {
    id: "effekt-4",
    name: "Effekt 4: Fremtidsrettet",
    component: SlideEffektFremtid,
    steps: 1,
  },
];

const PROSJEKTET: SlideDef[] = [
  {
    id: "prosjekt",
    name: "Historien om prosjektet",
    component: SlideProsjekt,
  },
  { id: "dag-en", name: "Dag én", component: SlideDagEn, steps: 3 },
  {
    id: "azure-databricks",
    name: "Azure + Databricks + Terraform",
    component: SlideAzureDatabricks,
  },
  {
    id: "azure",
    name: "Azure: grunnmuren",
    component: SlideAzure,
    steps: 3,
  },
  {
    id: "databricks",
    name: "Databricks: motoren",
    component: SlideDatabricks,
    steps: 3,
  },
  {
    id: "terraform-kode",
    name: "Én ressurs. Tre miljøer.",
    component: SlideTerraformKode,
    steps: 1,
  },
  {
    id: "terraform",
    name: "Deploy og versjonskontroller infrastrukturen",
    component: SlideTerraform,
    steps: 4,
  },
  {
    id: "fire-states",
    name: "Terraform: fire states. Fire pipelines.",
    component: SlideFireStates,
    steps: 5,
  },
];

const TEKNISK: SlideDef[] = [
  {
    id: "teknisk-implementasjon",
    name: "Slik gjør vi det",
    component: SlideTekniskImplementasjon,
  },
  {
    id: "ingest",
    name: "Ingest skjer utenfor Databricks.",
    component: SlideIngest,
    steps: 3,
  },
  {
    id: "ais-pipeline",
    name: "Jobben som kjører hver dag",
    component: SlideAisPipeline,
  },
];

const SCALING: SlideDef[] = [
  {
    id: "stordata-volum",
    name: "Strømmen er liten, historikken er stor",
    component: SlideStordataVolum,
    steps: 4,
  },
  {
    id: "batch-vs-streaming",
    name: "Batch vs. streaming",
    component: SlideBatchVsStreaming,
  },
  {
    id: "batch-streaming-valg",
    name: "Når velger du hva?",
    component: SlideBatchStreamingValg,
    steps: 7,
  },
  {
    id: "databricks-compute",
    name: "Klynger er administrerte VM-er i Azure",
    component: SlideDatabricksCompute,
    steps: 4,
  },
  {
    id: "serverless",
    name: "serverless vs manuell tuning",
    component: SlideServerless,
    steps: 3,
  },
  {
    id: "stordata-compute",
    name: "Døgn med kjøretid, eller timer?",
    component: SlideStordataCompute,
    steps: 7,
  },
];

const H3: SlideDef[] = [
  {
    id: "math-opt",
    name: "Matematiske optimaliseringer",
    component: SlideMathOpt,
    steps: 2,
  },
  {
    id: "h3-hexes",
    name: "Hexer i hexer",
    component: SlideH3Hexes,
    steps: 1,
  },
  {
    id: "hex-join",
    name: "En join på et tall",
    component: SlideHexJoin,
    steps: 1,
  },
  { id: "h3-ship", name: "Ett skip på hex-nettet", component: SlideH3Ship },
];

const MODELLENE: SlideDef[] = [
  {
    id: "modeller",
    name: "Hvilke produkter har vi bygget på dette?",
    component: SlideModeller,
  },
  {
    id: "modell-flyt",
    name: "Én kilde, mange dataprodukter",
    component: SlideModellFlyt,
    steps: 5,
  },
  {
    id: "hais",
    name: "HAIS: historisk uttrekk på bestilling",
    component: SlideHais,
    steps: 3,
  },
  { id: "asuka-hais", name: "Asuka, fra HAIS", component: SlideAsukaHais },
  { id: "asuka-hvem", name: "Hvem er Asuka?", component: SlideAsukaHvem },
  {
    id: "folg-ett-skip",
    name: "MarTraf – maritim trafikkmodell",
    component: SlideFolgEttSkip,
    steps: 6,
  },
  {
    id: "martraf-video",
    name: "MarTraf på kartet",
    component: SlideMarTrafVideo,
  },
  {
    id: "propellloven",
    name: "MarU – maritim utslippsmodell",
    component: SlidePropellloven,
    steps: 4,
  },
  {
    id: "maru-hvorfor",
    name: "Hvordan gjorde man det før?",
    component: SlideMarUHvorfor,
    steps: 3,
  },
  {
    id: "maru",
    name: "Maritim utslippsmodell: MarU",
    component: SlideMarU,
    steps: 4,
  },
  {
    id: "maru-hull",
    name: "Fyller hullene i skipsregisteret med ML",
    component: SlideMarUHull,
    steps: 5,
  },
  { id: "maru-ut", name: "Hva kommer ut?", component: SlideMarUUt, steps: 4 },
  {
    id: "kystrisk-tti",
    name: "KystRisk: hva er sannsynligheten for en ulykke?",
    component: SlideKystRiskTti,
    steps: 1,
  },
  {
    id: "kystrisk",
    name: "Maritim risikomodell: KystRisk",
    component: SlideKystRisk,
    steps: 4,
  },
];

const VEIEN_VIDERE: SlideDef[] = [
  { id: "veien-videre", name: "Veien videre", component: SlideVeienVidere },
  {
    id: "hvor-vi-er",
    name: "Hvor vi er: én kilde, én katalogstruktur",
    component: SlideHvorViEr,
    steps: 2,
  },
  {
    id: "flere-domener",
    name: "Ikke bare AIS: flere domener kommer",
    component: SlideFlereDomener,
    steps: 5,
  },
  {
    id: "hvor-vi-skal-helhet",
    name: "Hvor vi skal: helheten",
    component: SlideHvorViSkalHelhet,
    steps: 9,
  },
  {
    id: "videre-liste",
    name: "Dette vil vi få til",
    component: SlideVidereListe,
    steps: 4,
  },
  {
    id: "tilbake-til-stad",
    name: "Tilbake til Stad",
    component: SlideTilbakeTilStad,
    steps: 3,
  },
  { id: "takk", name: "Takk. Prøv selv.", component: SlideTakk },
];

export const tdcKystverketDataplattform = definePresentation({
  id: "26-10-19-tdc-kystverket-dataplattform",
  title:
    "100 millioner rader om dagen: dataplattformen bak kysten",
  description:
    "Fra ett AIS-signal utenfor Stad til klimaregnskapet i en kommune. Historien om hvordan Kystverket bygde en dataplattform med Azure og Databricks serverless. TDC 2026, 60 minutter.",
  date: "19. oktober 2026",
  place: "TDC",
  tags: ["conference"],
  icon: <FyrIkon />,
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "Åpningen", slides: APNING },
    { id: "hvem-lytter", title: "Hvem lytter", slides: HVEM_LYTTER },
    { id: "plattform", title: "Hvorfor dataplattform", slides: PLATTFORM },
    HISTORIE,
    { id: "hvordan", title: "Slik fungerer det", slides: HVORDAN },
    { id: "effekter", title: "Hva får du igjen", slides: EFFEKTER },
    { id: "prosjektet", title: "Historien om prosjektet", slides: PROSJEKTET },
    { id: "modellene", title: "Produktene", slides: MODELLENE },
    {
      id: "teknisk",
      title: "Slik gjør vi det",
      slides: TEKNISK,
    },
    { id: "scaling", title: "Skalering", slides: SCALING },
    { id: "h3", title: "H3", slides: H3 },
    { id: "veien-videre", title: "Veien videre", slides: VEIEN_VIDERE },
  ],
});
