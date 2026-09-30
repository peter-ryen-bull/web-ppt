# Historien om dataplattformen – speaker notes

Kladd: Hver fase er et svar på et konkret problem, og hver løsning
skaper det neste problemet. Grunnlaget ligger i
research/historien-om-dataplattform/ (01–05).

Konstanten:
«Flere folk vil stille flere spørsmål til mer data, raskere.»

## forside – Historien om dataplattformen

[14:00]  6 min. Neste kapittel ved 20:00. Ett poeng per epoke. Hold tempoet.

Dataplattform høres ut som en motesak. Det er det ikke.
Det er bare det foreløpig siste svaret på et 50 år gammelt problem.

## tidslinje – Seks faser, ett problem

1970 relasjonsdatabasen,
1988 datavarehuset,
2006 stordata,
2010 datasjøen,
2012 skyen,
2020 lakehouse.

Teknologien har utviklet seg hele veien, og skifter stadig.

## relasjonsmodellen – 1970 · Databasen

Sett scenen raskt:
- 60-tallet, hullkort og magnetbånd.
- Hvert program eide sine egne filer.
- Samme kunde tre steder,
i tre formater, og tallene spriker. Et nytt spørsmål betydde
et nytt program.

Ted Codd, IBM, 1970: tabeller som kobles på felles kjennetegn.

Det radikale: skill HVA du spør om fra HVOR
det ligger. SQL: si hva du vil ha, la databasen finne ut hvordan.

Du spør ikke en fil direkte, du sier bare: gi meg denne informasjonen fra tabellen som heter kunder.
==

Databasen ga driften ett delt minne.

Men den var bygget for drift, mange små transaksjoner, ikke analyse.
Kjør en tung rapport mot kassasystemet og køen vokser.
Og med ett system per funksjon spredte sannheten seg igjen.

«Hukommelse er ikke det samme som innsikt.»

## databasen-speil – Databasen: løst, og et nytt problem

Databasen ga driften ett delt minne.

Men den var bygget for drift, mange små transaksjoner, ikke analyse.
Kjør en tung rapport mot kassasystemet og køen vokser.
Og med ett system per funksjon spredte sannheten seg igjen.

«Hukommelse er ikke det samme som innsikt.»

## varehuset – 1988 · Datavarehuset

Ledelsen vil ha svar PÅ TVERS av systemer: Hvilke kunder er lønnsomme?
Kopier data ut av driftssystemene (ETL,
nattjobb) inn i ETT varehus bygget for spørsmål, ikke drift.


Skilte driftssystemer og analysesystemer.
OLTP mot OLAP.

Bankene var først, fordi penger er data. Risiko, svindel, lønnsomhet
og regulering krever alle et blikk på tvers av systemene. De hadde også
råd til det svært dyre.

==

Løst: én sannhet, historikk, beslutninger på fakta.
Nytt: dyrt, tregt (skjema først, en ny kilde tok måneder),
og det forsto bare rader og kolonner.

Overgang: «Og så kom internett.»

## varehuset-speil – Varehuset: løst, og et nytt problem

Løst: én sannhet, historikk, beslutninger på fakta.
Nytt: dyrt, tregt (skjema først, en ny kilde tok måneder),
og det forsto bare rader og kolonner.

Overgang: «Og så kom internett.»

## regnestykket – 2006 · Stordata

Klikkstrømmer, logger, søk, sosiale medier. Datamengden og variasjonen økte.
De gamle varehusene klarte ikke å holde følge.

Jeff Deans regnestykke (2006): hele nettet = 400 TB.
Én maskin leser 30–35 MB/s → fire måneder bare for å LESE det.
Tusen maskiner → under tre timer.

GFS + MapReduce → Hadoop (2006, åpen kildekode). Stordata forlot Google.

## datasjoen – 2010 · Datasjøen

James Dixon fra Pentaho beskrev det slik i 2010:
Varehuset er som flaskevann, ferdig pakket for kjente behov.
Datasjøen er vannet i sin naturlige tilstand.

Varehuset forhåndsaggregerer og BEGRENSER dermed spørsmålene.
Du lagrer rådata fordi du ikke kjenner morgendagens spørsmål.

## sjoen-speil – Sjøen: løst, og et nytt problem

Løst: skala, alle formater, ML fikk rådataene sine.
Nytt: datasumpa. Vi lagrer alt og tenker at vi skal rydde senere. Men senere kommer aldri.
En sjø blir en sump når ingen finner fram i dataene.
Og: to verdener, varehus for BI, sjø for ML. Doble kopier,
dobbel regning.

## skyen – 2012 · Skyen

Både varehuset og Hadoop forutsatte at du eide jernet,
dimensjonert for toppene.

Redshift (2012): det første petabyte-varehuset som skytjeneste.
Snowflakes grep: lagring og regnekraft som to uavhengige tjenester.
Flere team på samme data samtidig. Leie i stedet for å kjøpe.

## lakehouse – 2020 · Lakehouse

To spor gjennom 40 år: varehusets orden og forvaltning,
sjøens skala og økonomi. Lakehouse forener dem:
et transaksjonelt metadatalag (Delta, Iceberg) oppå objektlagringen.
Én kopi av dataene, for både BI og KI.

Dagens plattform er ikke en dings fra 2020. Hvert lag er arven
fra en epoke: SQL (1970), integrert historikk (1988), billig rålagring
(2010), elastisitet (2012), ett felles lag med tydelige regler (2020).

Data mesh (2019) er det organisatoriske motstykket: eierskap ut
i domenene. Plattformer feiler organisatorisk, ikke teknisk.

## avslutning – Data varer lenger enn systemene

Tim Berners-Lee sa det. Han oppfant World Wide Web.

Data er verdifulle, og de varer
lenger enn systemene selv.

Det er hele historien i én setning. Databasen, varehuset,
sjøen, skyen, lakehouse. Vi bytter ut systemene hele tiden.
Dataene er fortsatt her.
Og de vokser fortsatt eksponentielt: volum, hastighet og verdi.

AIS-meldinger fra 2005 er fortsatt her.

Systemene kommer og går. Dataene blir.
Så vi må modellere systemene etter dataene.

Derfor bygger vi en plattform med dataene i sentrum. Systemene rundt dem kan byttes ut etter hvert.
