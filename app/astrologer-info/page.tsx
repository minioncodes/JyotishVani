"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AstrologerInfo() {
  return (
    <section className="relative px-6 py-20 md:py-28 bg-gradient-to-b from-black via-black/90 to-black text-white">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Image
            src="/guruji.jpg" // replace with actual astrologer image path
            alt="Banaras Wale Guru Ji"
            width={420}
            height={520}
            className="rounded-3xl shadow-2xl border border-white/20 object-cover"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-[Cinzel]">
            PRASIDH BANARAS WALE GURUJI
          </h1>
          <h2 className="text-lg font-semibold text-indigo-400 mb-4">
            Pandit Shree S. K. Singh
          </h2>

          <p className="text-gray-300 mb-4 leading-relaxed">
            Shree S. K. Singh Guru Ji, widely known as{" "}
            <strong>“Banaras Wale Guruji”</strong>, was born on 10th January
            1974 in the sacred city of Mirzapur, Uttar Pradesh. A post-graduate
            in the science stream, his deep curiosity for spiritual science led
            him to resign and pursue Vedic knowledge.
          </p>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Guided by Dr. Indu Nath Sharma Ji, HOD of Kashi Sampurnanand Sanskrit
            University, Guru Ji began his journey of blending scientific
            understanding with astrology.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A devoted follower of <strong>Jagat Janani Maa Ambe</strong> since
            childhood, Guru Ji has been helping people through{" "}
            <strong>horoscope readings</strong> and{" "}
            <strong>gemstone recommendations</strong> since 2001.
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mt-16 max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-6 text-center text-indigo-400">
           Why Choose Guru Ji?
        </h3>
        <ul className="space-y-3 text-gray-200">
          <li>✔️ 20+ years of experience in astrology and gem therapy</li>
          <li>✔️ Deep connection between Vedic science and modern science</li>
          <li>✔️ Trusted by thousands across India and abroad</li>
          <li>✔️ Specializes in Marriage, Career, Finance, Health & Remedies</li>
          <li>✔️ Blends spiritual clarity with practical solutions</li>
        </ul>
      </motion.div>

      {/* Guru Ji Belief */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mt-12 max-w-4xl mx-auto text-center"
      >
        <h3 className="text-2xl font-bold mb-4 text-indigo-400">
          📜 Guru Ji’s Belief
        </h3>
        <p className="text-gray-300 italic leading-relaxed">
          “Just as Earth is 2/3 water and 1/3 land, so is the human body. When
          planetary forces affect oceans, they also impact human lives. Great
          sages created astrology to decode these cosmic signals — but today,
          due to misinformation, it's often misunderstood. Astrology, if
          practiced with honesty, is a divine science that can change lives.”
        </p>
      </motion.div>
    </section>
  );
}
