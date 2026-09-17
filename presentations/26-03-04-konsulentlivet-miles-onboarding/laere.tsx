import { Box, Img, pt } from "../parts";
import { Chrome, CUTIVE, MEDIA, Photo, TitleSlide } from "./chrome";

const SULTEN_BOX: [number, number, number, number] = [73.7, 162.5, 1130, 513.8];

export function SlideVaerSulten() {
  return (
    <TitleSlide
      title={"VÆR\nS_______  PÅ\nÅ  L____"}
      badge="🧠"
      box={SULTEN_BOX}
    />
  );
}

export function SlideHjernen() {
  return (
    <>
      <Img
        box={[116.3, 20.4, 1019, 720.1]}
        src={`${MEDIA}/image24.jpg`}
        alt="Hjernen: hvorfor husker jeg så lite?"
        fit="contain"
      />
      <Chrome badge="🧠" />
    </>
  );
}

export function SlideLaringsmetoder() {
  return (
    <>
      <Img
        box={[316.5, 91.8, 621.6, 585.7]}
        src={`${MEDIA}/image25.png`}
        alt="Weinstein et al.: Teaching the science of learning"
        fit="contain"
      />
      <Chrome badge="🧠" />
    </>
  );
}

export function SlideVaerSultenIgjen() {
  return (
    <TitleSlide
      title={"VÆR\nS_______  PÅ\nÅ  L____"}
      badge="🧠"
      box={SULTEN_BOX}
    />
  );
}

export function SlideVaerSultenLaere() {
  return (
    <TitleSlide
      title={"VÆR\nSULTEN  PÅ\nÅ  LÆRE"}
      badge="🧠"
      box={SULTEN_BOX}
    />
  );
}

export function SlideZlatan() {
  return (
    <Photo
      box={[323.6, 99.9, 632.7, 520.1]}
      src={`${MEDIA}/image26.png`}
      alt="Zlatan: How to be a champion"
      fit="contain"
      badge="🧠"
    />
  );
}

export function SlideFagligAutoritet() {
  return (
    <>
      <Chrome badge="🧠" />
      <Box box={[283, 311.5, 900, 96.9]}>
        <div style={{ ...CUTIVE, fontSize: pt(54) }}>🧠 Faglig autoriet</div>
      </Box>
    </>
  );
}
