import { TEST_SIZE } from "./constants";

export default function ReactRenderedRectangle({ rects, done }) {
  return (
    <>
      {rects.map((r, i) => {
        if (i === TEST_SIZE - 1) done();
        return (
          <div
            id="canvas"
            // onMouseDown={mouseDown}
            style={{
              backgroundColor: "red",
              top: r.x,
              left: r.y,
              position: "absolute",
              width: r.w,
              height: r.h,
              zIndex: 1,
              cursor: "pointer",
            }}
          />
        );
      })}
    </>
  );
}
