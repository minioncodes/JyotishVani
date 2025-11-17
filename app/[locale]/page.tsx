"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Blogs from "@/components/Blogs";
import Horoscope from "@/components/Horoscope";
import StarsBg from "@/components/StarBg";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/90 to-[#F5EFE4] text-[#2B2B2B] overflow-x-hidden">

      <Hero />
      <About />
      <Services />
      <Horoscope />
      <Reviews />
      <Blogs />
      <CTA />
    </main>
  );
}
