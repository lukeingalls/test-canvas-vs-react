import { useRef, useEffect } from "react";

export default function CanvasRenderedRectangle({ rects, done }) {
  const ctx = useRef(null);

  const draw = (rect) => {
    if (!ctx.current) return;

    ctx.current.clearRect(0, 0, 800, 600);
    ctx.current.fillStyle = "red";
    ctx.current.fillRect(rect.x, rect.y, rect.w, rect.h);
  };

  useEffect(() => {
    for (const rect of rects) {
      draw(rect);
    }
    done();
  }, [done, rects]);

  return (
    <canvas
      id="canvas"
      ref={(el) => {
        if (!el) return;
        ctx.current = el.getContext("2d");
      }}
      width="800"
      height="600"
    />
  );
}
