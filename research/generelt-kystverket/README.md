# Research: Kystverket – datagrunnlag og åpne data

Grunnlagsmateriale for NDC-presentasjonen om Kystverket. Researchen er gjort mot kystverket.no og tilhørende tjenester (Kystdatahuset, NAIS, Kystinfo, BarentsWatch, hais.kystverket.no, data.norge.no, Geonorge) i september 2026.

## Innhold

| Fil | Innhold |
|---|---|
| `01-om-kystverket.md` | Hvem Kystverket er, samfunnsoppdrag og ansvarsområder |
| `02-ais-dypdykk.md` | AIS i dybden: nettverket, satellittene, datavolum og tilgang (hovedfokus) |
| `03-datalandskap-bredde.md` | Bredden i datagrunnlaget: SafeSeaNet, geodata, Kystdatahuset, øvrige tjenester |
| `04-apne-data-tilgang-og-api.md` | Konkret utviklerinngang: API-er, endepunkter, formater og lisens |
| `05-maru-og-martraf.md` | Modellene oppå AIS-strømmen: maritim trafikkmodell (MarTraf) og maritim utslippsmodell (MarU) |
| `screenshots/` | 14 skjermbilder fra tjenestene (nummerert, refereres fra dokumentene) |

## Kortversjonen (TL;DR)

- Kystverket er transportetaten for sjøveien, underlagt Nærings- og fiskeridepartementet. Todelt oppdrag: sikker/effektiv ferdsel i farledene, og nasjonal beredskap mot akutt forurensning.
- De forvalter enorme mengder maritime data, og det aller meste er **åpent** under NLOD-lisens (Norsk lisens for offentlige data).
- **AIS er kronjuvelen**: ~90 basestasjoner langs kysten + egne satellitter ga 8,9 milliarder AIS-meldinger i 2021 (mot 2 mrd i 2006). Åpen sanntidsstrøm og historiske data helt tilbake til 2006/2013.
- **Kystdatahuset** (kystdatahuset.no) er deres dataplattform utad: 131 datasett, dashbord og applikasjoner, med åpent Swagger-API og til og med en KI-agent for søk.
- **SafeSeaNet Norway** er skipsfartens "single window" for meldeplikt – kilden til anløpsstatistikk (sparer næringen for ca. 250 000 skjemaer årlig).
- Geodata (farleder, fyr og merker, ankringsområder, nødhavner m.m.) distribueres via Kystinfo, Geonorge og data.norge.no (14 datasett + 10 API-er registrert der).
- **MarTraf og MarU** er modellene oppå AIS-strømmen: trafikkmodellen gjør posisjoner til seilaser og operasjonsfaser, utslippsmodellen gjør seilaser til CO2, NOx og energibehov per kommune. Begge er åpen kildekode (github.com/Kystverket/maru), og Miljødirektoratet legger opp til å bruke tallene i klimaregnskapet.

## Vinkler som kan treffe et NDC-publikum (utviklere)

1. **Live-demo-vennlig**: Åpen sanntids-AIS via BarentsWatch API (OAuth2 client credentials, gratis registrering) – eller helt rått: TCP-socket mot `153.44.253.27:5631` og les NMEA/AIS-meldinger direkte.
2. **Dataplattform-historien**: Fra 90 basestasjoner og 4 satellitter → innsamling → vasking/track-generering → dashbord, API og nedlasting (GeoParquet!). Perfekt parallell til malen/appen om dataplattform.
3. **Skala**: 8,9 mrd meldinger/år, satellitt som fanger 1,5 mill unike AIS-signal per døgn.
4. **Samfunnsnytte**: beredskap, søk og redning (virtuelle AIS-merker for HRS), miljøovervåking, ulovlig fiske (Blue Justice).
5. **Moderne detaljer**: GeoParquet som nedlastingsformat, KI-agent i Kystdatahuset, WKT-polygonfiltrering i historisk nedlasting.
