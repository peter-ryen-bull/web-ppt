# Speaker notes: 100 millioner rader om dagen (NDC 2026, 60 min)

Alt før første `## slide-id`-overskrift ignoreres. Dette området er kladd.

### Den røde tråden

Én setning som alt skal henge på:

> Ett AIS-signal utenfor Stad klokka 03:14 blir, via plattformen, til
> klimaregnskapet i en kommune. Og det er derfor vi bygger dataplattform.

Skipet utenfor Stad er karakteren vår. Vi møter det i åpningen, følger det
gjennom MarTraf og MarU, og kommer tilbake til det helt til slutt. Hver gang du
kan si «skipet vårt», si det. Publikum skal kjenne det igjen.

### Dramaturgi og tidsplan

| Akt | Start | Innhold |
| --- | --- | --- |
| 1 Åpningen | 00:00 | scene, signal, NAIS, 100 mill, forside, Peter |
| 2 Hvem lytter | 05:00 | Kystverket, visjonen, oppdraget, lyttepostene, AIS |
| 3 Hvorfor plattform | 12:00 | Uber, hverdagen, byggeklosser, kontrakter, folk |
| 4 Hva får du igjen | 27:00 | fire effekter med eksempler fra sjøveien |
| 5 Prosjektet | 32:00 | dag én, verktøykassa, terraform, ingest, strømmen, historikken |
| 6 Modellene | 43:00 | følg ett skip, MarTraf, propellloven, MarU |
| 7 Veien videre | 53:00 | domener, kontrakter, tilbake til Stad, takk |

Ligger du etter ved 27:00, kutt batch/streaming-kapittelet (tre slides, ca.
fire minutter). Ligger du etter ved 43:00, kutt martraf-valg og maru-hull.

### Regler for språket i notatene

Muntlig. Du og vi. Korte setninger innimellom. Spør publikum. Ingen
tankestreker. Si det slik du ville sagt det til en kollega over en kaffe.

### Tall fra research

- ~90 basestasjoner, 4 operative AIS-satellitter (AISSat-4 opp mars 2026, ca. 15 MNOK)
- 2 mrd AIS-meldinger i 2006, 8,9 mrd i 2021, data lagret tilbake til 2006
- Åpne data under NLOD, sanntid via BarentsWatch API og rå TCP-strøm
- AIS-intervall: skip i fart 0 til 14 knop sender hvert 10. sekund
- 100 mill rader/dag ≈ 1 157 per sekund. Lest én per sekund tar ett døgns data 3,2 år.
- Propellloven: (2)³ = 8. Dobbel fart, åtte ganger effekten.

## scene – Klokka er 03:14

[00:00] Ikke si hei. Ikke si takk for invitasjonen. Gå rett inn i scenen. Rolig
tempo, la hver linje lande.

Klokka er 03:14.

Klikk. Vi er på Stadhavet. Det er februar. Det blåser nordvest kuling, og det
er helt mørkt. Ikke mørkt som i Oslo om natta. Mørkt som i ingen lys noe sted.

Klikk. Der ute går det et lasteskip nordover. Ni knop. Tjue mennesker om bord,
de fleste sover. Én står på brua med en kaffekopp og ser på radaren.

Klikk. Og mens han står der, skjer det noe han ikke tenker på. Noe skipet gjør
helt av seg selv.

## signal – Hvert tiende sekund sier skipet

Hvert tiende sekund sender skipet en liten melding ut i mørket.

Klikk. Og meldingen er egentlig ganske enkel. Den sier: hvem jeg er. Hvor jeg
er. Hvor fort jeg går. Hvor jeg skal. Og hva jeg holder på med akkurat nå.
Fem ting. Det er alt.

Klikk. Ingen om bord tenker på det. Det er ingen som trykker på en knapp.
Meldingen bare går. Over VHF, ut i kulingen, i alle retninger.

Og så er spørsmålet: hører noen på?

## nais – Noen lytter: NAIS

Ja. Noen lytter.

Dette er norskekysten. Akkurat nå. Hver eneste prikk på dette kartet er et
skip som sender akkurat den meldingen jeg viste dere. Hver prikk er et
mannskap. Noen av dem er ferjer med folk på vei til jobb. Noen er fiskebåter.
Noen er cruiseskip med tre tusen passasjerer.

Klikk. Og dette kartet er åpent. nais.kystverket.no. Du kan åpne det på
mobilen nå, og se skipet ditt gå forbi. Prøv gjerne i pausen.

Men her kommer det jeg egentlig vil snakke om. Se på tallet bak dette kartet.

## hundre-millioner – 100 000 000 hver dag

Hundre millioner.

Klikk. Så mange slike meldinger går gjennom systemet vårt. Hver eneste dag.

La det synke litt. Hundre millioner er et tall vi sier fort, men det er
vanskelig å kjenne på. Så la meg prøve å gi dere et bilde.

Klikk. Tenk deg at du skulle lese dem. Én melding i sekundet. Ikke sove, ikke
spise, bare lese. Da ville du brukt over tre år på én dags data. Og når du var
ferdig, hadde det kommet tre nye år med lesing for hver dag du hadde brukt.

Det er strømmen dette foredraget handler om. Og spørsmålet er egentlig ganske
enkelt: hvordan gjør du hundre millioner små meldinger om til noe noen kan
bruke?

## forside – Forside

Nå kan du puste ut og zoome ut. Velkommen. Dette er historien om
dataplattformen bak sjøveien.

Og jeg lover dere én ting: dette er ikke et foredrag om Databricks-features.
Det er en historie om hvorfor en etat som driver med fyr og lykter og los
plutselig sto med en av de største datastrømmene i norsk offentlig sektor,
og hva vi gjorde med den.

Vi skal begynne med det store hvorfor-et. Så skal vi snakke om hvorfor alle
bygger dataplattform nå. Og så skal vi tilbake til skipet vårt utenfor Stad og
følge det hele veien inn i et klimaregnskap.

## om-peter – Peter Bull

Kort. Publikum kom for historien, ikke for CV-en.

Jeg heter Peter. Klikk. Jeg er dataplattformutvikler i Miles.

Klikk. Jeg bygger dataplattformen til Kystverket. Før det har jeg bygget for
både private og offentlige aktører, og det jeg har lært er at problemene er
overraskende like. Det er bare dataene som bytter navn.

Klikk. Og jeg jobber i Azure og Databricks hver dag, så det er der eksemplene
kommer fra. Men poengene gjelder uansett hva dere bruker.

## kystverket – Hvem lytter? Kystverket

[05:00] Så. Hvem er det som lytter på skipet vårt?

Kystverket. Transportetaten for sjøveien. De fleste kjenner dem for fyrene.
Men fyrene er bare den synlige delen.

Og før vi går inn i teknologien, må vi forstå hvorfor de gjør det de gjør. For
det er hvorfor-et som forklarer alle valgene etterpå.

## visjon – Verdens sikreste og reneste kyst

Dette er visjonen til Kystverket. Verdens sikreste og reneste kyst.

Ikke «god sjøsikkerhet». Ikke «effektiv forvaltning». Verdens sikreste og
reneste kyst.

Klikk. Og jeg vil at dere skal holde fast i den setningen gjennom hele
foredraget. For når vi snakker om Delta-tabeller og serverless og
datakontrakter om en halvtime, så er det fortsatt denne setningen vi jobber
for. Alt det andre er hvordan.

## oppdrag – Ett oppdrag, to halvdeler

Oppdraget har to halvdeler.

Klikk. Den første er trygg og effektiv ferdsel. Det er fyrene og lyktene og
sjømerkene. Det er lostjenesten, altså kjentmannen som går om bord på de store
skipene og hjelper dem inn. Og det er sjøtrafikksentralene, som sitter og ser
på trafikken døgnet rundt, akkurat som flygeledere, bare for skip.

Klikk. Den andre halvdelen er beredskap mot akutt forurensning. Når et skip
går på grunn og det lekker olje. Da er det Kystverket som leder aksjonen. De
har depoter med lenser langs hele kysten, og nødhavner som er vurdert på
forhånd, så man ikke må begynne å lete når det først går galt.

Klikk. Og her er det jeg vil at dere skal se: begge halvdelene starter med
nøyaktig samme spørsmål. Hvor er skipene akkurat nå? Skal du hindre en
kollisjon, må du vite hvor skipene er. Skal du lede en oljevernaksjon, må du
vite hvilke skip som er i nærheten og kan hjelpe. Alt begynner med posisjonen.

## lyttepostene – Lyttepostene

Så hvordan hører man et skip som snakker over VHF ute på Stadhavet klokka tre
om natta?

Klikk. Man bygger lytteposter. Rundt nitti basestasjoner, langs hele kysten og
på Svalbard. De hører alt fra land og førti til seksti nautiske mil ut.

Klikk. Men havet er større enn det. Så i 2010 gjorde Kystverket noe litt
uvanlig for en transportetat. De skjøt opp en satellitt. AISSat-1. I dag har
Norge fire av dem som lytter på skip fra verdensrommet. Den siste gikk opp i
mars i år, og den ble bygget for rundt femten millioner kroner. Det er mindre
enn mange IT-prosjekter jeg har vært innom.

Klikk. Og resultatet er denne kurven. I 2006 hørte de to milliarder meldinger
på et år. I 2021 var det 8,9 milliarder. Bedre lytteposter, flere skip, og
flere skip med AIS.

Klikk. Og alt er lagret. Helt tilbake til 2006. Tenk på det. Tjue år med
hvert eneste skip som har sagt hvor det er, hvert tiende sekund. Det er et
arkiv over hele den norske sjøveien.

## ais – AIS: laget for å ikke kollidere

Litt om hva AIS faktisk er, for det forklarer noe viktig senere.

Klikk. AIS står for Automatic Identification System. Skip kringkaster
identitet, posisjon, fart og kurs over VHF. Og poenget var aldri at noen på
land skulle lytte. Poenget var at skipene rundt skulle høre det. Så to skip i
tåke vet om hverandre før de ser hverandre.

Klikk. Hvor ofte de sender, avhenger av hva de gjør. Et skip i fart sender
hvert par sekund til hvert tiende sekund. Et skip som ligger til kai sender
hvert tredje minutt. Det høres ut som en detalj. Det er det ikke. Det er
grunnen til at dataene våre er ujevne, og det kommer vi tilbake til.

Klikk. Og så er det den interessante delen. Ingen planla at AIS skulle bli
en datakilde. Det var et antikollisjonssystem. Men fordi alle skip sender, og
fordi noen begynte å lytte og lagre, ble det ryggraden i trafikkovervåking,
beredskap og statistikk. Det er et mønster dere kommer til å kjenne igjen. De
beste datakildene er sjelden laget for å være datakilder.

## sporsmalet – Hva gjør du med 8,9 milliarder meldinger?

Så la oss stoppe her et øyeblikk.

Du er Kystverket. Du har bygget lytteposter langs hele kysten og skutt opp
satellitter. Du har 8,9 milliarder meldinger i året, og tjue år med
historikk.

Klikk. Hva gjør du med dem?

For det er her det blir vanskelig. Å samle inn data er den enkle delen. Det
er å gjøre dem om til noe noen kan bruke som er vanskelig. Og det er ikke bare
Kystverket som sitter med det spørsmålet. Det er hele bransjen.

## hva-er – Hvorfor bygger alle dataplattform?

[12:00] Kapittelskifte. Nå skal vi zoome ut fra sjøveien en stund.

For dere har sikkert merket det. Alle bygger dataplattform nå. Kommuner,
banker, butikkjeder, oljeselskaper. Alle har et prosjekt som heter noe med
«plattform». Hvorfor det? Er det bare fordi det er moderne?

Jeg vil begynne med en historie, for jeg tror den forklarer det bedre enn
noen definisjon.

## uber – Uber, 2014

Uber, 2014.

Klikk. På den tiden hadde Uber noen terabyte med data. Fordelt på noen MySQL-
og Postgres-databaser. Og når noen trengte å kombinere data fra to steder, så
skrev en ingeniør et skript. Det funket. Helt fint, faktisk. Ingen satt og
tenkte «vi trenger en plattform».

Klikk. Så eksploderte selskapet. Nye byer hver uke. Og plutselig hadde hvert
team sin egen database, sitt eget skript, sin egen versjon av sannheten. Spør
du «hvor mange turer kjørte vi i går», så fikk du fire forskjellige svar.
Kjenner dere igjen det?

Klikk. Og det var vendepunktet. Siloene sto i veien for alt de ville gjøre
med dataene. Ikke litt i veien. I veien for alt. Svaret ble én felles
plattform. Og legg merke til: ikke fordi noen leste en artikkel om at det var
lurt. Av ren nødvendighet.

Klikk. Og det er egentlig hele poenget. Du trenger ikke dataplattform fra dag
én. Uber klarte seg fint uten. Men fra en viss datamengde finnes det ikke noe
alternativ. Og med hundre millioner rader om dagen passerte Kystverket den
grensen for lenge siden.

## hvorfor – Du brukte fire dataplattformer i dag

Og det er faktisk sånn at dere brukte flere dataplattformer bare på veien hit
i dag. Uten å tenke på det.

Klikk. Nettbutikken som foreslår varer som faktisk passer. Klikk.
Strømmetjenesten som treffer med anbefalingen på kvelden. Klikk. Taxien som
gir deg fastpris før du setter deg inn, og som velger raskeste vei i rushen.
Klikk. Flyprisen som settes på under et sekund, basert på kapasitet,
lønnsomhet og hvor sannsynlig det er at akkurat du kjøper.

Klikk. Bak hver eneste av disse er det en plattform som henter inn, lagrer,
prosesserer og leverer data. Uten den finnes ikke tjenesten.

Og NAIS-kartet fra åpningen? Det er nøyaktig samme historie. Bare for
sjøveien.

## dataflyt – Dataflyt: kilder til konsumenter

Så hva er en dataplattform, egentlig? La oss ta det store bildet først.

Pek på venstre side. Her er kildene. Driftssystemer, API-er, filer, sensorer.
Hos oss: AIS-antennene. Pek på høyre side. Her er de som skal bruke dataene.
Apper, dashbord, maskinlæringsmodeller, analytikere.

Og i midten ligger plattformen. Ett felles lag der alt samles og blir til én
sannhet.

Jeg liker å tenke på det som et puslespill. Hver bit er en liten
informasjonsbit om virksomheten. Salgstall, sensordata, posisjoner. Hver for
seg sier bitene nesten ingenting. Plattformen er bordet der du legger dem
sammen til ett bilde. Uten bordet har du bare en haug med biter i forskjellige
esker.

## arkitektur – Arkitektur: kilde til konsument

Så åpner vi boksen i midten.

Uansett hvilken teknologi du velger, så består plattformen av tre
byggeklosser. Lagring, som i dag betyr billig, skalerbar objektlagring som er
frikoblet fra regnekraften. Prosessering, altså det som transformerer rådata
til noe brukbart, både i batch og i sanntid. Og så det laget som ligger under
alt: katalog og governance.

Pek på det nederste laget. Det er det laget folk glemmer. Alle vil ha lagring
og prosessering. Men uten katalog og tilgangsstyring får du ikke trygg
selvbetjening. Du får uoversikt. Og det laget kommer vi tilbake til om litt,
for det er der plattformer faktisk vinner eller taper.

## samle-data – Samle, analysere, dele

Hvis du skal huske én setning om hva en dataplattform gjør, så er det denne.

Samle data fra kildesystemer. Klikk. Analysere den, og dele den videre.

Klikk. Alle definisjonene i bransjen lander på samme verbrekke. Hente inn.
Lagre. Transformere. Dele. Og styre tilgangen underveis.

Og legg merke til det siste verbet. Styre. Det er der de fleste glipper.

For Kystverket betyr dette: AIS inn, innsikt og åpne data ut. Så enkelt og så
vanskelig er det.

## batch-streaming – Batch eller streaming?

Lite sidespor, men et viktig et. For det er et valg dere kommer til å måtte
ta.

Det finnes to måter å flytte data inn i en plattform på. I bolker, eller
fortløpende. Batch eller streaming.

## batch-vs-streaming – Batch vs. streaming: flyt

Se på animasjonen. Øverst samler batch opp data og flytter dem med faste
intervaller. En gang i timen, en gang i natta. Nederst sender streaming hver
hendelse videre i det øyeblikket den skjer.

Og her er poenget mange bommer på: forskjellen handler ikke om teknologi.
Den handler om hvor ferske dataene må være. Trenger sjøtrafikksentralen å vite
hvor skipet er nå? Ja, det er streaming. Trenger klimaregnskapet å vite hvor
skipet var i fjor? Det kan gjerne kjøre om natta.

## batch-streaming-valg – Når velger du hva?

Så når velger du hva?

Klikk gjennom batch-punktene. Batch passer for rapporter og historiske
analyser. For store volumer, fordi det er billig. Og for kilder som uansett
kommer i bolker, som en nattlig eksport fra et gammelt system.

Klikk gjennom streaming-punktene. Streaming passer når du faktisk må reagere
nå. Overvåking og varsling. Hendelsesdrevet automatisering. Og når ferskhet er
viktigere enn kostnad.

Klikk. Og i praksis trenger du som regel begge. Mitt råd: start med batch. Det
er enklere og billigere. Legg til streaming der ferske data faktisk endrer en
beslutning. Ikke fordi det er kult.

Hos oss kommer AIS-strømmen inn fortløpende. Men mye av det vi bygger oppå
kjører i batch. Begge deler, i samme plattform.

## mer-enn-varehus – Mer enn et datavarehus

Og nå kommer innvendingen jeg alltid får. «Har vi ikke dette allerede? Vi har
jo et datavarehus.»

Jo. Og datavarehuset er ofte én del av bildet. Strukturerte data,
sentraliserte rapporter. Det er bra.

Et datavarehus leverer rapporter. Klikk. En dataplattform skaper verdi.
Klikk. Kontinuerlig, ikke bare til månedsrapporten.

Forskjellen i praksis: en moderne plattform tåler flere typer data, flere
typer brukere, mer selvbetjening og at eierskapet er spredt rundt i
organisasjonen. Hos oss serverer samme plattform dashbordet, API-ene og
ML-modellene. Fra de samme tabellene. Det gjør ikke et klassisk datavarehus.

## dataprodukt – Dataprodukt

Neste begrep, og dette er et av de viktigste: dataprodukt.

Tanken er at data skal behandles som et produkt. Kvalitetssikret. Forvaltet.
Dokumentert. Og med en eier som faktisk svarer når du ringer.

Ikke en tabell noen dumpet et sted og glemte.

## dataprodukt-anatomi – Mer enn en tabell

La meg vise hva jeg mener.

Pek på venstre side. Her er en fil noen har lagt i en bucket. Dataene i den
kan være helt riktige. Men ingen tør bruke dem. Hva betyr feltene? Hvor
ferske er de? Hvem spør jeg når noe ser rart ut? Har dere vært der? Jeg har
vært der mange ganger. En fil i en bucket er ikke et produkt. Det er en
gjenstand.

Pek på høyre side. Nøyaktig samme data. Men pakket med dokumentasjon, en
tydelig eier, kvalitetstester, en avtale om hvor ferske de skal være, og
tilgang via API, SQL eller BI. Nå tør folk bruke det.

Tenk på forskjellen mellom løse ingredienser og en måltidskasse. Tabellen er
ingrediensen. Dataproduktet er retten, med oppskrift og alt.

Og så én advarsel. Ikke alt skal være produkt. Når alt er produkt, er
ingenting produkt. Filteret jeg bruker: deles det utenfor teamet? Og er en
feil dyr nok til at det er verdt å forvalte det over tid? Hvis ja på begge, da
er det et produkt.

## datakontrakt – Datakontrakt: et API for data

Og hvordan beskriver du et dataprodukt? Med en datakontrakt.

Dere er utviklere. Dere vet hva et API er. Tenk API, men for data. Kontrakten
er et dokument som både mennesker og maskiner kan lese. Skjema, gyldige
verdier, ferskhet, eierskap, vilkår.

Og den er mer enn et skjema. Skjemaet sier at fart er et tall. Kontrakten
sier: null til seksti knop, ferskere enn fem minutter, og her er hvem du
vekker når det ryker.

Kontrakten går begge veier. Produsenten forplikter seg til noe. Konsumentene
vet hva de kan stole på. Det er hele forskjellen mellom «jeg tror den
kolonnen er i knop» og «jeg vet det».

## datakontrakt-brudd – Kontrakten stopper feilen tidlig

Og her er hvorfor det er verdt bryet.

Klassikeren. Noen kobler seg rett på produksjonsdatabasen og laster data
derfra. Nå har databaseskjemaet blitt et API, uten at noen bestemte det.
Utvikleren endrer en kolonne. Hun aner ikke at noen der nede er avhengige av
den. Og ingen varsler, fordi ingen vet at det trengs et varsel.

Pek øverst. Endringen sklir stille gjennom. Dashbordet knekker. Og feilen
oppdages tre uker senere, nedstrøms, av feil folk. Som regel av noen som
skulle bruke tallet i et møte.

Pek nederst. Samme endring. Men nå møter den kontraktsjekken i pull requesten,
og stoppes før den når produksjon. Kontrakten er ikke bare dokumentasjon. Den
testes.

Setningen jeg vil at dere skal ta med: et stille brudd nedstrøms blir en
høylytt, tidlig feil. Og høylytte, tidlige feil er de billigste feilene som
finnes.

## governance – Governance: kontrakter, eierskap, katalog

Så var det ordet alle hater. Governance.

Jeg vet. Det høres ut som byråkrati. Men hør her: governance er det som gjør
at vi tør å dele data. Det er ikke bremsen. Det er bremsene som gjør at du
tør å kjøre fort.

Tre ting: datakontrakter, dataeierskap, datakatalog. Klikk. Og så
sentralisert logging, audit og rapportering. Ett sted, ikke i hvert system.

Spørsmålene governance skal svare på er egentlig enkle. Hvem har tilgang? Hvem
hadde tilgang, og når? Hvor ligger dataene? Når slettes de?

Konkret hos oss: fiskefartøy under femten meter og fritidsbåter under
førtifem meter skal ikke ut i de åpne dataene. Det er personvern. Og det
filteret ligger ett sted i plattformen, ikke i hvert eneste system som bruker
dataene. Det er governance i praksis.

Klikk. Og verktøyet vårt for dette heter Unity Catalog. Mer om det senere.

## feiler-organisatorisk – Plattformer feiler på mennesker

Nå kommer den ubehagelige delen.

Dataplattformer feiler sjelden på teknologi. Klikk. De feiler på mennesker.

Du kan kjøpe den beste teknologien. Du kan tegne den fineste arkitekturen.
Og du kan fortsatt sitte med nøyaktig de samme problemene som før.

Hvorfor? Fordi plattformen blir behandlet som et IT-prosjekt. Ingen har
ansvar for at det faktisk skapes verdi. Fagsiden tar ikke eierskap til sine
egne data. Og kompetansebygging blir undervurdert.

En plattform er en ny måte å jobbe på. Den krever at IT og fag snakker
sammen på en annen måte enn før. Derfor neste slide.

## roller – Tydelige roller

Roller før teknologi.

Klikk. Noen må eie plattformen. Klikk. Noen må bygge på den, engineers og
analytikere. Klikk. Noen må ha ansvar for governance. Klikk. Og så er det de
som faktisk skal bruke det som kommer ut, BI-folk og konsumenter.

Det avgjørende skiftet er dette: fra at data er noe IT håndterer, til at data
er en naturlig del av fagansvaret. Når losene eier losdataene, og
beredskapsfolkene eier beredskapsdataene, da blir dataene bedre. Mer
relevante. Og, viktigst av alt, faktisk brukt.

Verdien oppstår når teknologi, organisering og ansvar trekker i samme retning.
Det er slutten på teori-delen. Nå skal vi se hva du får igjen.

## effekter – Hva får du igjen?

[27:00] Kapittelskifte. Hva får du egentlig igjen for alt dette?

Jeg skal gi dere fire effekter. Og jeg skal ikke gi dere dem som
PowerPoint-punkter. Jeg skal gi dere ett konkret eksempel fra sjøveien for
hver.

## effekt-1 – Effekt 1: Kvalitet

Én. Kvalitet. Data du tør å ta beslutninger på.

Klikk. Her er eksempelet. Utslippstallene våre starter i 2016. Ikke fordi vi
mangler data før det. Vi har jo alt tilbake til 2006. Men i 2015 bygde
Kystverket ut mange nye basestasjoner. Bedre dekning. Flere skip hørt.

Og hva hadde skjedd om vi startet tidsserien i 2014? Det hadde sett ut som
utslippene eksploderte i 2015. Men det var ikke skipene som endret seg. Det
var ørene våre.

Den kunnskapen ligger i plattformen. I metadata, i dokumentasjonen av
datasettet. Ikke i hodet på én person som kanskje slutter neste år.

## effekt-2 – Effekt 2: Etterlevelse

To. Etterlevelse. Reglene bygges inn én gang, ett sted.

Klikk. Personvernfilteret jeg nevnte. Fiskefartøy under femten meter,
fritidsbåter under førtifem meter. Det er folks arbeidsplass og folks
fritidsbåt, og det skal ikke ut i det åpne.

Uten plattform måtte hvert eneste system som brukte AIS-data huske den
regelen selv. NAIS, HAIS, API-ene, utslippsmodellen. Fire steder å glippe.
Med plattform ligger filteret ett sted, og alle nedstrøms får det gratis.

## effekt-3 – Effekt 3: Effektivitet

Tre. Effektivitet. Selvbetjening i stedet for bestilling.

Klikk. Slik var det før: du sendte en e-post til en analytiker. «Kan jeg få
AIS-data for Oslofjorden i mars?» Og så ventet du. Analytikeren hadde tjue
slike i innboksen.

Slik er det nå: du går til hais.kystverket.no. Du tegner et område i kartet,
velger tidsrom og skipstype, og trykker bestill. Så leser plattformen gjennom
historikken og sender deg en Parquet-fil på e-post. Ingen mennesker i
loopen. Analytikeren gjør analyse i stedet for uttrekk.

## effekt-4 – Effekt 4: Fremtidsrettet

Fire. Fremtidsrettet. KI der dataene allerede bor.

Klikk. Alle snakker om AI. Men AI trenger data, og dataene må være et sted.
Hos oss bruker utslippsmodellen nevrale nett til å fylle hull i
skipsregisteret. Og det interessante er ikke modellen. Det interessante er
hvor den kjører. På samme plattform som dataene. Med samme tilgangsstyring.
Ingen kopierer data ut til en laptop eller et sideprosjekt.

En god plattform er forutsetningen for å lykkes med AI. Ikke omvendt.

## prosjekt – Historien om prosjektet

[32:00] Så. Nå har dere teorien. La oss gå tilbake til skipet vårt og fortelle
hvordan det faktisk ble gjort.

Dette er historien om prosjektet. Fra én kilde til en plattform.

## dag-en – Dag én

<!-- TODO Peter: legg inn årstall for oppstart og faktisk teamstørrelse hvis du vil. -->

Dag én. Hva hadde vi?

Klikk. Én kilde. AIS. Ikke noe annet. Ingen HR-data, ingen økonomi, ingen
losdata. Bare posisjoner.

Klikk. Ett lite team. Som også skulle sove om natta. Det er viktig, og dere
skal se hvorfor om et par slides.

Klikk. Og én strøm. Som aldri stopper. Ikke i jula. Ikke i kuling. Og ikke
når vi deployer. Skipene bryr seg ikke om release-planen vår. Meldingene
kommer uansett, hvert tiende sekund, fra hver eneste prikk på kartet.

Så det første valget var: hva bygger vi på?

## azure-databricks – Azure + Databricks

Verktøykassa vi valgte. Azure og Databricks.

To ting, veldig kort, for dette er ikke et salgsforedrag. Men dere skal
forstå hvorfor det passet.

## azure – Azure: grunnmuren

Azure er grunnmuren.

Klikk. Lagring, nettverk og identitet som ferdige byggeklosser. Klikk.
Sikkerhet, tilgangsstyring og kostnadskontroll fra dag én, ikke som noe vi
skrur på etterpå.

Klikk. Og alt er infrastruktur som kode. Hele plattformen kan gjenskapes fra
repoet. Det høres selvsagt ut for dere, men i offentlig sektor er det
fortsatt ikke det.

Klikk. Og så det viktigste: Azure er kjedelig med vilje. Grunnmurer skal
være kjedelige. Du vil ikke ha en spennende grunnmur.

## databricks – Databricks: motoren

Databricks er motoren oppå.

Klikk. Det de kaller lakehouse. Datasjø og datavarehus i ett. Billig lagring
av rådata, og samtidig tabeller du kan kjøre SQL mot.

Klikk. Én motor, Spark, for både batch og streaming. Samme kode, samme
tabeller. Husker dere batch-eller-streaming-spørsmålet? Her slipper vi å
velge én. Vi bruker begge, i samme verktøy.

Klikk. Og Unity Catalog. Det er governance-laget fra i sted, i praksis.
Tilgangsstyring, lineage, katalog. Alt vi snakket om under governance bor
her.

Så. Hvordan deployer vi det? For det er én ting å velge Azure og Databricks.
En annen ting er å tørre å endre det.

## terraform – Vi klikker ikke. Vi committer.

Vi klikker ikke i portalen. Vi committer.

Husker dere setningen på Azure-sliden? Alt er infrastruktur som kode. Hele
plattformen kan gjenskapes fra repoet. Nå viser jeg hvordan.

Klikk. En endring starter som en pull request. Den ligger i git. Klikk.
Pipelinen kjører terraform plan. Alle kan se hva som faktisk skjer før det
skjer. Klikk. Merge, så apply. Da blir det virkelighet.

Klikk. Terraform beskriver Azure og Databricks. Ned til kataloger og
storage-containere. Ikke bare det store. Også bøttene dataene lander i.

Og poenget, som vi sa i sted: hele plattformen kan gjenskapes fra repoet.
Også om noen sletter den. Det er en forsikring. Ikke et slogan.

## fire-states – Fire states. Fire pipelines.

Vi har ikke én Terraform-state. Vi har fire.

Hvorfor? Fordi én stor state er én stor blast radius. En feil i lagring
skal ikke rive ned katalogen. En endring i workspace skal ikke røre
konto-nivået.

Klikk. Workspace. Databricks-arbeidsområdet. Det teamet logger inn i.

Klikk. Storage accounts. Lagring og containere. Inkludert raw. Der dataene
lander før Databricks ser dem. Husk det ordet. Raw. Vi kommer tilbake til
det om to slides.

Klikk. Unity Catalog. Katalogene og tilgangsstyringen. Governance som kode.

Klikk. Databricks-account. Konto-nivå. Identitet, grupper, det som ligger
over workspace.

Klikk. Fire states. Fire pipelines. En endring i lagring river ikke ned
katalogen. Det er hele poenget med å splitte.

## terraform-dabs – Infrastruktur og logikk. To verktøy.

Og så er det ett skille til. Som er like viktig.

Terraform eier infrastrukturen. Databricks Asset Bundles, DABs, eier
logikken.

Klikk. Terraform: workspaces, lagring, containere. Unity Catalog, ned til
katalog. Det deployer vi når plattformen endrer seg. Sjelden. Bevisst.

Klikk. DABs: schemas, tabeller, jobs. Det deployer vi når koden endrer seg.
Ofte. Som det skal.

Klikk. Skillet er bevisst. Infrastrukturen skal være kjedelig. Logikken
skal kunne endres ofte. Hvis dere tar med dere én setning fra de tre
siste slidene, ta den.

## ingest – Innlesingen skjer utenfor Databricks.

Så. Dataene. Hvor kommer de inn?

Innlesingen skjer utenfor Databricks. Databricks eier ikke antennen. Den
eier det som kommer etter raw.

Klikk. Vi bruker Prefect. Et Python-bibliotek for å orkestrere jobber.
Ikke Databricks-jobs. Vanlige Python-jobber.

Klikk. Jobbene henter data og dumper den i storage. I raw. Ferdig. I
containerne Terraform nettopp laget.

Klikk. Databricks leser derfra. Plattformen begynner når filen ligger der.
Ikke når skipet sender. Det er et bevisst kutt. Ingest er ett ansvar.
Lakehouse er et annet.

## ingest-flyt – Hente. Dumpe. Så lakehouse.

Slik ser det ut.

Klikk. Kildene. AIS, og det andre vi henter. Klikk. Prefect. Python-jobber,
utenfor Databricks. Klikk. Inn i storage, i raw. Containere Terraform har
laget. Klikk. Databricks leser raw og skriver bronze.

Klikk. To ansvar. Prefect får dataen inn. Databricks gjør den til noe noen
kan bruke. Hvis dere blander de to, eier plutselig lakehouset antennen. Det
vil dere ikke.

## strommen – 100 millioner rader. Hver dag.

Så. Tilbake til tallet.

Hundre millioner rader. Klikk. Hver dag.

Nå skal vi faktisk se hvordan det funker.

## regnestykke – Regnestykket

La oss regne litt.

Hundre millioner om dagen er rundt tolv hundre rader i sekundet. Døgnet
rundt. Klikk. Det blir 36,5 milliarder rader i året.

Klikk. Og hver av de radene er ett skip som sier: her er jeg, så fort går
jeg, dit skal jeg. Det er ikke abstrakte rader. Det er skipet vårt utenfor
Stad. Det er ferja til jobb. Det er mennesker.

Jeg sier det fordi det er lett å bli fascinert av volumet og glemme hva som
ligger i det.

## pipeline – Fra antenne til innsikt

Sånn ser flyten ut.

Klikk. AIS-nettverket. Basestasjonene og satellittene. Klikk. Prefect.
Jobbene utenfor Databricks, som dumper til raw. Klikk. Inn i lakehouset, der
vi bruker det klassiske mønsteret: bronse, sølv, gull. Bronse er rå
meldinger, akkurat som de kom. Sølv er vasket og deduplisert. Gull er tracks
og aggregater som er klare til bruk. Klikk. Og ut igjen til API-er, dashbord
og analyse.

Klikk. Og her er setningen som er hele poenget med dette kapittelet: hundre
millioner rader i døgnet, uten at vi drifter en eneste klynge.

Hvordan?

## serverless – Ingen klynger å vekke om natta

Serverless.

Husker dere det lille teamet som skulle sove om natta? Det er her det
kommer inn.

Klikk. Ingen klynger å starte, patche eller skalere. Ingen som får en alarm
klokka fire fordi en node døde. Klikk. Kapasiteten følger strømmen. Det er
mer trafikk om dagen enn om natta, mer om sommeren enn om vinteren, og
plattformen skalerer opp og ned selv.

Klikk. Og vi betaler for det vi bruker. Ikke for det vi frykter vi kommer til
å trenge. Det er en stor forskjell for en offentlig etat med et budsjett.

For et lite team er dette forskjellen på å bygge produkt og å drifte
infrastruktur. Vi valgte produkt.

## stordata-volum – Strømmen er liten, historikken er stor

<!-- TODO Peter: fyll inn volumtallene i VOLUM-konstanten i stordata.tsx:
     GB per døgn for 100 mill rader, TB per år, og total historikk fra 2006. -->

Og nå skal jeg si noe som kanskje overrasker.

Klikk, klikk, klikk gjennom tallene.

Strømmen er ikke det tunge. Tolv hundre rader i sekundet? Det er småtteri.
Det klarer en laptop.

Det tunge er historikken. Tjue år. Flere terabyte med posisjoner.

Klikk. Og her er det som gjør det vanskelig: den historikken må vi kjøre
gjennom på nytt. Ikke én gang. Hver gang noe endrer seg. Ny versjon av
utslippsmodellen. Ny utslippsfaktor. En feil vi fant i vaskingen. Da må alle
tjue årene regnes om.

## stordata-compute – Døgn med kjøretid, eller timer?

Og da blir spørsmålet: hvor lang tid tar det?

Klikk gjennom fast klynge. På klassisk compute bestemmer du størrelsen på
klyngen før jobben starter. En full reprosessering kan bruke flere døgn. Og
har du flere slike jobber, står de i kø. Så du sitter der og venter på
fredag.

Klikk gjennom autoskalering. Med autoskalering følger kapasiteten datamengden
i jobben. Den skalerer opp der det er mye å gjøre, og ned igjen etterpå.
Døgn blir timer, fordi vi kan bruke bredden.

Klikk. Og her er nyansen jeg vil at dere skal ta med: regningen blir omtrent
den samme. Du betaler for arbeidet, ikke for tiden det tar. Forskjellen er at
du får svaret i dag i stedet for på fredag. Og for den som venter på tallet,
er det hele forskjellen.

## hais – HAIS: historisk uttrekk på bestilling

Konkret eksempel på hvorfor dette passer så godt. HAIS.

Klikk. Hvem som helst kan gå til hais.kystverket.no og bestille inntil ett år
med historiske AIS-data. Tidsrom, område som polygon, skipstype eller ett
enkelt fartøy. Klikk. Det starter en jobb som leser gjennom historikken og
filtrerer. Klikk. Og resultatet kommer som GeoParquet eller CSV på e-post.

Klikk. Og her er poenget: vi vet ikke på forhånd hva neste bestilling er. Er
det ett fartøy i én uke? Eller alle skip i ett år? Den første er sekunder. Den
andre er en skikkelig jobb. Med serverless bestemmer jobben størrelsen. Ikke
vi. Vi slipper å gjette.

## modeller – Fra posisjoner til utslipp

[43:00] Kapittelskifte. Nå har vi strømmen. Vi har historikken. Hva bruker vi
den til?

To modeller oppå plattformen. MarTraf, maritim trafikkmodell. Og MarU,
maritim utslippsmodell.

Kortversjonen: MarTraf gjør posisjoner om til seilaser. MarU gjør seilaser om
til utslipp. Og nå skal vi følge skipet vårt gjennom begge.

## modell-flyt – Fire moduler, ikke én modell

Først arkitekturen, kort.

Klikk. AIS-rådata inn. Klikk. MarTraf vasker og beriker. Klikk. MarU regner
energi og utslipp. Klikk. Og ut kommer statistikk og klimaregnskap, fordelt på
kommune, fylke og havområde.

Klikk. Og her er poenget for dere som bygger systemer. Forgjengeren, Havbase,
gjorde alt i én modell. Én stor blackbox. MarU er delt i fire frikoblede
moduler: AIS-prosessering, skipsregister, geografi og utslippsberegning. Hver
modul har sitt ansvar og sitt output som andre kan bygge på.

Kjenner dere igjen det? Det er dataprodukt-tenkingen fra tidligere. I
praksis.

Og en bonus: Havbase var utviklet og driftet av en ekstern partner. MarU er
Kystverkets grep for å eie forutsetningene og beregningene selv.

## folg-ett-skip – Følg ett skip

Nå følger vi skipet vårt.

Klikk. Det ligger til kai i Bergen. Klokka er 22:40. Null knop. AIS-en
sender hvert tredje minutt, for skipet står stille.

Klikk. Så løsner det og manøvrerer ut Byfjorden. Under tre knop. Nå sender
det oftere.

Klikk. Og så setter det kursen nordover. Cruising. Ni knop. Og klokka 03:14
passerer det Stad, i kuling, og sender meldingen vi startet med. Ett punkt
av tusenvis.

Klikk. Utenfor Ålesund er det ikke kaiplass ennå. Så det ankrer. 0,2 knop,
driver litt rundt ankeret.

Klikk. Og klokka 09:15 ligger det til kai i Ålesund.

Klikk. Rundt 3 800 AIS-punkter er blitt én seilas. Havn til havn. Og
hvert punkt har fått en fase. Uten fasene er alt bare «et skip». Med dem vet
vi hva skipet holdt på med i hvert eneste punkt. Og det er forskjellen på
støy og kunnskap.

Hvorfor er fasen så viktig? Et offshorefartøy som holder posisjonen ved en
plattform bruker enormt med energi. Samme fartøy i tørrdokk med AIS-en på
bruker nesten ingenting. Begge står stille. Uten fase ser de like ut.

## martraf – Maritim trafikkmodell: MarTraf

Det er MarTraf som gjør denne jobben. Databricks, PySpark. Fem steg.

Klikk. Geografisk berikelse. Hvert punkt får vite hvor det er i forhold til
havner, kystkontur, ankringsområder og oljeinstallasjoner.

Klikk. Operasjonsfase. Elleve faser, satt med regler på avstand og fart. Det
dere så på forrige slide.

Klikk. Seilassegmenter. Sammenhengende sekvenser der skipet enten er underveis
eller ikke. Og en viktig regel: aldri kortere enn fem minutter. Hvorfor?
Fordi farten flimrer rundt terskelen, og uten den regelen får du hundrevis av
meningsløse småsegmenter.

Klikk. Komplette seilaser, havn til havn. Med håndtering av hull i signalet,
for mister vi skipet i ti minutter, skal det ikke bli to seilaser.

Klikk. Og trafikktype. Innenriks, til eller fra utlandet, eller gjennomfart.
Det blir viktig for klimaregnskapet.

## martraf-valg – Valgene som gjør det mulig

To tekniske valg jeg vil dvele ved, for dere er utviklere.

Klikk. Full oppløsning. Ingen nedsampling før prosessering. Det er fristende å
tynne ut dataene først, for det er jo mye. Men nedsampler du først, risikerer
du å beholde støyen og kaste de gyldige punktene. Vi har regnekraften. Så vi
bruker den.

Klikk. H3-indeksering. Det er innebygde geospatial-funksjoner i Databricks.
Verden deles i heksagoner, og romlige joins blir raske. Men du får ikke
nøyaktig avstand. To punkter er enten i samme heksagon eller N celler unna.
På oppløsning åtte er «én celle unna» rundt elleve hundre meter. I praksis
mellom seks hundre og seksten hundre, avhengig av hvor i heksagonet du står.

Klikk. Og det presisjonstapet er akseptert med åpne øyne. Modellen trenger
bare å vite innenfor eller utenfor en terskel. Ikke hvilket objekt som er
nærmest. Det er et godt eksempel på at ytelse er et gyldig arkitekturkriterium,
så lenge du vet hva du gir opp.

## propellloven – Propellloven

Så kommer vi til utslipp. Og kjernen i hele utslippsmodellen er en ligning
som er enkel nok til å si høyt.

Last er lik fart delt på servicefart, i tredje potens. Propellloven.

Klikk. Og tenk på hva tredje potens betyr. Dobler du farten, åttedobler du
effektbehovet. Åtte ganger. Det er derfor rederiene sakker ned når
drivstoffet blir dyrt. Det er derfor et skip som går i ni knop i stedet for
tolv sparer enormt.

Klikk. Så ganger vi med installert effekt, en faktor på 0,85, og tiden siden
forrige AIS-melding.

Klikk. Og her er setningen jeg vil at dere skal huske fra hele foredraget:
hvert AIS-punkt blir en utslippsberegning.

Det er derfor hundre millioner rader om dagen ikke er skryt. Det er en
konsekvens av metoden. Skal du regne utslipp per punkt, trenger du hvert
punkt.

## maru – Maritim utslippsmodell: MarU

Så, MarU.

Klikk. Bottom-up-modell, etter metodikken fra IMOs fjerde klimagasstudie og
ICCT. Python og PySpark. Og åpen kildekode, hele beregningen ligger på
GitHub.

Klikk. Hovedmotoren regnes fra propellloven. Hjelpemotorer og kjeler regnes
per operasjonsfase. Og nå ser dere hvorfor vi trengte fasene fra MarTraf. Et
skip til kai bruker hjelpemotor til strøm og varme, ikke hovedmotor. Uten
fase hadde vi regnet feil.

Klikk. Rundt 330 inputvariabler. Utslippsfaktorer, lavlastjusteringer,
svovelgrenser per utslippskontrollsone, GWP-faktorer. Det er mange knapper.

Klikk. Og skipsregisteret. Fire kilder slått sammen, med versjonering av alt
som endrer seg. For et skip bytter navn, eier og motor i løpet av livet.

## maru-hull – ML som datakvalitetsverktøy

Og nå den ærlige delen.

Klikk. Skipsregistrene er hullete. Særlig for de små fartøyene. Vi vet at
skipet finnes, men ikke hvilken motor det har, eller hvor fort det egentlig
er designet for å gå.

Klikk. Det enkleste fyller vi med medianverdier per skipstype og
lengdeintervall, med minst seks observasjoner per gruppe.

Klikk. Det vanskeligere fyller vi med nevrale nett. Servicefart, turtall og
slagtype. Turtallet har til og med en egen tapsfunksjon på relativ feil, for
å ikke overtilpasse på høyturtallsmotorer.

Klikk. Og tallet som overrasket meg: rundt sytti prosent av fartøyene i norske
farvann i 2022 og 2023 manglet drivstofftype i registrene. Sytti prosent.
Den fylles etter IMOs metode.

Poenget: her brukes maskinlæring som datakvalitetsverktøy. Ikke som en
AI-feature å vise på forsiden. Som et verktøy for å fylle hull. Og det er
kanskje den mest nyttige bruken av ML jeg har sett.

Klikk. Og alt er åpent. github.com/Kystverket/maru. Dere kan lese hele
beregningen i pausen.

## maru-ut – Hva kommer ut?

Så hva kommer ut i andre enden?

Klikk. Utslipp. CO2 og CO2-ekvivalenter, metan, NOx, SOx, svevestøv. Pluss
energibehov, drivstofforbruk, distanse og driftstimer.

Klikk. Fordelt på fjorten skipstyper og ni størrelser. De under 5 000
bruttotonn er splittet finere enn før, fordi norske farvann har veldig mange
små fartøy.

Klikk. Geografisk: kommune, fylke, havområde. Klikk. Energibehov og
landstrøm, som forgjengeren ikke hadde med i det hele tatt. Klikk. Og
innenriks, utenriks, gjennomfart.

Og det gjør at du kan stille spørsmål som dette: hvor mye CO2 slipper de
største cruiseskipene ut i Geiranger i juli, mens de ligger stille? Det kan vi
svare på. Per skip, per måned.

Og så det store: Miljødirektoratet legger opp til å bruke MarU-tallene i
klimaregnskapet for kommunene. Plattformen ender i offisiell statistikk.
Meldingen fra skipet vårt utenfor Stad ender i klimaregnskapet til Stad
kommune.

## maru-hvorfor – Hvorfor ikke bare salgstall?

Nå kan noen spørre: hvorfor gjøre dette så komplisert? Man vet jo hvor mye
drivstoff som selges.

Klikk. Ja. Og det er sånn det har vært gjort. SSB regner utslipp fra innenriks
sjøfart ut fra salgstall hos drivstoffomsetterne.

Klikk. Men fartøy bunkrer i utlandet og seiler her. Og de bunkrer her og
seiler ut. Salgstall beskriver hvor drivstoffet ble kjøpt. Ikke hvor det ble
brent.

Klikk. MarU snur det. Regn fra observert aktivitet i stedet. Og skill
innenriks fra til og fra utlandet og gjennomfart. Da vet du hva som faktisk
skjedde i norske farvann.

Klikk. Og så 2016-historien, én gang til, for nå har den mer tyngde.
Tidsserien starter i 2016. Vi bygde ut mange nye basestasjoner i 2015, og
bedre dekning ville sett ut som vekst i utslippene. En endring i innsamlingen
forplanter seg hele veien ut i statistikken. Derfor trenger du metadata og
datakontrakter. Ikke bare tall.

## veien-videre – Veien videre

[53:00] Siste kapittel. Hvor er vi, og hvor skal vi?

Og her skal jeg være ærlig, for det er det som gjør historien troverdig.

## hvor-vi-er – Hvor vi er: én kilde, én katalogstruktur

Ærlig status. I dag har vi «bare» AIS. Én kilde, ett domene.

Katalogstrukturen er klassisk medallion. Tre kataloger i Unity Catalog.
Bronze med rå meldinger. Silver med vasket og beriket. Gold med tracks,
seilaser og utslipp, klare til bruk.

Klikk. Og dataproduktene vi leverer i dag kommer alle ut av gold. AIS-tracks,
MarTraf, MarU, HAIS.

Klikk. Dette funker fint så lenge alt er AIS. Men i løpet av neste år kommer
flere domener inn. Toll. HR og økonomi. Prediktivt vedlikehold av fyrtårn.
Og da holder ikke én felles bronze, silver, gold. Hvem eier hva? Hvem
betaler? Hvem svarer når noe ryker? Det krever strengere struktur. Og en del
omskriving. Det er greit å si høyt.

## hvor-vi-skal – Hvor vi skal: domenekataloger og dataprodukter

Sånn skal det se ut.

Pek på venstre side. Én katalog per domene. Toll, AIS, HR og økonomi,
prediktivt vedlikehold. Hvert domene har sin egen bronze, silver, gold inni.
Sitt eget team. Eget kostnadssenter. Eget forvaltningsansvar.

Klikk. Når et domene vil dele noe, skriver det en datakontrakt. Open Data
Contract Standard, en YAML-fil med id, eier, skjema og kvalitetskrav. Og
kontrakten eies av domenet. Ikke av plattformteamet.

Klikk. Kontrakten pushes til ett sentralt repo. Pull request. CI validerer
kontrakten mot gold-tabellen den peker på.

Klikk. Og så det som gjør at dette skalerer: CI oppretter automatisk et view i
den sentrale dataprodukt-katalogen. Ingen manuell bestilling. Ingen kopiering
av data. Viewet peker rett på domenets gold-tabell.

Klikk. Samme mønster for alle domener. Konsumentene trenger bare å kjenne én
katalog, uansett hvor mange domener som ligger bak.

Klikk. Data delt på domener. Tydelig eierskap, tydelig kostnadssenter, tydelig
forvaltningsansvar. Dette er datakontrakt- og governance-kapittelet fra
tidligere, satt i system.

## domene-effekt – Tydelig eierskap, kostnad og forvaltning

Tre ting vi får med domenekataloger.

Klikk. Eierskap. Domenet eier dataene sine og kontrakten som beskriver dem.
Ikke «IT».

Klikk. Kostnadssenter. Hver katalog har egen lagring og egen regning. Vi kan
faktisk svare på hva toll-dataene koster. Det er sjeldnere enn dere tror.

Klikk. Forvaltningsansvar. Det er tydelig hvem som svarer når noe ryker, og
hvem som må varsle når kontrakten endres.

Klikk. Og for konsumentene endrer ingenting seg. Dataproduktene finner du
fortsatt på ett sted.

## videre-liste – Dette vil vi få til

Og så det vi vil få til.

Klikk. Flere kilder inn. SafeSeaNet med anløpsmeldinger, losdata, geodata.
Klikk. Dataprodukter med datakontrakter, maskinlesbare avtaler. Klikk.
Sanntidsvarsling for beredskap og miljø. Klikk. Maskinlæring på strømmen:
ankomstprediksjon og avviksdeteksjon.

Klikk. Og enda mer åpne data. Til dere. For alt dette er åpent under NLOD, og
noen av de beste tingene som er bygget på AIS-dataene er bygget av folk
utenfor Kystverket.

Men før vi avslutter, skal vi tilbake til skipet vårt.

## tilbake-til-stad – Tilbake til Stad

Rolig tempo. Dette er slutten. La det lande.

Klokka er 03:14.

Skipet vårt passerer Stad. Kuling, mørkt, én mann på brua med en kaffekopp.
Og hvert tiende sekund går det en liten melding ut i mørket.

Klikk. Ti sekunder senere ligger den meldingen i plattformen. Vasket.
Beriket. Med en fase, en seilas, en trafikktype.

Klikk. Om et år ligger den i klimaregnskapet til en kommune. Sammen med
hundre millioner andre meldinger. Som til sammen forteller hvordan Norge
faktisk bruker sjøveien.

Klikk. Og ingen om bord vet det. De bare seiler.

Det er det en dataplattform er. Ikke Databricks, ikke Azure, ikke Delta-
tabeller. Det er veien fra ett lite signal i mørket til noe et menneske kan
ta en beslutning på. Verdens sikreste og reneste kyst. Én melding om gangen.

## takk – Takk. Prøv selv.

<!-- TODO Peter: legg inn e-post eller LinkedIn hvis du vil ha det på sliden. -->

Takk.

Alt jeg har vist dere er åpent. Sanntidskartet på nais.kystverket.no.
Historikk på bestilling på hais.kystverket.no. Den rå AIS-strømmen på en
TCP-port, uten registrering, hvis du vil koble deg rett på. Live-API hos
BarentsWatch for dere som vil bygge noe. Og hele utslippsmodellen på GitHub.

Bygg noe med det. Og fortell meg hva dere bygde.

Spørsmål?
