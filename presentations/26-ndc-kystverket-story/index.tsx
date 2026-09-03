import type { PresentationDef, SlideDef } from "../types";
import { withNotes } from "../notes";
import notesRaw from "./notes.md";
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
 *  Akt 3  Hvorfor plattform  12:00  Uber, hverdagen, byggeklossene, kontrakter, folk
 *  Akt 4  Hva får du igjen   27:00  fire effekter med eksempler fra sjøveien
 *  Akt 5  Prosjektet         32:00  dag én, verktøykassa, terraform, ingest, strømmen, historikken
 *  Akt 6  Modellene          43:00  følg ett skip, propellloven, klimaregnskapet
 *  Akt 7  Veien videre       53:00  domener, kontrakter, og tilbake til Stad
 */
const SLIDES: SlideDef[] = [
  // Akt 1: Åpningen
  { id: "scene", name: "Klokka er 03:14", component: SlideScene, steps: 3 },
  { id: "signal", name: "Hvert tiende sekund sier skipet", component: SlideSignal, steps: 2 },
  { id: "nais", name: "Noen lytter: NAIS", component: SlideNais, steps: 1 },
  { id: "hundre-millioner", name: "100 000 000 hver dag", component: SlideHundreMillioner, steps: 2 },
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "om-peter", name: "Peter Bull", component: SlideOmPeter, steps: 3 },

  // Akt 2: Hvem lytter, og hvorfor
  { id: "kystverket", name: "Hvem lytter? Kystverket", component: SlideKystverket },
  { id: "visjon", name: "Verdens sikreste og reneste kyst", component: SlideVisjon, steps: 1 },
  { id: "oppdrag", name: "Ett oppdrag, to halvdeler", component: SlideOppdrag, steps: 3 },
  { id: "lyttepostene", name: "Lyttepostene", component: SlideLyttepostene, steps: 4 },
  { id: "ais", name: "AIS: laget for å ikke kollidere", component: SlideAis, steps: 3 },
  { id: "sporsmalet", name: "Hva gjør du med 8,9 milliarder meldinger?", component: SlideSporsmalet, steps: 1 },

  // Akt 3: Hvorfor bygger alle dataplattform
  { id: "hva-er", name: "Hvorfor bygger alle dataplattform?", component: SlideHvaEr },
  { id: "uber", name: "Uber, 2014", component: SlideUber, steps: 4 },
  { id: "hvorfor", name: "Du brukte fire dataplattformer i dag", component: SlideHvorfor, steps: 5 },
  { id: "dataflyt", name: "Dataflyt: kilder til konsumenter", component: SlideDataflyt },
  { id: "arkitektur", name: "Arkitektur: kilde til konsument", component: SlideArkitektur },
  { id: "samle-data", name: "Samle, analysere, dele", component: SlideSamleData, steps: 2 },
  { id: "batch-streaming", name: "Batch eller streaming?", component: SlideBatchStreamingKapittel },
  { id: "batch-vs-streaming", name: "Batch vs. streaming: flyt", component: SlideBatchVsStreaming },
  { id: "batch-streaming-valg", name: "Når velger du hva?", component: SlideBatchStreamingValg, steps: 7 },
  { id: "mer-enn-varehus", name: "Mer enn et datavarehus", component: SlideMerEnnVarehus, steps: 2 },
  { id: "dataprodukt", name: "Dataprodukt", component: SlideDataprodukt },
  { id: "dataprodukt-anatomi", name: "Mer enn en tabell", component: SlideDataproduktAnatomi },
  { id: "datakontrakt", name: "Datakontrakt: et API for data", component: SlideDatakontrakt },
  { id: "datakontrakt-brudd", name: "Kontrakten stopper feilen tidlig", component: SlideDatakontraktBrudd },
  { id: "governance", name: "Governance: kontrakter, eierskap, katalog", component: SlideGovernance, steps: 2 },
  { id: "feiler-organisatorisk", name: "Plattformer feiler på mennesker", component: SlideFeilerOrganisatorisk, steps: 1 },
  { id: "roller", name: "Tydelige roller", component: SlideRoller, steps: 4 },

  // Akt 4: Hva får du igjen
  { id: "effekter", name: "Hva får du igjen?", component: SlideEffekter },
  { id: "effekt-1", name: "Effekt 1: Kvalitet", component: SlideEffektKvalitet, steps: 1 },
  { id: "effekt-2", name: "Effekt 2: Etterlevelse", component: SlideEffektEtterlevelse, steps: 1 },
  { id: "effekt-3", name: "Effekt 3: Effektivitet", component: SlideEffektEffektivitet, steps: 1 },
  { id: "effekt-4", name: "Effekt 4: Fremtidsrettet", component: SlideEffektFremtid, steps: 1 },

  // Akt 5: Historien om prosjektet
  { id: "prosjekt", name: "Historien om prosjektet", component: SlideProsjekt },
  { id: "dag-en", name: "Dag én", component: SlideDagEn, steps: 3 },
  { id: "azure-databricks", name: "Azure + Databricks", component: SlideAzureDatabricks },
  { id: "azure", name: "Azure: grunnmuren", component: SlideAzure, steps: 4 },
  { id: "databricks", name: "Databricks: motoren", component: SlideDatabricks, steps: 3 },
  { id: "terraform", name: "Vi klikker ikke. Vi committer.", component: SlideTerraform, steps: 4 },
  { id: "fire-states", name: "Fire states. Fire pipelines.", component: SlideFireStates, steps: 5 },
  { id: "terraform-dabs", name: "Infrastruktur og logikk. To verktøy.", component: SlideTerraformDabs, steps: 3 },
  { id: "ingest", name: "Innlesingen skjer utenfor Databricks.", component: SlideIngest, steps: 3 },
  { id: "ingest-flyt", name: "Hente. Dumpe. Så lakehouse.", component: SlideIngestFlyt, steps: 5 },
  { id: "strommen", name: "100 millioner rader. Hver dag.", component: SlideStrommen, steps: 1 },
  { id: "regnestykke", name: "Regnestykket", component: SlideRegnestykke, steps: 2 },
  { id: "pipeline", name: "Fra antenne til innsikt", component: SlidePipeline, steps: 5 },
  { id: "serverless", name: "Ingen klynger å vekke om natta", component: SlideServerless, steps: 3 },
  { id: "stordata-volum", name: "Strømmen er liten, historikken er stor", component: SlideStordataVolum, steps: 4 },
  { id: "stordata-compute", name: "Døgn med kjøretid, eller timer?", component: SlideStordataCompute, steps: 7 },
  { id: "hais", name: "HAIS: historisk uttrekk på bestilling", component: SlideHais, steps: 4 },

  // Akt 6: Fra posisjoner til utslipp
  { id: "modeller", name: "Fra posisjoner til utslipp", component: SlideModeller },
  { id: "modell-flyt", name: "Fire moduler, ikke én modell", component: SlideModellFlyt, steps: 5 },
  { id: "folg-ett-skip", name: "Følg ett skip", component: SlideFolgEttSkip, steps: 6 },
  { id: "martraf", name: "Maritim trafikkmodell: MarTraf", component: SlideMarTraf, steps: 5 },
  { id: "martraf-valg", name: "Valgene som gjør det mulig", component: SlideMarTrafValg, steps: 3 },
  { id: "propellloven", name: "Propellloven", component: SlidePropellloven, steps: 3 },
  { id: "maru", name: "Maritim utslippsmodell: MarU", component: SlideMarU, steps: 4 },
  { id: "maru-hull", name: "ML som datakvalitetsverktøy", component: SlideMarUHull, steps: 5 },
  { id: "maru-ut", name: "Hva kommer ut?", component: SlideMarUUt, steps: 5 },
  { id: "maru-hvorfor", name: "Hvorfor ikke bare salgstall?", component: SlideMarUHvorfor, steps: 4 },

  // Akt 7: Veien videre, og tilbake til Stad
  { id: "veien-videre", name: "Veien videre", component: SlideVeienVidere },
  { id: "hvor-vi-er", name: "Hvor vi er: én kilde, én katalogstruktur", component: SlideHvorViEr, steps: 2 },
  { id: "hvor-vi-skal", name: "Hvor vi skal: domenekataloger og dataprodukter", component: SlideHvorViSkal, steps: 5 },
  { id: "domene-effekt", name: "Tydelig eierskap, kostnad og forvaltning", component: SlideDomeneEffekt, steps: 4 },
  { id: "videre-liste", name: "Dette vil vi få til", component: SlideVidereListe, steps: 5 },
  { id: "tilbake-til-stad", name: "Tilbake til Stad", component: SlideTilbakeTilStad, steps: 3 },
  { id: "takk", name: "Takk. Prøv selv.", component: SlideTakk },
];

export const ndcKystverketStory: PresentationDef = {
  id: "26-ndc-kystverket-story",
  title: "100 millioner rader om dagen: dataplattformen bak sjøveien (storytelling-versjon)",
  description:
    "Fra ett AIS-signal utenfor Stad til klimaregnskapet i en kommune. Historien om hvordan Kystverket bygde dataplattform med Azure og Databricks serverless. NDC 2026, 60 minutter.",
  date: "NDC 2026",
  slides: withNotes(SLIDES, notesRaw),
};
