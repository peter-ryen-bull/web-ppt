# MarTraf og MarU – modellene oppå AIS-strømmen

Research gjort mot kystverket.no, GitHub og metodedokumentet for MarU (rev. 0) i september 2026.

Kilder:

- https://www.kystverket.no/klima-og-barekraft/maru/
- https://github.com/Kystverket/maru
- https://www.kystverket.no/sjotransport-og-havn/status/status-2024/status-2024-kystverkets-modell-for-estimering-av-maritime-utslipp--maru/
- https://www.kystverket.no/nyheter/2023/ny-modell-beregner-utslipp-fra-sjofarten/
- Metodedokument: `method-description-maru_rev.0.pdf` (kystverket.no/contentassets/b89ed30e45a5488189612722f8239a1a/)

## Kortversjonen

AIS-strømmen er råvaren. Oppå den ligger to modeller:

1. **MarTraf** (maritim trafikkmodell) – Kystverkets AIS-prosesseringsmodul. Vasker og beriker
   posisjonsdata til noe analyserbart: operasjonsfaser, seilassegmenter, komplette seilaser
   havn-til-havn og trafikktyper.
2. **MarU** (maritim utslippsmodell) – bottom-up utslippsmodell som bruker MarTraf-dataen til å
   regne ut energibehov, drivstofforbruk og utslipp per fartøy, per AIS-punkt.

Poenget arkitektonisk: der de gamle modellene (Havbase, Marine Emissions) gjorde «alt» i samme
modell, er MarU delt i fire frikoblede moduler – AIS-prosessering (MarTraf), skipsregister,
geografi og selve utslippsberegningen (MarU). Klassisk dataprodukt-tenking: hver modul har sitt
ansvar og sitt output som andre kan bygge på.

## MarTraf – maritim trafikkmodell

Kjører på Databricks, skrevet i PySpark. Bruker H3 geospatial-funksjoner (innebygd i Databricks
runtime fra 11.2) til romlige joins, fordi ytelse var viktigste kriterium.

Statiske og dynamiske AIS-meldinger behandles hver for seg:

- **Dynamiske meldinger** (fart, kurs, heading) vaskes for uteliggere. Kjøres i **full oppløsning**
  – ingen nedsampling, «made possible due to availability of computing power». Begrunnelsen er god:
  nedsampling risikerer å beholde støy og kaste gyldige data.
- **Statiske meldinger** (MMSI, IMO, navn, skipstype, dimensjoner) versjoneres før de slås sammen
  med skipsregisterdata.

### De fem berikelsesstegene (Figur 2 i metodedokumentet)

1. **Geografisk berikelse** – punkter og polygoner joines på med H3. Kilder: UN/LOCODE (havner),
   kystkontur (Kartverket), oljeinstallasjoner (Sokkeldirektoratet), ankringsområder (Kystverket),
   New ShipRep / SafeSeaNet Norway (havner, kaier, losbordingspunkter), oppdrettslokaliteter
   (Fiskeridirektoratet), økonomiske soner og havområdegrenser.
2. **Operasjonsfase** – elleve faser, tildelt via regler på avstand (i antall H3-hexagoner) og fart.
   Eksempler: `ved oppdrettsanlegg` (brønnbåt, ≤1 hexagon, <1 knop), `i node` (ved kai – tre
   varianter for Norge / Europa / resten av verden), `dynamisk posisjonering` (offshorefartøy nær
   oljeinstallasjon, ≤0,5 knop – eller opptil 1,5 knop hvis navigasjonsstatus er «begrenset
   manøvreringsevne»), `fiske`, `ankring`, `manøvrering` (≤3 knop), `cruising` (>3 knop, default),
   `landstrøm` (havneligge >2 timer nær landstrømanlegg – denne siste ligger faktisk i MarU).
3. **Seilassegmenter** – sekvenser av AIS-punkter der fartøyet er konsistent «underway» eller ikke.
   «Underway» = glidende gjennomsnittsfart over 0,3 knop. To viktige regler mot støy: ingen
   segmenter kortere enn 5 minutter, og nytt segment ved lange hull i AIS-signalet.
4. **Komplette seilaser havn-til-havn** – segmenter samles til sail-ID-er. Et segment regnes som
   «Is stopped» hvis mer enn 50 % av tiden er i node-fase. Håndterer datatap: mister du signalet
   rundt havn B, blir det en seilas fra A til siste punkt før tapet, og en ny fra neste punkt til C.
5. **Trafikktype** – `Berthed`, `Domestic` (første og siste land er Norge/Svalbard),
   `International out`, `International in`, `Transit`.

### H3-detaljen som er verdt å nevne

H3-joins er raske, men gir ikke geodesiske avstander – to punkter er enten i samme hexagon eller
N celler unna. Ved oppløsning 8 tilsvarer «én celle unna» ca. 1 100 m fra sentrum, men i praksis
varierer det fra ca. 600 til 1 600 m avhengig av hvor i hexagonet punktet ligger. Presisjonstapet
er akseptert bevisst: modellen trenger bare å vite om et punkt er innenfor eller utenfor en terskel,
ikke hvilket objekt som er nærmest.

## MarU – maritim utslippsmodell

Bottom-up-modell basert på metodikk fra IMOs **fjerde GHG-studie (2020)** og **ICCT**. Skrevet i
Python/PySpark, kildekoden er åpen på GitHub (`Kystverket/maru`).

Inputmoduler: AIS-data fra MarTraf, skipsregister (S&P Global / IHS Markit, ShipInfo, SafeSeaNet,
NOR- og NIS-registrene), geografi, og ca. **330 utslippsspesifikke inputvariabler** (utslippsfaktorer,
lavlast-justeringer, svovelgrenser per ECA, GWP-faktorer).

### Kjerneregnestykket

Lastfaktor fra «propellloven»:

```
Load factor = (speed over ground / service speed) ^ 3
Energy demand [kWh] = Load factor * Installed power [kW] * 0,85 * operasjonstid / 3600
```

Operasjonstiden er tiden fra forrige AIS-punkt. Altså: **hvert AIS-punkt blir en utslippsberegning.**
Det er her volumet blir interessant – 100 millioner rader inn per døgn.

Drivstofforbruk via lastavhengig SFC:

```
SFC_load = SFC_baseline * (0,455 * LF² − 0,71 * LF + 1,28)
```

Hjelpemotorer og kjeler regnes fra en inputtabell per operasjonsfase (tabell 17 i IMO-studien),
med noen verdier justert etter data Enova har samlet gjennom støtteordningene sine.

### ML for å fylle hull i skipsregisteret

Verdt en egen setning i presentasjonen: registerdataene er hullete, særlig for små fartøy.

- Manglende verdier fylles først med medianverdier for finkornede grupper (StatCode4+ og
  lengdeintervaller), med minst seks observasjoner per gruppe.
- Tre attributter estimeres med **nevrale nett (Keras/TensorFlow)**: slagtype, servicefart og RPM.
  RPM bruker en egendefinert tapsfunksjon på relativ feil for å ikke overfitte på høyturtallsmotorer.
- **Drivstofftype**: ca. 70 % av fartøyene som seilte i norske farvann i 2022–2023 manglet
  drivstofftype i registrene. Fylles etter samme metode som IMOs fjerde GHG-studie – vanligste type
  for tilsvarende skipstype og størrelse.
- Fartøy uten gyldig lengde eller skipstype (statcode5) faller ut av beregningen.

### Hva kommer ut

- Utslipp: CO2, CO2-ekvivalenter, CH4, N2O, CO, NOx, SOx, PM10, PM2.5, NMVOC, black carbon
- Energibehov, drivstofforbruk, tilbakelagt distanse, driftstimer, antall fartøy
- Estimat for bruk av landstrøm og batterielektriske fartøy
- Fordelt på 14 skipstyper og 9 størrelseskategorier (nye, mindre kategorier under 5 000 GT, siden
  norske farvann har mange små fartøy)
- Geografisk: kommune, fylke (Svalbard som eget «fylke»), forvaltningsplanområder, norsk økonomisk
  sone, kontinentalsokkelen, ECA-områder
- Trafikktype, operasjonsfase, flaggstat, aggregert per måned og år

### Hvorfor dette er en bedre kilde enn salgstall

SSB rapporterer utslipp fra innenriks sjøfart og fiske basert på salgstall fra drivstoffomsetterne.
Svakhetene: fartøy kan bunkre i utlandet, og fartøy som bunkrer i Norge kan seile ut av norske
farvann. MarU estimerer i stedet fra **observert aktivitet**, og skiller innenriks, til/fra utlandet
og gjennomfart.

Havbase (forgjengeren, i drift siden 2012) var utviklet og driftet av en ekstern partner, bygget på
metodikk for store globale flåter, og tok ikke hensyn til landstrøm. MarU er Kystverkets grep for å
eie forutsetningene og beregningene selv. **Miljødirektoratet legger opp til å bruke MarU-data i
klimaregnskapet for kommunene.**

Tidsserien starter i **2016** – ikke fordi dataene mangler før det, men fordi Kystverket bygget ut
mange nye basestasjoner gjennom 2015. Bedre dekning ville gitt kunstig vekst i utslippsestimatene.
Et fint konkret eksempel på at endringer i innsamlingen forplanter seg til tallene.

## Vinkler til presentasjonen

1. **Modularisering som poeng**: Havbase gjorde alt i én modell. MarU er delt i fire moduler med
   hvert sitt ansvar – det er dataprodukt-tenkingen fra tidligere i foredraget, i praksis.
2. **Full oppløsning fordi vi har regnekraft**: bevisst valg om å ikke nedsample, fordi støyfjerning
   på nedsamplede data kaster babyen ut med badevannet.
3. **Hvert AIS-punkt = en utslippsberegning**: kobler direkte tilbake til «100 millioner rader om
   dagen». Volumet er ikke selvskryt, det er en konsekvens av metoden.
4. **ML som datakvalitetsverktøy**, ikke som «AI-feature»: nevrale nett brukes til å imputere
   manglende registerdata.
5. **2016-grensen**: bedre datainnsamling kan ødelegge en tidsserie. Godt eksempel på metadata og
   datakontrakt-tenking.
6. **Åpen kildekode**: github.com/Kystverket/maru – hele modellen kan leses av publikum i salen.
