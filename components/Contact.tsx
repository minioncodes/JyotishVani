"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Contact() {
  const locale = useLocale();
  const t = useTranslations("contact1");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

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
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setStatus("");

    try {
      const res = await fetch("/api/lead/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setMsg("Your details have been submitted successfully!");

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
      });
    } catch (err: any) {
      setStatus("error");
      setMsg("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* Loader Overlay */
  const Loader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-12 h-12 border-4 border-[#B22222] border-t-transparent rounded-full mb-4"
      />
      <p className="text-gray-700 text-sm">{t("loadingText")}</p>
    </motion.div>
  );

  return (
    <>
      {loading && <Loader />}

      <section
        id="contact"
        className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-5 gap-8">

          {/* Left Info Card */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 self-center rounded-3xl bg-white/90 shadow-xl p-6 md:p-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              {t("contact")} <span className="text-[#B22222]">{t("us")}</span>
            </h2>

            <div className="mt-6 space-y-3 text-gray-700 text-sm">
              <div>📧 help@jyotishwaani.com</div>
              <div>📞 +91 94150 87999</div>
              <div>📞 +91 94524 64332</div>
              <div>🕒 Mon–Sat • 10am–6pm IST</div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#FFFDF8] border border-[#B22222]/40 p-4 text-sm text-gray-700 shadow">
              <p className="font-medium text-black">{t("bestResults")}</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>{t("tip1")}</li>
                <li>{t("tip2")}</li>
                <li>{t("tip3")}</li>
              </ul>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 rounded-3xl bg-white/95 shadow-xl border border-[#B22222]/30 p-6 md:p-10"
          >
            {/* Success / Error Message */}
            {msg && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm ${
                  status === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {msg}
              </div>
            )}

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("name")}
                <input
                  name="name"
                  onChange={handleChange}
                  value={form.name}
                  required
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("email")}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                  required
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("phone")}
                <input
                  type="tel"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={form.phoneNumber}
                  required
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                  placeholder="+91 XXXXX XXXXX"
                />
              </label>
            </div>

            {/* BIRTH DETAILS */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("dob")}
                <input
                  type="date"
                  name="dateofbirth"
                  onChange={handleChange}
                  value={form.dateofbirth}
                  required
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("time")}
                <input
                  type="time"
                  name="time"
                  onChange={handleChange}
                  value={form.time}
                  required
                  step="60"
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("birthplace")}
                <input
                  name="birthplace"
                  value={form.birthplace}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                  placeholder={t("birthPlaceholder")}
                />
              </label>
            </div>

            {/* SERVICE & CONCERN */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("service")}
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                >
                  <option value="">{t("selectService")}</option>
                  <option value="Kundli / Birth Chart Analysis">{t("s1")}</option>
                  <option value="Career & Job Guidance">{t("s2")}</option>
                  <option value="Marriage / Relationship Compatibility">
                    {t("s3")}
                  </option>
                  <option value="Health & Wellbeing Astrology">{t("s4")}</option>
                  <option value="Remedy & Ritual Guidance">{t("s5")}</option>
                  <option value="Spiritual Path Consultation">{t("s6")}</option>
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-gray-700">
                {t("concern")}
                <select
                  name="concern"
                  value={form.concern}
                  onChange={handleChange}
                  required
                  className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                >
                  <option value="">{t("selectConcern")}</option>
                  <option value="Delays or life obstacles">{t("c1")}</option>
                  <option value="Relationship conflicts">{t("c2")}</option>
                  <option value="Financial instability">{t("c3")}</option>
                  <option value="Emotional imbalance">{t("c4")}</option>
                  <option value="Childbirth / family planning">{t("c5")}</option>
                </select>
              </label>
            </div>

            {/* QUESTION FIELD */}
            <label className="mt-4 flex flex-col gap-2 text-sm text-gray-700">
              {t("yourQuestion")}
              <textarea
                name="description"
                onChange={handleChange}
                value={form.description}
                rows={3}
                className="rounded-xl border border-[#B22222]/30 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B22222]"
                placeholder={t("questionPlaceholder")}
              />
            </label>

            {/* CONSENT */}
            <label className="mt-4 flex items-start gap-3 text-sm text-gray-600">
              <input type="checkbox" required className="mt-1 accent-[#B22222]" />
              <span>
                {t("consent")}{" "}
                <Link
                  href={`/${locale}/privacy`}
                  className="underline hover:text-[#B22222]"
                >
                  {t("privacy")}
                </Link>{" "}
                &{" "}
                <Link
                  href={`/${locale}/disclaimer`}
                  className="underline hover:text-[#B22222]"
                >
                  {t("terms")}
                </Link>
                .
              </span>
            </label>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#B22222] text-white px-6 py-3 font-semibold shadow-md hover:bg-black transition disabled:opacity-50"
              disabled={loading}
            >
              {t("submit")}
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
