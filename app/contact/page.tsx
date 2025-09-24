"use client";

import { motion } from "framer-motion";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { FiCheckCircle, FiClock, FiMapPin, FiPhone, FiMail, FiHelpCircle, FiExternalLink } from "react-icons/fi";
import CTA from "@/components/CTA";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-black text-white">
      
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/15 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-indigo-600/15 blur-3xl" />
        </div>

       
        <HeaderHero />

        
        <TrustStrip />

              <Contact />
        <section className="relative px-6 py-10 md:py-14">
          <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-3 gap-6">
         
          
        

          </div>
            <div className="space-y-6">
           
              <HoursLocationCard />
              <QuickLinksCard />
            </div>
        </section>

        <FAQSection />

   
        <CTA />
      </main>

      <Footer />
    </>
  );
}

/* ---------- Header hero ---------- */
function HeaderHero() {
  return (
    <section className="relative px-6 pt-28">
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl"
      >
      
        <nav className="text-sm text-gray-400 mb-3">
          <a href="/" className="hover:text-gray-200">Home</a>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Contact</span>
        </nav>

        <div className="rounded-3xl border border-white/10 bg-black/50 p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold">Let’s connect.</h1>
          <p className="mt-3 text-gray-300 max-w-2xl">
            Share your birth details and your main concern—love, career, finance, or timing—and I’ll reply within
            24 hours with next steps and available slots.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1">Vedic • Transit • Tarot</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1">Online / In-person (Delhi)</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1">Secure & private</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Trust strip ---------- */
function TrustStrip() {
  const items = [
    { icon: <FiCheckCircle />, label: "1,000+ sessions", sub: "Since 2017" },
    { icon: <FiClock />, label: "Avg. reply: 4h", sub: "Mon–Sat, 10am–7pm IST" },
    { icon: "⭐️⭐️⭐️⭐️⭐️", label: "5.0 rating", sub: "Verified reviews" },
  ];
  return (
    <section className="relative px-6 py-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="text-lg opacity-90">{it.icon}</div>
              <div>
                <div className="font-semibold">{it.label}</div>
                <div className="text-xs text-gray-400">{it.sub}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Right rail cards ---------- */
function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl shadow-xl"
    >
      {children}
    </motion.div>
  );
}

function HoursLocationCard() {
  return (
    <CardWrapper>
      <h3 className="text-lg font-semibold">Hours & Location</h3>
      <div className="mt-3 text-sm text-gray-300">
        <div className="flex items-center gap-2"><FiClock /> Mon–Sat • 10am–7pm IST</div>
        <div className="mt-2 flex items-center gap-2"><FiMapPin /> Delhi (in-person) • Google Meet (online)</div>
      </div>
      {/* Map placeholder box; replace with iframe if you have a location */}
      <div className="mt-4 h-40 w-full rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-xs text-gray-400">
        Add Google Maps iframe here
      </div>
    </CardWrapper>
  );
}

function QuickLinksCard() {
  const links = [
    { href: "#services", label: "View services & pricing" },
    { href: "#testimonials", label: "Read client reviews" },
    { href: "#blogs", label: "Latest blog insights" },
    { href: "#contact", label: "Contact form" },
  ];
  return (
    <CardWrapper>
      <h3 className="text-lg font-semibold">Quick Links</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="flex items-center gap-2 hover:text-gray-100">
              <FiExternalLink /> {l.label}
            </a>
          </li>
        ))}
      </ul>
    </CardWrapper>
  );
}

/* ---------- FAQ ---------- */
function FAQSection() {
  const faqs = [
    {
      q: "What details do you need for an accurate reading?",
      a: "Your full name, date of birth, exact birth time, and place of birth. For synastry, details for both people.",
    },
    {
      q: "How are sessions conducted?",
      a: "Online via Google Meet or in-person (Delhi). You’ll receive a meeting link and a short pre-reading form.",
    },
    {
      q: "Do you provide remedies?",
      a: "Yes—personalized, practical remedies (mantra, routine, gemstones only if needed). No fear-based upselling.",
    },
    {
      q: "What is the reschedule/cancel policy?",
      a: "Free reschedule up to 12 hours before the session. Refunds available if you cancel 24 hours prior.",
    },
  ];

  return (
    <section className="relative px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-gray-300">
            Quick answers to common queries. Still unsure? Reach out and I’ll help you decide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqs.map((f, i) => (
            <FAQItem key={i} question={f.q} answer={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-xl shadow-xl"
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium">{question}</span>
        <FiHelpCircle className={`transition-transform ${open ? "rotate-45" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="mt-3 text-sm text-gray-300">{answer}</p>
      </motion.div>
    </motion.div>
  );
}
