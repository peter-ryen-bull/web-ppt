import type { PresentationDef, SlideDef } from "../types";
import { withNotes } from "../notes";
import notesRaw from "./notes.md";
import {
  Slide01Forside,
  Slide02Hvorfor,
  Slide03OmPeter,
  Slide04DataOgAI,
  Slide05Pains1,
  Slide06Pains2,
  Slide07Stoe,
  Slide08HvaEr,
  Slide09Logoer,
} from "./intro";
import {
  Slide10Diagram,
  Slide11Diagram,
  Slide12Diagram,
  Slide13Diagram,
  Slide14Diagram,
  Slide15Diagram,
} from "./diagram";
import {
  Slide16Samle,
  Slide17DataSomProdukt,
  Slide18Dataprodukt,
  Slide19Datakontrakt,
  Slide20Yaml,
} from "./produkt";
import {
  Slide26Hvordan,
  Slide27Roller,
  Slide28Dataprodukter,
  Slide29Metadata,
  Slide30Forvaltning,
  Slide31Skaler,
  Slide32Oppsummering,
  Slide33Avslutning,
} from "./hvordan";

const SLIDES: SlideDef[] = [
  { id: "forside", name: "Forside", component: Slide01Forside },
  { id: "hvorfor", name: "Hvorfor bygger 'alle' dataplattform?", component: Slide02Hvorfor },
  { id: "om-peter", name: "Peter Bull", component: Slide03OmPeter },
  { id: "data-og-ai", name: "Tjenesteområde: Data og AI", component: Slide04DataOgAI },
  { id: "pains-1", name: "Pains: Excelarket, Eposten …", component: Slide05Pains1 },
  { id: "pains-2", name: "Pains: Dokumentering, GDPR …", component: Slide06Pains2 },
  { id: "stoe-data", name: "Stø har et enormt datagrunnlag", component: Slide07Stoe },
  { id: "hva-er", name: "Hva er en dataplattform", component: Slide08HvaEr },
  { id: "logoer", name: "Databricks / Snowflake / Fabric", component: Slide09Logoer },
  { id: "diagram-1", name: "Arkitektur: kilder", component: Slide10Diagram },
  { id: "diagram-2", name: "Arkitektur: + lagring", component: Slide11Diagram },
  { id: "diagram-3", name: "Arkitektur: + transformering", component: Slide12Diagram },
  { id: "diagram-4", name: "Arkitektur: + eksponering", component: Slide13Diagram },
  { id: "diagram-5", name: "Arkitektur: + konsumenter", component: Slide14Diagram },
  { id: "diagram-6", name: "Arkitektur: komplett", component: Slide15Diagram },
  { id: "samle-data", name: "Samle data fra kildesystemer", component: Slide16Samle },
  { id: "data-som-produkt", name: "Data som produkt", component: Slide17DataSomProdukt },
  { id: "dataprodukt", name: "Dataprodukt", component: Slide18Dataprodukt },
  { id: "datakontrakt", name: "Datakontrakt", component: Slide19Datakontrakt },
  { id: "yaml", name: "Datakontrakt som YAML", component: Slide20Yaml },
  { id: "hvordan", name: "Hvordan begynner man?", component: Slide26Hvordan },
  { id: "roller", name: "1. Definere roller", component: Slide27Roller },
  { id: "dataprodukter-forst", name: "2. Bygge dataprodukter først", component: Slide28Dataprodukter },
  { id: "metadata", name: "3. Forvalte metadata og sikkerhet", component: Slide29Metadata },
  { id: "forvaltning", name: "Datakontrakter, eierskap, katalog", component: Slide30Forvaltning },
  { id: "skaler", name: "4. Skalér og fjern flaskehalser", component: Slide31Skaler },
  { id: "oppsummering", name: "Oppsummering", component: Slide32Oppsummering },
  { id: "avslutning", name: "Vi elsker å løse utfordringer!", component: Slide33Avslutning },
];

export const stoeDataplattform: PresentationDef = {
  id: "stoe-dataplattform",
  title: "Mer innsikt med en moderne dataplattform",
  description:
    "Hvorfor og hvordan bygge en moderne dataplattform – presentert for Stø.",
  date: "August 2026",
  slides: withNotes(SLIDES, notesRaw),
};
