"use client";

import { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiStar,
  FiHeart,
  FiCompass,
  FiZap,
  FiFeather,
  FiGlobe,
  FiAnchor,
  FiAperture,
  FiWind,
  FiTarget,
  FiX,
} from "react-icons/fi";

type Prediction = {
  type: string;
  prediction: string;
  seek: string;
  challenge: string;
  insight: string;
};

type Sign = {
  id: number;
  name: string;
  symbol: string;
  icon: JSX.Element;
  msg: string;
  predictions?: Prediction[];
};

const ICONS: Record<string, JSX.Element> = {
  Aries: <FiZap />,
  Taurus: <FiAnchor />,
  Gemini: <FiWind />,
  Cancer: <FiHeart />,
  Leo: <FiSun />,
  Virgo: <FiFeather />,
  Libra: <FiCompass />,
  Scorpio: <FiMoon />,
  Sagittarius: <FiTarget />,
  Capricorn: <FiGlobe />,
  Aquarius: <FiAperture />,
  Pisces: <FiStar />,
};

function shorten(text: string, len = 80) {
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
}

function Card({ s, onClick }: { s: Sign; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group mx-2 w-[240px] shrink-0 cursor-pointer rounded-2xl border border-white/10 bg-black/50 p-5 shadow-xl backdrop-blur-xl hover:scale-105 transition"
    >
      <div className="flex items-center justify-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white/90">
          {s.icon}
        </div>
      </div>
      <h3 className="text-center text-lg font-semibold text-white">{s.name}</h3>
      <p className="mt-1 text-center text-sm text-gray-300">{s.msg}</p>
    </div>
  );
}

function MarqueeRow({
  items,
  speed = 30,
  offset = 0,
  onSelect,
}: {
  items: Sign[];
  speed?: number;
  offset?: number;
  onSelect: (s: Sign) => void;
}) {
  const track = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
          delay: offset,
        }}
      >
        <div className="flex">
          {track.map((s, i) => (
            <Card key={`${s.name}-${i}`} s={s} onClick={() => onSelect(s)} />
          ))}
        </div>
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}

function PredictionModal({
  sign,
  onClose,
}: {
  sign: Sign | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {sign && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-2xl w-full rounded-2xl bg-black/80 border border-white/10 p-6 shadow-2xl backdrop-blur-xl text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-300 hover:text-white"
            >
              <FiX size={24} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-2xl">
                {sign.icon}
              </div>
              <h2 className="text-2xl font-bold">{sign.name} Horoscope</h2>
            </div>
            <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-2 custom-scroll">
              {sign.predictions?.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-white/5 p-4 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-fuchsia-300">
                    {p.type}
                  </h3>
                  <p className="mt-1 text-gray-200 text-sm">{p.prediction}</p>
                  <ul className="mt-2 space-y-1 text-xs text-gray-400">
                    <li>
                      <span className="font-semibold text-fuchsia-400">
                        Seek:
                      </span>{" "}
                      {p.seek}
                    </li>
                    <li>
                      <span className="font-semibold text-indigo-400">
                        Challenge:
                      </span>{" "}
                      {p.challenge}
                    </li>
                    <li>
                      <span className="font-semibold text-teal-400">
                        Insight:
                      </span>{" "}
                      {p.insight}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Horoscope() {
  const [signs, setSigns] = useState<Sign[]>([]);
  const [active, setActive] = useState<Sign | null>(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  async function loadPredictions() {
    try {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0] + "T00:00:00+00:00";
      const res = await fetch(`/api/horoscope?datetime=${today}`);
      const data = await res.json();

      const predictions = data?.data?.daily_predictions || [];

      if (predictions.length) {
        const mapped: Sign[] = predictions.map((p: any) => ({
          id: p.sign?.id ?? 0,
          name: p.sign?.name ?? "Unknown",
          symbol: p.sign_info?.unicode_symbol || "",
          icon: ICONS[p.sign?.name] || <FiStar />,
          msg: shorten(p.predictions?.[0]?.prediction || "No message"),
          predictions: p.predictions || [],
        }));
        setSigns(mapped);
      }
    } catch (err) {
      console.error("Failed to load predictions", err);
    } finally {
      setLoading(false);
    }
  }
  loadPredictions();
}, []);

  const fallback: Sign[] = Object.entries(ICONS).map(([name, icon]) => ({
    id: 0,
    name,
    symbol: "",
    icon,
    msg: "Your stars are aligning ✨",
    predictions: [],
  }));

  const data = signs.length ? signs : fallback;
  const row1 = data.slice(0, 12);
  const row2 = [...data.slice(6), ...data.slice(0, 6)];

  return (
    <section
      id="horoscope"
      className="relative overflow-hidden px-6 py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold">
            Today’s{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              Horoscope
            </span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-300">
            Your daily dose of cosmic guidance, aligned with the stars ✨
          </p>
        </div>
        <div className="mt-10 space-y-6">
          {loading ? (
            <p className="text-center text-gray-400">
              Loading today’s horoscopes… ✨
            </p>
          ) : (
            <>
              <MarqueeRow items={row1} speed={30} onSelect={setActive} />
              <MarqueeRow items={row2} speed={24} offset={0.5} onSelect={setActive} />
            </>
          )}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold shadow-lg hover:opacity-95"
          >
            Get your personalized reading
          </a>
        </div>
      </div>
      <PredictionModal sign={active} onClose={() => setActive(null)} />
    </section>
  );
}
