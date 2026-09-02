# Glitni: norsk guide til datakontrakter

Kilde: «Guide til datakontrakter» av Magne Bakkeli (juli 2025): https://glitni.no/fagartikler/datakontrakter/

Grundigste norske kilden jeg fant. Har også podcast: «Datautforskerne» episode 15 (Safurudin Mahic og Magne Bakkeli om datakontrakter).

---

## Definisjonen på norsk

> «En datakontrakt fungerer som et API for data – en spesifikasjon av struktur, kvalitet og forventninger som både produsenter og konsumenter forholder seg til.»

Og effekten: «datakontrakter reduserer overraskelser, øker kvaliteten og bygger tillit på tvers av team og teknologi.»

## Problembeskrivelsen

God formulering av hvorfor feil oppstår:

> «Slike feil oppstår ikke fordi folk gjør feil med vilje – men fordi avhengighetene er skjulte. Ingen har sagt ifra hva som er lov og ikke. Og ingen fanger opp at noe har gått galt – før det går galt.»

## Norsk-spesifikke poenger (finnes ikke i de internasjonale kildene)

- **Regulatorisk kobling**: NOU «Med lov skal data deles» (krav om tilgjengeliggjøring av offentlige data), Open Data Directive, Data Governance Act, PSD2. Datakontrakter som «en teknisk implementasjon av prinsippene bak reguleringen».
- **Standardiserings-parallellen**: HL7 i helse (svært detaljert, for komplisert i praksis) vs. EHF i handel (enkel nok til å fungere, bredt tatt i bruk). Ønsket: datakontrakter som ligner mer på EHF enn HL7.
- **Norske forvaltningsstandarder**: DCAT-AP-NO for publisering/katalogisering av dataprodukter, DQV-AP-NO for datakvalitet (Accuracy, Completeness, Timeliness, Validity, Lineage).

## Tre bransjeeksempler (konkrete og gjenbrukbare)

1. **Bank**: kundedata til risikostyring. Oppdatering hver time 08–18, felter, maks 0,5 % nullverdier, automatiske varsler, semantisk definisjon av kredittrisiko.
2. **Energi**: strømforbruk fra smarte målere til nettoperatør. Oppdatering hvert 5. minutt, kun positive verdier, måler_id må finnes i masterdata, semantikk (faktisk forbruk, ikke estimat), internfakturering etter volum og frekvens.
3. **Industri**: sensordata til tilstandsbasert vedlikehold. Hvert 15. minutt, maks 1 % unormale verdier, 100 % dekning av kritiske maskiner, varsling rett inn i vedlikeholdssystemene.

## Kontraktens innhold, slik Glitni deler det opp

Tre sentrale komponenter: schema, forretningslogikk (forventede verdier, null-toleranse, intervaller) og SLA-er. I tillegg metadata: ID og versjonskontroll, ressursnavn/namespace (1:1 med datasettet), dokumentasjon (påkrevd) og eier. Utvidelser når fundamentet er på plass: PII-klassifisering, compliance-regler, taksonomikobling, kvalitetsmål.

Fin oppsummerende formulering:

> «Man kan se kontrakten som en forsterket variant av et skjema – men med semantikk, validering, kontekst for bruk og styring bygget inn.»

## Arbeidsflyten (fra Sanderson & Freemans O'Reilly-bok, gjengitt hos Glitni)

1. Konsument identifiserer behov → 2. ber om kontrakt → 3. produsent bekrefter gjennomførbarhet → 4. kontrakt formaliseres i kode → 5. produsent lager PR ved endring → 6. automatisk sjekk mot eksisterende kontrakter → 7. brudd varsles og håndteres etter feilprotokoll, ellers oppdateres ressursen.

## Anti-patterns og suksesskriterier

Anti-patterns: kontrakten er bare dokumentasjon (testes ikke), endringer uten versjonering, ingen tydelig eier.

En god kontrakt er: maskinlesbar, testbar, versjonert, med forankret eierskap hos produsentteamet og forankring hos de viktigste konsumentene, pluss klar endringsprosess.

## Eierskapsspørsmålet

> «Formelt eies kontrakten av produsenten. Det er teamet som forvalter dataproduktet som publiserer grensesnittet. Men god praksis tilsier at kontrakten utarbeides i samarbeid med konsumenter.»

## Organisatoriske tips

Start med ett team og ett dataprodukt, vis frem suksesshistorier, få støtte fra CDO fra starten, bruk verktøyene dere allerede har (dbt, Terraform, Databricks, Great Expectations). Og kost/nytte-argumentet: «det krever tid og prioritering å få på plass kontrakter – men det er mindre enn tiden man bruker på å rydde opp i feilsituasjoner.»
