"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: About Jyotishvani Organisation */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            About <span className="text-[#C5A46D]">Jyotishvani</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-800 leading-relaxed">
            Jyotishvani is a dedicated astrology organisation offering complete 
            Vedic solutions to guide individuals through life’s important decisions. 
            With a blend of tradition and modern insights, we provide practical remedies 
            and accurate predictions rooted in ancient wisdom.
          </p>
          <ul className="mt-6 space-y-2 text-gray-900">
            <li>✦ Birth Chart (Kundli) analysis & personalised remedies</li>
            <li>✦ Career, Business & Finance astrology</li>
            <li>✦ Marriage, Relationship & Compatibility guidance</li>
            <li>✦ Health, Education & Family insights</li>
            <li>✦ Muhurat selection for auspicious beginnings</li>
            <li>✦ Gemstone and Mantra recommendations</li>
          </ul>
        </motion.div>

        {/* RIGHT: Guru Ji Section */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/sk-singh.jpg" // replace with actual astrologer image path
              alt="Astrologer S. K. Singh"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-black">
            Astrologer <span className="text-[#C5A46D]">S. K. Singh</span>
          </h3>
          <p className="text-gray-800 leading-relaxed">
            Shree S. K. Singh, fondly known as{" "}
            <span className="font-semibold text-[#C5A46D]">
              Banaras Wale Guruji
            </span>, 
            is the guiding force behind Jyotishvani. With 20+ years of experience in Vedic astrology 
            and gemstone therapy, he has helped thousands find clarity in marriage, career, finance, 
            and health matters.
          </p>
          <Link
            href="/astrologer-info"
            className="inline-block text-sm font-medium text-[#C5A46D] hover:text-black transition"
          >
            → More about Guru Ji
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
