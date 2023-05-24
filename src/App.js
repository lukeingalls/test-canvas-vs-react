import { useEffect, useRef, useState } from "react";
import "./App.css";
import ReactRenderedRectangle from "./ReactRenderedRectangle";
import CanvasRenderedRectangle from "./CanvasRenderedRectangle";
import { TEST_SIZE } from "./constants";

function App() {
  const [testRect, setTestRect] = useState(false);
  const [reactBenchmark, setReactBenchmark] = useState(0);
  const [canvasBenchmark, setCanvasBenchmark] = useState(0);
  const [testCanvas, setTestCanvas] = useState(false);

  const testStart = useRef();

  const [rects, setRects] = useState([]);

  useEffect(() => {
    const r = [];
    for (let i = 0; i < TEST_SIZE; i++) {
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
