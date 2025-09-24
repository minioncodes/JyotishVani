"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Dark background */}
      <div className="pointer-events-none absolute inset-0 bg-[#0B0B0F]" />

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
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                <Image src="/logo.svg" alt="Brand logo" fill className="object-contain p-2" />
              </div>
              <span className="text-xl font-semibold tracking-wide text-zinc-100">
                AstroVision
              </span>
            </a>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <a
                aria-label="Instagram"
                href="https://instagram.com/yourhandle"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 backdrop-blur transition hover:bg-white/10"
              >
                <FiInstagram />
              </a>
              <a
                aria-label="Facebook"
                href="https://facebook.com/yourhandle"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 backdrop-blur transition hover:bg-white/10"
              >
                <FiFacebook />
              </a>
              <a
                aria-label="Twitter"
                href="https://x.com/yourhandle"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 backdrop-blur transition hover:bg-white/10"
              >
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Address / Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Get in touch
            </h4>
            <ul className="space-y-4 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-200 backdrop-blur">
                  <FiMapPin />
                </span>
                <div className="leading-relaxed">
                  <p className="text-zinc-100">AstroVision Studio</p>
                  <p>12/3 Crescent Lane, Andheri West</p>
                  <p>Mumbai, Maharashtra 400053 — India</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-200 backdrop-blur">
                  <FiMail />
                </span>
                <a href="mailto:hello@yourdomain.com" className="hover:text-indigo-300">
                  hello@yourdomain.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-200 backdrop-blur">
                  <FiPhone />
                </span>
                <a href="tel:+919876543210" className="hover:text-indigo-300">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-zinc-400 md:flex-row">
          <p>© {year} AstroVision. All rights reserved.</p>
          <p>
            Made with ❤️ in India ·{" "}
            <a href="/privacy" className="underline decoration-white/20 hover:decoration-indigo-400">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
