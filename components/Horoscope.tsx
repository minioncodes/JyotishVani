"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
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
  FiX
} from "react-icons/fi";

type Sign = {
  id: number;
  name: string;        // localized label
  actualName: string;  // English name for API
  symbol: string;
  icon: JSX.Element;
  msg: string;
};

type Prediction = {
  type: string;
  prediction: string;
  challenge: string;
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
  Pisces: <FiStar />
};

function Card({ s, onClick }: { s: Sign; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={`${s.name} horoscope`}
      className="group relative shrink-0 select-none min-w-[240px] h-[200px] rounded-2xl p-4 text-left bg-white/65 backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(197,164,109,0.45)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222]/60"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(197,164,109,0.28), 0 1px 0 rgba(255,255,255,0.4)"
        }}
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

function PredictionModal({
  sign,
  predictions,
  loading,
  onClose,
  texts
}: {
  sign: string | null;
  predictions: Prediction[] | null;
  loading: boolean;
  onClose: () => void;
  texts: {
    loading: string;
    challenge: string;
    noPrediction: string;
  };
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
            className="relative max-w-2xl w-[92%] sm:w-full rounded-2xl bg-white/95 p-6 shadow-2xl text-black"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-600 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B22222]/60 rounded-md"
            >
              <FiX size={22} />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {sign}
            </h2>

            <div className="rounded-2xl bg-gradient-to-br from-[#FAF9F6] to-[#F4EEDF] p-6 shadow-inner border border-[#E6D5B8]/60 max-h-[70vh] overflow-y-auto">
              {loading && (
                <p className="text-center text-gray-600 text-sm italic animate-pulse">
                  {texts.loading}
                </p>
              )}

              {!loading && predictions && predictions.length > 0 ? (
                <div className="space-y-6">
                  {predictions.map((p) => (
                    <div
                      key={p.type}
                      className="relative rounded-xl bg-white/70 p-5 shadow-sm hover:shadow-md border border-[#E6D5B8]/40 transition-all duration-300"
                    >
                      <span className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#B22222] to-[#E6D5B8] rounded-l-lg" />
                      <h3 className="font-semibold text-[#8F733F] text-xl mb-2 tracking-wide">
                        {p.type}
                      </h3>

                      <p className="text-gray-800 text-[15px] leading-relaxed font-[500]">
                        {p.prediction}
                      </p>

                      <p className="mt-3 text-[14px] italic text-[#B94B4B] font-medium bg-[#FDF4F4] px-3 py-2 rounded-lg border border-[#F6D1D1]/60">
                        ⚠️{" "}
                        <span className="font-semibold">
                          {texts.challenge}:
                        </span>{" "}
                        {p.challenge}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && (
                  <p className="text-center text-gray-600 text-sm italic">
                    {texts.noPrediction}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Horoscope() {
  const t = useTranslations("horoscope");

  // Build localized data from ICONS + messages
  const data: Sign[] = Object.entries(ICONS).map(([englishName, icon], idx) => ({
    id: idx + 1,
    name: t(`signs.${englishName}`),
    actualName: englishName,
    symbol: "",
    icon,
    msg: t(`messages.${englishName}`)
  }));

  const doubled = [...data, ...data];

  const [activeSign, setActiveSign] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const rAF = useRef<number | null>(null);

  const open = async (s: Sign) => {
    setActiveSign(s.name);
    setLoading(true);
    setPredictions(null);
    try {
      const res = await fetch(
        `/api/horoscope/get?sign=${s.actualName.toLowerCase()}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      if (data.success) setPredictions(data.predictions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const goTo = (i: number) => {
    setIndex(i);
    const el = sliderRef.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
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
          if (dist < minDist) {
            minDist = dist;
            nearest = i;
          }
        });
        setIndex(nearest);
      });
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (rAF.current) cancelAnimationFrame(rAF.current);
    };
  }, []);

  return (
    <section
      id="horoscope"
      className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28"
    >
      <style jsx global>{`
        @keyframes marqueeX {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-black">
          {t("headingPrefix")}{" "}
          <span className="text-[#B22222]">{t("headingAccent")}</span>
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-700">
          {t("subtitle")}
        </p>
      </div>

      {/* Phone + Tab slider */}
      <div className="mt-10 md:block lg:hidden">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-2 snap-x snap-mandatory scroll-smooth"
          aria-label="Horoscope slider"
        >
          {data.map((s) => (
            <div
              key={s.id}
              className="snap-center shrink-0"
              onClick={() => open(s)}
            >
              <Card s={s} onClick={() => open(s)} />
            </div>
          ))}
        </div>

        <div
          className="mt-5 flex justify-center gap-2"
          aria-label="Slide navigation"
        >
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${data[i].name}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === i ? "bg-[#B22222] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop marquee */}
      <div className="hidden md:block mt-10 relative w-full">
        <div className="group relative w-full">
          <div className="inline-flex gap-6 whitespace-nowrap will-change-transform [animation:marqueeX_40s_linear_infinite] group-hover:[animation-play-state:paused]">
            {doubled.map((s, idx) => (
              <Card
                key={`${s.actualName}-${s.id}-${idx}`}
                s={s}
                onClick={() => open(s)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/contact"
          className="rounded-xl bg-[#B22222] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-black hover:text-white transition"
        >
          {t("cta")}
        </Link>
      </div>

      <PredictionModal
        sign={activeSign}
        predictions={predictions}
        loading={loading}
        onClose={() => setActiveSign(null)}
        texts={{
          loading: t("modal.loading"),
          challenge: t("modal.challenge"),
          noPrediction: t("modal.noPrediction")
        }}
      />
    </section>
  );
}
