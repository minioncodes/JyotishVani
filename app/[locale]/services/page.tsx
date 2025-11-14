"use client";

import { motion } from "framer-motion";
import {
  FiStar,
  FiHeart,
  FiBriefcase,
  FiClock,
  FiTrendingUp,
  FiRadio,
  FiDollarSign,
  FiUsers,
  FiFeather
} from "react-icons/fi";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function AstroCategories() {
  const t = useTranslations("astroCategories");
  const locale = useLocale();

  const items = [
    { icon: <FiStar />, key: "kundliAnalysis" },
    { icon: <FiHeart />, key: "kundliMatching" },
    { icon: <FiBriefcase />, key: "education" },
    { icon: <FiClock />, key: "marriageLife" },
    { icon: <FiHeart />, key: "loveRelationship" },
    { icon: <FiTrendingUp />, key: "careerBusiness" },
    { icon: <FiRadio />, key: "ePooja" },
    { icon: <FiDollarSign />, key: "healthWealth" },
    { icon: <FiUsers />, key: "child" },
    { icon: <FiFeather />, key: "pujaAnushthan" }
  ];

  return (
    <section className="px-6 mt-10 py-14 md:py-20 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.05 }
          }
        }}
        className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        {items.map((i) => (
          <motion.div
            key={i.key}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -6 }}
            className="relative bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center text-center group cursor-pointer border border-[#B2222220] aspect-square p-6 overflow-hidden"
          >
            <div className="text-4xl text-[#B22222] mb-3">{i.icon}</div>

            <h3 className="font-semibold text-black text-lg md:text-xl">
              {t(`${i.key}.name`)}
            </h3>

            <p className="text-[11px] text-black/60 mt-1 font-medium">
              {t(`${i.key}.caption`)}
            </p>

            {/* Hover Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-[#B2222215] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-8 text-center">
              <p className="text-black/90 text-base leading-relaxed font-medium mb-4">
                {t(`${i.key}.about`)}
              </p>

              <Link
                href={`/${locale}/bookings`}
                className="rounded-xl bg-[#B22222] text-white px-4 py-2 text-sm font-semibold shadow hover:bg-black hover:text-white transition"
              >
                {t("bookNow")}
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
