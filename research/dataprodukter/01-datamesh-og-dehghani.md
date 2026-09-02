# Data mesh-litteraturen: Dehghani, martinfowler.com og datamesh-architecture.com

Kilder:

1. Zhamak Dehghani: «How to Move Beyond a Monolithic Data Lake to a Distributed Data Mesh» (mai 2019): https://martinfowler.com/articles/data-monolith-to-mesh.html
2. Thoughtworks: «Designing data products» (2024, bygger på Dehghanis bok): https://martinfowler.com/articles/designing-data-products.html
3. datamesh-architecture.com (INNOQ, samme folk som står bak datacontract.com)

---

## Opphavet til begrepet

«Data as a product» er ett av de fire prinsippene i data mesh, lansert av Zhamak Dehghani i 2019-artikkelen på martinfowler.com. Kjernepoenget hennes:

> «The main shift is to treat domain data product as a first class concern, and data lake tooling and pipeline as a second class concern - an implementation detail.»

Selve definisjonen av et dataprodukt fra boken hennes (Data Mesh: Delivering Data-Driven Value at Scale, 2022): dataproduktet er noden i mesh-et som kapsler inn tre strukturelle komponenter: kode, data med metadata, og infrastruktur. Det er altså mer enn bare datasettet.

## De åtte egenskapene (DATSIS+)

Dehghani lister egenskapene et dataprodukt må ha. De opprinnelige seks fra 2019-artikkelen (ofte forkortet DATSIS), utvidet til åtte i boken:

1. **Discoverable**: lett å finne, typisk via en datakatalog der hvert produkt er registrert
2. **Addressable**: unik, permanent adresse (URL/URI) som kan brukes programmatisk
3. **Trustworthy**: kommuniserer service level objectives (SLO) og faktisk etterlevelse (SLI), så konsumenter tør å bygge på det
4. **Self-describing / Understandable**: skjema, semantikk, gjerne eksempeldata, så konsumenten slipper å spørre eieren
5. **Interoperable**: følger felles standarder så produkter kan kombineres på tvers av domener
6. **Secure**: tilgangsstyring innebygd
7. **Natively accessible**: tilgjengelig i formatet konsumenten faktisk trenger (SQL, filer, stream)
8. **Valuable on its own**: gir mening og verdi alene, ikke bare som mellomsteg

God kort definisjon fra «Designing data products»-artikkelen:

> «A data product is the smallest valuable unit of analytical data, sourced from data streams, operational systems, or other external sources and also other data products, packaged specifically in a way to deliver meaningful business value.»

Merk parallellen de trekker til programvareutvikling: vi dekomponerer systemer i enheter som er discoverable, vedlikeholdbare og har SLO-er. Dataprodukter er samme idé anvendt på analytiske data.

## Komponentene i et dataprodukt (datamesh-architecture.com)

Diagrammet `img/datamesh-architecture_dataproduct-components.png` viser hva et dataprodukt består av i praksis:

- **Input ports**: der data kommer inn, fra operasjonelle systemer eller andre dataprodukter (via datakontrakt)
- **Output ports**: der konsumenter henter data, med definert datamodell og teknologi
- **Discovery port**: metadata som gjør produktet synlig i katalogen
- Innmaten: eierskap og livssyklus, transformasjonskode, tester, dokumentasjon, lagring, kostnadsstyring, policies as code, CI/CD og observability

Dette komponentbildet er nyttig for å vise at «produkt» betyr mer enn «tabell med beskrivelse»: det er data pluss kode pluss drift pluss ansvar, pakket sammen.

## Koblingen til datakontrakter

datamesh-architecture.com beskriver datakontrakten som grensesnittet til dataproduktet: output-porten *implementerer* kontrakten, og konsumentens input-port *verifiserer garantiene* i den. Med andre ord: dataproduktet er systemet, kontrakten er spesifikasjonen av det som leveres. Samme rollefordeling som mellom en tjeneste og API-spesifikasjonen dens.
