import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation, embedAsChapter } from "../chapters";
import {
  SlideScene,
  SlideSignal,
  SlideNais,
  SlideHundreMillioner,
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
  SlideUber,
  SlideHvorfor,
  SlideDataflyt,
  SlideArkitektur,
  SlideSamleData,
  SlideMerEnnVarehus,
  SlideDataprodukt,
  SlideDataproduktAnatomi,
  SlideDatakontrakt,
  SlideDatakontraktBrudd,
  SlideGovernance,
  SlideFeilerOrganisatorisk,
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
  SlideFireStates,
  SlideTerraformDabs,
  SlideIngest,
  SlideIngestFlyt,
  SlideStrommen,
  SlideRegnestykke,
  SlidePipeline,
  SlideServerless,
} from "./sky";
import {
  SlideStordataVolum,
  SlideStordataCompute,
  SlideHais,
} from "./stordata";
import {
  SlideModeller,
  SlideModellFlyt,
  SlideFolgEttSkip,
  SlideMarTraf,
  SlideMarTrafValg,
  SlidePropellloven,
  SlideMarU,
  SlideMarUHull,
  SlideMarUUt,
  SlideMarUHvorfor,
} from "./modeller";
import {
  SlideVeienVidere,
  SlideHvorViEr,
  SlideHvorViSkal,
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
 *  Akt 3  Historien          12:00  femti år med samme problem
 *  Akt 4  Hvorfor plattform         Uber, hverdagen, byggeklossene
 *  Akt 4b Hvordan dataplattform     batch/streaming, produkter, kontrakter, folk
 *  Akt 5  Hva får du igjen   27:00  fire effekter med eksempler fra sjøveien
 *  Akt 6  Prosjektet         32:00  dag én, verktøykassa, terraform, ingest, strømmen, historikken
 *  Akt 7  Modellene          43:00  følg ett skip, propellloven, klimaregnskapet
 *  Akt 8  Veien videre       53:00  domener, kontrakter, og tilbake til Stad
 */
const APNING: SlideDef[] = [
  { id: "scene", name: "It's 03:14", component: SlideScene, steps: 3 },
  { id: "signal", name: "Every ten seconds, the ship says", component: SlideSignal, steps: 2 },
  { id: "nais", name: "Someone's listening: NAIS", component: SlideNais, steps: 1 },
  { id: "hundre-millioner", name: "100,000,000 every day", component: SlideHundreMillioner, steps: 2 },
  { id: "forside", name: "Title slide", component: SlideForside },
  { id: "om-peter", name: "Peter Bull", component: SlideOmPeter, steps: 3 },
];

const HVEM_LYTTER: SlideDef[] = [
  { id: "kystverket", name: "Who's listening? Kystverket", component: SlideKystverket },
  { id: "visjon", name: "The world's safest and cleanest coast", component: SlideVisjon, steps: 1 },
  { id: "oppdrag", name: "One mission, two halves", component: SlideOppdrag, steps: 3 },
  { id: "lyttepostene", name: "The listening posts", component: SlideLyttepostene, steps: 4 },
  { id: "ais", name: "AIS: built to avoid collisions", component: SlideAis, steps: 3 },
  { id: "sporsmalet", name: "What do you do with 8.9 billion messages?", component: SlideSporsmalet, steps: 1 },
];

const HISTORIE = embedAsChapter(historyOfTheDataPlatform, {
  id: "historie",
  title: "The story of the data platform",
});

const PLATTFORM: SlideDef[] = [
  { id: "uber", name: "Uber, 2014", component: SlideUber, steps: 4 },
  { id: "hvorfor", name: "You used four data platforms today", component: SlideHvorfor, steps: 5 },
  { id: "dataflyt", name: "Data flow: sources to consumers", component: SlideDataflyt },
  { id: "arkitektur", name: "Architecture: source to consumer", component: SlideArkitektur },
  { id: "samle-data", name: "Collect, analyze, share", component: SlideSamleData, steps: 2 },
];

const HVORDAN: SlideDef[] = [
  { id: "batch-streaming", name: "How it works", component: SlideBatchStreamingKapittel },
  { id: "batch-vs-streaming", name: "Batch vs. streaming: the flow", component: SlideBatchVsStreaming },
  { id: "batch-streaming-valg", name: "When do you choose what?", component: SlideBatchStreamingValg, steps: 7 },
  { id: "mer-enn-varehus", name: "More than a data warehouse", component: SlideMerEnnVarehus, steps: 2 },
  { id: "dataprodukt", name: "Data product", component: SlideDataprodukt },
  { id: "dataprodukt-anatomi", name: "More than a table", component: SlideDataproduktAnatomi },
  { id: "datakontrakt", name: "Data contract: an API for data", component: SlideDatakontrakt },
  { id: "datakontrakt-brudd", name: "The contract stops the error early", component: SlideDatakontraktBrudd },
  { id: "governance", name: "Governance: contracts, ownership, catalog", component: SlideGovernance, steps: 2 },
  { id: "feiler-organisatorisk", name: "Platforms fail on people", component: SlideFeilerOrganisatorisk, steps: 1 },
  { id: "roller", name: "Clear roles", component: SlideRoller, steps: 4 },
];

const EFFEKTER: SlideDef[] = [
  { id: "effekter", name: "What do you get out of it?", component: SlideEffekter },
  { id: "effekt-1", name: "Effect 1: Quality", component: SlideEffektKvalitet, steps: 1 },
  { id: "effekt-2", name: "Effect 2: Compliance", component: SlideEffektEtterlevelse, steps: 1 },
  { id: "effekt-3", name: "Effect 3: Efficiency", component: SlideEffektEffektivitet, steps: 1 },
  { id: "effekt-4", name: "Effect 4: Future-ready", component: SlideEffektFremtid, steps: 1 },
];

const PROSJEKTET: SlideDef[] = [
  { id: "prosjekt", name: "The story of the project", component: SlideProsjekt },
  { id: "dag-en", name: "Day one", component: SlideDagEn, steps: 3 },
  { id: "azure-databricks", name: "Azure + Databricks", component: SlideAzureDatabricks },
  { id: "azure", name: "Azure: the foundation", component: SlideAzure, steps: 4 },
  { id: "databricks", name: "Databricks: the engine", component: SlideDatabricks, steps: 3 },
  { id: "terraform", name: "We don't click. We commit.", component: SlideTerraform, steps: 4 },
  { id: "fire-states", name: "Four states. Four pipelines.", component: SlideFireStates, steps: 5 },
  { id: "terraform-dabs", name: "Infrastructure and logic. Two tools.", component: SlideTerraformDabs, steps: 3 },
  { id: "ingest", name: "Ingest happens outside Databricks.", component: SlideIngest, steps: 3 },
  { id: "ingest-flyt", name: "Fetch. Dump. Then lakehouse.", component: SlideIngestFlyt, steps: 5 },
  { id: "strommen", name: "100 million rows. Every day.", component: SlideStrommen, steps: 1 },
  { id: "regnestykke", name: "The math", component: SlideRegnestykke, steps: 2 },
  { id: "pipeline", name: "From antenna to insight", component: SlidePipeline, steps: 5 },
  { id: "serverless", name: "No clusters to wake up at night", component: SlideServerless, steps: 3 },
  { id: "stordata-volum", name: "The stream is small, the history is big", component: SlideStordataVolum, steps: 4 },
  { id: "stordata-compute", name: "Days of compute, or hours?", component: SlideStordataCompute, steps: 7 },
  { id: "hais", name: "HAIS: historical extracts on demand", component: SlideHais, steps: 4 },
];

const MODELLENE: SlideDef[] = [
  { id: "modeller", name: "From positions to emissions", component: SlideModeller },
  { id: "modell-flyt", name: "Four modules, not one model", component: SlideModellFlyt, steps: 5 },
  { id: "folg-ett-skip", name: "Follow one ship", component: SlideFolgEttSkip, steps: 6 },
  { id: "martraf", name: "The maritime traffic model: MarTraf", component: SlideMarTraf, steps: 5 },
  { id: "martraf-valg", name: "The choices that make it possible", component: SlideMarTrafValg, steps: 3 },
  { id: "propellloven", name: "The propeller law", component: SlidePropellloven, steps: 3 },
  { id: "maru", name: "The maritime emissions model: MarU", component: SlideMarU, steps: 4 },
  { id: "maru-hull", name: "ML as a data quality tool", component: SlideMarUHull, steps: 5 },
  { id: "maru-ut", name: "What comes out?", component: SlideMarUUt, steps: 5 },
  { id: "maru-hvorfor", name: "Why not just use sales numbers?", component: SlideMarUHvorfor, steps: 4 },
];

const VEIEN_VIDERE: SlideDef[] = [
  { id: "veien-videre", name: "The road ahead", component: SlideVeienVidere },
  { id: "hvor-vi-er", name: "Where we are: one source, one catalog structure", component: SlideHvorViEr, steps: 2 },
  { id: "hvor-vi-skal", name: "Where we're going: domain catalogs and data products", component: SlideHvorViSkal, steps: 5 },
  { id: "domene-effekt", name: "Clear ownership, cost, and stewardship", component: SlideDomeneEffekt, steps: 4 },
  { id: "videre-liste", name: "What we want to achieve", component: SlideVidereListe, steps: 5 },
  { id: "tilbake-til-stad", name: "Back to Stad", component: SlideTilbakeTilStad, steps: 3 },
  { id: "takk", name: "Thanks. Try it yourself.", component: SlideTakk },
];

export const ndcKystverketStory = definePresentation({
  id: "26-ndc-kystverket-story",
  title: "100 million rows a day: the data platform behind the sea route (storytelling version)",
  description:
    "From one AIS signal off Stad to the climate accounts of a municipality. The story of how the Norwegian Coastal Administration built a data platform with Azure and Databricks serverless. NDC 2026, 60 minutes.",
  date: "NDC 2026",
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "The opening", slides: APNING },
    { id: "hvem-lytter", title: "Who's listening", slides: HVEM_LYTTER },
    {
      ...HISTORIE,
      slides: [
        { id: "hva-er", name: "Why is everyone building data platforms?", component: SlideHvaEr },
        ...HISTORIE.slides,
      ],
    },
    { id: "plattform", title: "Why a platform", slides: PLATTFORM },
    { id: "hvordan", title: "How it works", slides: HVORDAN },
    { id: "effekter", title: "What you get out of it", slides: EFFEKTER },
    { id: "prosjektet", title: "The story of the project", slides: PROSJEKTET },
    { id: "modellene", title: "The models", slides: MODELLENE },
    { id: "veien-videre", title: "The road ahead", slides: VEIEN_VIDERE },
  ],
});
