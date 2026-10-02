"use client";

import { useEffect, useRef } from "react";

/*
 * En AIS-satellitt i samme strekstil som båten. Den krysser himmelen
 * og er borte igjen. Hele runden tar ti sekunder, omtrent like ofte
 * som et skip i fart sender AIS.
 *
 * Skålen under kroppen peker alltid mot båten. Båten står i boksen
 * [430, 520, 420, 170] på åpningsscenen, med skroget midt på lerretet.
 */

/** Buen holder seg i den tomme stripen over teksten på åpningsscenen. */
const STI = "M -140 72 Q 640 8 1420 80";

const BAAT_X = 640;
const BAAT_Y = 630;

/** Samme røde buer som båten, bare nedover mot havet. */
const SIGNAL_Y = 16;

function signalbue(r: number) {
  const k = r * Math.SQRT1_2;
  return `M ${-k} ${SIGNAL_Y + k} A ${r} ${r} 0 0 0 ${k} ${SIGNAL_Y + k}`;
}

export function SatellittPass() {
  const fart = useRef<SVGGElement>(null);
  const kropp = useRef<SVGGElement>(null);

  useEffect(() => {
    const node = fart.current;
    const kroppNode = kropp.current;
    if (!node || !kroppNode) return;

    let frame = 0;
    const pek = () => {
      const svg = node.ownerSVGElement;
      const m = node.getScreenCTM();
      if (svg && m) {
        const rect = svg.getBoundingClientRect();
        const x = ((m.e - rect.left) / rect.width) * 1280;
        const y = ((m.f - rect.top) / rect.height) * 720;
        const grader = (Math.atan2(BAAT_X - x, BAAT_Y - y) * 180) / Math.PI;
        kroppNode.setAttribute("transform", `rotate(${grader})`);
      }
      frame = requestAnimationFrame(pek);
    };
    frame = requestAnimationFrame(pek);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      viewBox="0 0 1280 720"
      style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
      role="img"
      aria-label="En satellitt passerer over himmelen omtrent hvert tiende sekund"
    >
      <g ref={fart}>
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;1;1"
          keyTimes="0;0.45;1"
          path={STI}
        />
        <g ref={kropp}>
          <g
            transform="scale(0.5)"
            fill="none"
            stroke="var(--burgundy)"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
          <rect x={-16} y={-13} width={32} height={26} rx={3} fill="var(--cream)" />
          <path d="M -16 0 H -26 M 16 0 H 26" />
          <rect x={-62} y={-9} width={36} height={18} rx={2} fill="var(--cream)" />
          <rect x={26} y={-9} width={36} height={18} rx={2} fill="var(--cream)" />
          <path d="M -50 -9 V 9 M -38 -9 V 9" strokeWidth={1.5} opacity={0.55} />
          <path d="M 38 -9 V 9 M 50 -9 V 9" strokeWidth={1.5} opacity={0.55} />
          <path d="M -9 15 Q 0 24 9 15" />
          {[10, 17, 24].map((r, i) => (
            <path
              key={r}
              d={signalbue(r)}
              fill="none"
              stroke="var(--red)"
              strokeWidth={2.4}
              strokeLinecap="round"
              opacity={0}
            >
              <animate
                attributeName="opacity"
                values="0; 1; 1; 0; 0"
                keyTimes="0; 0.15; 0.45; 0.7; 1"
                dur="2.8s"
                begin={`${i * 0.35}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
          <circle cx={0} cy={0} r={3.4} fill="var(--red)" stroke="none">
            <animate
              attributeName="opacity"
              values="1;0.35;1"
              dur="1.6s"
              repeatCount="indefinite"
            />
          </circle>
          </g>
        </g>
      </g>
    </svg>
  );
}
