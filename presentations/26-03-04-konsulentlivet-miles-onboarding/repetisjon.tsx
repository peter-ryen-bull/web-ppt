import { Box, Img, pt } from "../parts";
import { Chrome, CUTIVE, MEDIA, TitleSlide } from "./chrome";

function Hands({ items }: { items: { x: number; text: string; w?: number }[] }) {
  return (
    <>
      {items.map((item) => (
        <Box key={`${item.x}-${item.text}`} box={[item.x, 202.4, item.w ?? 153.7, 161.6]}>
          <div style={{ ...CUTIVE, fontSize: pt(88), lineHeight: 1 }}>{item.text}</div>
        </Box>
      ))}
    </>
  );
}

function ProsentRad({ faded }: { faded?: boolean }) {
  return (
    <Box box={[0, 359.1, 1280, 118]}>
      <div
        style={{
          ...CUTIVE,
          fontSize: pt(67),
          textAlign: "center",
          color: faded ? "var(--cream-dark)" : "var(--burgundy)",
        }}
      >
        20%      40%       60%      80%
      </div>
    </Box>
  );
}

export function SlideRepetisjonBlank() {
  return (
    <TitleSlide
      title="R______n"
      badge="🧠"
      size={72}
      box={[63.6, 90.2, 1130, 126]}
    />
  );
}

export function SlideProsent() {
  return (
    <>
      <Chrome badge="🧠" />
      <ProsentRad />
    </>
  );
}

export function SlideProsent20() {
  return (
    <>
      <Chrome badge="🧠" />
      <ProsentRad />
      <Hands items={[{ x: 33, text: "✌️" }]} />
    </>
  );
}

export function SlideProsent40() {
  return (
    <>
      <Chrome badge="🧠" />
      <ProsentRad />
      <Hands
        items={[
          { x: 33, text: "✌️" },
          { x: 314.9, text: "✌️" },
          { x: 412.6, text: "✌️" },
        ]}
      />
    </>
  );
}

export function SlideProsent60() {
  return (
    <>
      <Chrome badge="🧠" />
      <ProsentRad />
      <Hands
        items={[
          { x: 33, text: "✌️" },
          { x: 314.9, text: "✌️" },
          { x: 412.6, text: "✌️" },
          { x: 639.3, text: "✋☝️", w: 394.6 },
        ]}
      />
    </>
  );
}

export function SlideProsent80() {
  return (
    <>
      <Chrome badge="🧠" />
      <ProsentRad />
      <Hands
        items={[
          { x: 33, text: "✌️" },
          { x: 314.9, text: "✌️" },
          { x: 412.6, text: "✌️" },
          { x: 639.3, text: "✋☝️", w: 394.6 },
          { x: 949.1, text: "✋☝️✌️", w: 320 },
        ]}
      />
    </>
  );
}

export function SlideProsentSvar() {
  return (
    <>
      <Chrome badge="🧠" />
      <Box box={[0, 359.1, 1280, 118]}>
        <div style={{ ...CUTIVE, fontSize: pt(67), textAlign: "center" }}>
          <span style={{ color: "var(--cream-dark)" }}>20%      40%       </span>
          60%
        </div>
      </Box>
      <Hands items={[{ x: 639.3, text: "✋☝️", w: 394.6 }]} />
    </>
  );
}

export function SlideRepetisjonBlank2() {
  return (
    <TitleSlide
      title="R_______n"
      badge="🧠"
      size={82}
      box={[54.2, 63.8, 1130, 274.7]}
    />
  );
}

export function SlideRepetisjon() {
  return (
    <TitleSlide
      title="Repetisjon"
      badge="🧠"
      size={82}
      box={[54.2, 63.8, 1130, 274.7]}
    />
  );
}

export function SlideKognitivtBlank() {
  return (
    <TitleSlide
      title={'Repetisjon som er “Ko______\nKr______”'}
      badge="🧠"
      size={82}
      box={[46, 47.7, 1190, 539.7]}
    />
  );
}

export function SlideHuskForAaHuske() {
  return (
    <>
      <Img
        box={[161.7, 44.1, 956.5, 675.9]}
        src={`${MEDIA}/image27.png`}
        alt="Husk for å huske"
        fit="contain"
      />
      <Img
        box={[130.6, 0, 1037.9, 733.5]}
        src={`${MEDIA}/image28.jpg`}
        alt=""
        fit="contain"
      />
      <Img
        box={[136.9, 215.3, 195.2, 145]}
        src={`${MEDIA}/image29.png`}
        alt=""
      />
      <Img
        box={[136.9, 348, 195.2, 145]}
        src={`${MEDIA}/image29.png`}
        alt=""
      />
      <Img
        box={[189.9, 504.3, 112.3, 112.3]}
        src={`${MEDIA}/image30.png`}
        alt=""
      />
      <Chrome badge="🧠" />
    </>
  );
}

function Graf({ merKrevende, merEffektivt }: { merKrevende?: boolean; merEffektivt?: boolean }) {
  return (
    <>
      <Img
        box={[134.4, 20.1, 990.4, 699.9]}
        src={`${MEDIA}/image31.png`}
        alt="Jo mer kognitivt krevende, jo bedre husking"
        fit="contain"
      />
      {merKrevende && (
        <Box box={[774.7, 642.9, 473.4, 70]}>
          <div style={{ ...CUTIVE, fontSize: pt(42) }}>Mer krevende</div>
        </Box>
      )}
      {merEffektivt && (
        <Box box={[332.5, 26.8, 450.2, 80]}>
          <div style={{ ...CUTIVE, fontSize: pt(42) }}>Mer effektivt</div>
        </Box>
      )}
      <Chrome badge="🧠" />
    </>
  );
}

export function SlideGraf() {
  return <Graf />;
}

export function SlideMerKrevende() {
  return <Graf merKrevende />;
}

export function SlideMerEffektivt() {
  return <Graf merKrevende merEffektivt />;
}

export function SlideKognitivtBlank2() {
  return (
    <TitleSlide
      title={'Repetisjon som er “Ko______\nKr______”'}
      badge="🧠"
      size={82}
      box={[46, 47.7, 1190, 539.7]}
    />
  );
}

export function SlideKognitivtKrevende() {
  return (
    <TitleSlide
      title={'Repetisjon som er “Kognitivt krevende”'}
      badge="🧠"
      size={82}
      box={[46, 47.7, 1190, 539.7]}
    />
  );
}
