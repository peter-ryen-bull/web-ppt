import { Box, ChapterSlide, Reveal, pt } from "../parts";

/* Kapittel: Hva får du igjen? */
export function SlideEffekter() {
  return (
    <ChapterSlide
      title="Hva får du igjen?"
      subtitle="Fire effekter, med eksempler fra sjøveien"
    />
  );
}

/* Én effekt per slide: nummer, påstand og ett konkret eksempel fra Kystverket */
function Effekt({
  nummer,
  etikett,
  paastand,
  eksempel,
}: {
  nummer: string;
  etikett: string;
  paastand: string;
  eksempel: string;
}) {
  return (
    <>
      <Box box={[80, 120, 300, 200]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(120),
            lineHeight: 1,
            color: "var(--red)",
          }}
        >
          {nummer}
        </div>
      </Box>
      <Box box={[80, 300, 1120, 60]}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            letterSpacing: 2,
            color: "#9a5068",
          }}
        >
          {etikett.toUpperCase()}
        </div>
      </Box>
      <Box box={[80, 335, 1120, 120]}>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(46),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          {paastand}
        </div>
      </Box>
      <Reveal at={1}>
        <Box
          box={[80, 480, 1100, 130]}
          style={{
            borderLeft: "3px solid var(--red)",
            paddingLeft: 24,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(20),
              lineHeight: 1.45,
              color: "var(--burgundy-2)",
            }}
          >
            {eksempel}
          </div>
        </Box>
      </Reveal>
    </>
  );
}

export function SlideEffektKvalitet() {
  return (
    <Effekt
      nummer="1"
      etikett="Kvalitet"
      paastand="Data du tør å ta beslutninger på"
      eksempel="Utslippstallene våre starter i 2016. Ikke fordi vi mangler data før det, men fordi vi vet nøyaktig hva som endret seg i innsamlingen i 2015. Den kunnskapen ligger i plattformen, ikke i hodet på én person."
    />
  );
}

export function SlideEffektEtterlevelse() {
  return (
    <Effekt
      nummer="2"
      etikett="Etterlevelse"
      paastand="Reglene bygges inn én gang, ett sted"
      eksempel="Fiskefartøy under 15 meter og fritidsbåter under 45 meter skal ikke ut i de åpne dataene. Det filteret ligger i plattformen. Hver konsument slipper å huske det selv."
    />
  );
}

export function SlideEffektEffektivitet() {
  return (
    <Effekt
      nummer="3"
      etikett="Effektivitet"
      paastand="Selvbetjening i stedet for bestilling"
      eksempel="Før: en e-post til en analytiker, og så vente. Nå: hvem som helst bestiller inntil ett år med historikk på hais.kystverket.no, og får en Parquet-fil i innboksen."
    />
  );
}

export function SlideEffektFremtid() {
  return (
    <Effekt
      nummer="4"
      etikett="Fremtidsrettet"
      paastand="KI der dataene allerede bor"
      eksempel="Utslippsmodellen bruker nevrale nett til å fylle hull i skipsregisteret. Modellen kjører på samme plattform som dataene, med samme tilgangsstyring. Ingen kopiering ut til et sideprosjekt."
    />
  );
}
