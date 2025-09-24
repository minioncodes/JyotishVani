"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Planetarium – realistic, tasteful “astro” visual
 * - No external images; pure SVG/CSS
 * - Glass container, subtle nebula, twinkling stars
 * - Zodiac ring (SVG) rotates slowly
 * - 4 orbits with counter-rotating planets
 * - Performance-friendly (low layer count, linear animations)
 */

type PlanetCfg = {
  r: number;     // orbit radius (px)
  size: number;  // planet diameter (px)
  dur: number;   // orbit duration (s)
  hue: number;   // base hue for planet gradient
  glow?: number; // 0..1 for glow intensity
};

const PLANETS: PlanetCfg[] = [
  { r: 56,  size: 12, dur: 12, hue: 28,  glow: 0.5 },  // warm rocky
  { r: 88,  size: 16, dur: 18, hue: 205, glow: 0.45 }, // cool gas
  { r: 124, size: 14, dur: 24, hue: 310, glow: 0.5 },  // magenta ice
  { r: 156, size: 20, dur: 32, hue: 150, glow: 0.55 }, // teal giant
];

export default function Planetarium() {
  // pre-generate a small starfield; stable per mount
  const stars = useMemo(
    () =>
      Array.from({ length: 32 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        s: Math.random() * 2 + 0.6, // size
        d: 1.6 + Math.random() * 1.6, // twinkle duration
        o: 0.25 + Math.random() * 0.6, // base opacity
      })),
    []
  );

  return (
    <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px]">
      {/* Glass shell */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl" />

      {/* Soft backdrop aura */}
      <div className="pointer-events-none absolute -inset-10 rounded-[36px] blur-3xl opacity-70">
        <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-fuchsia-500/20 via-indigo-500/15 to-sky-400/10" />
      </div>

      {/* Inner stage */}
      <div className="relative z-10 h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-black/30">
        {/* Nebula texture (very faint) */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_15%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(100%_70%_at_80%_85%,rgba(255,255,255,0.05),transparent_60%)]" />

        {/* Starfield */}
        {stars.map((st) => (
          <motion.span
            key={st.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${st.top}%`,
              left: `${st.left}%`,
              width: st.s,
              height: st.s,
              opacity: st.o,
              boxShadow: "0 0 10px rgba(255,255,255,0.4)",
            }}
            animate={{ opacity: [st.o, 1, st.o] }}
            transition={{ duration: st.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Core star + halos */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{ boxShadow: "0 0 20px rgba(255,255,255,0.85)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
             style={{ width: 160, height: 160, background: "radial-gradient(circle, rgba(255,255,255,0.15), transparent 60%)" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
             style={{ width: 110, height: 110, background: "radial-gradient(circle, rgba(199,108,255,0.2), transparent 60%)" }} />

        {/* Zodiac ring (SVG, low-ink) */}
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        >
          <defs>
            <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="68" fill="none" stroke="url(#ringStroke)" strokeWidth="1.25" strokeDasharray="5 10" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x = 100 + Math.cos(a) * 68;
            const y = 100 + Math.sin(a) * 68;
            return <circle key={i} cx={x} cy={y} r="2.2" fill="white" opacity="0.9" />;
          })}
        </motion.svg>

        {/* Orbits + planets */}
        {PLANETS.map((p, idx) => (
          <Orbit key={idx} r={p.r} size={p.size} dur={p.dur} hue={p.hue} glow={p.glow} />
        ))}

        {/* Label */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
          <p className="text-[11px] text-gray-300/80 tracking-wide">
            Transits • Orbits • Zodiac
          </p>
        </div>
      </div>
    </div>
  );
}

/** Single orbit with a counter-rotating planet (for realism) */
function Orbit({
  r,
  size,
  dur,
  hue,
  glow = 0.5,
}: {
  r: number;
  size: number;
  dur: number;
  hue: number;
  glow?: number;
}) {
  const glowPx = Math.round(20 * glow);
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: r * 2, height: r * 2 }}
    >
      {/* Faint orbit line */}
      <div className="absolute inset-0 rounded-full border border-white/10" />

      {/* Carrier rotates the planet */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%, -50%)" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: dur, ease: "linear" }}
      >
        {/* Counter-rotation to keep planet facing camera */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-full"
          style={{ top: 0, width: size, height: size }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: dur, ease: "linear" }}
        >
          <div
            className="h-full w-full rounded-full border border-white/10"
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, hsl(${hue} 90% 70%) 0deg, hsl(${hue} 85% 55%) 140deg, hsl(${hue} 90% 70%) 360deg)`,
              boxShadow: `0 0 ${glowPx}px rgba(255,255,255,0.25)`,
              filter: "saturate(1.1)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
