"use client";


import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StarsBg from "@/components/StarBg";
import Blogs from "@/components/Blogs";
import Horoscope from "@/components/Horoscope";
import TranslateButton from "@/components/TranslateButton";
import Translate from "@/components/Translate";



export default function Page() {
useEffect(() => {
// Prevent flashing scrollbar shift on mount
document.documentElement.style.scrollBehavior = "smooth";
}, []);


return (
<main className="relative min-h-screen bg-[#FAF9F6] text-black overflow-x-hidden">
  <StarsBg />

  {/* Glow gradients (swap neon with soft golden haze) */}
  <div className="pointer-events-none fixed inset-0">
    <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-[#C5A46D]/15 blur-3xl" />
    <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-[#E6D5B8]/20 blur-3xl" />
  </div>
  <Hero />
  {/* <Contact /> */}
  <TranslateButton/>
  <About />
  <Translate/>
  <Services />
  <Horoscope />
  <Reviews />
  <Blogs />
  <CTA />
  
</main>

);
}