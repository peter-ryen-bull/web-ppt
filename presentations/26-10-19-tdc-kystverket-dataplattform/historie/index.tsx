import type { PresentationDef, SlideDef } from "../../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../../chapters";
import { TIDSLINJE_STEG } from "./figurer";
import {
  SlideForside,
  SlideTidslinje,
  SlideLakehouse,
  SlideAvslutning,
} from "./slides";

const SLIDES: SlideDef[] = [
  { id: "forside", name: "Historien om dataplattformen", component: SlideForside },
  { id: "tidslinje", name: "Seks faser, ett problem", component: SlideTidslinje, steps: TIDSLINJE_STEG },
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
