# Speaker notes: 100 millioner rader om dagen (TDC 2026, 60 min)

Alt før første `## slide-id`-overskrift ignoreres. Dette området er kladd.

### Den røde tråden

Én setning som alt skal henge på:

> Ett AIS-signal utenfor Stad klokka 03:14 blir, via plattformen, til
> klimaregnskapet i en kommune. Og det er derfor vi bygger dataplattform.

Skipet utenfor Stad er karakteren vår. Vi møter det i åpningen, følger det
gjennom MarTraf og MarU, og kommer tilbake til det helt til slutt. Hver gang du
kan si «skipet vårt», si det. Publikum skal kjenne det igjen.

### Dramaturgi og tidsplan

Seksti minutter. Tiden er når du skal lande på første slide i det
kapittelet. Hvis totaltimeren allerede har passert det tallet, ligger du
etter. Kalibrert mot øving: prosjektkapittelet lander på 35:00.

| Kapittel                        | Start | Min | Innhold                                                                  |
| ------------------------------- | ----- | --- | ------------------------------------------------------------------------ |
| Åpningen                        | 00:00 | 5   | scene, signal, NAIS, 100 mill, forside, Peter. Ikke heng igjen på bioen  |
| Hvem lytter                     | 05:00 | 6   | Kystverket, visjonen, fire områder, lyttepostene, AIS                    |
| Hvorfor dataplattform           | 11:00 | 3   | hvorfor alle bygger dem, Hoffman, hverdagen                              |
| Historien om plattformen        | 14:00 | 6   | femti år, samme problem. Ett poeng per epoke. Hold tempoet               |
| Hvordan en dataplattform funker | 20:00 | 11  | arkitektur, produkter, kontrakter, katalog. Lengste teoriblokk           |
| Hva får du igjen                | 31:00 | 4   | fire effekter fra sjøveien                                               |
| Prosjektet                      | 35:00 | 4   | dag én, verktøykassa, terraform                                          |
| Produktene                      | 39:00 | 8   | HAIS, Asuka, MarTraf, MarU, KystRisk                                     |
| Hvordan det gjøres              | 47:00 | 2   | ingest, den daglige jobben                                               |
| Skalering                       | 49:00 | 3   | strøm vs historikk, batch vs streaming, serverless                       |
| H3                              | 52:00 | 3   | hekser. Hopp over hele kapittelet hvis du lander her etter 52:00         |
| Veien videre                    | 55:00 | 5   | domener, tilbake til Stad, takk. Spørsmål hvis du har tid                |

Ligger du etter når Hvordan det funker er ferdig, kutt kontrakter og katalog
ned til takeaway-setningene. Behold «en dataplattform finnes for å servere
dataprodukter».

Ligger du etter når produktene er ferdige (ikke på 47:00), kutt
batch/streaming-sidesporet (to slides, rundt to minutter), så H3.

Ligger du etter underveis i produktene, kutt maru-hull og KystRisk.

Hvis totalen allerede har passert 52:00 når du kommer til H3, hopp over
kapittelet og gå til veien videre.

### Regler for språket i notatene

Muntlig. Du og vi. Korte setninger innimellom. Spør publikum. Ingen
tankestreker. Si det slik du ville sagt det til en kollega over en kaffe.

### Tall fra research

- ~90 basestasjoner, 4 operative AIS-satellitter (AISSat-4 opp mars 2026, ca. 15 MNOK)
- 100 millioner meldinger om dagen, data lagret tilbake til 2005
- Åpne data under NLOD, sanntid via BarentsWatch API og rå TCP-strøm
- AIS-intervall: skip i fart 0 til 14 knop sender hvert 10. sekund
- 100 mill rader/dag ≈ 1 157 per sekund. Lest én per sekund tar ett døgns data 3,2 år.
- Propellloven: (2)³ = 8. Dobbel fart, åtte ganger effekten.

## scene – Klokka er 03:14

[00:00] 5 min. Neste kapittel 05:00. Rolig. La scenen lande.

[[CLICK]] Klokka er 03:14.

[[CLICK]] Vi er på Stadhavet. Det er februar. Det blåser nordvest kuling, og det
er helt mørkt.

[[CLICK]] Der ute går det et stort lasteskip nordover. Ni knop. Tjue mennesker om bord, de fleste sover. Én står på brua med en kaffekopp og ser på
radaren.

Og mens han står der, skjer det noe han ikke tenker på. Noe skipet gjør
helt av seg selv.

## signal – Hvert tiende sekund sier skipet

Hvert tiende sekund sender skipet en liten melding ut i mørket.

[[CLICK]] Og meldingen er egentlig ganske enkel. Den sier: hvem jeg er. Hvor jeg
er. Hvor fort jeg går. Hvor jeg skal. Og hva jeg holder på med akkurat nå.
Fem ting. Det er alt.

Ingen om bord tenker på det. Det er ingen som trykker på en knapp. Meldingen
bare går. Over VHF, ut i kulingen, i alle retninger.

Og så er spørsmålet: hvem lytter?

## nais – Noen lytter: NAIS

Dette er norskekysten.
Hver eneste prikk på dette kartet er et skip som sender meldingen jeg nettopp viste dere.

Hver prikk er et mannskap.
Noen av dem er ferjer med folk på vei til jobb. Noen er fiskebåter. Noen er
cruiseskip med over tre tusen passasjerer.

[[CLICK]]
Og dette kartet er åpent. nais.kystverket.no. Du kan åpne det på mobilen
akkurat nå og se skip gå forbi.

Det er ganske mange skip. Og de sender ganske mange meldinger.
Og det er dette jeg egentlig vil snakke om. Se på tallet bak dette kartet.

## hundre-millioner – 100 000 000 hver dag

Hundre millioner.

[[CLICK]] Så mange slike meldinger går gjennom systemet vårt. Hver eneste
dag.

La det synke litt. Hundre millioner er et tall vi sier fort, men det er
vanskelig å kjenne på.

## hundre-millioner-fyll – Meldingene fyller skjermen

Hver båt er hundre meldinger. Hvert sekund, hele døgnet, kommer det rundt
elleve hundre meldinger.

Det er strømmen dette foredraget handler om. Og spørsmålet er egentlig ganske
enkelt: hvordan gjør du hundre millioner små meldinger om til noe noen kan
bruke?

Og hva kan vi bruke disse dataene til?

Dette skjer hvert sekund, hele døgnet, og det bare fortsetter å komme.
Over årene blir dette en ganske stor mengde data.

Og da blir det ikke bare et logikkproblem, men et skaleringsproblem også.

## forside – Forside

Dette er historien om dataplattformen bak sjøveien.

Det er en historie om hvorfor en etat som driver med fyr og lykter og los
plutselig sto med en av de største datastrømmene i norsk offentlig sektor,
og hva vi gjorde med den.

## om-peter – Peter Bull

Nitti sekunder. Ikke en CV. Navn, Miles, Kystverket, så ski og videre.

Jeg heter Peter.

[[CLICK]] Jeg er dataplattformutvikler i Miles.

[[CLICK]] Jeg designer dataarkitektur for store organisasjoner.

[[CLICK]] Jeg bygger dataplattformen til Kystverket. Før det har jeg bygget
plattformer for både private selskaper og offentlige etater, og det jeg har
lært er at problemene er overraskende like. Det er bare dataene som bytter
navn.

[[CLICK]] Tidligere var jeg tech lead for dataplattformen til politiet.

[[CLICK]] Og jeg jobber i Azure, Databricks og Terraform.

Og jeg går på ski. Mye.

[[CLICK]] Dette er en vanlig lørdag. Ser ned en bratt linje, med kysten
under.

[[CLICK]] Dette er Hanna. Hun holder ut med alt dette.

## kystverket – Hvem lytter? Kystverket

[05:00] 6 min. Neste kapittel 11:00.

Så. Hvem er det som lytter på skipet vårt?

Vi er Kystverket.
Transportetaten for sjøveien. Vi sørger for at kysten, skipene og alt det nautiske går som det skal.

Og før vi går inn i teknologien, må vi forstå hvorfor vi gjør det vi gjør.

## visjon – Verdens sikreste og reneste kyst

Dette er visjonen til Kystverket.
Verdens sikreste og reneste kyst.

[[CLICK]]
Vi vil ha en kyst uten forurensning, vi vil ha en kyst der ingen mennesker drukner.

For når vi snakker om prosesseringshastighet, dataplattformer og datakontrakter -> så er dette hvorfor-et.

Alt det andre er hvordan.

## oppdrag – Om oss

Kystverket er delt i fire områder.


[[CLICK]] Lostjenesten. En kjentmann som går om bord på de store skipene og hjelper dem inn.
Losene våkner midt på natta, reiser ut til skipene, kommer med lokalkunnskap om farvannet, og leder båtene inn.

[[CLICK]] Miljø. Når et skip går på grunn og det begynner å lekke olje, er det Kystverket
som leder aksjonen. Depoter med lenser langs hele kysten.

[[CLICK]] Navigasjonsteknologi. Det er fyrene og lyktene og sjømerkene.
Og sjøtrafikksentralene, som ser på trafikken døgnet rundt, akkurat som
flygeledere, bare for skip. Og AIS-meldingene.

[[CLICK]] Transport, havn og farvann. Den fysiske kysten. Leiene, havnene,
Nasjonal transportplan for sjøen.

[[CLICK]] Og her er det jeg vil at dere skal se: alle fire starter med
nøyaktig samme spørsmål.

[[CLICK]] Hvor er skipene akkurat nå? Skal du hindre en kollisjon, må du
vite hvor skipene er.
Skal du lede en oljevernaksjon, må du vite hvilke skip som er i nærheten og kan hjelpe.
Navigasjon og transport handler om skipene.

Så hvordan lytter vi og tar imot disse skipsposisjonene?
Hvordan hører man et skip som snakker over VHF ute på Stadhavet klokka tre
om natta?

## lyttepostene – Lyttepostene

Så hvordan hører man et skip som snakker over VHF ute på Stadhavet klokka tre
om natta?

[[CLICK]] Man bygger lytteposter. Vi har rundt nitti basestasjoner, langs hele
kysten og på Svalbard. De hører alt fra land og førti til seksti nautiske mil
ut.

[[CLICK]] Men havet er større enn det. Så i 2010 gjorde Kystverket noe litt
uvanlig for en transportetat.
De skjøt opp en satellitt. AISSat-1. I dag har Norge fire av dem som lytter på skip fra verdensrommet.
Den siste gikk opp i mars i år, og den ble bygget for rundt 15 millioner
kroner, som når du tenker på det er ganske billig, mindre enn prisen på en liten leilighet ved sjøen her i Trondheim.

[[CLICK]] Og resultatet er dette. Hundre millioner meldinger om dagen.
Bedre lytteposter, flere skip, og flere skip med AIS.

[[CLICK]] Og alt er lagret. Helt tilbake til 2005.
Tjueett år med hvert eneste skip som sier hvor det er, hvert tiende sekund.
Det er et arkiv over hele den norske kysten.

## ais – AIS: laget for å unngå kollisjoner

Poenget med disse meldingene var aldri at noen på land skulle lytte.

[[CLICK]] AIS står for Automatic Identification System. Skip kringkaster
identitet, posisjon, fart og kurs over VHF. Poenget var at skipene rundt deg skulle høre det.
Så to skip i tåke vet om hverandre før de ser hverandre.

[[CLICK]] Hvor ofte de sender, avhenger av hva de gjør. Et skip i fart sender
hvert par sekund til hvert tiende sekund. Et skip til kai sender hvert
tredje minutt.

[[CLICK]] Og så er det den interessante delen. Ingen planla at AIS skulle bli
en datakilde. Det var et antikollisjonssystem. Men fordi alle skip sender, og
fordi noen begynte å lytte og lagre, ble det ryggraden i trafikkovervåking,
beredskap og statistikk.

Historiske data har blitt verdifulle på grunn av innsikt og analyse, og nå dataplattformen vår og teknologien som gjør det mulig å prosessere disse enorme datamengdene til verdifull innsikt.

## sporsmalet – Hva gjør du med 100 millioner meldinger om dagen?

Vi har bygget lytteposter langs hele kysten og skutt opp satellitter.

[[CLICK]] Hva gjør du med dem? Og hvordan prosesserer vi alle sammen?

For det er her det blir vanskelig. Å samle inn data er den enkle delen. Å
gjøre dem om til noe noen kan bruke er den vanskelige delen. Og det er ikke
bare Kystverket som sitter med det spørsmålet. Det er hele bransjen.

Hvilken teknologi kan vi bruke til det?

## hva-er – Hvorfor bygger alle dataplattformer?

[11:00] 3 min. Neste kapittel 14:00.

Ser du rundt i IT-bransjen, så har det de siste par årene begynt å dukke opp
et nytt ord i stillingsannonsene. Dataplattformer.

Kommuner, banker, butikkjeder, oljeselskaper, og særlig de offentlige
etatene. Alle bygger dataplattformer.

Hvorfor det?

[[CLICK]] Fordi data blir mer og mer verdifulle. Ikke bare for oss, med
tjueett år med hvert skip langs kysten. For alle.

## reid-hoffman – Alt er målbart

Reid Hoffman. Han var med å grunnlegge LinkedIn.

Han sa det slik: i dataenes verden er alt målbart, og alt kan vites.

[[CLICK]] Og det er det tveeggede. Hvis alt er målbart, blir dataene
ekstremt verdifulle.

Men da får du en veldig stor mengde data. Og det blir et skikkelig rot hvis du ikke håndterer det ordentlig.

Vi har prøvd å løse det problemet, å holde orden på dataene våre, i over femti år. Og mens vi har jobbet med det problemet, har datamengden vokst eksponentielt.

Og akkurat nå er en dataplattform det nyeste svaret på det problemet.

## hvorfor – Dataplattformer er overalt

Og faktum er at
de fleste tjenestene du har brukt denne uka står på dataplattformer.

[[CLICK]] Nettbutikken som foreslår varer som faktisk passer.
[[CLICK]] Strømmetjenesten som anbefaler serier til deg på kvelden.

[[CLICK]] I banken din kjører svindeldeteksjon og antihvitvasking på hver
transaksjon før den går gjennom.

[[CLICK]] Nye veiprosjekter planlegges ut fra årevis med trafikkdata,
statistiske prognoser for fremtidig trafikk, og beregninger av støy og
andre tiltak. Hundrevis av terabyte med data, brukt til å ta de beste
beslutningene på mest mulig data.

[[CLICK]] Det skjer overalt. Bak hver eneste av disse er det en plattform som
henter inn, lagrer, prosesserer og leverer data.

## batch-streaming – Hvordan det funker

[20:00] 11 min. Neste kapittel 31:00. Lengste teoriblokk.
Arkitektur, produkter, kontrakter, katalog. Ikke hold kurs.
Setningen å holde fast i: en dataplattform finnes for å servere dataprodukter.

Så hvordan funker en dataplattform egentlig?
Og hvorfor er den annerledes enn en database, eller et varehus?

## dataflyt – Dataflyt: kilder til konsumenter

Så hva er en dataplattform, egentlig? La oss ta det store bildet først.

[[CLICK]] Pek på venstre side. Her er kildene. Driftssystemer, API-er, filer,
sensorer. Hos oss: AIS-antennene.

[[CLICK]] Og i midten ligger plattformen. Ett felles lag der alt samles og
blir til én sannhet.

[[CLICK]] Pek på høyre side. Her er de som skal bruke dataene. Apper,
dashbord, maskinlæringsmodeller, analytikere.

[[CLICK]] Og under: overvåking, infrastruktur, og hvordan folk jobber sammen.
Det er det som holder plattformen i gang.

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
selvbetjening. Du får kaos. Og det laget kommer vi tilbake til om litt, for
det er der plattformer faktisk vinner eller taper.

[[CLICK]] Og vi har full versjonskontroll på dataene våre. Rådata arkiveres.
Slettes aldri. AIS tilbake til 2005. Transformasjonene ligger i git. Hver
endring er en commit. Du kan spille av 2018 på nytt med 2018-koden, eller
kjøre det igjen med dagens. Arkivet står. Koden husker.

## mer-enn-varehus – Er det bare en database?

Og nå kommer innvendingen jeg alltid får. Er det bare en database? «Har vi
ikke dette allerede?»

Jo. En database er god på én ting. Strukturerte data. Rader, kolonner, et
skjema alle ble enige om i fjor. Det er styrken.

Og det er også problemet. Vil du ha en ny kolonne? Det er en migrering. Vil
du ha en ny form? Det er et møte, en sak i køen, og en helg du ikke er sikker
på at du vil ha. Endringer går sakte fordi skjemaet er produktet.

[[CLICK]] Strukturert og ustrukturert. Du tar AIS-meldingen som den er.
JSON, filer, et bilde fra et kamera på kaia.

[[CLICK]] Rollback. Hvis tirsdagens versjon var feil, går du tilbake til
mandagens. Flere versjoner av dataene. Ikke ett skjema du er redd for å
røre.

[[CLICK]] Raske iterasjoner. Du venter ikke på den perfekte tabellen. Du
lander dataene, prøver en transformasjon, beholder rådataene.

Det er datalaget. Der slår et lakehouse allerede en database.

[[CLICK]] Og se så på resten av bygningen. Governance. Auditlogging. Du kan
finne dataene. Pipelines som kjører. Regnekraft når du trenger det.
Utviklergrensesnitt. Et sted å kjøre kode. AI. Modeller.

En database lagrer rader. Den gir deg ikke en katalog, en notebook, en jobb,
regnekraft eller et modellregister.

[[CLICK]] Det er en plattform.

## mer-enn-varehus-katalog – Katalog. Jobber. Spør. Svar.

Pek til venstre. Katalog. Jobber. Compute.
Discover. SQL. Dashbord. Det er ikke en databasekonsoll.

Lista vi nettopp gikk gjennom? Den ligger i menyen.

[[CLICK]] Jobber som kjører. Ikke et spørrevindu. Pipelines.

[[CLICK]] En katalog du kan åpne. Dataene har et sted, et navn og et skjema
du kan finne uten å spørre rundt.

[[CLICK]] Og så spør du. Samme plattform. Analyser dataene mine. Lag en
skill. Katalogen vi nettopp så er det denne snakker med.

En database har ikke en boks som sier «hva kan jeg hjelpe deg med».

[[CLICK]] Og den svarer. Trollfjord. Posisjoner den ellevte august. Fortøyd.
Underveis. Et kart. En tabell.

Du spurte. Plattformen brukte katalogen, regnekraften, dataene.
Det er hele argumentet på én skjerm.

## strukturere-data – Hvordan strukturerer vi dataene for å holde orden?

Dette er kartet for resten av kapittelet. Fire ideer. Vi går gjennom hver.

[[CLICK]] Dataprodukt. Datasettet noen faktisk kan bruke.

[[CLICK]] Datakontrakt. Avtalen rundt det.

[[CLICK]] Datakatalog. Hvordan du finner det.

[[CLICK]] Governance. Hvorfor vi tør å dele det.

Hold på dette bildet. Alt etter dette er å pakke ut disse fire.

## dataprodukt – Dataprodukt

Neste begrep, og dette er et av de viktigste: dataprodukt.

Tanken er at data skal behandles som et produkt. Kvalitetssikret. Forvaltet.
Dokumentert. Og med en eier som faktisk svarer når du ringer.

Ikke en tabell noen dumpet et sted og glemte.

Dette er setningen jeg vil at dere skal ta med fra hele denne delen.

En dataplattform er ikke produktet. Dataproduktene er det. Lakehouse,
pipelines, lagring: alt det er der for at du skal kunne servere data folk
faktisk kan bruke.

Tenk på et system selskapet ditt leverer til kunder. Det har en eier,
dokumentasjon, support når det knekker, og noen som følger med på om brukerne
er fornøyde. Tenk så på et typisk datasett i samme selskap. Ingen eier. Ingen
dokumentasjon. Bruk på eget ansvar.

Det er rart, ikke sant? Millionbeslutninger hviler på datasett vi behandler
som biprodukter.

Sliden sier det: en dataplattform finnes for å servere dataprodukter.
Lakehouse, pipelines, lagring. Alt det er hvordan du kommer dit.

[[CLICK]] Et produkt har brukere. Og brukere har forventninger. Så behandle
datasettene folk er avhengige av med samme alvor som produktene du selger.

## dataprodukt-kjennetegn – Hva gjør det til et produkt

Så hva gjør et datasett til et produkt? Fire ting.

En navngitt eier. Noen som svarer for innholdet, og har mandat til å
forbedre det.

[[CLICK]] Dokumentasjon: hva feltene betyr, hvor dataene kommer fra, hva du
kan bruke dem til.

[[CLICK]] Kvalitetsgarantier. Hvor ferske de er, hvilke tester de har
passert, hva konsumentene kan forvente. Det er kontrakten. Den kommer vi
til.

[[CLICK]] Og kjente konsumenter: du vet hvem som faktisk bruker datasettet,
så du kan varsle dem før en endring knekker noe nedstrøms.

Eierskap sier hvem. Kontrakten sier hva. Produkttenking sier hvorfor.

[[CLICK]] Og én ting til, før jeg viser dere bildet. Ikke alle datasett.
Produktbehandling koster tid. De fleste datasett er arbeidsfiler som aldri
får eksterne konsumenter. La dem være. Start med den håndfullen folk lener
seg på.

## dataprodukt-anatomi – Mer enn en tabell

La meg vise hva jeg mener.

Pek på venstre side. Her er en fil noen har lagt i en bucket. Dataene i den
kan være helt riktige. Men ingen tør bruke dem.

[[CLICK]] Hva betyr feltene?

[[CLICK]] Hvor ferske er de?

[[CLICK]] Hvem spør jeg når noe ser rart ut? Har dere vært der? Jeg har vært
der mange ganger. En fil i en bucket er ikke et produkt. Det er en
gjenstand.

Pek på høyre side. Nøyaktig samme data. Men pakket.

[[CLICK]] Dokumentasjon: hva feltene betyr.

[[CLICK]] En tydelig eier. Noen som svarer.

[[CLICK]] En datakontrakt. En maskinlesbar avtale.

[[CLICK]] Og tilgang. API, SQL eller BI.

[[CLICK]] Kvalitetstester som kjører på hver rad.

[[CLICK]] Og ferskhet. En SLA: ferskere enn fem minutter. Nå tør folk bruke
det.

Tenk på forskjellen mellom løse ingredienser og en måltidskasse. Tabellen er
ingrediensen. Dataproduktet er retten, med oppskrift og alt.

Og så én advarsel. Ikke alt skal være produkt. Når alt er produkt, er
ingenting produkt. Filteret jeg bruker: deles det utenfor teamet? Og er en
feil dyr nok til at det er verdt å forvalte det over tid? Hvis ja på begge, da
er det et produkt.

## datakontrakt-kapittel – Datakontrakt

Og hvordan beskriver du et dataprodukt? Med en datakontrakt.

En kontrakt er en avtale mellom de som endrer et datasett og de som
konsumerer det. Felles forventninger. Det er hele poenget.

Når data er spredt, dårlig dokumentert, og ingen eier dem, bruker vi tiden
vår på å lete, inspisere og validere data andre har produsert.

## datakontrakt-hva – Tydelig dokumentasjon av dataene dine

En datakontrakt er tydelig dokumentasjon av dataene dine.

Kontrakten er et dokument både mennesker og maskiner kan lese. Den avklarer
forventninger begge veier. Produsenten forplikter seg til noe. Konsumentene
vet hva de kan stole på.

[[CLICK]] Og den er mer enn et skjema. Skjemaet sier at fart er et tall.
Kontrakten sier: null til seksti knop, ferskere enn fem minutter, og her er
hvem du vekker når det ryker.

Det er forskjellen mellom «jeg tror den kolonnen er i knop» og «jeg vet
det».

## datakontrakt-innhold – Hva står i en kontrakt

Så hva skriver du faktisk ned?

Skjema. Hvilke felter som finnes, hvilke typer, hva som er påkrevd.

[[CLICK]] Betydning. Hva feltene betyr, og hvor de kommer fra.

[[CLICK]] Valideringsregler. Min, maks, relasjoner, tester dataene må
passere.

[[CLICK]] SLA-er og governance. Hvor ferske de skal være, hvor sensitive de
er, hvem som eier dem.

[[CLICK]] Og i motsetning til en wikiside blir denne testet. Maskiner kan
sjekke den. Det er derfor den holder seg sann.

## datakontrakt – Datakontrakt: et API for data

La meg vise hvordan det ser ut.

Pek på midten. Dette er kontrakten. YAML. Mennesker kan lese den. Maskiner
kan lese den. Skjema, gyldige verdier, ferskhet, eierskap, vilkår.

Produsenten er til venstre. Konsumentene er til høyre. Kontrakten ligger
mellom dem. Data slipper bare gjennom hvis de matcher.

Kontrakten går begge veier. Produsenten forplikter seg til noe. Konsumentene
vet hva de kan stole på.

## datakontrakt-brudd – Kontrakten stopper feilen tidlig

Og her er hvorfor det er verdt bryet.

Klassikeren. Noen kobler seg rett på produksjonsdatabasen og laster data
derfra. Nå har databaseskjemaet blitt et API, uten at noen bestemte det.
Utvikleren endrer en kolonne. Hun aner ikke at noen nedstrøms er avhengige
av den. Og ingen varsler, fordi ingen vet at det trengs et varsel.

Pek øverst. Endringen sklir stille gjennom. Dashbordet knekker. Og feilen
oppdages tre uker senere, nedstrøms, av feil folk. Som regel av noen som
skulle bruke tallet i et møte.

Pek nederst. Samme endring. Men nå møter den kontraktsjekken i pull requesten,
og stoppes før den når produksjon. Kontrakten er ikke bare dokumentasjon. Den
testes.

Setningen jeg vil at dere skal ta med: et stille brudd nedstrøms blir en
høylytt, tidlig feil. Og høylytte, tidlige feil er de billigste feilene som
finnes.

## datakatalog – Datakatalog

Neste: hvordan finner du produktene?

Datakatalogen er det tredje begrepet som er viktig for dataplattformarkitekturen.

I en stor organisasjon ligger data i titalls systemer, eid av forskjellige
team. Uten en felles oversikt bruker folk tiden på å lete. Og beslutninger
tas på forskjellige versjoner av samme fasit.

Katalogen er kartet organisasjonen din mangler.

## datakatalog-hva – Hva en katalog er

En datakatalog er en oversikt over datasettene i en organisasjon.

Den lar deg søke, forstå og vurdere et datasett uten å spørre rundt i
bygget, eller grave i databaser på egen hånd.

[[CLICK]] Søke, forstå, vurdere. Uten skattejakten.

[[CLICK]] Og én viktig ting. Dataene ligger fortsatt i kildesystemene.
Katalogen beskriver dem, og peker til hvor de faktisk ligger.

De fleste organisasjoner legger bare ferdige, publiserte dataprodukter i
katalogen. Det holder den ryddig. Arbeidsfiler holdes utenfor.

## datakatalog-datahub – DataHub

Slik ser det ut. DataHub. Åpen kildekode.

Du søker. Du ser domener, plattformer, publiserte datasett. Du kan åpne ett
og se hvem som eier det, hva feltene betyr, hvor ferskt det er.

[[CLICK]] Vi valgte en katalog med åpen kildekode fordi den integrerer på
tvers av mange systemer, ikke bare én sky. Er du dypt inne i Microsoft, gjør
Purview samme jobb. Gevinsten er den samme: en felles oversikt folk faktisk
bruker.

## governance – Governance: kontrakter og katalog

Så var det ordet alle hater. Governance.

Jeg vet. Det høres ut som byråkrati. Men hør her: governance er det som gjør
at vi tør å dele data. Det er ikke bremsen. Det er bremsene som gjør at du
tør å kjøre fort.

Eierskap har vi allerede dekket. Det bor i dataproduktet. Det som er igjen
her er kontrakten og katalogen. [[CLICK]] Og så sentralisert logging, audit
og rapportering. Ett sted, ikke i hvert system.

Spørsmålene governance skal svare på er egentlig enkle. Hvem har tilgang?
Hvem hadde tilgang, og når? Hvor ligger dataene? Når slettes de?

Konkret hos oss: fiskefartøy under femten meter og fritidsbåter under
førtifem meter skal ikke ut i de åpne dataene. Det er personvern. Og det
filteret ligger ett sted i plattformen, ikke i hvert eneste system som bruker
dataene. Det er governance i praksis.

[[CLICK]] Og verktøyet vårt for dette heter Unity Catalog. Mer om det senere.

## roller – Tydelige roller

Når en dataplattform skalerer,
trenger håndhevingen av slike regler også tydelige roller.

[[CLICK]] Noen må eie og bygge plattformen.

[[CLICK]] Noen må bygge datapipelines og dataprodukter: engineers og
analytikere.

[[CLICK]] Noen må ha ansvar for governance.

[[CLICK]] Og så er det de som faktisk skal bruke det som kommer ut: BI-folk
og konsumenter.

[[CLICK]] I praksis sitter de tre første sammen som ett dataplattformteam.

Det avgjørende skiftet er dette: fra at data er noe IT håndterer, til at data
er en naturlig del av fagansvaret. Når losene eier losdataene, og
beredskapsfolkene eier beredskapsdataene, da blir dataene bedre. Mer
relevante. Og, viktigst av alt, faktisk brukt.

Verdien oppstår når teknologi, organisering og ansvar trekker i samme retning.
Det er slutten på teoridelen. Nå skal vi se hva du får igjen.

## effekter – Hva får du igjen?

[31:00] 4 min. Neste kapittel 35:00.

Kapittelskifte. Hva får du egentlig igjen for alt dette?

Jeg skal gi dere fire effekter. Og jeg skal ikke gi dere dem som
PowerPoint-punkter. Jeg skal gi dere ett konkret eksempel fra sjøveien for
hver.

## effekt-1 – Effekt 1: Datakvalitet

Én. Datakvalitet. Data du kan stole på.

[[CLICK]] Data som er testet, kvalitetssikret og oppdatert.

Uten plattform er kvalitet noens innboks. En test noen husker å kjøre. Et
regneark som var riktig forrige tirsdag.

Med plattform ligger testene i pipelinen. Dårlige rader stoppes før de
sprer seg. Og dataene du henter i morgen er de samme dataene alle andre ser
på.

## effekt-2 – Effekt 2: Etterlevelse

To. Innebygd etterlevelse.

[[CLICK]] Auditlogger. Maskering av personopplysninger.

Personvernfilteret jeg nevnte. Fiskefartøy under femten meter, fritidsbåter
under førtifem meter. Det er folks arbeidsplass og folks fritidsbåt, og det
skal ikke ut i det åpne.

Uten plattform måtte hvert eneste system som bruker AIS-data huske den
regelen selv. NAIS, HAIS, API-ene, utslippsmodellen. Fire steder å glippe.
Med plattform ligger filteret ett sted, og alle nedstrøms får det gratis.
Samme med loggene. Du skrur dem ikke på etterpå. De er der allerede.

## effekt-3 – Effekt 3: Selvbetjening

Tre. Selvbetjente data.

[[CLICK]] Chat med dataene dine. Bestill selv.

Slik var det før: du sendte en e-post til en analytiker. «Kan jeg få
AIS-data for Oslofjorden i mars?» Og så ventet du. Analytikeren hadde tjue
slike i innboksen.

Slik er det nå: du går til hais.kystverket.no. Du tegner et område i kartet,
velger tidsrom og skipstype, og trykker bestill. Så leser plattformen gjennom
historikken og sender deg en Parquet-fil på e-post. Eller du spør dataene
direkte. Ingen mennesker i loopen. Analytikeren gjør analyse i stedet for
uttrekk.

## effekt-4 – Effekt 4: Fremtidsrettet

Fire. Fremtidsrettet. AI der dataene allerede bor.

[[CLICK]] Modellen kjører der dataene allerede bor. Integrert i pipelinene
dine.

Alle snakker om AI. Men AI trenger data, og dataene må bo et sted. Hos oss
bruker utslippsmodellen nevrale nett til å fylle hull i skipsregisteret. Og
det interessante er ikke modellen. Det interessante er hvor den kjører. På
samme plattform som dataene. I de samme pipelinene. Med samme
tilgangsstyring. Ingen kopierer data ut til en laptop eller et sideprosjekt.

En god plattform er forutsetningen for å lykkes med AI. Ikke omvendt.

## prosjekt – Historien om prosjektet

[35:00] 4 min. Neste kapittel 39:00.

Så. Nå har dere teorien. La oss gå tilbake til skipet vårt og fortelle
historien om hvordan det faktisk ble gjort.

Dette er historien om prosjektet. Fra én kilde til en plattform.

## dag-en – Dag én

<!-- TODO Peter: legg inn årstall for oppstart og faktisk teamstørrelse hvis du vil. -->

Dag én. Hva hadde vi?

[[CLICK]] Én kilde. AIS. Ikke noe annet. Ingen HR-data, ingen økonomi, ingen
losdata. Bare posisjoner.

[[CLICK]] Ett lite team. Det er viktig, og dere skal se hvorfor om et par
slides.

[[CLICK]] Og én strøm. Som aldri stopper. Ikke i jula. Ikke i kuling.
Og ikke når vi deployer. Skipene bryr seg ikke om release-planen vår.
Meldingene kommer uansett, hvert tiende sekund, fra hver eneste prikk på
kartet.

Så det første valget var: hva bygger vi på?

## azure-databricks – Azure + Databricks + Terraform

Verktøykassa vi valgte. Azure, Databricks og Terraform.

To ting, veldig kort, for dette er ikke et salgsforedrag. Men dere skal
forstå hvorfor det passet.

## azure – Azure: grunnmuren

Azure er grunnmuren.

[[CLICK]] Lagring, nettverk og identitet som ferdige byggeklosser.
[[CLICK]] Sikkerhet, tilgangsstyring og kostnadskontroll fra dag én, ikke
noe vi skrur på etterpå.

[[CLICK]] Og det integrerte godt med resten av organisasjonen. Identitet,
nettverk, det de allerede hadde. Vi ba dem ikke begynne på nytt.

## databricks – Databricks: motoren

Databricks er motoren oppå.

[[CLICK]] Det de kaller lakehouse. Datasjø og datavarehus i ett. Billig
lagring av rådata, og samtidig tabeller du kan kjøre SQL mot.

[[CLICK]] Og den skalerer regnekraften godt. Opp til mange terabyte.
Historikken er stor. Motoren må vokse med den.

[[CLICK]] Og Unity Catalog. Det er governance-laget fra i sted, i praksis.
Tilgangsstyring, lineage, katalog. Alt vi snakket om under governance bor
her.

Så. Hvordan deployer vi det? For det er én ting å velge Azure og Databricks.
En annen ting er å tørre å endre det.

## terraform-kode – Én ressurs. Tre miljøer.

Slik ser det ut i repoet.

Én ressurs. Et Databricks-workspace. Og en for_each over tre miljøer. Dev.
Test. Prod.

Samme blokk. Tre workspaces. Samme navnemønster. Samme region. Samme SKU.

Det er hele poenget med infrastruktur som kode. Vi klikker ikke workspacet
til live tre ganger. Vi beskriver det én gang.

Så hvordan får vi dette fra repoet og inn i Azure?

## terraform – Deploy og versjonskontroller infrastrukturen

Vi klikker ikke rundt i portalen. Vi committer.

Alt er infrastruktur som kode. Hele plattformen kan gjenskapes fra repoet.

[[CLICK]] En endring starter som en pull request. Den ligger i git. [[CLICK]]
Pipelinen kjører terraform plan. Alle kan se hva som faktisk skjer før det
skjer. [[CLICK]] Merge, så apply. Da blir det virkelighet.

[[CLICK]] Terraform beskriver Azure og Databricks. Ned til kataloger og
storage-containere. Ikke bare det store. Også bøttene dataene lander i.

Og poenget: hele plattformen kan gjenskapes fra repoet. Også om noen sletter
den. Det er en forsikring. Ikke et slagord.

## fire-states – Terraform: fire states. Fire pipelines.

Vi har ikke én Terraform-state. Vi har fire deployments. Og hver av dem er
duplisert på tvers av dev, test og prod. Fire ganger tre. Det blir tolv.

Hvorfor splitte dem? Fordi én stor state er én stor blast radius. En feil i
lagring skal ikke rive ned katalogen. En endring i workspacet skal ikke røre
kontonivået.

[[CLICK]] Workspace. Databricks-arbeidsområdet. Det teamet logger inn i.

[[CLICK]] Storage accounts. Lagring og containere. Inkludert raw. Der dataene
lander før Databricks ser dem. Husk det ordet. Raw. Vi kommer tilbake til
det når vi snakker om ingest.

[[CLICK]] Unity Catalog. Katalogene og tilgangsstyringen. Governance som
kode.

[[CLICK]] Databricks-kontoen. Kontonivå. Identitet, grupper, alt som ligger
over workspacet.

[[CLICK]] Fire deployments. Hver av dem i dev, test og prod. En endring i
lagring river ikke ned katalogen. Og en endring i dev rører ikke prod. Det er
hele poenget med å splitte.

Og før vi går dypere inn i ingest og pipelinene: hva bygger vi egentlig oppå
dette?

## teknisk-implementasjon – Tekniske implementasjonsdetaljer

[47:00] 2 min. Neste kapittel 49:00.

Kapittelskifte. Tilbake til hvordan det faktisk ble bygget. Ingest. Den
daglige jobben. Hvordan pipelinen er koblet sammen.

## ingest – Innlesingen skjer utenfor Databricks.

Så. Dataene. Hvor kommer de inn?

Innlesingen skjer utenfor Databricks. Databricks eier ikke antennen. Den
eier det som kommer etter raw.

Vi vil frikoble raw-jobbene fra Databricks. Databricks blir sannsynligvis
byttet ut en dag. Så det er billigere og mer robust å basere raw-innlesingen
på åpen kildekode.

[[CLICK]] Vi bruker Prefect. Et Python-bibliotek for å orkestrere jobber.
Ikke Databricks-jobs. Vanlige Python-jobber.

[[CLICK]] Jobbene henter data og dumper dem i storage. I raw. Ferdig. I
containerne Terraform nettopp laget.

[[CLICK]] Databricks leser derfra. Plattformen begynner når filen ligger der.
Ikke når skipet sender. Det er et bevisst kutt. Ingest er ett ansvar.
Lakehouse er et annet.

## ais-pipeline – Jobben som kjører hver dag

Dette er Databricks-jobben. AIS-orkestrering. Produksjon.

Ikke les nodenavnene. Publikum kan se dem. Pek på formen.

Til venstre: import. Rå AIS som kommer inn. Så en statussjekk for forrige
måned, og en månedlig backfill hvis vi trenger det. Så vifter det ut.
Kvalitet. Mappinger. Statiske poster. Skipsinfo. Så samles det igjen i
vasking, og ut til gold.

Det er ingest, slik den faktisk kjører. Én jobb. Hver dag. Hundre millioner
rader.

Og fortsatt: ingen klynger vi må drifte.

## stordata-volum – Strømmen er liten, historikken er stor

[49:00] 3 min. Neste kapittel 52:00.
Ligger du etter, kutt de to batch/streaming-slidene og behold volum pluss
serverless.

Kapittelskifte. Skalering. Strømmen og historikken. Hvordan vi får de
romlige joinene til å skalere. Og når du velger batch kontra streaming.

Klikk, klikk, klikk gjennom tallene. Rundt 5 GB rådata om dagen. Rundt 1,8 TB
i året. Rundt 40 TB AIS-historikk, tilbake til 2005.

Den daglige prosesseringen er lett. Tolv hundre rader i sekundet? Det er
småtteri. Det klarer en laptop.

Det tunge er historikken. Tjueett år. Rundt 40 TB med posisjoner. En full
historisk jobb er det vanskelige, på grunn av de 40 TB.

[[CLICK]] Og den historikken må vi kjøre gjennom på nytt. Ikke én gang. Hver
gang noe endrer seg. Ny versjon av utslippsmodellen. Ny utslippsfaktor. En
feil vi fant i vaskingen. Da må alle tjue årene regnes om.

## databricks-compute – Klynger er administrerte VM-er i Azure

Så hvordan kjører du egentlig de jobbene?

Databricks compute. Du starter en klynge. Og en klynge er bare administrerte
VM-er i Azure. Det er hele trikset. Databricks starter dem, Databricks
stopper dem. De bor i vår subscription.

[[CLICK]] Du skalerer klyngen etter volumet. Mer data, større maskiner. Eller
flere av dem.

[[CLICK]] En terabyte gjennom jobben? Da trenger du en ganske stor VM. Husker
dere historikken? Rundt 40 TB. Det er ikke en laptop-jobb.

[[CLICK]] Og her er det folk tar feil av. Ikke alt må passe i minnet
samtidig. Spark deler opp dataene. Den leser en bit, jobber med den, skriver
den ut, tar neste bit.

[[CLICK]] Så VM-størrelsen er ikke «får det plass». VM-størrelsen er «hvor
lang tid tar det». Samme jobb. Liten klynge, du venter. Stor klynge, du får
svaret i dag.

Vi brukte ganske mye tid på å få den skaleringen helt riktig.

## serverless – Serverless vs. manuell tuning

Serverless.

Se på tegningen. Samme last, samme klokke. Til venstre gjetter vi en
størrelse, venter på at klyngen våkner, og hopper med slideren når toppen
allerede har kommet. Til høyre bestemmer jobben. Kapasiteten følger kurven.

Husker dere HAIS? Én uke for ett fartøy, eller alle skip i ett år. Det er
derfor serverless passer. Jobben bestemmer størrelsen. Ikke vi.

Husker dere det lille teamet som skulle sove om natta? Det er her det kommer
inn. Ingen klynger å starte, patche eller skalere. Ingen som får en alarm
klokka fire fordi en node døde.

[[CLICK]] Autoskalering var billigere enn manuell skalering. For oss. Vi
slapp å gjette størrelsen på en klynge og så sitte på ubrukt kapasitet, eller
kjøre for lite og se køen vokse. Kapasiteten følger strømmen. Mer trafikk om
dagen enn om natta, mer om sommeren enn om vinteren, og plattformen skalerer
opp og ned selv. Og vi betaler for det vi bruker. Ikke for det vi frykter vi
kommer til å trenge.

[[CLICK]] Det sparte tuning-tid. Ingen på teamet som bruker kveldene på
klyngekonfig. Spark-innstillinger. Spot kontra on-demand. Når denne jobben
skal skaleres og når den andre skal få stå.

[[CLICK]] Og det sparte oppstartstid. Ingen venting på at en klynge skal
våkne før jobben kan starte. Strømmen venter ikke. Historikkjobbene venter
ikke. Vi venter ikke.

For et lite team er dette forskjellen på å bygge produkt og å drifte
infrastruktur. Vi valgte produkt.

## batch-vs-streaming – Batch vs. streaming: flyten

Den historikkjobben er batch. Den daglige strømmen er streaming. Et lite
sidespor, for det er et valg dere kommer til å måtte ta.

Se på animasjonen. Øverst samler batch opp data og flytter dem med faste
intervaller. En gang i timen, en gang i natta. Nederst sender streaming hver
hendelse videre i det øyeblikket den skjer.

Og her er poenget mange bommer på: forskjellen handler ikke om teknologi.
Den handler om hvor ferske dataene må være. Trenger sjøtrafikksentralen å
vite hvor skipet er nå? Ja, det er streaming. Trenger klimaregnskapet å vite
hvor skipet var i fjor? Det kan gjerne kjøre om natta.

## batch-streaming-valg – Når velger du hva?

Så når velger du hva?

Klikk gjennom batch-punktene. Batch passer for rapporter og historiske
analyser. For store volumer, fordi det er billig. Og for kilder som uansett
kommer i bolker, som en nattlig eksport fra et gammelt system.

Klikk gjennom streaming-punktene. Streaming passer når du faktisk må reagere
nå. Overvåking og varsling. Hendelsesdrevet automatisering. Og når ferskhet
er viktigere enn kostnad.

[[CLICK]] Og i praksis trenger du som regel begge. Mitt råd: start med batch.
Det er enklere og billigere. Legg til streaming der ferske data faktisk
endrer en beslutning. Ikke fordi det er kult.

Hos oss kommer AIS-strømmen inn fortløpende. Men mye av det vi bygger oppå
kjører i batch. Begge deler, i samme plattform.

## stordata-compute – Døgn med kjøretid, eller timer?

Og da blir spørsmålet: hvor lang tid tar det?

Klikk gjennom fast klynge. På klassisk compute bestemmer du størrelsen på
klyngen før jobben starter. En full reprosessering kan bruke flere døgn. Og
har du flere slike jobber, står de i kø. Så du sitter der og venter på
fredag.

Klikk gjennom autoskalering. Med autoskalering følger kapasiteten datamengden
i jobben. Den skalerer opp der det er mye å gjøre, og ned igjen etterpå.
Døgn blir timer, fordi vi kan bruke bredden.

[[CLICK]] Og her er nyansen jeg vil at dere skal ta med: regningen blir
omtrent den samme. Du betaler for arbeidet, ikke for tiden det tar.
Forskjellen er at du får svaret i dag i stedet for på fredag. Og for den som
venter på tallet, er det hele forskjellen.

Regnekraft er bare halvparten. Den andre halvparten er spørsmålene vi
stiller dataene.

## math-opt – Matematiske optimaliseringer

[52:00] 3 min. Neste kapittel 55:00.
Hvis totalen allerede har passert 52:00, hopp over dette kapittelet. Gå til
veien videre.

Mye av det romlige arbeidet er to spørsmål.

Er dette punktet inne i dette området? Contains within. En havn. Et
oppdrettsanlegg. Den økonomiske sonen.

Og hvilke punkter ligger nær hverandre? Nær land. Nær en plattform. Nær
skipet vårt.

Hvert produkt vi nettopp snakket om stiller de spørsmålene.

[[CLICK]] Over milliarder av punkter eksploderer den jobben. Hvert punkt mot
hvert annet punkt. Geometri på hver rad. Det blir ikke ferdig.

[[CLICK]] Så det gjør vi ikke. Vi grupperer punktene i hekser. Ubers H3.

## h3-hexes – Hekser i hekser

Dette er H3.

Planeten, delt inn i hekser. Hekser inni hekser. Hver celle har en unik id.
Et heltall. Det er det vi lagrer på hvert AIS-punkt.

[[CLICK]] Og det er seksten oppløsninger. Fra hekser på størrelse med land,
ned til hekser på rundt én meter.

Du velger oppløsningen som passer spørsmålet. Nær en havn er et
kilometerspørsmål. Finarbeid kan gå mindre. Samme system.

## hex-join – En join på et tall

Og her er hvorfor det skalerer.

Samme spørsmål, hundre millioner ganger om dagen. Er dette punktet inne i
dette området? Nær en havn. Nær et oppdrettsanlegg. Nær en oljeinstallasjon.
Inne i den økonomiske sonen.

Den vanlige måten er geometri. ST_Within. Matte på hver rad. En bounding
box-test, så punkt-i-polygon mot hver kant. Greit for tusen punkter. Ikke
for hundre millioner.

[[CLICK]] H3 er en BIGINT. Et heltall. Den joiner og grupperer som enhver
annen kolonne. En hash join. Geometrien rører vi aldri.

Én hake. Heks-id-en må allerede ligge på tabellen du joiner mot. Regner du
den ut fra lon-lat mens spørringen kjører, er det ingenting å prune. Motoren
må se på hver rad uansett. Vi genererer den én gang, når dataene lander. Så
er joinen bare et tall.

Det gjør vi på MarTraf, MarU og KystRisk.

Mønsteret, hvis du fortsatt trenger det eksakte svaret: prune med
heks-joinen. Avgjør restene med geometri etterpå. MarTraf stopper stort sett
ved heksen.

Ett eksempel. Er dette skipet nær land? Vi regner ikke ut den eksakte
avstanden til kystkonturen. Vi spør: er det innenfor en k-ring eller to fra
en land-heks? Hvis ja, er is_close_to_shore lik true.

Den testen, ganger to milliarder rader, er mye enklere enn geodetisk avstand
på hver rad.

Fasene bruker samme målestokk. En brønnbåt ved et oppdrettsanlegg er én
heksagon og under én knop. Avstand er bare hvor mange celler unna.

## h3-ship – Ett skip på heksnettet

Slik ser det ut for ett skip.

Sporet er bare punkter. Hvert punkt lander i en heks.
Avstand blir «hvor mange celler unna». Det er joinen vi nettopp snakket om.

Er skipet vårt i samme heks som en havn, er det i havna.
Er det én celle ut, er det i nærheten. Det er hele testen.

Nå er disse cellene veldig store, men heksene skalerer selvsagt helt ned til én meter. Så vi velger oppløsningen som passer for den aktuelle jobben.

## modeller – Fra posisjoner til utslipp

[39:00] 8 min. Neste kapittel 47:00. Dette er gevinsten. Følg skipet.
Ligger du etter, kutt maru-hull og KystRisk.

Kapittelskifte. Vi har verktøykassa. Azure, Databricks, Terraform. Før vi
går inn i ingest og pipelinene, her er hva vi faktisk bruker dataene til.

MarTraf ligger oppå strømmen. Så deler det seg. MarU, KystRisk.
Og HAIS, hvis du bare vil ha historikken. I dag følger vi skipet vårt
gjennom MarTraf og MarU.

Kortversjonen: MarTraf gjør posisjoner om til seilaser. Så kan flere
produkter stille forskjellige spørsmål til de samme seilasene.

## modell-flyt – Én kilde, mange dataprodukter

Først arkitekturen, kort.

[[CLICK]] AIS-rådata inn. [[CLICK]] HAIS, hvis du bare vil ha historikken.
Uttrekk på bestilling. Parallelt med trafikkmodellen, ikke foran den.
[[CLICK]] MarTraf vasker og beriker. Det er det felles laget. Seilaser,
faser, trafikktype.

[[CLICK]] Så deler det seg. MarU regner energi og utslipp. Klimaregnskap for
kommunene.

[[CLICK]] KystRisk. Ulykkesrisiko. Kollisjoner og grunnstøtinger. De samme
seilasene, et annet spørsmål.

Og her er poenget for dere som bygger systemer. Forgjengeren, Havbase,
gjorde alt i én modell. Én stor svart boks. Nå har vi én kilde, og mange
dataprodukter oppå. MarTrafs output er et produkt andre kan bygge på.

Kjenner dere igjen det? Det er dataprodukt-tenkingen fra tidligere. I
praksis.

Og en bonus: Havbase var utviklet og driftet av en ekstern partner. MarU er
Kystverkets grep for å eie forutsetningene og beregningene selv.

## hais – HAIS: historisk uttrekk på bestilling

Ett output til. Enda et produkt. En tjeneste på historikken. HAIS.

[[CLICK]] Hvem som helst kan gå til hais.kystverket.no og bestille inntil ett
år med historiske AIS-data. Tidsrom, område som polygon, skipstype eller ett
enkelt fartøy. [[CLICK]] Det starter en jobb som leser gjennom historikken og
filtrerer. [[CLICK]] Og resultatet kommer som GeoParquet eller CSV på e-post.

Og her er poenget: vi vet ikke på forhånd hva neste bestilling er. Er det
ett fartøy i én uke? Eller alle skip i ett helt år? Den første tar sekunder.
Den andre er en skikkelig jobb. Jobben bestemmer størrelsen. Ikke vi. Vi
slipper å gjette.

Det er også derfor vi kan hente ett ekte skip ut av tjueett år og se det
bevege seg.

## asuka-hais – Asuka, fra HAIS

Et ekte skip. Hentet ut av HAIS.

Og så det åpenbare spørsmålet.
HVEM ER ASUKA?

## asuka-hvem – Hvem er Asuka?

Hvem er Asuka?

Hun er en japansk wrestler.

Tre dager godt brukt for et par tusen cruisepassasjerer.

## folg-ett-skip – Følg ett skip

Nå følger vi skipet vårt.

[[CLICK]] Det ligger til kai i Bergen. Klokka er 22:40. Null knop. AIS-en
sender hvert tredje minutt, for skipet står stille.

[[CLICK]] Så løsner det og manøvrerer ut Byfjorden. Under tre knop. Nå sender
det oftere.

[[CLICK]] Og så setter det kursen nordover. Cruising. Ni knop. Og klokka 03:14
passerer det Stad, i kuling, og sender meldingen vi startet med. Ett punkt
av tusenvis.

[[CLICK]] Utenfor Ålesund er det ikke kaiplass ennå. Så det ankrer. 0,2 knop,
driver litt rundt ankeret.

[[CLICK]] Og klokka 09:15 ligger det til kai i Ålesund.

[[CLICK]] Rundt 3 800 AIS-punkter er blitt én seilas. Havn til havn. Og
hvert punkt har fått en fase. Uten fasene er alt bare «et skip». Med dem vet
vi hva skipet holdt på med i hvert eneste punkt. Og det er forskjellen på
støy og kunnskap.

Dere så nettopp ett skip bli én seilas. Zoom ut nå.

Hundre millioner punkter om dagen. Og tjueett år med dem.
Det er mye AIS. Men som det er, er det nesten ubrukelig.
Hvert punkt sier hvem, hvor, hvor fort. Det er alt. Ingen seilas. Ingen
«dette skipet gikk fra Bergen til Ålesund». Ingen struktur.

[[CLICK]] For å gjøre noe med det måtte vi gruppere det. I biter.
Du kan ikke regne på hundre millioner ensomme prikker. Du trenger en
arbeidsenhet.

[[CLICK]] De naturlige bitene var seilaser. Havn til havn.
Det er det et skip faktisk gjør. Det er det MarTraf bygger.
Faser, segmenter, trafikktype. Alt det ligger på seilasen.

[[CLICK]] Og så traff vi skaleringsproblemet.
Å spørre «er dette punktet nær en havn» hundre millioner ganger, med ekte
geometri, blir ikke ferdig. Så vi forenklet kartet.

Jeg kommer tilbake til hvordan. Først: hva gjør vi med seilasene?

Hvis du vil ha de fem stegene senere: geografisk berikelse, elleve faser,
seilassegmenter på minst fem minutter, komplette seilaser havn til havn, og
trafikktype.

Og nå kan vi stille neste spørsmål. Hva brenner skipet?

Hvorfor er fasen så viktig? Et offshorefartøy som holder posisjonen ved en
plattform bruker enormt med energi. Samme fartøy i tørrdokk med AIS-en på
bruker nesten ingenting. Begge står stille. Uten fase ser de like ut.

## martraf-video – MarTraf på kartet

Dette er MarTraf langs kysten.

Ikke fortell om hver celle. La det kjøre. Så: hundre millioner punkter ble
seilaser du faktisk kan se. Det er produktet.

## propellloven – MarU: maritim utslippsmodell

Så, MarU.

Det er veldig viktig for oss, for å ha en ren kyst, at vi følger med på klimagassutslippene fra skipene våre.

[[CLICK]] To AIS-punkter. Avstand over tid. Det er farten til skipet.
Skipet vårt utenfor Stad. Ni knop.

[[CLICK]] Og vi kjenner skipet. Registeret forteller hvilken type det er.
Hvor stort. Hvordan det ble bygget for å seile. Et lasteskip er ikke en
fiskebåt.

[[CLICK]] Så anslår vi hva det brente i den farten. Effekten følger farten i
tredje potens. Dobler du farten, trenger du åtte ganger effekten. Åtte
ganger. Det er derfor rederiene sakker ned når drivstoffet blir dyrt. Det er
derfor et skip som går i ni knop i stedet for tolv sparer enormt.

[[CLICK]] Og her er setningen jeg vil at dere skal huske fra hele foredraget:
hvert AIS-punkt blir en utslippsberegning.

Det er derfor hundre millioner rader om dagen ikke er skryt. Det er en
konsekvens av metoden. Skal du regne utslipp per punkt, trenger du hvert
punkt.

## maru-hvorfor – Hvordan ble det gjort før?

Så hvordan ble det gjort før?

[[CLICK]] Salgstall. SSB regner utslipp fra innenriks sjøfart ut fra hvor
mye drivstoff som ble solgt.

[[CLICK]] Men fartøy bunkrer i utlandet og seiler her. Og de bunkrer her og
seiler ut. Salgstall beskriver hvor drivstoffet ble kjøpt. Ikke hvor det ble
brent.

[[CLICK]] MarU snur det. Regn fra observert aktivitet i stedet. Og skill
innenriks fra til og fra utlandet og gjennomfart. Da vet du hva som faktisk
skjedde i norske farvann.

## maru – Den maritime utslippsmodellen: MarU

Det er metoden. Nå modellen selv.

[[CLICK]] Python og PySpark. Beregnet på Databricks.

[[CLICK]] Hovedmotoren regnes fra propellloven. Hjelpemotorer og kjeler regnes
per operasjonsfase. Og nå ser dere hvorfor vi trengte fasene fra MarTraf. Et
skip til kai bruker hjelpemotor til strøm og varme, ikke hovedmotor. Uten
fase hadde vi regnet feil.

[[CLICK]] Rundt 330 inputvariabler. Utslippsfaktorer, lavlastjusteringer,
svovelgrenser per utslippskontrollsone, GWP-faktorer. Det er mange knapper.

[[CLICK]] Og skipsregisteret. Fem kilder slått sammen, med versjonering av
alt som endrer seg. S&P, ShipInfo, SafeSeaNet, NOR og NIS, og
fiskefartøyregisteret. For et skip bytter navn, eier og motor i løpet av
livet.

## maru-hull – Fyller hullene i skipsregisteret med ML

Og nå den ærlige delen.

[[CLICK]] Skipsregisteret vi trenger for å anslå utslipp er fullt av hull.
Særlig for de små fartøyene. Vi vet at skipet finnes, men ikke hvilken motor
det har, eller hvor fort det egentlig er designet for å gå.

[[CLICK]] De enkleste hullene fyller vi med medianverdier per skipstype og
lengdeintervall, med minst seks observasjoner per gruppe.

[[CLICK]] De vanskeligere fyller vi med nevrale nett. Servicefart, turtall og
slagtype. Turtallet har til og med en egen tapsfunksjon på relativ feil, for
å ikke overtilpasse på høyturtallsmotorer.

[[CLICK]] Og tallet som overrasket meg: rundt sytti prosent av fartøyene i
norske farvann i 2022 og 2023 manglet drivstofftype i registrene. Sytti
prosent. Den fylles etter IMOs metode.

Poenget: her brukes maskinlæring som datakvalitetsverktøy. Ikke som en
AI-feature å vise på forsiden. Som et verktøy for å fylle hull. Og det er
kanskje den mest nyttige bruken av ML jeg har sett.

[[CLICK]] Og alt er åpent. github.com/Kystverket/maru. Dere kan lese hele
beregningen i pausen.

## maru-ut – Hva kommer ut?

Så hva kommer ut i andre enden?

[[CLICK]] Utslipp. CO2 og CO2-ekvivalenter, metan, NOx, SOx, svevestøv. Pluss
energibehov, drivstofforbruk, distanse og driftstimer.

[[CLICK]] Fordelt på fjorten skipstyper og ni størrelser.
Bruttotonnasjen er splittet finere enn før, fordi norske farvann har veldig
mange små fartøy.

[[CLICK]] Geografisk: kommune, fylke, havområde.

[[CLICK]] Og
innenriks, utenriks, gjennomfart.

Og det gjør at du kan stille spørsmål som dette: hvor mye CO2 slipper de største cruiseskipene ut i Geiranger i juli, mens de ligger stille? Det kan vi svare på. Per skip, per måned.

Og så det store: Miljødirektoratet legger opp til å bruke MarU-tallene i klimaregnskapet for kommunene. Plattformen ender i offisiell statistikk.

## veien-videre – Veien videre

[55:00] 5 min. Land på takk innen 60:00. Spørsmål hvis du har tid.

Hvor er vi nå, og hvor skal vi?
Hva er veien videre.

## hvor-vi-er – Hvor vi er: én kilde, én katalogstruktur

I dag har vi «bare» AIS. Én kilde, ett domene.

Katalogstrukturen er klassisk medallion. Tre databaser i Databricks.

[[CLICK]] Og dataproduktene vi leverer i dag kommer alle ut av gold. AIS-tracks,
MarTraf, MarU, HAIS.

[[CLICK]] Dette funker fint så lenge alt er AIS. Én kilde. Ett domene. Greit
for nå. Men vi skal utvide.

## flere-domener – Ikke bare AIS

AIS fikk oss hit. Men Kystverket er større enn skipsposisjoner. Vi vil
utvide. Flere domener. Ikke bare AIS.

[[CLICK]] Toll. Deklarasjoner og last. Hva skipet faktisk fraktet, ikke bare
hvor det var.

[[CLICK]] Intern HR og økonomi. Lønn. Regnskapet. Hva ting koster.

[[CLICK]] Prediktivt vedlikehold av fyrene. Sensorer på lyktene som holder
kysten opplyst. Send ut en båt før en lykt slukner.
120 fyr langs kysten og over 2000 lykter.

[[CLICK]] Og mange flere. Ting vi allerede samler inn. Andre etater. Det som
kommer.

[[CLICK]] Så vi trenger en arkitektur som skalerer.
Der vi har et tydelig skille i eierskap.
Der delte data er godt dokumentert og pålitelige, så domenene kan bygge på hverandres data.

## hvor-vi-skal-helhet – Hvor vi skal: hele bildet

Så vi bygger en ny dataarkitektur.

[[CLICK]] Domener først. Toll, AIS, HR og økonomi, fyrene. Hvert med sin egen
database i Databricks, sitt eget team, sitt eget kostnadssenter, sitt eget
forvaltningsansvar.

[[CLICK]] Kilder. Hvert domene leser inn sine egne. Toll har deklarasjonene
og lastemanifestene. AIS har strømmen og skipsregisteret. HR og økonomi har
lønn og regnskap. Fyrene har sensorer og vedlikeholdsloggen. Domenet leser
dem inn. Ikke plattformteamet.

[[CLICK]] Inni hver katalog, samme bronze, silver, gold som vi har hatt for
AIS. Rått som det kom. Vasket og beriket. Klart til bruk. Mønsteret endrer
seg ikke. Det gjentas én gang per domene. Ingen rører et annet domenes
rådata.

[[CLICK]] Når et domene vil dele noe, skriver det en datakontrakt. Open Data
Contract Standard. Id, eier, skjema, kvalitetskrav. Eid av domenet. Ikke av
plattformteamet.

[[CLICK]] Kontrakten pushes til ett sentralt repo. Pull request. CI validerer
kontrakten mot gold-tabellen den peker på.

[[CLICK]] Og så det som gjør at dette skalerer: CI oppretter automatisk et
view i dataprodukt-katalogen. Ingen kopiering av data. Viewet peker rett på
domenets gold-tabell. Konsumentene trenger bare å kjenne én katalog, uansett
hvor mange domener som ligger bak.

[[CLICK]] Hvem leser fra den katalogen? Alle utenfor domenene.
Miljødirektoratet og kommunene med klimaregnskapet. Utviklere gjennom
BarentsWatch. Analytikere med dashbord. Forskere. Andre etater. Én katalog.
Innenfor eller utenfor, du leser fra samme sted.

[[CLICK]] Og domenene selv. Toll vil ha AIS-tracks ved siden av
deklarasjonene. De går ikke til hverandres gold-tabeller. De leser fra
dataprodukt-katalogen, som alle andre. Samme kontrakt, samme view, samme
regler.

[[CLICK]] Og explorer.kystverket.no, bygget fra kontraktene i samme repo. Den
kjenner hvert produkt, hvem som eier det, skjemaet, kvalitetssjekkene,
versjonen. Søk på «ais» og du får produktene. Finn det i exploreren. Les det
fra katalogen.

## videre-liste – Dette vil vi få til

Og så det vi vil få til. Tilbake til visjonen vi åpnet med: verdens sikreste
og reneste kyst. Det er fortsatt hvorfor-et. Dette er noen av de neste
hvordan-ene. Vi jobber i batch. Ikke sanntid. Så dette handler ikke om
beredskapsvarsler. Det handler om å få mer av det vi allerede har inn på
plattformen, og bruke det.

[[CLICK]] Mer av Kystverkets egne data i dataplattformen. Kystdatahuset har
rundt 130 datasett. Seilaser. Ting vi allerede samler inn, som ikke er på
plattformen ennå. Neste jobb er å få dem inn.

[[CLICK]] Tollanalyse. Enda et domene som kommer inn. Deklarasjoner ved siden
av AIS og seilaser. Hva som faktisk ble fraktet, ikke bare hvor skipet var.

[[CLICK]] Prediktivt vedlikehold av fyrene. De som holder kysten opplyst.
Sensorer, historikk, når man skal sende ut en båt. Ikke når en lykt allerede
har sluknet.

[[CLICK]] Og raskere, bedre organisering. Tydeligere eierskap. Mindre venting.
Plattformen som en måte å jobbe på, ikke bare et sted å legge tabeller.

Men før vi avslutter, skal vi tilbake til skipet vårt.

## tilbake-til-stad – Tilbake til Stad

Rolig tempo. Dette er slutten. La det lande.

Klokka er 03:14.

Et skip er ute på havet.

[[CLICK]] Stadhavet. Februar. Nordvest kuling.

[[CLICK]] Et lasteskip på vei nordover i ni knop.

[[CLICK]] Vi lytter.

Og kanskje er det betryggende for mannskapet, som sover i køyene sine. At et
sted der ute, i en dataplattform, lytter vi.

Og om en måned ligger dataene i et klimaregnskapsverktøy i kommunen også.

## takk – Takk. Prøv selv.

Takk.

Alt jeg har vist dere er åpent. Sanntidskartet på nais.kystverket.no.
Historikk på bestilling på hais.kystverket.no. Den rå AIS-strømmen på en
TCP-port, uten registrering, hvis du vil koble deg rett på. Live-API hos
BarentsWatch for dere som vil bygge noe. Og hele utslippsmodellen på GitHub.

Bygg noe med det. Og fortell meg hva dere bygde.

QR-koden tar deg til peterbull.no hvis du vil ta kontakt.

Spørsmål?

## kystrisk-tti – Kystrisk: Hva er sannsynligheten for å treffe?

Hvorfor-et vårt igjen. Verdens sikreste og reneste kyst.

Vi vet hvor hver båt er. Vi har nøyaktige kart over skjærene og landet.

TTI. Time to impact. Fortsetter du på denne kursen, hvor lang tid tar det før du treffer?

[[CLICK]] Risiko er et tall fra 0 til 1. Basert på kursen du har nå. Høy TTI,
og risikoen går mot null.

## kystrisk – Den maritime risikomodellen: KystRisk

Samme seilaser fra MarTraf. Et annet spørsmål.

Ikke hva skipet brente. Hva skipet kan treffe.

[[CLICK]] Hvert AIS-punkt får en risikoscore.

[[CLICK]] Så ser vi etter fjordene der den scoren holder seg for høy.

[[CLICK]] Og det er slik du tegner et kystkart på nytt. Gi skip tillatelse.
Eller nekte dem.

[[CLICK]] Fortsatt under utvikling. Vi regner med å publisere det innen
utgangen av året.

Har du dårlig tid, holder én setning: samme seilaser, en risikoscore, kart
som endrer hvem som får seile.
