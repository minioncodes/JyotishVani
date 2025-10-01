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

type Sign = {
  id: number;
  name: string;
  symbol: string;
  icon: JSX.Element;
  msg: string;
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
  Aries: "Take bold steps today ",
  Taurus: "Stay grounded and steady ",
  Gemini: "Conversations bring clarity ",
  Cancer: "Emotions guide your path ",
  Leo: "Shine with confidence ",
  Virgo: "Details bring success ",
  Libra: "Seek balance and harmony ",
  Scorpio: "Trust your instincts ",
  Sagittarius: "Adventure is calling ",
  Capricorn: "Persistence wins the day ",
  Aquarius: "Innovate and inspire ",
  Pisces: "Dreams shape your reality ",
};

function Card({ s, onClick }: { s: Sign; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="min-w-[240px] h-[200px] cursor-pointer
      flex flex-col justify-between
       bg-white backdrop-blur-md border border-gray-200/40
      shadow-md hover:shadow-xl hover:scale-105 transition-all duration-500"
    >
      {/* Top: Icon + Title */}
      <div className="flex flex-col items-center pt-5">
        <div
          className="mb-3 flex h-12 w-12 items-center justify-center 
          rounded-full bg-gradient-to-tr from-[#C5A46D]/20 to-[#E6D5B8]/40 
          text-2xl text-[#C5A46D] shadow-sm group-hover:scale-110 transition"
        >
          {s.icon}
        </div>
        <h3 className="text-center text-lg font-semibold text-black group-hover:text-[#C5A46D] transition">
          {s.name}
        </h3>
      </div>

      {/* Bottom: Message */}
      <p className="px-4 pb-5 text-center text-sm text-gray-700 italic line-clamp-3">
        {s.msg}
      </p>
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 40, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-600 hover:text-black"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {sign.name} <span className="text-[#C5A46D]">Horoscope</span>
            </h2>
            <div className="rounded-xl bg-[#FAF9F6] p-4 shadow-sm">
              <p className="text-gray-800 text-sm">{sign.msg}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Horoscope() {
  const [active, setActive] = useState<Sign | null>(null);

  // Hardcoded 12 signs
  const data: Sign[] = Object.entries(ICONS).map(([name, icon], idx) => ({
    id: idx + 1,
    name,
    symbol: "",
    icon,
    msg: defaultMessages[name] || "Your stars are aligning ✨",
  }));

  const doubled = [...data, ...data]; // for infinite scroll

  return (
    <section
      id="horoscope"
      className="relative  px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black">
          Today’s <span className="text-[#C5A46D]">Horoscope</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-700">
          Your daily dose of cosmic guidance, aligned with the stars ✨
        </p>
      </div>

      {/* ✅ Mobile: swipeable, smooth */}
      <div className="mt-10 md:hidden">
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-2 snap-x snap-mandatory scroll-smooth">
          {data.map((s, i) => (
            <div key={i} className="snap-center shrink-0">
              <Card s={s} onClick={() => setActive(s)} />
            </div>
          ))}
        </div>
      </div>

     
      {/* ✅ Desktop: marquee infinite smooth */}
      <div className="hidden md:block mt-14 relative w-full">
        <motion.div
          className="flex gap-6 flex-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...doubled].map((s, i) => (
            <Card key={i} s={s} onClick={() => setActive(s)} />
          ))}
        </motion.div>
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/contact"
          className="rounded-xl bg-[#C5A46D] px-6 py-3 text-sm font-semibold text-black shadow-md hover:bg-black hover:text-white transition"
        >
          Get your personalized reading
        </a>
      </div>

      <PredictionModal sign={active} onClose={() => setActive(null)} />
    </section>
  );
}
