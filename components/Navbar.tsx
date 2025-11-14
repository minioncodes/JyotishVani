'use client';

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/blogs", key: "blogs" },
  { href: "/contact", key: "contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("navbar");
  const router = useRouter();
  const pathname = usePathname();

  // Active link highlighting
  const activeLink = (path: string) =>
    pathname === `/${locale}${path === "/" ? "" : path}`;

  // Locale switch logic
  const switchLocale = () => {
    const nextLocale = locale === "en" ? "hi" : "en";
    const cleanPath = pathname.replace(/^\/(en|hi)/, "");
    router.push(`/${nextLocale}${cleanPath}`);
  };

  const isHindi = locale === "hi";

  return (
    <motion.nav
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50"
    >
      <div className="flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow">

        {/* BRAND */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/icon.jpg"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-full object-contain"
          />
          <span className="text-xl font-bold">{t("brand")}</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-7 text-gray-900 font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={`/${locale}${l.href}`}
              className={`hover:text-[#B22222] transition ${
                activeLink(l.href) ? "text-[#B22222] font-semibold" : ""
              }`}
            >
              {t(l.key)}
            </Link>
          ))}

          <Link
            href={`/${locale}/bookings`}
            className="bg-[#B22222] text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-black transition"
          >
            {t("bookNow")}
          </Link>

          {/* LANGUAGE SWITCH */}
          <button
            onClick={switchLocale}
            className="border border-[#B22222] text-[#B22222] px-4 py-2 rounded-xl font-semibold hover:bg-[#B22222]/10 transition"
          >
            {isHindi ? t("switchToEnglish") : t("switchToHindi")}
          </button>
        </div>

        {/* MOBILE: LANGUAGE SWITCH BEFORE MENU */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={switchLocale}
            className="border border-[#B22222] text-[#B22222] px-3 py-1.5 rounded-xl text-sm font-semibold hover:bg-[#B22222]/10 transition"
          >
            {isHindi ? "EN" : "HI"}
          </button>

          <button
            className="p-2 bg-[#B22222]/20 rounded-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
<AnimatePresence>
  {open && (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="md:hidden origin-top bg-white/95 rounded-2xl shadow mt-2"
    >
      <div className="flex flex-col p-4">

        {links.map((l) => (
          <Link
            key={l.href}
            href={`/${locale}${l.href}`}
            onClick={() => setOpen(false)}
            className={`py-3 text-gray-900 font-medium hover:text-[#B22222] ${
              activeLink(l.href) ? "text-[#B22222] font-semibold" : ""
            }`}
          >
            {t(l.key)}
          </Link>
        ))}

        <Link
          href={`/${locale}/bookings`}
          onClick={() => setOpen(false)}
          className="mt-3 bg-[#B22222] text-white px-4 py-2 rounded-xl text-center font-semibold shadow hover:bg-black transition"
        >
          {t("bookNow")}
        </Link>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.nav>
  );
}
