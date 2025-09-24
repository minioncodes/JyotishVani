"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiPhone, FiMapPin, FiCheck } from "react-icons/fi";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send. Please try again.");
      setOk(true);
      form.reset();
    } catch (err: any) {
      setOk(false);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      {/* Soft background */}
      <div className="pointer-events-none absolute inset-0" />
      {/* <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" /> */}

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-10 lg:grid-cols-2"
        >
          {/* Left: Title + Contact Info */}
          <div className="space-y-6">
            <motion.h2 variants={itemUp} className="text-3xl md:text-5xl font-bold text-gray-900">
              Tell me the{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-rose-400 bg-clip-text text-transparent">
                problem you want solved
              </span>
            </motion.h2>

            <motion.p variants={itemUp} className="text-gray-600 md:text-lg">
              Share your goal, context, and any deadlines. I’ll reply with a tailored plan or a
              session recommendation.
            </motion.p>

            <motion.ul variants={itemUp} className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-gray-200 backdrop-blur">
                  <FiMail />
                </span>
                hello@yourdomain.com
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-gray-200 backdrop-blur">
                  <FiPhone />
                </span>
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-gray-200 backdrop-blur">
                  <FiMapPin />
                </span>
                Online / Remote Sessions (IST)
              </li>
            </motion.ul>

            {/* Mini social proof */}
            <motion.div
              variants={itemUp}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3 py-1 text-sm text-indigo-700 backdrop-blur"
            >
              <FiCheck /> Avg. reply time: under 12 hours
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div variants={itemUp}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-gray-200 bg-white/70 p-6 md:p-7 shadow-xl backdrop-blur"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    required
                    name="name"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email*</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone (optional)</label>
                  <input
                    name="phone"
                    placeholder="+91 ..."
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Topic</label>
                  <select
                    name="topic"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    defaultValue="General"
                  >
                    <option>General</option>
                    <option>Birth Chart</option>
                    <option>Love & Relationships</option>
                    <option>Career & Business</option>
                    <option>Health & Wellbeing</option>
                  </select>
                </div>
              </div>

              {/* Problem-first query */}
              <div className="mt-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  What problem are you trying to solve?*
                </label>
                <textarea
                  required
                  name="problem"
                  rows={5}
                  placeholder="Describe the situation, context, and what’s blocking you…"
                  className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Tip: Add relevant dates, people involved, and any prior attempts.
                </p>
              </div>

              {/* Desired outcome & deadline */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Desired outcome</label>
                  <input
                    name="outcome"
                    placeholder="What does success look like?"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Deadline (if any)</label>
                  <input
                    name="deadline"
                    placeholder="e.g., 30 Sep 2025"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
              </div>

              {/* Preference */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Preferred session mode</label>
                  <select
                    name="mode"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option>Video</option>
                    <option>Audio</option>
                    <option>Chat</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Urgency</label>
                  <select
                    name="urgency"
                    className="w-full rounded-xl border border-gray-200 bg-white/80 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  >
                    <option>Normal</option>
                    <option>Soon</option>
                    <option>ASAP</option>
                  </select>
                </div>
              </div>

              {/* Consent */}
              <div className="mt-4 flex items-start gap-3">
                <input type="checkbox" name="consent" required className="mt-1" />
                <p className="text-sm text-gray-600">
                  I consent to be contacted about my query and agree to the{" "}
                  <a href="/privacy" className="underline decoration-indigo-300 hover:decoration-indigo-500">
                    Privacy Policy
                  </a>.
                </p>
              </div>

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-400 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-60"
                >
                  <FiSend /> {loading ? "Sending..." : "Send your query"}
                </button>

                {/* Status */}
                {ok && (
                  <span className="ml-3 inline-flex items-center gap-2 text-sm text-emerald-600">
                    <FiCheck /> Sent! I’ll get back to you shortly.
                  </span>
                )}
                {ok === false && error && (
                  <span className="ml-3 text-sm text-rose-600">{error}</span>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
