import { Figur, KREM, ROD, STREK, TEAL, Tekst } from "./Strek";

// Coastlines: Natural Earth, 1:110m, public domain. Mercator projection.
// Source: github.com/nvkelso/natural-earth-vector, ne_110m_admin_0_countries.
const LAND = [
  { name: "Ireland", d: "M 67.2,338.5 L 69.5,355.3 L 59.0,376.0 L 34.1,389.4 L 14.3,386.0 L 25.7,362.0 L 18.4,338.2 L 37.4,319.4 L 48.0,308.0 L 50.9,321.1 L 48.0,333.9 L 56.6,333.6 L 67.2,338.5 Z" },
  { name: "United Kingdom", d: "M 67.2,338.5 L 56.6,333.6 L 48.0,333.9 L 50.9,321.1 L 48.0,308.0 L 59.7,307.0 L 74.7,322.1 L 67.2,338.5 Z M 110.7,349.4 L 110.7,349.4 L 112.8,335.7 L 103.4,320.9 L 103.2,320.6 L 86.2,316.3 L 82.8,309.7 L 87.9,298.8 L 83.3,291.9 L 75.8,303.6 L 75.0,279.6 L 67.9,266.7 L 73.0,239.9 L 83.9,218.3 L 95.0,220.4 L 111.9,218.2 L 97.0,246.8 L 111.2,243.3 L 126.6,243.4 L 122.9,264.5 L 110.3,287.2 L 124.8,288.8 L 125.9,291.4 L 138.4,320.4 L 148.0,324.2 L 156.6,351.3 L 160.6,360.5 L 177.5,364.9 L 175.8,379.6 L 168.7,386.3 L 174.3,397.9 L 161.7,409.6 L 143.0,409.4 L 119.1,415.5 L 112.6,411.1 L 103.4,421.4 L 90.4,418.9 L 80.6,427.3 L 73.1,422.9 L 93.7,399.7 L 106.2,394.9 L 106.1,394.8 L 84.2,391.1 L 80.3,382.1 L 94.9,375.0 L 87.2,362.6 L 89.9,347.3 L 110.7,349.4 Z" },
  { name: "Sweden", d: "M 308.4,212.2 L 314.6,196.5 L 326.2,177.4 L 330.8,143.8 L 321.9,128.9 L 321.0,88.7 L 330.1,59.1 L 344.0,59.7 L 348.9,46.9 L 343.8,35.7 L 365.5,-11.7 L 379.5,-51.1 L 388.8,-77.3 L 402.2,-77.1 L 405.9,-98.2 L 432.3,-92.1 L 434.4,-117.5 L 443.0,-119.1 L 461.7,-100.1 L 483.6,-74.4 L 483.9,-18.8 L 488.6,-5.3 L 464.6,4.4 L 451.0,27.9 L 453.2,47.9 L 430.9,73.6 L 403.9,100.3 L 393.7,142.4 L 403.6,162.7 L 417.0,178.4 L 404.2,209.6 L 389.6,215.9 L 384.3,260.1 L 376.3,283.9 L 359.3,281.5 L 351.4,301.2 L 335.2,302.4 L 330.8,278.8 L 319.0,249.7 L 308.4,212.2 Z" },
  { name: "Denmark", d: "M 292.9,311.7 L 283.9,315.4 L 273.4,312.2 L 267.7,298.5 L 267.3,272.9 L 269.6,266.0 L 273.6,258.3 L 285.9,256.7 L 290.9,249.6 L 302.1,242.2 L 301.6,255.6 L 297.5,264.0 L 299.2,271.1 L 306.8,275.0 L 303.3,284.5 L 299.2,281.8 L 289.1,299.7 L 292.9,311.7 Z M 327.2,283.7 L 331.7,296.2 L 323.3,316.1 L 308.6,302.3 L 306.7,292.0 L 327.2,283.7 Z" },
  { name: "Norway", d: "M 589.4,-137.0 L 565.6,-121.1 L 554.3,-117.5 L 560.2,-145.4 L 542.3,-161.7 L 520.5,-147.8 L 513.6,-118.6 L 500.3,-101.4 L 485.3,-110.7 L 467.0,-108.8 L 451.4,-129.5 L 443.0,-119.1 L 434.4,-117.5 L 432.3,-92.1 L 405.9,-98.2 L 402.2,-77.1 L 388.8,-77.3 L 379.5,-51.1 L 365.5,-11.7 L 343.8,35.7 L 348.9,46.9 L 344.0,59.7 L 330.1,59.1 L 321.0,88.7 L 321.9,128.9 L 330.8,143.8 L 326.2,177.4 L 314.6,196.5 L 308.4,212.2 L 299.0,195.5 L 271.3,226.8 L 252.7,233.0 L 233.3,219.4 L 228.3,190.1 L 223.9,123.8 L 236.8,104.4 L 273.7,78.5 L 301.4,45.6 L 327.0,-0.9 L 360.7,-69.7 L 384.1,-98.1 L 422.6,-147.5 L 453.3,-165.4 L 476.3,-163.3 L 497.7,-198.2 L 523.2,-196.3 L 548.3,-204.9 L 592.1,-173.7 L 574.1,-162.6 L 589.4,-137.0 Z" },
];

/** Skjematiske seilaser over Nordsjøen: bunkringsland er ikke utslippssted. */
export function Bunkring() {
  const routes = [
    { path: "M 228.5 169.7 Q 146 182 124.7 257.3", color: TEAL, duration: "13s" },
    { path: "M 124.7 257.3 Q 227 258 228.5 169.7", color: ROD, duration: "16s" },
  ];
  return (
    <Figur w={440} h={470} label="Kart over Norge, Storbritannia og Nordsjøen med skip som seiler begge veier">
      <svg width={440} height={410} viewBox="0 0 440 410" overflow="hidden">
        <rect x={1} y={1} width={438} height={408} rx={16} fill="rgba(0, 64, 71, 0.06)" stroke="none" />
        {LAND.map(({ name, d }) => (
          <path
            key={name}
            d={d}
            fill={name === "Norway" || name === "United Kingdom" ? KREM : "#eee5dc"}
            stroke={STREK}
            strokeWidth={1.3}
            opacity={name === "Norway" || name === "United Kingdom" ? 1 : 0.45}
          />
        ))}
        <Tekst x={324} y={132} size={19} color={STREK} weight={600}>Norge</Tekst>
        <Tekst x={88} y={369} size={17} color={STREK} weight={600}>Storbritannia</Tekst>
        <Tekst x={139} y={126} size={14} color={TEAL}>Nordsjøen</Tekst>
        {routes.map(({ path, color, duration }) => (
          <g key={color} stroke={color}>
            <path d={path} strokeWidth={2} strokeDasharray="5 6" opacity={0.7} />
            <g>
              <animateMotion dur={duration} repeatCount="indefinite" rotate="auto" path={path} />
              <path d="M 11 0 L 3 -5.5 H -10 V 5.5 H 3 Z" fill={KREM} strokeWidth={2.2} />
              <rect x={-7} y={-3} width={4} height={6} rx={0.8} fill={color} stroke="none" />
            </g>
          </g>
        ))}
        <circle cx={228.5} cy={169.7} r={4} fill={TEAL} stroke={KREM} strokeWidth={2} />
        <circle cx={124.7} cy={257.3} r={4} fill={ROD} stroke={KREM} strokeWidth={2} />
        <Tekst x={243} y={173} size={12} anchor="start" color={STREK}>Bergen</Tekst>
        <Tekst x={110} y={279} size={12} anchor="end" color={STREK}>Aberdeen</Tekst>
      </svg>
      <path d="M 50 435 H 18 M 24 431 L 18 435 L 24 439" stroke={TEAL} strokeWidth={2} />
      <Tekst x={64} y={440} size={13.5} anchor="start" color={TEAL}>Bunkrer i Norge, seiler til Storbritannia</Tekst>
      <path d="M 18 457 H 50 M 44 453 L 50 457 L 44 461" stroke={ROD} strokeWidth={2} />
      <Tekst x={64} y={462} size={13.5} anchor="start" color={ROD}>Bunkrer i Storbritannia, seiler til Norge</Tekst>
    </Figur>
  );
}
