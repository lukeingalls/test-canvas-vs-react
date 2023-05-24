import { useEffect, useRef, useState } from "react";
import "./App.css";
import ReactRenderedRectangle from "./ReactRenderedRectangle";
import CanvasRenderedRectangle from "./CanvasRenderedRectangle";
import { TEST_SIZE } from "./constants";
import VanillaJs from "./VanillaJsRenderedRectangle";

function App() {
  const [testReact, setTestReact] = useState(false);
  const [reactBenchmark, setReactBenchmark] = useState(0);
  const [testCanvas, setTestCanvas] = useState(false);
  const [canvasBenchmark, setCanvasBenchmark] = useState(0);
  const [testVanillaJs, setTestVanillaJs] = useState(false);
  const [vanillaJsBenchmark, setVanillaJsBenchmark] = useState(0);

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
    setTestReact((prev) => {
      if (prev) {
        setReactBenchmark(performance.now() - testStart.current);
      }

      return false;
    });
    setTestVanillaJs((prev) => {
      if (prev) {
        setVanillaJsBenchmark(performance.now() - testStart.current);
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
      <div>Test size {TEST_SIZE}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "100px auto",
          gap: 10,
          justifyItems: "start",
        }}
      >
        <button
          type="button"
          style={{ gridColumn: 1 }}
          onClick={() => {
            setTestReact(true);
            testStart.current = performance.now();
          }}
        >
          Test react
        </button>
        <div style={{ gridColumn: 2 }}>
          {reactBenchmark && `React benchmark: ${reactBenchmark}ms`}
        </div>
        <button
          type="button"
          onClick={() => {
            setTestCanvas(true);
            testStart.current = performance.now();
          }}
        >
          Test canvas
        </button>
        <div>{canvasBenchmark && `Canvas benchmark: ${canvasBenchmark}ms`}</div>
        <button
          type="button"
          onClick={() => {
            setTestVanillaJs(true);
            testStart.current = performance.now();
          }}
        >
          Test vanilla js
        </button>
        <div>
          {vanillaJsBenchmark &&
            `Vanilla js benchmark: ${vanillaJsBenchmark}ms`}
        </div>
      </div>

      {testCanvas && <CanvasRenderedRectangle rects={rects} done={done} />}
      {testReact && <ReactRenderedRectangle rects={rects} done={done} />}
      {testVanillaJs && <VanillaJs rects={rects} done={done} />}
    </div>
  );
}

export default App;
