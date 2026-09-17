import type { CSSProperties, ReactNode } from "react";
import { Box, Img, pt } from "../parts";

export const MEDIA = "/media/26-03-04-konsulentlivet-miles-onboarding";

const CUTIVE: CSSProperties = {
  fontFamily: "var(--font-cutive-stack)",
  color: "var(--burgundy)",
};

export function Logo() {
  return <Img box={[44.5, 31.8, 97.7, 32]} src={`${MEDIA}/image1.png`} alt="Miles" />;
}

export function Badge({ children = "🧠♥️" }: { children?: ReactNode }) {
  return (
    <Box
      box={[1117.4, 22.6, 150, 82.4]}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ ...CUTIVE, fontSize: pt(45), lineHeight: 1 }}>{children}</div>
    </Box>
  );
}

export function Chrome({ badge = "🧠♥️" }: { badge?: ReactNode }) {
  return (
    <>
      <Logo />
      <Badge>{badge}</Badge>
    </>
  );
}

export function Title({
  children,
  size = 104,
  box = [73.7, 201.7, 1130, 345.7],
}: {
  children?: ReactNode;
  size?: number;
  box?: [number, number, number, number];
}) {
  return (
    <Box
      box={box}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          ...CUTIVE,
          fontSize: pt(size),
          lineHeight: 1.12,
          whiteSpace: "pre-line",
        }}
      >
        {children}
      </div>
    </Box>
  );
}

export function TitleSlide({
  title,
  subtitle,
  badge,
  size = 104,
  box,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  badge?: ReactNode;
  size?: number;
  box?: [number, number, number, number];
}) {
  return (
    <>
      <Chrome badge={badge} />
      <Title size={size} box={box}>
        {title}
      </Title>
      {subtitle && (
        <Box box={[73.7, 547.4, 1130, 58.2]}>
          <div style={{ ...CUTIVE, fontSize: pt(30) }}>{subtitle}</div>
        </Box>
      )}
    </>
  );
}

export function Mask({
  box,
}: {
  box: [number, number, number, number];
}) {
  return <Box box={box} style={{ background: "var(--cream)" }} />;
}

export function Photo({
  src,
  alt,
  box,
  fit = "cover",
  badge,
  showLogo = true,
  children,
}: {
  src: string;
  alt: string;
  box: [number, number, number, number];
  fit?: CSSProperties["objectFit"];
  badge?: ReactNode;
  showLogo?: boolean;
  children?: ReactNode;
}) {
  return (
    <>
      <Img box={box} src={src} alt={alt} fit={fit} />
      {showLogo && <Logo />}
      {badge !== undefined && <Badge>{badge}</Badge>}
      {children}
    </>
  );
}

export { CUTIVE };
