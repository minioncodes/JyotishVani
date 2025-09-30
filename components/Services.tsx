"use client";

import { motion } from "framer-motion";
import { FiStar, FiHeart, FiBriefcase, FiClock } from "react-icons/fi";

const services = [
  {
    icon: <FiHeart />,
    title: "Love & Relationships",
    desc: "Clarity on compatibility, timing, and healing patterns. Synastry + transit-based guidance.",
    // price: "₹1,999 / 30 min",
  },
  {
    icon: <FiBriefcase />,
    title: "Career & Finance",
    desc: "Find the right moves and timings for growth, switches, or launches. Practical and time-bound.",
    // price: "₹2,499 / 45 min",
  },
  {
    icon: <FiClock />,
    title: "Shubh Muhurat",
    desc: "Pick auspicious dates for marriage, moves, openings, investments—aligned with your chart.",
    // price: "₹1,499 / slot",
  },
  {
    icon: <FiStar />,
    title: "Birth Chart Reading",
    desc: "Complete Kundli reading with remedies, strengths, challenges, and yearly transit roadmap.",
    // price: "₹3,999 / 60 min",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex items-end justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Our <span className="text-[#C5A46D]">Services</span>
          </h2>
          <span className="text-sm text-gray-700">
            Transparent pricing • Secure online sessions
          </span>
        </div>

        {/* Service Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-white/80 p-6 shadow-lg hover:shadow-xl transition"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl text-[#C5A46D]">{s.icon}</div>

              </div>
              <h3 className="mt-4 text-lg font-semibold text-black">
                {s.title}
              </h3>
              <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                {s.desc}
              </p>
              <a
                href="/booking"
                className="mt-5 inline-block rounded-xl bg-[#C5A46D] text-black font-medium px-4 py-2 text-sm hover:bg-black hover:text-white transition"
              >
                Book this
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
