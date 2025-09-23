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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const zodiac = [
  { name: "Aries", icon: <FiZap />, msg: "Take bold steps today." },
  { name: "Taurus", icon: <FiAnchor />, msg: "Stay grounded and steady." },
  { name: "Gemini", icon: <FiWind />, msg: "Conversations bring clarity." },
  { name: "Cancer", icon: <FiHeart />, msg: "Nurture emotional bonds." },
  { name: "Leo", icon: <FiSun />, msg: "Your charisma shines bright." },
  { name: "Virgo", icon: <FiFeather />, msg: "Focus on small details." },
  { name: "Libra", icon: <FiCompass />, msg: "Balance is your strength." },
  { name: "Scorpio", icon: <FiMoon />, msg: "Trust your deep intuition." },
  { name: "Sagittarius", icon: <FiTarget />, msg: "Adventure calls you." },
  { name: "Capricorn", icon: <FiGlobe />, msg: "Stay ambitious & practical." },
  { name: "Aquarius", icon: <FiAperture />, msg: "Innovate and inspire." },
  { name: "Pisces", icon: <FiStar />, msg: "Let your dreams guide you." },
];

export default function Horoscope() {
  return (
    <section
      id="horoscope"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Gradient bg */}
      <div className="pointer-events-none absolute inset-0" />

      {/* Blurred orbs */}
      {/* <div className="pointer-events-none absolute -top-20 left-10 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-rose-300/20 blur-3xl" /> */}

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center space-y-4"
        >
          <motion.h2
            variants={itemUp}
            className="text-3xl font-bold text-gray-900 md:text-5xl"
          >
            Today’s{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-rose-400 bg-clip-text text-transparent">
              Horoscope
            </span>
          </motion.h2>
          <motion.p
            variants={itemUp}
            className="max-w-2xl mx-auto text-base text-gray-600 md:text-lg"
          >
            Your daily dose of cosmic guidance, aligned with the stars ✨
          </motion.p>
        </motion.div>

        {/* Zodiac Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {zodiac.map((sign, i) => (
            <motion.div
              key={sign.name}
              variants={itemUp}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="group rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-md backdrop-blur hover:shadow-xl transition text-center"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full  text-indigo-600 text-2xl group-hover:from-indigo-200 group-hover:to-pink-200">
                {sign.icon}
              </div>
              <h3 className="mb-1 text-lg font-semibold text-gray-900">
                {sign.name}
              </h3>
              <p className="text-sm text-gray-600">{sign.msg}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
