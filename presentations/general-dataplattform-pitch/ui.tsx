"use client";

import type { CSSProperties, ReactNode } from "react";
import { Copy, useCopyCount, useHasCopy } from "@/components/Copy";
import { Box, MilesLogo, pt } from "../parts";

export const MEDIA = "/media/general-dataplattform-pitch";
export const CREAM_PINK = "#FBE3E0";
export const MUTED = "#5A4A50";

const sans: CSSProperties = { fontFamily: "var(--font-sans)" };
const serif: CSSProperties = { fontFamily: "var(--font-serif)" };

export function Header({ titleSize = 30 }: { titleSize?: number }) {
  const hasLead = useHasCopy("lead");
  return (
    <>
      <MilesLogo />
      <Box box={[81.3, 48, 800, 29.3]}>
        <Copy
          k="kicker"
          as="div"
          style={{
            ...sans,
            fontSize: pt(14),
            letterSpacing: 1.2,
            color: "var(--red)",
          }}
        />
      </Box>
      <Box box={[81.3, 77.3, 1117.3, titleSize >= 28 ? 53.3 : 58.7]}>
        <Copy
          k="title"
          as="div"
          style={{
            ...serif,
            fontSize: pt(titleSize),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        />
      </Box>
      {hasLead && (
        <Box box={[81.3, 138.7, 880, 32]}>
          <Copy
            k="lead"
            as="div"
            style={{
              ...sans,
              fontSize: pt(14),
              color: "var(--burgundy)",
            }}
          />
        </Box>
      )}
    </>
  );
}

export function Card({
  box,
  bar,
  barSide = "top",
  bg = "#fff",
  style,
  children,
}: {
  box: [number, number, number, number];
  bar?: string;
  barSide?: "top" | "left";
  bg?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <Box
      box={box}
      style={{
        background: bg,
        overflow: "hidden",
        ...style,
      }}
    >
      {bar && barSide === "top" && (
        <div
          style={{
            position: "absolute",
            left: 5.4,
            top: 0,
            width: box[2] - 10.7,
            height: 8,
            background: bar,
          }}
        />
      )}
      {bar && barSide === "left" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 10.7,
            width: 8,
            height: box[3] - 21.4,
            background: bar,
          }}
        />
      )}
      {children}
    </Box>
  );
}

export function Label({
  children,
  size = 15,
  color = "var(--burgundy)",
  weight = 700,
}: {
  children?: ReactNode;
  size?: number;
  color?: string;
  weight?: number;
}) {
  return (
    <div
      style={{
        ...sans,
        fontSize: pt(size),
        fontWeight: weight,
        lineHeight: 1.25,
        color,
      }}
    >
      {children}
    </div>
  );
}

export function Body({
  children,
  size = 14,
  color = "var(--burgundy)",
}: {
  children?: ReactNode;
  size?: number;
  color?: string;
}) {
  return (
    <div
      style={{
        ...sans,
        fontSize: pt(size),
        lineHeight: 1.35,
        color,
      }}
    >
      {children}
    </div>
  );
}

export function Stack({
  itemsK,
  titleK,
  titleColor,
  gap = 8,
  size = 14,
  color = "var(--burgundy)",
}: {
  itemsK?: string;
  titleK?: string;
  titleColor?: string;
  gap?: number;
  size?: number;
  color?: string;
}) {
  const copyCount = useCopyCount(itemsK ?? "");
  const nodes = itemsK
    ? Array.from({ length: copyCount }, (_, i) => (
        <Copy key={i} k={itemsK} i={i} />
      ))
    : [];
  const titleNode = titleK ? <Copy k={titleK} /> : null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {titleNode != null && (
        <Label size={size + 1} color={titleColor ?? color}>
          {titleNode}
        </Label>
      )}
      {nodes.map((item, i) => (
        <Body key={i} size={size} color={color}>
          {item}
        </Body>
      ))}
    </div>
  );
}

export function FooterNote({
  box,
  k = "footer",
}: {
  box?: [number, number, number, number];
  k?: string;
}) {
  return (
    <Box
      box={box ?? [81.3, 648, 1117.3, 56]}
      style={{
        background: CREAM_PINK,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          ...sans,
          fontSize: pt(15),
          lineHeight: 1.3,
          color: "var(--burgundy)",
        }}
      >
        <Copy k={k} as="div" />
      </div>
    </Box>
  );
}
