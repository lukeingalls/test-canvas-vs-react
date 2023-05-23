import { useRef, useState, useEffect, useCallback } from "react";

let offsetX, offsetY;

let times = [];
let last = null;

export default function Unamedfn() {
  const [rect, setRect] = useState({
    x: 50,
    y: 50,
    w: 100,
    h: 100,
  });
  const drag = useRef(false);

  const mouseDown = useCallback(
    (e) => {
      times = [];
      var mx = e.clientX - document.getElementById("canvas").offsetLeft;
      var my = e.clientY - document.getElementById("canvas").offsetTop;
      drag.current = true;
      offsetX = mx - rect.x;
      offsetY = my - rect.y;
    },
    [rect]
  );

  const mouseUp = useCallback(() => {
    if (drag.current) {
      console.log(
        "(react) the average render time is ",
        times.reduce((a, b) => a + b, 0) / times.length
      );
    }
    drag.current = false;
  }, []);

  const mouseMove = useCallback((e) => {
    if (drag.current) {
      if (last) {
        times.push(performance.now() - last);
      }
      last = performance.now();
      setRect((r) => ({
        ...r,
        y: e.clientX - document.getElementById("canvas").offsetLeft - offsetX,
        x: e.clientY - document.getElementById("canvas").offsetTop - offsetY,
      }));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [mouseMove, mouseUp]);

  return (
    <div
      id="canvas"
      onMouseDown={mouseDown}
      style={{
        backgroundColor: "red",
        top: rect.x,
        left: rect.y,
        position: "absolute",
        width: rect.w,
        height: rect.h,
        zIndex: 1,
        cursor: "pointer",
      }}
    ></div>
  );
}
