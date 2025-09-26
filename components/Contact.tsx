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
        {/* Info Card (Left - more descriptive, centered) */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2 self-center rounded-3xl border border-white/10 bg-black/50 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Contact</h2>
          {/* <p className="mt-3 text-gray-300 leading-relaxed">
            Astrology is not about predicting fate—it’s about <span className="text-fuchsia-400 font-medium">guiding you with cosmic wisdom</span>.  
            Every planet, every star tells a story, and your birth chart is the map that reveals it.  
            Whether it’s love, career, or clarity in life’s crossroads, astrology brings direction and peace.
          </p> */}

          {/* <p className="mt-4 text-gray-300 leading-relaxed">
            Fill the form and you’ll receive a personalized consultation within 24 hours.  
            Sessions are available <span className="text-indigo-400">online via Google Meet</span>, on call, or <span className="text-indigo-400">in-person (Delhi)</span>.
          </p> */}

          <div className="mt-6 space-y-3 text-gray-300 text-sm">
            <div>📧 hello@jyotishvani.example</div>
            <div>📞 +91 90000 00000</div>
            <div>🕒 Mon–Sat • 10am–7pm IST</div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
            <p className="font-medium">For the most accurate reading:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Provide your exact birth date, time, and city.</li>
              <li>Share your primary concern clearly (career, love, finance, etc.).</li>
              <li>Be open—astrology works best when approached with trust.</li>
            </ul>
          </div>
        </motion.div>

        {/* Form (Right - larger) */}
        <motion.form
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="md:col-span-3 rounded-3xl border border-white/10 bg-black/50 p-6 md:p-10 shadow-2xl backdrop-blur-xl flex flex-col justify-center"
        >
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Name</span>
              <input
                name="name"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="Your full name"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">WhatsApp / Phone</span>
              <input
                type="tel"
                name="phone"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="+91 9XXXXXXXXX"
                required
              />
            </label>
          </div>

          {/* Birth Details */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">DOB</span>
              <input
                type="date"
                name="dob"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Time</span>
              <input
                type="time"
                name="tob"
                step="60"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Birth Place</span>
              <input
                name="pob"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="City, Country"
                required
              />
            </label>
          </div>

          {/* Service & Concern */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Service</span>
              <select
                name="service"
                className="rounded-xl text-black border border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              >
                <option>Birth Chart Reading</option>
                <option>Love & Relationships</option>
                <option>Career & Finance</option>
                <option>Yearly Forecast</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Concern</span>
              <select
                name="concern"
                className="rounded-xl text-black border border-white/10 bg-white/5 px-4 py-3 outline-none"
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
          <label className="mt-4 flex flex-col gap-2">
            <span className="text-sm text-gray-300">Your specific question</span>
            <textarea
              name="question"
              rows={3}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Tell me what clarity you want…"
            />
          </label>

          {/* Consent */}
          <label className="mt-4 flex items-start gap-3 text-sm text-gray-300">
            <input type="checkbox" required className="mt-1 accent-fuchsia-500" />
            <span>
              I consent to sharing my details for astrological analysis and agree to the{" "}
              <a href="#" className="underline hover:text-white/90">terms</a> &{" "}
              <a href="#" className="underline hover:text-white/90">privacy policy</a>.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold shadow-lg disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
