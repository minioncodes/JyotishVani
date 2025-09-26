"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import Image from "next/image";

type Review = {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
};

const reviews: Review[] = [
  {
    name: "Anjali S.",
    role: "Entrepreneur",
    text:
      "Parul’s reading gave me sharp clarity on career timing. Practical remedies + exact timelines.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rahul M.",
    role: "Designer",
    text:
      "Loved how grounded it was—no fluff. Insights on my Saturn period were spot on.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    name: "Meera K.",
    role: "Student",
    text:
      "The synastry session helped me understand patterns I keep repeating. Gentle and empowering.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Dev P.",
    role: "Founder",
    text:
      "Business launch muhurat worked wonders. Sales spiked in week one.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Rhea T.",
    role: "Product Manager",
    text:
      "Transit insights reduced my anxiety. I finally know what to focus on this quarter.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman J.",
    role: "Consultant",
    text:
      "Crystal-clear reading with actionable steps. The follow-up notes were gold.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function Reviews() {
  return (
    <section id="testimonials" className="relative px-6 py-20 md:py-28 overflow-hidden">
      {/* soft cosmic sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_10%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(600px_200px_at_90%_90%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 rounded-2xl border border-white/10 bg-black/50 p-6 shadow-2xl backdrop-blur-xl">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
            <p className="mt-2 text-gray-300">
              Real experiences. Real results. Compassionate, accurate, and actionable guidance.
            </p>
          </div>

          {/* rating badge */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <div className="flex -mr-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="h-4 w-4 text-yellow-300" />
              ))}
            </div>
            <span className="text-sm text-gray-200">5.0 average • 1k+ sessions</span>
          </div>
        </div>

        {/* Marquee Reviews */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...reviews, ...reviews].map((r, idx) => (
              <div
                key={idx}
                className="w-80 flex-shrink-0 rounded-3xl border border-white/10 bg-black/50 p-6 shadow-xl backdrop-blur-xl"
              >
                {/* top row: avatar + name */}
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                    {r.avatar ? (
                      <Image
                        src={r.avatar}
                        alt={r.name}
                        height={48}
                        width={48}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.role}</div>
                  </div>
                </div>

                {/* rating */}
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-4 w-4 ${i < r.rating ? "text-yellow-300" : "text-gray-600"}`}
                    />
                  ))}
                </div>

                {/* text */}
                <p className="mt-3 text-gray-200 leading-relaxed">“{r.text}”</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA under reviews */}
        <div className="mt-10 flex items-center justify-center">
          <a
            href="#contact"
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold shadow-lg hover:opacity-95"
          >
            Book your session
          </a>
        </div>
      </div>
    </section>
  );
}
