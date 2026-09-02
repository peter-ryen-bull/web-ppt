# Praksis: data som produkt hos Oda og Adevinta

Kilder (begge skrevet av Xavier Gumara Rigol, som har jobbet begge steder):

1. «Data as a product at Oda» (mars 2023): https://medium.com/oda-product-tech/data-as-a-product-at-oda-fda97695e820
2. «Treating data as a product at Adevinta» (2021): https://medium.com/adevinta-tech-blog/treating-data-as-a-product-at-adevinta-c1dce5d394c5

Oda er norsk (matlevering), så dette er et sjeldent, konkret norsk praksiseksempel. Adevinta er Schibsted-utspringet som drifter markedsplasser (FINN med flere).

---

## Oda: reglene som gjør prinsippet praktisk

### Når blir et datasett et produkt?

Odas regel er forbilledlig enkel:

> «At Oda, when you decide to share a dataset outside of your team, we consider it a product.»

To implikasjoner: teamet må da levere et servicenivå andre kan bygge på, og, like viktig, ikke alle datasett er dataprodukter.

### Lagmodellen

Datasett grupperes i logiske lag (se `img/medium_oda-data-as-a-product_04.png`): **Raw → Stage → Model → Serve**, pluss Intermediate imellom.

- Raw: rådata slik de kom fra kildesystemet
- Stage: tynt lag over Raw, stabilt grensesnitt, kun lettvekts-transformasjoner (navnestandardisering o.l.), 1:1 med kildetabeller. Tilsvarer «source-aligned data products» i data mesh-terminologi
- Model: der konsumentene spør. Solid datamodell over domener og entiteter (brukere, ordrer, geografi). «Aggregate data products»
- Serve: fit-for-purpose-datasett skreddersydd for konkrete behov, f.eks. én rapport. «Consumer-aligned data products»
- Intermediate: mellomregninger, aldri dataprodukter

### Innsatsnivåer (effort tiers)

Smart prioriteringsmekanisme: ikke alle produkter får samme behandling.

- **Kritisk/viktig**: full pakke. Alle lag bygges, solid datamodell, pipelines bygger kun på Stage-produkter (så de ikke knekker når andres pipelines feiler), full dokumentasjon med eksempelspørringer
- **Øvrige delte datasett**: god praksis, lettvektsstandarder
- **Ikke-delte datasett**: minimumspraksis, og eksplisitt merket som «ikke dataprodukt»

### Dashboards som produkter, med emojier

Oda QA-merker dashboards med emojier i tittelen: 💻 = kvalitetssikret av Data & Insight, ✅ = behandles som produkt og følger beste praksis, ⚠️ = følger ikke beste praksis, bruk med varsomhet. Ser man 💻✅ kan man stole på tallene. Lavterskel governance som faktisk fungerer, fin anekdote.

De slettet også Looker-innhold som ikke var brukt på 6 måneder: 27 % av dashboardene og 46 % av analysene røk. Godt tall for å illustrere dashboard-inflasjon.

### Eierskap

Hvert dataprodukt eies av et kryssfunksjonelt produktteam. Ærlig innrømmelse i artikkelen: eierskapsproblemet er ikke løst en gang for alle, eierskap flyttes når organisasjonen endres, og de diskuterer å flytte kjerneprodukter ut av plattformteamet fordi produktene ble «second class citizen» der. Realistisk motvekt til glansbildene.

## Adevinta: samme lag, konkret eksempel

Adevinta bruker samme lagtankegang (se `img/medium_adevinta-data-as-a-product_02.png`): raw data → low level events and aggregations → metric tables (OLAP) → reporting & dashboards.

Det konkrete eksempelet er Messaging-dataproduktet (`img/medium_adevinta-data-as-a-product_03.png`): meldingsproduktet sender events til plattformen, som lander i raw-laget. Derfra bygges Messaging Events (filtrert, beriket), aggregeres til Messaging Conversations, og til slutt Messaging Metrics som materialiserer flerdimensjonale aggregater for utforskning. Fint, lite eksempel på et helt produkthierarki fra ett domene.

Dokumentasjonen deres inkluderer eksempelspørringer i notebooks (`img/medium_adevinta-data-as-a-product_04.png`), og datasettene er søkbare i en katalog med navn, lokasjon, maintainer, domene og beskrivelse (`img/tds_data-as-a-product-vs-data-products_02.png`).

## Metadata-punktene analytikerne faktisk trengte (fra TDS-artikkelen)

Gumara Rigol lister metadataene som var mest nyttige for deres analytikere: datalokasjon (`img/tds_data-as-a-product-vs-data-products_03.png`), dataenes ferskhet og SLA, kort beskrivelse per felt, eksempelspørringer, og kvalitetsstatus vist direkte i dashboards (`img/tds_data-as-a-product-vs-data-products_04.png`, tooltip med «Quality: RELIABLE»).
