"use client";


import { motion } from "framer-motion";


export default function About() {
return (
<section id="about" className="relative px-6 py-20 md:py-28">
<div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-8">
<motion.div
initial={{ x: -30, opacity: 0 }}
whileInView={{ x: 0, opacity: 1 }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.6 }}
className="rounded-3xl border border-white/10 bg-black/50 p-6 md:p-8 shadow-2xl backdrop-blur-xl"
>
<h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
<p className="mt-3 text-gray-300">
I'm Parul, a practicing astrologer with 8+ years helping clients align actions with cosmic cycles. I combine
Vedic, transit analysis, and tarot for grounded guidance.
</p>
<ul className="mt-5 space-y-3 text-gray-300">
<li>• Birth Chart (Kundli) decoding with remedies</li>
<li>• Career & Business timing (Dasha/Transit)</li>
<li>• Relationships & Synastry insights</li>
<li>• Muhurat selection for important events</li>
</ul>
</motion.div>
<motion.div
initial={{ x: 30, opacity: 0 }}
whileInView={{ x: 0, opacity: 1 }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.6 }}
className="rounded-3xl border border-white/10 bg-black/50 p-0 shadow-2xl backdrop-blur-xl overflow-hidden"
>
<div className="aspect-[4/3] w-full bg-[linear-gradient(135deg,rgba(255,255,255,.08),transparent)]" />
<div className="p-6 md:p-8">
<h3 className="text-xl font-semibold">Why clients trust me</h3>
<p className="mt-2 text-gray-300">
Sessions are empathetic yet practical. You leave with clarity, timelines, and doable next steps—not
superstition.
</p>
</div>
</motion.div>
</div>
</section>
);
}