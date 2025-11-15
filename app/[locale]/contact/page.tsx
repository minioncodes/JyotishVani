"use client";

import { motion } from "framer-motion";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import StarsBg from "@/components/StarBg";
import Link from "next/link";
import { useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiHelpCircle
} from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#FAF8F3] text-black overflow-x-hidden">
      <StarsBg />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-[#B22222]/15 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-[#B22222]/15 blur-3xl" />
      </div>

      <HeaderHero />
      <TrustStrip />
      <Contact />

      <section className="relative px-6 py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-3 gap-6"></div>
      </section>

      <FAQSection />
      <CTA />
    </main>
  );
}

/* ---------- Header hero ---------- */
function HeaderHero() {
  const t = useTranslations("contact.header");
  const locale = useLocale();

  return (
    <section className="relative px-6 pt-28">
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl"
      >
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-3">
          <Link href={`/${locale}`} className="hover:text-[#B22222]">
            {t("home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{t("contact")}</span>
        </nav>

        <div className="rounded-3xl bg-white/90 border border-[#B22222]/30 p-6 md:p-10 shadow-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-black">
            {t("title1")}{" "}
            <span className="text-[#B22222]">{t("title2")}</span>
          </h1>

          <p className="mt-3 text-gray-700 max-w-2xl">
            {t("description")}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="rounded-xl bg-[#FFFDF8] border border-[#B22222]/30 px-3 py-1 text-gray-700">
              {t("tag1")}
            </span>

            <span className="rounded-xl bg-[#FFFDF8] border border-[#B22222]/30 px-3 py-1 text-gray-700">
              {t("tag2")}
            </span>

            <span className="rounded-xl bg-[#FFFDF8] border border-[#B22222]/30 px-3 py-1 text-gray-700">
              {t("tag3")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Trust strip ---------- */
function TrustStrip() {
  const t = useTranslations("contact.trust");

  const items = [
    { icon: <FiCheckCircle />, label: t("sessions"), sub: t("since") },
    { icon: <FiClock />, label: t("reply"), sub: t("timing") },
    { icon: "★★★★★", label: t("rating"), sub: t("verified") }
  ];

  return (
    <section className="relative px-6 py-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-white/90 border border-[#B22222]/30 p-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="text-lg text-[#B22222]">{it.icon}</div>
              <div>
                <div className="font-semibold text-black">{it.label}</div>
                <div className="text-xs text-gray-600">{it.sub}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQSection() {
  const t = useTranslations("contact.faq");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") }
  ];

  return (
    <section className="relative px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            {t("title1")}{" "}
            <span className="text-[#B22222]">{t("title2")}</span>
          </h2>
          <p className="mt-2 text-sm text-gray-700">{t("subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqs.map((f, i) => (
            <FAQItem key={i} question={f.q} answer={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-white/90 border border-[#B22222]/30 p-5 shadow-md"
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between text-left text-black"
      >
        <span className="font-medium">{question}</span>
        <FiHelpCircle
          className={`transition-transform ${
            open ? "rotate-45 text-[#B22222]" : ""
          }`}
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="mt-3 text-sm text-gray-700">{answer}</p>
      </motion.div>
    </motion.div>
  );
}
