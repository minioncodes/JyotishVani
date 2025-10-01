"use client";

import { motion } from "framer-motion";
import AstroGlobe from "./Astroglobe";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Background glow accents (soft golden tones) */}
      <div className="absolute -bottom-40 -right-40 h-[24rem] w-[24rem] sm:h-[30rem] sm:w-[30rem]" />

      <div className="relative z-10 mx-auto grid mt-20 max-w-7xl grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* LEFT: Text Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-3xl p-4 sm:p-8 md:p-12 text-center md:text-left"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight"
          >
            Unlock Your{" "}
            <span className="bg-gradient-to-r from-[#C5A46D] to-[#E6D5B8] bg-clip-text text-transparent">
              Cosmic Destiny
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-sm xs:text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            Personalized astrology readings for love, career, and life path.
            Get clarity, confidence, and cosmic alignment with every session.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          >
            <a
              href="/booking"
              className="rounded-xl bg-gradient-to-r from-[#C5A46D] to-[#E6D5B8] text-black px-5 py-3 text-sm sm:text-base font-semibold shadow-md hover:opacity-90 transition"
            >
              Book a Reading
            </a>
            <a
              href="#services"
              className="rounded-xl border border-[#C5A46D] text-[#C5A46D] px-5 py-3 text-sm sm:text-base font-semibold hover:bg-[#C5A46D]/10 transition"
            >
              Explore Services
            </a>
          </motion.div>

          <div className="mt-6 text-xs sm:text-sm text-gray-600">
            ✦ Trusted by 1000+ clients • Available worldwide
          </div>
        </motion.div>

        {/* RIGHT: Astro Globe */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex items-center justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
        >
          <AstroGlobe />
        </motion.div>
      </div>
    </section>
  );
}
