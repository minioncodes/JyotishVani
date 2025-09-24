"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
     

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-10 lg:grid-cols-2"
        >
          {/* Left: Text */}
          <div className="space-y-6">
            <motion.div
              variants={itemUp}
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm backdrop-blur-md shadow-sm"
            >
              <span className="h-2 w-2 rounded-full" />
              Now booking 1:1 sessions
            </motion.div>

            <motion.h1
              variants={itemUp}
              className="text-4xl font-bold leading-tight md:text-6xl"
            >
              Guidance for your{" "}
              <span className="bg-clip-text text-black text-transparent">
                next chapter
              </span>
            </motion.h1>

            <motion.p
              variants={itemUp}
              className="max-w-xl text-base md:text-lg"
            >
              Clarity, confidence, and calm—with readings tailored to your story.
              Gentle insights, practical steps, and a little stardust. ✨
            </motion.p>

            <motion.div
              variants={itemUp}
              className="flex flex-wrap gap-3 pt-2"
            >
              <a
                href="#book"
                className="group relative inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm font-semibold backdrop-blur-md transition"
              >
                Book a Session
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold shadow-md transition"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Social proof / stats */}
            <motion.div
              variants={itemUp}
              className="flex flex-wrap gap-6 pt-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">2k+</span> readings
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">4.9/5</span> avg. rating
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">7+ yrs</span> experience
              </div>
            </motion.div>
          </div>

          {/* Right: Visual card */}
          <motion.div variants={itemUp} className="relative">
            <div className="mx-auto w-full max-w-lg rounded-3xl border p-3  backdrop-blur-xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                {/* Replace with your image */}
                {/* <Image
                  src="/your-image.jpg"
                  alt="Astrology session"
                  fill
                  className="object-cover"
                  priority
                /> */}
                {/* Floating tag */}
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur"
                >
                  Gentle Guidance
                </motion.div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 16, y: 16, rotate: -4 }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 rounded-2xl border px-4 py-3 text-sm shadow-lg backdrop-blur"
                >
                  Next available:{" "}
                  <span className="font-semibold">Today 7 PM</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
