"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT: About Jyotishvani Organisation */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-black/50 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold">About Jyotishvani</h2>
          <p className="mt-3 text-gray-300">
            Jyotishvani is a dedicated astrology organisation offering complete 
            Vedic solutions to guide individuals through life’s important decisions. 
            With a blend of tradition and modern insights, we provide practical remedies 
            and accurate predictions rooted in ancient wisdom.
          </p>
          <ul className="mt-5 space-y-3 text-gray-300">
            <li>• Birth Chart (Kundli) analysis & personalised remedies</li>
            <li>• Career, Business & Finance astrology</li>
            <li>• Marriage, Relationship & Compatibility guidance</li>
            <li>• Health, Education & Family insights</li>
            <li>• Muhurat selection for auspicious beginnings</li>
            <li>• Gemstone and Mantra recommendations</li>
          </ul>
        </motion.div>

        {/* RIGHT: Guru Ji Section */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-black/50 p-0 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/sk-singh.jpg" // replace with actual astrologer image path
              alt="Astrologer S. K. Singh"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold">Astrologer S. K. Singh</h3>
            <p className="mt-2 text-gray-300">
              Shree S. K. Singh, fondly known as <span className="font-semibold">Banaras Wale Guruji</span>, 
              is the guiding force behind Jyotishvani. With 20+ years of experience in Vedic astrology 
              and gemstone therapy, he has helped thousands find clarity in marriage, career, finance, 
              and health matters.
            </p>
            <Link
              href="/astrologer-info"
              className="mt-4 inline-block text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 transition"
            >
              → More about Guru Ji
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
