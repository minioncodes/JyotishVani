'use client';

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import AstroGlobe from "./Astroglobe";

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: (i: number = 1) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function Hero() {
  const t = useTranslations('hero'); // 👈 fetch translations for this section

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute -bottom-40 -right-40 h-[24rem] w-[24rem] sm:h-[30rem] sm:w-[30rem]" />

      <div className="relative z-10 mx-auto grid mt-25 sm:mt-12 lg:mt-20 max-w-7xl grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* LEFT */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          custom={0}
          className="rounded-3xl p-4 sm:p-8 md:p-12 text-center md:text-left"
        >
          <motion.h1
            variants={fadeInRight}
            custom={1}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight"
          >
            {t('heading')}{" "}
            <span className="bg-gradient-to-r from-[#B22222] to-[#E68F8F] bg-clip-text text-transparent">
              {t('highlight')}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInRight}
            custom={2}
            className="mt-4 text-sm xs:text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            {t('description')}
          </motion.p>

          <motion.div
            variants={fadeInRight}
            custom={3}
            className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          >
            <Link
              href="/bookings"
              className="rounded-xl bg-gradient-to-r from-[#B22222] to-[#E68F8F] text-white px-5 py-3 text-sm sm:text-base font-semibold shadow-md hover:opacity-90 transition"
            >
              {t('book')}
            </Link>
            <a
              href="#services"
              className="rounded-xl border border-[#B22222] text-[#B22222] px-5 py-3 text-sm sm:text-base font-semibold hover:bg-[#B22222]/10 transition"
            >
              {t('explore')}
            </a>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            custom={4}
            className="mt-6 text-xs sm:text-sm text-gray-600"
          >
            {t('trusted')}
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="
            relative flex items-center justify-center 
            max-w-xs sm:max-w-sm md:max-w-full lg:max-w-lg 
            mx-auto
          "
        >
          <AstroGlobe />
        </motion.div>
      </div>
    </section>
  );
}
