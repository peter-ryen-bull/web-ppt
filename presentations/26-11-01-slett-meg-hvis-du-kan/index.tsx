import type { SlideDef } from "../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";
import { StrekIkon } from "./figurer/ikoner";
import { SlideForside, SlideScene } from "./intro";
import { SlideKapRegler, SlideLoven, SlideUnntak } from "./regler";
import {
  SlideKapEnkel,
  SlideKart,
  SlideLogg,
  SlideNaiv,
  SlideRapport,
  SlideSlack,
} from "./enkel";
import {
  SlideBackup,
  SlideKapLagring,
  SlideSoftDelete,
  SlideVersjoner,
} from "./lagring";
import {
  SlideHashing,
  SlideKapMetoder,
  SlideKrypto,
  SlideMetoder,
  SlideOppslag,
} from "./metoder";
import {
  SlideBestilling,
  SlideKapDrift,
  SlideLineage,
  SlideNedstroms,
  SlideSamtidig,
  SlideSletteregister,
  SlideVerktoy,
} from "./drift";
import { SlideSlutt, SlideSporsmaal } from "./slutt";

const INTRO: SlideDef[] = [
  { id: "forside", name: "Forside", component: SlideForside },
  {
    id: "scene",
    name: "Mandag 08:12: e-posten fra Kari",
    component: SlideScene,
    steps: 2,
  },
];

const REGLER: SlideDef[] = [
  { id: "kap-regler", name: "Hva sier loven?", component: SlideKapRegler },
  {
    id: "loven",
    name: "GDPR artikkel 17: retten til sletting",
    component: SlideLoven,
    steps: 3,
  },
  {
    id: "unntak",
    name: "Når du ikke skal slette",
    component: SlideUnntak,
    steps: 5,
  },
];

const ENKEL: SlideDef[] = [
  { id: "kap-enkel", name: "Den enkle løsningen", component: SlideKapEnkel },
  {
    id: "naiv",
    name: "Én tabell, én rad, én kommando",
    component: SlideNaiv,
    steps: 2,
  },
  {
    id: "kart",
    name: "Kari er mange steder",
    component: SlideKart,
    steps: 5,
  },
  {
    id: "slack",
    name: "Slack-meldingen sprer navnet",
    component: SlideSlack,
    steps: 3,
  },
  {
    id: "rapport",
    name: "Rapporten har sin egen kopi",
    component: SlideRapport,
    steps: 4,
  },
  {
    id: "logg",
    name: "Slettingen setter spor i loggen",
    component: SlideLogg,
    steps: 3,
  },
];

const LAGRING: SlideDef[] = [
  {
    id: "kap-lagring",
    name: "Å slette er ikke å slette",
    component: SlideKapLagring,
  },
  {
    id: "versjoner",
    name: "Tidsreise og VACUUM",
    component: SlideVersjoner,
    steps: 3,
  },
  {
    id: "backup",
    name: "Og sikkerhetskopien?",
    component: SlideBackup,
    steps: 3,
  },
  {
    id: "soft-delete",
    name: "«Slettet» er ikke slettet",
    component: SlideSoftDelete,
    steps: 4,
  },
];

const METODER: SlideDef[] = [
  {
    id: "kap-metoder",
    name: "Flere måter å slette på",
    component: SlideKapMetoder,
  },
  {
    id: "metoder",
    name: "Fire måter å få Kari til å forsvinne",
    component: SlideMetoder,
    steps: 5,
  },
  {
    id: "oppslag",
    name: "Oppslagstabell: fjern koblingen",
    component: SlideOppslag,
    steps: 2,
  },
  {
    id: "krypto",
    name: "Kryptering: slett nøkkelen",
    component: SlideKrypto,
    steps: 3,
  },
  {
    id: "hashing",
    name: "Hashing er ikke sletting",
    component: SlideHashing,
    steps: 2,
  },
];

const DRIFT: SlideDef[] = [
  {
    id: "kap-drift",
    name: "Slik gjør du det i praksis",
    component: SlideKapDrift,
  },
  {
    id: "samtidig",
    name: "Alle leser samme tabell samtidig",
    component: SlideSamtidig,
    steps: 3,
  },
  {
    id: "nedstroms",
    name: "Kilden sier ikke at noe er borte",
    component: SlideNedstroms,
    steps: 3,
  },
  {
    id: "bestilling",
    name: "Fra e-post til bekreftet sletting",
    component: SlideBestilling,
    steps: 6,
  },
  {
    id: "sletteregister",
    name: "Sletteregisteret",
    component: SlideSletteregister,
    steps: 3,
  },
  {
    id: "lineage",
    name: "Lineage: hva verktøyet ser",
    component: SlideLineage,
    steps: 3,
  },
  {
    id: "verktoy",
    name: "Hva verktøy gjør, og ikke gjør",
    component: SlideVerktoy,
    steps: 3,
  },
];

const SLUTT: SlideDef[] = [
  {
    id: "sporsmaal",
    name: "Fem spørsmål du kan stille i morgen",
    component: SlideSporsmaal,
    steps: 5,
  },
  {
    id: "slutt",
    name: "Sletting er ikke en kommando",
    component: SlideSlutt,
    steps: 1,
  },
];

export const slettMegHvisDuKan = definePresentation({
  id: "26-11-01-slett-meg-hvis-du-kan",
  title: "Slett meg hvis du kan",
  description:
    "Sletting, lineage og personvern i en dataplattform: fra GDPR-krav til tidsreise, backup, hashing og sletteregister.",
  tags: ["conference"],
  inProgress: true,
  icon: (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <StrekIkon navn="nokkel" size={42} color="var(--burgundy)" strokeWidth={1.5} />
    </div>
  ),
  notes: notesRaw,
  copy: copyRaw,
  chapters: [
    { id: "intro", title: "Åpning", slides: INTRO },
    { id: "regler", title: "Hva sier loven?", slides: REGLER },
    { id: "enkel", title: "Den enkle løsningen", slides: ENKEL },
    { id: "lagring", title: "Å slette er ikke å slette", slides: LAGRING },
    { id: "metoder", title: "Flere måter å slette på", slides: METODER },
    { id: "drift", title: "I praksis", slides: DRIFT },
    { id: "slutt", title: "Avslutning", slides: SLUTT },
  ],
});
