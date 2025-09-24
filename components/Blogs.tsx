"use client";

import { motion } from "framer-motion";

const blogs = [
  {
    title: "How Your Birth Chart Shapes Career Choices",
    excerpt:
      "Discover how planetary placements influence your professional path and what timing works best for transitions.",
    date: "Sept 15, 2025",
    readTime: "5 min read",
  },
  {
    title: "Love & Compatibility in Vedic Astrology",
    excerpt:
      "Explore how synastry charts reveal hidden patterns in relationships and compatibility with partners.",
    date: "Aug 28, 2025",
    readTime: "6 min read",
  },
  {
    title: "Top 5 Remedies for Saturn Transit",
    excerpt:
      "Practical remedies to balance Saturn’s influence — from mantras to lifestyle changes you can apply today.",
    date: "Jul 30, 2025",
    readTime: "4 min read",
  },
  {
    title: "Why Muhurat Matters: Choosing the Right Time",
    excerpt:
      "Timing is everything. Learn why starting events under the right planetary hours sets you up for success.",
    date: "Jun 18, 2025",
    readTime: "7 min read",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="relative px-6 py-20 md:py-28">
      {/* subtle cosmic bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_20%_20%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(600px_200px_at_80%_80%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Latest Blogs</h2>
          <p className="mt-2 text-gray-300">
            Insights, remedies, and cosmic wisdom for everyday life
          </p>
        </motion.div>

        {/* blog cards */}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {blogs.map((b, i) => (
            <motion.article
              key={i}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-white/10 bg-black/50 p-6 shadow-xl backdrop-blur-xl flex flex-col"
            >
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{b.date}</span>
                <span>{b.readTime}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-fuchsia-400 transition-colors">
                {b.title}
              </h3>
              <p className="mt-2 text-gray-300 text-sm leading-relaxed flex-grow">
                {b.excerpt}
              </p>
              <a
                href="#"
                className="mt-4 inline-block text-sm text-fuchsia-400 hover:text-fuchsia-300"
              >
                Read more →
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
