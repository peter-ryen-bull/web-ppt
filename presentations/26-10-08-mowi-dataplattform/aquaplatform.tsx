import { Img } from "../parts";
import { MEDIA } from "./ui";

function Skjermbilde({ fil, alt }: { fil: string; alt: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#061917",
      }}
    >
      <Img box={[0, 0, 1280, 720]} src={`${MEDIA}/${fil}`} alt={alt} />
    </div>
  );
}

export function SlideOperasjonsvindu() {
  return (
    <Skjermbilde
      fil="aquaplatform-operasjonsvindu.png"
      alt="AquaPlatform: operasjonsvindu for en lokalitet"
    />
  );
}

export function SlideLaserplassering() {
  return (
    <Skjermbilde
      fil="aquaplatform-laserplassering.png"
      alt="AquaPlatform: laserplassering per bur"
    />
  );
}

export function SlideBunnbelastning() {
  return (
    <Skjermbilde
      fil="aquaplatform-bunnbelastning.png"
      alt="AquaPlatform: bunnbelastning per merd"
    />
  );
}
