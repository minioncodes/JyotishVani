"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function AstrologerInfo() {
  return (
    <div>
      <Navbar/>
      <section className="relative px-6 py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/90 to-[#F5EFE4] text-[#2B2B2B]">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/12/horoscope-1577638518.jpg" // replace with actual astrologer image path
                alt="Astrologer Acharya Sumit Tiwari"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-[Cinzel] text-[#5B4A2F]">
              PRASIDH BANARAS WALE GURUJI
            </h1>
            <h2 className="text-lg font-semibold text-[#B38B46] mb-4">
              Acharya Sumit Tiwari
            </h2>

            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
              Acharya Sumit Tiwari ji, widely known as{" "}
              <strong className="text-[#5B4A2F]">“Banaras Wale Guruji”</strong>, was born on
              10th January 1974 in the sacred city of Mirzapur, Uttar Pradesh. A
              post-graduate in the science stream, his deep curiosity for spiritual
              science led him to resign and pursue Vedic knowledge.
            </p>
            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
              Guided by Dr. Indu Nath Sharma Ji, HOD of Kashi Sampurnanand Sanskrit
              University, Guru Ji began his journey of blending scientific
              understanding with astrology.
            </p>
            <p className="text-[#4A4A4A] mb-6 leading-relaxed">
              A devoted follower of{" "}
              <strong className="text-[#5B4A2F]">Jagat Janani Maa Ambe</strong> since
              childhood, Guru Ji has been helping people through{" "}
              <strong className="text-[#5B4A2F]">horoscope readings</strong> and{" "}
              <strong className="text-[#5B4A2F]">gemstone recommendations</strong> since
              1995.
            </p>
          </motion.div>
        </div>

        {/* Why Choose */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-[#E6D9B8]/50 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-[#B38B46]">
            Why Choose Guru Ji?
          </h3>
          <ul className="space-y-3 text-[#4A4A4A]">
            <li>✔️ 30+ years of experience in astrology and gem therapy</li>
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
          <h3 className="text-2xl font-bold mb-4 text-[#B38B46]">
            📜 Guru Ji’s Belief
          </h3>
          <p className="text-[#4A4A4A] italic leading-relaxed">
            “Just as Earth is 2/3 water and 1/3 land, so is the human body. When
            planetary forces affect oceans, they also impact human lives. Great
            sages created astrology to decode these cosmic signals — but today,
            due to misinformation, it's often misunderstood. Astrology, if
            practiced with honesty, is a divine science that can change lives.”
          </p>
        </motion.div>
      </section>
    </div>

  );
}
