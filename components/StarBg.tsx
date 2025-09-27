"use client";

import { useEffect, useRef } from "react";

/** Lightweight animated starfield canvas for subtle depth */
export default function StarsBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      s: Math.random() * 0.8 + 0.2,
    }));

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(197, 164, 109, 0.9)"; // ✨ soft golden stars
      for (const st of stars) {
        const x = st.x * canvas.width;
        const y = st.y * canvas.height;
        const r = st.s * st.z * DPR;
        ctx.globalAlpha = 0.25 + st.z * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // gentle drift
        st.x += (0.0002 * (st.z + 0.2)) * (Math.random() > 0.5 ? 1 : -1);
        st.y += (0.00015 * (st.z + 0.2)) * (Math.random() > 0.5 ? 1 : -1);
        if (st.x < 0) st.x = 1;
        if (st.x > 1) st.x = 0;
        if (st.y < 0) st.y = 1;
        if (st.y > 1) st.y = 0;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden
    />
  );
}
