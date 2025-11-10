"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    dateofbirth: "",
    time: "",
    service: "",
    concern: "",
    description: "",
    email: "",
    birthplace: "",
    place: ""
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/lead/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Something went cosmic-sideways.");
        return;
      }

      setMsg("Lead created successfully!");
      setForm({
        name: "",
        phoneNumber: "",
        dateofbirth: "",
        time: "",
        service: "",
        concern: "",
        description: "",
        email: "",
        birthplace: "",
        place: ""
      });
    } catch (err: any) {
      setMsg("Network tantrum: " + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setLoading(false), 800);


    }
  }
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const LoaderOverlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#C5A46D] border-t-transparent rounded-full mb-4"
      />
      <p className="text-gray-700 font-medium text-sm md:text-base">
        Please wait… we’re aligning your stars
      </p>
    </motion.div>
  );

  console.log("birth place =  ", form);

  return (
    <>
      {loading && <LoaderOverlay />}

      <section id="contact" className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">
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
              <div>📧 help@jyotishwaani.com</div>
              <div>📞 +91 94150 87999</div>
              <div>📞 +91 94524 64332</div>
              <div>🕒 Mon–Sat • 10am–6pm IST</div>
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
                  onChange={handleChange}
                  value={form.name}
                  className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                  placeholder="Your full name"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Email
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                  placeholder="you@example.com"
                  required
                />
              </label>


              <label className="flex flex-col gap-2 text-sm text-gray-700">
                WhatsApp / Phone
                <input
                  type="tel"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={form.phoneNumber}
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
                  name="dateofbirth"
                  onChange={handleChange}
                  value={form.dateofbirth}
                  className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Time
                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={form.time}
                  step="60"
                  className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                  required
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Birth Place
                <input
                  name="birthplace"
                  autoComplete="off"
                  onChange={handleChange}
                  value={form.birthplace}
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
                  value={form.service}
                  onChange={handleChange}
                  className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                  required
                >
                  <option value="">Select Service</option>
                  <option value="Kundli / Birth Chart Analysis">Kundli / Birth Chart Analysis</option>
                  <option value="Career & Job Guidance">Career & Job Guidance</option>
                  <option value="Marriage / Relationship Compatibility">Marriage / Relationship Compatibility</option>
                  <option value="Health & Wellbeing Astrology">Health & Wellbeing Astrology</option>
                  <option value="Remedy & Ritual Guidance">Remedy & Ritual Guidance</option>
                  <option value="Spiritual Path Consultation">Spiritual Path Consultation</option>
                  <option value=""></option>
                </select>

              </label>
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                Concern
                <select
                  name="concern"
                  value={form.concern}
                  onChange={handleChange}
                  className="rounded-xl border border-[#C5A46D]/30 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#C5A46D]/60"
                  required
                >
                  <option value="">Select Concern</option>
                  <option value="Facing delays or obstacles in life">Facing delays or obstacles in life</option>
                  <option value="Relationship conflicts or separation">Relationship conflicts or separation</option>
                  <option value="Financial instability or losses">Financial instability or losses</option>
                  <option value="Stress, anxiety, or emotional imbalance">Stress, anxiety, or emotional imbalance</option>
                  <option value="Childbirth / family planning concerns">Childbirth / family planning concerns</option>
                </select>

              </label>
            </div>

            {/* Question */}
            <label className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
              Your specific question
              <textarea
                name="description"
                onChange={handleChange}
                value={form.description}
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
      </section></>

  );
}
