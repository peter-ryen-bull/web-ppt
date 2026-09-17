const MEDIA = "/media/24-10-22-tdc-du-er-ikke-dum";

export function SlideBilde({ n, alt }: { n: number; alt: string }) {
  const src = `${MEDIA}/slide-${String(n).padStart(2, "0")}.png`;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1280,
        height: 720,
        background: "#fff",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
}
