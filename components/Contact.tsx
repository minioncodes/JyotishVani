"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: hook this to your API/Email service (e.g., /api/contact or Resend)
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <section id="contact" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Card */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-black/50 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Contact</h2>
          <p className="mt-2 text-gray-300">
            Fill the form and I’ll get back within 24 hours. Sessions are
            available via Google Meet or in-person (Delhi).
          </p>

          <div className="mt-6 space-y-3 text-gray-300">
            <div>📧 hello@jyotishvani.example</div>
            <div>📞 +91 90000 00000</div>
            <div>🕒 Mon–Sat • 10am–7pm IST</div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
            <p className="font-medium">Tip for accurate reading:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Enter exact birth date and time (from birth certificate if possible).</li>
              <li>Specify birth city (and state/country) for precise coordinates.</li>
              <li>Mention your primary concern in the “Concern/Problem” field.</li>
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
          className="rounded-3xl border border-white/10 bg-black/50 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
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
            {/* <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Email</span>
              <input
                type="email"
                name="email"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="you@example.com"
                required
              />
            </label> */}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Preferred Mode</span>
              <select
                name="mode"
                className="rounded-xl text-black border border-white/10 bg-white/5 px-4 py-3 outline-none"
                defaultValue="Online (Google Meet)"
              >
                <option>Online (Google Meet)</option>
                <option>Phone Call</option>
                <option>In-person (Delhi)</option>
              </select>
            </label>
          </div>

          {/* Birth Details */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Date of Birth (DOB)</span>
              <input
                type="date"
                name="dob"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Time of Birth</span>
              <input
                type="time"
                name="tob"
                step="60"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              />
            </label>
            {/* <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">AM/PM (optional)</span>
              <select
                name="meridiem"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                defaultValue=""
              >
                <option value="">24-hour time</option>
                <option>AM</option>
                <option>PM</option>
              </select>
            </label> */}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Place of Birth</span>
              <input
                name="pob"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="City, State, Country"
                required
              />
            </label>
            {/* <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Current City</span>
              <input
                name="currentCity"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                placeholder="Where you live now"
              />
            </label> */}
          </div>

          {/* Optional Demographics */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Gender (optional)</span>
              <select
                name="gender"
                className="text-black rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
                defaultValue=""
              >
                <option value="">Prefer not to say</option>
                <option>Female</option>
                <option>Male</option>
                <option>Non-binary</option>
                <option>Other</option>
              </select>
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Marital Status (optional)</span>
              <select
                name="marital"
                className="rounded-xl text-black border border-white/10 bg-white/5 px-4 py-3 outline-none"
                defaultValue=""
              >
                <option value="">—</option>
                <option>Single</option>
                <option>In a relationship</option>
                <option>Engaged</option>
                <option>Married</option>
                <option>Divorced</option>
              </select>
            </label>
          </div>

          {/* Service & Concern */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Service Type</span>
              <select
                name="service"
                className="rounded-xl text-black border border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              >
                <option>Birth Chart Reading</option>
                <option>Love & Relationships</option>
                <option>Career & Finance</option>
                <option>Shubh Muhurat</option>
                <option>Yearly Transit Forecast</option>
                <option>Remedy Consultation</option>
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-300">Concern / Problem</span>
              <select
                name="concern"
                className="rounded-xl border text-black border-white/10 bg-white/5 px-4 py-3 outline-none"
                required
              >
                {/* 12+ common astrology concerns */}
                <option>Career growth / job change</option>
                <option>Love life / marriage timing</option>
                <option>Compatibility / synastry</option>
                <option>Business / startup launch timing</option>
                <option>Finance / investments</option>
                <option>Health & wellness outlook</option>
                <option>Education / higher studies</option>
                <option>Property / vehicle purchase muhurat</option>
                <option>Foreign travel / PR / immigration</option>
                <option>Legal disputes outlook</option>
                <option>Childbirth / family planning</option>
                <option>Spiritual growth / remedies</option>
                <option>Yearly roadmap (12-month)</option>
              </select>
            </label>
          </div>

          {/* Question */}
          <label className="mt-4 flex flex-col gap-2">
            <span className="text-sm text-gray-300">Your specific question / focus</span>
            <textarea
              name="question"
              rows={4}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
              placeholder="Tell me what’s happening and what clarity you want…"
            />
          </label>

          {/* Consent */}
          <label className="mt-4 flex items-start gap-3 text-sm text-gray-300">
            <input type="checkbox" required className="mt-1 accent-fuchsia-500" />
            <span>
              I consent to sharing my birth details for astrological analysis and agree to the{" "}
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

          <p className="mt-3 text-xs text-gray-400">
            By submitting, you agree to our terms & privacy policy.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
