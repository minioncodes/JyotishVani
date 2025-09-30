"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <section id="contact" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-5 gap-8">
        {/* Info Card */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 self-center rounded-3xl bg-white/90 shadow-xl p-6 md:p-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Contact <span className="text-[#C5A46D]">Us</span>
          </h2>

          <div className="mt-6 space-y-3 text-gray-700 text-sm">
            <div>📧 help@jyotiswaani.com</div>
            <div>📞 +91 94150 87999</div>
            <div>🕒 Mon–Sat • 10am–7pm IST</div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#FFFDF8] border border-[#C5A46D]/40 p-4 text-sm text-gray-700 shadow">
            <p className="font-medium text-black">For the most accurate reading:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Provide your exact birth date, time, and city.</li>
              <li>Share your primary concern clearly (career, love, finance, etc.).</li>
              <li>Be open—astrology works best when approached with trust.</li>
            </ul>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="md:col-span-3 rounded-3xl bg-white/95 shadow-xl border border-[#C5A46D]/30 p-6 md:p-10 flex flex-col justify-center"
        >
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Name
              <input
                name="name"
                className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                placeholder="Your full name"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              WhatsApp / Phone
              <input
                type="tel"
                name="phone"
                className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                placeholder="+91 9XXXXXXXXX"
                required
              />
            </label>
          </div>

          {/* Birth Details */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              DOB
              <input
                type="date"
                name="dob"
                className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Time
              <input
                type="time"
                name="tob"
                step="60"
                className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                required
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Birth Place
              <input
                name="pob"
                className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                placeholder="City, Country"
                required
              />
            </label>
          </div>

          {/* Service & Concern */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Service
              <select
                name="service"
                className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                required
              >
                <option>Birth Chart Reading</option>
                <option>Love & Relationships</option>
                <option>Career & Finance</option>
                <option>Yearly Forecast</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700">
              Concern
              <select
                name="concern"
                className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                required
              >
                <option>Career growth</option>
                <option>Marriage timing</option>
                <option>Business outlook</option>
                <option>Foreign travel</option>
              </select>
            </label>
          </div>

          {/* Question */}
          <label className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
            Your specific question
            <textarea
              name="question"
              rows={3}
              className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
              placeholder="Tell me what clarity you want…"
            />
          </label>

          {/* Consent */}
          <label className="mt-4 flex items-start gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              required
              className="mt-1 accent-[#C5A46D]"
            />
            <span>
              I consent to sharing my details for astrological analysis and agree to the{" "}
              <a href="#" className="underline hover:text-[#C5A46D]">terms</a> &{" "}
              <a href="#" className="underline hover:text-[#C5A46D]">privacy policy</a>.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-[#C5A46D] text-black px-6 py-3 font-semibold shadow-md hover:bg-black hover:text-white transition disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
