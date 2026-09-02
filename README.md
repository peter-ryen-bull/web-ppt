# Presentasjoner – webapp

Next.js-app for interaktive presentasjoner i nettleseren. Appen kan inneholde
mange presentasjoner: forsiden viser en oversikt, og hver presentasjon har sin
egen URL (f.eks. `/stoe-dataplattform`).

## Kom i gang

```bash
npm install
npm run dev
```

Åpne <http://localhost:3000>, velg en presentasjon og start.

## Bruk

| Handling | Tastatur | Knapp |
| --- | --- | --- |
| Neste slide | `→`, mellomrom, `PgDn` | «Neste» |
| Forrige slide | `←`, `PgUp` | «Forrige» |
| Første/siste slide | `Home` / `End` | – |
| Skjul/vis gjeldende slide | `H` | «Skjul slide» |
| Slideoversikt (med skjul-brytere) | `G` | «Oversikt» |
| Fullskjerm | `F` | `⛶` |
| Tilbake til alle presentasjoner | – | «⌂ Presentasjoner» |

Skjulte slides hoppes over i visningen og huskes i `localStorage` per
presentasjon.

## Presentere med to skjermer (HDMI/prosjektor)

Hver presentasjon har tre visninger:

| URL | Hva | Hvem ser den |
| --- | --- | --- |
| `/<id>` | Redigerings-/øvingsvisning med verktøylinje | Deg |
| `/<id>/presenter` | Presentatørvisning: gjeldende + neste slide, speaker notes, teller, klokke og tidtaker | Deg |
| `/<id>/vis` | Publikumsvisning: **kun sliden** – ingen knapper, teller eller notater | Publikum |

Slik gjør du det:

1. Koble til HDMI og sett skjermen til **utvidet** (ikke duplisert).
2. Åpne `/<id>/presenter` på din skjerm (eller trykk «🎤 Presentér» i
   verktøylinjen).
3. Trykk **«Åpne publikumsvisning»** (eller `V`) – publikumsvisningen åpnes i
   et eget vindu.
4. Dra vinduet til den delte skjermen og trykk `F` (eller dobbeltklikk) for
   fullskjerm.

Vinduene synkroniseres automatisk (via `BroadcastChannel`), så piltaster i
presentatørvisningen bytter slide begge steder. Posisjonen huskes i
`localStorage`, så et vindu som åpnes senere starter på riktig slide.

## Struktur

```
app/
  page.tsx                  Forsiden – liste over alle presentasjoner
  [presentation]/page.tsx   Viser valgt presentasjon
components/
  Deck.tsx                  Selve presentasjonsvisningen (navigasjon, oversikt …)
presentations/
  index.ts                  Registeret over alle presentasjoner
  types.ts                  SlideDef / PresentationDef
  parts.tsx                 Felles byggeklosser (Box, Img, ChapterSlide …)
  notes.ts                  Parser for speaker notes (notes.md → slides)
  stoe-dataplattform/       Slides for én presentasjon
    notes.md                Speaker notes – én stor markdown-fil
public/media/
  <presentasjons-id>/       Bilder per presentasjon
  miles-logo.svg            Felles logo
```

## Legg til en ny presentasjon

1. Lag en ny mappe `presentations/<id>/` med en `index.tsx` som eksporterer en
   `PresentationDef` (se `presentations/stoe-dataplattform/index.tsx` som mal):

   ```tsx
   import type { PresentationDef, SlideDef } from "../types";

   const SLIDES: SlideDef[] = [
     { id: "forside", name: "Forside", component: MinForside },
     // …
   ];

   export const minPresentasjon: PresentationDef = {
     id: "min-presentasjon", // brukes i URL-en
     title: "Tittel på presentasjonen",
     description: "Kort beskrivelse som vises på forsiden.",
     date: "September 2026",
     slides: SLIDES,
   };
   ```

2. Registrer den i `presentations/index.ts`:

   ```ts
   export const PRESENTATIONS: PresentationDef[] = [
     stoeDataplattform,
     minPresentasjon,
   ];
   ```

3. Legg bilder i `public/media/<id>/`.

4. Opprett `presentations/<id>/notes.md` med speaker notes (se under) og flett
   dem inn med `slides: withNotes(SLIDES, notesRaw)`.

## Speaker notes

Speaker notes for en presentasjon skrives i **én markdown-fil**:
`presentations/<id>/notes.md`. Filen er laget for å redigeres av menneske og
KI sammen, og innholdet injiseres automatisk i slidene og vises i
presentatørvisningen (`/<id>/presenter`). Endringer plukkes opp av hot reload
i dev-modus.

Format:

```md
# Fritt område øverst – alt før første ## ignoreres (kladd, disposisjon …)

## forside – Forside
Det som står her vises som notater for sliden med id «forside».
Linjeskift bevares. Teksten etter id-en i overskriften er kun til lesbarhet.

<!-- HTML-kommentarer er til samarbeid/TODO-er og vises aldri. -->

## neste-slide-id
…
```

Reglene (implementert i `presentations/notes.ts`):

- `## <slide-id>` starter notatene for én slide – id-en må matche `SlideDef.id`.
- Alt etter id-en på overskriftslinjen ignoreres (bruk det til slidenavnet).
- Alt før første `##` ignoreres – fritt kladdeområde.
- HTML-kommentarer fjernes før visning.
- I dev-modus logges en advarsel om notat-id-er som ikke matcher noen slide.

Slides er vanlige React-komponenter på et fast 1280×720-lerret som skaleres
til vinduet. Byggeklossene i `presentations/parts.tsx` (`Box`, `Img`,
`ChapterSlide`, `MilesLogo`) gjør det enkelt å plassere innhold på lerretet,
men du kan bruke vilkårlig HTML/JSX.

## Design (Miles-stil)

- Fargepaletten kommer fra PowerPoint-temaet: krem `#FBF0E5`, burgunder
  `#450D20`, rød `#FF303B`, dyprød `#B72318`, teal `#004047`, mint `#78E8DB`.
- Skrifter: DM Sans og Manrope lastes fra Google Fonts. Tittelfonten Gelica
  er kommersiell og følger ikke med – har du den installert lokalt brukes den
  automatisk, ellers brukes Fraunces som nærmeste åpne alternativ.

## Om Stø-presentasjonen

`stoe-dataplattform` gjenskaper `2026_08_27_stoe_dataplattform.pptx`
("Mer innsikt med en moderne dataplattform"). Posisjoner og størrelser er
hentet direkte fra PowerPoint-XML-en, og slides 10–15 er den progressive
avdekkingen av arkitekturdiagrammet, gjenskapt med kremfargede maskefelter
slik originalen gjorde det.
