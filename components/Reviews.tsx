"use client";


import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import Image from "next/image";

type Review = {
  name: string;
  role: string;
  text: string;
  rating: number; // 1–5
  avatar?: string;
};

const reviews: Review[] = [
  {
    name: "Anjali S.",
    role: "Entrepreneur",
    text:
      "Parul’s reading gave me sharp clarity on career timing. Practical remedies + exact timelines. Felt seen and guided.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rahul M.",
    role: "Designer",
    text:
      "Loved how grounded it was—no fluff. Insights on my Saturn period were spot on. Left with a clear plan.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    name: "Meera K.",
    role: "Student",
    text:
      "The synastry session helped me understand patterns I keep repeating. Gentle, accurate, and empowering.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    name: "Dev P.",
    role: "Founder",
    text:
      "Business launch muhurat worked wonders. Sales spiked in week one. Detailed, time-bound guidance.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Rhea T.",
    role: "Product Manager",
    text:
      "Transit insights reduced my anxiety. I finally know what to focus on this quarter. Highly recommend.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Aman J.",
    role: "Consultant",
    text:
      "Crystal-clear reading with actionable steps. The follow-up notes were gold. Worth every rupee.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function Reviews() {
  return (
    <section id="testimonials" className="relative px-6 py-20 md:py-28">
      {/* soft cosmic sheen */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_10%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(600px_200px_at_90%_90%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 rounded-2xl border border-white/10 bg-black/50 p-6 shadow-2xl backdrop-blur-xl"
        >
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
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reviews.map((r, idx) => (
            <motion.article
              key={idx}
              variants={item}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl border border-white/10 bg-black/50 p-6 shadow-xl backdrop-blur-xl"
            >
              {/* top row: avatar + name */}
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/5">
                  {r.avatar ? (
                    <Image
                      src={r.avatar}
                      alt={r.name}
                      height={48}
                      width={48
                      }
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

              {/* subtle glow accent */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl ring-1 ring-white/5" />
            </motion.article>
          ))}
        </motion.div>

        {/* CTA under reviews */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex items-center justify-center"
        >
          <a
            href="#contact"
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold shadow-lg hover:opacity-95"
          >
            Book your session
          </a>
        </motion.div>
      </div>
    </section>
  );
}
