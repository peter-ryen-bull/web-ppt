import { Box, ChapterSlide, Reveal, pt } from "../parts";

/* Kapittel: Hva får du igjen? */
export function SlideEffekter() {
  return (
    <ChapterSlide
      title="What do you get out of it?"
      subtitle="Four effects, with examples from the sea route"
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
      etikett="Quality"
      paastand="Data you dare to make decisions on"
      eksempel="Our emission numbers start in 2016. Not because we're missing data before that, but because we know exactly what changed in the collection in 2015. That knowledge lives in the platform, not in one person's head."
    />
  );
}

export function SlideEffektEtterlevelse() {
  return (
    <Effekt
      nummer="2"
      etikett="Compliance"
      paastand="The rules are built in once, in one place"
      eksempel="Fishing vessels under 15 meters and leisure boats under 45 meters must not go into the open data. That filter lives in the platform. No consumer has to remember it on their own."
    />
  );
}

export function SlideEffektEffektivitet() {
  return (
    <Effekt
      nummer="3"
      etikett="Efficiency"
      paastand="Self-service instead of requests"
      eksempel="Before: an email to an analyst, then waiting. Now: anyone can order up to a year of history at hais.kystverket.no, and get a Parquet file in their inbox."
    />
  );
}

export function SlideEffektFremtid() {
  return (
    <Effekt
      nummer="4"
      etikett="Future-ready"
      paastand="AI where the data already lives"
      eksempel="The emission model uses neural networks to fill gaps in the ship registry. The model runs on the same platform as the data, with the same access control. No copying out to a side project."
    />
  );
}
