# Fase 4: Skyen, modern data stack og lakehouse (2012–nå)

Kilder:
- https://www.amazon.science/latest-news/amazon-redshift-ten-years-of-continuous-reinvention (Redshift-historien)
- https://pages.cs.wisc.edu/~remzi/Classes/739/Spring2004/Papers/p215-dageville-snowflake.pdf (Snowflake-paperet, SIGMOD 2016)
- https://hidekazu-konishi.com/entry/cloud_data_warehouse_history_and_timeline.html (tidslinje for sky-datavarehus)
- https://www.knowi.com/blog/modern-data-stack-past-present-future/ (modern data stack)
- https://www.databricks.com/sites/default/files/2020/12/cidr_lakehouse.pdf (Lakehouse-paperet, CIDR 2021)
- https://www.vldb.org/pvldb/vol13/p3411-armbrust.pdf (Delta Lake-paperet, VLDB 2020)
- https://datalakehousehub.com/blog/2025-09-2026-guide-to-data-lakehouses (dagens referansearkitektur)

## Problemet de ville løse

Både varehus og Hadoop-klynger delte én forutsetning: du måtte **kjøpe og drifte jernet selv**. Kapasitet måtte planlegges år i forveien, dimensjonert for toppene. Og volumene fortsatte å vokse.

## Løsningen del 1: skyen (2012–2016)

- **November 2012: Amazon Redshift** – det første petabyte-skala datavarehuset som ren skytjeneste. Amazons egne tester viste 10–150× raskere spørringer enn deres on-premise varehus, og etterspørselen i preview var ti ganger det AWS hadde planlagt for hele første året.
- **Google BigQuery** – serverløst: du tenker ikke på maskiner i det hele tatt.
- **Snowflake** (GA 2015, paperet 2016) tok det avgjørende arkitekturgrepet: **skill lagring fra regnekraft**. Data ligger i objektlagring (S3); «virtual warehouses» skrus av og på uavhengig. Flere team kan regne på de samme dataene samtidig uten å slåss om kapasitet, og du betaler bare for det du bruker.

Skyen fjernet kapasitetsproblemet: leie i stedet for å kjøpe, skalere i stedet for å planlegge.

## Løsningen del 2: modern data stack (2016–2020)

Rundt sky-varehuset vokste det frem en modulær verktøykasse av spesialiserte SaaS-tjenester:

| Lag | Verktøy |
|---|---|
| Innhenting | Fivetran, Airbyte |
| Lagring | Snowflake, BigQuery, Redshift, Databricks |
| Transformasjon | dbt (SQL med versjonskontroll, tester og dokumentasjon – ELT i stedet for ETL) |
| Orkestrering | Airflow, Dagster |
| BI | Looker, Power BI, Tableau |

dbt gjorde analytikeren til utvikler («analytics engineering»): transformasjonene flyttet inn i varehuset, i versjonskontrollert SQL. Men verktøyjungelen ble i seg selv et problem – mange bokser, mange leverandører, mye lim.

## Løsningen del 3: lakehouse (2020) og data mesh (2019)

- **Data mesh (Zhamak Dehghani, 2019)** var det *organisatoriske* svaret: sentrale dataavdelinger ble flaskehalser. Flytt eierskapet til domenene, behandle data som produkter. En erkjennelse som rimer med det Glitni og Bouvet også sier: plattformer feiler organisatorisk, ikke teknisk.
- **Lakehouse (Databricks, 2020)** var det *arkitektoniske* svaret på to-verdener-problemet: «combines the best elements of data lakes and data warehouses». Grepet er et transaksjonelt metadatalag (Delta Lake, Apache Iceberg, Hudi) oppå billig objektlagring: ACID-transaksjoner, versjonering, skjemahåndtering og governance – rett på sjøen. Delta Lake-paperet viser hvordan kunder erstattet «previously separate data lake, data warehouse and streaming storage systems» med ett lag.
- Konvergensen går begge veier: sky-varehusene (Snowflake, BigQuery, Redshift) har omfavnet åpne tabellformater og leser/skriver mot sjøen. Varehus og sjø vokser sammen.

## Hvorfor vi er der vi er: dataplattformen

Dagens referansearkitektur (2025/2026-konsensus) er lagdelt: objektlagring i bunn, åpent tabellformat, innhenting som blander batch og strømming, katalog for governance og gjenfinnbarhet, og et fleksibelt konsumlag som serverer SQL, BI, notebooks og KI-agenter med samme semantikk.

Det er dette vi kaller en **dataplattform** – og den bærer arven fra alle fasene:

| År | Arv | Fra |
|---|---|---|
| 1970 | Én delt sannhet, deklarative spørsmål (SQL) | Relasjonsmodellen |
| 1988 | Integrert historikk, adskilt fra driften, modellering | Datavarehuset |
| 2006–2010 | Billig rålagring, alle formater, «lagre alt» | Big data og datasjøen |
| 2012 | Elastisitet: lagring og regnekraft hver for seg, betal for bruk | Skyen |
| 2019 | Domeneeierskap, data som produkt | Data mesh |
| 2020 | Ett lag for BI *og* KI – governance på toppen av sjøen | Lakehouse |

Og driveren nå er **KI**: modeller trenger både tabeller, tekst, bilder og strømmer – governed, versjonert og klare til trening og inferens. Gartner-anslaget som går igjen: gjennom 2026 vil 80 % av virksomheter som prøver å skalere digital forretning, feile fordi de ikke moderniserer styringen av data og analyse. Dataplattformen er ikke lenger et rapportverktøy – den er grunnmuren for alt virksomheten vil gjøre med KI.

## Gode formuleringer

- «Leie i stedet for å kjøpe, skalere i stedet for å planlegge.»
- Snowflakes grep i én setning: «Snowflake separates storage and compute.»
- «Lakehouse: varehusets orden på sjøens økonomi.»
- «Teknologien skifter. Problemet består: å gjøre data om til beslutninger.»
- Hver epoke løste forrige epokes flaskehals – og skapte en ny.
