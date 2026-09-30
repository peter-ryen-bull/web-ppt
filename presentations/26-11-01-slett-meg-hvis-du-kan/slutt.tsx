"use client";

import { Copy } from "@/components/Copy";
import { Box, BulletList, ChapterSlide, Reveal, pt } from "../parts";
import { Header, sans } from "./ui";

/* Fem spørsmål du kan stille i morgen */
export function SlideSporsmaal() {
  return (
    <>
      <Header />
      <BulletList
        box={[81.3, 185, 1040, 440]}
        itemsKey="items"
        fromStep={1}
        size={24}
        gap={30}
      />
    </>
  );
}

/* Avslutning */
export function SlideSlutt() {
  return (
    <>
      <ChapterSlide
        title={<Copy k="title" />}
        subtitle={<Copy k="subtitle" />}
        titleSize={52}
      />
      <Reveal at={1}>
        <Box
          box={[160, 620, 960, 40]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Copy
            k="takk"
            as="div"
            style={{ ...sans, fontSize: pt(18), color: "var(--burgundy)" }}
          />
        </Box>
      </Reveal>
    </>
  );
}
