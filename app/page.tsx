"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Blogs from "@/components/Blogs";
import StarsBg from "@/components/StarBg";
import Horoscope from "@/components/Horoscope";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#FAF9F6] text-black overflow-x-hidden">
      <StarsBg />

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-[#B22222]/15 blur-3xl" />
        <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-[#E68F8F]/20 blur-3xl" />
      </div>

      <Hero />
      <About />
      <Services />
      <Horoscope/>
      <Reviews />
      <Blogs />
      <CTA />
    </main>
  );
}
