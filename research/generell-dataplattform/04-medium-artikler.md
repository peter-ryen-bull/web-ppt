# Medium-artikler om dataplattform

Tre artikler:

1. «What is a Data Platform?» av Icaro Vazquez (apr 2024): https://medium.com/@icaro_vazquez/what-is-a-data-platform-081549a2cef6
2. «What's A Data Platform Anyway?» av Nemath Ahmed (aug 2021): https://medium.com/data-science/whats-a-data-platform-anyway-37773d9aef47
3. «Data Platform Modernization» av Gravity Innovative Solutions (des 2025): https://medium.com/@gravityinnovations123/data-platform-modernization-building-scalable-intelligent-and-future-ready-data-ecosystems-78d9865e6684

---

## 1. Icaro Vazquez: «What is a Data Platform?»

Skrevet av folk som har bygget og solgt dataplattformer i Silicon Valley. Den mest praktiske av de tre.

### Tre definisjoner

Artikkelen gir tre likestilte definisjoner:

> A Data Platform is:
> - «A software suite that enables organizations to process and manage large amounts of data quickly and efficiently. It manages data collection, normalization, transformation, and application for a given data product.»
> - «A central repository and processing house for all the organization's data.»
> - «A collection of data pipelines that ingest data, store it, transform it, and deliver it to a variety of destinations so the data can be consumed by different enterprise groups for their purposes.»

Og hverdagsversjonen, den beste:

> «In layman's terms, it is a collection of software tools that allow the organization to move and transform data from one place to another so it can be used for various purposes.»

### Komponentene i en moderne dataplattform

- **Datakilder**: data er spredt i mange systemer (CRM, webserverlogger, økonomisystemer, skylogger)
- **Ingest**: ETL/ELT, batch (FiveTran, Stitch) eller strømming (Kafka, Pub/Sub, Spark)
- **Transformasjon**: data vaskes med forretningslogikk, klargjøres for analyse. Verktøy: dbt, Dataform. Godt historisk poeng: «In the old days, this was done before loading the data in a database or data warehouse due to costs. These days the data can be loaded into a data lake and transformed later.»
- **Destinasjoner**: datavarehus (data optimalisert for rapportering) eller tjenester/applikasjoner som abonnerer på hendelser i sanntid
- **Analyselag**: BI og visualisering, der ikke-tekniske brukere møter dataene (Tableau, Power BI, Looker)
- **Orkestrering**: automatisering av arbeidsflyt (Airflow)
- **Observability**: overvåker plattformens helse. Tre nøkkelspørsmål: Freshness (er dataene ferske?), Data Arrival (har alt kommet frem?), Lineage (hva påvirkes oppstrøms og nedstrøms?)
- **Governance**: «the process that makes sure the data is available, secure, and usable». Spørsmålene den svarer på: Hvem skal ha tilgang? Hvem har hatt tilgang og når? Hvor lagres dataene? Når slettes de?

God formulering om governance:

> «Governance is not just software. It's rather a combination of software, processes, principles, and people.»

### Hvem er kundene til plattformen?

Interessant vinkel: kundene er som regel *andre utviklingsteam internt*, ikke sluttbrukere. Det gir plattformteamet et prioriteringsproblem, fordi deres ønsker («hjelp oss å hente data fra tjenesten deres») aldri når toppen av andre teams prioriteringsliste. Strategiene de foreslår: forstå kundenes use case, vis verdi, planlegg tidlig, bygg relasjoner.

### Om AI

> «LLMs are trained with huge datasets and these datasets will need to be stored somewhere, and that somewhere is, you guessed it, the Data Platform.»

Plattformen leverer også notebooks-miljøer og datatilgang til ML-teamene. Poenget: AI-teamets suksess avhenger av dataplattformen.

### Erfaringer fra virkeligheten (ærlig og bra)

- «The Data Platform grew organically»: mange plattformer er i praksis arvede, udokumenterte pipelines bygget av folk som har sluttet. Teamet «is saddled with supporting and enhancing data pipelines they may not understand but cannot shut down».
- «This is a maze of software tools»: ingen leverandør dekker alt, plattformteamet må få mange verktøy til å virke sammen.
- Observability-verktøyene har knapt utviklet seg siden 2000: fortsatt dashboards med grafer der utvikleren selv må korrelere. «Good luck with that!»

---

## 2. Nemath Ahmed: «What's A Data Platform Anyway?»

NB: Artikkelen ligger bak Mediums betalingsmur. Kun innledningen var tilgjengelig, men den er verdt det: Uber-historien er en god fortelling om hvorfor dataplattformer oppstår.

### Uber-historien (hook)

> «By 2014, Uber had generated just over a few terabytes of data. This limited data was spread across few traditional databases like MySQL and PostgreSQL. Engineers could access the databases individually and write scripts to combine the data sources.»

Det fungerte fint, og var raskt. Men:

> «But there was a problem — Data was scattered across several databases. In many cases, different services interacted with different databases.»

> «Since the data existed in disconnected, decentralized silos it became challenging for analysts to execute tasks that demanded data from multiple sources.»

Poenget: Uber er i bunn et datadrevet selskap (prisjustering ved høy etterspørsel osv.). Da datamengden eksploderte, ble siloene et hinder, og løsningen ble en samlet dataplattform.

Fortellergrepet er verdt å stjele: start med et selskap alle kjenner, vis at det fungerte helt fint i starten uten plattform, og la problemet vokse frem naturlig med veksten. Det svarer samtidig på spørsmålet «trenger vi egentlig en dataplattform?» med «ikke alltid, men fra en viss størrelse: ja».

(Ubers videre plattformreise er godt dokumentert i deres egen engineering-blogg, f.eks. Lambda-arkitektur for batch + sanntid, Apache Hudi for inkrementell ingest: https://www.uber.com/us/en/blog/from-batch-to-streaming-accelerating-data-freshness-in-ubers-data-lake/)

---

## 3. Gravity Innovations: «Data Platform Modernization»

Lang og ganske generisk artikkel om modernisering av dataplattformer. Språket er typisk AI-glatt, lite å hente av formuleringer, men strukturen og noen definisjoner er nyttige.

### Definisjonen

> «A data platform is the foundational layer that enables organizations to collect, store, process, manage, and analyze data at scale. It serves as a centralized ecosystem where data from multiple internal and external sources converges to support reporting, analytics, artificial intelligence, and operational decision-making.»

Og kravene til en god plattform, fire adjektiver som ofte går igjen:

> «A well-designed data platform ensures that data is accessible, reliable, secure, and ready for consumption.»

### Strategisk poeng

> «The ability to integrate seamlessly with applications, analytics tools, and AI models makes the data platform a strategic asset rather than a backend utility. This evolution has elevated data platforms from IT infrastructure components to core business enablers.»

### Tradisjonell vs. moderne plattform

- **Tradisjonell**: monolittisk, on-premise, batch. Fungerte da datavolum var forutsigbare og analyse betydde periodisk rapportering. Sliter med dagens fart, variasjon og skala.
- **Moderne**: skybasert, distribuert, modulær. Sanntid og batch, selvbetjent analyse, «democratize data access while maintaining governance».

### Modernisering er ikke migrering

Nyttig distinksjon:

> «Data migration focuses primarily on moving data from one system to another. (...) Simply relocating data without redesigning the underlying platform can result in higher costs and limited performance improvements.»

Modernisering handler om å re-designe hvordan data hentes inn, prosesseres, lagres og konsumeres, ikke bare flytte dem til skyen.

### Komponentbildet (samsvarer med Vazquez)

Ingest (batch + sanntid), lagring (objektlagring, data lake + varehus, lakehouse), prosessering/transformasjon, analyse/BI/selvbetjening, governance/sikkerhet. Pluss nyere temaer: data mesh, metadata/katalog, datakvalitet, MLOps, FinOps.

### Om lakehouse

> «The data lakehouse architecture combines the flexibility of data lakes with the performance and reliability of data warehouses. This unified approach eliminates the need for separate systems, reducing complexity and data duplication.»

(Samme poeng som Bouvet gjør om Databricks: «fleksibiliteten fra datalakes kombinert med styring og kvalitet fra datavarehus».)

---

## Fellestrekk på tvers av de tre

1. Alle definerer plattformen gjennom den samme verdikjeden: samle inn, lagre, transformere, levere/analysere, styre.
2. Alle understreker at plattformen er et middel: verdien ligger i beslutninger, automatisering og AI, ikke i plattformen selv.
3. Siloer er fienden i alle tre: plattformens jobb nummer én er å samle spredte data.
4. AI brukes som hovedargument for hvorfor plattformen er viktigere enn før: modellene trenger store mengder kvalitetssikrede, tilgjengelige data.
