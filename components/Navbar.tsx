"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/astrologer-info", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/all-blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2"
    >
      <div className="flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-md px-5 py-3 shadow-md">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={160}
            height={50}
            className="mr-2"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-gray-800 font-medium">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="hover:text-[#C5A46D] transition-colors"
            >
              {l.label}
            </motion.a>
          ))}
          <a
            href="/booking"
            className="rounded-xl bg-[#C5A46D] text-black px-4 py-2 text-sm font-semibold shadow hover:bg-black hover:text-white transition"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded-xl bg-[#C5A46D]/20 p-2 text-black hover:bg-[#C5A46D]/30"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden origin-top mt-2 rounded-2xl bg-white/95 shadow"
          >
            <div className="flex flex-col p-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="py-3 text-gray-800 font-medium border-b border-gray-200 last:border-none hover:text-[#C5A46D]"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/booking"
                className="mt-3 rounded-xl bg-[#C5A46D] text-black px-4 py-2 text-center font-semibold shadow hover:bg-black hover:text-white transition"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
