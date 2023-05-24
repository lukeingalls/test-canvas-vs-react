import { useRef, useEffect } from "react";

export default function VanillaJs({ rects, done }) {
  const el = useRef(null);

  const draw = (rect) => {
    const divie = document.createElement("div");

    divie.style = {
      backgroundColor: "red",
      top: rect.x,
      left: rect.y,
      position: "absolute",
      width: rect.w,
      height: rect.h,
    };

    el.current.appendChild(divie);
  };

  useEffect(() => {
    for (const rect of rects) {
      draw(rect);
    }
    done();
  }, [done, rects]);

  return (
    <div
      id="mount-point"
      ref={(e) => {
        if (!e) return;
        el.current = e;
      }}
      width="800"
      height="600"
    />
  );
}
