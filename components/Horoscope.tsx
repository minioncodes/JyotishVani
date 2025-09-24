"use client";

import { motion } from "framer-motion";
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
} from "react-icons/fi";

type Sign = { name: string; icon: JSX.Element; msg: string };

const ZODIAC: Sign[] = [
  { name: "Aries",        icon: <FiZap />,      msg: "Take bold steps today." },
  { name: "Taurus",       icon: <FiAnchor />,   msg: "Stay grounded and steady." },
  { name: "Gemini",       icon: <FiWind />,     msg: "Conversations bring clarity." },
  { name: "Cancer",       icon: <FiHeart />,    msg: "Nurture emotional bonds." },
  { name: "Leo",          icon: <FiSun />,      msg: "Your charisma shines bright." },
  { name: "Virgo",        icon: <FiFeather />,  msg: "Focus on small details." },
  { name: "Libra",        icon: <FiCompass />,  msg: "Balance is your strength." },
  { name: "Scorpio",      icon: <FiMoon />,     msg: "Trust your deep intuition." },
  { name: "Sagittarius",  icon: <FiTarget />,   msg: "Adventure calls you." },
  { name: "Capricorn",    icon: <FiGlobe />,    msg: "Stay ambitious & practical." },
  { name: "Aquarius",     icon: <FiAperture />, msg: "Innovate and inspire." },
  { name: "Pisces",       icon: <FiStar />,     msg: "Let your dreams guide you." },
];

// Single glass card
function Card({ s }: { s: Sign }) {
  return (
    <div className="group mx-2 w-[240px] shrink-0 rounded-2xl border border-white/10 bg-black/50 p-5 shadow-xl backdrop-blur-xl">
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

// One marquee row (right → left). Duplicate content for seamless loop.
function MarqueeRow({
  items,
  speed = 30, // seconds for a full loop
  offset = 0, // delay start
}: {
  items: Sign[];
  speed?: number;
  offset?: number;
}) {
  // Duplicate the array so when first batch scrolls out, the next batch continues
  const track = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }} // since we doubled, -50% equals one full batch width
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
          delay: offset,
        }}
      >
        {/* Each half = 50% width of total content because of duplication */}
        <div className="flex">
          {track.map((s, i) => (
            <Card key={`${s.name}-${i}`} s={s} />
          ))}
        </div>
      </motion.div>
      {/* Soft gradient edges (mask) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}

export default function Horoscope() {
  // split into two rows for a richer feel
  const row1 = ZODIAC.slice(0, 12);
  const row2 = [...ZODIAC.slice(6), ...ZODIAC.slice(0, 6)]; // staggered order

  return (
    <section id="horoscope" className="relative overflow-hidden px-6 py-20 md:py-28">
      {/* subtle cosmic bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
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

        {/* Marquee rows */}
        <div className="mt-10 space-y-6">
          {/* Row A */}
          <MarqueeRow items={row1} speed={30} />
          {/* Row B (slightly faster + delayed for parallax feel) */}
          <MarqueeRow items={row2} speed={24} offset={0.5} />
        </div>

        {/* CTA under marquee */}
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold shadow-lg hover:opacity-95"
          >
            Get your personalized reading
          </a>
        </div>
      </div>
    </section>
  );
}
