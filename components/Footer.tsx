"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0B0B0F] text-white">
      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 md:grid-cols-[1fr_1fr]"
        >
          {/* Brand / Logo */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
  <Image
    src="/icon.jpg"
    alt="Brand logo"
    height={80}
    width={80}
    className="object-contain rounded-full animate-spin-ltr"
  />
</Link>


            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                aria-label="Instagram"
                href="https://www.instagram.com/jyotish_waani/"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B22222]/10 text-[#B22222] transition hover:bg-[#B22222] hover:text-black"
              >
                <FiInstagram />
              </Link>
              <Link
                aria-label="Facebook"
                href="https://www.facebook.com/banaraswaleguruji"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B22222]/10 text-[#B22222] transition hover:bg-[#B22222] hover:text-black"
              >
                <FiFacebook />
              </Link>
            </div>
          </div>

          {/* Address / Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B22222]">
              Get in touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B22222]/10 text-[#B22222]">
                  <FiMapPin />
                </span>
                <div className="leading-relaxed">
                  <p className="text-white font-medium">C-219 Near Tula Ram Park Rajajipuram </p>
                  <p>Lucknow U.P 226017- India</p>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B22222]/10 text-[#B22222]">
                  <FiMail />
                </span>
                <Link
                  href="mailto:help@jyotishwaani.com"
                  className="hover:text-[#B22222]"
                >
                  help@jyotishwaani.com
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B22222]/10 text-[#B22222]">
                  <FiPhone />
                </span>
                <Link href="tel:+919876543210" className="hover:text-[#B22222]">
                  +91 9415087999
                  +91 9452464332
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#B22222]/30 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-400 md:flex-row">
          <p>© {year} Jyotishwaani. All rights reserved.</p>
          <p>
            Developed by{" "}
            <Link href="https://digipants.com/" target="blank" className="text-[#B22222] font-small">DigiPants Network Pvt.</Link> ·{" "}
            <Link
              href="/privacy"
              className="underline decoration-transparent hover:decoration-[#B22222]"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
