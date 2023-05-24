import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import ReactRenderedRectangle from "./ReactRenderedRectangle";
import CanvasRenderedRectangle from "./CanvasRenderedRectangle";

// let offsetX, offsetY;

// let times = [];
// let last = null;

function App() {
  const [testRect, setTestRect] = useState(false);
  const [reactBenchmark, setReactBenchmark] = useState(0);
  const [canvasBenchmark, setCanvasBenchmark] = useState(0);
  const [testCanvas, setTestCanvas] = useState(false);

  const testStart = useRef();

  const [rects, setRects] = useState([]);

  useEffect(() => {
    const r = [];
    for (let i = 0; i < 1000; i++) {
      r.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        w: Math.random() * 100,
        h: Math.random() * 100,
      });
    }

    setRects(r);
  }, []);

  const done = () => {
    setTestCanvas((prev) => {
      if (prev) {
        setCanvasBenchmark(performance.now() - testStart.current);
      }
      return false;
    });
    setTestRect((prev) => {
      if (prev) {
        setReactBenchmark(performance.now() - testStart.current);
      }

      return false;
    });
  };

  // const ctx = useRef(null);
  // const drag = useRef(false);

  // const draw = () => {
  //   if (!ctx.current) return;
  //   ctx.current.clearRect(0, 0, 800, 600);
  //   ctx.current.fillStyle = "red";
  //   ctx.current.fillRect(
  //     rect.current.x,
  //     rect.current.y,
  //     rect.current.w,
  //     rect.current.h
  //   );
  // };

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
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <div>
        <button
          type="button"
          onClick={() => {
            setTestRect(true);
            testStart.current = performance.now();
          }}
        >
          Test react
        </button>
        {reactBenchmark && `React benchmark: ${reactBenchmark}ms`}
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setTestCanvas(true);
            testStart.current = performance.now();
          }}
        >
          Test canvas
        </button>
        {canvasBenchmark && `Canvas benchmark: ${canvasBenchmark}ms`}
      </div>
      {testCanvas && <CanvasRenderedRectangle rects={rects} done={done} />}
      {testRect && <ReactRenderedRectangle rects={rects} done={done} />}
    </div>
  );
}

export default App;
