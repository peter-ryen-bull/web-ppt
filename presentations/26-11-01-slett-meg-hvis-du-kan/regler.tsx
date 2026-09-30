"use client";

import { Copy } from "@/components/Copy";
import { Box, BulletList, ChapterSlide, Reveal, pt } from "../parts";
import { Header, IkonKort, Notat, serif } from "./ui";

/* Kapittel: Hva sier loven? */
export function SlideKapRegler() {
  return <ChapterSlide subtitle={<Copy k="subtitle" />} />;
}

/* GDPR artikkel 17, 12 og 19 */
export function SlideLoven() {
  const x = [81.3, 473.8, 866.3];
  const ikon = ["klokke", "nettverk", "konvolutt"] as const;
  return (
    <>
      <Header />
      {x.map((left, i) => (
        <Reveal key={i} at={i + 1}>
          <IkonKort
            box={[left, 170, 352, 390]}
            i={i}
            ikon={ikon[i]}
            bar={i === 1 ? "var(--red)" : "var(--burgundy)"}
          />
        </Reveal>
      ))}
      <Notat box={[81.3, 600, 1117.3, 52]} k="kilde" />
    </>
  );
}

/* Når du ikke skal slette */
export function SlideUnntak() {
  return (
    <>
      <Header />
      <BulletList
        box={[81.3, 180, 740, 420]}
        itemsKey="items"
        fromStep={1}
        size={21}
        gap={26}
      />
      <Reveal at={5}>
        <Box
          box={[870, 180, 330, 300]}
          style={{
            background: "var(--burgundy)",
            padding: "30px 28px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Copy
            k="punch"
            as="div"
            style={{
              ...serif,
              fontSize: pt(26),
              lineHeight: 1.25,
              color: "var(--cream)",
            }}
          />
        </Box>
      </Reveal>
    </>
  );
}
