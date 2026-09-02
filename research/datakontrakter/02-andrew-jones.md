# Andrew Jones: datakontrakter som enkelt konsept

Kilder:

1. «Data contracts are a simple concept»: https://andrewrjones.substack.com/p/data-contracts-are-a-simple-concept
2. «Data Contracts 101» (PDF-presentasjon): https://andrew-jones.com/data-contracts-101.pdf

Jones fant opp begrepet i praksis hos GoCardless (første artikkel des 2021) og skrev boken «Driving Data Quality with Data Contracts» (2023). Der Sanderson er visjonær og retorisk, er Jones jordnær og implementeringsnær. God kombinasjon å sitere fra begge.

---

## Den enkleste definisjonen som finnes

> «A data contract is simply a human and machine readable document that describes the data.»

Og filosofien bak:

> «They really are a simple concept, based on the idea that with a bit more context, we can do so much more.»

Poenget hans er at kontrakten er et vanlig YAML-dokument, og verdien kommer av hva du automatiserer på toppen av det:

- Bare et skjema? Da kan du generere og forvalte tabeller med infrastruktur-som-kode.
- Legg til SLO-er og kvalitetsregler? Da kan du generere overvåkning (Great Expectations, Soda).
- Legg til anonymiseringsstrategi per felt? Da kan du automatisere anonymisering og sletting ved utløpt retention.

> «The data contract remains simple, both as a concept and as a document, and yet the ability to use it to automate the difficult parts of data creation and management are limitless.»

Dette er et sterkt rammeverk for en artikkel: kontrakten som kilde til automatisering, ikke som byråkrati.

## Hva kontrakten koder ned (fra Data Contracts 101)

- Eierskap og ansvar
- Struktur/skjema
- Gyldige og ugyldige verdier (kvalitetssjekker)
- Ytelse og pålitelighet (SLO-er)

## Grensesnitt-argumentet

Jones' hovedargument er det samme som Sandersons, men formulert rundt stabilitet: i dag konsumeres data fra grensesnitt som aldri var ment som grensesnitt (produksjonsdatabaser). Kontrakten etablerer et eksplisitt grensesnitt som:

> «Is decoupled from the upstream database, and therefore more stable even as it changes; presents the data in a form that is easier for consumers to use; has effective change management applied.»

Grensesnittet kan være en tabell i varehuset, et filområde eller en stream. Poenget er at produsentene skriver til grensesnittet, og konsumentene leser kun derfra.

## De fem stegene

1. Produsentene definerer kontrakten, i samråd med konsumentene
2. Endringshåndtering legges på kontrakten (hindrer breaking changes)
3. Kontrakten provisjonerer grensesnittet, typisk via infrastruktur-som-kode
4. Tjenestene skriver data direkte til grensesnittet (som ikke trenger å ligne den interne databasen)
5. Konsumentene bruker grensesnittet med trygghet til å investere i det de bygger

## Kost/nytte-formuleringen

> «There is a higher upfront cost to building these interfaces (...) But this is an investment in preventing data incidents and will be paid back by reducing the costs associated with incidents, the costs of complex ETL, and the opportunity cost of being unable to deliver the data applications your business needs.»

Ærlig innrømmelse av oppstartskostnaden, med tre konkrete tilbakebetalinger. Nyttig struktur for et «hva koster det»-avsnitt.
