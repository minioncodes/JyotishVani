"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,FiMoon,FiStar,FiHeart,FiCompass,FiZap,FiFeather,FiGlobe,FiAnchor,FiAperture,FiWind,FiTarget,FiX
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
    <button
      onClick={onClick}
      aria-label={`${s.name} horoscope`}
      className="
        group relative shrink-0 select-none
        min-w-[240px] h-[200px] 
        rounded-2xl p-4
        text-left
        bg-white/65 backdrop-blur-md
        border border-white/20
        transition-all duration-300
        hover:shadow-[0_12px_36px_rgba(197,164,109,0.45)]
        hover:-translate-y-0.5
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222]/60
      "
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow:"inset 0 0 0 1px rgba(197,164,109,0.28), 0 1px 0 rgba(255,255,255,0.4)" }}
      />
      <div className="flex flex-col items-center pt-2">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#B22222]/20 to-[#E68F8F]/40 text-2xl text-[#B22222] shadow-sm transition-transform duration-300 group-hover:scale-110">
          {s.icon}
        </div>
        <h3 className="text-center text-lg font-semibold text-black transition-colors duration-300 group-hover:text-[#8F733F]">
          {s.name}
        </h3>
      </div>
      <p className="px-2 pb-1 pt-2 text-center text-sm text-gray-700 italic line-clamp-3">
        {s.msg}
      </p>
    </button>
  );
}

function PredictionModal({ sign, onClose }: { sign: Sign | null; onClose: () => void; }) {
  return (
    <AnimatePresence>
      {sign && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="relative max-w-2xl w-[92%] sm:w-full rounded-2xl bg-white/95 p-6 shadow-2xl text-black"
            initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}>
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222]/60 rounded-md">
              <FiX size={22}/>
            </button>
            <h2 className="text-2xl font-bold mb-4">{sign.name} <span className="text-[#B22222]">Horoscope</span></h2>
            <div className="rounded-xl bg-[#FAF9F6] p-4 shadow-sm border border-[#E68F8F]/50">
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

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const fn = () => setIsDesktop(window.innerWidth >= 1024);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const open = (s: Sign) => {
    return;
  };

  const data: Sign[] = Object.entries(ICONS).map(([name, icon], idx) => ({
    id: idx + 1,
    name,
    symbol: "",
    icon,
    msg: defaultMessages[name] || "Your stars are aligning ✨",
  }));

  const doubled = [...data, ...data];

  const [index, setIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const rAF = useRef<number | null>(null);

  const goTo = (i: number) => {
    setIndex(i);
    const el = sliderRef.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;
    const onScroll = () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
      rAF.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        let nearest = 0;
        let minDist = Infinity;
        Array.from(container.children).forEach((child, i) => {
          const cRect = (child as HTMLElement).getBoundingClientRect();
          const cCenter = cRect.left + cRect.width / 2;
          const dist = Math.abs(cCenter - centerX);
          if (dist < minDist) { minDist = dist; nearest = i; }
        });
        setIndex(nearest);
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => { container.removeEventListener("scroll", onScroll); if (rAF.current) cancelAnimationFrame(rAF.current); };
  }, []);

  return (
    <section id="horoscope" className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">

      <style jsx global>{`
        @keyframes marqueeX { 0% {transform: translateX(0%);} 100% {transform: translateX(-50%);} }
      `}</style>

      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black">
          Today’s <span className="text-[#B22222]">Horoscope</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-700">
          Your daily dose of cosmic guidance, aligned with the stars ✨
        </p>
      </div>

      {/* Phone + Tab slider */}
      <div className="mt-10 md:block lg:hidden">
        <div ref={sliderRef} className="flex gap-4 overflow-x-auto no-scrollbar px-2 snap-x snap-mandatory scroll-smooth"
          aria-label="Horoscope slider"
        >
          {data.map((s, i) => (
            <div key={s.id} className="snap-center shrink-0" onClick={() => open(s)}>
              <Card s={s} onClick={() => open(s)} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2" aria-label="Slide navigation">
          {data.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Go to ${data[i].name}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${index === i ? "bg-[#B22222] w-6" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop marquee */}
      <div className="hidden md:block mt-10 relative w-full">
        <div className="group relative w-full">
          <div className="inline-flex gap-6 whitespace-nowrap will-change-transform [animation:marqueeX_40s_linear_infinite] group-hover:[animation-play-state:paused]">
            {doubled.map((s) => (
              <Card key={`${s.name}-${s.id}-${Math.random()}`} s={s} onClick={() => open(s)} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <a href="/contact" className="rounded-xl bg-[#B22222] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-black hover:text-white transition">
          Get your personalized reading
        </a>
      </div>
    </section>
  );
}
