"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white/90 p-10 shadow-lg"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-black">
            Ready to <span className="text-[#C5A46D]">Find Clarity?</span>
          </h3>
          <p className="mt-3 text-gray-700">
            Book a session now and receive a pre-reading questionnaire to maximize insights.
          </p>
          <a
            href="/bookings"
            className="mt-6 inline-block rounded-xl bg-[#C5A46D] text-black px-6 py-3 font-semibold shadow-md hover:bg-black hover:text-white transition"
          >
            Book Your Session
          </a>
        </motion.div>
      </div>
    </section>
  );
}
