# Fase 1: Databasen (1960–1980)

Kilder:
- https://www.ibm.com/history/relational-database (IBM om Codd og System R)
- https://cacm.acm.org/research/50-years-of-queries/ (Don Chamberlin: «50 Years of Queries»)
- https://doi.org/10.1145/356662.356664 (Fry & Sibley: «Evolution of Data-Base Management Systems», 1976)
- https://www.cockroachlabs.com/blog/history-of-databases-distributed-sql/

## Problemet de ville løse

Før databasen eide hvert program sine egne data. Dataene lå i flate filer på magnetbånd og hullkort, i formater bare det ene programmet forsto. Konsekvensene:

- Samme opplysning (en kunde, en konto) ble lagret mange steder, i mange formater – og spriket.
- Et nytt spørsmål betydde et nytt program. Ville du vite noe dataene kunne svare på, måtte en programmerer skrive kode som leste filene sekvensielt.
- Lagring var dyrt, og redundansen sløste bort plass.

Kort sagt: data var fanget i applikasjonene sine.

## Første forsøk: hierarkiske og nettverksdatabaser

- **1964: IDS (Integrated Data Store)** – Charles Bachman hos General Electric. Nettverksmodellen: poster koblet med pekere. Kombinerte direktetilgangslagring (disk) med høynivåspråk som COBOL.
- **1969: IBM IMS** – utviklet på 60-tallet for NASA og Apollo-programmet (holde styr på delelister for månelandingen), gjort kommersielt tilgjengelig i 1969. Hierarkisk modell: data som «foreldre» og «barn» på disk.
- CODASYL/DBTG standardiserte nettverksmodellen (anbefalinger 1969/1971).

Dette var et stort fremskritt – flere programmer kunne dele samme data. Men modellene hadde en innebygd svakhet: **du måtte navigere den fysiske strukturen**. Programmereren måtte vite hvor dataene lå og følge pekere fra post til post. Et nytt spørsmål betydde fortsatt ny navigasjonskode, og endret du strukturen, knakk programmene.

## Gjennombruddet: relasjonsmodellen (1970)

I juni 1970 publiserte Edgar F. «Ted» Codd, matematiker ved IBM San Jose, paperet **«A Relational Model of Data for Large Shared Data Banks»**. Idéen:

- Skill den logiske datamodellen fra den fysiske lagringen. Brukeren skal slippe å vite (eller bry seg om) hvor dataene fysisk ligger.
- Organiser data i tabeller som kan kobles («relateres») på felles kjennetegn.
- Lagre hvert faktum én gang – og kunne svare på et hvilket som helst spørsmål, så lenge svaret finnes i dataene.

Fra Cockroach Labs' historikk: «A database with this structure could answer any question, so long as the answer was stored somewhere in it.»

## Fra teori til produkt

- **1973–79: System R** ved IBM San Jose beviste at modellen var praktisk gjennomførbar. Chamberlin og Boyce laget **SQL** – deklarative spørringer: si *hva* du vil ha, la databasen finne ut *hvordan*. Patricia Selinger laget den kostnadsbaserte optimalisatoren som gjorde det effektivt.
- Parallelt: **INGRES** ved UC Berkeley (spørrespråket QUEL).
- **1979: Oracle** – Software Development Laboratories (senere Oracle) leste System R-papirene og rakk først til markedet med den første kommersielle SQL-databasen.
- **1983: IBM DB2**. Utover 80- og 90-tallet vant relasjonsmodellen fullstendig; SQL ble dataenes språk.

## Hva databasen løste – og det nye problemet

**Løst:** Ett delt, konsistent minne for virksomheten. Transaksjoner (OLTP) med garantier. Spørsmål uten å programmere navigasjon.

**Nytt problem:** Databasene var bygget for *drift* – mange små, raske transaksjoner (sett inn ordren, oppdater saldoen). De var ikke bygget for *analyse*. Tunge analytiske spørringer («hvordan har salget utviklet seg per region siste fem år?») kunne sette kassasystemet på kne. Og etter hvert som virksomhetene fikk ett system per funksjon – økonomi, kunde, lager, lønn – spredte sannheten seg igjen utover mange databaser.

Det er dét problemet neste fase skulle løse.

## Gode formuleringer

- «Data var fanget i applikasjonene sine.»
- Codd skilte *hva* fra *hvor*: du spør om innholdet, ikke om plasseringen.
- SQL: si hva du vil ha, la databasen finne ut hvordan.
- Databasen ble virksomhetens operative hukommelse – men hukommelse er ikke det samme som innsikt.
