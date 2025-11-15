"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden bg-[#0B0B0F] text-white">
      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-10">

        {/* TOP GRID */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 md:grid-cols-[1fr_1fr]"
        >
          {/* BRAND + SOCIALS */}
          <div className="space-y-4">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-3 select-none"
            >
              <Image
                src="/icon.jpg"
                alt="JyotishWaani Logo"
                height={80}
                width={80}
                className="object-contain rounded-full animate-spin-ltr"
              />
            </Link>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                aria-label="Instagram"
                href="https://www.instagram.com/jyotish_waani/"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B22222]/10 text-[#B22222] transition hover:bg-[#B22222] hover:text-black"
              >
                <FiInstagram size={18} />
              </Link>

              <Link
                aria-label="Facebook"
                href="https://www.facebook.com/banaraswaleguruji"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B22222]/10 text-[#B22222] transition hover:bg-[#B22222] hover:text-black"
              >
                <FiFacebook size={18} />
              </Link>
            </div>
          </div>

          {/* CONTACT DETAILS */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B22222]">
              {t("getInTouch")}
            </h4>

            <ul className="space-y-4 text-sm text-gray-300">
              
              {/* ADDRESS */}
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B22222]/10 text-[#B22222]">
                  <FiMapPin size={18} />
                </span>
                <div>
                  <p className="text-white font-medium leading-tight">
                    C-219 Near Tula Ram Park, Rajajipuram
                  </p>
                  <p className="leading-tight">Lucknow, Uttar Pradesh - 226017</p>
                  <p className="leading-tight">India</p>
                </div>
              </li>

              {/* EMAIL */}
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B22222]/10 text-[#B22222]">
                  <FiMail size={18} />
                </span>
                <Link
                  href="mailto:help@jyotishwaani.com"
                  className="hover:text-[#B22222] break-all"
                >
                  help@jyotishwaani.com
                </Link>
              </li>

              {/* PHONE */}
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B22222]/10 text-[#B22222]">
                  <FiPhone size={18} />
                </span>
                <div className="flex flex-col leading-tight">
                  <Link
                    href="tel:+919415087999"
                    className="hover:text-[#B22222]"
                  >
                    +91 94150 87999
                  </Link>
                  <Link
                    href="tel:+919452464332"
                    className="hover:text-[#B22222]"
                  >
                    +91 94524 64332
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[#B22222]/30 to-transparent" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">

          <p className="text-center md:text-left">
            © {year} <span className="text-white font-medium">JyotishWaani</span>.
            {t("rightsReserved")}
          </p>

          <p className="flex gap-2 flex-wrap justify-center">
            {t("developedBy")}{" "}
            <Link
              href="https://digipants.com/"
              target="_blank"
              className="text-[#B22222] font-medium hover:underline"
            >
              DigiPants Network Pvt.
            </Link>
            ·
            <Link
              href={`/${locale}/privacy`}
              className="underline decoration-transparent hover:decoration-[#B22222] transition"
            >
              {t("privacy")}
            </Link>
            ·
            <Link
              href={`/${locale}/disclaimer`}
              className="underline decoration-transparent hover:decoration-[#B22222] transition"
            >
              {t("disclaimer")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
