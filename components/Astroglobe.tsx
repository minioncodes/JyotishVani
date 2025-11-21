"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AstroGlobe() {
  const t = useTranslations("astroGlobe");

  type Snapshot = {
    tithi: string;
    paksha: string;
    nakshatra: string;
    rahuKaal: string;
    remedy: string;
    updatedAt?: string;
  } | null;

  const [snapshot, setSnapshot] = useState<Snapshot>(null);

 useEffect(() => {
  let isMounted = true;
  let controller = new AbortController();

  async function fetchSnapshot() {
    try {
      const res = await fetch("/api/freesnap", {
        cache: "no-store",
        signal: controller.signal
      });

      const data = await res.json();
      if (!isMounted) return;

      setSnapshot({
        tithi: data.tithi,
        paksha: data.paksha,
        nakshatra: data.nakshatra,
        rahuKaal: data.rahuKaal,
        remedy: data.remedy ?? "Offer water to Sun",
        updatedAt: data.updatedAt ?? new Date().toLocaleTimeString(),
      });
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Snapshot fetch failed:", err);
      }
    }
  }

  fetchSnapshot();

  // refresh every 10 min (snapshot changes only every 2 hours)
  const interval = setInterval(fetchSnapshot, 10 * 60 * 1000);

  return () => {
    isMounted = false;
    controller.abort();
    clearInterval(interval);
  };
}, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] flex items-center justify-center bg-[#B22222] rounded-sm overflow-hidden shadow-sm"
    >
      {/* soft aura */}
      <div className="absolute inset-0 rounded-full bg-[#FAF9F6] blur-3xl animate-pulse" />

      {/* Floating golden sparks */}
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
                backgroundColor: "#FFD97D",
                boxShadow: "0 0 14px 6px rgba(255,217,125,0.9)"
              }}
              animate={{
                x: [0, offsetX, 0],
                y: [0, offsetY, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Rotating ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border border-dashed border-[#B22222]/50" />
      </motion.div>

      {/* Wireframe globe */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="#B2222299" strokeWidth="1" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#B2222266" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="#B2222266" strokeWidth="0.7" />
        <line x1="20" y1="100" x2="180" y2="100" stroke="#B2222255" />
        <line x1="100" y1="20" x2="100" y2="180" stroke="#B2222255" />
      </motion.svg>

      {/* Snapshot overlay */}
      <div className="absolute z-20 w-full md:w-full rounded-2xl p-4">
        <h3 className="font-semibold mb-2 text-center text-black text-sm">
          {t("title")}
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            [t("tithi"), snapshot?.tithi],
            [t("paksha"), snapshot?.paksha],
            [t("nakshatra"), snapshot?.nakshatra],
            [t("rahuKaal"), snapshot?.rahuKaal]
          ].map(([label, value], i) => (
            <div
              key={i}
              className="rounded-lg border border-[#FFD97D]/50 p-2 bg-white/90 shadow"
            >
              <div className="text-[#B22222] text-xs font-medium">{label}</div>
              <div className="mt-1 text-base text-black font-semibold">
                {value || t("loading")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
