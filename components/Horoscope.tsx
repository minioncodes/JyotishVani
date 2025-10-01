"use client";

import { JSX, useState } from "react";
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

const defaultMessages: Record<string, string> = {
  Aries: "Take bold steps today 🔥",
  Taurus: "Stay grounded and steady 🌱",
  Gemini: "Conversations bring clarity 💬",
  Cancer: "Emotions guide your path 🌊",
  Leo: "Shine with confidence ☀️",
  Virgo: "Details bring success 📖",
  Libra: "Seek balance and harmony ⚖️",
  Scorpio: "Trust your instincts 🦂",
  Sagittarius: "Adventure is calling 🎯",
  Capricorn: "Persistence wins the day ⛰️",
  Aquarius: "Innovate and inspire 💡",
  Pisces: "Dreams shape your reality 🌌",
};

function Card({ s, onClick }: { s: Sign; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group mx-2 w-[220px] shrink-0 cursor-pointer bg-white/80 p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition h-[200px] flex flex-col justify-between"
    >
      {/* Top: Icon + Title */}
      <div className="flex flex-col items-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C5A46D]/10 text-2xl text-[#C5A46D]">
          {s.icon}
        </div>
        <h3 className="text-center text-lg font-semibold text-black">{s.name}</h3>
      </div>

      {/* Bottom: Message */}
      <p className="mt-2 text-center text-sm text-gray-700 line-clamp-3">
        {s.msg}
      </p>
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
    <div className="hidden md:block relative w-full overflow-hidden">
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#FAF9F6] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FAF9F6] to-transparent" />
    </div>
  );
}

function MobileCarousel({
  items,
  onSelect,
}: {
  items: Sign[];
  onSelect: (s: Sign) => void;
}) {
  return (
    <div className="flex md:hidden gap-4 overflow-x-auto no-scrollbar px-2 snap-x snap-mandatory">
      {items.map((s, i) => (
        <div key={i} className="snap-center shrink-0">
          <Card s={s} onClick={() => onSelect(s)} />
        </div>
      ))}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-2xl w-full rounded-2xl bg-white/95 p-6 shadow-2xl text-black"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              title="onclose"
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-600 hover:text-black"
            >
              <FiX size={24} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#C5A46D]/10 text-2xl text-[#C5A46D]">
                {sign.icon}
              </div>
              <h2 className="text-2xl font-bold">
                {sign.name} <span className="text-[#C5A46D]">Horoscope</span>
              </h2>
            </div>
            <div className="rounded-xl bg-[#FAF9F6] p-4 shadow-sm">
              <p className="text-gray-800 text-sm">
                {sign.msg || "Your stars are aligning ✨"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Horoscope() {
  const [active, setActive] = useState<Sign | null>(null);

  // ✅ Hardcoded 12 signs
  const data: Sign[] = Object.entries(ICONS).map(([name, icon], idx) => ({
    id: idx + 1,
    name,
    symbol: "",
    icon,
    msg: defaultMessages[name] || "Your stars are aligning ✨",
    predictions: [],
  }));

  return (
    <section id="horoscope" className="relative overflow-hidden px-6 py-20 md:py-28">
      <div className="relative ">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Today’s <span className="text-[#C5A46D]">Horoscope</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-700">
            Your daily dose of cosmic guidance, aligned with the stars ✨
          </p>
        </div>

        {/* ✅ Mobile Carousel */}
        <div className="mt-10 md:hidden">
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-2 snap-x snap-mandatory">
            {data.map((s, i) => (
              <div key={i} className="snap-center shrink-0">
                <Card s={s} onClick={() => setActive(s)} />
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Desktop Grid (all in one row) */}
        <div className="hidden md:grid mt-12 grid-cols-6 xl:grid-cols-12 gap-6">
          {data.map((s, i) => (
            <Card key={i} s={s} onClick={() => setActive(s)} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="rounded-xl bg-[#C5A46D] px-6 py-3 text-sm font-semibold text-black shadow-md hover:bg-black hover:text-white transition"
          >
            Get your personalized reading
          </a>
        </div>
      </div>
      <PredictionModal sign={active} onClose={() => setActive(null)} />
    </section>
  );
}

