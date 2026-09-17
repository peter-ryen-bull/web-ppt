"use client";

import type { CSSProperties, ReactNode } from "react";
import { Box, MilesLogo, pt } from "../parts";

export const MEDIA = "/media/26-09-11-cloud-connection-kundemote";
export const CREAM_PINK = "#FBE3E0";
export const MUTED = "#5A4A50";

const sans: CSSProperties = { fontFamily: "var(--font-sans)" };
const serif: CSSProperties = { fontFamily: "var(--font-serif)" };

export function Header({
  kicker,
  title,
  lead,
  titleSize = 30,
}: {
  kicker: string;
  title: string;
  lead?: string;
  titleSize?: number;
}) {
  return (
    <>
      <MilesLogo />
      <Box box={[81.3, 48, 800, 29.3]}>
        <div
          style={{
            ...sans,
            fontSize: pt(14),
            letterSpacing: 1.2,
            color: "var(--red)",
          }}
        >
          {kicker}
        </div>
      </Box>
      <Box box={[81.3, 77.3, 1117.3, titleSize >= 28 ? 53.3 : 58.7]}>
        <div
          style={{
            ...serif,
            fontSize: pt(titleSize),
            lineHeight: 1.15,
            color: "var(--burgundy)",
          }}
        >
          {title}
        </div>
      </Box>
      {lead && (
        <Box box={[81.3, 138.7, 880, 32]}>
          <div
            style={{
              ...sans,
              fontSize: pt(14),
              color: "var(--burgundy)",
            }}
          >
            {lead}
          </div>
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
  items,
  title,
  titleColor,
  gap = 8,
  size = 14,
  color = "var(--burgundy)",
}: {
  items: ReactNode[];
  title?: ReactNode;
  titleColor?: string;
  gap?: number;
  size?: number;
  color?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {title != null && (
        <Label size={size + 1} color={titleColor ?? color}>
          {title}
        </Label>
      )}
      {items.map((item, i) => (
        <Body key={i} size={size} color={color}>
          {item}
        </Body>
      ))}
    </div>
  );
}

export function Pill({
  box,
  children,
  bg = "var(--cream)",
  color = "var(--burgundy)",
}: {
  box: [number, number, number, number];
  children?: ReactNode;
  bg?: string;
  color?: string;
}) {
  return (
    <Box
      box={box}
      style={{
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          ...sans,
          fontSize: pt(14),
          lineHeight: 1.2,
          color,
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

export function DarkPanel({
  box,
  children,
}: {
  box: [number, number, number, number];
  children?: ReactNode;
}) {
  return (
    <Box
      box={box}
      style={{
        background: "var(--burgundy)",
        padding: "24px 24px",
      }}
    >
      {children}
    </Box>
  );
}

export function WhyList({
  box,
  items,
}: {
  box: [number, number, number, number];
  items: string[];
}) {
  return (
    <DarkPanel box={box}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Label size={14} color="var(--mint)">
          HVORFOR
        </Label>
        {items.map((item) => (
          <Body key={item} size={14} color="var(--mint)">
            {item}
          </Body>
        ))}
      </div>
    </DarkPanel>
  );
}

export function FooterNote({
  box,
  children,
}: {
  box?: [number, number, number, number];
  children?: ReactNode;
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
        {children}
      </div>
    </Box>
  );
}

export function PinkCard({
  box,
  title,
  body,
}: {
  box: [number, number, number, number];
  title: string;
  body: string;
}) {
  return (
    <Box
      box={box}
      style={{
        background: CREAM_PINK,
        padding: "18px 24px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <Label size={15} color="var(--red-deep)">
          {title}
        </Label>
        <Body size={14} color="var(--burgundy)">
          {body}
        </Body>
      </div>
    </Box>
  );
}

export function RowLabel({
  box,
  children,
}: {
  box: [number, number, number, number];
  children?: ReactNode;
}) {
  return (
    <Box
      box={box}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          ...sans,
          fontSize: pt(14),
          fontWeight: 700,
          letterSpacing: 0.4,
          color: "var(--burgundy)",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

export function Caption({
  box,
  children,
}: {
  box: [number, number, number, number];
  children?: ReactNode;
}) {
  return (
    <Box box={box}>
      <div
        style={{
          ...sans,
          fontSize: pt(14),
          color: MUTED,
        }}
      >
        {children}
      </div>
    </Box>
  );
}
