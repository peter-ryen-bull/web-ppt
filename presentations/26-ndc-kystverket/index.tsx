import type { PresentationDef, SlideDef } from "../types";
import { withNotes } from "../notes";
import notesRaw from "./notes.md";
import {
  SlideTrigger,
  SlideNais,
  SlideHundreMillioner,
  SlideForside,
  SlideOmPeter,
} from "./intro";
import {
  SlideKystverket,
  SlideKystverketFakta,
  SlideAis,
} from "./kystverket";
import {
  SlideHvaEr,
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
  SlideAzureDatabricks,
  SlideAzure,
  SlideDatabricks,
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
  SlideMarTraf,
  SlideMarTrafValg,
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
} from "./videre";

const SLIDES: SlideDef[] = [
  { id: "trigger", name: "Vi live-tracker alle skip", component: SlideTrigger },
  { id: "nais", name: "NAIS – sanntidsbildet", component: SlideNais, steps: 1 },
  { id: "hundre-millioner", name: "100 000 000 rader hver dag", component: SlideHundreMillioner, steps: 1 },
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "om-peter", name: "Peter Bull", component: SlideOmPeter, steps: 3 },
  { id: "kystverket", name: "Kystverket – tar ansvar for sjøveien", component: SlideKystverket },
  { id: "kystverket-fakta", name: "Transportetaten for sjøveien", component: SlideKystverketFakta, steps: 5 },
  { id: "ais", name: "Hva er AIS?", component: SlideAis, steps: 3 },
  { id: "hva-er", name: "Hva er en dataplattform", component: SlideHvaEr },
  { id: "hvorfor", name: "Dataplattformer i hverdagen", component: SlideHvorfor, steps: 5 },
  { id: "dataflyt", name: "Dataflyt: kilder til konsumenter", component: SlideDataflyt },
  { id: "arkitektur", name: "Arkitektur: kilde til konsument", component: SlideArkitektur },
  { id: "samle-data", name: "Samle data fra kildesystemer", component: SlideSamleData, steps: 2 },
  { id: "batch-streaming", name: "Batch eller streaming?", component: SlideBatchStreamingKapittel },
  { id: "batch-vs-streaming", name: "Batch vs. streaming – flyt", component: SlideBatchVsStreaming },
  { id: "batch-streaming-valg", name: "Når velger du hva?", component: SlideBatchStreamingValg, steps: 7 },
  { id: "mer-enn-varehus", name: "Mer enn et datavarehus", component: SlideMerEnnVarehus, steps: 2 },
  { id: "dataprodukt", name: "Dataprodukt", component: SlideDataprodukt },
  { id: "dataprodukt-anatomi", name: "Mer enn en tabell", component: SlideDataproduktAnatomi },
  { id: "datakontrakt", name: "Datakontrakt – et API for data", component: SlideDatakontrakt },
  { id: "datakontrakt-brudd", name: "Kontrakten stopper feilen tidlig", component: SlideDatakontraktBrudd },
  { id: "governance", name: "Governance: kontrakter, eierskap, katalog", component: SlideGovernance, steps: 2 },
  { id: "feiler-organisatorisk", name: "Plattformer feiler organisatorisk", component: SlideFeilerOrganisatorisk, steps: 1 },
  { id: "roller", name: "Tydelige roller", component: SlideRoller, steps: 4 },
  { id: "effekter", name: "Effekter av dataplattform", component: SlideEffekter },
  { id: "effekt-1", name: "Effekt 1 – Kvalitet", component: SlideEffektKvalitet },
  { id: "effekt-2", name: "Effekt 2 – Etterlevelse", component: SlideEffektEtterlevelse },
  { id: "effekt-3", name: "Effekt 3 – Effektivitet", component: SlideEffektEffektivitet },
  { id: "effekt-4", name: "Effekt 4 – Fremtidsrettet", component: SlideEffektFremtid },
  { id: "azure-databricks", name: "Azure + Databricks", component: SlideAzureDatabricks },
  { id: "azure", name: "Azure – fundamentet", component: SlideAzure, steps: 4 },
  { id: "databricks", name: "Databricks – motoren", component: SlideDatabricks, steps: 3 },
  { id: "strommen", name: "100 millioner rader. Hver dag.", component: SlideStrommen, steps: 1 },
  { id: "regnestykke", name: "Regnestykket", component: SlideRegnestykke, steps: 2 },
  { id: "pipeline", name: "Fra antenne til innsikt", component: SlidePipeline, steps: 5 },
  { id: "serverless", name: "Databricks serverless", component: SlideServerless, steps: 3 },
  { id: "stordata-volum", name: "Strømmen er liten, historikken er stor", component: SlideStordataVolum, steps: 4 },
  { id: "stordata-compute", name: "Døgn med kjøretid – eller timer?", component: SlideStordataCompute, steps: 7 },
  { id: "hais", name: "HAIS – historisk uttrekk på bestilling", component: SlideHais, steps: 4 },
  { id: "modeller", name: "Fra posisjoner til utslipp", component: SlideModeller },
  { id: "modell-flyt", name: "Fire moduler, ikke én modell", component: SlideModellFlyt, steps: 5 },
  { id: "martraf", name: "Maritim trafikkmodell – MarTraf", component: SlideMarTraf, steps: 5 },
  { id: "martraf-valg", name: "Valgene som gjør det mulig", component: SlideMarTrafValg, steps: 3 },
  { id: "maru", name: "Maritim utslippsmodell – MarU", component: SlideMarU, steps: 4 },
  { id: "maru-hull", name: "ML som datakvalitetsverktøy", component: SlideMarUHull, steps: 5 },
  { id: "maru-ut", name: "Hva kommer ut?", component: SlideMarUUt, steps: 5 },
  { id: "maru-hvorfor", name: "Hvorfor ikke bare salgstall?", component: SlideMarUHvorfor, steps: 4 },
  { id: "veien-videre", name: "Veien videre", component: SlideVeienVidere },
  { id: "hvor-vi-er", name: "Hvor vi er: én kilde, én katalogstruktur", component: SlideHvorViEr, steps: 2 },
  { id: "hvor-vi-skal", name: "Hvor vi skal: domenekataloger og dataprodukter", component: SlideHvorViSkal, steps: 5 },
  { id: "domene-effekt", name: "Tydelig eierskap, kostnad og forvaltning", component: SlideDomeneEffekt, steps: 4 },
  { id: "videre-liste", name: "Dette vil vi få til", component: SlideVidereListe, steps: 5 },
];

export const ndcKystverket: PresentationDef = {
  id: "26-ndc-kystverket",
  title: "100 millioner rader om dagen – dataplattformen bak sjøveien",
  description:
    "Hvordan Kystverket live-tracker alle skip i norske farvann med Azure og Databricks serverless – NDC 2026.",
  date: "NDC 2026",
  slides: withNotes(SLIDES, notesRaw),
};
