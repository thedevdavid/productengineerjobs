// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "react-spring";

export const Globe = () => {
  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const [{ r, y }, api] = useSpring(() => ({
    r: 0,
    y: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);

    window.addEventListener("resize", onResize);

    onResize();

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2 * 0.4,
      phi: 0,
      theta: -0.15,
      dark: 0,
      diffuse: 1,
      mapSamples: 24000,
      mapBrightness: 0.8,
      baseColor: [245 / 255, 247 / 255, 250 / 255],
      markerColor: [250 / 255, 204 / 255, 20 / 255],
      glowColor: [0.75, 0.75, 0.75],
      markers: [
        { location: [34.0381, -118.6923], size: 0.12 },
        { location: [40.7128, -74.006], size: 0.06 },
        { location: [47.4979, 19.0402], size: 0.12 },
        { location: [35.6762, 139.6503], size: 0.06 },
      ],
      opacity: 0.9,
      scale: 2.5,
      offset: [0, width * 2 * 0.4 * 0.6],
      onRender: (state) => {
        // This prevents rotation while dragging
        if (!pointerInteracting.current) {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          phi += 0.005;
        }
        state.phi = phi + r.get();
        state.height = width * 2 * 0.4;
      },
    });
    setTimeout(() => (canvasRef.current.style.opacity = "1"));
    return () => globe.destroy();
  }, [r, y]);

  return (
    <div className="relative mx-auto aspect-[1/0.4] w-[80%]">
      <canvas
        className="mx-auto h-full w-full bg-transparent opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          contain: "layout paint size",
        }}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 200,
            });
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({
              r: delta / 100,
            });
          }
        }}
      />
    </div>
  );
};
