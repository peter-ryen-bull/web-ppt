# Speaker notes: Jev-demo

Rød tråd: Jev er ikke en bedre chatbot. Den er en beslutningsmodell. Du
definerer svarrommet, får sannsynligheter tilbake, og lar koden bestemme.

Oppsett for live-demo: Jev-nøkkelen leses fra `API_KEY` i
`presentations/jev-demo/.env` (ikke i git). Alternativt i `.env.local` i `web-ppt/`:

    TYPESAFE_API_KEY=...
    # valgfritt, for «Samme med LLM» på steg 4:
    LLM_API_KEY=...
    LLM_MODEL=...
    LLM_BASE_URL=https://api.openai.com/v1

Uten nøkkel viser alle steg de innspilte svarene fra TypeSafe-docs.
Kjør demoen i øvingsvisningen eller publikumsvisningen. Presentatørvisningen
synkroniserer ikke det du skriver i feltene.

## forside – Forside

Jev kom 15. september 2026 fra TypeSafe AI. De kaller den en «System One»-
modell: raske, avgrensede vurderinger, ikke lang resonnering.

## problemet – Utgangspunktet: fritekst fra OpenAI

Alt her er live. Velg en henvendelse (1–4) og trykk «Send til OpenAI».

Prompten er slik vi ville spurt en kollega: hvilket team, hvor frustrert,
haster det? Ingen formatkrav.

Mens det strømmer: pek på «venter på første token» og at teksten kommer bit
for bit. Når det er ferdig: les opp svaret. Det er greit for et menneske,
men prøv å skrive kode som henter ut team, frustrasjon og haster fra det.
Formen endrer seg fra kall til kall – kjør gjerne samme henvendelse to ganger.

Tallene under (første token, totalt, output-tokens, kostnad) er fra dette
kallet. Kostnaden er tokenbruken OpenAI rapporterer × listepris.

Valget av henvendelse følger med til de neste to slidene.

## json-forsok – Be om JSON – 100 ganger

Samme henvendelse. Nå står formen i prompten. Ikke JSON-modus i API-et, bare
instruksjon – slik mange gjør det.

1. «Send én»: råsvaret strømmer inn, og sjekklisten under viser om det
   parses med JSON.parse og har riktig form (felt og lovlige verdier).
2. «Kjør 100 parallelt»: samme forespørsel 100 ganger. Grønt = riktig form,
   rødt = feil (ikke JSON, JSON i ```-blokk, feil felt eller verdi utenfor
   listen). Klikk en rød rute for råsvaret. Første feil vises automatisk.

Linjen under rutenettet viser feiltypene og hvordan de gyldige svarene
fordeler seg. Er det mer enn én variant, har vi også vist at samme spørsmål
gir ulike svar.

Blir alle 100 grønne: si det. Poenget står likevel – du må skrive og
vedlikeholde sjekken selv, og du betaler for hvert token den skriver. Tid og
kostnad for alle 100 står øverst.

## to-modeller – OpenAI og Jev på samme tekst

Trykk «Kjør begge samtidig». Begge kall starter samtidig fra nettleseren.

Venstre: OpenAI med JSON-prompten fra forrige slide, strømmet. Høyre: Jev med
de samme tre spørsmålene (team, frustrasjon, haster) – sannsynligheter
direkte, ingen tekst å parse.

Tidene er målt her og nå. Kjør gjerne flere henvendelser.

## primitiver – Choice, Score og Noul

Tre spørsmålstyper. Alle kan blandes i samme kall.

Choice og Score gir confidence. Noul gir bare sannsynligheten for ja.

## kap-tutorial – Kapittel: prøv selv

## steg-noul – Steg 1: Noul

Kjør. Peker på forbruksfeltet nederst: input-tokens faktureres, output er
gratis. 296 tokens for en setning: det meste er fast tillegg i kallet.

Bytt gjerne teksten til noe rolig («Just wondering about my invoice») og kjør
igjen. Sannsynligheten bør falle.

## steg-choice – Steg 2: Choice

Hele fordelingen kommer tilbake, ikke bare vinneren. 0,88 billing, 0,12
technical.

Confidence er utledet fra fordelingen. Det er ikke sannsynligheten for at
svaret er riktig.

## steg-score – Steg 3: Score

Score 1,05: litt over «Frustrated». Den kan lande mellom nivåene.

Docs advarer: ikke regn ut eksakte tall ved å interpolere mellom nivåene.

## steg-alle – Steg 4: alt i ett kall + LLM

Tre spørsmål, ett kall, 392 input-tokens. Teksten betales én gang.

Trykk «Samme med LLM». Uten LLM-nøkkel viser den et anslag (≈). Med nøkkel:
pek på output-tokens og resonnering. Det er der LLM-regningen ligger.

## steg-confidence – Steg 5: confidence-styrt ruting

Bank-eksempelet fra TypeSafe-docs. Dra confidence-spaken og vis hvilken
gren som lyser.

Poenget: lav risiko (saldo) tåler lavere confidence enn høy risiko
(overføring). Tersklene ligger i koden, ikke i modellen.

Live: prøv den usikre setningen («the transfer thing, maybe?»).

## kap-fart – Kapittel: fart

## klassifiser – Klassifiser hva som helst

Start med «Hva er det?». Trykk raskt på flere eksempler etter hverandre.
Hvert klikk er ett kall, og svarene kommer på rundt et kvarter sekund.

Be salen om forslag og skriv dem inn. Bytt til «Kundeservice» eller
«Meldinger fra sjøen» og vis at det bare er et annet spørsmål, samme modell.

«Hva er det?» sender «Norwegian word: …» som state. Uten prefikset leser
Jev enkeltord som «Fly», «Tog» og «Rev» som engelske ord. Godt eksempel på
at den leser bokstavelig.

## fart – Hundrevis på et sekund

Standard: 100 elementer, 50 samtidige kall. Trykk Kjør: hele rutenettet er
ferdig på under et sekund.

Så: sett «samtidig» til 1 og kjør igjen. Nå går det ett og ett, og det tar
rundt 25 sekunder. Det er like lenge som «én og én»-tallet viste i forrige
kjøring. Trykk Nullstill når poenget er tatt.

500 elementer koster rundt en halv cent. 500 går i løkke gjennom eksemplene.

Hold musen over en rute for svar, confidence og ventetid.

Første kjøring etter oppstart er litt tregere (nye forbindelser til
TypeSafe). Kjør én gang før publikum kommer.

## sammenlign – Jev mot OpenAI

Standard: Kundeservice, 25 elementer, 10 samtidige. Trykk «Kjør alle».
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

Dra antall spørsmål opp. Dokumentet dominerer. Ett kall betaler det én gang.

Fasiten til høyre er målt av TypeSafe selv i en cookbook. Leverandørens tall,
men svarene var de samme begge veier.

## kalkulator – Kostnadskalkulator

Standard: 100 000 kall per dag, 300 tokens tekst, 3 spørsmål.

Vis hvordan forholdet endrer seg når output per spørsmål går ned (ingen
resonnering) eller teksten blir lang. Med lang tekst og lite output går
forskjellen ned mot input-prisforskjellen (~18×).

Det er anslag. Den riktige sammenligningen er samme oppgave, samme
kvalitetskrav, målt på egen trafikk.

## forskning – Hva sier forskningen

Uavhengig studie fra arXiv. Viktigste funn er det siste: feilene er
korrelert. En kaskade der Jev sender usikre saker videre til en LLM sparer
penger, men gir nesten ikke bedre treff.

## begrensninger – Hvor Jev bommer

Fra TypeSafes egen liste for Jev 1.13. Fellesnevner: regn, tell og
sammenlign i koden. Still direkte spørsmål. Send bare relevant tekst.

## arbeidsdeling – Jev, kode og LLM

Ikke enten-eller. Jev tar de små beslutningene, koden eier konsekvensene,
LLM-en skriver når det trengs tekst.

## oppsummering – Oppsummering og kilder

Avslutt med testing: start med én avgrenset beslutning, mål kvalitet,
ventetid, kostnad og hvor mye som må til manuell vurdering.
