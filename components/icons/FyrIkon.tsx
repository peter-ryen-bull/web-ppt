import { Figur, KREM, Puls, ROD, TEAL } from "@/components/figures/strek/Strek";

/**
 * Fyret fra Kystverket-slidene (`Fyr` i figures/strek/Kyst.tsx), tegnet om
 * som et lite ikon til forsiden: samme tårn med røde bånd, lykt og holme,
 * uten sveip og skute. Lyset pulserer sakte.
 */
export function FyrIkon() {
  /** Halvbredden på tårnet ved høyde y (topp 17, fot 40) */
  const hw = (y: number) => 4.5 + (2.5 * (y - 17)) / 23;
  const band = (y1: number, y2: number) =>
    `M ${24 - hw(y1)} ${y1} H ${24 + hw(y1)} L ${24 + hw(y2)} ${y2} H ${24 - hw(y2)} Z`;

  return (
    <Figur w={48} h={48} label="Fyr" strokeWidth={1.6}>
      {/* Sjø og holme */}
      <path
        d="M 3 43.5 q 3 -2.6 6 0 t 6 0 t 6 0 t 6 0 t 6 0 t 6 0 t 6 0"
        stroke={TEAL}
        strokeWidth={1.4}
        opacity={0.6}
      />
      <path d="M 10 42 Q 17 36 24 36.5 Q 31 36 38 42 Z" fill={KREM} />

      {/* Tårnet */}
      <path d="M 17 40 L 19.5 17 H 28.5 L 31 40 Z" fill={KREM} />
      <path d={band(22, 25.5)} fill={ROD} stroke="none" opacity={0.85} />
      <path d={band(30, 33.5)} fill={ROD} stroke="none" opacity={0.85} />
      <rect x={18.5} y={15} width={11} height={2.2} rx={0.8} fill={KREM} />
      <rect x={20.5} y={9} width={7} height={6} rx={0.8} fill={KREM} />
      <path d="M 19.5 9 L 24 4.5 L 28.5 9 Z" fill={KREM} />

      {/* Lyset */}
      <g stroke={ROD} strokeWidth={1.6}>
        <path d="M 16.5 12 H 12" opacity={0.7}>
          <Puls fra={0.2} til={0.8} dur={3.2} />
        </path>
        <path d="M 31.5 12 H 36" opacity={0.7}>
          <Puls fra={0.2} til={0.8} dur={3.2} />
        </path>
      </g>
      <circle cx={24} cy={12} r={1.7} fill={ROD} stroke="none">
        <Puls fra={0.5} til={1} dur={3.2} />
      </circle>
    </Figur>
  );
}
