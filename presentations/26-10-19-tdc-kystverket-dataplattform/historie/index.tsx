import type { PresentationDef, SlideDef } from "../../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../../chapters";
import { TIDSLINJE_STEG } from "./figurer";
import {
  SlideForside,
  SlideTidslinje,
  SlideRelasjonsmodellen,
  SlideDatabasenSpeil,
  SlideVarehuset,
  SlideVarehusetSpeil,
  SlideRegnestykket,
  SlideDatasjoen,
  SlideSjoenSpeil,
  SlideSkyen,
  SlideLakehouse,
  SlideAvslutning,
} from "./slides";

const SLIDES: SlideDef[] = [
  { id: "forside", name: "Historien om dataplattformen", component: SlideForside },
  { id: "tidslinje", name: "Fem faser, ett problem", component: SlideTidslinje, steps: TIDSLINJE_STEG },
  { id: "relasjonsmodellen", name: "1970 · Databasen", component: SlideRelasjonsmodellen },
  { id: "databasen-speil", name: "Databasen: løst, og et nytt problem", component: SlideDatabasenSpeil },
  { id: "varehuset", name: "1988 · Datavarehuset", component: SlideVarehuset },
  { id: "varehuset-speil", name: "Varehuset: løst, og et nytt problem", component: SlideVarehusetSpeil },
  { id: "regnestykket", name: "2006 · Stordata", component: SlideRegnestykket },
  { id: "datasjoen", name: "2010 · Datasjøen", component: SlideDatasjoen },
  { id: "sjoen-speil", name: "Sjøen: løst, og et nytt problem", component: SlideSjoenSpeil },
  { id: "skyen", name: "2012 · Skyen", component: SlideSkyen },
  { id: "lakehouse", name: "2020 · Lakehouse", component: SlideLakehouse },
  { id: "avslutning", name: "Data varer lenger enn systemene", component: SlideAvslutning, steps: 1 },
];

export const historyOfTheDataPlatform: PresentationDef = definePresentation({
  id: "26-tdc-historie",
  title: "Historien om dataplattformen",
  description:
    "Fra databasen via datavarehuset til lakehouse: hver fase speilet mot problemet den skulle løse, og hvorfor vi er der vi er.",
  date: "TDC 2026",
  notes: notesRaw,
  chapters: [
    {
      id: "historie",
      title: "Historien om dataplattformen",
      slides: SLIDES,
    },
  ],
});
