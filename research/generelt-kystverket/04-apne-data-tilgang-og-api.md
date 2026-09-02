# Åpne data: tilgang, API-er og lisens (utviklerinngang)

> Skjermbilder: `screenshots/07-kystdatahuset-api-tilgang.png`, `screenshots/08-historisk-ais-nedlasting.png`, `screenshots/11-barentswatch-live-ais-api.png`

## Lisens og vilkår

- Alt åpent materiale er under **NLOD** (Norsk lisens for offentlige data): gratis, fri bruk, krav om kildekreditering ("Kilde: Kystverket").
- Personvernunntak i AIS: fiskefartøy < 15 m og fritidsfartøy < 45 m er filtrert ut av de åpne kanalene.
- Utvidet tilgang (inkl. små fiskefartøy) kan søkes hos Kystverket for ikke-kommersiell bruk.

## Oversikt over inngangene

| Kanal | Type | Auth | Format |
|---|---|---|---|
| NAIS (nais.kystverket.no) | Sanntidskart + embed | Ingen | Web/iframe |
| BarentsWatch Live AIS API | Sanntidsstrøm | OAuth2 (gratis klient) | JSON |
| BarentsWatch Historic AIS API | Historikk (14 dager i åpen del) | OAuth2 | JSON |
| Rå TCP-strøm `153.44.253.27:5631` | Sanntid rådata | Ingen | NMEA/AIS (IEC 62320-1) |
| hais.kystverket.no | Historisk bulk (inntil 1 år per bestilling) | E-post | **GeoParquet** / CSV |
| Kystdatahuset API (`/ws/api/...`) | Spørringer på vaskede data | JWT (gratis bruker) | JSON |
| Kystinfo / Geonorge | Geodata-nedlasting | Ingen | SOSI, Shape, FGDB, KML, GML, GeoJSON |
| WMS/WFS (`services.kystverket.no`) | Karttjenester | Ingen | WMS/WFS |

## BarentsWatch AIS API (enklest for live-demo)

1. Registrer bruker på barentswatch.no, opprett API-klient på "Min side".
2. Hent token:

```bash
curl -X POST https://id.barentswatch.no/connect/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'client_id=KLIENT_ID' \
  --data-urlencode 'client_secret=HEMMELIGHET' \
  --data-urlencode 'scope=ais' \
  --data-urlencode 'grant_type=client_credentials'
```

3. Kall API-et, f.eks. siste døgns spor for et fartøy (MMSI):

```bash
curl 'https://historic.ais.barentswatch.no/v1/historic/trackslast24hours/257111020' \
  -H 'Authorization: bearer TOKEN'
```

Dokumentasjon: https://developer.barentswatch.no/docs/category/ais (Live AIS API, Historic AIS API, skipstype-koder, eksempler).

## Kystdatahuset API

- Web services dokumentert med Swagger: **https://kystdatahuset.no/ws/swagger** (KDataAPI3).
- Autentisering: POST `https://kystdatahuset.no/ws/api/auth/login` med brukernavn/passord (gratis bruker registreres i løsningen eller via Kystinfo) → JWT-token som sendes som `Authorization: Bearer ...`. Noen web services er åpne uten innlogging.
- Eksempel-endepunkt: `POST /ws/api/ais/positions/for-mmsis-time` med `{"mmsiIds": [258500000], "start": "201701011345", "end": "201701041345"}`.
- Svarformat: `{ success, msg, data, metadata, time }`.
- Ingen rate-limits, men kall som tar over fire minutter avbrytes – del opp i mindre tidsperioder/områder.
- NB: AIS-data i Kystdatahuset er i UTC, og nyeste data ligger 2–3 døgn tilbake i tid (sanntid = BarentsWatch/TCP-strømmen).

## Historisk bulk-nedlasting (hais.kystverket.no)

- Bestill inntil ett år med AIS-data fra basestasjoner og satellitter innenfor norsk sone.
- Filtrering: skipstype, konkrete fartøy (navn/MMSI/IMO/kallesignal, evt. CSV-opplasting), geografisk område som WKT-polygon (EPSG:4326).
- Format: (Geo)Parquet eller CSV. Lenke sendes på e-post. Godt egnet til dataanalyse/ML-demoer.

## Kataloger

- **data.norge.no**: 14 datasett + 10 API-er fra Kystverket (søk "kystverket").
- **Geonorge/kartkatalogen**: alle geodatasettene + WMS/WFS-tjenestene.
- **Kystdatahuset**: 131 datasett/dashbord/applikasjoner samlet, med KI-agent-søk.

## Kilder

- https://www.kystverket.no/sjotransport-og-havn/ais/tilgang-pa-ais-data/
- https://kystdatahuset.no/artikkel/api-tilgang (rå tekst hentet 02.09.2026)
- https://developer.barentswatch.no/docs/AIS/live-ais-api
- https://hais.kystverket.no/
