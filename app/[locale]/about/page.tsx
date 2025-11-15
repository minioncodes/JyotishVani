"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AstrologerInfo() {
  const t = useTranslations("astrologerPage");

  return (
    <div>
      <section className="relative px-6 py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/90 to-[#F5EFE4] text-[#2B2B2B]">
        <div className="mx-auto mt-10 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/Acharya ji (2).jpg"
                alt={t("hero.imageAlt")}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-[Cinzel] text-[#B22222]">
              {t("hero.name")}
            </h1>
            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
              {t("hero.p1")}
            </p>
            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
              {t("hero.p2")}
            </p>
            <p className="text-[#4A4A4A] mb-6 leading-relaxed">
              {t("hero.p3")}
            </p>
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#B22222] font-[Cinzel]">
            {t("timeline.heading")}
          </h2>

          <div className="relative">
            {/* Continuous dotted spine */}
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 h-full border-l-2 border-dotted border-[#D9C89B] pointer-events-none"
              aria-hidden
            />

            <ul className="space-y-10">
              {/* Branch 1 */}
              <li className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="md:pr-10 md:text-left">
                  <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
                    <p className="leading-relaxed text-[#4A4A4A]">
                      {t("timeline.branch1")}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center my-4 md:my-0">
                  <span className="text-2xl font-bold text-[#B22222] drop-shadow-sm select-none">
                    ↓
                  </span>
                </div>
              </li>

              {/* Branch 2 */}
              <li className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="flex justify-center order-2 md:order-1 my-4 md:my-0">
                  <span className="text-2xl font-bold text-[#B22222] drop-shadow-sm select-none">
                    ↓
                  </span>
                </div>
                <div className="order-1 md:order-2 md:pl-10">
                  <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
                    <p className="leading-relaxed text-[#4A4A4A]">
                      {t("timeline.branch2")}
                    </p>
                  </div>
                </div>
              </li>

              {/* Branch 3 */}
              <li className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="md:pr-10 md:text-left">
                  <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
                    <p className="leading-relaxed text-[#4A4A4A]">
                      {t("timeline.branch3")}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Astro Philosophy Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#B22222] font-[Cinzel]">
            {t("astroPhilosophy.heading")}
          </h3>

          <ul className="space-y-6 text-lg italic text-[#4A4A4A] leading-relaxed list-disc pl-6">
            <li>{t("astroPhilosophy.q1")}</li>
            <li>{t("astroPhilosophy.q2")}</li>
            <li>{t("astroPhilosophy.q3")}</li>
            <li>{t("astroPhilosophy.q4")}</li>
          </ul>
        </motion.div>

        {/* Why Choose */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-[#B22222]/50 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-[#B22222]">
            {t("whyChoose.heading")}
          </h3>
          <ul className="space-y-3 text-[#4A4A4A]">
            <li>{t("whyChoose.li1")}</li>
            <li>{t("whyChoose.li2")}</li>
            <li>{t("whyChoose.li3")}</li>
            <li>{t("whyChoose.li4")}</li>
            <li>{t("whyChoose.li5")}</li>
          </ul>
        </motion.div>

        {/* Acharya Ji Belief */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#B22222]">
            {t("belief.heading")}
          </h3>
          <p className="text-[#4A4A4A] italic leading-relaxed">
            {t("belief.body")}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
