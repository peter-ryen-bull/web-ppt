# Fase 3: Big data og datasjøen (2000–2015)

Kilder:
- https://pdos.csail.mit.edu/6.824/papers/gfs.pdf (Google File System-paperet, 2003)
- https://websci.informatik.uni-freiburg.de/teaching/ws201213/infosys/slides/m3_l1_mapreduce.pdf (MapReduce-tidslinjen og Jeff Dean-tallene)
- https://motherduck.com/learn/big-data/ (oversikt over big data-æraen)
- https://jamesdixon.wordpress.com/2010/10/14/pentaho-hadoop-and-data-lakes/ (Dixons opprinnelige datasjø-innlegg)
- https://jamesdixon.wordpress.com/2014/09/25/data-lakes-revisited/
- https://aijourn.com/data-lake-challenges-every-team-hits-and-how-to-avoid-them/ (datasump-kritikken)

## Problemet de ville løse

Internett endret premisset fullstendig. Klikkstrømmer, logger, søkehistorikk, etter hvert sosiale medier og sensorer – data som var enorme, halvstrukturerte og verdifulle. Google skulle indeksere hele nettet, og regnestykket deres (Jeff Dean, 2006) viser hvorfor gammel teknologi ikke strakk til:

- 20+ milliarder nettsider × 20 KB = **400 TB**
- Én maskin leser 30–35 MB/s fra disk → **~4 måneder** bare for å lese nettet
- Samme jobb med 1 000 maskiner: **under 3 timer**

Parallelle databaser (som Teradata) fantes, men var «neither well-suited nor cost-effective» for denne typen data. Tre ting skortet det på:

1. **Volum:** varehuset skalerte ikke økonomisk til petabytes.
2. **Variasjon:** rader og kolonner passet ikke for logger, tekst og bilder (schema-on-write ble en tvangstrøye).
3. **Feiltoleranse:** med tusenvis av billige maskiner er maskinfeil normalen, ikke unntaket – GFS-paperet åpner med akkurat det: «component failures are the norm rather than the exception».

## Løsningen: distribuer alt, lagre alt

- **2003: Google File System (GFS)** – lagre enorme filer fordelt på tusenvis av billige maskiner, med feiltoleranse i programvaren.
- **2004: MapReduce** – en enkel programmeringsmodell for å prosessere dataene der de ligger («move computation to data»).
- **2006: Apache Hadoop** – Yahoo og åpen kildekode-miljøet (Doug Cutting) gjenskaper GFS og MapReduce som HDFS + Hadoop. Big data ble tilgjengelig for alle, ikke bare Silicon Valley-gigantene. Senere kom **Apache Spark** fra UC Berkeley som raskere og mer fleksibel motor.
- «De tre V-ene» (volum, hastighet/velocity, variasjon) ble rammen alle snakket i.

## Datasjøen (2010)

I oktober 2010 lanserte **James Dixon** (CTO i Pentaho) begrepet *data lake*, med en analogi som fortsatt er den beste:

> «Tenk på et datamart som en butikk med flaskevann – renset, pakket og strukturert for enkelt konsum. Datasjøen er en stor vannmasse i mer naturlig tilstand. Innholdet strømmer inn fra en kilde og fyller sjøen, og ulike brukere kan komme for å undersøke, dykke i den eller ta prøver.»

Poenget hans: varehus og datamarts forhåndsaggregerer, og dermed **begrenser de hvilke spørsmål som kan stilles**. Du lagrer rådataene fordi du ikke kjenner morgendagens spørsmål: «You store all the data because you don't know in advance all the questions that you will need to ask of it.»

## Hva sjøen løste – og det nye problemet

**Løst:** Lagre alt, billig, i hvilket som helst format. Skalaen var ikke lenger problemet. Maskinlæring fikk rådataene den trengte.

**Nytt problem:**

- **Datasumpa.** «Ingest everything, figure out governance later. Later never comes.» En sjø blir en sump når *gjenfinnbarheten* svikter – når en kompetent analytiker ikke kan avgjøre om et datasett er oppdatert, korrekt eller trygt å bruke uten å spørre et menneske. Uten katalog, eierskap og metadata ble sjøen en billig fylling.
- **Kompleksitet.** Hadoop-klynger krevde spesialister; analytikere med SQL i fingrene sto utenfor.
- **To parallelle verdener.** Varehuset levde videre for BI, sjøen for data science. Samme data ble kopiert til begge, med hver sine pipelines, hver sin sannhet og dobbel regning.

Det er dét de neste fasene skulle rydde opp i.

## Gode formuleringer

- Dixons flaskevann-mot-sjø-analogi (over).
- «Feil er normalen, ikke unntaket» – feiltoleranse i programvare, ikke i maskinvare.
- «Du lagrer rådata fordi du ikke kjenner morgendagens spørsmål.»
- «En sjø blir en sump når gjenfinnbarheten svikter – ikke når datakvaliteten gjør det.»
- Jeff Dean-regnestykket: 4 måneder på én maskin, 3 timer på tusen.
