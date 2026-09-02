# Fase 2: Datavarehuset (1983–2000) – og hvorfor finans var først

Kilder:
- https://www.9sight.com/pdfs/Thirty_Years_of_DW.pdf (Barry Devlin: «Thirty Years of Data Warehousing», 2018)
- https://en.wikipedia.org/wiki/Data_warehousing (tidslinjen)
- https://www.americanbanker.com/news/1st-interstate-tries-to-stay-ahead-of-curve (First Interstate Bancorp)
- https://public.dhe.ibm.com/software/data/mdm/pdf/BDW_GIM_2006.pdf (IBM Banking Data Warehouse)

## Problemet de ville løse

På 80-tallet hadde store virksomheter fått mange driftssystemer – ett for konto, ett for lån, ett for kort, ett for kunde. Hver for seg fungerte de. Men ledelsen ville ha svar *på tvers*: Hvilke kunder er lønnsomme? Hva er samlet risikoeksponering? Hvem er i ferd med å forlate oss?

Tre ting sto i veien:

1. **Dataene var innelåst i driftssystemene** («captive on legacy applications», som Tower Group-analytikeren sa det til American Banker). Formater og strukturer var laget for drift, ikke for spørsmål.
2. **Analyse truet driften.** Tunge spørringer mot produksjonssystemene gikk ut over kassene og skrankene.
3. **Uttrekk-anarkiet.** Uten en felles arkitektur laget hver avdeling sine egne uttrekk og kopier. Wikipedia beskriver kjernen: enorme mengder redundans, der hvert beslutningsstøttemiljø gjentok samme innsamling, vasking og integrasjon – og tallene i ledermøtet spriket fordi hver avdeling hadde regnet på sin egen kopi.

## Løsningen: ett integrert varehus for beslutninger

- **1983: Teradata DBC/1012** – en «database computer» bygget spesifikt for beslutningsstøtte, med massiv parallellprosessering. Barry Devlin bemerker tørt at kostnadene var «eye-watering» – dette var stormaskin-økonomi.
- **Februar 1988: Devlin & Murphy** publiserer «An Architecture for a Business and Information System» i IBM Systems Journal – den første formelle beskrivelsen av en datavarehus-arkitektur («business data warehouse», EBIS-arkitekturen i IBM EMEA).
- **1992: Bill Inmon** gir ut *Building the Data Warehouse* og populariserer begrepet, med den mye siterte definisjonen: et **emneorientert, integrert, tidsvariant og ikke-flyktig** datasett til støtte for ledelsens beslutninger.
- **1990/1996: Ralph Kimball** – grunnlegger Red Brick Systems (1990) og gir ut *The Data Warehouse Toolkit* (1996): dimensjonsmodellering og stjerneskjema, bygget for spørsmålene, ikke for driften. Inmon (sentralt, normalisert) vs. Kimball (dimensjonelt, per forretningsprosess) ble de to skolene.
- Rundt det samme: **BI-begrepet** (Howard Dresner, Gartner, 1989) og **OLAP** (Codd-rapporten, 1993) – verktøyene som satt oppå varehuset.

## Hvorfor finans var først

Datavarehuset ble i praksis født i bank og finans, og det er ikke tilfeldig:

- **Penger ER data.** En bank har ingen fysisk vare – balansen, transaksjonene og risikoen finnes bare som tall i systemene. Datakvalitet er forretningskvalitet.
- **Behovene var på tvers:** risikostyring, kundelønnsomhet, svindeloppdagelse og kundesegmentering krever at konto-, kort-, låne- og kundedata ses samlet. IBM bygde til og med en egen bransjemodell (Banking Data Warehouse) for å «utnytte potensialet i informasjon som tidligere var innelåst i legacy-systemer».
- **Regulering og rapportering** tvang frem historikk og sporbarhet.
- **De hadde råd.** Teradata-prislappen var overkommelig for banker med milliardbalanser – og konkurransefortrinnet var målbart.

Konkret eksempel: **First Interstate Bancorp** (56 mrd. dollar i forvaltningskapital) startet sitt varehusprosjekt allerede rundt 1991 – «two years ago, very few people even knew the term data warehouse», sa teknologidirektøren deres i 1995. Målet: ett felles arkiv med data fra alle bankens applikasjoner, tilgjengelig for markedsføring, økonomi, HR og cash management. Resten av storbankene fulgte etter, «driven by their need for better access to the data that is captive on legacy applications».

## Hva varehuset løste – og det nye problemet

**Løst:** Én integrert sannhet, adskilt fra driften. Historikk (tidsvariant, ikke-flyktig) – du kunne se utvikling over tid. Beslutninger på fakta i stedet for magefølelse.

**Nytt problem:**

- **Dyrt.** Spesialisert maskinvare og lange prosjekter.
- **Tregt å endre.** Skjemaet måtte defineres på forhånd (schema-on-write); en ny kilde eller kolonne tok måneder. IT ble flaskehals.
- **Bare strukturerte data.** Varehuset forsto rader og kolonner – ikke logger, tekst, bilder eller klikkstrømmer.
- Og så kom internett og gjorde alle tre problemene akutte: datamengdene eksploderte forbi hva varehuset kunne håndtere økonomisk.

## Gode formuleringer

- Inmons definisjon: «emneorientert, integrert, tidsvariant, ikke-flyktig – til støtte for beslutninger».
- «Dataene var innelåst i driftssystemene» – uttrekk-anarkiet ga sprikende tall i ledermøtet.
- «Penger er data» – derfor var bankene først.
- Devlin om Teradata-kostnadene: «eye-watering».
