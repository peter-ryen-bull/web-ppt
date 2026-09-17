import type { SlideDef } from "../types";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { BildeIkon } from "@/components/icons/BildeIkon";
import { SlideBilde } from "./slides";

function s(n: number, id: string, name: string): SlideDef {
  function Slide() {
    return <SlideBilde n={n} alt={name} />;
  }
  Slide.displayName = `Slide${String(n).padStart(2, "0")}`;
  return { id, name, component: Slide };
}

const APNING: SlideDef[] = [
  s(1, "forside", "SFI Smart Ocean"),
  s(2, "partnere", "Partnere"),
  s(3, "senteret", "Senteret"),
];

const DASHBOARDS: SlideDef[] = [
  s(4, "temperatur-dyp", "Temperatur etter dyp"),
  s(5, "temperatur-kart", "Temperatur og kart"),
  s(6, "sykdom", "Sykdomsutbrudd"),
  s(7, "lus", "Temperatur og lus"),
];

const AVSLUTNING: SlideDef[] = [s(8, "takk", "Takk")];

export const boosterSmartOcean = definePresentation({
  id: "22-03-23-booster-smart-ocean",
  title: "How Digitalizing The Ocean Creates a Brighter Future for Everyone",
  description:
    "SFI Smart Ocean: hvordan data og dashboards kan gjøre havindustrien mer bærekraftig og produktiv. Lightning talk på Booster 2022, med Morten Nygaard Åsnes.",
  date: "23. mars 2022",
  place: "Booster",
  tags: ["conference"],
  icon: <BildeIkon src="/media/sfi-smart-ocean-logo.png" alt="SFI Smart Ocean" />,
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "Senteret", slides: APNING },
    { id: "dashboards", title: "Dashboards", slides: DASHBOARDS },
    { id: "avslutning", title: "Avslutning", slides: AVSLUTNING },
  ],
});
