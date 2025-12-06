"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {t("sectionTitle")}
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-800 leading-relaxed">
            {t("orgBody")}
          </p>
          <ul className="mt-6 space-y-2 text-gray-900">
            <li>{t("bullet1")}</li>
            <li>{t("bullet2")}</li>
            <li>{t("bullet3")}</li>
            <li>{t("bullet4")}</li>
            <li>{t("bullet5")}</li>
            <li>{t("bullet6")}</li>
          </ul>
        </motion.div>

        {/* RIGHT: Acharya Ji Section */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/Acharya ji (2).jpg"
              alt="Astrologer Acharya Ji"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-black">
            {t("acharyaHeading")}
          </h3>
          <p className="text-gray-800 leading-relaxed">
            <span className="font-semibold text-[#B22222]">
              {t("acharyaLead")}&nbsp;
            </span>
            {t("acharyaBodyRest")}
          </p>
          <Link
            href="/about"
            className="inline-block text-sm font-medium text-[#B22222] hover:text-black transition"
          >
            {t("moreLink")}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
