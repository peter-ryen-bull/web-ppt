import { Box, Img, pt } from "../parts";
import { Chrome, CUTIVE, MEDIA, Mask } from "./chrome";

function Spredt({
  peace,
  heart,
  resultPeek,
}: {
  peace?: boolean;
  heart?: boolean;
  resultPeek?: boolean;
}) {
  return (
    <>
      <Img
        box={[13.5, 14.2, 1016.2, 718.1]}
        src={`${MEDIA}/image32.png`}
        alt="Samlet versus spredt øving"
        fit="contain"
      />
      {peace && (
        <Box box={[1034.4, 86.6, 166, 161.6]}>
          <div style={{ ...CUTIVE, fontSize: pt(88) }}>✌️</div>
        </Box>
      )}
      {heart && (
        <Box box={[1064.5, 420, 166, 161.6]}>
          <div style={{ ...CUTIVE, fontSize: pt(88) }}>🫶</div>
        </Box>
      )}
      {resultPeek && (
        <Img
          box={[989.8, 574.9, 276.7, 161.6]}
          src={`${MEDIA}/image33.png`}
          alt="2x bedre"
          fit="contain"
        />
      )}
      <Box box={[1174.2, 22.6, 150, 82.4]} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <div style={{ ...CUTIVE, fontSize: pt(45) }}>🧠</div>
      </Box>
    </>
  );
}

export function SlideSamletSpredt() {
  return <Spredt />;
}

export function SlideSamletSpredtPeace() {
  return <Spredt peace />;
}

export function SlideSamletSpredtHeart() {
  return <Spredt peace heart />;
}

export function SlideSamletSpredtPeek() {
  return <Spredt peace heart resultPeek />;
}

export function SlideToGangerBedre() {
  return (
    <>
      <Img
        box={[0, 1.9, 1052, 718.1]}
        src={`${MEDIA}/image33.png`}
        alt="Spredt øving er 2x bedre"
        fit="contain"
      />
      {(
        [
          [228.9, 506.4, -22.2, 88],
          [917.3, 206.4, 13, 88],
          [664.4, 294.8, -6.5, 55],
          [846.5, 540.6, 31.7, 55],
        ] as const
      ).map(([x, y, rot, size]) => (
        <Box
          key={`${x}-${y}`}
          box={[x, y, 166.1, 200]}
          style={{ transform: `rotate(${rot}deg)` }}
        >
          <div style={{ ...CUTIVE, fontSize: pt(size) }}>🫶</div>
        </Box>
      ))}
      <Chrome badge="🧠" />
    </>
  );
}

function Intervaller({ masks }: { masks: [number, number, number, number][] }) {
  return (
    <>
      <Img
        box={[128.3, 0, 1023.4, 723.2]}
        src={`${MEDIA}/image34.png`}
        alt="Spredt repetisjon og Anki"
        fit="contain"
      />
      {masks.map((box) => (
        <Mask key={box.join(",")} box={box} />
      ))}
      <Chrome badge="🧠" />
    </>
  );
}

export function SlideIntervaller1() {
  return (
    <Intervaller
      masks={[
        [162.9, 406.3, 1017.2, 231.6],
        [704.6, 138.2, 449.3, 207.4],
      ]}
    />
  );
}

export function SlideIntervaller2() {
  return (
    <Intervaller
      masks={[
        [382.1, 406.3, 798, 231.6],
        [704.6, 138.2, 449.3, 207.4],
      ]}
    />
  );
}

export function SlideIntervaller3() {
  return (
    <Intervaller
      masks={[
        [558.7, 422.3, 637.4, 231.6],
        [704.6, 138.2, 449.3, 207.4],
      ]}
    />
  );
}

export function SlideIntervaller4() {
  return (
    <Intervaller
      masks={[
        [746.8, 368, 449.3, 231.6],
        [704.6, 138.2, 449.3, 207.4],
      ]}
    />
  );
}

export function SlideIntervaller5() {
  return (
    <Intervaller
      masks={[
        [888.9, 302.8, 449.3, 231.6],
        [970.2, 418.6, 449.3, 231.6],
        [704.6, 138.2, 449.3, 207.4],
      ]}
    />
  );
}

export function SlideIntervaller6() {
  return (
    <Intervaller
      masks={[
        [1056, 514.6, 317.4, 231.6],
        [704.6, 138.2, 449.3, 207.4],
      ]}
    />
  );
}

export function SlideIntervaller7() {
  return <Intervaller masks={[[737.3, 147.8, 370.6, 231.6]]} />;
}

export function SlideIntervaller8() {
  return <Intervaller masks={[]} />;
}

export function SlideAnki() {
  return (
    <>
      <Img
        box={[93.3, 100.6, 587.5, 472.7]}
        src={`${MEDIA}/image35.png`}
        alt="Anki-decks"
        fit="contain"
      />
      <Chrome badge="🧠" />
    </>
  );
}

export function SlideAnkiKort() {
  return (
    <>
      <Img
        box={[93.3, 100.6, 587.5, 472.7]}
        src={`${MEDIA}/image35.png`}
        alt="Anki-decks"
        fit="contain"
      />
      <Img
        box={[440.3, 100.6, 770.1, 574]}
        src={`${MEDIA}/image36.png`}
        alt="Anki-kort"
        fit="contain"
      />
      <Mask box={[640, 244.2, 370.6, 231.6]} />
      <Chrome badge="🧠" />
    </>
  );
}

export function SlideAnkiKortAapent() {
  return (
    <>
      <Img
        box={[93.3, 100.6, 587.5, 472.7]}
        src={`${MEDIA}/image35.png`}
        alt="Anki-decks"
        fit="contain"
      />
      <Img
        box={[440.3, 100.6, 770.1, 574]}
        src={`${MEDIA}/image36.png`}
        alt="Anki-kort"
        fit="contain"
      />
      <Chrome badge="🧠" />
    </>
  );
}
