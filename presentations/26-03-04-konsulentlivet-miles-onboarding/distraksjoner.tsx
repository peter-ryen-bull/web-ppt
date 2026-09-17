import { Img } from "../parts";
import { Chrome, MEDIA, Photo, TitleSlide } from "./chrome";

export function SlideEliminer() {
  return (
    <TitleSlide
      title={"ELIMINER\nD_______________R"}
      badge="🧠"
      size={80}
      box={[44.5, 264.4, 1190, 268.2]}
    />
  );
}

export function SlideBowling() {
  return (
    <Photo
      box={[0, 0, 1304.8, 724.9]}
      src={`${MEDIA}/image21.jpeg`}
      alt="Bowlingkule på banen"
      fit="cover"
    />
  );
}

export function SlideEliminerIgjen() {
  return (
    <TitleSlide
      title={"ELIMINER\nD_______________R"}
      badge="🧠"
      size={80}
      box={[44.5, 264.4, 1190, 268.2]}
    />
  );
}

export function SlideEliminerDistraksjoner() {
  return (
    <TitleSlide
      title={"ELIMINER\nDISTRAKSJONER"}
      badge="🧠"
      size={80}
      box={[44.5, 264.4, 1190, 268.2]}
    />
  );
}

export function SlideSkjermtid() {
  return (
    <>
      <Img
        box={[183.7, 0, 520, 720]}
        src={`${MEDIA}/image22.png`}
        alt="ScreenZen"
        fit="contain"
      />
      <Img
        box={[703.7, 266.4, 576.3, 288.2]}
        src={`${MEDIA}/image23.png`}
        alt="SelfControl på GitHub"
        fit="contain"
      />
      <Chrome badge="🧠♥️" />
    </>
  );
}

export function SlideEliminerDistraksjonerIgjen() {
  return (
    <TitleSlide
      title={"ELIMINER\nDISTRAKSJONER"}
      badge="🧠"
      size={80}
      box={[44.5, 264.4, 1190, 268.2]}
    />
  );
}
