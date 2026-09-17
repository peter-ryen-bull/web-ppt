import type { ReactNode } from "react";
import { Copy } from "@/components/Copy";
import { Box, ChapterSlide, Reveal, pt } from "../parts";
import {
  Automatikk,
  BrikkeMedGnist,
  EffektRad,
  Hengelas,
  SkjoldHake,
} from "./figurer/strek";

/* Kapittel: Hva får du igjen? */
export function SlideEffekter() {
  return (
    <>
      <ChapterSlide
        title={<Copy k="title" />}
        subtitle={<Copy k="subtitle" />}
        showLogo={false}
      />
      <Box box={[140, 60, 1000, 150]}>
        <EffektRad />
      </Box>
    </>
  );
}

/* Én effekt per slide: nummer, påstand, en liten figur og ett konkret eksempel fra Kystverket */
function Effekt({ figur }: { figur: ReactNode }) {
  return (
    <>
      <Box box={[760, 110, 420, 150]}>{figur}</Box>
      <Box box={[80, 120, 300, 200]}>
        <Copy
          k="nummer"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(120),
            lineHeight: 1,
            color: "var(--red)",
          }}
        />
      </Box>
      <Box box={[80, 300, 1120, 60]}>
        <Copy
          k="etikett"
          as="div"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: pt(14),
            letterSpacing: 2,
            color: "#9a5068",
            textTransform: "uppercase",
          }}
        />
      </Box>
      <Box box={[80, 335, 1120, 120]}>
        <Copy
          k="paastand"
          as="div"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: pt(46),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      <Reveal at={1}>
        <Box
          box={[80, 480, 1100, 130]}
          style={{
            height: "auto",
            borderLeft: "3px solid var(--red)",
            paddingLeft: 24,
          }}
        >
          <Copy
            k="eksempel"
            as="div"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: pt(22),
              lineHeight: 1.35,
              color: "var(--red)",
            }}
          />
        </Box>
      </Reveal>
    </>
  );
}

export function SlideEffektKvalitet() {
  return <Effekt figur={<SkjoldHake />} />;
}

export function SlideEffektEtterlevelse() {
  return <Effekt figur={<Hengelas />} />;
}

export function SlideEffektEffektivitet() {
  return <Effekt figur={<Automatikk />} />;
}

export function SlideEffektFremtid() {
  return <Effekt figur={<BrikkeMedGnist />} />;
}
