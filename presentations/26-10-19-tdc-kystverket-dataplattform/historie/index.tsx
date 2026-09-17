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
  { id: "forside", name: "The story of the data platform", component: SlideForside },
  { id: "tidslinje", name: "Five phases, one problem", component: SlideTidslinje, steps: TIDSLINJE_STEG },
  { id: "relasjonsmodellen", name: "1970 · The database", component: SlideRelasjonsmodellen },
  { id: "databasen-speil", name: "The database: solved, and a new problem", component: SlideDatabasenSpeil },
  { id: "varehuset", name: "1988 · The data warehouse", component: SlideVarehuset },
  { id: "varehuset-speil", name: "The warehouse: solved, and a new problem", component: SlideVarehusetSpeil },
  { id: "regnestykket", name: "2006 · Big data", component: SlideRegnestykket },
  { id: "datasjoen", name: "2010 · The data lake", component: SlideDatasjoen },
  { id: "sjoen-speil", name: "The lake: solved, and a new problem", component: SlideSjoenSpeil },
  { id: "skyen", name: "2012 · The cloud", component: SlideSkyen },
  { id: "lakehouse", name: "2020 · The lakehouse", component: SlideLakehouse },
  { id: "avslutning", name: "Data lasts longer than the systems", component: SlideAvslutning, steps: 1 },
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
      title: "The story of the data platform",
      slides: SLIDES,
    },
  ],
});
