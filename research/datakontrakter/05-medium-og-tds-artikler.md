# Medium- og Towards Data Science-artikler om datakontrakter

Fire artikler:

1. Maggie Hays (DataHub): «The What, Why, and How of Data Contracts» (mars 2023): https://medium.com/datahub-project/the-what-why-and-how-of-data-contracts-278aa7c5f294
2. Piethein Strengholt: «Data Contracts – ensure robustness in your data mesh architecture»: https://towardsdatascience.com/data-contracts-ensure-robustness-in-your-data-mesh-architecture-69a3c38f07db/
3. Pierre-Yves Bonnefoy: «Data Contracts: The Key to Scalable Decentralized Data Management?»: https://medium.com/@bonnefoypy/data-contracts-the-key-to-scalable-decentralized-data-management-7120b1399c69
4. Sarath Sagi (itversity): «Data Contracts: The Fix Your Data Platform Needs»: https://medium.com/itversity/data-contracts-the-fix-your-data-platform-needs-6cc7afa097d2

---

## 1. Maggie Hays / DataHub (AMA med Chad Sanderson og Shirshanka Das)

Den mest praktiske og siterbare av Medium-artiklene. Basert på crowdsourcede spørsmål.

### Definisjonen (fem punkter)

En datakontrakt er en avtale mellom produsent og konsument som definerer: hvilke data som skal flyttes, formen på dataene (skjema og semantikk), forventninger til tilgjengelighet og kvalitet, hva som skjer ved kontraktsbrudd, og hvordan (og hvor lenge) konsumenten skal bruke dataene.

### Kontrakter er toveis

Underkommunisert poeng i de fleste andre kilder:

> «Data contracts are bi-directional: an effective data contract sets clear expectations for both the producer and consumer of data.»

Kontrakten forplikter også konsumenten: hvordan dataene brukes, deles videre og repliseres. Og den reforhandles jevnlig.

### Kontrakt vs. DDL

Skjemadefinisjonen (DDL) er bare en del av kontrakten. DDL fanger ikke semantikk, retention, SLA/SLO eller bruksområder.

### Hvor skal man starte?

> «Don't overthink this one. You can introduce a contract anywhere you see a handoff between a producer and consumer.»

Og prioriteringen: bruk datakatalogen og lineage til å finne de mest verdifulle datasettene (hvor mange kritiske ting bygger på dem), start med omsetningsnære use cases, én eller to enkle regler først. «Maybe you're already using dbt Tests or encoding quality checks within your Airflow DAGs — treat that as your starting point.»

### Salgsargumentet til ledelsen

> «You manage the rest of your software as code. Why not your data?»

### Kulturpoenget

> «The big challenge in managing contracts is less of a technical challenge and more of a social-cultural challenge.»

## 2. Piethein Strengholt (TDS)

Strengholt (Microsoft, forfatter av «Data Management at Scale», O'Reilly) vinkler kontrakter mot kobling i distribuerte arkitekturer: applikasjoner som konsumerer andres data er tett koblet, og små endringer kaskaderer. Kontrakter er verktøyet for å håndtere endringer og kompatibilitet når dataprodukter blir populære.

Han beskriver et metadata-drevet rammeverk (se `img/tds_strengholt-data-contracts_01.png`): kontrakter versjoneres i Git, en metadatatjeneste holder oversikt, domenene leverer dataprodukter med «data product sidecars» for tilgangskontroll, og konsument-endepunkter provisjoneres fra kontraktene. Interessant idé derfra: tilgangslaget («data product access layer») genereres automatisk fra kontraktsrepoet, f.eks. som ACL-er eller serverless views. «Your end goal must be to derive your data contracts in a fully automated manner.»

## 3. Pierre-Yves Bonnefoy

Gjennomgår typisk arkitektur for en kontraktsimplementering: kontraktregister som sentraliserer definisjonene, valideringstjeneste, CI/CD-integrasjon for automatisering, monitorering for kontinuerlig kvalitet, og governance for kontrollert utvikling. Bruker ODCS som gjennomgående eksempel med en kundedata-stream, og forklarer seksjonene (id/info, servers, models med PII-merking, terms med retention i ISO 8601, servicelevels). Knytter det også til medaljongarkitektur (bronse/sølv/gull) med salgsdomenet som eksempel.

## 4. Sarath Sagi (itversity)

Enkel, pedagogisk. Fin plassering av kontrakten i plattformen:

> [Application Services] → [Event Broker / Database] → [Contract Validation Layer] → [Data Lake / Warehouse] → [Dashboards / ML Models]

Fem-stegs implementering: definer (JSON Schema/Protobuf/Avro med constraints), valider (i ingest og CI/CD), håndhev (blokker eller sett ugyldige records i karantene, varsle), versjonér (semver, kun bakoverkompatible endringer som standard), dokumentér og gjør synlig (DataHub/OpenMetadata).

Håndhevingsregelen er kjernen: «Only valid data proceeds downstream.»
