# Historien om dataplattformen – speaker notes

Kladd: Fortellingsgrepet er speilingen – hver fase er et svar på et konkret
problem, og hver løsning skaper det neste problemet. Grunnlaget ligger i
research/historien-om-dataplattform/ (01–05).

Konstanten som gjentas gjennom hele presentasjonen:
«Flere folk vil stille flere spørsmål til mer data – raskere.»

## forside – Historien om dataplattformen
Åpning: «Dataplattform høres ut som en motesak. Det er det ikke.
Det er det foreløpig siste svaret på et 60 år gammelt problem.»

Lov publikum én ting: etter denne halvtimen forstår dere HVORFOR
dagens plattformer ser ut som de gjør – ikke bare hvordan.

## tidslinje – Fem faser – ett problem
Rask flyover: 1970 databasen, 1988 datavarehuset, 2006 big data,
2010 datasjøen, 2012 skyen, 2020 lakehouse. Ikke dvel – vi skal
gjennom hver av dem. Poengter at avstanden mellom hoppene krymper:
teknologiskiftene kommer tettere.

## moensteret – Mønsteret som driver historien
Dette er nøkkelen til hele foredraget: et problem får en løsning,
løsningen skaper et nytt problem – som blir neste tiårs utgangspunkt.
Flaskehalsen flytter seg: fra programmet, til driften, til skjemaet,
til jernet, til organisasjonen.

Be publikum se etter mønsteret i hver fase fremover.

## kap-databasen – 1970 · Databasen
Sett scenen: 60-tallet, hullkort og magnetbånd. Data fantes –
men var fanget i applikasjonene sine.

## siloer – Hvert program eide sine egne filer
Hvert program hadde sitt eget filformat. Samme kunde lagret tre
steder, på tre måter – og tallene spriker.
Et nytt spørsmål = et nytt program = uker med venting.

Første forsøk på løsning: IMS (IBM, Apollo-programmet!) og IDS –
delte databaser, men du måtte NAVIGERE den fysiske strukturen.
Bare eksperter kunne spørre.

## relasjonsmodellen – Codd: skill spørsmålet fra lagringen
Ted Codd, matematiker hos IBM, 1970: organiser data i tabeller som
kobles på felles kjennetegn. Lagre hvert faktum én gang.
Det radikale: skill HVA du spør om fra HVOR det ligger.

SQL (System R): si hva du vil ha, la databasen finne ut hvordan.
Morsom detalj: Oracle leste IBMs forskningsartikler og rakk først
til markedet (1979) – før IBM selv.

## databasen-speil – Databasen: løst og nytt problem
Speilingen, første gang: databasen ga driften ett delt minne.
Men den var bygget for drift – mange små transaksjoner – ikke analyse.
Kjør en tung rapportspørring mot kassasystemet og køen vokser.
Og med ett system per funksjon spredte sannheten seg IGJEN.

«Hukommelse er ikke det samme som innsikt» – det tar oss til 1988.

## kap-varehuset – 1988 · Datavarehuset
Ledelsen vil ha svar PÅ TVERS: Hvilke kunder er lønnsomme?
Hva er samlet risiko? Det fantes ikke noe sted å stille de spørsmålene.

## varehuset – Ett integrert varehus
Løsningen: kopier data ut av driftssystemene (ETL, nattjobb),
integrer dem i ETT varehus bygget for spørsmål, ikke drift.
Inmons definisjon: emneorientert, integrert, tidsvariant, ikke-flyktig.
Devlin & Murphy (IBM) beskrev arkitekturen først, 1988.
Inmon vs. Kimball = de to skolene (normalisert vs. stjerneskjema).

## finans – Bankene var først
Hvorfor finans? Penger ER data – banken har ingen fysisk vare.
Risiko, svindel, lønnsomhet krever tvers-av-systemer-blikk.
Regulering tvang frem historikk. Og: de hadde råd –
Teradata-kostnadene var «eye-watering» (Barry Devlin).

First Interstate Bancorp begynte i 1991 – «to år før noen kjente
begrepet datavarehus», sa teknologidirektøren deres.

## varehuset-speil – Varehuset: løst og nytt problem
Løst: én sannhet, historikk, beslutninger på fakta.
Nytt: dyrt, tregt (skjema først – ny kilde tok måneder),
og det forsto bare rader og kolonner.

Cliffhanger: «Og så kom internett.»

## kap-bigdata – 2006 · Big data
Klikkstrømmer, logger, søk, sosiale medier. Tre ting skortet det på:
volum (petabytes), variasjon (ikke rader og kolonner),
og feiltoleranse (med tusen billige maskiner er feil normalen).

## regnestykket – Googles svar: distribuer alt
Jeff Deans regnestykke (2006): hele nettet = 400 TB.
Én maskin leser 30–35 MB/s → fire måneder bare for å LESE det.
Tusen maskiner → under tre timer.

GFS (2003) + MapReduce (2004) → Hadoop (2006, åpen kildekode).
Big data ble tilgjengelig for alle – ikke bare Google.

## datasjoen – Datasjøen: lagre alt, rått
James Dixon (Pentaho), 2010. Analogien hans er fortsatt den beste:
datamartet er flaskevann – renset, pakket, for kjente spørsmål.
Sjøen er vann i naturlig tilstand – du dykker, tar prøver.

Kjernepoenget: varehuset forhåndsaggregerer og BEGRENSER dermed
spørsmålene. Du lagrer rådata fordi du ikke kjenner morgendagens
spørsmål.

## sjoen-speil – Sjøen: løst og nytt problem
Løst: skala, alle formater, ML fikk rådata.
Nytt: datasumpa – «ingest everything, figure out governance later.
Later never comes.» En sjø blir en sump når GJENFINNBARHETEN svikter.
Og: vi endte med TO verdener – varehus for BI, sjø for ML.
Doble kopier, doble pipelines, dobbel regning.

## kap-skyen – 2012 · Skyen
Både varehus og Hadoop delte én forutsetning: du eide jernet.
Kapasitet planlagt år i forveien, dimensjonert for toppene.

## skyen – Skill lagring fra regnekraft
Redshift (2012): første petabyte-varehus som ren skytjeneste –
ti ganger mer etterspørsel enn AWS hadde planlagt.
Snowflakes grep: lagring og regnekraft er to uavhengige tjenester.
Flere team på samme data samtidig, uten å slåss om kapasitet.
Leie i stedet for å kjøpe, skalere i stedet for å planlegge.

Rundt varehuset: modern data stack (Fivetran, dbt, Looker …) –
kraftig, men verktøyjungelen ble sitt eget problem.

## lakehouse – To spor møtes: lakehouse
To spor gjennom 40 år: varehusets orden og styring,
sjøens skala og økonomi. 2020: lakehouse forener dem –
et transaksjonelt metadatalag (Delta, Iceberg) OPPÅ objektlagringen.
Én kopi av dataene, for både BI og KI.

Data mesh (2019) er det organisatoriske motstykket: eierskap ut
i domenene, data som produkt. Plattformer feiler organisatorisk,
ikke teknisk.

## arven – Plattformen lag for lag
Poenget med hele historien: dagens dataplattform er ikke en dings
noen fant opp i 2020. Hvert lag er arven fra en epoke:
SQL og én sannhet (1970), integrert historikk (1988), billig
rålagring (2010), elastisitet (2012), eierskap (2019),
ett governed lag (2020).

## avslutning – Problemet består
Land fortellingen: flaskehalsen har flyttet seg i 60 år –
program, drift, skjema, jern, organisasjon.
Konstanten: flere folk vil stille flere spørsmål til mer data, raskere.

KI hever innsatsen: modellene blir aldri bedre enn dataene
plattformen serverer dem. Derfor bygger vi dataplattformer.
