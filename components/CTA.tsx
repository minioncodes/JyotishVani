"use client";


import { motion } from "framer-motion";


export default function CTA() {
return (
<section className="relative px-6 py-20 md:py-28">
<div className="mx-auto max-w-4xl text-center">
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.4 }}
transition={{ duration: 0.6 }}
className="rounded-3xl border border-white/10 bg-black/50 p-10 shadow-2xl backdrop-blur-xl"
>
<h3 className="text-3xl md:text-4xl font-bold">
Ready to find clarity?
</h3>
<p className="mt-3 text-gray-300">
Book a session now and receive a pre‑reading questionnaire to maximize insights.
</p>
<a
href="#contact"
className="mt-6 inline-block rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold shadow-lg"
>
Book Your Session
</a>
</motion.div>
</div>
</section>
);
}