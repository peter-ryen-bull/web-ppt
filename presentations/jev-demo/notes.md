# Speaker notes: Jev-demo

Rød tråd: Jev er ikke en bedre chatbot. Den er en beslutningsmodell. Du
definerer svarrommet, får sannsynligheter tilbake, og lar koden bestemme.

Oppsett for live-demo (`.env.local` i `web-ppt/`, ikke i git):

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

## problemet – Klassifisering med LLM i dag

Dette er slik mange av oss gjør det i dag. Vis prompten. Den er ekte: det er
samme prompt som «Samme med LLM»-knappen sender senere.

Poenget: vi bruker en modell trent til å skrive tekst til å ta små
beslutninger. Det fungerer, men vi betaler for skrivingen.

## to-modeller – Token for token vs. ett pass

Klikk én gang for å starte animasjonen.

Venstre: LLM-en resonnerer (grå ruter) og skriver så JSON-en token for token.
Høyre: Jev svarer med fordelinger med en gang.

Si tydelig at tidslinjen er en illustrasjon. Tallene måler vi live senere.

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
