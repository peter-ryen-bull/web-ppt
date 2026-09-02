# Chad Sanderson: «The Rise of Data Contracts»

Kilde: https://dataproducts.substack.com/p/the-rise-of-data-contracts (aug 2022). Sanderson er den mest profilerte stemmen på feltet, tidligere Convoy, nå Gable. Boken «Data Contracts» (Sanderson & Mark Freeman, O'Reilly) kom i 2025.

---

## Problemet: Garbage In, Garbage Out

Artikkelen starter med GIGO: kvaliteten på output bestemmes av kvaliteten på input. Alle nikker, men nesten ingen dataorganisasjoner løser kvalitet ved kilden. Hovedanalysen er at ELT/CDC-verktøy koblet rett på produksjonsdatabaser gjør databaseskjemaet til et API ingen har samtykket til:

> «This inevitably treats database schema as a non-consensual API. Engineers often never agreed (or even want) to provide this data to consumers.»

Utvikleren som eier databasen vet ikke hvem som bruker dataene nedstrøms eller hvorfor, og gir derfor ingen varsler når skjemaet endres:

> «No warning is given because the engineer doesn't know that a warning should be given or why.»

Klassisk konsekvens-eksempel: prisalgoritmen som genererer 80 % av selskapets omsetning knekker fordi en kolonne ble droppet i en produksjonstabell oppstrøms.

## GIGO-syklusen

Sanderson beskriver en selvforsterkende spiral, forkortet: databaser behandles som ufrivillige API-er → ingen kontrakt, alt kan endres når som helst → datasett knekker → dataingeniører rydder opp og blir mellommenn → teknisk gjeld vokser → kritiske systemer feiler → dataene mister tillit → store selskaper kaster folk på problemet. Verktøy lagt oppå en ødelagt arkitektur gir bare lindring, ikke løsning. (Illustrert med dumpster fire-bildet, `img/sanderson_rise-of-data-contracts-2.jpg`.)

## Løsningen: definisjonen hans

> «Data Contracts are API-like agreements between Software Engineers who own services and Data Consumers that understand how the business works in order to generate well-modeled, high-quality, trusted, real-time data.»

Nøkkelideen er abstraksjon og dekobling: I stedet for at datateamet passivt mottar dumper fra produksjonssystemer, designer konsumentene kontrakter som beskriver den semantiske virkeligheten (entiteter, hendelser, attributter, relasjoner). Utviklerne kan endre databasene sine fritt, så lenge de leverer det kontrakten lover.

## Implementeringen hos Convoy

Se `img/sanderson_rise-of-data-contracts-1.jpg`: kontrakten definerer entiteter (Truck med schema) og hendelser (Truck Arrived osv.), implementeres som sterkt typet schema via en IDL/SDK (à la Protobuf), sendes gjennom API med validering og håndheving, og videre via Kafka til dataplattformen. Data-API-ene er versjonert med CI/CD og endringshåndtering.

## Viktige nyanser fra FAQ-en

- Eksisterende ELT/CDC-pipelines forsvinner ikke. To bruksområder lever side om side: utforskning (rå, rask, fleksibel) og produksjonspipelines (kontraktfestet, veldokumentert, med on-call). Kontrakter er for det siste.
- Konsumentene må ikke vite alt på forhånd: kontrakten utvikles iterativt og bakoverkompatibelt.
- Én kontrakt per entitet/hendelse, ikke én per konsument.
- Startpunkt: ta den siste alvorlige datahendelsen (Sev1/Sev2), definer kilden, design kontrakt og SLA for det ene tilfellet.
- På spørsmålet «er ikke dette mye å be utviklerne om?»: nei, gitt et enkelt grensesnitt er det «high-value, low-effort work».

## Fra DataHub-AMA-en med Sanderson (Maggie Hays' artikkel)

To organisatoriske råd som utfyller substack-artikkelen:

1. **Spre bevissthet først**: Convoy hadde kolonnenivå-avhengigheter synlige for utviklere, så de så hva som ville knekke nedstrøms før de endret noe. «It's hard to take accountability without awareness.»
2. **Møt folk der de er**: kontrakter ble definert i schema registry med SDK, og brudd dukket opp i GitHub-flyten utviklerne allerede brukte. Jo mer avvik fra eksisterende arbeidsflyt, jo dårligere skalerer det.
