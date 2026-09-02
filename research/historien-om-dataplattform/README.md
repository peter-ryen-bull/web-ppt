# Research: Historien om dataplattformen

Innsamlet materiale om hvordan vi kom fra databasen på 60- og 70-tallet, via datavarehuset på 80- og 90-tallet, gjennom big data og datasjøen på 2000-tallet, til skyen, lakehouse og dagens dataplattform. Hver fase er speilet mot problemet den skulle løse – og det nye problemet den skapte.

Formålet er å bygge fortellingen «hvorfor er vi der vi er» til presentasjonen `01_historien_om_dataplattform` og til fagartikler.

Innsamlet 2. september 2026.

## Innhold

| Fil | Tema |
|---|---|
| `01-databasen.md` | 1960–1980: fra filer og magnetbånd til Codds relasjonsmodell, SQL og Oracle |
| `02-datavarehuset.md` | 1983–2000: Teradata, Devlin & Murphy, Inmon, Kimball – og hvorfor finans var først |
| `03-big-data-og-datasjoen.md` | 2000–2015: Google, GFS/MapReduce, Hadoop og datasjøen (og datasumpa) |
| `04-skyen-og-lakehouse.md` | 2012–nå: Redshift, Snowflake, modern data stack, data mesh og lakehouse |
| `05-fasene-og-problemene.md` | Selve speilingen: fase for fase – problemet de ville løse, løsningen og det nye problemet |

## Den røde tråden

Hver epoke løste flaskehalsen fra forrige epoke – og skapte en ny:

1. **Databasen (1970)** løste at hvert program eide sine egne filer. Ny flaskehals: driftssystemer tåler ikke analyse, og dataene spredte seg over mange systemer.
2. **Datavarehuset (1988)** løste at ledelsen ikke fikk én samlet sannhet på tvers av systemene. Ny flaskehals: dyrt, tregt å endre, og bare strukturerte data.
3. **Big data og datasjøen (2006/2010)** løste volum og variasjon fra internett. Ny flaskehals: datasump, kompleksitet og to parallelle verdener (varehus for BI, sjø for ML).
4. **Skyen (2012)** løste kapasitet og kostnad – lagring og regnekraft ble elastisk og separat. Ny flaskehals: verktøyjungel og organisatoriske flaskehalser.
5. **Lakehouse og data mesh (2019–2020)** løser dupliseringen og eierskapet: én governed plattform for både BI og KI.

Konstanten gjennom alle fasene: flere folk vil stille flere spørsmål til mer data, raskere. Teknologien skifter – problemet består: å gjøre data om til beslutninger.

## Nøkkelkilder

- Devlin & Murphy: «An architecture for a business and information system», IBM Systems Journal 1988 (første beskrivelse av datavarehus-arkitekturen)
- Barry Devlin: «Thirty Years of Data Warehousing», Business Intelligence Journal 2018 ([pdf](https://www.9sight.com/pdfs/Thirty_Years_of_DW.pdf))
- IBM History: [The relational database](https://www.ibm.com/history/relational-database) (Codd, System R)
- ACM: [50 Years of Queries](https://cacm.acm.org/research/50-years-of-queries/) (IMS, System R, SQL, Oracle)
- Wikipedia: [Data warehouse](https://en.wikipedia.org/wiki/Data_warehousing) (tidslinjen)
- American Banker: [1st Interstate Tries to Stay Ahead of Curve](https://www.americanbanker.com/news/1st-interstate-tries-to-stay-ahead-of-curve) (bank-caset)
- James Dixon: [Pentaho, Hadoop, and Data Lakes](https://jamesdixon.wordpress.com/2010/10/14/pentaho-hadoop-and-data-lakes/) (datasjø-begrepet)
- Databricks: [Lakehouse-paperet, CIDR 2021](https://www.databricks.com/sites/default/files/2020/12/cidr_lakehouse.pdf)
- Snowflake: [The Snowflake Elastic Data Warehouse, SIGMOD 2016](https://pages.cs.wisc.edu/~remzi/Classes/739/Spring2004/Papers/p215-dageville-snowflake.pdf)
