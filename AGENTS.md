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
