# Speaker notes: Slett meg hvis du kan

Alt før første `## slide-id`-overskrift ignoreres. Dette er kladd.

Basert på `abstracts/_forslag.md` (punkt 2): «Slett meg hvis du kan – sletting,
lineage og personvern». Teknisk/praktisk talk. Id-en `26-11-01-…` er en
plassholder. Bytt dato og sted når arrangementet er avklart (mappenavn,
`id` i `index.tsx` og `public/media/<id>/` hvis du legger til media).

### Den røde tråden

> Sletting er ikke en kommando. Det er en egenskap du bygger inn før dataene
> kommer, fordi Kari aldri bor på bare ett sted.

Kari Nordmann er karakteren vår. Hun er et **tenkt eksempel**. Alle tenkte
eksempler har «Tenkt eksempel»-merke. Ikke presenter dem som ekte kunder.

### Dramaturgi (ca. 40–45 min, juster til tidsrammen)

| Del                      | Innhold                                                       | Min |
| ------------------------ | ------------------------------------------------------------- | --- |
| Åpning                   | e-posten fra Kari                                              | 3   |
| Hva sier loven?          | artikkel 17, frister, unntak                                   | 4   |
| Den enkle løsningen      | én rad, så kartet, Slack, rapport, logg                        | 9   |
| Å slette er ikke å slette| tidsreise/VACUUM, backup, soft delete                          | 8   |
| Flere måter å slette på  | fire måter, oppslag, kryptering, hashing                       | 8   |
| I praksis                | samtidighet, kilde til plattform, prosess, register, lineage, verktøy | 10  |
| Avslutning               | fem spørsmål, slutt                                            | 3   |

Kutt om du ligger etter: hashing, soft delete, og verktøyslidene (behold
«gjør ikke for deg»).

### Forbehold

Jeg er ikke jurist. Hvor grensen går for anonymisering, om kryptering med
slettet nøkkel teller som sletting, og hva som er lovpålagt å beholde, er
juridiske vurderinger. Si det høyt på de sidene det gjelder.

### Kilder

- Personvernforordningen (GDPR) art. 12 nr. 3 (frist), art. 17 (sletting),
  art. 19 (meddelelsesplikt): Lovdata, personopplysningsloven.
- Datatilsynet: «Rett til sletting» og «Retting og sletting».
- Datatilsynet (Danmark): veiledning «Sletning» om backup og slettelogg.
  Norsk Datatilsyn har ikke akkurat samme tekst. Sjekk om du vil sitere norsk.
- Delta Lake: *Table utility commands* (VACUUM, 7 dager), *Deletion vectors*
  (REORG TABLE … APPLY (PURGE)).
- Databricks/Microsoft Learn: GDPR og CCPA-veiledning for Delta Lake.
- Unity Catalog: lineage (kolonnenivå) og Data Classification.
- Microsoft Purview: skanning av Unity Catalog, lineage bare for skannede
  objekter. Microsoft Priva Subject Rights Requests.
- SHA-256-verdiene på hashing-sliden er regnet ut på ekte (`91234567` →
  `41a6be0d6872…`, `91234565` → `990d19e6e8b1…`, `91234566` → `a06d559b37f2…`).

## forside – Forside

Kort. «Jeg skal snakke om noe som høres enkelt ut: å slette en person.»
Koden på sliden er hele løsningen, sånn de fleste tenker seg den.

## scene – Mandag 08:12

Les e-posten høyt. Kari er et tenkt eksempel.

Steg 1: fristen. Loven gir oss én måned.
Steg 2: spørsmålet. La det henge. «Hvor mange steder har vi henne?» De fleste
vet ikke, og det er hele temaet i dag.

## kap-regler – Hva sier loven?

Bare en kort runde. Dette er ikke juridisk rådgivning.

## loven – GDPR artikkel 17

Steg 1: frist. Uten ugrunnet opphold, senest én måned (art. 12 nr. 3). Kan
forlenges med to måneder ved kompleksitet eller mange forespørsler, men den
registrerte må få beskjed og begrunnelse innen første måned.
Steg 2: plikten gjelder opplysningene, ikke ett system. Det er her
dataplattformen blir et problem.
Steg 3: art. 19: si fra til mottakere, med mindre det er umulig eller krever
uforholdsmessig innsats.

## unntak – Når du ikke skal slette

Art. 17 nr. 3. Nevn fire: rettslig plikt (regnskap), rettskrav, oppgaver i
allmennhetens interesse/myndighetsutøvelse, arkiv/forskning/statistikk.
Ikke gå i detalj på tidsfrister (de står i egne lover).
Steg 5: poenget. Noen data skal bli. Da må du vite *hvilke* og *hvorfor*, og
det må stå skrevet et sted. Avgjørelsen er ikke teknikerens.

## kap-enkel – Den enkle løsningen

Nå skal vi se hvorfor «bare slett raden» ikke holder.

## naiv – Én tabell, én rad, én kommando

Dette er det enkle tilfellet: ett system, en tabell, en nøkkel.
Steg 1: kjør kommandoen. Raden er borte.
Steg 2: «Ferdig. I dette ene systemet.» Legg trykk på *ene*.

## kart – Kari er mange steder

Gå gjennom boksene én og én. Tallet teller opp.
Steg 1: plattformen, med tre lag (rådata, renset, dataprodukt).
Steg 2: rapporten.
Steg 3: Excel-uttrekk, e-post og Slack.
Steg 4: sikkerhetskopi, logger og spørrehistorikk, testmiljø.
Steg 5: oppsummering. Merk: tallet 10 er bare et tenkt eksempel. Poenget er
at kundesystemet bare er én av mange.

## slack – Slack-meldingen sprer navnet

Tenkt eksempel. Alle har sett en slik melding. Personvernrådgiveren gjør det
riktige, og spør alle.
Steg 1: svarene. Noen sletter, noen finner nye steder.
Steg 2: navn og e-post står nå i Slack.
Steg 3: varselet er blitt enda et sted å slette fra. Ikke skyld på Nina. Løs
det med en inngang (se «Fra e-post til bekreftet sletting») der bare
nøkkelen står, ikke navnet.

## rapport – Rapporten har sin egen kopi

Power BI som eksempel. Med importmodus ligger en kopi av dataene i rapportens
datasett og oppdateres til faste tider. Rapportbrukere kan eksportere til
Excel og PDF, og abonnementer sender rapporten på e-post.
Fire punkter, ett per steg. Poenget: sletting i kilden når ikke kopiene av
seg selv.

## logg – Slettingen setter spor i loggen

Tenkt eksempel. Den som sletter manuelt, skriver ofte navnet i spørringen.
Spørrehistorikken lagrer spørringen, og saken i saksbehandlingssystemet
lagrer navnet.
Steg 1: historikken.
Steg 2: navnet står i loggen. Loggen er nå et sted som ikke blir slettet.
Steg 3: løsningen. Slett på intern nøkkel, ikke navn. Hold personopplysninger
ute av logger og saker.

## kap-lagring – Å slette er ikke å slette

Selv om du finner alle stedene, er det ikke sikkert dataene er borte.

## versjoner – Tidsreise og VACUUM

Delta Lake (og tilsvarende tabellformater) lagrer historikk.
Steg 1: DELETE lager en ny versjon. De gamle filene blir liggende.
Steg 2: tidsreise: `VERSION AS OF 1` gir Kari tilbake.
Steg 3: VACUUM fjerner filer som ikke lenger brukes og er eldre enn
oppbevaringstiden. Standard er 7 dager. Den kjører ikke av seg selv i ren
Delta Lake. På Databricks kan prediktiv optimalisering ta seg av vedlikehold
(sjekk oppsettet dere har).
Bunnlinjen: deletion vectors. Da merkes radene bare som slettet uten at
filene skrives om. REORG TABLE … APPLY (PURGE) skriver filene om. Deretter må
du kjøre VACUUM etter oppbevaringstiden.
Regn med at fristen på én måned i praksis må romme oppbevaringstiden.

## backup – Og sikkerhetskopien?

Det to-delte svaret fra tilsynsmyndighetene (Datatilsynet i Danmark):
slett i backupen hvis det er teknisk mulig. Hvis ikke: sørg for at slettingen
utføres på nytt hvis backupen gjenopprettes. Da trenger du en logg over
slettinger, uten direkte identifiserende opplysninger.
Steg 1: tidslinjen: backup 1. mars, sletting 12. mars.
Steg 2: gjenoppretting 20. mars. Kari er tilbake.
Steg 3: loggen fikser det, hvis du kjører den.
Anbefal kort, fast levetid på backup, så problemet forsvinner av seg selv.

## soft-delete – «Slettet» er ikke slettet

Et flagg som `er_slettet` eller `slettet_dato`. Bra som angre-knapp. Men
navn og e-post ligger der. Samme gjelder papirkurv og versjonering i
fillagring. Løsning: angretid med fast frist, så fjernes innholdet.

## kap-metoder – Flere måter å slette på

Nå til selve verktøykassa.

## metoder – Fire måter

Gå gjennom ett kort per steg. Fordel og pris.
1 Fjerne raden: helt borte, men du må finne alle kopier.
2 Skjule raden: soft delete, ikke sletting.
3 Fjerne koblingen: personopplysninger på ett sted, resten peker på en nøkkel.
4 Fjerne nøkkelen: kryptering med egen nøkkel per person.
Steg 5: hashing er ikke med. Forklar om litt.

## oppslag – Oppslagstabell: fjern koblingen

Personopplysninger i én liten tabell. Analysedata peker på en nøkkel.
Steg 1: slett raden for Kari. Koblingen er brutt. Kjøpene blir stående uten
eier.
Steg 2: advarsel. Fødselsdato, postnummer og kjønn sammen kan peke ut en
person. Da er dataene ikke anonyme, og de regnes fortsatt som
personopplysninger. Om dataene er anonyme, er en juridisk vurdering.

## krypto – Kryptering: slett nøkkelen

Ofte kalt «crypto-shredding».
Steg 1: hver person har sin egen nøkkel i et nøkkelhvelv. Dataene ligger
kryptert.
Steg 2: slett Karis nøkkel. Radene hennes er uleselige.
Steg 3: prisen. Nøkkelstyring (også i backup av nøklene), tung analyse, og en
juridisk vurdering av om det teller som sletting.

## hashing – Hashing er ikke sletting

Mange tror at hashing av e-post eller mobilnummer «anonymiserer». Det gjør det
ikke.
Steg 1: angriperen prøver alle mulige numre. Åtte siffer gir høyst 100
millioner muligheter. Det tar kort tid på en vanlig maskin. Treffet på
`91234567` gir den samme hashen. Tallene på sliden er regnet ut på ekte med
SHA-256.
Steg 2: bedre er hash med en hemmelig nøkkel, eller tilfeldig nøkkel med
oppslagstabell. Og husk: pseudonymiserte data er fortsatt personopplysninger
(fortalen pkt. 26).

## kap-drift – Slik gjør du det i praksis

Fra teknikk til rutine.

## samtidig – Alle leser samme tabell samtidig

Hva skjer når noen sletter mens andre leser?
Steg 1: nattjobben startet før slettingen. Den leser versjon 6.
Steg 2: DELETE gir versjon 7. Nye lesinger ser ikke Kari.
Steg 3: VACUUM kan ikke fjerne filene før de tregeste leserne er ferdige. Det
er grunnen til at oppbevaringstiden finnes. Ikke sett den til null uten å
tenke.

## nedstroms – Kilden sier ikke at noe er borte

Inkrementell innlasting henter nye og endrede rader. En slettet rad er ikke
endret. Den er borte, uten melding.
Steg 1: sletting i kilden.
Steg 2: nattlig innlasting henter null rader om Kari.
Steg 3: tre løsninger: sletting som hendelse fra kilden, jevnlig
sammenligning av nøkler, eller en egen sletteliste i plattformen.

## bestilling – Fra e-post til bekreftet sletting

Seks steg, ett per klikk. Nevn at skrittet «Finne» er der lineage og katalog
betaler seg. Og at «Logge» lagrer nøkkel og dato, ikke navn.
Dette er forslag til prosess, ikke et krav. Tilpass til virksomheten.

## sletteregister – Sletteregisteret

Tabellen har bare nøkkel og datoer.
Steg 1: hva registeret inneholder.
Steg 2: hver dataflyt leser det. Og samme register brukes når du laster
historikk på nytt eller gjenoppretter en backup.
Steg 3: ellers dukker Kari opp igjen. Dette kalles av og til «zombie-data».

## lineage – Lineage: hva verktøyet ser

Lineage viser hvordan data flyter mellom tabeller, jobber og rapporter.
Steg 1: kjeden fra kildesystem til dashboard.
Steg 2: kolonner merket som persondata. Da kan du spørre: hvilke tabeller og
rapporter berøres av Kari?
Steg 3: det verktøyet ikke ser: Excel, e-postvedlegg, Slack, skjermbilder.
Lineage vises bare for det verktøyet har fått se. Purview viser for eksempel
lineage bare for objekter som er skannet, og Unity Catalog fanger lineage for
spørringer i Databricks.

## verktoy – Hva verktøy gjør, og ikke gjør

Steg 1: hva de hjelper med: finne (klassifisering), se sammenhenger (lineage)
og styre saken (frister og saksflyt).
Steg 2: hva de ikke gjør: slette i hvert system, vurdere om noe må beholdes,
rydde Excel og Slack.
Steg 3: eksempler. Purview (skanning, klassifisering, lineage), Unity Catalog
(lineage og tagger på kolonner), Priva Subject Rights Requests (saksflyt for
forespørsler). Jeg anbefaler ingen spesielt. Sjekk hva dere allerede har.

## sporsmaal – Fem spørsmål du kan stille i morgen

Ett per steg. La publikum skrive dem ned.

## slutt – Sletting er ikke en kommando

«Det er en egenskap du bygger inn fra dag én.» Fire ting: nøkkel per
person, personopplysninger samlet på få steder, fast levetid på kopier og
backup, og kjent lineage. Takk. Spørsmål?
