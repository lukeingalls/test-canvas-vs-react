import { useRef, useEffect } from "react";

// let offsetX, offsetY;

// let times = [];
// let last = null;

export default function CanvasRenderedRectangle({ rects, done }) {
  const ctx = useRef(null);
  const rectIdx = useRef(0);
  // const drag = useRef(false);

  useEffect(() => {
    const draw = () => {
      if (!ctx.current) return;

      const rect = rects[rectIdx.current];
      ctx.current.clearRect(0, 0, 800, 600);
      ctx.current.fillStyle = "red";
      ctx.current.fillRect(rect.x, rect.y, rect.w, rect.h);

      rectIdx.current++;
    };

    const advanceRect = () => {
      if (rectIdx.current < rects.length - 1) {
        draw();
        requestAnimationFrame(advanceRect);
      } else {
        done();
      }
    };

    requestAnimationFrame(advanceRect);
  }, [done, rectIdx, rects]);
  // const mouseDown = (e) => {
  //   var mx = e.clientX - document.getElementById("canvas").offsetLeft;
  //   var my = e.clientY - document.getElementById("canvas").offsetTop;
  //   times = [];
  //   if (
  //     mx > rect.current.x &&
  //     mx < rect.current.x + rect.current.w &&
  //     my > rect.current.y &&
  //     my < rect.current.y + rect.current.h
  //   ) {
  //     drag.current = true;
  //     offsetX = mx - rect.current.x;
  //     offsetY = my - rect.current.y;
  //   }
  // };

  // const mouseUp = () => {
  //   if (drag.current) {
  //     console.log(
  //       "(canvas) the average render time is ",
  //       times.reduce((a, b) => a + b, 0) / times.length
  //     );
  //   }

  //   drag.current = false;
  // };

  // const mouseMove = (e) => {
  //   if (drag.current) {
  //     if (last) {
  //       times.push(performance.now() - last);
  //     }
  //     last = performance.now();

  //     rect.current.x =
  //       e.clientX - document.getElementById("canvas").offsetLeft - offsetX;
  //     rect.current.y =
  //       e.clientY - document.getElementById("canvas").offsetTop - offsetY;
  //     draw();
  //   }
  // };

  return (
    <canvas
      // onMouseDown={mouseDown}
      // onMouseUp={mouseUp}
      // onMouseMove={mouseMove}
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
