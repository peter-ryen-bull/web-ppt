import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation, embedAsChapter } from "../chapters";
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
  SlideMerEnnVarehusAi,
  SlideMerEnnVarehusSvar,
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
  SlideTekniskImplementasjon,
  SlideFireStates,
  SlideTerraformDabs,
  SlideIngest,
  SlideIngestFlyt,
  SlideAisPipeline,
  SlideServerless,
} from "./sky";
import {
  SlideStordataVolum,
  SlideStordataCompute,
} from "./stordata";
import {
  SlideModeller,
  SlideModellFlyt,
  SlideHais,
  SlideFolgEttSkip,
  SlideAsukaHais,
  SlideAsukaHvem,
  SlideMarTraf,
  SlideHexHvorfor,
  SlideHexJoin,
  SlideH3Ship,
  SlideMarTrafVideo,
  SlidePropellloven,
  SlideMarU,
  SlideMarUHull,
  SlideMarUUt,
  SlideMarUHvorfor,
} from "./modeller";
import {
  SlideVeienVidere,
  SlideHvorViEr,
  SlideFlereDomener,
  SlideHvorViSkalHelhet,
  SlideDomeneEffekt,
  SlideVidereListe,
  SlideTilbakeTilStad,
  SlideTakk,
} from "./videre";

/*
 * Dramaturgi (ca. 60 min):
 *
 *  Akt 1  Åpningen           00:00  én scene, ett signal, ett tall
 *  Akt 2  Hvem lytter        05:00  Kystverket og det store hvorfor-et
 *  Akt 3  Hvorfor dataplattform     12:00  hvorfor alle bygger, Hoffman, hverdagen
 *  Akt 4  Historien                 femti år med samme problem
 *  Akt 4b Hvordan dataplattform     arkitektur, produkter
 *  Akt 5  Hva får du igjen   27:00  tre effekter med eksempler fra sjøveien
 *  Akt 6  Prosjektet         32:00  dag én, verktøykassa, terraform
 *  Akt 7  Produktene                HAIS, følg ett skip, MarTraf, MarU, propellloven
 *  Akt 7b Teknisk                   ingest, historikken, H3, batch vs streaming
 *  Akt 8  Veien videre       53:00  domener, kontrakter, og tilbake til Stad
 */
const APNING: SlideDef[] = [
  { id: "scene", name: "The time is 03:14", component: SlideScene, steps: 3 },
  {
    id: "signal",
    name: "Every ten seconds, the ship says",
    component: SlideSignal,
    steps: 1,
  },
  {
    id: "nais",
    name: "Someone's listening: NAIS",
    component: SlideNais,
    steps: 1,
  },
  {
    id: "hundre-millioner",
    name: "100,000,000 every day",
    component: SlideHundreMillioner,
    steps: 1,
  },
  {
    id: "hundre-millioner-fyll",
    name: "The messages fill the screen",
    component: SlideHundreMillionerFyll,
  },
  { id: "forside", name: "Title slide", component: SlideForside },
  { id: "om-peter", name: "Peter Bull", component: SlideOmPeter, steps: 6 },
];

const HVEM_LYTTER: SlideDef[] = [
  {
    id: "kystverket",
    name: "Who's listening? Kystverket",
    component: SlideKystverket,
  },
  {
    id: "visjon",
    name: "The world's safest and cleanest coast",
    component: SlideVisjon,
    steps: 1,
  },
  {
    id: "oppdrag",
    name: "About us: the NCA",
    component: SlideOppdrag,
    steps: 6,
  },
  {
    id: "lyttepostene",
    name: "The listening posts",
    component: SlideLyttepostene,
    steps: 4,
  },
  {
    id: "ais",
    name: "AIS: built to avoid collisions",
    component: SlideAis,
    steps: 3,
  },
  {
    id: "sporsmalet",
    name: "What do you do with 100 million messages a day?",
    component: SlideSporsmalet,
    steps: 1,
  },
];

const HISTORIE = embedAsChapter(historyOfTheDataPlatform, {
  id: "historie",
  title: "The story of the data platform",
});

const PLATTFORM: SlideDef[] = [
  {
    id: "hva-er",
    name: "Why is everyone building data platforms?",
    component: SlideHvaEr,
    steps: 1,
  },
  {
    id: "reid-hoffman",
    name: "Everything is measurable",
    component: SlideReidHoffman,
    steps: 2,
  },
  {
    id: "hvorfor",
    name: "Data platforms are everywhere",
    component: SlideHvorfor,
    steps: 5,
  },
];

const HVORDAN: SlideDef[] = [
  {
    id: "batch-streaming",
    name: "How it works",
    component: SlideBatchStreamingKapittel,
  },
  {
    id: "dataflyt",
    name: "Data flow: sources to consumers",
    component: SlideDataflyt,
  },
  {
    id: "arkitektur",
    name: "Architecture: source to consumer",
    component: SlideArkitektur,
    steps: 1,
  },
  {
    id: "mer-enn-varehus",
    name: "Is it just a database?",
    component: SlideMerEnnVarehus,
    steps: 5,
  },
  {
    id: "mer-enn-varehus-katalog",
    name: "Catalog. Compute. Jobs. Discover.",
    component: SlideMerEnnVarehusKatalog,
    steps: 1,
  },
  {
    id: "mer-enn-varehus-ai",
    name: "And then you ask.",
    component: SlideMerEnnVarehusAi,
    steps: 1,
  },
  {
    id: "mer-enn-varehus-svar",
    name: "And it answers.",
    component: SlideMerEnnVarehusSvar,
    steps: 1,
  },
  { id: "dataprodukt", name: "Data product", component: SlideDataprodukt, steps: 1 },
  {
    id: "dataprodukt-kjennetegn",
    name: "What makes it a product",
    component: SlideDataproduktKjennetegn,
    steps: 4,
  },
  {
    id: "dataprodukt-anatomi",
    name: "More than a table",
    component: SlideDataproduktAnatomi,
  },
  {
    id: "datakontrakt-kapittel",
    name: "Data contract",
    component: SlideDatakontraktKapittel,
  },
  {
    id: "datakontrakt-hva",
    name: "Clear documentation of your data",
    component: SlideDatakontraktHva,
    steps: 1,
  },
  {
    id: "datakontrakt-innhold",
    name: "What's in a contract",
    component: SlideDatakontraktInnhold,
    steps: 2,
  },
  {
    id: "datakontrakt",
    name: "Data contract: an API for data",
    component: SlideDatakontrakt,
  },
  {
    id: "datakontrakt-brudd",
    name: "The contract stops the error early",
    component: SlideDatakontraktBrudd,
  },
  {
    id: "datakatalog",
    name: "Data catalog",
    component: SlideDatakatalog,
  },
  {
    id: "datakatalog-hva",
    name: "What a catalog is",
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
    name: "Governance: contracts and catalog",
    component: SlideGovernance,
    steps: 2,
  },
  { id: "roller", name: "Clear roles", component: SlideRoller, steps: 4 },
];

const EFFEKTER: SlideDef[] = [
  {
    id: "effekter",
    name: "What do you get out of it?",
    component: SlideEffekter,
  },
  {
    id: "effekt-1",
    name: "Effect 1: Data quality",
    component: SlideEffektKvalitet,
    steps: 1,
  },
  {
    id: "effekt-2",
    name: "Effect 2: Compliance",
    component: SlideEffektEtterlevelse,
    steps: 1,
  },
  {
    id: "effekt-3",
    name: "Effect 3: Self-service",
    component: SlideEffektEffektivitet,
    steps: 1,
  },
  {
    id: "effekt-4",
    name: "Effect 4: Future-ready",
    component: SlideEffektFremtid,
    steps: 1,
  },
];

const PROSJEKTET: SlideDef[] = [
  {
    id: "prosjekt",
    name: "The story of the project",
    component: SlideProsjekt,
  },
  { id: "dag-en", name: "Day one", component: SlideDagEn, steps: 3 },
  {
    id: "azure-databricks",
    name: "Azure + Databricks + Terraform",
    component: SlideAzureDatabricks,
  },
  {
    id: "azure",
    name: "Azure: the foundation",
    component: SlideAzure,
    steps: 4,
  },
  {
    id: "databricks",
    name: "Databricks: the engine",
    component: SlideDatabricks,
    steps: 3,
  },
  {
    id: "terraform",
    name: "Terraform: the infrastructure",
    component: SlideTerraform,
    steps: 4,
  },
];

const TEKNISK: SlideDef[] = [
  {
    id: "teknisk-implementasjon",
    name: "Technical implementation details",
    component: SlideTekniskImplementasjon,
  },
  {
    id: "fire-states",
    name: "Terraform: four states. Four pipelines.",
    component: SlideFireStates,
    steps: 5,
  },
  {
    id: "terraform-dabs",
    name: "Infrastructure and logic. Two tools.",
    component: SlideTerraformDabs,
    steps: 2,
  },
  {
    id: "ingest",
    name: "Ingest happens outside Databricks.",
    component: SlideIngest,
    steps: 3,
  },
  {
    id: "ingest-flyt",
    name: "Fetch. Dump. Then lakehouse.",
    component: SlideIngestFlyt,
    steps: 6,
  },
  {
    id: "ais-pipeline",
    name: "The job that runs every day",
    component: SlideAisPipeline,
  },
  {
    id: "stordata-volum",
    name: "The stream is small, the history is big",
    component: SlideStordataVolum,
    steps: 4,
  },
  {
    id: "serverless",
    name: "No clusters to wake up at night",
    component: SlideServerless,
    steps: 3,
  },
  {
    id: "batch-vs-streaming",
    name: "Sidenote: batch vs. streaming",
    component: SlideBatchVsStreaming,
  },
  {
    id: "batch-streaming-valg",
    name: "When do you choose what?",
    component: SlideBatchStreamingValg,
    steps: 7,
  },
  {
    id: "stordata-compute",
    name: "Days of compute, or hours?",
    component: SlideStordataCompute,
    steps: 7,
  },
  {
    id: "hex-hvorfor",
    name: "How do you group a coastline?",
    component: SlideHexHvorfor,
    steps: 1,
  },
  {
    id: "hex-join",
    name: "A join on a number",
    component: SlideHexJoin,
    steps: 2,
  },
  { id: "h3-ship", name: "One ship on the hex grid", component: SlideH3Ship },
];

const MODELLENE: SlideDef[] = [
  {
    id: "modeller",
    name: "From positions to emissions",
    component: SlideModeller,
  },
  {
    id: "modell-flyt",
    name: "One source, many products",
    component: SlideModellFlyt,
    steps: 5,
  },
  {
    id: "hais",
    name: "HAIS: historical extracts on demand",
    component: SlideHais,
    steps: 3,
  },
  {
    id: "folg-ett-skip",
    name: "Follow one ship",
    component: SlideFolgEttSkip,
    steps: 6,
  },
  { id: "asuka-hais", name: "Asuka, from HAIS", component: SlideAsukaHais },
  { id: "asuka-hvem", name: "Who is Asuka?", component: SlideAsukaHvem },
  {
    id: "martraf",
    name: "A pile of points",
    component: SlideMarTraf,
    steps: 3,
  },
  {
    id: "martraf-video",
    name: "MarTraf on the map",
    component: SlideMarTrafVideo,
  },
  {
    id: "maru",
    name: "The maritime emissions model: MarU",
    component: SlideMarU,
    steps: 4,
  },
  {
    id: "maru-hvorfor",
    name: "How was it done earlier?",
    component: SlideMarUHvorfor,
    steps: 4,
  },
  {
    id: "propellloven",
    name: "The propeller law",
    component: SlidePropellloven,
    steps: 3,
  },
  {
    id: "maru-hull",
    name: "ML as a data quality tool",
    component: SlideMarUHull,
    steps: 5,
  },
  { id: "maru-ut", name: "What comes out?", component: SlideMarUUt, steps: 5 },
];

const VEIEN_VIDERE: SlideDef[] = [
  { id: "veien-videre", name: "The road ahead", component: SlideVeienVidere },
  {
    id: "hvor-vi-er",
    name: "Where we are: one source, one catalog structure",
    component: SlideHvorViEr,
    steps: 2,
  },
  {
    id: "flere-domener",
    name: "Not just AIS: more domains are coming",
    component: SlideFlereDomener,
    steps: 5,
  },
  {
    id: "hvor-vi-skal-helhet",
    name: "Where we're going: the whole picture",
    component: SlideHvorViSkalHelhet,
    steps: 9,
  },
  {
    id: "domene-effekt",
    name: "Clear ownership, cost, and stewardship",
    component: SlideDomeneEffekt,
    steps: 4,
  },
  {
    id: "videre-liste",
    name: "What we want to achieve",
    component: SlideVidereListe,
    steps: 4,
  },
  {
    id: "tilbake-til-stad",
    name: "Back to Stad",
    component: SlideTilbakeTilStad,
    steps: 3,
  },
  { id: "takk", name: "Thanks. Try it yourself.", component: SlideTakk },
];

export const ndcKystverketStory = definePresentation({
  id: "26-ndc-kystverket-story",
  title:
    "100 million rows a day: the data platform behind the coastline (storytelling version)",
  description:
    "From one AIS signal off Stad to the climate accounts of a municipality. The story of how the Norwegian Coastal Administration built a data platform with Azure and Databricks serverless. NDC 2026, 60 minutes.",
  date: "NDC 2026",
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "The opening", slides: APNING },
    { id: "hvem-lytter", title: "Who's listening", slides: HVEM_LYTTER },
    { id: "plattform", title: "Why data platform", slides: PLATTFORM },
    HISTORIE,
    { id: "hvordan", title: "How it works", slides: HVORDAN },
    { id: "effekter", title: "What you get out of it", slides: EFFEKTER },
    { id: "prosjektet", title: "The story of the project", slides: PROSJEKTET },
    { id: "modellene", title: "The products", slides: MODELLENE },
    {
      id: "teknisk",
      title: "Technical implementation details",
      slides: TEKNISK,
    },
    { id: "veien-videre", title: "The road ahead", slides: VEIEN_VIDERE },
  ],
});
