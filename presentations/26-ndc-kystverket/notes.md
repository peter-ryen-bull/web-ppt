# Speaker notes – 100 millioner rader om dagen (NDC 2026)

Alt før første `## slide-id`-overskrift ignoreres, så dette området kan brukes
til kladd og huskelapper.

Disposisjon: trigger → hvem er Kystverket → generelt om dataplattform
(inkl. governance) → Azure + Databricks → strømmen på 100 mill rader/dag
(serverless) → modellene oppå (MarTraf og MarU) → veien videre.

Tall fra research (research/generelt-kystverket/):
- ~90 basestasjoner, 4 operative AIS-satellitter (AISSat-4 opp mars 2026)
- 2 mrd AIS-meldinger i 2006 → 8,9 mrd i 2021, data lagret tilbake til 2006
- Åpne data under NLOD, sanntid via BarentsWatch API og rå TCP-strøm

Formuleringer fra research (research/generell-dataplattform/):
- Verbrekka alle definisjonene lander på: hente inn, lagre, transformere,
  dele – og styre
- «Et datavarehus leverer rapporter, en dataplattform muliggjør kontinuerlig
  verdiskaping med data» (Bouvet)
- «De fleste dataplattformer feiler ikke av tekniske årsaker. De feiler
  organisatorisk.» (Bouvet)
- «Du kan kjøpe inn den beste teknologien, og lage den beste arkitekturen,
  og fortsatt ha de samme utfordringene.» (Glitni)
- «Governance is not just software. It's rather a combination of software,
  processes, principles, and people.» (Vazquez)
- Uber-historien: klarte seg fint med databaser og skript – helt til veksten
  gjorde siloene til et hinder (Ahmed)
- Puslespill-analogien: hver bit er informasjon om virksomheten, plattformen
  samler bitene (Bouvet)

## trigger – Vi live-tracker alle skip

Gå rett på: vi live-tracker alle skip i norske farvann.
Ikke si hvem «vi» er ennå – la det henge litt.

## nais – NAIS – sanntidsbildet

Vis kartet: dette er norskekysten akkurat nå. Hver prikk er et fartøy.
NAIS er åpent for alle – nais.kystverket.no. Prøv gjerne selv i pausen.

## hundre-millioner – 100 000 000 rader hver dag

Tallet bak kartet: 100 millioner rader med posisjonsdata gjennom systemet
vårt – hver eneste dag. Det er strømmen resten av foredraget handler om.

## forside – Forside

Nå kan du «zoome ut»: velkommen, dette er historien om dataplattformen bak
sjøveien. Presenter deg kort.

## om-peter – Peter Bull

Dataplattformutvikler i Miles.
Bygger dataplattform for Kystverket – erfaring fra offentlig og privat sektor.
Azure- og Databricks-ekspert.

## kystverket – Kystverket – tar ansvar for sjøveien

Hvem er «vi»? Kystverket – transportetaten for sjøveien.
Visjon: utvikle kysten og havområdene til verdens sikreste og reneste.

## kystverket-fakta – Transportetaten for sjøveien

Todelt samfunnsoppdrag: sikker og effektiv ferdsel + nasjonal beredskap mot
akutt forurensning.
Konkret: fyr og merker, lostjeneste, sjøtrafikksentraler (VTS).
Og så infrastrukturen bak triggeren: ~90 AIS-basestasjoner og 4 egne
satellitter. AIS-data lagret helt tilbake til 2006.

## ais – Hva er AIS?

AIS = Automatic Identification System.
Skip kringkaster MMSI, posisjon, fart og kurs over VHF – fra hvert par
sekunder til noen minutter, avhengig av fart.
Laget som antikollisjonssystem, i dag ryggraden i overvåking, beredskap og
statistikk. Veksten: 2 mrd meldinger i 2006 → 8,9 mrd i 2021.

## hva-er – Hva er en dataplattform

Kapittelskifte: før vi dykker i strømmen – hva er egentlig en dataplattform?
Grunnmur-bildet: plattformen er grunnmuren i en datadrevet virksomhet.
Ingen bygger hus for grunnmurens skyld – men uten den står ingenting støtt.

God hook her: Uber i 2014. Noen terabyte spredt over MySQL og Postgres,
ingeniørene skrev skript som kombinerte kildene – og det funket helt fint.
Så eksploderte veksten, og de frakoblede siloene ble et hinder for alt de
ville gjøre med dataene. Løsningen ble én samlet plattform.
Poenget: du trenger ikke dataplattform fra dag én. Men fra en viss
datamengde finnes det ikke noe alternativ – og med 100 millioner rader om
dagen passerte Kystverket den grensen for lengst.

## hvorfor – Dataplattformer i hverdagen

Publikum bruker dataplattformer hver dag uten å tenke over det:
nettbutikken som foreslår varer som passer, strømmetjenesten som treffer
med anbefalinger, taxien som gir fastpris på forhånd og velger raskeste vei
i rushen, flyprisen som balanserer kapasitet, lønnsomhet og
kjøpssannsynlighet – på under et sekund.
Uten en plattform som henter inn, lagrer, prosesserer og leverer data blir
alle disse tjenestene vanskelige å realisere.
Og NAIS-kartet fra åpningen? Akkurat samme historie – bare for sjøveien.

## dataflyt – Dataflyt: kilder til konsumenter

Det store bildet først: data flyter fra kildene (driftssystemer, API-er,
filer, sensorer) inn i plattformen – og ut til konsumentene (apper,
dashbord, ML). Plattformen er ett felles sannhetslag i midten.
Siloene er fienden: verdifull informasjon ligger spredt i systemer som ikke
snakker sammen, og plattformens jobb nummer én er å samle den.
Godt bilde: et enormt puslespill der hver bit er informasjon om
virksomheten – salgstall, kundedata, sensordata. Plattformen er bordet der
bitene legges sammen til ett bilde.

## arkitektur – Arkitektur: kilde til konsument

Så åpner vi boksen: lagring (lakehouse) → transformering → eksponering.
Tre byggeklosser, uansett hvilken teknologi du velger:
lagring (billig, skalerbar objektlagring – frikoblet fra prosessering),
prosessering (batch og sanntid med samme motor) og katalog/governance på
tvers av alt.
Pek spesielt på governance-laget som ligger under alt – uten det får man
ikke trygg selvbetjening, bare uoversikt og økt risiko. Det kommer vi
tilbake til.

## samle-data – Samle data fra kildesystemer

Essensen i én setning: samle data fra kildesystemer, analysere den – og dele
videre. Alle definisjonene i bransjen lander på den samme verbrekka:
hente inn, lagre, transformere, dele – og styre tilgangen underveis.
Plattformen er et middel, aldri målet: verdien ligger i beslutningene,
automatiseringen og innsikten den muliggjør.
For Kystverket: AIS inn, innsikt og åpne data ut.

## batch-streaming – Batch eller streaming?

Kapittelskifte: to måter å flytte data inn i plattformen på – i bolker eller fortløpende.

## batch-vs-streaming – Batch vs. streaming – flyt

Pek på animasjonen: batch samler opp og flytter med faste intervaller, streaming sender hver hendelse med en gang den skjer.
Poeng: forskjellen handler ikke om teknologi, men om hvor ferske dataene må være.

## batch-streaming-valg – Når velger du hva?

Batch: rapporter, historikk og store volumer – billig og robust.
Streaming: overvåkning, varsling og hendelsesdrevet automatisering.
I praksis bruker de fleste plattformer begge – start med batch, legg til streaming der det gir verdi.

## mer-enn-varehus – Mer enn et datavarehus

Vanlig innvending: «har vi ikke dette allerede? Vi har jo et datavarehus.»
Datavarehuset er ofte én del av bildet: strukturerte data og sentraliserte
rapporteringsløp. En moderne plattform støtter flere datatyper, flere
brukergrupper, mer selvbetjening og distribuert eierskap.
Spissformuleringen (fritt etter Bouvet): et datavarehus leverer rapporter,
en dataplattform muliggjør kontinuerlig verdiskaping med data.
Hos oss: samme plattform serverer dashbordet, API-ene og ML-modellene –
fra de samme tabellene.

## dataprodukt – Dataprodukt

Data som produkt: kvalitetssikret, forvaltet og dokumentert – og med en
tydelig eier. Ikke bare en tabell noen dumpet et sted og glemte.
Et godt dataprodukt svarer på tre spørsmål: hva betyr feltene, hvor ferske
er dataene, og hvem svarer når noe ser rart ut?
AIS-tracks er et dataprodukt: definert innhold, kjent kvalitet – og
konsumentene kan bruke det uten å spørre oss først. Det er selvbetjening.

## dataprodukt-anatomi – Mer enn en tabell

Venstre side: en fil noen dumpet i en bucket. Dataene kan være helt riktige –
men ingen tør bruke dem. Hva betyr feltene? Hvor ferske er de? Hvem svarer
når noe ser rart ut? En fil i en bucket er ikke et produkt.
Høyre side: nøyaktig samme data, pakket med dokumentasjon, tydelig eier,
kvalitetstester, ferskhets-SLA, kontrakt og tilgang via API/SQL/BI.
Analogi: løse ingredienser vs. måltidskasse – tabellen er ingrediensen,
dataproduktet er retten.
Og motsatt grøft: ikke alt skal være produkt. Når alt er produkt, er
ingenting produkt. Filteret: deles det utenfor teamet, og er en feil dyr
nok til at det er verdt å forvalte over tid?

## datakontrakt – Datakontrakt: et API for data

Tenk API – men for data. Kontrakten er et dokument både mennesker og
maskiner kan lese: skjema, gyldige verdier, ferskhet, eierskap og vilkår.
Mer enn et skjema: skjemaet sier at fart er et tall – kontrakten sier
0–60 knop, ferskere enn 5 minutter, og hvem du vekker når det ryker.
Kontrakten er toveis: produsenten forplikter seg, konsumentene vet hva de
kan stole på.
Koblingen til forrige slide: dataproduktet er systemet – kontrakten er
grensesnittspesifikasjonen for datasettet det leverer.

## datakontrakt-brudd – Kontrakten stopper feilen tidlig

Klassikeren: ELT rett fra produksjonsdatabasen gjør databaseskjemaet til et
ufrivillig API. Utvikleren endrer en kolonne og aner ikke at noen der nede
er avhengige av den – ingen varsler, fordi ingen vet at det trengs et.
Øverst: endringen sklir stille gjennom, dashbordet knekker, og feilen
oppdages uker senere – nedstrøms, av feil folk.
Nederst: samme endring møter kontraktsjekken i pull requesten og stoppes
før den når produksjon. Kontrakten er ikke bare dokumentasjon – den testes.
Kjernesetningen: et stille brudd nedstrøms blir en høylytt, tidlig feil.
(Kontrakten håndheves også i strømmen og på hviledata – kvalitetstestene
kan genereres rett fra kontrakten.)

## governance – Governance: kontrakter, eierskap, katalog

Governance er ikke byråkrati – det er det som gjør at åpne data kan deles
trygt: datakontrakter, dataeierskap, datakatalog.
Og governance er ikke bare programvare: det er programvare, prosesser,
prinsipper og folk.
Spørsmålene governance skal svare på: hvem har tilgang? Hvem hadde tilgang,
og når? Hvor ligger dataene? Når slettes de?
Sentraliser logging, audits og rapportering ett sted.
Hos oss: Unity Catalog. (Personvernfiltrene i AIS – fiskefartøy under 15 m,
fritidsbåter under 45 m – er governance i praksis.)
Uten god governance får man ikke innovasjon – man får uoversikt og risiko.

## feiler-organisatorisk – Plattformer feiler organisatorisk

Den ubehagelige sannheten fra bransjen: de fleste dataplattformer feiler
ikke av tekniske årsaker. Du kan kjøpe den beste teknologien og tegne den
fineste arkitekturen – og fortsatt ha nøyaktig de samme utfordringene.
Typiske årsaker: plattformen behandles som et IT-prosjekt, ingen har ansvar
for verdiskapingen, forretningen tar ikke eierskap til egne data, og
kompetansebygging undervurderes.
En plattform krever nye arbeidsformer og en annen samhandling mellom IT og
fag. Derfor neste slide: roller før teknologi.

## roller – Tydelige roller

Fire roller rundt plattformen: plattform, engineers/analytikere, governance
og BI-/konsumbrukere. Tydelig ansvar før teknologi.
Skiftet som må til: fra at data er noe IT håndterer, til at data er en
naturlig del av fagansvaret. Når fagsiden eier egne data, blir dataene
bedre, mer relevante – og faktisk brukt.
Sluttpoeng for kapittelet: verdien oppstår når teknologi, organisering og
ansvar trekker i samme retning.

## effekter – Effekter av dataplattform

Kapittelskifte: hvilke effekter gir en dataplattform?

## effekt-1 – Kvalitet

Effekt 1 – kvalitet: data du kan stole på.
Kvalitetskrav ligger i kontrakten og måles automatisk.

## effekt-2 – Etterlevelse

Effekt 2 – etterlevelse: compliance bygget inn.
GDPR, sletting, tilgangsstyring og loggføring løses ett sted – ikke i hvert system.

## effekt-3 – Effektivitet

Effekt 3 – effektivitet: mindre manuelt arbeid, mer automatisering.
Slutt på bestilte uttrekk og manuelle rapporter.

## effekt-4 – Fremtidsrettet

Effekt 4 – fremtidsrettet: KI integrert i dataflyten.
En god plattform er forutsetningen for å lykkes med AI.

## azure-databricks – Azure + Databricks

Kapittelskifte: verktøykassa vår.

## azure – Azure – fundamentet

Azure er fundamentet: lagring, nettverk og identitet som byggeklosser.
Sikkerhet og tilgangsstyring fra dag én.
Alt er infrastruktur som kode – plattformen kan gjenskapes fra repoet.

## databricks – Databricks – motoren

Databricks oppå Azure: lakehouse – datalake og datavarehus i ett.
Én motor (Spark) for både batch og streaming – samme kode, samme tabeller.
Unity Catalog gir tilgangsstyring, lineage og katalog – governance-laget fra
i sted, i praksis.

## strommen – 100 millioner rader. Hver dag.

Tilbake til triggeren – nå skal vi se hvordan det faktisk funker.

## regnestykke – Regnestykket

100 mill rader/dag ≈ 1 200 rader i sekundet, døgnet rundt.
36,5 milliarder rader i året.
Hvert punkt: hvor et skip er, hvor fort det går og hvor det skal.

## pipeline – Fra antenne til innsikt

Flyten: AIS-nettverket (basestasjoner + satellitter) → strømmende innlesing
→ lakehouse med bronse/sølv/gull i Delta-tabeller → deling via API-er,
dashbord og analyse.
Bronse = rå meldinger, sølv = vasket og dedupliseret, gull = tracks og
aggregater klare til bruk.

## serverless – Databricks serverless

Poenget som gjør dette mulig med et lite team: serverless.
Ingen klynger å starte, patche eller skalere.
Kapasiteten følger strømmen – trafikktopper og stille netter.
Vi betaler for det vi bruker, ikke det vi frykter vi trenger.

## stordata-volum – Strømmen er liten. Historikken er stor.

<!-- TODO Peter: fyll inn volumtallene i VOLUM-konstanten i stordata.tsx:
     GB per døgn for 100 mill rader, TB per år, og total historikk fra 2006. -->

Poenget: å ta imot strømmen er ikke det tunge – 1 200 rader i sekundet er
småtteri. Det tunge er historikken.
Vi snakker flere terabyte med AIS-data tilbake til 2006.
Og den historikken må vi kjøre gjennom på nytt hver gang en modell endrer seg –
ny MarU-versjon, ny utslippsfaktor, en feil vi fant i vaskingen.

## stordata-compute – Døgn med kjøretid – eller timer?

På klassisk compute setter du størrelsen på klyngen før jobben starter. En full
reprosessering av historikken kan da bruke flere døgn, og har du flere slike
jobber, står de i kø.
Med autoskalering følger kapasiteten datamengden i jobben: den skalerer opp der
det er mye å gjøre, og ned igjen etterpå.
Viktig nyanse å si høyt: regningen blir omtrent den samme – du betaler for
arbeidet, ikke for tiden. Forskjellen er at du får svaret i dag i stedet for på
fredag.

## hais – HAIS – historisk uttrekk på bestilling

Konkret eksempel: HAIS (hais.kystverket.no). Der kan hvem som helst bestille
inntil ett år med historiske AIS-data – filtrert på tidsrom, geografisk område
(WKT-polygon), skipstype eller enkeltfartøy. Det setter i gang en uttrekksjobb
som leser gjennom historikken, og resultatet leveres som GeoParquet eller CSV
på e-post.
Poenget: vi vet ikke på forhånd om neste bestilling er ett fartøy i én uke
eller alle skip i ett år. Det er nettopp derfor serverless passer – jobben
bestemmer størrelsen, ikke vi.

## modeller – Fra posisjoner til utslipp

Kapittelskifte: nå har vi strømmen. Hva bruker vi den til?
To modeller oppå plattformen: MarTraf (maritim trafikkmodell) og MarU
(maritim utslippsmodell).
Kort: MarTraf gjør posisjoner om til seilaser, MarU gjør seilaser om til
utslipp.

## modell-flyt – Fire moduler, ikke én modell

Flyten: AIS-rådata → MarTraf → MarU → statistikk og klimaregnskap.
Arkitekturpoenget: forgjengeren Havbase gjorde «alt» i samme modell. MarU er
delt i fire frikoblede moduler – AIS-prosessering, skipsregister, geografi og
utslippsberegning. Hver modul har sitt ansvar og sitt output.
Koble tilbake til dataprodukt-kapittelet: dette er den tenkingen i praksis.
Bonus: Havbase var utviklet og driftet av en ekstern partner. MarU er
Kystverkets grep for å eie forutsetningene og beregningene selv.

## martraf – Maritim trafikkmodell – MarTraf

MarTraf = AIS-prosesseringsmodulen. Databricks, PySpark.
Statiske meldinger (MMSI, navn, dimensjoner) versjoneres og slås sammen med
skipsregisteret. Dynamiske meldinger (fart, kurs) vaskes for uteliggere.
Fem berikelsessteg:
1. Geografi på: havner (UN/LOCODE), kystkontur, ankringsområder,
   oljeinstallasjoner, oppdrettslokaliteter.
2. Operasjonsfase – elleve faser, regler på avstand og fart. Eksempel som
   fungerer godt muntlig: et offshorefartøy i dynamisk posisjonering ved en
   plattform bruker mye energi. Samme fartøy i tørrdokk med AIS-en på bruker
   nesten ingen. Uten fase blir begge «et stillestående skip».
3. Seilassegmenter – «underway» = glidende snittfart over 0,3 knop. Ingen
   segmenter kortere enn fem minutter, ellers lager fartsfluktuasjoner rundt
   terskelen hundrevis av meningsløse segmenter.
4. Komplette seilaser havn til havn. Segment regnes som «stoppet» hvis over
   50 % av tiden er ved kai. Håndterer datatap underveis.
5. Trafikktype: berthed, innenriks, til/fra utlandet, gjennomfart.

## martraf-valg – Valgene som gjør det mulig

To valg verdt å dvele ved for et utviklerpublikum.
Full oppløsning: ingen nedsampling før prosessering. Begrunnelsen er god –
nedsampler du først, risikerer du å beholde støyen og kaste gyldige punkter.
De har regnekraften, så de bruker den.
H3-indeksering: innebygde geospatial-funksjoner i Databricks. Romlige joins
blir raske, men du får ikke geodesisk avstand – to punkter er enten i samme
hexagon eller N celler unna. På oppløsning 8 er «én celle unna» rundt
1 100 meter fra sentrum, i praksis 600–1 600 avhengig av hvor i hexagonet du
står.
Poenget: presisjonstapet er bevisst akseptert. Modellen trenger bare å vite
innenfor eller utenfor en terskel, ikke hvilket objekt som er nærmest.
Godt eksempel på at ytelse er et gyldig arkitekturkriterium.

## maru – Maritim utslippsmodell – MarU

MarU: bottom-up utslippsmodell, metodikk fra IMOs fjerde klimagasstudie
(2020) og ICCT. Python/PySpark, åpen kildekode.
Kjernen er enkel nok å si høyt: lastfaktor er fart over grunn delt på
servicefart, i tredje potens. Propellloven. Ganges med installert effekt,
0,85 og tiden siden forrige AIS-punkt.
Her er den viktige setningen: **hvert AIS-punkt blir en utslippsberegning.**
Det er derfor 100 millioner rader om dagen ikke er skryt – det er en
konsekvens av metoden.
Rundt 330 inputvariabler: utslippsfaktorer, lavlastjusteringer,
svovelgrenser per utslippskontrollsone, GWP-faktorer.
Hjelpemotorer og kjeler regnes per operasjonsfase – derfor trengte vi
fasene fra MarTraf.

## maru-hull – Maskinlæring som datakvalitetsverktøy

Den ærlige delen: registerdataene er hullete, særlig for små fartøy.
Først medianverdier per skipstype og lengdeintervall, med minst seks
observasjoner per gruppe.
Så nevrale nett (Keras/TensorFlow) for servicefart, turtall og slagtype.
Turtall har egendefinert tapsfunksjon på relativ feil, for å ikke overfitte
på høyturtallsmotorer.
Tallet som overrasker: rundt 70 % av fartøyene i norske farvann i 2022–2023
manglet drivstofftype i registrene.
Poenget: ML brukes her som datakvalitetsverktøy, ikke som AI-feature.
Og alt er åpent – hele beregningen ligger på github.com/Kystverket/maru.

## maru-ut – Hva kommer ut?

Utslipp: CO2 og CO2-ekvivalenter, metan, N2O, CO, NOx, SOx, PM10, PM2.5,
NMVOC og black carbon. Pluss energibehov, drivstofforbruk, distanse,
driftstimer og antall fartøy.
Fordelt på 14 skipstyper og 9 størrelseskategorier – de under 5 000 GT er
splittet finere enn før, fordi norske farvann har mange små fartøy.
Geografisk: kommune, fylke (Svalbard som eget), forvaltningsplanområder,
økonomisk sone, sokkelen.
Konkret eksempel som treffer: hvor mye CO2 slipper de største cruiseskipene
ut i Geiranger i juli mens de ligger i ro?
Og landstrøm – som Havbase ikke hadde med i det hele tatt.
Sluttpoenget: Miljødirektoratet legger opp til å bruke MarU-tallene i
klimaregnskapet for kommunene. Plattformen ender i offisiell statistikk.

## maru-hvorfor – Hvorfor ikke bare salgstall?

SSB regner utslipp fra innenriks sjøfart og fiske fra salgstall hos
drivstoffomsetterne. Det beskriver forbrent solgt drivstoff godt – men ikke
utslipp i norske farvann.
Svakhetene: fartøy bunkrer i utlandet og seiler her, og fartøy bunkrer her og
seiler ut.
MarU snur det: estimer fra observert aktivitet, og skill innenriks fra
til/fra utlandet og gjennomfart.
Avslutt kapittelet med 2016-historien: tidsserien starter i 2016, ikke fordi
dataene mangler før det, men fordi vi bygde ut mange nye basestasjoner i
2015. Bedre dekning ville gitt kunstig vekst i utslippene.
Godt poeng: en endring i innsamlingen forplanter seg helt ut i statistikken.
Derfor trenger du metadata og datakontrakter – ikke bare tall.

## veien-videre – Veien videre

Kapittelskifte: hva vil vi få til videre med plattformen?
Først: hvor vi står i dag – og hvor vi skal.

## hvor-vi-er – Hvor vi er: én kilde, én katalogstruktur

Ærlig status: i dag har vi «kun» AIS. Én kilde, ett domene.
Katalogstrukturen er klassisk medallion: tre kataloger i Unity Catalog –
bronze (rå meldinger), silver (vasket og beriket), gold (tracks, seilaser,
utslipp – klare til bruk).
Klikk: dataproduktene vi leverer i dag kommer alle ut av gold – AIS-tracks,
MarTraf, MarU og HAIS.
Klikk: dette fungerer fint så lenge alt er AIS. Men i løpet av neste år
kommer flere domener inn – toll, HR og økonomi, prediktivt vedlikehold av
fyrtårn. Da holder ikke én felles bronze/silver/gold: hvem eier hva, hvem
betaler, hvem svarer? Det krever strengere struktur – og en del omskriving.

## hvor-vi-skal – Hvor vi skal: domenekataloger og dataprodukter

Venstre side: én katalog per domene – toll, ais, hr_og_okonomi,
prediktivt_vedlikehold_fyrtaarn. Hvert domene har sin egen bronze/silver/
gold inni, sitt eget team, eget kostnadssenter og eget forvaltningsansvar.
Klikk: når et domene vil dele noe, skriver det en datakontrakt – Open Data
Contract Standard, en YAML-fil med id, eier, skjema og kvalitetskrav.
Kontrakten eies av domenet, ikke av plattformteamet.
Klikk: kontrakten pushes til ett sentralt repo. Pull request, CI validerer
kontrakten mot gold-tabellen den peker på.
Klikk: og så det som gjør at dette skalerer – CI oppretter automatisk et view
i den sentrale «dataprodukter»-katalogen. Ingen manuell bestilling, ingen
kopiering av data: viewet peker rett på domenets gold-tabell.
Klikk: samme mønster for alle domener. Konsumentene trenger bare å kjenne én
katalog – dataprodukter – uansett hvor mange domener som ligger bak.
Klikk: oppsummert – data delt på domener, med tydelig eierskap, tydelig
kostnadssenter og tydelig forvaltningsansvar.
Koble tilbake: dette er datakontrakt- og governance-kapittelet fra tidligere,
satt i system.

## domene-effekt – Tydelig eierskap, kostnad og forvaltning

Tre ting vi får med domenekataloger:
Eierskap – domenet eier dataene sine og kontrakten som beskriver dem. Ikke
«IT».
Kostnadssenter – hver katalog har egen lagring og egen regning. Vi kan
faktisk svare på hva toll-dataene koster.
Forvaltningsansvar – det er tydelig hvem som svarer når noe ryker, og hvem
som må varsle når kontrakten endres.
Klikk: og for konsumentene endrer ingenting seg – dataproduktene finner du
fortsatt på ett sted.

## videre-liste – Dette vil vi få til

Flere kilder inn: SafeSeaNet (anløpsmeldinger), losdata og geodata.
Dataprodukter med datakontrakter – maskinlesbare avtaler.
Sanntidsvarsling for beredskap og miljø.
ML: ankomstprediksjon og avviksdeteksjon på AIS-strømmen.
Og: enda mer åpne data – til utviklerne i salen (NLOD, BarentsWatch API,
rå TCP-strøm).
Avslutt her: takk for oppmerksomheten – spørsmål, og kontaktinfo.
