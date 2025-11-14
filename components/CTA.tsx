"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CTA() {
  const t = useTranslations("cta");

  return (
    <section className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white/90 p-10 shadow-lg"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-black">
            {t("headingMain")}{" "}
            <span className="text-[#B22222]">{t("headingHighlight")}</span>
          </h3>
          <p className="mt-3 text-gray-700">
            {t("body")}
          </p>
          <a
            href="/bookings"
            className="mt-6 inline-block rounded-xl bg-[#B22222] text-white px-6 py-3 text-sm md:text-base font-semibold shadow-md hover:bg-black hover:text-white transition"
          >
            {t("button")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
