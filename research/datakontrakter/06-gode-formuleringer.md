# Gode formuleringer om datakontrakter, på tvers av kildene

Sortert etter tema. Kildene står i parentes.

## Hva en datakontrakt er

> «Think of an API, but for data.» (datacontract.com)

> «A data contract is simply a human and machine readable document that describes the data.» (Andrew Jones)

> «En datakontrakt fungerer som et API for data – en spesifikasjon av struktur, kvalitet og forventninger som både produsenter og konsumenter forholder seg til.» (Glitni)

> «Man kan se kontrakten som en forsterket variant av et skjema – men med semantikk, validering, kontekst for bruk og styring bygget inn.» (Glitni)

## Problemet kontrakten løser

> «This inevitably treats database schema as a non-consensual API.» (Chad Sanderson, om ELT rett fra produksjonsdatabaser)

> «No warning is given because the engineer doesn't know that a warning should be given or why.» (Sanderson)

> «Slike feil oppstår ikke fordi folk gjør feil med vilje – men fordi avhengighetene er skjulte.» (Glitni)

> «A data contract turns a silent downstream breakage into a loud, early error.» (Datus)

## Kontrakt vs. bare skjema/dokumentasjon

> «A schema tells you `order_status` is a string; a contract tells you which values are valid, that the producer guarantees daily freshness, and who to page when it breaks.» (Datus, lett parafrasert)

> «Unlike informal documentation that quickly becomes outdated, data contracts are enforced programmatically.» (Conduktor)

Anti-pattern nummer én hos Glitni: «Kontrakten er bare dokumentasjon – den testes ikke.»

## Kontrakten er toveis

> «Data contracts are bi-directional: an effective data contract sets clear expectations for both the producer and consumer of data.» (Maggie Hays/DataHub)

## Kontrakten som automatiseringskilde

> «With a bit more context, we can do so much more.» (Andrew Jones)

> «The data contract remains simple (...) and yet the ability to use it to automate the difficult parts of data creation and management are limitless.» (Andrew Jones)

Håndhevingsregelen: «Only valid data proceeds downstream.» (Sarath Sagi)

## Forholdet til dataprodukter

> «The data product is the system; the contract is the interface specification for the final dataset.» (entropy-data.com)

> «Datakontrakten blir bindeleddet som operasjonaliserer 'data as a product'.» (Glitni)

Kontrakter som input til dataprodukter: et produkt kan ha flere kontrakter, flere produkter kan dele én kontrakt. (DataHub-AMA)

## Salg og forankring

> «You manage the rest of your software as code. Why not your data?» (Shirshanka Das)

> «The big challenge in managing contracts is less of a technical challenge and more of a social-cultural challenge.» (DataHub-AMA)

> «Det krever tid og prioritering å få på plass kontrakter – men det er mindre enn tiden man bruker på å rydde opp i feilsituasjoner.» (Glitni)

## Hvor man starter

> «You can introduce a contract anywhere you see a handoff between a producer and consumer.» (DataHub-AMA)

Sandersons råd: start med den siste alvorlige datahendelsen (Sev1/Sev2), lag kontrakt og SLA for akkurat det tilfellet.

Glitnis råd: start med ett team og ett dataprodukt, og bruk verktøyene dere allerede har.

## Analogier

Elsparkesykkelen (Glitni): du forventer spesifikasjoner på rekkevidde, garanti og hastighet. Uten dem stoler du ikke på produktet. Samme med data.

EHF vs. HL7 (Glitni): sikt på en standard som er enkel nok til å bli tatt i bruk (EHF), ikke en som er så detaljert at den kollapser under egen vekt (HL7).
