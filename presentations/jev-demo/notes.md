# Speaker notes: Jev-demo

Rød tråd: Jev er ikke en bedre chatbot. Den er en beslutningsmodell. Du
definerer svarrommet, får sannsynligheter tilbake, og lar koden bestemme.

Regel for decken: alt som står på skjermen av tall kommer fra et live kall i
rommet. Ingen innspilte svar, ingen tall fra studier, ingen anslag. Kostnad er
alltid målte tokens × listepris. Si tallene slik de står på skjermen – de
endrer seg fra kjøring til kjøring.

Oppsett for live-demo i `presentations/jev-demo/.env` (ikke i git), eller i
`.env.local` i `web-ppt/`:

    API_KEY=...            # Jev (TYPESAFE_API_KEY virker også)
    OPENAI_API_KEY=...     # utgangspunktet, steg 4 og sammenligningen

Uten nøkkel viser knappene en feilmelding og ingen tall.

Tre case går igjen på alle live-slidene, med fanene øverst på hver slide:

1. Kundehenvendelse → hastegrad (akutt / i dag / kan vente).
2. Databerikelse → kjøretøy (merke og modell) → personbil / lastebil /
   buss / motorsykkel, som en ny kolonne i en tabell.
3. Spam/bot-bruker → ny brukerregistrering (e-post, navn, sted, IP) →
   ekte / spam/bot.

Valget av case og eksempel (1–4) huskes på tvers av slidene og vinduene,
som modellvelgeren. Velg case på første slide, så følger det med. Bytter du
case, nullstilles svarene på sliden, så tallene alltid hører til teksten
som vises. Eksemplene og datasettene (500 per case) er oppdiktet.
Kjør demoen i øvingsvisningen eller publikumsvisningen. Presentatørvisningen
synkroniserer ikke det du skriver i feltene.

## forside – Forside

Jev kom 15. september 2026 fra TypeSafe AI. De kaller den en «System One»-
modell: raske, avgrensede vurderinger, ikke lang resonnering.

## casene – De tre casene

Rammen for hele foredraget. Tre helt vanlige klassifiseringsjobber:

1. Kundehenvendelse → hvor mye haster det (akutt / i dag / kan vente).
2. Databerikelse → kjøretøynavn og modell → personbil, lastebil, buss eller
   motorsykkel. Tenk en tabell med en kolonne som mangler.
3. Spam/bot-bruker → ny registrering med e-post, navn, sted og IP → ekte
   eller spam/bot.

Radene er de samme eksemplene (1–4) som brukes live senere. Spørsmålstegnet
er kolonnen modellen skal fylle. Poenget: dette er små beslutninger som tas
tusenvis av ganger – da betyr fart og pris mer enn eleganse.

## problemet – Utgangspunktet: fritekst fra OpenAI

Alt her er live. Velg case og eksempel (1–4) og trykk «Send til OpenAI».

Prompten er slik vi ville spurt en kollega: «Hvor mye haster denne
henvendelsen?», «Hva slags kjøretøy er dette?», «Er dette en ekte bruker
eller spam/bot?». Ingen formatkrav.

Mens det strømmer: pek på «venter på første token» og at teksten kommer bit
for bit. Når det er ferdig: les opp svaret. Det er greit for et menneske,
men prøv å skrive kode som henter ut én etikett fra det. Formen endrer seg
fra kall til kall – kjør gjerne samme eksempel to ganger.

Tallene under (første token, totalt, output-tokens, kostnad) er fra dette
kallet. Kostnaden er tokenbruken OpenAI rapporterer × listepris.

Valget av case og eksempel følger med til de neste slidene.

## json-forsok – Be om JSON – 100 ganger

Samme case og eksempel. Nå står formen i prompten, ett felt med lovlige
verdier (f.eks. `{"kategori": "personbil" | "lastebil" | "buss" |
"motorsykkel"}`). Ikke JSON-modus i API-et, bare instruksjon – slik mange
gjør det.

1. «Send én»: råsvaret strømmer inn, og sjekkene under viser om det
   parses med JSON.parse, har riktig felt og en lovlig verdi.
2. «Kjør 100 parallelt»: samme forespørsel 100 ganger. Grønt = riktig form,
   rødt = feil (ikke JSON, JSON i ```-blokk, feil felt eller verdi utenfor
   listen). Klikk en rød rute for råsvaret. Første feil vises automatisk.

Linjen under rutenettet viser feiltypene og hvordan de gyldige svarene
fordeler seg. Er det mer enn én etikett, har vi også vist at samme spørsmål
gir ulike svar. Spam-eksempel 4 (proton.me fra en VPN-adresse) og
henvendelse 2 (faktura før fredag) er gode kandidater for spredning.

Blir alle 100 grønne: si det. Poenget står likevel – du må skrive og
vedlikeholde sjekken selv, og du betaler for hvert token den skriver. Tid og
kostnad for alle 100 står øverst.

## to-modeller – OpenAI og Jev på samme tekst

Trykk «Kjør begge samtidig». Begge kall starter samtidig fra nettleseren.

Venstre: OpenAI med JSON-prompten fra forrige slide, strømmet. Høyre: Jev med
samme spørsmål og alternativer – sannsynligheten for hver etikett direkte,
ingen tekst å parse.

Tidene er målt her og nå. Bytt gjerne case eller eksempel og kjør igjen.

## primitiver – Choice, Score og Noul

Tre spørsmålstyper. Alle kan blandes i samme kall.

Choice og Score gir confidence. Noul gir bare sannsynligheten for ja.

## kap-tutorial – Kapittel: prøv selv

## steg-noul – Steg 1: Noul

State er eksemplet fra valgt case. Spørsmålet er et ja/nei: «haster det nå?»,
«er det et tungt kjøretøy?» eller «er det spam/bot?».

Kjør. Pek på forbruksfeltet nederst: input-tokens faktureres, output er
gratis. Selv en kort tekst gir et par hundre tokens: det meste er fast
tillegg i kallet.

Bytt eksempel (1–4) og kjør igjen. Sannsynligheten bør flytte seg.

## steg-choice – Steg 2: Choice

Hele fordelingen kommer tilbake, ikke bare vinneren. Les opp fordelingen
fra skjermen.

Confidence er utledet fra fordelingen. Det er ikke sannsynligheten for at
svaret er riktig.

## steg-score – Steg 3: Score

Samme case, nå som en skala med beskrevne nivåer: hastegrad, størrelse på
kjøretøyet eller risiko for en ny bruker.

Scoren er vektet over nivåene og kan lande mellom dem (f.eks. litt over 1).

Docs advarer: ikke regn ut eksakte tall ved å interpolere mellom nivåene.

## steg-alle – Steg 4: alt i ett kall + OpenAI

Tre spørsmål, ett kall. Teksten betales én gang. Per case: etiketten
(choice), en skala (score) og et ja/nei (noul).

Trykk «Samme med OpenAI»: samme oppgave som vanlig prompt med JSON-modus.
Pek på output-tokens og resonnering. Det er der LLM-regningen ligger.
Kostnaden er målte tokens × listepris for modellen.

## steg-confidence – Steg 5: confidence-styrt ruting

Spam/bot-casen, uansett hvilket case som er valgt: ruting av nye brukere er
der terskler gir mest mening. Velg en bruker og trykk «Spør Jev». Grenen
lyser ut fra Jevs svar og confidence – ingen gren lyser før det finnes et
svar.

Dra så i tersklene (gulv og blokker auto) for å vise at det er koden din
som bestemmer. Confidence kan ikke settes for hånd; den kommer fra kallet.

Poenget: å slippe inn en ekte bruker tåler lavere confidence enn å blokkere
noen automatisk. Prøv eksempel 4 (ole.m@proton.me fra en VPN-adresse).
Mønsteret er bank-eksempelet fra TypeSafe-docs, flyttet til vårt case.

## kap-fart – Kapittel: fart

## klassifiser – Jev fyller en ny kolonne

Tabellen har en kolonne som mangler (hastegrad, kategori eller vurdering).
Klikk en rad: ett kall til Jev, og cellen fylles. Les ventetiden fra
skjermen. «Fyll …» sender resten av radene samtidig.

Databerikelse er det tydeligste: kjøretøy inn, kategori ut, som en ny
kolonne. Be salen om forslag («Tesla Cybertruck», «Vespa») og legg dem til
som nye rader.

Kjøretøy sendes som «Vehicle make and model: …» og brukere som «New user
sign-up. …». Uten prefikset vet ikke Jev hva teksten er. Godt eksempel på at
den leser bokstavelig.

## fart – Hundrevis på et sekund

Standard: 100 elementer, 50 samtidige kall. Trykk Kjør og les tiden.

Så: sett «samtidig» til 1 og kjør igjen. Nå går det ett og ett. Sammenlign
med «sum ventetid» fra forrige kjøring. Trykk Nullstill når poenget er tatt.

Datasettet i hvert case har 500 ulike elementer, så 500 går gjennom alle
uten gjentak. Kostnaden for hele kjøringen står til høyre.

Motor: bytt til OpenAI (modell og effort fra den delte velgeren) og kjør
samme case og antall igjen. Samme elementer, samme ruter og samme tall.
«Siste kjøring per motor» nederst i panelet holder den forrige kjøringen,
så du kan lese Jev og OpenAI rett under hverandre. OpenAI-tokens er inn +
ut (inkludert resonnering), og kostnaden er listepris × målte tokens. Et
OpenAI-svar som ikke er ett av alternativene, blir en rød rute.

Med OpenAI: hold deg til 25 eller 100 og 10–50 samtidige. 500 med 100
samtidige kan treffe rate limits hos OpenAI – da blir rutene røde med
feilmeldingen.

Hold musen over en rute for svar, confidence og ventetid.

Første kjøring etter oppstart er litt tregere (nye forbindelser til
TypeSafe). Kjør én gang før publikum kommer.

## sammenlign – Jev mot OpenAI

Valgt case, 25 elementer, 10 samtidige. Trykk «Kjør alle».
Begge banene starter samtidig med samme elementer.

Pek på tre ting: tid totalt, kostnad per 1000 og «enig med Jev». Enighet
er ikke treffsikkerhet. Ingen av modellene er fasit, men der de er uenige
er det verdt å se på eksemplet (listet nederst).

Uten nøkkel viser OpenAI-banen «INGEN NØKKEL» og kjører ikke.

Oppsett i `presentations/jev-demo/.env` (eller `.env.local` i `web-ppt/`):

    OPENAI_API_KEY=...
    # valgfritt:
    OPENAI_MODEL=gpt-6.1-sol
    OPENAI_REASONING_EFFORT=low

GPT-6.1 Sol kjører med reasoning effort `low`, det laveste den støtter
(`none` og `minimal` gir feil). Kostnaden er tokenene OpenAI rapporterer
for hvert kall × listeprisen.

Priser (listepris, $ per million tokens inn / ut), hentet 9. okt 2026:

- GPT-6.1 Sol `gpt-6.1-sol`: $2 / $10. GPT-6 Astra (OpenAIs flaggskip): $10 / $50.
  platform.openai.com/docs/pricing
- Jev: $0,042 inn, output gratis (docs.typesafe.ai/models.md).

Bytter du modell til en som ikke står i `MODEL_PRICES` i `jev.ts`, vises
den uten pris.

## kap-tokens – Kapittel: tokens og kostnad

## batching – Mange spørsmål, ett kall

Live. Velg antall spørsmål (standard 10) og trykk «Kjør begge». Samme
vilkårstekst sendes på to måter samtidig: ett kall med alle spørsmålene, og
ett kall per spørsmål.

Pek på tokens og kostnad: dokumentet betales én gang i det samlede kallet,
men én gang per spørsmål ellers. Forholdet (×) er målt, ikke regnet ut.

Tabellen til høyre viser p(ja) per spørsmål begge veier. Spørsmål der ja/nei
er ulikt blir røde. Si hvor mange som var like.

Vilkårsteksten er oppdiktet for demoen (Nordlys Cloud).

## kalkulator – Kostnadskalkulator

Standard: 100 000 kall per dag, 300 tokens tekst, 3 spørsmål.

Vis hvordan forholdet endrer seg når output per spørsmål går ned (ingen
resonnering) eller teksten blir lang. Med lang tekst og lite output går
forskjellen ned mot input-prisforskjellen (~18×).

Det er anslag – bryter regelen om bare live tall. Forslag: skjul sliden,
eller erstatt med en «kvittering» som summerer alle live kall i foredraget.

## forskning – Hva sier forskningen

Uavhengig studie fra arXiv. Viktigste funn er det siste: feilene er
korrelert. En kaskade der Jev sender usikre saker videre til en LLM sparer
penger, men gir nesten ikke bedre treff.

Studietall, ikke live – Peter har valgt å beholde sliden. Si at det er en
ekstern studie.

«19 av 27»: i 8 av 27 parvise sammenligninger av treffsikkerhet var Jev
signifikant forskjellig fra en LLM-dommer, i 19 ikke. De 19 er 8 der
forskjellen er bekreftet innenfor 5 poeng og 11 uavklarte. Ingen signifikant
forskjell er ikke det samme som bevist like gode – si «ikke målbart
forskjellig» hvis noen spør.

## forskning-janei – Ja/nei mot skala (studien)

Studietall, ikke live. Tall fra tabell 2 og avsnitt 4.1 i arXiv 2609.29769.

Ja/nei (to paneler, 6 sammenligninger):

- RiceChem (kjemisvar, 27 kriterier, 819 vurderinger): Jev 81,0 %, best av
  alle. Luna 77,8 (Jev +3,2, signifikant), Gemini 76,1 (+4,9, signifikant
  også etter korreksjon), DeepSeek 79,2 (+1,8, innenfor 5 poeng).
- HealthBench (chatbot-svar, 34 kriterier, 406 vurderinger): Jev 77,1 %,
  nest best. Luna 70,4 (Jev +6,7, signifikant), Gemini 79,6 (Jev −2,5, ikke
  signifikant), DeepSeek 76,4 (+0,7, innenfor 5 poeng).
- Altså 3 av 6 signifikant i Jevs favør, ingen imot. Fordelen er 2–7 poeng
  – reell, men ikke dramatisk.

Skalaer (sju paneler, 21 sammenligninger): 16 ikke signifikant, Jev bak i 4
(Gemini på ELLIPSE med 16,4 poeng, FED-Dialogue og HelpSteer2; Luna på
USR-PC), foran i 1 (Luna på HelpSteer2). Gemini var mest treffsikker, eller
delt, på alle skalapaneler unntatt LFQA. Jev Score var signifikant bedre enn
Jev Choice på fire skalapaneler.

Forbehold: på HelpSteer2 slo en konstant gjetning alle dommerne, og på LFQA
var ingen bedre enn en baseline som bare så hvem som skrev svaret. Dommerne
var «flash»-modellene GPT-5.6 Luna, Gemini 3.8 Flash og DeepSeek V4.1 Flash.


## begrensninger – Hvor Jev bommer

Fra TypeSafes egen liste for Jev 1.13. Fellesnevner: regn, tell og
sammenlign i koden. Still direkte spørsmål. Send bare relevant tekst.

## arbeidsdeling – Jev, kode og LLM

Ikke enten-eller. Jev tar de små beslutningene, koden eier konsekvensene,
LLM-en skriver når det trengs tekst.

## konklusjon – Ikke bedre, men raskere og billigere

Budskapet: Jev er ikke vesentlig bedre. Svarene er omtrent på nivå med
OpenAI. Men den er mye raskere og mye billigere, og det er det som gjør den
brukbar: på hver rad, i sanntid, som en vanlig funksjon i koden.

Tallene er de siste live-målingene i dag, ingen anslag:

- Kvalitet: andelen elementer der Jev og OpenAI svarte likt. Enighet er
  ikke treffsikkerhet – ingen av dem er fasit.
- Fart: total tid for OpenAI delt på total tid for Jev, samme elementer og
  samme antall samtidige kall.
- Kostnad: OpenAI per element delt på Jev per element (målte tokens ×
  listepris).

Kildene er den siste av disse: «Jev mot OpenAI» (begge baner fullført), eller
«Hundrevis på et sekund» når begge motorene har kjørt samme case, antall og
samtidighet. Linjen nederst sier hvilken, når og med hvilken modell.

Står det «Ikke målt ennå»: gå tilbake og kjør «Jev mot OpenAI» én gang.
Tallene huskes i nettleseren og deles med publikumsvinduet. Trykk
«nullstill» nederst for å fjerne øvingstall før foredraget.

Avslutt med testing: start med én avgrenset beslutning, mål kvalitet,
ventetid, kostnad og hvor mye som må til manuell vurdering.
