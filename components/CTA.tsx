"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
  
      <div className="pointer-events-none absolute inset-0 " />
      <div className="pointer-events-none absolute -top-20 left-0 h-72 w-72 rounded-full  blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-gray-200 bg-white/70 px-6 py-14 shadow-xl backdrop-blur"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Ready to{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-rose-400 bg-clip-text text-transparent">
              find clarity?
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600">
            Book a personalized astrology session today and take your first step
            towards balance, direction, and peace of mind.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-400 px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Book a Session <FiArrowRight />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white/70 px-6 py-3 font-semibold text-indigo-700 backdrop-blur transition hover:bg-white"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
