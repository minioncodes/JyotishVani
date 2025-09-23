"use client";

import { motion } from "framer-motion";
import { FiSun, FiMoon, FiFeather, FiGlobe } from "react-icons/fi";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-20 md:py-28">
   
      <div className="pointer-events-none absolute inset-0" />

      {/* Decorative blur blobs */}
      <div className="pointer-events-none absolute -top-20 left-0 h-64 w-64 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
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
            My{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-rose-400 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>

          <motion.p
            variants={itemUp}
            className="max-w-2xl mx-auto text-base text-gray-600 md:text-lg"
          >
            Offering thoughtful, personalized readings designed to bring you
            clarity and confidence at every stage of life.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: <FiSun className="text-indigo-500 text-3xl" />,
              title: "Daily Guidance",
              desc: "Short and insightful readings to align your day with purpose.",
            },
            {
              icon: <FiMoon className="text-rose-500 text-3xl" />,
              title: "Love & Relationships",
              desc: "Heart-centered clarity for your relationships, past or future.",
            },
            {
              icon: <FiFeather className="text-teal-500 text-3xl" />,
              title: "Career & Growth",
              desc: "Practical guidance to navigate work, business, and life goals.",
            },
            {
              icon: <FiGlobe className="text-yellow-500 text-3xl" />,
              title: "Birth Chart Reading",
              desc: "Deep dive into your cosmic blueprint for self-discovery.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              variants={itemUp}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              className="group rounded-3xl border border-gray-200 bg-white/70 p-6 text-center shadow-lg backdrop-blur-md hover:shadow-xl transition"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-rose-100 group-hover:from-indigo-200 group-hover:to-rose-200">
                {service.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
