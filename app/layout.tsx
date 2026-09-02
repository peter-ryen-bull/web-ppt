import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-manrope",
});

const gelica = localFont({
  src: [
    { path: "./fonts/Gelica-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Gelica-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Gelica-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Gelica-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-gelica",
});

export const metadata: Metadata = {
  title: "Presentasjoner",
  description: "Interaktive presentasjoner som webapp",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nb"
      className={`${dmSans.variable} ${manrope.variable} ${gelica.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
