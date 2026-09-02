import type { PresentationDef, SlideDef } from "../types";
import { withNotes } from "../notes";
import notesRaw from "./notes.md";
import { TIDSLINJE_STEG } from "./figurer";
import {
  SlideForside,
  SlideTidslinje,
  SlideMoensteret,
  SlideKapDatabasen,
  SlideSiloer,
  SlideRelasjonsmodellen,
  SlideDatabasenSpeil,
  SlideKapVarehuset,
  SlideVarehuset,
  SlideFinans,
  SlideVarehusetSpeil,
  SlideKapBigdata,
  SlideRegnestykket,
  SlideDatasjoen,
  SlideSjoenSpeil,
  SlideKapSkyen,
  SlideSkyen,
  SlideLakehouse,
  SlideArven,
  SlideAvslutning,
} from "./slides";

const SLIDES: SlideDef[] = [
  { id: "forside", name: "Historien om dataplattformen", component: SlideForside },
  { id: "tidslinje", name: "Fem faser – ett problem", component: SlideTidslinje, steps: TIDSLINJE_STEG },
  { id: "moensteret", name: "Mønsteret som driver historien", component: SlideMoensteret },
  { id: "kap-databasen", name: "1970 · Databasen", component: SlideKapDatabasen },
  { id: "siloer", name: "Hvert program eide sine egne filer", component: SlideSiloer },
  { id: "relasjonsmodellen", name: "Codd: skill spørsmålet fra lagringen", component: SlideRelasjonsmodellen },
  { id: "databasen-speil", name: "Databasen: løst og nytt problem", component: SlideDatabasenSpeil },
  { id: "kap-varehuset", name: "1988 · Datavarehuset", component: SlideKapVarehuset },
  { id: "varehuset", name: "Ett integrert varehus", component: SlideVarehuset },
  { id: "finans", name: "Bankene var først", component: SlideFinans },
  { id: "varehuset-speil", name: "Varehuset: løst og nytt problem", component: SlideVarehusetSpeil },
  { id: "kap-bigdata", name: "2006 · Big data", component: SlideKapBigdata },
  { id: "regnestykket", name: "Googles svar: distribuer alt", component: SlideRegnestykket },
  { id: "datasjoen", name: "Datasjøen: lagre alt, rått", component: SlideDatasjoen },
  { id: "sjoen-speil", name: "Sjøen: løst og nytt problem", component: SlideSjoenSpeil },
  { id: "kap-skyen", name: "2012 · Skyen", component: SlideKapSkyen },
  { id: "skyen", name: "Skill lagring fra regnekraft", component: SlideSkyen },
  { id: "lakehouse", name: "To spor møtes: lakehouse", component: SlideLakehouse },
  { id: "arven", name: "Plattformen lag for lag", component: SlideArven },
  { id: "avslutning", name: "Problemet består", component: SlideAvslutning },
];

export const historienOmDataplattform: PresentationDef = {
  id: "01_historien_om_dataplattform",
  title: "Historien om dataplattformen",
  description:
    "Fra databasen via datavarehuset til lakehouse – hver fase speilet mot problemet den skulle løse, og hvorfor vi er der vi er.",
  date: "September 2026",
  slides: withNotes(SLIDES, notesRaw),
};
