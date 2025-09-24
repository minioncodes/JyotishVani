"use client";


import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";


const links = [
{ href: "/", label: "Home" },
{ href: "#about", label: "About" },
{ href: "#services", label: "Services" },
{ href: "#testimonials", label: "Testimonials" },
{ href: "/contact", label: "Contact" },
];


export default function Navbar() {
const [open, setOpen] = useState(false);


return (
<motion.nav
initial={{ y: -30, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6, ease: "easeOut" }}
className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2"
>
<div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl px-5 py-3 shadow-2xl">
<Link href="#home" className="text-lg md:text-xl font-bold tracking-wide">
✨ JyotishVani
</Link>
<div className="hidden md:flex items-center gap-7 text-gray-200">
{links.map((l) => (
<motion.a
key={l.href}
href={l.href}
whileHover={{ y: -2 }}
className="hover:text-white/90 transition-colors"
>
{l.label}
</motion.a>
))}
<a
href="#contact"
className="rounded-xl bg-white/10 px-4 py-2 text-sm border border-white/10 hover:bg-white/15"
>
Book Now
</a>
</div>
<button
className="md:hidden rounded-xl border border-white/10 bg-white/5 p-2"
onClick={() => setOpen((s) => !s)}
aria-label="Menu"
>
{open ? <FiX /> : <FiMenu />}
</button>
</div>


{/* Mobile drawer */}
<motion.div
initial={false}
animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
className="md:hidden overflow-hidden mt-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl"
>
<div className="flex flex-col p-4">
{links.map((l) => (
<a
key={l.href}
href={l.href}
className="py-3 text-gray-200 border-b border-white/10 last:border-none"
onClick={() => setOpen(false)}
>
{l.label}
</a>
))}
<a href="#contact" className="mt-3 rounded-xl bg-white/10 px-4 py-2 text-center border border-white/10">
Book Now
</a>
</div>
</motion.div>
</motion.nav>
);
}