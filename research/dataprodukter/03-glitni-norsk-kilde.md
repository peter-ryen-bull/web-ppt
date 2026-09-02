# Glitni: norsk kilde om dataprodukter

Kilder:

1. Glitni: «Hva er et dataprodukt?» av Magne Bakkeli (feb 2026, del av «En komplett guide til dataprodukter»): https://glitni.no/fagartikler/en-komplett-guide-til-dataprodukter/01-hva-er-et-dataprodukt/
2. Magne Bakkeli på LinkedIn (jan 2026): https://no.linkedin.com/posts/magnebakkeli_activity-7419274817771831296-mwcr

Glitni har en hel guide-serie om dataprodukter (regelbok, business canvas, MVDP, deling og datakontrakter, produktside/katalog, kvalitet, AI-fundament, versjonering, produktforum). Verdt å lese hele hvis emnet skal dekkes grundig: https://glitni.no/fagartikler/

---

## Definisjonen

Glitni siterer Gartner, men kortversjonen deres er bedre:

> «Et dataprodukt er en dataleveranse dere behandler som et produkt.»

Fire ting må være på plass:

1. **Kunder**: navngitte kundegrupper, ikke «alle»
2. **Eierskap**: et team med mandat til å ta beslutninger og stå i konsekvensene
3. **Et løfte**: forventninger til tilgang, oppdatering, dokumentasjon, kvalitet og endring
4. **Verdi**: etterprøvbar, knyttet til reell bruk

Og avgrensningen: «Mangler ett av disse? Det er sannsynligvis en komponent, ikke et dataprodukt.»

## De beste formuleringene

Komponent vs. produkt:

> «En tabell er en byggestein. Dataproduktet er grensesnittet dere lover å stå inne for over tid.»

Fra LinkedIn-innlegget, enda mer sitérbart:

> «En tabell kan være en ingrediens. Dataproduktet er retten.»

Og den viktige realitetssjekken:

> «Hvis dere ikke kan peke på hvem som bruker det og hva dere lover når det endrer seg, er det sjelden et dataprodukt. Det er en viktig tabell.»

## Sjekklisten «Er dette et dataprodukt?»

- Kan dere peke på navngitte kunder (team eller roller som bruker dette)?
- Har en ansvarlig person et uttalt løfte til disse kundene om tilgang, oppdatering og varsling ved endring?
- Er feilen dyr nok til at det er verdt å forvalte over tid?

Tre ja → dataprodukt-kandidat. Ellers: komponent inntil videre.

Det siste spørsmålet («er feilen dyr nok?») er et smart prioriteringskriterium som samsvarer med poenget i vårt eget dataprodukt-utkast: ikke alle data trenger å være produkter.

## Historien om begrepsinflasjon (fra LinkedIn)

Bakkeli forteller om et selskap som hadde «definert» 1000 dataprodukter, altså alle tabellene i datakatalogen. Resultat:

> «Det gjorde katalogen nesten ubrukelig. For når alt er produkt, er ingenting produkt.»

De fleste av de 1000 manglet navngitte kunder, verdihypotese, endringsløfte og noen som svarer når noe ryker. Hans diagnose: «Det er sjelden vond vilje. Det er oftest begrepsinflasjon.» God historie å gjenfortelle (anonymisert er den allerede).

## Eksempler på leveranser som fortjener produktstatus

- Ordre/ordrelinjer med standardisert hendelseslogikk
- Metrikk-lag for finansielle KPI-er
- Kunde 360-kjerne: stabil kundedefinisjon, historikk og join keys
- Samtykke- og reservasjonsgrunnlag
- Produktkatalog for analyse
- Semantisk lag som grunnlag for AI-agenter: «én definisjon, mange konsumflater»

Ikke dataprodukter: staging-/mellomlag (`stg_*`, `cleaned_v17`), interne hjelpetabeller og engangsartefakter.
