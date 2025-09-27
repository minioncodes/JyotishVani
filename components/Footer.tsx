"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

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
            <a href="/" className="inline-flex items-center gap-3">
              <Image
                src="/icon.jpg"
                alt="Brand logo"
                height={150}
                width={150}
                className="object-contain p-2 rounded-full bg-[#C5A46D]/10"
              />
            </a>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <a
                aria-label="Instagram"
                href="https://instagram.com/yourhandle"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#C5A46D]/10 text-[#C5A46D] transition hover:bg-[#C5A46D] hover:text-black"
              >
                <FiInstagram />
              </a>
              <a
                aria-label="Facebook"
                href="https://facebook.com/yourhandle"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#C5A46D]/10 text-[#C5A46D] transition hover:bg-[#C5A46D] hover:text-black"
              >
                <FiFacebook />
              </a>
              <a
                aria-label="Twitter"
                href="https://x.com/yourhandle"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#C5A46D]/10 text-[#C5A46D] transition hover:bg-[#C5A46D] hover:text-black"
              >
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Address / Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              Get in touch
            </h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C5A46D]/10 text-[#C5A46D]">
                  <FiMapPin />
                </span>
                <div className="leading-relaxed">
                  <p className="text-white font-medium">AstroVision Studio</p>
                  <p>12/3 Crescent Lane, Andheri West</p>
                  <p>Mumbai, Maharashtra 400053 — India</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C5A46D]/10 text-[#C5A46D]">
                  <FiMail />
                </span>
                <a
                  href="mailto:hello@yourdomain.com"
                  className="hover:text-[#C5A46D]"
                >
                  hello@yourdomain.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C5A46D]/10 text-[#C5A46D]">
                  <FiPhone />
                </span>
                <a href="tel:+919876543210" className="hover:text-[#C5A46D]">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-[#C5A46D]/30 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-400 md:flex-row">
          <p>© {year} AstroVision. All rights reserved.</p>
          <p>
            Developed by{" "}
            <span className="text-[#C5A46D] font-medium">DigiPants Network</span> ·{" "}
            <a
              href="/privacy"
              className="underline decoration-transparent hover:decoration-[#C5A46D]"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
