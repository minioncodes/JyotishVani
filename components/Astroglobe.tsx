"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AstroGlobe() {
  const [snapshot, setSnapshot] = useState<any>(null);

  useEffect(() => {
    async function fetchSnapshot() {
      const res = await fetch("/api/snapshot");
      const data = await res.json();
      setSnapshot({
        tithi: data.tithi,
        paksha: data.paksha,
        nakshatra: data.nakshatra,
        choghadiya: data.choghadiya,
        remedy: "Offer water to Sun",
      });
    }
    fetchSnapshot();
  }, []);

  return (
    <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
      {/* Subtle aura (keep soft) */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0B0C10]/60 via-[#1B1F29]/50 to-[#C5A46D]/10 blur-3xl animate-pulse" />

      {/* Floating golden sparks (more glow than before) */}
      <div className="absolute inset-0">
        {[...Array(70)].map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = Math.random() * 8 + 6;
          const offsetX = (Math.random() - 0.5) * 30;
          const offsetY = (Math.random() - 0.5) * 30;
          const size = Math.random() * 3 + 2;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: "#FFD97D", // strong golden
                boxShadow: "0 0 14px 6px rgba(255,217,125,0.9)", // glowing gold
              }}
              animate={{
                x: [0, offsetX, 0],
                y: [0, offsetY, 0],
                opacity: [0.4, 1, 0.4],
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

      {/* Zodiac outer ring (subtle gold, not too strong) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-dashed border-[#C5A46D]/50" />
      </motion.div>

      {/* Wireframe globe (soft gold strokes) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="#C5A46D99" strokeWidth="1" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#C5A46D66" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="#C5A46D66" strokeWidth="0.7" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#C5A46D55" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="#C5A46D55" />
      </motion.svg>

      {/* Planet core (kept soft, not over-bright) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F9E6A6] via-[#C5A46D] to-[#0B0C10] blur-xl shadow-[0_0_40px_15px_rgba(255,217,125,0.6)]" />
      </motion.div>

      {/* Snapshot overlay */}
      <div className="absolute z-20 w-full md:w-full rounded-2xl p-4">
        <h3 className="font-semibold mb-2 text-center text-[#C5A46D] text-sm">
          Today’s Snapshot
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            ["Tithi", snapshot?.tithi],
            ["Paksha", snapshot?.paksha],
            ["Nakshatra", snapshot?.nakshatra],
            ["Choghadiya", snapshot?.choghadiya],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-lg border border-[#FFD97D]/50 p-2 bg-white/90 shadow"
            >
              <div className="text-[#C5A46D] text-xs font-medium">{label}</div>
              <div className="mt-1 text-base text-black font-semibold">
                {value || "Loading..."}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
