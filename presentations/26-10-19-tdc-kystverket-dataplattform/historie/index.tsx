import type { PresentationDef, SlideDef } from "../../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../../chapters";
import { TIDSLINJE_STEG } from "./figurer";
import {
  SlideForside,
  SlideTidslinje,
  SlideRelasjonsmodellen,
  SlideVarehuset,
  SlideRegnestykket,
  SlideDatasjoen,
  SlideSkyen,
  SlideLakehouse,
  SlideAvslutning,
} from "./slides";

const SLIDES: SlideDef[] = [
  { id: "forside", name: "Historien om dataplattformen", component: SlideForside },
  { id: "tidslinje", name: "Seks faser, ett problem", component: SlideTidslinje, steps: TIDSLINJE_STEG },
  { id: "relasjonsmodellen", name: "1970 · Databasen", component: SlideRelasjonsmodellen },
  { id: "varehuset", name: "1988 · Datavarehuset", component: SlideVarehuset },
  { id: "regnestykket", name: "2006 · Stordata", component: SlideRegnestykket },
  { id: "datasjoen", name: "2010 · Datasjøen", component: SlideDatasjoen },
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
  copy: copyRaw,
  chapters: [
    {
      id: "historie",
      title: "Historien om dataplattformen",
      slides: SLIDES,
    },
  ],
});
