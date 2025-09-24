"use client";


import { motion } from "framer-motion";
import { FiStar, FiHeart, FiBriefcase, FiClock } from "react-icons/fi";


const services = [
{
icon: <FiHeart />, // Love & Relationships
title: "Love & Relationships",
desc: "Clarity on compatibility, timing, and healing patterns. Synastry + transit-based guidance.",
price: "₹1,999 / 30 min",
},
{
icon: <FiBriefcase />, // Career & Finance
title: "Career & Finance",
desc: "Find the right moves and timings for growth, switches, or launches. Practical and time-bound.",
price: "₹2,499 / 45 min",
},
{
icon: <FiClock />, // Muhurat
title: "Shubh Muhurat",
desc: "Pick auspicious dates for marriage, moves, openings, investments—aligned with your chart.",
price: "₹1,499 / slot",
},
{
icon: <FiStar />, // Birth Chart
title: "Birth Chart Reading",
desc: "Complete Kundli reading with remedies, strengths, challenges, and yearly transit roadmap.",
price: "₹3,999 / 60 min",
},
];


export default function Services() {
return (
<section id="services" className="relative px-6 py-20 md:py-28">
<div className="mx-auto max-w-6xl">
<div className="mb-8 md:mb-12 flex items-end justify-between">
<h2 className="text-3xl md:text-4xl font-bold">Services</h2>
<span className="text-sm text-gray-400">Transparent pricing • Secure online sessions</span>
</div>


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
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
>
{services.map((s) => (
<motion.div
key={s.title}
variants={{ hidden: { y: 18, opacity: 0 }, show: { y: 0, opacity: 1 } }}
whileHover={{ y: -4 }}
className="group rounded-3xl border border-white/10 bg-black/50 p-5 shadow-xl backdrop-blur-xl"
>
<div className="flex items-center justify-between">
<div className="text-xl opacity-80">{s.icon}</div>
<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
{s.price}
</span>
</div>
<h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
<p className="mt-2 text-gray-300 text-sm leading-relaxed">{s.desc}</p>
<a
href="#contact"
className="mt-5 inline-block rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
>
Book this
</a>
</motion.div>
))}
</motion.div>
</div>
</section>
);
}