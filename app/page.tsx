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


export default function Page() {
useEffect(() => {
// Prevent flashing scrollbar shift on mount
document.documentElement.style.scrollBehavior = "smooth";
}, []);


return (
<main className="relative min-h-screen bg-black text-white overflow-x-hidden">
{/* Subtle animated starfield */}
<StarsBg />
{/* Glow gradients */}
<div className="pointer-events-none fixed inset-0">
<div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
<div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-indigo-500/10 blur-3xl" />
</div>


<Navbar />
<Hero />
<Contact />

<About />
<Services />
<Horoscope />
<Reviews />
<Blogs />
<CTA />
<Footer />
</main>
);
}