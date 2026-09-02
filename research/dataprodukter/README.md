# Research: Dataprodukter

Innsamlet materiale om dataprodukter og «data as a product», fra data mesh-litteraturen, norske og internasjonale kilder, pluss praksiseksempler. Formålet er å støtte artikkelutkastet `in-progress/dataprodukt.md` og eventuelle oppfølgere.

Innsamlet 2. september 2026.

## Innhold

| Fil | Kilde |
|---|---|
| `01-datamesh-og-dehghani.md` | Zhamak Dehghani (martinfowler.com), Thoughtworks «Designing data products», datamesh-architecture.com |
| `02-data-as-a-product-vs-dataprodukt.md` | Google Cloud, IBM, dbt, Xavier Gumara Rigol (Towards Data Science) om begrepsskillet |
| `03-glitni-norsk-kilde.md` | Glitnis guide til dataprodukter + Magne Bakkelis LinkedIn-innlegg |
| `04-praksis-oda-og-adevinta.md` | Praksiseksempler fra Oda (norsk!) og Adevinta |
| `05-gode-formuleringer.md` | De beste sitatene og formuleringene på tvers, sortert etter tema |
| `img/` | Nedlastede visualiseringer, se tabellen under |

## Kjapp oppsummering av funnene

Alle kildene er enige om kjernen: et dataprodukt er en dataleveranse som behandles med samme alvor som et produkt, med navngitt eier, kjente konsumenter, dokumentasjon og et løfte om kvalitet og endringshåndtering. Nyansene:

- **Begrepsskillet** er viktig å ha klart for seg: «data as a product» er tankesettet, «et dataprodukt» er leveransen. Forvirringen oppsto da data mesh-prinsippet ble forkortet i dagligtale.
- **Dehghani/data mesh** gir de åtte egenskapene (discoverable, addressable, trustworthy, self-describing, interoperable, secure, natively accessible, valuable) og komponentbildet: kode + data + metadata + infrastruktur, med input-, output- og discovery-porter.
- **Glitni** har de mest sitérbare norske formuleringene («en tabell kan være en ingrediens, dataproduktet er retten») og den beste advarselen: selskapet som definerte 1000 dataprodukter og endte med at ingenting var produkt.
- **Oda** viser praksis: et datasett blir produkt idet det deles utenfor teamet, lagmodellen Raw → Stage → Model → Serve, innsatsnivåer etter kritikalitet, og emoji-QA på dashboards.
- **Datakontrakten** går igjen som operasjonaliseringen av produkttankegangen: produktet er systemet, kontrakten er grensesnittet.

## Visualiseringer i img/

| Fil | Hva den viser | Kilde |
|---|---|---|
| `datamesh-architecture_datamesh-oversikt.png` | De fire data mesh-prinsippene, der «Data as a Product» er ett | datamesh-architecture.com |
| `datamesh-architecture_dataproduct-components.png` | Komponentene i et dataprodukt: porter, eierskap, kode, tester, dokumentasjon, CI/CD, observability | datamesh-architecture.com |
| `martinfowler_data-product.png` | Dehghanis originale illustrasjon: domene med dataprodukter + egenskapene (DATSIS) | martinfowler.com (Dehghani, 2019) |
| `martinfowler_data-mesh.png` | Dehghanis helhetsbilde: domener, global governance, self-serve plattform | martinfowler.com (Dehghani, 2019) |
| `medium_oda-data-as-a-product_01.png` | Odas seks prinsipper for data og innsikt | Oda på Medium |
| `medium_oda-data-as-a-product_02.png` | Odas desentraliserte eierskapsmodell: konsumenter, domeneteam, plattform | Oda på Medium (ill. Marianne Askheim) |
| `medium_oda-data-as-a-product_04.png` | Odas lagmodell: Raw → Stage → Model → Serve | Oda på Medium |
| `medium_adevinta-data-as-a-product_02.png` | Adevintas logiske lag: raw → events → metrics → rapportering | Adevinta på Medium |
| `medium_adevinta-data-as-a-product_03.png` | Messaging-dataproduktet, konkret eksempel på produkthierarki | Adevinta på Medium |
| `medium_adevinta-data-as-a-product_04.png` | Eksempelspørringer som del av produktdokumentasjonen | Adevinta på Medium |
| `tds_data-as-a-product-vs-data-products_02.png` | Datakatalog-UI hos Adevinta (discoverability i praksis) | Towards Data Science (Gumara Rigol) |
| `tds_data-as-a-product-vs-data-products_03.png` | Dokumentasjon av datalokasjon (self-describing) | Towards Data Science (Gumara Rigol) |
| `tds_data-as-a-product-vs-data-products_04.png` | Kvalitetsstatus vist i dashboard-tooltip («Quality: RELIABLE») | Towards Data Science (Gumara Rigol) |

Merk: bildene er til inspirasjon og research. Skal de brukes i publiserte artikler, må kilden krediteres (slik den publiserte datakontrakt-artikkelen krediterer datacontract.com), eller motivet tegnes om.
