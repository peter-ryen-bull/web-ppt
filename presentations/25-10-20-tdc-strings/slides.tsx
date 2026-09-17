"use client";

import type { CSSProperties, ReactNode } from "react";
import { Box, Img, MilesLogo, pt } from "../parts";

/*
 * TDC 20. okt 2025 – «We’re Obsessed with Strings».
 * Posisjoner og størrelser er hentet fra PowerPoint-XML-en (EMU / 9525 = px).
 * image77 / image86 / image91 er kremfargede masker som avdekker kode,
 * slik originalen gjorde det.
 */

const M = "/media/25-10-20-tdc-strings";

function Title({
  box,
  size = 54,
  bold = true,
  children,
  style,
}: {
  box: [number, number, number, number];
  size?: number;
  bold?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <Box
      box={box}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: pt(size),
          fontWeight: bold ? 700 : 400,
          lineHeight: 1.2,
          color: "var(--burgundy)",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

function Lines({
  box,
  size = 24,
  bold = false,
  gap = 8,
  items,
}: {
  box: [number, number, number, number];
  size?: number;
  bold?: boolean;
  gap?: number;
  items: Array<string | { text: string; size?: number; bold?: boolean }>;
}) {
  return (
    <Box
      box={box}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap,
      }}
    >
      {items.map((item, i) => {
        const text = typeof item === "string" ? item : item.text;
        const sz = typeof item === "string" ? size : (item.size ?? size);
        const b = typeof item === "string" ? bold : (item.bold ?? bold);
        return (
          <div
            key={`${i}-${text}`}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: pt(sz),
              fontWeight: b ? 700 : 400,
              lineHeight: 1.25,
              color: "var(--burgundy)",
              whiteSpace: "pre-wrap",
            }}
          >
            {text}
          </div>
        );
      })}
    </Box>
  );
}

function Frame({
  logo = true,
  children,
}: {
  logo?: boolean;
  children?: ReactNode;
}) {
  return (
    <>
      {logo && <MilesLogo />}
      {children}
    </>
  );
}


export function Slide01() {
  return (
    <Frame>
      <Title box={[39.0, 272.6, 1038.3, 401.1]} size={54} bold>We’re Obsessed with Strings: Is there an Alternative?</Title>
    </Frame>
  );
}

export function Slide02() {
  return (
    <Frame logo={false}>
      <Lines box={[39.0, 269.8, 551.0, 416.9]} size={44} gap={8} items={[
          "Peter Bull Hove",
          {"text": "🫶  C#/.NET", "size": 28},
          {"text": "🫶  Databricks", "size": 28},
          {"text": "🫶  Azure", "size": 28},
        ]} />
      <Img box={[744.6, 8.3, 526.0, 703.5]} src={`${M}/image71.jpg`} alt="Peter Bull Hove" fit="cover" />
    </Frame>
  );
}

export function Slide03() {
  return (
    <Frame>
      <Title box={[49.5, 339.9, 1038.3, 401.1]} size={54} bold>Trust Issues</Title>
    </Frame>
  );
}

export function Slide04() {
  return (
    <Frame>
      <Title box={[49.5, 339.9, 1038.3, 401.1]} size={54} bold>Trust Issues</Title>
      <Img box={[517.8, 506.1, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
    </Frame>
  );
}

export function Slide05() {
  return (
    <Frame>
      <Lines box={[39.0, 202.5, 1088.6, 471.2]} size={16} gap={10} items={[
          "Sources",
          "Stringly Typed vs Strongly Typed - Scott Hanselman's Blog",
          "https://www.hanselman.com/blog/stringly-typed-vs-strongly-typed",
          "- Modern C# Techniques, Part 2: Value Records",
          "https://blog.stephencleary.com/2022/10/modern-csharp-techniques-2-value-records.html",
          "Value Objects in C# - Code Maze",
          "https://code-maze.com/csharp-value-objects/",
          "Parameter binding in Minimal API applications | Microsoft Learn",
          "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/parameter-binding?view=aspnetcore-9.0",
        ]} />
    </Frame>
  );
}

export function Slide06() {
  return (
    <Frame>
      <Lines box={[39.0, 202.5, 1088.6, 471.2]} size={16} gap={10} items={[
          "Sources",
          "Stringly Typed vs Strongly Typed - Scott Hanselman's Blog",
          "https://www.hanselman.com/blog/stringly-typed-vs-strongly-typed",
          "- Modern C# Techniques, Part 2: Value Records",
          "https://blog.stephencleary.com/2022/10/modern-csharp-techniques-2-value-records.html",
          "Value Objects in C# - Code Maze",
          "https://code-maze.com/csharp-value-objects/",
          "Parameter binding in Minimal API applications | Microsoft Learn",
          "https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/parameter-binding?view=aspnetcore-9.0",
        ]} />
      <Title box={[816.9, 258.3, 379.0, 74.3]} size={40} bold={false}>Stringly Typed</Title>
    </Frame>
  );
}

export function Slide07() {
  return (
    <Frame>
      <Img box={[565.4, 117.8, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
      <Img box={[19.2, 491.8, 1221.8, 178.4]} src={`${M}/image73.png`} alt="" />
      <Img box={[39.0, 91.3, 423.4, 178.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide08() {
  return (
    <Frame>
      <Img box={[565.4, 117.8, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
      <Img box={[19.2, 491.8, 1221.8, 178.4]} src={`${M}/image73.png`} alt="" />
      <Title box={[1140.8, 89.2, 640.0, 138.9]} size={80} bold={false}>😏</Title>
      <Img box={[39.0, 91.3, 423.4, 178.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide09() {
  return (
    <Frame>
      <Img box={[35.5, 304.7, 770.9, 356.8]} src={`${M}/image75.png`} alt="" />
      <Img box={[565.4, 117.8, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
      <Img box={[19.2, 491.8, 1221.8, 178.4]} src={`${M}/image73.png`} alt="" />
      <Title box={[1140.8, 89.2, 640.0, 138.9]} size={80} bold={false}>😏</Title>
      <Img box={[39.0, 91.3, 423.4, 178.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide10() {
  return (
    <Frame>
      <Img box={[35.5, 304.7, 770.9, 356.8]} src={`${M}/image75.png`} alt="" />
      <Img box={[565.4, 117.8, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
      <Title box={[1140.8, 89.2, 640.0, 138.9]} size={80} bold={false}>😏</Title>
      <Img box={[39.0, 91.3, 423.4, 178.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide11() {
  return (
    <Frame>
      <Img box={[35.5, 304.7, 770.9, 356.8]} src={`${M}/image75.png`} alt="" />
      <Img box={[565.4, 117.8, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
      <Title box={[836.1, 511.4, 141.4, 48.5]} size={24} bold={false}>LGTM👍</Title>
      <Title box={[1140.8, 89.2, 640.0, 138.9]} size={80} bold={false}>😏</Title>
      <Img box={[39.0, 91.3, 423.4, 178.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide12() {
  return (
    <Frame>
      <Img box={[35.5, 304.7, 770.9, 356.8]} src={`${M}/image75.png`} alt="" />
      <Img box={[565.4, 117.8, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
      <Title box={[836.1, 511.4, 141.4, 48.5]} size={24} bold={false}>LGTM👍</Title>
      <Title box={[1035.2, 472.6, 159.1, 48.5]} size={24} bold={false}>LGTM2👍</Title>
      <Title box={[1140.8, 89.2, 640.0, 138.9]} size={80} bold={false}>😏</Title>
      <Img box={[39.0, 91.3, 423.4, 178.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide13() {
  return (
    <Frame>
      <Img box={[35.5, 304.7, 770.9, 356.8]} src={`${M}/image75.png`} alt="" />
      <Img box={[565.4, 117.8, 675.6, 151.9]} src={`${M}/image72.png`} alt="" />
      <Title box={[924.2, 450.8, 213.4, 171.3]} size={100} bold={false}>🫠</Title>
      <Title box={[1140.8, 89.2, 640.0, 138.9]} size={80} bold={false}>😏</Title>
      <Img box={[39.0, 91.3, 423.4, 178.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide14() {
  return (
    <Frame>
      {null}
    </Frame>
  );
}

export function Slide15() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 139.2, 873.6, 628.8]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide16() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 166.4, 873.6, 601.6]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide17() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 190.4, 873.6, 577.6]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide18() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 226.7, 873.6, 541.3]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide19() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 360.0, 873.6, 408.0]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide20() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 446.4, 873.6, 321.6]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide21() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 531.2, 873.6, 236.8]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide22() {
  return (
    <Frame>
      <Img box={[235.1, 0.0, 809.7, 720.0]} src={`${M}/image76.png`} alt="" />
      <Img box={[203.2, 662.4, 873.6, 105.6]} src={`${M}/image77.png`} alt="" />
    </Frame>
  );
}

export function Slide23() {
  return (
    <Frame>
      <Img box={[366.7, 245.3, 546.7, 229.3]} src={`${M}/image78.png`} alt="" />
      <Img box={[366.7, 245.3, 546.7, 230.5]} src={`${M}/image74.png`} alt="" />
    </Frame>
  );
}

export function Slide24() {
  return (
    <Frame>
      <Img box={[366.7, 245.3, 546.7, 229.3]} src={`${M}/image78.png`} alt="" />
    </Frame>
  );
}

export function Slide25() {
  return (
    <Frame>
      <Lines box={[56.7, 363.9, 1048.1, 100.2]} size={28} gap={10} bold items={[
          "First benefit of Value Objects:",
          {"text": " they are validated on create, and can therefore be trusted", "bold": false},
        ]} />
    </Frame>
  );
}

export function Slide26() {
  return (
    <Frame>
      <Title box={[56.7, 363.9, 1048.1, 54.9]} size={28} bold={false}>What about IValidator you might ask….</Title>
    </Frame>
  );
}

export function Slide27() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 458.6, 401.1]} size={54} bold>Abstractions</Title>
      <Img box={[497.6, 397.7, 769.6, 135.1]} src={`${M}/image79.png`} alt="" />
    </Frame>
  );
}

export function Slide28() {
  return (
    <Frame>
      <Img box={[613.7, 89.1, 537.3, 426.7]} src={`${M}/image80.png`} alt="" />
      <Title box={[39.0, 269.8, 458.6, 401.1]} size={54} bold>Abstractions</Title>
      <Img box={[497.6, 397.7, 769.6, 135.1]} src={`${M}/image79.png`} alt="" />
    </Frame>
  );
}

export function Slide29() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 458.6, 401.1]} size={54} bold>Abstractions</Title>
      <Img box={[613.7, 89.1, 537.3, 426.7]} src={`${M}/image80.png`} alt="" />
    </Frame>
  );
}

export function Slide30() {
  return (
    <Frame>
      <Img box={[555.7, 114.3, 685.3, 416.0]} src={`${M}/image81.png`} alt="" />
      <Title box={[39.0, 269.8, 458.6, 401.1]} size={54} bold>Abstractions</Title>
      <Img box={[497.6, 397.7, 769.6, 135.1]} src={`${M}/image79.png`} alt="" />
    </Frame>
  );
}

export function Slide31() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 458.6, 401.1]} size={54} bold>Abstractions</Title>
      <Img box={[555.7, 114.3, 685.3, 416.0]} src={`${M}/image81.png`} alt="" />
    </Frame>
  );
}

export function Slide32() {
  return (
    <Frame>
      <Lines box={[56.7, 363.9, 1048.1, 100.2]} size={28} gap={10} bold items={[
          "Second benefit of Value Objects:",
          {"text": " they provide great abstractions for the user", "bold": false},
        ]} />
    </Frame>
  );
}

export function Slide33() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 913.0, 401.1]} size={54} bold>What really are Value Objects though?</Title>
    </Frame>
  );
}

export function Slide34() {
  return (
    <Frame>
      <Lines box={[108.6, 269.8, 559.7, 401.1]} size={54} gap={8} bold items={[
          "Entity",
          {"text": "Id (typically)", "size": 24},
          {"text": "Mutable (typically)", "size": 24},
        ]} />
      <Lines box={[712.7, 269.8, 458.6, 401.1]} size={54} gap={8} bold items={[
          "Value Object",
          {"text": "Only Value or values", "size": 24},
          {"text": "Readonly", "size": 24},
        ]} />
    </Frame>
  );
}

export function Slide35() {
  return (
    <Frame>
      <Img box={[49.2, 82.8, 497.3, 222.7]} src={`${M}/image82.png`} alt="" />
    </Frame>
  );
}

export function Slide36() {
  return (
    <Frame>
      <Img box={[49.2, 82.8, 497.3, 222.7]} src={`${M}/image82.png`} alt="" />
      <Img box={[425.2, 360.0, 746.7, 72.0]} src={`${M}/image83.png`} alt="" />
    </Frame>
  );
}

export function Slide37() {
  return (
    <Frame>
      <Img box={[49.2, 82.8, 497.3, 222.7]} src={`${M}/image82.png`} alt="" />
      <Img box={[425.2, 360.0, 746.7, 72.0]} src={`${M}/image83.png`} alt="" />
      <Img box={[49.2, 82.8, 684.2, 222.7]} src={`${M}/image84.png`} alt="" />
    </Frame>
  );
}

export function Slide38() {
  return (
    <Frame>
      <Img box={[59.2, 116.9, 1186.0, 441.5]} src={`${M}/image85.png`} alt="" />
      <Img box={[39.6, 209.5, 1205.6, 360.1]} src={`${M}/image86.png`} alt="" />
    </Frame>
  );
}

export function Slide39() {
  return (
    <Frame>
      <Img box={[59.2, 116.9, 1186.0, 441.5]} src={`${M}/image85.png`} alt="" />
      <Img box={[39.6, 268.8, 1205.6, 300.8]} src={`${M}/image86.png`} alt="" />
    </Frame>
  );
}

export function Slide40() {
  return (
    <Frame>
      <Img box={[59.2, 116.9, 1186.0, 441.5]} src={`${M}/image85.png`} alt="" />
      <Img box={[39.6, 296.0, 1205.6, 273.6]} src={`${M}/image86.png`} alt="" />
    </Frame>
  );
}

export function Slide41() {
  return (
    <Frame>
      <Img box={[59.2, 116.9, 1186.0, 441.5]} src={`${M}/image85.png`} alt="" />
      <Img box={[39.6, 360.0, 1205.6, 209.6]} src={`${M}/image86.png`} alt="" />
    </Frame>
  );
}

export function Slide42() {
  return (
    <Frame>
      <Img box={[59.2, 116.9, 1186.0, 441.5]} src={`${M}/image85.png`} alt="" />
      <Img box={[39.6, 516.8, 1205.6, 52.8]} src={`${M}/image86.png`} alt="" />
    </Frame>
  );
}

export function Slide43() {
  return (
    <Frame>
      <Lines box={[56.7, 363.9, 1048.1, 100.2]} size={28} gap={10} bold items={[
          "Third benefit of Value Objects:",
          {"text": " they can bind connected primitives together", "bold": false},
        ]} />
    </Frame>
  );
}

export function Slide44() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 559.7, 401.1]} size={54} bold>How to implement a Value Object</Title>
    </Frame>
  );
}

export function Slide45() {
  return (
    <Frame>
      <Img box={[78.7, 125.7, 1164.0, 138.3]} src={`${M}/image87.png`} alt="" />
    </Frame>
  );
}

export function Slide46() {
  return (
    <Frame>
      <Img box={[161.9, 136.9, 729.3, 86.7]} src={`${M}/image87.png`} alt="" />
      <Lines box={[161.9, 333.5, 640.6, 164.8]} size={24} gap={10} items={[
          "The options are",
          "A) Class",
        ]} />
      <Img box={[78.7, 125.7, 1164.0, 138.3]} src={`${M}/image87.png`} alt="" />
    </Frame>
  );
}

export function Slide47() {
  return (
    <Frame>
      <Img box={[161.9, 136.9, 729.3, 86.7]} src={`${M}/image87.png`} alt="" />
      <Lines box={[161.9, 333.5, 640.6, 126.0]} size={24} gap={10} items={[
          "The options are",
          "A) Class",
          "B) Struct",
        ]} />
      <Img box={[78.7, 125.7, 1164.0, 138.3]} src={`${M}/image87.png`} alt="" />
    </Frame>
  );
}

export function Slide48() {
  return (
    <Frame>
      <Img box={[161.9, 136.9, 729.3, 86.7]} src={`${M}/image87.png`} alt="" />
      <Lines box={[161.9, 333.5, 640.6, 164.8]} size={24} gap={10} items={[
          "The options are",
          "A) Class",
          "B) Struct",
          "C) Record class (ie. record)",
        ]} />
      <Img box={[78.7, 125.7, 1164.0, 138.3]} src={`${M}/image87.png`} alt="" />
    </Frame>
  );
}

export function Slide49() {
  return (
    <Frame>
      <Img box={[161.9, 136.9, 729.3, 86.7]} src={`${M}/image87.png`} alt="" />
      <Lines box={[161.9, 333.5, 640.6, 203.6]} size={24} gap={10} items={[
          "The options are",
          "A) Class",
          "B) Struct",
          "C) Record class (ie. record)",
          "D) Record struct",
        ]} />
      <Img box={[78.7, 125.7, 1164.0, 138.3]} src={`${M}/image87.png`} alt="" />
    </Frame>
  );
}

export function Slide50() {
  return (
    <Frame>
      <Img box={[161.9, 136.9, 729.3, 86.7]} src={`${M}/image87.png`} alt="" />
      <Lines box={[161.9, 333.5, 640.6, 216.5]} size={24} gap={10} items={[
          "The options are",
          "A) Class",
          "B) Struct",
          {"text": "C) Record class (ie. record)", "size": 32, "bold": true},
          "D) Record struct",
        ]} />
      <Img box={[73.3, 121.3, 1161.3, 142.1]} src={`${M}/image88.png`} alt="" />
    </Frame>
  );
}

export function Slide51() {
  return (
    <Frame>
      <Lines box={[42.2, 270.8, 559.7, 401.1]} size={54} gap={8} bold items={[
          "APIs and ORMs",
          "+ Value Objects",
        ]} />
    </Frame>
  );
}

export function Slide52() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 687.1, 401.1]} size={54} bold>Entity Framework + Value Objects</Title>
    </Frame>
  );
}

export function Slide53() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 687.1, 401.1]} size={54} bold>Entity Framework + Value Objects</Title>
      <Img box={[382.6, 30.5, 865.2, 222.8]} src={`${M}/image89.png`} alt="" />
    </Frame>
  );
}

export function Slide54() {
  return (
    <Frame>
      <Img box={[87.3, 67.2, 1136.7, 503.5]} src={`${M}/image90.png`} alt="" />
      <Img box={[36.3, 206.4, 1243.7, 464.0]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide55() {
  return (
    <Frame>
      <Img box={[87.3, 67.2, 1136.7, 503.5]} src={`${M}/image90.png`} alt="" />
      <Img box={[56.0, 252.8, 1243.7, 416.0]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide56() {
  return (
    <Frame>
      <Img box={[87.3, 67.2, 1136.7, 503.5]} src={`${M}/image90.png`} alt="" />
      <Img box={[56.0, 324.8, 1243.7, 344.0]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide57() {
  return (
    <Frame>
      <Img box={[87.3, 67.2, 1136.7, 503.5]} src={`${M}/image90.png`} alt="" />
      <Img box={[56.0, 360.0, 1243.7, 308.8]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide58() {
  return (
    <Frame>
      <Img box={[87.3, 67.2, 1136.7, 503.5]} src={`${M}/image90.png`} alt="" />
      <Img box={[56.0, 408.0, 1243.7, 260.8]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide59() {
  return (
    <Frame>
      <Img box={[87.3, 67.2, 1136.7, 503.5]} src={`${M}/image90.png`} alt="" />
      <Img box={[56.0, 570.7, 1243.7, 98.1]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide60() {
  return (
    <Frame>
      <Img box={[108.8, 123.7, 1035.6, 472.7]} src={`${M}/image92.png`} alt="" />
    </Frame>
  );
}

export function Slide61() {
  return (
    <Frame>
      <Title box={[39.0, 269.8, 687.1, 401.1]} size={54} bold>API Serialization + Value Objects</Title>
    </Frame>
  );
}

export function Slide62() {
  return (
    <Frame>
      <Img box={[0.0, 199.2, 1271.3, 383.8]} src={`${M}/image93.png`} alt="" />
      <Img box={[0.0, 259.2, 1271.3, 323.8]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide63() {
  return (
    <Frame>
      <Img box={[0.0, 199.2, 1271.3, 383.8]} src={`${M}/image93.png`} alt="" />
      <Img box={[0.0, 422.4, 1271.3, 160.6]} src={`${M}/image91.png`} alt="" />
    </Frame>
  );
}

export function Slide64() {
  return (
    <Frame>
      <Img box={[0.0, 199.2, 1271.3, 383.8]} src={`${M}/image93.png`} alt="" />
    </Frame>
  );
}

export function Slide65() {
  return (
    <Frame>
      <Lines box={[56.7, 363.9, 1048.1, 100.2]} size={28} gap={10} bold items={[
          "Forth benefit of Value Objects:",
          {"text": " you define the parsing and serialization logic in one place", "bold": false},
        ]} />
    </Frame>
  );
}

export function Slide66() {
  return (
    <Frame>
      <Lines box={[522.5, 321.1, 636.7, 235.7]} size={28} gap={18} items={["1. Overusage"]} />
      <Title box={[39.0, 277.8, 303.1, 401.1]} size={54} bold>Pitfalls</Title>
    </Frame>
  );
}

export function Slide67() {
  return (
    <Frame>
      <Lines box={[522.5, 321.1, 636.7, 235.7]} size={28} gap={18} items={["1. Overusage",
          "2. Mutability"]} />
      <Title box={[39.0, 269.8, 303.1, 401.1]} size={54} bold>Pitfalls</Title>
    </Frame>
  );
}

export function Slide68() {
  return (
    <Frame>
      <Lines box={[522.5, 321.1, 636.7, 235.7]} size={28} gap={18} items={["1. Overusage",
          "2. Mutability",
          "3. Serialization / ORM"]} />
      <Title box={[39.0, 269.8, 303.1, 401.1]} size={54} bold>Pitfalls</Title>
    </Frame>
  );
}

export function Slide69() {
  return (
    <Frame>
      <Lines box={[522.5, 321.1, 636.7, 235.7]} size={28} gap={18} items={["1. Overusage",
          "2. Mutability",
          "3. Serialization / ORM",
          "4. Team and coding"]} />
      <Title box={[39.0, 269.8, 303.1, 401.1]} size={54} bold>Pitfalls</Title>
    </Frame>
  );
}

export function Slide70() {
  return (
    <Frame>
      <Title box={[59.4, 270.1, 580.6, 401.1]} size={54} bold>Go Forth and code on</Title>
      <Img box={[820.1, 32.2, 514.8, 115.8]} src={`${M}/image72.png`} alt="" />
      <Title box={[1190.4, 212.0, 674.4, 90.5]} size={50} bold={false}>😏</Title>
    </Frame>
  );
}

