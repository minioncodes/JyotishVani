"use client";

import { motion } from "framer-motion";

export default function AstroGlobe() {
  return (
    <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px]">
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-400/20 to-sky-300/30 blur-3xl opacity-80 animate-pulse" />

      {/* Floating stars */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = Math.random() * 8 + 6; // slower floating
          const offsetX = (Math.random() - 0.5) * 40; // random drift range
          const offsetY = (Math.random() - 0.5) * 40;
          const size = Math.random() * 3 + 2; // random size between 2px and 5px

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/80"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
              }}
              animate={{
                x: [0, offsetX, 0],
                y: [0, offsetY, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Zodiac outer ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-dashed border-purple-300/30" />
      </motion.div>

      {/* Rotating wireframe globe */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.15)" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.15)" />
      </motion.svg>

      {/* Center core (pulsing) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/60 via-indigo-200/50 to-purple-300/60 blur-xl" />
      </motion.div>

      {/* Caption */}
      <p className="absolute bottom-3 inset-x-0 text-center text-xs md:text-sm text-gray-300/80 tracking-widest uppercase">
        {/* ✦ Celestial Sphere ✦ */}
      </p>
    </div>
  );
}
