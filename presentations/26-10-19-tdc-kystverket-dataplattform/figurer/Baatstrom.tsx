"use client";

import { useId, type CSSProperties } from "react";
import { Bolger, KREM, Skute, STREK, TEAL } from "./strek/Strek";

const BOAT_COUNT = 30;
const PASS_SECONDS = 18;
// En like lang pause utenfor høyrekanten gir dobbelt avstand uten økt fart.
const CYCLE_SECONDS = PASS_SECONDS * 2;
const PROPELLER_BLADE =
  "M 0 -7 C 10 -13 16 -28 7 -46 C 3 -50 -3 -50 -7 -46 C -16 -28 -10 -13 0 -7 Z";

/** Små propellbåter kommer fortløpende inn fra venstre langs vannlinjen. */
export function Baatstrom() {
  const boatId = useId();
  return (
    <svg
      viewBox="0 0 1280 720"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" }}
    >
      <style>{`
        @keyframes tdc-boat-stream {
          0% { transform: translateX(-120px); }
          50%, 100% { transform: translateX(1400px); }
        }
        @keyframes tdc-boat-propeller {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes tdc-boat-bob {
          0%, 100% { transform: translateY(9px); }
          50% { transform: translateY(-9px); }
        }
        @keyframes tdc-boat-pitch {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .tdc-boat-propeller { animation: tdc-boat-propeller 1.4s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tdc-boat-stream, .tdc-boat-propeller, .tdc-boat-bob, .tdc-boat-pitch { animation: none !important; }
          .tdc-boat-position { transform: translateX(var(--boat-rest-x)); }
        }
      `}</style>
      <defs>
        <g id={boatId} transform="scale(-1 1)" fill="none" stroke={STREK} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <Skute x={0} y={0} s={0.78} signal={false} />
          <path d="M 42 3 L 50 8" strokeWidth={2.2} />
          <g transform="translate(52 9) scale(0.5)">
            <g className="tdc-boat-propeller">
              {[0, 120, 240].map((angle) => (
                <path key={angle} d={PROPELLER_BLADE} transform={`rotate(${angle})`} fill="rgba(0, 64, 71, 0.16)" strokeWidth={2.2} />
              ))}
            </g>
            <circle r={6.5} fill={KREM} strokeWidth={2.2} />
          </g>
          <path d="M 104 3 H 146 M 110 12 H 136" stroke={TEAL} strokeWidth={2} opacity={0.35} />
        </g>
      </defs>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <Bolger y={652} w={1280} h={700} amp={12} dur={11} />
      </g>
      {Array.from({ length: BOAT_COUNT }, (_, i) => {
        const scale = 0.4 + ((i * 7) % 11) / 100;
        return (
          <g
            key={i}
            className="tdc-boat-position"
            style={{ "--boat-rest-x": `${24 + i * 42}px` } as CSSProperties}
          >
            <g
              className="tdc-boat-stream"
              style={{ animation: `tdc-boat-stream ${CYCLE_SECONDS}s linear ${(i * CYCLE_SECONDS) / BOAT_COUNT}s infinite both` }}
            >
              <g
                className="tdc-boat-bob"
                style={{ animation: `tdc-boat-bob ${3.6 + (i % 4) * 0.4}s ease-in-out ${-i * 0.37}s infinite` }}
              >
                <g transform={`translate(0 ${645 + (i % 3) * 4}) scale(${scale})`}>
                  <g
                    className="tdc-boat-pitch"
                    style={{ animation: `tdc-boat-pitch ${4.2 + (i % 3) * 0.5}s ease-in-out ${-i * 0.43}s infinite` }}
                  >
                    <use href={`#${boatId}`} />
                  </g>
                </g>
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
