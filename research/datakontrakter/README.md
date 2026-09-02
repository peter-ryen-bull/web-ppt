# Research: Datakontrakter

Innsamlet materiale om datakontrakter, fra hovedstemmene på feltet (Sanderson, Jones), standardene (ODCS, Data Contract Specification), norske kilder og artikler med gode visualiseringer. Det finnes allerede en publisert Miles-artikkel om emnet (`publisert/03_datakontrakter.md`), så dette materialet er mest nyttig for oppfølgingsartikler og for dataprodukt-artikkelen som lenker hit.

Innsamlet 2. september 2026.

## Innhold

| Fil | Kilde |
|---|---|
| `01-chad-sanderson.md` | «The Rise of Data Contracts» (substack) + DataHub-AMA. GIGO, non-consensual APIs, Convoy-implementeringen |
| `02-andrew-jones.md` | «Data contracts are a simple concept» + Data Contracts 101. Kontrakten som automatiseringskilde, de fem stegene |
| `03-standarder-og-verktoy.md` | ODCS/Bitol, datacontract.com, historikk, verktøy (CLI, dbt, Great Expectations, schema registries), tre håndhevingspunkter |
| `04-glitni-norsk-kilde.md` | Glitnis guide. Norsk regulatorisk kontekst, tre bransjeeksempler, anti-patterns, eierskapsspørsmålet |
| `05-medium-og-tds-artikler.md` | Maggie Hays (DataHub), Piethein Strengholt, Pierre-Yves Bonnefoy, Sarath Sagi |
| `06-gode-formuleringer.md` | De beste sitatene og formuleringene på tvers, sortert etter tema |
| `img/` | Nedlastede visualiseringer, se tabellen under |

## Kjapp oppsummering av funnene

Feltet er påfallende samstemt om hva en kontrakt er (skjema + semantikk + kvalitetsregler + SLA + eierskap, maskinlesbar og håndhevet), så forskjellene ligger i vinkling:

- **Sanderson** er problemforteller: ELT rett fra produksjonsdatabaser gjør skjemaet til et API ingen har samtykket til, og GIGO-syklusen som følger. Best på hvorfor.
- **Jones** er pragmatikeren: kontrakten er et enkelt YAML-dokument, og verdien ligger i alt du kan automatisere fra den (tabeller, overvåkning, anonymisering). Best på hvordan.
- **Standardene har konsolidert seg**: ODCS under Linux Foundation (utspring fra PayPal) og Data Contract Specification (datacontract.com). Miles-artikkelen bruker allerede ODCS.
- **Glitni** tilfører norsk kontekst: regulatorikk (NOU, PSD2), forvaltningsstandardene DCAT-AP-NO/DQV-AP-NO, og tre konkrete bransjeeksempler fra bank, energi og industri.
- **Gjennomgående organisasjonspoeng**: utfordringen er sosial, ikke teknisk. Start med ett datasett, gjerne der forrige alvorlige feil skjedde, og møt utviklerne i verktøyene de allerede bruker.
- **Toveis-poenget** fra DataHub-AMA-en er underkommunisert i andre kilder: kontrakten forplikter også konsumenten.

## Visualiseringer i img/

| Fil | Hva den viser | Kilde |
|---|---|---|
| `datacontract-spec_datacontract.png` | Dataprodukt ↔ kontrakt ↔ konsument (samme diagram som i den publiserte Miles-artikkelen) | datacontract.com (GitHub) |
| `datacontract-spec_categories.png` | Kategoriene i en kontrakt: Ownership, Terms, Models, Definitions, Examples, Quality, SLAs, Servers | datacontract.com (GitHub) |
| `datamesh-architecture_datacontract-example.png` | Komplett kontrakt i YAML (ordre-datasett med dbt-schema, SodaCL-kvalitet, billing og noticePeriod) | datamesh-architecture.com |
| `odcs_data-contract-diagram.png` | Offisielt oversiktsdiagram over hele ODCS v3-strukturen (stort, 4000px) | bitol-io på GitHub |
| `odcs_elements-of-schema.png` | Skjemadelen i ODCS: elements, objects, properties med logical/physical types | bitol-io på GitHub |
| `sanderson_rise-of-data-contracts-1.jpg` | Convoy-arkitekturen: kontrakt (entiteter + hendelser) → API → validering → Kafka → plattform | dataproducts.substack.com |
| `sanderson_rise-of-data-contracts-2.jpg` | «The Data» som brennende container omgitt av moderne verktøy, GIGO-illustrasjonen | dataproducts.substack.com |
| `tds_strengholt-data-contracts_01.png` | Metadata-drevet kontraktsrammeverk: Git, metadatatjeneste, domener, data product sidecars | Towards Data Science (Strengholt) |

Merk: bildene er til inspirasjon og research. Skal de brukes i publiserte artikler, må kilden krediteres (slik den publiserte artikkelen krediterer datacontract.com), eller motivet tegnes om.
