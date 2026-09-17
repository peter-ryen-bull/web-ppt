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
  s(1, "hjerne", "Hjerne"),
  s(2, "weinstein", "Teaching the Science of Learning"),
  s(3, "svigermor", "Svigermor"),
];

const RETRIEVAL: SlideDef[] = [
  s(4, "teknikk-1", "Teknikk 1"),
  s(5, "gjett-ordet", "R______n"),
  s(6, "andel-vinner", "60 %"),
  s(7, "r-blank", "R_______n"),
  s(8, "repetisjon", "Repetisjon"),
  s(9, "ko-kr", "Ko______ kr______"),
  s(10, "metoder-liste", "True false til fri husking"),
  s(11, "metoder-kurve", "Kurven"),
  s(12, "metoder-gpt", "GPT"),
  s(13, "donts", "Don’ts"),
  s(14, "ko-kr-igjen", "Ko______ kr______"),
  s(15, "kognitivt-krevende", "Kognitivt krevende"),
];

const SPACING: SlideDef[] = [
  s(16, "teknikk-2", "Teknikk 2"),
  s(17, "spaced-oppsett", "Samlet eller spredt"),
  s(18, "spaced-2x", "2× bedre"),
  s(19, "intervaller", "Spredt repetisjon"),
  s(20, "intervall-1dag", "1 dag"),
  s(21, "intervall-3dager", "3 dager"),
  s(22, "intervall-7dager", "7 dager"),
  s(23, "intervall-30dager", "30 dager"),
  s(24, "intervall-90dager", "90 dager"),
  s(25, "intervall-1ar", "1 år"),
  s(26, "anki", "Anki"),
  s(27, "anki-dekk", "Anki-dekk"),
  s(28, "anki-kort", "Anki-kort"),
  s(29, "anki-kort-aapent", "Anki-kort åpent"),
];

const AVSLUTNING: SlideDef[] = [
  s(30, "traaden", "Kognitivt krevende"),
  s(31, "hva-na", "Hva nå"),
  s(32, "hva-na-2", "Penn og papir"),
  s(33, "hva-na-3", "Anki"),
  s(34, "hva-na-4", "Prøv før du slår opp"),
  s(35, "hva-na-5", "ChatGPT"),
  s(36, "hva-na-6", "Weinstein"),
  s(37, "takk", "Takk"),
];

export const boosterDuErIkkeDum = definePresentation({
  id: "26-03-11-booster-du-er-ikke-dum",
  title: "Du er ikke dum – En forskningsbasert metode for å lære fort",
  description:
    "Hvorfor du glemmer det du leser, og teknikkene som faktisk virker. Retrieval og spacing, fra Weinstein et al. Booster 2026.",
  date: "11. mars 2026",
  place: "Booster",
  tags: ["conference"],
  icon: (
    <BildeIkon src="/media/26-03-11-booster-du-er-ikke-dum/ikon.png" />
  ),
  notes: notesRaw,
  chapters: [
    { id: "apning", title: "Åpningen", slides: APNING },
    { id: "retrieval", title: "Teknikk 1: Husk for å huske", slides: RETRIEVAL },
    { id: "spacing", title: "Teknikk 2: Spredt repetisjon", slides: SPACING },
    { id: "avslutning", title: "Tråden og veien videre", slides: AVSLUTNING },
  ],
});
