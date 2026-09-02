# Datalandskapet i bredden

> Skjermbilder: `screenshots/05-kystdatahuset-forside.png`, `screenshots/06-kystdatahuset-data-i-losningen.png`, `screenshots/09-kystinfo-kart.png`, `screenshots/10-kystverket-tjenester.png`, `screenshots/12-data-norge-kystverket.png`, `screenshots/13-geonorge-kystverket.png`

## Kystdatahuset – Kystverkets dataplattform utad

kystdatahuset.no er "Kystverkets portal for enkel tilgang til sjøtrafikkdata via interaktive dashbord, API-er og nedlastbare datasett". Dette er den mest relevante parallellen til en moderne dataplattform:

- **131 innholdselementer** fordelt på tre typer: *Datasett*, *Applikasjon* og *Dashboard*.
- Kategorier: Utbygging, Sjøvegen, Sjøtransport, Navigasjon, Miljøberedskap, Losfaglige anbefalinger.
- **KI-agent** for søk i datasett og applikasjoner (fremhevet på kystverket.no-forsiden).
- Oppdateres hver natt.

**Datakildene bak:**

| Kilde | Innhold | Historikk |
|---|---|---|
| AIS | Full-oppløselige, "vaskede" posisjonsdata + genererte seilas-tracks | Lagret fra 2006, spørrbart fra 2013 |
| SafeSeaNet | Ankomst-/avgangsmeldinger fra skip (meldeplikt over 300 BT) | Fra 2010 |
| Njord | Lospliktige seilas og losbestillinger | Fra 2010 |
| Skipsoversikt | Fartøysinformasjon som beriker AIS/SSN-data | Løpende |

**Eksempler på dashbord:** Ankomster i Norge (anløpsstatistikk per fylke/kommune/skipskategori/flaggstat), Cruiseankomster og cruisepassasjerer (inkl. nasjonalitet), Passeringslinjer (trafikktelling over linjer i kart), Spor skip, Sporing i område, Hastighet, Daglig trafikk på ni utvalgte passeringslinjer. Alt kan eksporteres til Excel, noe også i GIS-format.

**Datadelingsportalen** ("Data og tjenester") tilbyr 30–40 nedlastbare datasett, bl.a. alle SafeSeaNet-ankomster per år (2014–2020) og geodatasett.

## SafeSeaNet Norway – skipsfartens single window

- Nasjonal meldingsportal (shiprep.no): skip melder ankomst/avgang **én gang**, og opplysningene går automatisk til Kystverket, Sjøfartsdirektoratet, Politiet, Tolletaten, Forsvaret, Miljødirektoratet og havnene.
- Sparer skipsfarten for ca. **250 000 skjemaer årlig**.
- Losbestilling skjer her.
- Fra desember 2023 utvidet til også å omfatte innenriks passasjerfartøy og ferger i rutefart.
- Utveksler data med tilsvarende systemer i EU/EØS (EMSA SafeSeaNet).
- Åpne innsyn: "Current Voyages" (pågående seilaser), søk i losbestillinger.

## Geodata – Kystinfo, Geonorge og data.norge.no

**Kystinfo** (kystinfo.no) er kartløsningen: Kystverkets egne kartlag pluss data fra en rekke andre etater (sjøkart, eiendom, natur- og kulturverdier). Egen nedlastingsmodul der man kan utforske datasett i kartet og laste ned i **SOSI, Esri Shape, FGDB, KML, GML og GeoJSON** – landsdekkende, per fylke/kommune eller egendefinert område. Egen beredskapsvariant ("Kystinfo beredskap") for aksjoner mot akutt forurensning.

**Typiske åpne geodatasett** (Geonorge/data.norge.no/datadelingsportalen):

- Farleder: hovedled og biled (forskriftsfestet farledsstruktur – nasjonalt referansesystem for kystsonen)
- Navigasjonsinstallasjoner (fyr, lykter, merker) – også som WMS/WFS
- Ankringsområder for sjøtransporten
- Nødhavner (forhåndsevaluerte lokaliteter i beredskapsplanverket)
- Fiskerihavner
- Losbordingsfelt og ISPS-havneanlegg
- Beredskapsdepoter
- Aktsomhetsområder og IMO-anbefalte ruter
- Fartsrestriksjoner
- IUA (interkommunale utvalg mot akutt forurensning)

På **data.norge.no** ligger det 14 datasett og 10 API-er fra Kystverket. I **Geonorge/kartkatalogen** gir søk på "kystverket" 46 treff (19 datasett, 11 tjenester, 11 tjenestelag, 5 applikasjoner). WMS-tjenesten: `https://services.kystverket.no/wms.ashx` (kart.kystverket.no).

**Norsk fyrliste**: kontinuerlig oppdatert liste over alle lysende navigasjonsinnretninger – PDF-ene regenereres **hver morgen**. Egen merkeliste for innretninger uten lys.

## Øvrige digitale tjenester (bredden)

- **Bølge- og strømvarsel**: prognoser 66 timer frem for utvalgte farleder/områder.
- **ArcticInfo**: seilingsinformasjon for arktiske farvann.
- **MarU**: Kystverkets modell for estimering av maritime utslipp.
- **Alternative drivstoff / lavutslipp.kystverket.no**: kart over landstrøm, ladeanlegg for ferjer, LNG-, metanol-, hydrogen- og ammoniakk-bunkring.
- **Digital ruteservice**: nedlastbare digitale seilingsruter til havner.
- **Avgiftskalkulator**: los- og sikkerhetsavgifter.
- **Kystvarsler/navigasjonsvarsler**: for kysten og Svalbard, pluss NAVAREA XIX.
- **Slukkede fyrlykter** ("Unlit lights"): eget innsyn.

## Kilder

- https://kystdatahuset.no/ (+ /artikkel/data-i-losningen)
- https://www.kystverket.no/sjotransport-og-havn/test-kystdatahuset/
- https://www.kystverket.no/havn/safeseanet-norway/om-safeseanet-norway/
- https://www.kystverket.no/navigasjonstjenester/kystinfo/
- https://www.kystverket.no/en/services/
- https://kartkatalog.geonorge.no/metadata/kystverkets-wms/768a3ca6-0655-45d5-8cd5-76bd7e0e59d2
- https://data.norge.no/nb/search?q=kystverket
- https://www.kystverket.no/sjovegen/fyr-lykter-og-sjomerker/norsk-fyrliste/
