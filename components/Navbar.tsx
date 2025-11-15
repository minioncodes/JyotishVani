'use client';

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
    const nextLocale = locale === "hi" ? "en" : "hi";
    const cleanPath = pathname.replace(/^\/(en|hi)/, "");
    router.push(`/${nextLocale}${cleanPath}`);
  };

  const isHindi = locale === "hi";

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
      <div className="flex items-center justify-between px-5 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow">

        {/* BRAND */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="/icon.jpg"
            alt="Logo"
            width={32}
            height={32}
            className="object-contain rounded-full"
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
          <div
            onClick={switchLocale}
            className={`
              relative 
              w-24 h-8
              sm:w-28 sm:h-9
              flex items-center 
              rounded-full cursor-pointer 
              transition-all duration-300 select-none
              ${isHindi ? "bg-[#B22222]" : "bg-gray-400"}
            `}
          >
            <span className="absolute left-2 text-white text-[10px] sm:text-xs font-semibold">
              Hindi
            </span>

            <span className="absolute right-2 text-white text-[10px] sm:text-xs font-semibold">
              English
            </span>

            <div
              className={`
                absolute 
                bg-white rounded-full shadow-md flex items-center justify-center 
                text-[10px] sm:text-xs font-semibold 
                transition-all duration-300
                w-12 h-8
                sm:w-14 sm:h-9
                ${isHindi ? "translate-x-0" : "translate-x-12 sm:translate-x-14"}
              `}
            >
              {isHindi ? "हिन्दी" : "EN"}
            </div>
          </div>
        </div>

        {/* MOBILE: LANGUAGE SWITCH + MENU BUTTON */}
        <div className="flex md:hidden items-center gap-3">
          <div
            onClick={switchLocale}
            className={`
              relative 
              w-20 h-7
              sm:w-28 sm:h-8
              flex items-center 
              rounded-full cursor-pointer 
              transition-all duration-300 select-none
              ${isHindi ? "bg-[#B22222]" : "bg-gray-400"}
            `}
          >
            <span className="absolute left-2 text-white text-[9px] sm:text-xs font-semibold">
              Hindi
            </span>

            <span className="absolute right-2 text-white text-[9px] sm:text-xs font-semibold">
              English
            </span>

            <div
              className={`
                absolute 
                bg-white rounded-full shadow-md flex items-center justify-center 
                text-[9px] sm:text-xs font-semibold 
                transition-all duration-300
                w-10 h-7
                sm:w-14 sm:h-9
                ${isHindi ? "translate-x-0" : "translate-x-10 sm:translate-x-14"}
              `}
            >
              {isHindi ? "हि" : "EN"}
            </div>
          </div>

          <button
            className="p-2 bg-[#B22222]/20 rounded-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU (NO ANIMATION) */}
      {open && (
        <div className="md:hidden bg-white/95 rounded-2xl shadow mt-2">
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
        </div>
      )}
    </nav>
  );
}
