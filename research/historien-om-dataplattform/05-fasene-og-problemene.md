# Fasene speilet mot problemene

Dette er selve fortellingsgrepet: hver fase i historien er et svar på et konkret problem – og hver løsning skapte det neste problemet. Tabellen og tekstene under er destillatet av `01`–`04`, klare til bruk i presentasjon og artikkel.

## Speilingen i tabellform

| Fase | Problemet de ville løse | Løsningen | Det nye problemet |
|---|---|---|---|
| **Filer** (1960-t) | Hvert program eide sine egne data; nytt spørsmål = nytt program | Delte databaser (IMS, IDS) på disk | Måtte navigere fysiske strukturer; bare eksperter kunne spørre |
| **Relasjonsdatabasen** (1970–80-t) | Spørsmål krevde programmert navigasjon; redundans og avhengighet til fysisk lagring | Codds relasjonsmodell + SQL: én delt, konsistent sannhet for driften | Bygget for drift, ikke analyse; sannheten spredte seg over mange systemer |
| **Datavarehuset** (1983–2000) | Ledelsen fikk ikke svar på tvers; analyse truet driften; uttrekk-anarki ga sprikende tall | Ett integrert, historisk varehus adskilt fra driften (Teradata, Inmon, Kimball) – finans først | Dyrt, tregt å endre, bare strukturerte data; IT ble flaskehals |
| **Big data** (2003–2006) | Internett-skala: volum, variasjon og maskinfeil som normalen | GFS/MapReduce → Hadoop: distribuer alt på billig maskinvare | Krevde spesialister; SQL-folket sto utenfor |
| **Datasjøen** (2010) | Varehusets forhåndsaggregering begrenset spørsmålene; rådata kastet | «Lagre alt» i naturlig tilstand – du kjenner ikke morgendagens spørsmål | Datasumpa: uten katalog, eierskap og metadata ble sjøen en fylling. To parallelle verdener: varehus for BI, sjø for ML |
| **Skyen** (2012–2016) | Kjøpe og drifte jernet selv; kapasitet planlagt år i forveien | Elastiske sky-varehus (Redshift, BigQuery, Snowflake); lagring og regnekraft adskilt | Verktøyjungel; sentrale datateam ble organisatorisk flaskehals |
| **Lakehouse + mesh** (2019–2020) | Duplisering mellom sjø og varehus; flaskehals-team | Ett governed lag oppå objektlagring (Delta/Iceberg); domeneeierskap, data som produkt | Dagens front: KI-agenter, sanntid, og governance som faktisk etterleves |

## Fortellingen i kortform («hvorfor er vi der vi er»)

1. **Databasen** ga oss delt, konsistent drift – men drift er ikke innsikt.
2. **Datavarehuset** ga oss innsikt på tvers og historikk – men bare for strukturerte data, til stormaskinpris. Finans gikk foran, fordi penger *er* data.
3. **Big data og datasjøen** ga oss skalaen og rådataene – men uten styring ble sjøen en sump, og vi endte med to parallelle verdener.
4. **Skyen** gjorde kapasitet til et strømabonnement – men verktøyjungelen og de sentrale flaskehalsene besto.
5. **Lakehouse og data mesh** forener de to verdenene og flytter eierskapet ut – og det er dét vi i dag kaller en dataplattform.

Konstanten hele veien: **flere folk vil stille flere spørsmål til mer data, raskere.** Hver epoke flyttet flaskehalsen – fra programmet, til driften, til skjemaet, til jernet, til organisasjonen. Dataplattformen er ikke en motesak; den er det foreløpig siste svaret på et 60 år gammelt problem.

## Mulige spissformuleringer

- «Historien om dataplattformen er historien om flaskehalser som flytter seg.»
- «Databasen husker. Varehuset forstår. Sjøen rommer. Skyen skalerer. Plattformen samler.»
- «Hver generasjon løste forrige generasjons problem – og skapte sitt eget.»
- «Vi har brukt 60 år på samme oppgave: å gjøre data om til beslutninger.»
- Om finans: «Bankene var først, fordi penger er data.»
- Om KI: «KI endrer ikke oppgaven – den hever innsatsen. Modellene er bare så gode som dataene plattformen serverer dem.»
