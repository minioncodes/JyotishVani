"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiStar, FiHeart, FiBriefcase, FiClock } from "react-icons/fi";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations("services");

  const services = [
    {
      icon: <FiStar />,
      title: t("items.s1Title"),
      desc: t("items.s1Desc"),
    },
    {
      icon: <FiHeart />,
      title: t("items.s2Title"),
      desc: t("items.s2Desc"),
    },
    {
      icon: <FiBriefcase />,
      title: t("items.s3Title"),
      desc: t("items.s3Desc"),
    },
    {
      icon: <FiClock />,
      title: t("items.s4Title"),
      desc: t("items.s4Desc"),
    },
  ];

  return (
    <section id="services" className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-2 md:gap-0">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {t("sectionTitle")}
          </h2>
          <span className="text-sm text-gray-700">
            {t("sectionSubtitle")}
          </span>
        </div>

        {/* Service Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl bg-white/80 p-6 shadow-lg hover:shadow-xl transition flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl text-[#B22222]">
                  {s.icon}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-black">
                {s.title}
              </h3>
              <p className="mt-2 mb-4 text-gray-700 text-sm leading-relaxed">
                {s.desc}
              </p>
              <Link
                href="/bookings"
                className="mt-auto inline-block text-center rounded-xl bg-[#B22222] text-white font-medium px-4 py-2 text-sm hover:bg-black hover:text-white transition"
              >
                {t("bookThis")}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Services Button */}
        <div className="flex justify-center mt-10">
          <Link
            href="/services"
            className="rounded-xl bg-[#B22222] text-white font-semibold px-6 py-2 text-sm md:text-base hover:bg-black hover:text-white transition"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
