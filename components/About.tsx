"use client";

import { motion } from "framer-motion";
import { FiStar, FiHeart, FiCompass } from "react-icons/fi";

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

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* Left: Text content */}
          <div className="space-y-6">
            <motion.h2
              variants={itemUp}
              className="text-3xl font-bold text-gray-900 md:text-5xl"
            >
              About{" "}
              <span className="text-indigo-600">
                Me
              </span>
            </motion.h2>

            <motion.p
              variants={itemUp}
              className="max-w-xl text-base text-gray-600 md:text-lg"
            >
              With years of experience in astrology and guiding people through
              life’s crossroads, my work blends ancient wisdom with modern
              clarity. Every session is designed to help you rediscover balance,
              confidence, and direction.
            </motion.p>

            <motion.div
              variants={itemUp}
              className="grid gap-6 pt-4 sm:grid-cols-2"
            >
              {[
                {
                  icon: <FiStar className="text-indigo-500 text-xl" />,
                  title: "Accurate Readings",
                  desc: "Personalized insights aligned with your unique journey.",
                },
                {
                  icon: <FiHeart className="text-rose-500 text-xl" />,
                  title: "Compassionate Approach",
                  desc: "Guidance rooted in empathy and kindness.",
                },
                {
                  icon: <FiCompass className="text-teal-500 text-xl" />,
                  title: "Life Navigation",
                  desc: "Clarity for relationships, career, and inner peace.",
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemUp}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                  {f.icon}
                  <div>
                    <h4 className="font-semibold text-gray-900">{f.title}</h4>
                    <p className="text-sm text-gray-600">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Image placeholder */}
          <motion.div variants={itemUp}>
            <div className="mx-auto max-w-md rounded-2xl border border-gray-200 p-3 shadow-md">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                {/* Replace with <Image ... /> */}
                Image Placeholder
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
