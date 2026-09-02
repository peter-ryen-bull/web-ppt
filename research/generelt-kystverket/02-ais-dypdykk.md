# AIS – dypdykk (hovedfokus)

> Skjermbilder: `screenshots/02-kystverket-ais-oversikt.png`, `screenshots/03-kystverket-tilgang-ais-data.png`, `screenshots/04-nais-sanntid-trafikk.png`, `screenshots/08-historisk-ais-nedlasting.png`, `screenshots/11-barentswatch-live-ais-api.png`

## Hva er AIS?

AIS (Automatic Identification System) ble opprinnelig laget som antikollisjonssystem: skip kringkaster identitet (MMSI), posisjon, fart og kurs over VHF. Meldingsfrekvensen varierer fra et par sekunder til flere minutter avhengig av fart og status. I dag er AIS ryggraden i norsk sjøtrafikkovervåking, beredskap og trafikkstatistikk.

## AIS Norge – infrastrukturen

Kystverket eier og drifter det nasjonale AIS-nettverket **AIS Norge**, etablert (landbasert) i 2005:

- **~90 basestasjoner** på fastlandet og Svalbard. Dekker med få unntak området fra grunnlinjen og 40–60 nautiske mil ut fra kysten, kontinuerlig.
- **Egne AIS-satellitter** for havområdene: første (AISSat-1) skutt opp allerede i 2010. Senere AISSat-2 (2014), NorSat-1 og -2 (2017), NorSat-3 (2021, kan også fange radarsignaler), NorSat-TD (skadet av solstormer i 2024) og **AISSat-4 (mars 2026)** – bygget på rekordtid for ca. 15 MNOK og fanger minst 1,5 millioner unike AIS-signal per døgn. Per september 2026 har Norge fire operative AIS-satellitter.
- Hver satellitt passerer norske havområder hvert 90. minutt og leverer trafikkbilde i 5–10-minuttersvinduer. Data lastes ned via bakkestasjoner i Vardø og Tromsø.
- Satellittene er utviklet i samarbeid med Norsk Romsenter/Direktoratet for romvirksomhet, FFI og Kongsberg Seatex, og driftes av Statsat.

## Datavolum (godt tall til presentasjonen)

- **2006: ~2 milliarder AIS-meldinger**
- **2021: 8,9 milliarder AIS-meldinger** fra basestasjoner + satellitter (ca. 5 mrd fra skipsfarten i norske farvann)
- Kystdatahuset har AIS-data lagret **tilbake til 2006**.

## Hvem bruker dataene?

- Kystverket selv: sjøtrafikksentraler, beredskap, analyser.
- Andre myndigheter: Forsvaret, politiet, Tolletaten m.fl. får dataene videreformidlet.
- Internasjonalt: Kystverket drifter/koordinerer regionale AIS-datasentre for Nord-Atlanteren, Nordsjøen og Østersjøen (EMSA-samarbeid) og sender trafikkdata til 17 land.
- Søk og redning: Hovedredningssentralene bruker **virtuelle AIS-posisjonsmerker** sendt ut via basestasjonene.
- Blue Justice Ocean Surveillance Program: mottar AIS-data for å avdekke ulovlig fiske.
- Publikum og utviklere: via de åpne kanalene under.

## Åpne AIS-data – hva er tilgjengelig?

**Dekning:** norsk økonomisk sone + fiskevernsonen ved Svalbard + vernesonen ved Jan Mayen.

**Personvernbegrensninger i den åpne delen:**
- Ingen fiskefartøy under 15 meter
- Ingen fritidsfartøy under 45 meter
- (Live-API-et hos BarentsWatch: ikke data eldre enn 14 dager)

**Lisens:** Norsk lisens for offentlige data (**NLOD**). Gratis, ingen brukerregistrering for rådatastrømmen, men Kystverket skal krediteres som kilde.

**Utvidet (lukket) tilgang:** myndigheter og aktører med avtale kan få alt, inkl. små fiskefartøy – krever søknad/e-postbekreftelse og at dataene ikke brukes kommersielt.

## De seks tilgangskanalene

1. **NAIS** (nais.kystverket.no) – åpent sanntidskart over all trafikk, utviklet av BarentsWatch for Kystverket. Søk på fartøy, historikk to uker tilbake, filtrering på flagg/type, og en **innbyggingsløsning (embed)** for å vise trafikk på egne nettsider.
2. **BarentsWatch Live AIS API** – åpen sanntidsstrøm (inkl. satellittdata) for utviklere. Gratis registrering på barentswatch.no, OAuth2 client credentials (`https://id.barentswatch.no/connect/token`, scope `ais`).
3. **BarentsWatch Historic AIS API** – f.eks. `GET https://historic.ais.barentswatch.no/v1/historic/trackslast24hours/{mmsi}`.
4. **Rå AIS-strøm over TCP**: `153.44.253.27:5631` (IEC 62320-1-format). Ingen registrering.
5. **Historisk AIS-nedlasting** (hais.kystverket.no) – selvbetjent bestilling av inntil ett år med data fra basestasjoner og satellitter. Filtrer på skipstype, enkeltfartøy (MMSI/IMO/kallesignal) eller område (WKT-polygon). Format: **(Geo)Parquet eller CSV**, leveres per e-post.
6. **Kystdatahuset** (kystdatahuset.no) – dashbord + API på vaskede AIS-data med genererte seilas-tracks (detaljer i `03-datalandskap-bredde.md` og `04-apne-data-tilgang-og-api.md`).

## Kilder

- https://www.kystverket.no/sjotransport-og-havn/ais/
- https://www.kystverket.no/sjotransport-og-havn/ais/ais-artikkelside/ (AIS Norge)
- https://www.kystverket.no/sjotransport-og-havn/ais/tilgang-pa-ais-data/
- https://www.kystverket.no/sjotransport-og-havn/ais/nais---folg-sjotrafikken-i-sanntid/
- https://www.kystverket.no/nyheter/2022/tilbyr-apne-ais-data-i-ny-og-bedre-drakt/
- https://developer.barentswatch.no/docs/AIS/live-ais-api
- https://hais.kystverket.no/
- kystogfjord.no / kystmagasinet.no om AISSat-4 (2026)
