# AGENTS.md

Next.js-app (App Router) for interaktive presentasjoner i nettleseren.
Forsiden (`/`) lister alt i `PRESENTATIONS`. Hver deck har tre URL-er:

| URL | Hva |
| --- | --- |
| `/<id>` | Øving/redigering med verktøylinje |
| `/<id>/presenter` | Presentatør: gjeldende + neste, notes, tidtakere |
| `/<id>/vis` | Publikum: kun sliden |

Brukeren øver og holder ofte live mot `http://localhost:3000`. Endringer skal
hot-reloades der – ikke start en ny Next-prosess.

Detaljer for mennesker (tastatur, to skjermer, PDF) står i `README.md`.
Denne filen er for agenten: struktur, regler og hvordan du lager slides.

## Dev-server: aldri start en ekstra

Brukeren kjører normalt allerede `npm run dev` på port 3000.

- **Ikke kjør `npm run dev` / `next dev` i denne mappen** uten å først sjekke
  om en server allerede lytter, og aldri hvis 3000 er opptatt:

  ```bash
  lsof -nP -iTCP:3000 -sTCP:LISTEN
  ```

  Bruk den som kjører (`http://localhost:3000`) til å verifisere endringer.

- Hvorfor: `next dev` sletter og gjenoppretter `.next/static`, `.next/server`
  og manifestene ved oppstart – også når den ender på port 3001 fordi 3000 er
  opptatt. Serveren som allerede kjører mister da filene sine, men webpack tror
  de fortsatt er skrevet og skriver dem ikke på nytt. Resultat: CSS-chunks
  (typisk `/_next/static/css/app/[presentation]/presenter/page.css`) gir 404
  og presentatørvisningen blir ustylet til brukeren restarter serveren.

- Samme gjelder `next build` og `rm -rf .next`. Typesjekk med
  `npx tsc --noEmit`.

- Trenger du en egen instans (f.eks. Playwright-skjermbilder), kopier
  prosjektet ut av repoet (uten `.next`, symlink `node_modules`) og kjør
  derfra på en annen port. Stopp den når du er ferdig.

## Repo-kart

```
app/
  page.tsx                     Forside
  [presentation]/page.tsx      Øving  →  /<id>
  [presentation]/presenter/    Presentatør
  [presentation]/vis/          Publikum
  api/notes/                   Skriver notes.md i dev
  api/copy/                    Skriver copy.yaml i dev
  globals.css                  Miles-farger og skriftvariabler
components/
  Deck.tsx                     Navigasjon, skjulte slides, steg
  SlideCanvas.tsx              Skalerer 1280×720-lerretet
  Copy.tsx                     Høyreklikk-redigering av publikumstekst
  steps.ts                     useStep() / StepContext
  figures/                     Engelske figurer (NDC-arkivet)
presentations/
  index.ts                     Register – nye decks må inn her
  types.ts                     SlideDef / ChapterDef / PresentationDef
  chapters.ts                  definePresentation, embedAsChapter
  parts.tsx                    Box, Img, Reveal, ChapterSlide, …
  notes.ts                     notes.md → SlideDef.notes
  copy.ts                      copy.yaml → SlideDef.copy
  status.ts                    isInProgress (flagg eller fremtidig dato)
  <id>/                        Én mappe per presentasjon
public/media/<id>/             Bilder, logoer, video per deck
research/                      Kildemateriale til innhold – ikke slides
```

Alias: `@/*` peker på repo-roten (`@/components/…`, `@/presentations`).
`notes.md` og `copy.yaml` importeres som tekst
(`import notesRaw from "./notes.md"`, `import copyRaw from "./copy.yaml"`)
via webpack-regelen i `next.config.mjs`.

## To slags decks

**1. Native React (slik du lager nye slides).** Hver slide er en
komponent på et fast 1280×720-lerret. Kapitler i egne filer
(`intro.tsx`, `plattform.tsx`, …). Bruk dette for alt under arbeid.

Beste maler:

- Konferanse, lang: `presentations/26-10-19-tdc-kystverket-dataplattform/`
- Pitch: `presentations/26-09-11-cloud-connection-kundemote/`
  (lokal `ui.tsx` med Header/Card/Stack) eller Stø-pitchen.

**2. PPTX-import (arkiv).** Ferdige talks eksportert som PNG
(`public/media/<id>/slide-NN.png`) og en `SlideBilde`-hjelper. Ikke
rediger etter import. Mønster: `26-05-26-offentlig-paas/`.

Noen eldre native decks (f.eks. TDC Strings, Stø) er gjenskapt fra
PowerPoint-XML (`EMU / 9525 = px`). Samme lerret og `parts.tsx`.

## Presentasjoner: under arbeid vs. arkiv

En presentasjon er **under arbeid** når `inProgress: true` er satt, eller når
id-en har et `YY-MM-DD`-prefiks i fremtiden (`isInProgress` i
`presentations/status.ts`). Åpne og les kun disse (og `presentations/*.ts`
med felles kode) med mindre brukeren eksplisitt peker på noe annet.

Ferdige presentasjoner er **arkiv og skrivebeskyttede**. Etter import skal
slides, `notes.md` og media **ikke redigeres**. Ny bruk: kopi eller
`embedAsChapter` – ikke endre originalen. Arkiverte skal stå i
`presentations/index.ts` så de vises på forsiden.

Rediger en ferdig presentasjon **bare** når brukeren eksplisitt ber om å
endre akkurat den (id, mappe eller dato+sted). «Fiks sliden om AIS» eller
«oppdater Du er ikke dum» er ikke nok. Er det tvil, spør.

Når du starter en ny: sett `inProgress: true` (fremtidig dato i id-en
holder også). Når den er holdt: fjern flagget (eller sett
`inProgress: false`).

**Under arbeid**

- `presentations/26-10-19-tdc-kystverket-dataplattform/` – TDC, 19. okt 2026.
  Norsk versjon av NDC-foredraget. Figurer ligger i `figurer/` (oversatt) –
  bruk dem, ikke `components/figures/`.

**Arkiv** (ikke les eller rediger uten at brukeren peker på akkurat denne):

- `22-03-23-booster-smart-ocean` – Booster 23. mar 2022. PNG-import.
- `24-10-22-tdc-du-er-ikke-dum` – TDC 22. okt 2024. PNG-import.
- `25-10-20-tdc-strings` – TDC 20. okt 2025. Native, fra PPTX-XML.
- `26-02-06-oppdal-tech-du-er-ikke-dum` – Oppdal Tech 6. feb 2026. PNG-import.
- `26-03-11-booster-du-er-ikke-dum` – Booster 11. mar 2026. PNG-import.
- `26-05-26-offentlig-paas` – Offentlig PaaS 26. mai 2026. PNG-import.
- `26-08-26-stoe-miles-kundeevent-dataplattform-pitch` – Stø 27. aug 2026.
- `26-09-11-cloud-connection-kundemote` – Cloud Connection 11. sep 2026.
- `26-09-17-ndc-kystverket-dataplatform` – NDC 17. sep 2026 (engelsk).
  Bruker `components/figures/` – også arkiv.

`26-03-04-konsulentlivet-miles-onboarding/` finnes som native deck, men er
ikke registrert i `presentations/index.ts`. Ikke rør den uten at brukeren
ber om det.

## Lage en ny presentasjon

1. Mappe `presentations/<id>/` der `id` er `YY-MM-DD-kort-slug` (datoen
   for arrangementet). Samme id brukes i URL og i `public/media/<id>/`.
2. `index.tsx` eksporterer en `PresentationDef` via `definePresentation`.
   Del slidene i kapitler; ett kapittel ≈ én fil.
3. `copy.yaml` med publikumstekst per slide-id. Send inn som
   `copy: copyRaw` til `definePresentation`.
4. `notes.md` med `## <slide-id>` per slide. Send inn som
   `notes: notesRaw` til `definePresentation`.
5. Registrer eksporten i `presentations/index.ts` (`PRESENTATIONS`).
   Uten dette vises den ikke.
6. Media i `public/media/<id>/`. Referer som `/media/<id>/fil.png`.
7. Sett `inProgress: true`, `tags` (`conference` | `pitch` | `private`),
   `date`, `place` og ev. `icon`
   (`<FyrIkon />` eller `<BildeIkon src="…/ikon.png" />`).

```tsx
import type { SlideDef } from "../types";
import copyRaw from "./copy.yaml";
import notesRaw from "./notes.md";
import { definePresentation } from "../chapters";

const INTRO: SlideDef[] = [
  { id: "forside", name: "Forside", component: SlideForside },
  { id: "scene", name: "Åpning", component: SlideScene, steps: 3 },
];

export const minPresentasjon = definePresentation({
  id: "26-11-01-eksempel",
  title: "Tittel",
  description: "Kort tekst til forsiden.",
  date: "1. november 2026",
  place: "TDC",
  tags: ["conference"],
  inProgress: true,
  notes: notesRaw,
  copy: copyRaw,
  chapters: [{ id: "intro", title: "Intro", slides: INTRO }],
});
```

Kapitler er intern oppdeling (oversikt + presentatør), aldri synlige for
publikum. En annen deck kan bli ett kapittel med
`embedAsChapter(annen, { id: "historie" })` – slide-id-er prefikses
(`historie-forside`). Da kan notes og copy ligge i kapittelmappens egen
`notes.md` og `copy.yaml`.

Gjenbruk arkiv ved å **kopiere** filer inn i den nye mappen, eller
`embedAsChapter`. Ikke rediger originalen.

Trenger du innhold om dataplattform / Kystverket / kontrakter: start i
`research/` (oppsummeringer og formuleringer), ikke i arkiverte slides.

## Skrive en slide (native)

Slides er vanlige funksjonskomponenter. Ingen sidemal, ingen Tailwind –
inline `style` og CSS-variablene i `app/globals.css`. Byggeklosser fra
`presentations/parts.tsx`.

- Lerretet er **1280×720**. Alt plasseres med
  `<Box box={[x, y, w, h]}>` (px på det lerretet).
- `pt(n)` = PowerPoint-punkt → px (`n * 4/3`). 1 PPT-pt ≈ 1.333 px.
- Farger: `var(--cream)` `#FBF0E5`, `var(--burgundy)` `#450D20`,
  `var(--red)` `#FF303B`, `var(--red-deep)` `#B72318`,
  `var(--teal)` `#004047`, `var(--mint)` `#78E8DB`,
  `var(--cream-dark)`, `var(--divider)`.
- Skrift: `var(--font-serif)` (Gelica) til titler,
  `var(--font-sans)` (DM Sans) til brødtekst.
- `MilesLogo` øverst til høyre på de fleste Miles-slides.
- `ChapterSlide` til kapittelforsider. `BulletList` / `BulletItem` til
  punktlister. `Img` / `Video` til media. `QuotePage` til sitat + bilde.
- Publikumstekst i `copy.yaml`, rendret med `<Copy k="…" />`
  (`import { Copy } from "@/components/Copy"`). Ikke hardkod titler,
  punktoppsett eller brødtekst i JSX. Figurer/SVG-etiketter kan stå i
  `figurer/`.
- Figurer: SVG-komponenter i deckens `figurer/` (eller
  `components/figures/` bare for engelsk NDC-arkiv).
- `"use client"` i filer som kaller `useStep` / `useRevealStyle`.

Klikk-steg (avdekking):

- `steps` på `SlideDef` = høyeste steg som brukes (første Neste-klikk
  er steg **1**). Uten `steps` har sliden ingen mellomsteg.
- I komponenten: `useStep()`, `<Reveal at={1}>…</Reveal>`,
  `useRevealStyle(n)`, eller `BulletList fromStep={1}`.
- Miniatyrer og PDF viser siste steg (alt avdekket). Hold `steps` i
  synk med `at={…}` – for høyt gir tomme klikk, for lavt hopper
  avdekkingen over.

```tsx
export function SlideScene() {
  const linje2 = useRevealStyle(2);
  return (
    <>
      <Box box={[80, 150, 1120, 360]}>
        <Copy k="line1" as="div" style={{ fontFamily: "var(--font-serif)",
                      fontSize: pt(66), color: "var(--burgundy)" }} />
        <Copy k="line2" as="div" style={{ fontFamily: "var(--font-serif)",
                      fontSize: pt(44), color: "var(--burgundy-2)", ...linje2 }} />
      </Box>
      <Reveal at={3}>
        <Box box={[80, 520, 1120, 80]} style={{ color: "var(--red)" }}>
          <Copy k="line3" />
        </Box>
      </Reveal>
    </>
  );
}
// SlideDef: { id: "scene", name: "Klokka er 03:14", component: SlideScene, steps: 3 }
// copy.yaml:
//   scene:
//     line1: "Klokka er 03:14."
//     line2: "Stadhavet. Februar."
//     line3: "Et lasteskip går nordover."
```

Skjul slides via øye-knappen i oversikten (`G`) – ikke slett dem. Skjulte
huskes i `localStorage` per deck.

## PPTX-import (bare ferdige talks)

Når brukeren ber om å arkivere en holdt PowerPoint:

1. Eksporter slides som PNG til `public/media/<id>/slide-01.png`, …
2. `slides.tsx` med `SlideBilde` som fyller 1280×720.
3. `index.tsx` med en liten `s(n, id, name)`-hjelper som i
   `26-05-26-offentlig-paas`.
4. `notes.md` + registrering. Ikke sett `inProgress` (eller sett `false`)
   når den er holdt.

Ikke konverter en talk som fortsatt øves til bilder – da mister du steg
og live-redigering.

## Publikumstekst (copy.yaml)

Publikumstekst ligger i `presentations/<id>/copy.yaml` (ev. nestet
`copy.yaml` i kapittelmapper, som notes). Nøkler er `SlideDef.id`, felt
er semantiske (`title`, `items`, `quote`, …).

```yaml
scene:
  line1: "Klokka er 03:14."
  items:
    - "Første punkt"
```

I sliden: `<Copy k="line1" />`, `<Copy k="items" i={0} />`,
`<Copy k="omrader" i={0} field="tittel" />`. I dev, på øvings- og
nåværende presentatørslide: høyreklikk → Rediger → Lagre skriver tilbake
via `app/api/copy/route.ts`. Arkiverte decks kan ikke skrives. `/vis`,
miniatyrer og PDF er skrivebeskyttet.

Speaker notes er et annet spor (`notes.md`). Ikke bland dem.

## Speaker notes

Notater ligger i `presentations/<id>/notes.md` (ev. nedarvede `notes.md`
i kapittelmapper). Redigeres også fra presentatørvisningen i dev via
`app/api/notes/route.ts`. **Skriv til filen – ikke inn i slide-komponentene.**

```md
# Kladd øverst ignoreres (disposisjon, tidsplan, rød tråd)

## forside – Forside
Det som står her vises i /presenter. Linjeskift bevares.

<!-- HTML-kommentarer vises aldri. -->

## scene
…
```

- `## <slide-id>` må matche `SlideDef.id` (etter `embedAsChapter`: den
  *u*-prefiksede id-en i kilde-`notes.md`).
- Tekst etter id-en på overskriftslinjen er bare lesehjelp.
- I dev logges advarsel om notat-id-er som ikke matcher noen slide.

## Git: commit etter hver ferdig oppgave

Når en brukerforespørsel er ferdig (ikke midt i arbeidet), lag en
git-commit av endringene som hører til den oppgaven. Ikke vent på at
brukeren ber om commit – det er standard her, og overstyrer «commit
bare når brukeren ber om det».

- Inkluder bare filene som hører til denne oppgaven. Hopp over commit
  hvis det ikke er noen endringer.
- Aldri commit hemmeligheter (`.env`, `credentials.json` og lignende).
- Aldri `--no-verify`, force-push, hard reset eller endring av git-config.
- Skriv en kort commit-melding (1–2 setninger) som forklarer *hvorfor*.
- Etter commit: sjekk `git status` og bekreft at committen gikk gjennom.
