import { useRef } from "react";
import "./App.css";
import Rectangle from "./Rectangle";

let offsetX, offsetY;

let times = [];
let last = null;

function App() {
  const rect = useRef({
    x: 50,
    y: 50,
    w: 100,
    h: 100,
  });
  const ctx = useRef(null);
  const drag = useRef(false);

  const draw = () => {
    if (!ctx.current) return;
    ctx.current.clearRect(0, 0, 800, 600);
    ctx.current.fillStyle = "red";
    ctx.current.fillRect(
      rect.current.x,
      rect.current.y,
      rect.current.w,
      rect.current.h
    );
  };

  const mouseDown = (e) => {
    var mx = e.clientX - document.getElementById("canvas").offsetLeft;
    var my = e.clientY - document.getElementById("canvas").offsetTop;
    times = [];
    if (
      mx > rect.current.x &&
      mx < rect.current.x + rect.current.w &&
      my > rect.current.y &&
      my < rect.current.y + rect.current.h
    ) {
      drag.current = true;
      offsetX = mx - rect.current.x;
      offsetY = my - rect.current.y;
    }
  };

  const mouseUp = () => {
    if (drag.current) {
      console.log(
        "(canvas) the average render time is ",
        times.reduce((a, b) => a + b, 0) / times.length
      );
    }

    drag.current = false;
  };

  const mouseMove = (e) => {
    if (drag.current) {
      if (last) {
        times.push(performance.now() - last);
      }
      last = performance.now();

      rect.current.x =
        e.clientX - document.getElementById("canvas").offsetLeft - offsetX;
      rect.current.y =
        e.clientY - document.getElementById("canvas").offsetTop - offsetY;
      draw();
    }
  };

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <canvas
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        id="canvas"
        ref={(el) => {
          if (!el) return;
          ctx.current = el.getContext("2d");
          draw();
        }}
        width="800"
        height="600"
      ></canvas>
      <Rectangle />
    </div>
  );
}

export default App;
