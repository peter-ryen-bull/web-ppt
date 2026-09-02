# Glitni om dataplattform

Kilde: https://glitni.no/fagartikler/hva-er-en-dataplattform/ («Dataplattform | En guide til dataplattformer», Magne Bakkeli, 28.08.2022)

Glitni beskriver seg som «konsulentene som får dataene dine til å glitre» og jobber med data- og AI-plattformer og data engineering.

## Hoveddefinisjonen

Dette er den mest komplette definisjonen blant de norske kildene:

> «En dataplattform er tjenester som lar virksomheter samle og tilgjengeliggjøre data fra mange ulike kilder på ett og samme sted, gi de en sammenheng slik at de blir meningsfulle, riktige og forståelige, og sørger for at det er mulig å hente ut verdi gjennom ulike former for datadrevne initiativ.»

Fulgt av en enklere omformulering, et godt grep for lesbarhet:

> «Sagt med andre ord: en dataplattform er en samling teknologier som henter inn, transformerer, sammenstiller og leverer data til brukere, applikasjoner eller annen anvendelse som maskinlæringsalgoritmer eller løsninger som kombinerer data med kunstig intelligens.»

Legg merke til verbrekka som går igjen hos Glitni: **hente inn, lagre, prosessere og levere**. Fire verb som oppsummerer hele plattformen.

## Hvorfor trenger du en dataplattform?

Glitnis pedagogiske grep: de starter med datadrevne tjenester alle kjenner fra hverdagen, og viser at en dataplattform ligger bak:

- Nettbutikken som foreslår varer som passer dine behov
- Detaljhandelskjeden som forutser etterspørsel og justerer bemanning og varebeholdning etter sesong, vær og lokale forhold
- Streamingtjenesten med personlige anbefalinger
- Taxien der prisen oppgis på forhånd og raskeste vei velges, også i rushtiden
- Produkt- og kundelønnsomhet på jobb, og raske beslutninger om hvilke kunder som bør få ekstra oppmerksomhet

Konklusjonen deres:

> «Uten en dataplattform som henter inn, lagrer, prosesserer og leverer data vil alle disse tjenestene bli vanskelig å realisere.»

## Flypris-eksemplet (gjennomarbeidet case)

Godt eksempel på å gjøre det abstrakte håndfast, samme grep som kommune-eksemplet i vår artikkel 01:

> «For et flyselskap vil dette si å kombinere data fra kunderegistre, websider, mobilapper, bookingsystemer, ordresystemer, m.m. for å systematisere informasjon om kundens betalingsvillighet, andre kunders betalingsvillighet, flyets fyllingsgrad, konkurrentpriser, setets lønnsomhet, m.m. i en løsning som på mindre enn et sekund klarer å foreslå en pris på et tilleggsprodukt som balanserer kapasitet, lønnsomhet og sannsynlighet for kjøp.»

Poenget etterpå: slike løsninger krever sammenstilling av store datamengder, algoritmer som kan videreutvikles, og infrastruktur som responderer hurtig. «Dataplattformen gjør det mulig å aksessere, styre, levere og sikre data på en konsistent måte.»

## Hva en dataplattform bidrar med (kapabiliteter)

- Redusere datasiloene gjennom å samle data, beskrivelser og definisjoner ett sted
- Skalere opp og ned: datavolum, datatyper, dataprodukter og brukere
- Behandle alle typer data uten å skape konkurrerende datasiloer eller ekstra belastning på operative systemer
- Levere data raskt til interne brukere, leverandører og kunder gjennom datastrømming
- Bedre kontroll: håndheve tilgangsstyring og datasikkerhet
- Bedre datakvalitet: overvåke og forbedre kvaliteten fra kilde til bruk, dokumentere sentrale begreper og nøkkeltall ett sted
- Støtte utviklings- og produksjonsmiljøer for AI (maskinlæring, LLM)

## Gevinster (skilles tydelig fra kapabiliteter)

Godt strukturelt grep: de skiller mellom hva plattformen *kan* (kapabiliteter) og hva den *gir* (gevinster). Gevinstene:

> «En investering i en dataplattform i dag, kan bety store avkastning over tid gjennom sparte kostnader, økte inntekter, mer handlingsrom og redusert risiko.»

- Datakultur gjennom selvbetjening: «enkelt for alle å ta i bruk data», fakta og underlag til beslutninger
- Redusere manuelt arbeid ved å automatisere datatilrettelegging, så analytikerne bruker tiden på å tolke resultater
- Automatisere forretningsprosesser med forretningsregler eller algoritmer (eksempel: avslag på lånesøknad)
- Bedre brukeropplevelser, tjenester og produkter

## Det viktigste avsnittet: teknologi løser ikke alt

Dette er kanskje den beste formuleringen i hele artikkelen, rettet mot dem som allerede har en plattform:

> «Ingen av symptomene lar seg enkelt løse med en dataplattform alene. Du kan kjøpe inn den beste teknologien, og lage den beste arkitekturen, og fortsatt ha de samme utfordringene. En dataplattform, bygget riktig, kan likevel være en muliggjører for å få til mer helhetlige endringer.»

Symptomene de nevner: use case som ikke leveres, ustabilitet, høy andel forvaltning mot nyutvikling, lite kontroll på data governance. Løsningen ligger også i leveransemodell, kompetanse, prosesser og dataeierskap.

## Historisk utvikling (nyttig for å forklare «moderne» dataplattform)

> «Inntil for få år siden besto en dataplattform av et integrasjonsverktøy som hentet en begrenset mengde strukturerte data hver natt, en database/datavarehus og et rapporteringsverktøy på toppen. Nå har vi mer sofistikerte muligheter hvor vi eksempelvis kan hente data kontinuerlig i tilnærmet sanntid og lagre alle typer data mer effektivt i ulike lagringstjenester.»

Artikkelen er del av en serie som også dekker database, data lake, datavarehus og data lakehouse som alternative fundament for plattformen.

## Observasjoner

- Glitni er de eneste av de tre norske som gir en formell definisjon i sitatform, og de omformulerer den med «sagt med andre ord». Godt grep.
- Balansen deres: teknisk presis, men alle eksempler er forretningsnære.
- De adresserer eksplisitt leseren som allerede har en plattform, et smart grep for å treffe flere segmenter.
