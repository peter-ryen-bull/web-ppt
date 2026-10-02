/*
 * En AIS-satellitt i samme strekstil som båten. Den krysser himmelen
 * og er borte igjen. Hele runden tar ti sekunder, omtrent like ofte
 * som et skip i fart sender AIS.
 */

/** Buen holder seg i den tomme stripen over teksten på åpningsscenen. */
const STI = "M -140 72 Q 640 8 1420 80";

export function SatellittPass() {
  return (
    <svg
      viewBox="0 0 1280 720"
      style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
      role="img"
      aria-label="En satellitt passerer over himmelen omtrent hvert tiende sekund"
    >
      <g>
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints="0;1;1"
          keyTimes="0;0.45;1"
          path={STI}
        />
        <g
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
    </svg>
  );
}
