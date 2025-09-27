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


  // useEffect(() => {
  //   async function fetchSnapshot() {
  //     try {
  //       const now = new Date();
  //       const year = now.getFullYear();
  //       const month = now.getMonth() + 1; // 1–12
  //       const day = now.getDate();
  //       const lat = 26.8467;   // e.g. Lucknow latitude
  //       const lon = 80.9462;   // Lucknow longitude
  //       const timezone = 5.5;  // IST = UTC+5:30

  //       // Example: VedicRishi API
  //       const url = `https://www.vedicrishiapi.com/panchang?date=${year}-${month
  //         .toString()
  //         .padStart(2, "0")}-${day.toString().padStart(2, "0")}&timezone=${timezone}&lat=${lat}&lon=${lon}`;

  //       const res = await fetch(url);
  //       const data = await res.json();

  //       // parse what the API returns
  //       // The response structure may differ; adapt below accordingly:
  //       const tithi = data?.Tithi?.name || "—";
  //       const nakshatra = data?.Nakshatra?.name || "—";
  //       const choghadiya = data?.Choghadiya?.current || "—";
  //       const remedy = data?.Remedy || "—";

  //       setSnapshot({
  //         tithi,
  //         nakshatra,
  //         choghadiya,
  //         remedy,
  //       });
  //     } catch (err) {
  //       console.error("Failed to fetch snapshot:", err);
  //     }
  //   }

  //   fetchSnapshot();
  // }, []);

  return (
    <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-400/20 to-sky-300/30 blur-3xl opacity-80 animate-pulse" />

      {/* Floating stars */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const duration = Math.random() * 8 + 6;
          const offsetX = (Math.random() - 0.5) * 40;
          const offsetY = (Math.random() - 0.5) * 40;
          const size = Math.random() * 3 + 2;

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

      {/* Snapshot overlay (stuck on globe) */}
  <div className="absolute z-20 w-full  md:w-full  rounded-2xl  p-4">
  <h3 className="font-medium mb-2 text-center text-white text-sm">Today’s Snapshot</h3>
  <div className="grid grid-cols-2 gap-2 text-xs">
    <div className="rounded-lg border border-white/10 p-2 bg-white/5">
      <div className="text-white/60">Tithi</div>
      <div className="mt-1 text-base">{snapshot?.tithi || "Loading..."}</div>
    </div>
    <div className="rounded-lg border border-white/10 p-2 bg-white/5">
      <div className="text-white/60">Paksha</div>
      <div className="mt-1 text-base">{snapshot?.paksha || "Loading..."}</div>
    </div>
    <div className="rounded-lg border border-white/10 p-2 bg-white/5">
      <div className="text-white/60">Nakshatra</div>
      <div className="mt-1 text-base">{snapshot?.nakshatra || "Loading..."}</div>
    </div>
    <div className="rounded-lg border border-white/10 p-2 bg-white/5">
      <div className="text-white/60">Choghadiya</div>
      <div className="mt-1 text-base">{snapshot?.choghadiya || "Loading..."}</div>
    </div>
    {/* <div className="rounded-lg border border-white/10 p-2 bg-white/5 col-span-2">
      <div className="text-white/60">Remedy</div>
      <div className="mt-1 text-base">{snapshot?.remedy || "Offer water to Sun"}</div>
    </div> */}
  </div>
</div>


   
    </div>
  );
}
