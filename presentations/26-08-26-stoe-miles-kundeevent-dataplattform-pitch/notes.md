# Speaker notes – Mer innsikt med en moderne dataplattform

Alt før første `## slide-id`-overskrift ignoreres, så dette området kan brukes
til kladd og huskelapper. Hver `##`-seksjon kobles til sliden med samme id
(teksten etter id-en i overskriften er kun til lesbarhet). HTML-kommentarer
(`<!-- ... -->`) vises aldri i presentatørvisningen.

## forside – Forside

Ønsk velkommen og presenter deg kort.
Si hva timen handler om: hvorfor «alle» bygger dataplattform – og hva Stø kan få ut av det.

## hvorfor – Hvorfor bygger «alle» dataplattform?

Retorisk spørsmål som rammer inn hele presentasjonen.
La spørsmålet henge litt i lufta før du går videre.

## om-peter – Peter Bull

Kort om bakgrunn: dataplattformutvikler.
Bred erfaring fra offentlig og privat virksomhet.
Azure- og Databricks-ekspert.

## data-og-ai – Tjenesteområde: Data og AI

Miles sitt tjenesteområde Data og AI.
Nevn bredden: dataplattform, dataanalyse, AI/ML, data engineering, big data, RAG.

## pains-1 – Pains: Excelarket, Eposten …

Smertepunktene folk kjenner seg igjen i: Excelarket som sendes rundt, eposten med tall, rapporten som lages manuelt, datauttrekket som må bestilles.
Poeng: dette er hverdagen uten en plattform.

## pains-2 – Pains: Dokumentering, GDPR …

Flere pains: dokumentering, rapportering, GDPR, sletting og loggføring.
Poeng: etterlevelse er tungt og manuelt uten felles plattform.

## stoe-data – Stø har et enormt datagrunnlag

Stø har et enormt datagrunnlag:
- 2,3 milliarder transaksjoner i året
- 5 millioner brukere
- 1500+ bedrifter under KYC
- 3 separate domener, flere oppkjøp

Poeng: potensialet er stort – men dataene er spredt.

## hva-er – Hva er en dataplattform

Kapittelskifte: hva er egentlig en dataplattform?

## logoer – Databricks / Snowflake / Fabric

De store plattformene: Databricks, Snowflake, Microsoft Fabric.
Konseptene er like på tvers – valg av verktøy er mindre viktig enn arbeidsmåten.

## diagram-1 – Arkitektur: kilder

Arkitekturen bygges opp stegvis. Start med kildene: fagsystemer, databaser, SaaS.

## diagram-2 – Arkitektur: + lagring

Neste lag: lagring – samle rådata ett sted (lakehouse).

## diagram-3 – Arkitektur: + transformering

Transformering: vaske, koble og berike data til noe brukbart.

## diagram-4 – Arkitektur: + eksponering

Eksponering: gjøre dataene tilgjengelige – SQL, API-er, filer.

## diagram-5 – Arkitektur: + konsumenter

Konsumenter: BI, analyse, maskinlæring og andre systemer.

## diagram-6 – Arkitektur: komplett

Hele bildet samlet.
Oppsummer flyten fra kilde til konsument før kapittelskiftet.

## samle-data – Samle data fra kildesystemer

Essensen i én setning: samle data fra kildesystemer, analysere den – og dele videre.

## data-som-produkt – Data som produkt

Kapittelskifte: data som produkt.
Tankesettet: data skal ha eier, kvalitet og livssyklus – som et hvilket som helst produkt.

## dataprodukt – Dataprodukt

Et dataprodukt er kvalitetssikret, forvaltet og dokumentert.
Ikke bare en tabell noen dumpet et sted.

## datakontrakt – Datakontrakt

Datakontrakten er avtalen mellom produsent og konsument:
skjema, kvalitetskrav, SLA og eierskap.

## yaml – Datakontrakt som YAML

Konkret eksempel: datakontrakt som YAML (ODCS).
Poeng: kontrakten er maskinlesbar – den kan valideres og håndheves automatisk.

## hvordan – Hvordan begynner man?

Kapittelskifte: hvordan begynner man å bygge dataplattform?

## roller – 1. Definere roller

Steg 1: definere roller.
Plattform, engineers/analytikere, governance og BI-/konsumbrukere.
Poeng: tydelig ansvar før teknologi.

## dataprodukter-forst – 2. Bygge dataprodukter først

Steg 2: bygg dataprodukter først – infrastruktur etter behov.
Ikke bruk to år på plattform uten å levere verdi underveis.

## metadata – 3. Forvalte metadata og sikkerhet

Steg 3: forvalte metadata og informasjonssikkerhet fra start.

## forvaltning – Datakontrakter, eierskap, katalog

Verktøyene for forvaltning: datakontrakter, dataeierskap og datakatalog.
Sentraliser logging, audits og rapportering.
Nevn Purview som eksempel.

## skaler – 4. Skalér og fjern flaskehalser

Steg 4: skalér og fjern flaskehalser.
Desentraliser der det er trygt – plattformen skal gjøre teamene raskere, ikke stå i veien.

## oppsummering – Oppsummering

Tilbake til åpningsspørsmålet: hvorfor bygger «alle» dataplattform?
Tydelige effekter – men det må gjøres riktig.

## avslutning – Vi elsker å løse utfordringer!

Avslutt: vi elsker å løse utfordringer!
Takk for oppmerksomheten – åpne for spørsmål og legg igjen kontaktinfo.
