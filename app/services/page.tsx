"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { FiStar, FiHeart, FiSun, FiGlobe } from "react-icons/fi";

export default function ServicesPage() {
    const services = [
        {
            icon: <FiStar className="text-4xl text-[#B38B46]" />,
            title: "Personal Horoscope Reading",
            desc: "Detailed analysis of your birth chart for career, love, health, and finances with actionable guidance.",
        },
        {
            icon: <FiHeart className="text-4xl text-[#B38B46]" />,
            title: "Relationship & Compatibility",
            desc: "Discover cosmic alignment with your partner and learn how planetary influences affect your bond.",
        },
        {
            icon: <FiSun className="text-4xl text-[#B38B46]" />,
            title: "Gemstone Recommendations",
            desc: "Get personalized gemstone suggestions to enhance positive energies and reduce planetary challenges.",
        },
        {
            icon: <FiGlobe className="text-4xl text-[#B38B46]" />,
            title: "Yearly Forecast",
            desc: "A complete astrological roadmap for the upcoming year to help you plan important decisions confidently.",
        },
    ];

    return (
        <>
            <Navbar/>
            <section className="relative px-6 py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/90 to-[#F5EFE4] text-[#2B2B2B]">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold font-[Cinzel] text-[#5B4A2F]"
                    >
                        Our Astrology Services
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mt-6 max-w-3xl mx-auto text-lg text-[#4A4A4A]"
                    >
                        Explore our range of personalized astrology services designed to bring
                        clarity, confidence, and cosmic alignment to every stage of your life.
                    </motion.p>
                </div>

                <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-[#E6D9B8]/50 shadow-xl hover:shadow-2xl transition"
                        >
                            <div className="flex items-center justify-center mb-6">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-[#5B4A2F] text-center">
                                {service.title}
                            </h3>
                            <p className="text-[#4A4A4A] leading-relaxed text-center">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 text-center"
                >
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 rounded-xl bg-[#B38B46] text-white font-semibold shadow hover:bg-[#a17b3e] transition"
                    >
                        Book a Reading
                    </a>
                </motion.div>
            </section>
            
        </>
    );
}
