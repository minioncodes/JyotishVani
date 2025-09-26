"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AstroGlobe from "./Astroglobe";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[92vh] items-center justify-center px-6"
    >
    
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      <div className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/20 blur-3xl" /> */}
      <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-3xl" />

   
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-3xl   p-8 sm:p-12 shadow-sm backdrop-blur-xl"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold"
          >
            Unlock Your{" "}
            <span className=" bg-clip-text">
              Cosmic Destiny
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 text-base md:text-lg text-gray-300 leading-relaxed"
          >
            Personalized astrology readings for love, career, and life path.  
            Get clarity, confidence, and cosmic alignment with every session.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#contact"
              className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold shadow-lg hover:opacity-95"
            >
              Book a Reading
            </a>
            <a
              href="#services"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold hover:bg-white/10"
            >
              Explore Services
            </a>
          </motion.div>
          <div className="mt-6 text-xs text-gray-400">
            ✦ Trusted by 1000+ clients • Available worldwide
          </div>
        </motion.div>

     
 <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="relative flex items-center justify-center"
>

  <AstroGlobe />
</motion.div>
      </div>
    </section>
  );
}
