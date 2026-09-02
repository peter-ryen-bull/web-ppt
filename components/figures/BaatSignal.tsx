/*
 * Minimalistisk, animert båt for Kystverket-kapittelet: en liten skute i
 * strek-stil som duver på bølger, med en antenne som sender ut signalpulser
 * (AIS). Ren SVG (viewBox 420x170) med SMIL-animasjoner, i Miles-paletten.
 */

const W = 420;
const H = 170;

/** Bølgelengde – translate-animasjonene flytter nøyaktig én lengde for sømløs loop */
const BLG = 64;

/** Antennespissen som signalet sendes fra */
const ANT_X = 209;
const ANT_Y = 42;

/** Sinuslignende bølgelinje fra utenfor venstre kant til forbi høyre kant */
function bolgelinje(y: number, amp: number) {
  const halvbolger = Math.ceil((W + 2 * BLG) / (BLG / 2));
  let d = `M ${-BLG} ${y} q ${BLG / 4} ${-amp} ${BLG / 2} 0`;
  for (let i = 1; i < halvbolger; i++) d += ` t ${BLG / 2} 0`;
  return d;
}

/** Sirkelbue rundt antennespissen, åpner oppover */
function signalbue(r: number) {
  const k = r * Math.SQRT1_2;
  return `M ${ANT_X - k} ${ANT_Y - k} A ${r} ${r} 0 0 1 ${ANT_X + k} ${
    ANT_Y - k
  }`;
}

/** Myk fram-og-tilbake-easing for duving og rulling */
const SPLINES = "0.45 0 0.55 1; 0.45 0 0.55 1";

export function BaatSignal() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%", display: "block" }}
      role="img"
      aria-label="Båt på bølger med antenne som sender AIS-signal"
    >
      {/* Bakre bølge – glir sakte, i motfase */}
      <path
        d={bolgelinje(118, -10)}
        fill="none"
        stroke="var(--teal)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.35}
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to={`${-BLG} 0`}
          dur="13s"
          repeatCount="indefinite"
        />
      </path>

      {/* Båten – ytre gruppe duver, indre gruppe ruller svakt */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 -4; 0 0"
          keyTimes="0; 0.5; 1"
          calcMode="spline"
          keySplines={SPLINES}
          dur="3.2s"
          repeatCount="indefinite"
        />
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-1.8 210 132; 1.8 210 132; -1.8 210 132"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines={SPLINES}
            dur="4.6s"
            repeatCount="indefinite"
          />

          {/* Signalpulser fra antennen */}
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

          {/* Mast og antenne */}
          <g
            fill="none"
            stroke="var(--burgundy)"
            strokeWidth={2.5}
            strokeLinecap="round"
          >
            <path d={`M ${ANT_X} 88 V 46`} />
            <path d={`M ${ANT_X - 6} 56 h 12`} strokeWidth={2} />
          </g>
          <circle cx={ANT_X} cy={ANT_Y + 2} r={3} fill="var(--red)" />

          {/* Styrhus med vindu */}
          <rect
            x={186}
            y={86}
            width={46}
            height={26}
            rx={5}
            fill="var(--cream)"
            stroke="var(--burgundy)"
            strokeWidth={2.5}
          />
          <circle
            cx={200}
            cy={99}
            r={3.5}
            fill="none"
            stroke="var(--burgundy)"
            strokeWidth={2}
          />

          {/* Skrog */}
          <path
            d="M 148 112 L 161 138 Q 210 145 259 138 L 272 112 Z"
            fill="var(--cream)"
            stroke="var(--burgundy)"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Fremre bølge – fylt med krem så den skjuler skroget under vannlinjen */}
      <path
        d={`${bolgelinje(132, 12)} V ${H + 2} H ${-BLG} Z`}
        fill="var(--cream)"
        stroke="var(--teal)"
        strokeWidth={2.5}
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to={`${-BLG} 0`}
          dur="8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
