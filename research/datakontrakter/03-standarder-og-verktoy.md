# Standarder og verktøy: ODCS, Data Contract Specification og økosystemet

Kilder:

1. entropy-data.com (Jochen Christ/Simon Harrer, INNOQ-utspring, folkene bak datacontract.com og datamesh-architecture.com): https://www.entropy-data.com/learn/open-data-contract-standard
2. Open Data Contract Standard (Bitol, Linux Foundation): https://bitol.io og https://github.com/bitol-io/open-data-contract-standard
3. Data Contract Specification: https://datacontract.com og https://github.com/datacontract/datacontract-specification
4. Datus: «What Is a Data Contract?» (historikk): https://datus.ai/blog/what-is-data-contract/

---

## Definisjonen fra datacontract.com

Den publiserte Miles-artikkelen bruker allerede bilder herfra. Definisjonen deres er blitt kvasi-standard:

> «A data contract is a document that defines the ownership, structure, semantics, quality, and terms of use for exchanging data between a data producer and their consumers. Think of an API, but for data.»

## Kort historikk (nyttig for kontekst i artikler)

- Des 2021: Andrew Jones beskriver GoCardless' implementering, første kjente bruk av begrepet i praksis
- Aug 2022: Chad Sandersons «The Rise of Data Contracts» gjør begrepet mainstream
- 2022: PayPal bygger kontrakter inn i data mesh-programmet sitt
- Mai 2023: PayPal open-sourcer Data Contract Template, som blir frøet til ODCS
- ODCS governes nå av Bitol-prosjektet under Linux Foundation, versjon 3.1 per 2026
- Gartner Hype Cycle for Data Management 2025 lister datakontrakter som «emerging mechanism for building trust and enforcing governance as platforms decentralize»

## To standarder å kjenne til

**Open Data Contract Standard (ODCS)**: YAML-spesifikasjon under Linux Foundation (Bitol). Dekker schema, datakvalitet, SLA-er, bruksvilkår, team/eierskap og infrastruktur. Den publiserte Miles-artikkelen bruker ODCS i eksemplene. Offisielle diagrammer: `img/odcs_data-contract-diagram.png` (hele strukturen) og `img/odcs_elements-of-schema.png` (skjemadelen).

**Data Contract Specification (datacontract.com)**: konkurrerende/komplementær spesifikasjon fra INNOQ-miljøet. Kategoriene i en kontrakt oppsummeres i `img/datacontract-spec_categories.png`: Ownership, Terms, Models, Definitions, Examples, Quality, SLAs, Servers. Komplett YAML-eksempel i `img/datamesh-architecture_datacontract-example.png` (ordre-datasett med dbt-schema og SodaCL-kvalitetsregler, inkludert billing: 5000 USD/måned og noticePeriod: P3M).

I tillegg finnes vendor-spesifikke varianter: dbt model contracts (`enforced: true`), Databricks Unity Catalog, Confluent Schema Registry (Avro/Protobuf/JSON Schema med kompatibilitetsmodi BACKWARD/FORWARD/FULL).

## Verktøy

- **Data Contract CLI** (github.com/datacontract/datacontract-cli): Python-CLI for å validere, teste og eksportere kontrakter. Støtter 15+ datakilder, inkludert Snowflake, Databricks og BigQuery
- **Data Contract Editor** (editor.datacontract.com): webbasert visuell editor for ODCS-kontrakter
- **dbt-integrasjon**: kontrakt som source of truth, genererte tester og drift-gate i CI (entropy-data.com/learn/dbt-data-contracts)
- **Great Expectations / Soda**: kvalitetsregler generert fra kontrakten
- **Schema registries** (Confluent, AWS Glue, Apicurio): kontraktshåndheving for streaming, avviser inkompatible skjemaendringer ved skrivetidspunkt

## Tre håndhevingspunkter (går igjen i flere kilder)

1. **CI/CD**: blokker skjemabrytende endringer i pull requesten, før de deployes
2. **In-motion**: valider hver record i streamen mot kontrakten, send brudd til egen kø
3. **At rest / monitorering**: sjekk hele datasettet etter oppdatering (ferskhet, radantall, distribusjoner), rull tilbake eller varsle ved brudd

Dette samsvarer med inndelingen i den publiserte Miles-artikkelen (implisitt skjemavalidering, in-motion, at rest), men legger til CI/CD-punktet som det viktigste: feilen stoppes før den i det hele tatt når produksjon.

## Forholdet kontrakt ↔ dataprodukt

Fra entropy-data.com, presist formulert:

> «A data product is the system or module that produces the data —with input ports, a pipeline, tests, metadata, documentation —and at the end offers a dataset through an output port with a specific data contract. The data product is the system; the contract is the interface specification for the final dataset.»

Og fra DataHub-AMA-en (Maggie Hays): kontrakter er *input* til dataprodukter. Et dataprodukt kan ha flere kontrakter, og flere produkter kan dele samme kontrakt. Siden 2025 finnes også Open Data Product Specification (ODPS) under Linux Foundation, søsterstandarden til ODCS for selve produktet.

## Fremtidsvinkel: kontrakter som governance for AI-agenter

Entropy Data-miljøet bruker nå kontrakter som styringslag for AI-agenter: agenten søker opp dataproduktet, leser kontrakten (semantikk, kvalitetsregler, bruksvilkår), og genererer SQL basert på den. Kontrakten blir det som gjør agent-tilgang til data trygg og kontrollert. Mulig fremtidsrettet avslutningspoeng for en artikkel.
