"use client";

import { Copy } from "@/components/Copy";
import { useStep } from "@/components/steps";
import { Box, BulletList, ChapterSlide, Reveal } from "../parts";
import { BackupTidslinje, Versjoner } from "./figurer/Tidslinjer";
import { Header, IkonKort, Notat, Tabell, type RadTilstand } from "./ui";

/* Kapittel: Å slette er ikke å slette */
export function SlideKapLagring() {
  return <ChapterSlide subtitle={<Copy k="subtitle" />} />;
}

/* Tidsreise og VACUUM */
export function SlideVersjoner() {
  return (
    <>
      <Header />
      <Box box={[81.3, 170, 660, 380]}>
        <Versjoner />
      </Box>
      <BulletList
        box={[790, 190, 410, 360]}
        itemsKey="items"
        fromStep={1}
        size={19}
        gap={24}
      />
      <Reveal at={3}>
        <Notat box={[81.3, 588, 1117.3, 76]} />
      </Reveal>
    </>
  );
}

/* Backup: slett i backup, eller slettelogg */
export function SlideBackup() {
  return (
    <>
      <Header />
      <IkonKort box={[81.3, 170, 545, 212]} i={0} ikon="lag" titleSize={22} />
      <IkonKort
        box={[653.3, 170, 545, 212]}
        i={1}
        ikon="bok"
        bar="var(--red)"
        titleSize={22}
      />
      <Box box={[81.3, 396, 1117, 190]}>
        <BackupTidslinje />
      </Box>
      <Reveal at={3}>
        <Notat box={[81.3, 602, 1117.3, 64]} />
      </Reveal>
    </>
  );
}

/* Soft delete er ikke sletting */
export function SlideSoftDelete() {
  const step = useStep();
  const tilstand: RadTilstand[] = [
    "normal",
    step >= 1 ? "markert" : "normal",
    "normal",
    "normal",
  ];
  return (
    <>
      <Header />
      <Tabell
        x={81.3}
        y={190}
        w={560}
        radH={46}
        size={16}
        tittel="kunde"
        kolonner={["id", "navn", "e-post", "slettet"]}
        bredder={[0.5, 1.4, 1.9, 0.9]}
        rader={[
          ["41", "Ola Hansen", "ola@example.com", "nei"],
          ["42", "Kari Nordmann", "kari@example.com", "ja"],
          ["43", "Per Olsen", "per@example.com", "nei"],
          ["44", "Siri Berg", "siri@example.com", "nei"],
        ]}
        tilstand={tilstand}
      />
      <BulletList
        box={[690, 190, 510, 420]}
        itemsKey="items"
        fromStep={1}
        size={19}
        gap={22}
      />
    </>
  );
}
