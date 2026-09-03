import {
  Figur,
  KREM,
  Puls,
  ROD,
  Roter,
  SPLINES,
  STREK,
  tannhjul,
  TEAL,
  Tekst,
} from "./Strek";
import { IkonI } from "./Ikoner";

/*
 * Strek-figurer til effekt-kapittelet: skjold med hake (kvalitet), hengelås
 * (etterlevelse), tannhjul med sjekkliste (effektivitet), brikke med gnist
 * (fremtidsrettet) – og alle fire på rad til kapittelsliden.
 */

const SKJOLD =
  "M 210 22 L 262 42 V 78 C 262 108 240 128 210 140 C 180 128 158 108 158 78 V 42 Z";

/** Skjold der haken tegner seg selv */
export function SkjoldHake() {
  return (
    <Figur w={420} h={150} label="Skjold med en hake som tegnes">
      <path d={SKJOLD} fill={KREM} strokeWidth={3} />
      <path
        d="M 186 80 L 203 97 L 236 62"
        stroke={ROD}
        strokeWidth={4}
        strokeDasharray={80}
        strokeDashoffset={80}
      >
        <animate
          attributeName="stroke-dashoffset"
          values="80; 0; 0; 0"
          keyTimes="0; 0.28; 0.9; 1"
          dur="5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1; 1; 1; 0"
          keyTimes="0; 0.88; 0.96; 1"
          dur="5s"
          repeatCount="indefinite"
        />
      </path>
    </Figur>
  );
}

/** Hengelås som klikker igjen – foran et regelverk */
export function Hengelas() {
  return (
    <Figur w={420} h={150} label="Hengelås som låses foran et dokument">
      {/* Regelverket */}
      <path d="M 120 50 h 44 l 14 14 v 60 h -58 z" fill={KREM} strokeWidth={2} />
      <path d="M 164 50 v 14 h 14" strokeWidth={2} />
      <path d="M 132 80 h 32 M 132 92 h 32 M 132 104 h 22" strokeWidth={1.6} opacity={0.5} />

      {/* Bøylen løftes og klikker igjen */}
      <path d="M 188 74 V 54 A 22 22 0 0 1 232 54 V 74" strokeWidth={3}>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 -9; 0 -9; 0 0; 0 0; 0 -9"
          keyTimes="0; 0.15; 0.25; 0.85; 1"
          calcMode="spline"
          keySplines="0.45 0 0.55 1; 0.6 0 0.8 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
          dur="7s"
          repeatCount="indefinite"
        />
      </path>
      <rect x={170} y={74} width={80} height={58} rx={8} fill={KREM} strokeWidth={3} />
      <circle cx={210} cy={98} r={5} fill={STREK} stroke="none" />
      <path d="M 210 100 V 112" strokeWidth={3} />
    </Figur>
  );
}

/** Tannhjul som går – og en sjekkliste som hukes av helt av seg selv */
export function Automatikk() {
  const T = 6;
  return (
    <Figur w={420} h={150} label="Tannhjul som går rundt ved siden av en sjekkliste som fylles ut">
      <Roter cx={120} cy={82} dur={14}>
        <path d={tannhjul(120, 82, 40, 9)} fill={KREM} />
      </Roter>
      <circle cx={120} cy={82} r={11} fill={KREM} />
      <Roter cx={188} cy={52} dur={9.3} retning={-1}>
        <path d={tannhjul(188, 52, 26, 6)} fill={KREM} />
      </Roter>
      <circle cx={188} cy={52} r={7} fill={KREM} />

      {/* Sjekklisten */}
      <rect x={244} y={36} width={110} height={90} rx={8} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
      {[0, 1, 2].map((i) => {
        const y = 58 + i * 24;
        const at = (0.8 + i * 1.4) / T;
        return (
          <g key={i}>
            <rect x={258} y={y - 6} width={12} height={12} rx={2} strokeWidth={1.6} />
            <path d={`M 280 ${y} h ${52 - i * 10}`} strokeWidth={1.6} opacity={0.45} />
            <path d={`M 260 ${y} l 3.5 3.5 l 7 -8`} stroke={ROD} strokeWidth={2.2} opacity={0}>
              <animate
                attributeName="opacity"
                calcMode="discrete"
                values="0; 1; 0"
                keyTimes={`0; ${at.toFixed(3)}; 0.94`}
                dur={`${T}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        );
      })}
    </Figur>
  );
}

/** Brikke med en gnist inni, koblet inn i dataflyten */
export function BrikkeMedGnist() {
  const pins = [-16, 0, 16];
  return (
    <Figur w={420} h={150} label="En brikke med en gnist inni, koblet til dataflyten">
      <path d="M 110 76 H 158" strokeWidth={3} strokeDasharray="0 9" opacity={0.5} />
      <path d="M 262 76 H 310" strokeWidth={3} strokeDasharray="0 9" opacity={0.5} />

      {pins.map((d) => (
        <g key={d} strokeWidth={2}>
          <path d={`M 168 ${76 + d} h 10`} />
          <path d={`M 242 ${76 + d} h 10`} />
          <path d={`M ${210 + d} 34 v 10`} />
          <path d={`M ${210 + d} 108 v 10`} />
        </g>
      ))}
      <rect x={178} y={44} width={64} height={64} rx={7} fill={KREM} strokeWidth={3} />

      <g transform="translate(210 76)">
        <g>
          <animateTransform
            attributeName="transform"
            type="scale"
            values="0.88; 1.08; 0.88"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines={SPLINES}
            dur="3s"
            repeatCount="indefinite"
          />
          <path
            d="M 0 -20 l 5 13.5 13.5 5 -13.5 5 -5 13.5 -5 -13.5 -13.5 -5 13.5 -5 z"
            fill={ROD}
            stroke={ROD}
            strokeWidth={2}
          >
            <Puls fra={0.6} til={1} dur={3} />
          </path>
        </g>
      </g>
    </Figur>
  );
}

/** De fire effektene på rad */
export function EffektRad() {
  const deler = ["Kvalitet", "Etterlevelse", "Effektivitet", "Fremtidsrettet"];
  return (
    <Figur w={1000} h={150} label="Kvalitet, etterlevelse, effektivitet og fremtidsrettet">
      {deler.map((tekst, i) => {
        const cx = 125 + i * 250;
        return (
          <g key={tekst}>
            <circle cx={cx} cy={58} r={42} fill="#fff" stroke="var(--cream-dark)" strokeWidth={1.5} />
            {i === 0 && <IkonI navn="skjold" x={cx - 21} y={37} size={42} color={TEAL} />}
            {i === 1 && <IkonI navn="hengelas" x={cx - 21} y={37} size={42} color={TEAL} />}
            {i === 2 && (
              <g stroke={TEAL}>
                <Roter cx={cx} cy={58} dur={14}>
                  <path d={tannhjul(cx, 58, 19, 8)} fill="#fff" strokeWidth={1.8} />
                </Roter>
                <circle cx={cx} cy={58} r={5} fill="#fff" strokeWidth={1.8} />
              </g>
            )}
            {i === 3 && <IkonI navn="gnist" x={cx - 21} y={37} size={42} color={TEAL} />}
            <Tekst x={cx} y={132} size={15} color={STREK}>
              {tekst}
            </Tekst>
          </g>
        );
      })}
    </Figur>
  );
}
