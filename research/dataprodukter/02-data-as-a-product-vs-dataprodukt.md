# Begrepsforvirringen: «data as a product» vs. «dataprodukt»

Kilder:

1. Google Cloud: «What are data products?»: https://cloud.google.com/discover/what-are-data-products og «What is data as a product (DaaP)?»: https://cloud.google.com/discover/what-is-data-as-a-product
2. IBM: «What Is Data as a Product (DaaP)?»: https://www.ibm.com/think/topics/data-as-a-product
3. dbt Labs: «Data products vs. data as a product»: https://www.getdbt.com/blog/data-product-data-as-product
4. Xavier Gumara Rigol: «Data as a product vs data products. What are the differences?» (Towards Data Science, 2020): https://towardsdatascience.com/data-as-a-product-vs-data-products-what-are-the-differences-b43ddbb0f123/

---

## Skillet alle kildene gjør

Begrepene brukes om hverandre, men betyr forskjellige ting. Alle fire kildene lander på samme skille:

- **Data as a product** er tankesettet/strategien: behandle datasett med samme disiplin som programvareprodukter (eierskap, versjonering, dokumentasjon, brukerstøtte).
- **Et dataprodukt** er leveransen: den konkrete, pakkede dataressursen som løser et spesifikt problem (datasett, API, dashboard, ML-modell).

Google Clouds oppsummering i tabellform:

> | Feature | Data as a product | Data products |
> |---|---|---|
> | What is it? | A strategy or philosophy. | A pre-packaged data asset. |
> | Primary goal | To improve data quality and trust. | To solve a specific user problem. |
> | Example | A clean, documented "Customer" table in BigQuery with an assigned owner. | A "Customer 360" data product that pulls from that table to show a user's history. |

dbt sier det kortest: «one refers to what you're developing, while the other refers to the development paradigm itself.»

## Gumara Rigols presisering (opphavet til forvirringen)

Xavier Gumara Rigol (Adevinta/Oda, forfatter av boken «Data as a Product Driver», 2026) forklarer hvor forvirringen kommer fra: data mesh-prinsippet «data as a product» ble forkortet til «data products» i dagligtale, og dermed smeltet to ulike begreper sammen.

Hans rangering: «data product» er det generiske begrepet (alt fra dashboards til ML-modeller, jf. Simon O'Regans kategorier), mens «data as a product» er en delmengde: datasett behandlet med produkttankegang.

> «In summary, "data as a product" is the result of applying product thinking into datasets, making sure they have a series of capabilities including discoverability, security, explorability, understandability, trustworthiness, etc.»

Og hva det inneholder:

> «A data as a product contains the code, its data and metadata, and the necessary infrastructure to run it.»

## Gode analogier å stjele

Google Clouds måltidskasse-analogi er den beste jeg fant:

> «Imagine the difference between buying loose ingredients and buying a meal kit. A data product is that kit: it packages the raw data with the instructions and context needed to solve a specific business problem.»

Og butikk-varianten:

> «Instead of offering raw data that might be messy or confusing, we treat it like a product on a store shelf—complete with a description of what it is, how to use it, and a promise that it is accurate.»

Google Cloud har også en fin negativ avgrensning: «A file simply existing in a storage bucket does not qualify.»

## Fordelene dbt trekker frem

dbt oppsummerer gevinstene ved dataprodukter i tre ord: discoverability, access control og backward compatibility. Og de knytter produkttankegangen til releases: tenk «data product releases» slik utviklere tenker programvarereleaser, med versjoner og endringshåndtering.
