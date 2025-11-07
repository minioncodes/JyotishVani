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
                src="/Acharya Sumit Tiwari.jpg" // replace with actual astrologer image path
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
            {/* Acharya Sumit Tiwari is a Famous Astrologer in Lucknow with experience of more than 13 years. He provides very Simple and Logical remedies which are very Effective. His articles are also published in various News Portals. He holds Post Graduation in Astrology (M. A. Jyotirvigyan) from Lucknow University, Shastri in Vedic Jyotish from Central Sanskrit University, Lucknow and B. Com. from Lucknow University.
He helped many people, from his readings and predictions, to reduce the hurdles in their path. If you choose him, you have already made one of the best decisions in your life.
Contact Acharya Ji for Scientific and Logical Analysis of Kundli. */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-[Cinzel] text-[#5B4A2F]">
              Acharya ji
            </h1>
            <h2 className="text-lg font-semibold text-[#B38B46] mb-4">
              Acharya Sumit Tiwari
            </h2>

            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
              <strong className="text-[#5B4A2F]">Acharya Sumit Tiwari&nbsp;</strong> is a Famous Astrologer in Lucknow with experience of more than 13 years. He provides very Simple and Logical remedies which are very Effective. His articles are also published in various News Portals. 
            </p>
            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
              He holds Post Graduation in Astrology (M. A. Jyotirvigyan) from Lucknow University, Shastri in Vedic Jyotish from Central Sanskrit University, Lucknow and B. Com. from Lucknow University.
He helped many people, from his readings and predictions, to reduce the hurdles in their path.
            </p>
            <p className="text-[#4A4A4A] mb-6 leading-relaxed">
If you choose him, you have already made one of the best decisions in your life.
Contact Acharya Ji for Scientific and Logical Analysis of Kundli.{" "}
              <strong className="text-[#5B4A2F]">Scientific</strong> and{" "}
              <strong className="text-[#5B4A2F]">Logical Analysis</strong> of{" "}
              <strong className="text-[#5B4A2F]">Kundli.</strong>
            </p>
          </motion.div>
        </div>
{/* About — Spine with Branches Fixed Responsive */}
{/* About — Journey Timeline (Parchment + Dotted Spine + Om icon) */}
<motion.div
  initial={{ y: 30, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
  className="mt-16 max-w-5xl mx-auto"
>
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#5B4A2F] font-[Cinzel]">
    About Guru Ji
  </h2>

  <div className="relative">
    {/* Continuous dotted spine */}
    <div
      className="absolute left-1/2 top-0 -translate-x-1/2 h-full border-l-2 border-dotted border-[#D9C89B] pointer-events-none"
      aria-hidden
    />

    <ul className="space-y-10">

      {/* Branch 1 */}
      <li className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Card */}
        <div className="md:pr-10 md:text-right">
          <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
            
            <p className="leading-relaxed text-[#4A4A4A]">
              From the age of four, his grandfather observed a natural inclination towards{" "}
              <strong className="text-[#7A5A2B] font-semibold">spiritual practices</strong>. Several astrologers
              studied his birth chart and predicted a life path closely tied to{" "}
              <strong className="text-[#7A5A2B] font-semibold">Spirituality &amp; Jyotish</strong>.
            </p>
          </div>
        </div>
        {/* Node */}
        <div className="flex justify-center my-4 md:my-0">
          <span className="text-2xl font-bold text-[#B38B46] drop-shadow-sm select-none">↓</span>

        </div>
      </li>

      {/* Branch 2 (right on md+) */}
      <li className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Node */}
        <div className="flex justify-center order-2 md:order-1 my-4 md:my-0">
          <span className="text-2xl font-bold text-[#B38B46] drop-shadow-sm select-none">↓</span>

        </div>
        {/* Card */}
        <div className="order-1 md:order-2 md:pl-10">
          <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
            
            <p className="leading-relaxed text-[#4A4A4A]">
              This view was affirmed by{" "}
              <strong className="text-[#7A5A2B] font-semibold">Shri Parmeshwar Dwivedi Ji</strong>, a respected{" "}
              <strong className="text-[#7A5A2B] font-semibold">Bhrigu Samhita</strong> scholar.
            </p>
          </div>
        </div>
      </li>

      {/* Branch 3 */}
      <li className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Card */}
        <div className="md:pr-10 md:text-right">
          <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
            
            <p className="leading-relaxed text-[#4A4A4A]">
              After the passing of his parents, he completed{" "}
              <strong className="text-[#7A5A2B] font-semibold">Intermediate</strong> as per their wish and later pursued{" "}
              <strong className="text-[#7A5A2B] font-semibold">Post Graduation in Astrology</strong> from{" "}
              <strong className="text-[#7A5A2B] font-semibold">Lucknow University</strong>, despite family resistance.
            </p>
          </div>
        </div>
        {/* Node */}
        <div className="flex justify-center my-4 md:my-0">
          <span className="text-2xl font-bold text-[#B38B46] drop-shadow-sm select-none">↓</span>

        </div>
      </li>

      {/* Branch 4 (right on md+) */}
      <li className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Node */}
        <div className="flex justify-center order-2 md:order-1 my-4 md:my-0">
          <span className="text-2xl font-bold text-[#B38B46] drop-shadow-sm select-none">↓</span>

        </div>
        {/* Card */}
        <div className="order-1 md:order-2 md:pl-10">
          <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
            
            <p className="leading-relaxed text-[#4A4A4A]">
              From the age of nine, he learned{" "}
              <strong className="text-[#7A5A2B] font-semibold">Kundli</strong> making and interpretation under{" "}
              <strong className="text-[#7A5A2B] font-semibold">Maheshanand Saraswati (Dandi Swami)</strong> of{" "}
              <strong className="text-[#7A5A2B] font-semibold">Naimisharanya</strong>.
            </p>
          </div>
        </div>
      </li>

      {/* Branch 5 */}
      <li className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Card */}
        <div className="md:pr-10 md:text-right">
          <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
            
            <p className="leading-relaxed text-[#4A4A4A]">
              Over the years, he has guided respected individuals across Uttar Pradesh through{" "}
              <strong className="text-[#7A5A2B] font-semibold">Spiritual Practices</strong>,{" "}
              <strong className="text-[#7A5A2B] font-semibold">Astrology</strong>, and{" "}
              <strong className="text-[#7A5A2B] font-semibold">Gem Consultation</strong>.
            </p>
          </div>
        </div>
      </li>

    </ul>
  </div>
</motion.div>



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
