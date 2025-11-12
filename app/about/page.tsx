"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function AstrologerInfo() {
  return (
    <div>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-[Cinzel] text-[#5B4A2F]">
              Acharya Sumit Tiwari 
            </h1>
            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
              <strong className="text-[#5B4A2F]">Acharya Sumit Tiwari (Vedic Astrologer)&nbsp;</strong> is a Famous Astrologer in Lucknow with experience of more than 19+ years. He provides very Simple and Logical remedies which are very Effective. His articles are also published in various News Portals. 
            </p>
            <p className="text-[#4A4A4A] mb-4 leading-relaxed">
             He holds a <strong className="text-[#5B4A2F]">B.Com</strong>{" "} from Lucknow University, a <strong className="text-[#5B4A2F]">Shastri </strong>{" "}in Vedic Jyotish from Central Sanskrit University, Lucknow, and a Post-Graduation in Astrology <strong className="text-[#5B4A2F]">(M.A. Jyotirvigyan)</strong>{" "} from Lucknow University under the guidence of Padamshri Professor B.K. Shukla He has helped many people through his readings and predictions to overcome obstacles in their paths.
            </p>
            <p className="text-[#4A4A4A] mb-6 leading-relaxed">
If you choose him, you have already made one of the best decisions in your life.
Contact Acharya Ji for {" "}
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
    About Acharya Ji
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
        <div className="md:pr-10 md:text-left">
          <div className="relative inline-block bg-gradient-to-br from-[#FAF6E8] to-[#F5EEE1] border border-[#CAB27A] rounded-2xl p-6 shadow-sm shadow-[#E9DFC7] mx-auto max-w-xl">
            
            <p className="leading-relaxed text-[#4A4A4A]">
              From the early age, his family observed a natural inclination towards{" "}
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
              He was Blessed by His Guru A Great Sanskrit Scholar and Katha Vyas <strong className="text-[#5B4A2F]">Param Pujya Swami Maheshanand Saraswati Ji Maharaj</strong>. By having Swami Ji's Guidance and Companionship He was Entered in tha Path of Spirituality. A true path of Sadhna.
            </p>
          </div>
        </div>
      </li>

      {/* Branch 5 */}
      <li className="grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Card */}
        <div className="md:pr-10 md:text-left">
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


{/* Astro Taglines Philosophy Section */}
<motion.div
  initial={{ y: 30, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
  className="mt-20 max-w-4xl mx-auto"
>
  <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#5B4A2F] font-[Cinzel]">
    Astro Philosophy
  </h3>

  <ul className="space-y-6 text-lg italic text-[#4A4A4A] leading-relaxed list-disc pl-6">
    <li>“Stars impel but do not compel. -  Alan Leo" </li>
    <li>“A child is born on that day and hour when the celestial rays are in mathematical harmony with his individual karma. - Sri Yukteswar Giri”</li>
    <li>“Millionaires don’t use astrology Billionaires do. - J.P. Morgan”</li>
    <li>“Jyotisha is the art of seeing light, of guiding, of counseling based on the truth called the horoscope. - Dr. B.V. Raman”</li>
  </ul>
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
            Why Choose Acharya Ji?
          </h3>
          <ul className="space-y-3 text-[#4A4A4A]">
            <li>✔️ 19+ years of experience in astrology and gem therapy</li>
            <li>✔️ Deep connection between Vedic science and modern science</li>
            <li>✔️ Trusted by thousands across India and abroad</li>
            <li>✔️ Specializes in Marriage, Career, Finance, Health & Remedies</li>
            <li>✔️ Blends spiritual clarity with practical solutions</li>
          </ul>
        </motion.div>

        {/* Acharya Ji Belief */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-[#B38B46]">
            📜 Acharya Ji’s Belief
          </h3>
          <p className="text-[#4A4A4A] italic leading-relaxed">
            “Science measures gravity; astrology interprets meaning. Both emerge from the same cosmic order. The magnetic fields that stir tides also influence the subtle energy within us. True astrology is not prediction — it is alignment, awareness, and harmony with universal design.”
          </p>
        </motion.div>
      </section>
    </div>

  );
}
