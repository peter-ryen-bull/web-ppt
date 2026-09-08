import type { PresentationDef, SlideDef } from "../../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../../chapters";
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
  { id: "forside", name: "The story of the data platform", component: SlideForside },
  { id: "tidslinje", name: "Five phases, one problem", component: SlideTidslinje, steps: TIDSLINJE_STEG },
  { id: "moensteret", name: "The pattern that drives the story", component: SlideMoensteret },
  { id: "kap-databasen", name: "1970 · The database", component: SlideKapDatabasen },
  { id: "siloer", name: "Every program owned its own files", component: SlideSiloer },
  { id: "relasjonsmodellen", name: "Codd: separate the question from the storage", component: SlideRelasjonsmodellen },
  { id: "databasen-speil", name: "The database: solved, and a new problem", component: SlideDatabasenSpeil },
  { id: "kap-varehuset", name: "1988 · The data warehouse", component: SlideKapVarehuset },
  { id: "varehuset", name: "One integrated warehouse", component: SlideVarehuset },
  { id: "finans", name: "The banks were first", component: SlideFinans },
  { id: "varehuset-speil", name: "The warehouse: solved, and a new problem", component: SlideVarehusetSpeil },
  { id: "kap-bigdata", name: "2006 · Big data", component: SlideKapBigdata },
  { id: "regnestykket", name: "Google's answer: distribute everything", component: SlideRegnestykket },
  { id: "datasjoen", name: "The data lake: store everything, raw", component: SlideDatasjoen },
  { id: "sjoen-speil", name: "The lake: solved, and a new problem", component: SlideSjoenSpeil },
  { id: "kap-skyen", name: "2012 · The cloud", component: SlideKapSkyen },
  { id: "skyen", name: "Separate storage and compute", component: SlideSkyen },
  { id: "lakehouse", name: "Two tracks meet: the lakehouse", component: SlideLakehouse },
  { id: "arven", name: "The platform, layer by layer", component: SlideArven },
  { id: "avslutning", name: "The problem remains", component: SlideAvslutning },
];

export const historyOfTheDataPlatform: PresentationDef = definePresentation({
  id: "26-ndc-historie",
  title: "The story of the data platform",
  description:
    "From the database via the data warehouse to the lakehouse – each phase mirrored against the problem it was meant to solve, and why we are where we are.",
  date: "NDC 2026",
  notes: notesRaw,
  chapters: [
    {
      id: "historie",
      title: "The story of the data platform",
      slides: SLIDES,
    },
  ],
});
