"use client";

import { motion } from "framer-motion";
import { FiStar, FiHeart, FiBriefcase, FiClock } from "react-icons/fi";

const services = [
  {
    icon: <FiStar />,
    title: "Kundli Analysis",
    desc: "Detailed reading of birth chart with graha strength, yogas, doshas, dasha influence and predictive roadmap.",
  },
  {
    icon: <FiHeart />,
    title: "Kundli Matching",
    desc: "Comprehensive marriage gun milan + modern compatibility + dasha based cross timing alignment.",
  },
  {
    icon: <FiBriefcase />,
    title: "Education",
    desc: "Right direction, field suitability, foreign chances, exam timing judgement based on dasha + transit.",
  },
  {
    icon: <FiClock />,
    title: "Marriage / Marital Life",
    desc: "Marriage timing, spouse nature, post marriage patterns, challenges + remedies for stability & harmony.",
  },
];


export default function Services() {
  return (
    <section id="services" className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-2 md:gap-0">
  <h2 className="text-3xl md:text-4xl font-bold text-black">
    Our <span className="text-[#B22222]">Services</span>
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
              className="group rounded-2xl bg-white/80 p-6 shadow-lg hover:shadow-xl transition flex flex-col"

            >
              <div className="flex items-center justify-between">
                <div className="text-2xl text-[#B22222]">{s.icon}</div>

              </div>
              <h3 className="mt-4 text-lg font-semibold text-black">
                {s.title}
              </h3>
              <p className="mt-2 mb-4 text-gray-700 text-sm leading-relaxed">
                {s.desc}
              </p>
              <a
                href="/bookings"
                className="mt-auto inline-block text-center rounded-xl bg-[#B22222] text-white font-medium px-4 py-2 text-sm hover:bg-black hover:text-white transition"

              >
                Book this
              </a>
            </motion.div>
          ))}
        </motion.div>
      {/* View All Services Button */}
<div className="flex justify-center mt-10">
  <a
    href="/services"
    className="rounded-xl bg-[#B22222] text-white font-semibold px-6 py-3 text-sm md:text-base hover:bg-black hover:text-white transition"
  >
    View All Services
  </a>
</div>
      </div>

    </section>
  );
}
