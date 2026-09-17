# AGENTS.md

Next.js-app for presentasjoner. Se `README.md` for struktur, speaker notes og
hvordan du legger til en ny presentasjon.

## Dev-server: aldri start en ekstra

Brukeren kjører normalt allerede `npm run dev` på port 3000 i sin egen
terminal, ofte midt i en øving eller presentasjon.

- **Ikke kjør `npm run dev` / `next dev` i denne mappen** uten å først sjekke
  om en server allerede lytter, og aldri hvis 3000 er opptatt:

  ```bash
  lsof -nP -iTCP:3000 -sTCP:LISTEN
  ```

  Bruk den som kjører (`http://localhost:3000`) til å verifisere endringer.

- Hvorfor: `next dev` sletter og gjenoppretter `.next/static`, `.next/server`
  og manifestene ved oppstart – også når den ender på port 3001 fordi 3000 er
  opptatt. Serveren som allerede kjører mister da filene sine, men webpack tror
  de fortsatt er skrevet og skriver dem ikke på nytt før kilden endres. Resultat:
  CSS-chunks (typisk `/_next/static/css/app/[presentation]/presenter/page.css`)
  gir 404 og presentatørvisningen blir ustylet helt til brukeren restarter
  serveren.

- Samme gjelder `next build` og `rm -rf .next`: ikke kjør dem mens dev-serveren
  går. Bruk `npx tsc --noEmit` for å typesjekke.

- Trenger du absolutt en egen instans (f.eks. for skjermbilder med Playwright),
  kopier prosjektet til en mappe utenfor repoet (uten `.next`, symlink
  `node_modules`) og kjør den derfra på en annen port. Stopp den når du er
  ferdig.

## Presentasjoner: aktive vs. arkiverte

Bare presentasjonene under **Aktive** er under arbeid. Åpne og les kun disse
(og `presentations/*.ts` med felles kode) med mindre brukeren eksplisitt peker
på noe annet – det holder kontekstvinduet lite.

**Aktive**

- `presentations/26-02-oppdal-tech-du-er-ikke-dum/` – Oppdal Tech, februar 2026.
  «Du er ikke dum». Slidene er eksportert som bilder fra original-PPTX.
- `presentations/26-09-11-cloud-connection-kundemote/` – Cloud Connection
  kundemøte, 11. sep 2026. Norsk pitch om moderne dataplattform.
- `presentations/26-10-19-tdc-kystverket-dataplattform/` – TDC, 19. okt 2026.
  Norsk versjon av NDC-foredraget. Har egne kopier av figurene i `figurer/`
  (oversatt) – bruk dem, ikke `components/figures/`.

**Arkiverte** (holdt, ferdige – **ikke rediger** slides, `notes.md` eller
media for disse; ikke les dem uten at brukeren ber om det):

- `presentations/25-10-20-tdc-strings/` – holdt 20. okt 2025 (TDC). C# value
  objects vs. stringly typed. Importert fra `2025_10_20_tdc-strings.pptx`.
- `presentations/26-08-26-stoe-miles-kundeevent-dataplattform-pitch/` – holdt 27. aug 2026
- `presentations/26-09-17-ndc-kystverket-dataplatform/` – holdt 17. sep 2026
  (NDC, engelsk). Bruker `components/figures/` (engelsk tekst), som regnes som
  del av arkivet.

Når en ny presentasjon påbegynnes: legg den under **Aktive**. Når den er holdt:
flytt den til **Arkiverte** med dato. Arkiverte presentasjoner skal fortsatt
være registrert i `presentations/index.ts` så de kan vises, men de skal ikke
endres. Trenger en ny presentasjon slides fra en arkivert, kopier eller bruk
`embedAsChapter` – ikke endre originalen.

## Speaker notes

Notater ligger i `presentations/<id>/notes.md` (ev. nedarvede `notes.md` i
kapittelmapper) og redigeres også fra presentatørvisningen i dev-modus via
`app/api/notes/route.ts`. Skriv til filen – ikke inn i slide-komponentene.

## Git: commit etter hver ferdig oppgave

Når en brukerforespørsel er ferdig (ikke midt i arbeidet), lag en git-commit
av endringene som hører til den oppgaven. Ikke vent på at brukeren ber om
commit – det er standard her, og overstyrer «commit bare når brukeren ber om
det».

- Inkluder bare filene som hører til denne oppgaven. Hopp over commit hvis
  det ikke er noen endringer.
- Aldri commit hemmeligheter (`.env`, `credentials.json` og lignende).
- Aldri `--no-verify`, force-push, hard reset eller endring av git-config.
- Skriv en kort commit-melding (1–2 setninger) som forklarer *hvorfor*.
- Etter commit: sjekk `git status` og bekreft at committen gikk gjennom.
