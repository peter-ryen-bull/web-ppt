# Gode formuleringer om dataprodukter, på tvers av kildene

Sortert etter tema. Kildene står i parentes.

## Hva et dataprodukt er

> «Et dataprodukt er en dataleveranse dere behandler som et produkt.» (Glitni)

> «A data product is the smallest valuable unit of analytical data (...) packaged specifically in a way to deliver meaningful business value.» (martinfowler.com, Designing data products)

> «A data product is simply a way of packaging data so it solves a specific business problem.» (Google Cloud)

## Komponent vs. produkt

> «En tabell kan være en ingrediens. Dataproduktet er retten.» (Magne Bakkeli, LinkedIn)

> «En tabell er en byggestein. Dataproduktet er grensesnittet dere lover å stå inne for over tid.» (Glitni)

> «A file simply existing in a storage bucket does not qualify.» (Google Cloud)

## Analogier

> «Imagine the difference between buying loose ingredients and buying a meal kit. A data product is that kit.» (Google Cloud)

> «We treat it like a product on a store shelf—complete with a description of what it is, how to use it, and a promise that it is accurate.» (Google Cloud)

Elsparkesykkel-analogien: når du kjøper en elsparkesykkel forventer du spesifikasjoner på rekkevidde, garanti og hastighet. Uten dem er produktet umulig å stole på. Samme med dataprodukter. (Glitni, i datakontrakt-guiden)

## Ikke alle data er produkter

> «Når alt er produkt, er ingenting produkt.» (Magne Bakkeli, om selskapet med 1000 «dataprodukter»)

> «At Oda, when you decide to share a dataset outside of your team, we consider it a product.» (Oda)

Glitnis tredje sjekklistespørsmål som prioriteringsfilter: «Er feilen dyr nok til at det er verdt å forvalte over tid?»

## Hvorfor produkttankegang

> «It shifts the focus from simply collecting data to serving it.» (Google Cloud, om DaaP)

> «The main shift is to treat domain data product as a first class concern, and data lake tooling and pipeline as a second class concern.» (Zhamak Dehghani)

Oda om formålet: «to lower the cost of discovering, understanding, trusting, and ultimately creating value from data.» Fin fordi den sier at gevinsten er lavere friksjon, ikke mer teknologi.

## Skillet mellom begrepene

> «One refers to what you're developing, while the other refers to the development paradigm itself.» (dbt, om data product vs. data as a product)

## Koblingen til datakontrakter

> «Datakontrakten blir bindeleddet som operasjonaliserer 'data as a product'.» (Glitni)

Data mesh-perspektivet: dataproduktet er systemet (input-porter, pipeline, tester, dokumentasjon), datakontrakten er grensesnittspesifikasjonen for datasettet som leveres på output-porten. (entropy-data.com/datamesh-architecture.com)
