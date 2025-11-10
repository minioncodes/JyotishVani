"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { FiStar, FiHeart, FiBriefcase, FiClock, FiTrendingUp, FiRadio, FiDollarSign, FiUsers, FiFeather } from "react-icons/fi";

const items = [
  { icon: <FiStar />, name: "Kundli Analysis", caption:"Decode Your Birth Blueprint", about:"Detailed analysis of planetary placements, yogas, doshas & predictive roadmap." },
  { icon: <FiHeart />, name: "Kundli Matching", caption:"Before You Commit Forever", about:"Compatibility, guna milan, modern psychological matching + timing alignment." },
  { icon: <FiBriefcase />, name: "Education", caption:"Right Field. Right Timing.", about:"Right field, exam timing, foreign prospects & direction of study." },
  { icon: <FiClock />, name: "Marriage / Marital Life", caption:"Your Marriage Karma Map", about:"Marriage timing, spouse nature, conflict resolution & post marriage patterns." },
  { icon: <FiHeart />, name: "Love & Relationship", caption:"Heart + Karma Alignment", about:"Love future, patterns, next relationship chances, healing & heart alignment." },
  { icon: <FiTrendingUp />, name: "Career / Business / Job", caption:"Growth That Is Written", about:"Career growth, business success, switch timing, job stability judgement." },
  { icon: <FiRadio />, name: "E-Pooja", caption:"Rituals. Energy. Healing.", about:"Online personalized pooja, anushthan & ritualistic karmic balancing." },
  { icon: <FiDollarSign />, name: "Health / Wealth", caption:"Body + Fortune Direction", about:"Ayushya, Sade Sati impact, disease patterns & wealth flow mapping." },
  { icon: <FiUsers />, name: "Child", caption:"Future Generation Karma", about:"Child birth prediction, child astrology & parent-child karmic alignment." },
  { icon: <FiFeather />, name: "Puja / Anushthan", caption:"Powerful Vedic Remedies", about:"Special pujas, remedies, planetary propitiation & authentic traditional rituals." },
];

export default function AstroCategories() {
  return (
    <section className="px-6 mt-10 py-14 md:py-20 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.05 },
          },
        }}
        className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"

      >

        {items.map((i) => (
          <motion.div
            key={i.name}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -6 }}
            className="relative bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center text-center group cursor-pointer border border-[#C5A46D20] aspect-square p-6 overflow-hidden"


          >
            <div className="text-4xl text-[#C5A46D] mb-3">{i.icon}</div>
            <h3 className="font-semibold text-black text-lg md:text-xl">{i.name}</h3>
            <p className="text-[11px] text-black/60 mt-1 font-medium">{i.caption}</p>

            <div className="absolute inset-0 rounded-3xl bg-[#C5A46D15] backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-8">
              <p className="text-black/90 text-base leading-relaxed font-medium">{i.about}</p>
            </div>
          </motion.div>
        ))}

      </motion.div>
    </section>
  );
}
