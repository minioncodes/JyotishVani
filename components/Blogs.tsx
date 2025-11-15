"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { truncateHtml } from "@/lib/truncate_html";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLocale, useTranslations } from "next-intl";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locale = useLocale();
  const t = useTranslations("blogs");

  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);

  // ========================
  // Fetch Blogs
  // ========================
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/blog/all-blogs', {
          cache: "no-store",
        });
        const data = await res.json();

        if (res.ok) setBlogs(data.blogs);
        else setError(data.msg || t("error"));
      } catch {
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [locale, t]);

  // ========================
  // Responsive cards per view
  // ========================
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth >= 1024) setCardsPerView(4);
      else if (window.innerWidth >= 640) setCardsPerView(2);
      else setCardsPerView(1);
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  if (loading)
    return <p className="p-6 text-center">{t("loading")}</p>;

  if (error)
    return <p className="p-6 text-center text-red-500">{error}</p>;

  if (blogs.length === 0)
    return <p className="text-center">{t("noBlogs")}</p>;

  const maxIndex = Math.max(0, blogs.length - cardsPerView);

  return (
    <section id="blogs" className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-8 text-center font-[Cinzel] text-black">
          {t("heading")}{" "}
          <span className="text-[#B22222]">{t("headingHighlight")}</span>
        </h1>

        {/* ========== MOBILE VIEW (1 card swipe) ========== */}
        {cardsPerView === 1 ? (
          <div className="relative w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={blogs[index]?._id}
                className="rounded-xl bg-white/90 shadow-lg overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
              >
                {blogs[index]?.image && (
                  <Image
                    width={600}
                    height={192}
                    src={blogs[index].image!}
                    alt={blogs[index].title}
                    className="w-full h-44 object-cover"
                  />
                )}

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                    {blogs[index]?.title}
                  </h2>

                  <p
                    className="text-sm text-gray-700 italic line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: truncateHtml(blogs[index]?.description || "", 150),
                    }}
                  />

                  <Link
                    href={`/single-blog/${blogs[index]?._id}`}
                    className="mt-4 block text-center bg-[#B22222] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black transition"
                  >
                    {t("viewDetails")}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <button
              onClick={() => setIndex((p) => Math.max(p - 1, 0))}
              disabled={index === 0}
              className="absolute top-1/2 -left-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full disabled:opacity-30"
              aria-label={t("prev")}
            >
              <FiChevronLeft />
            </button>

            <button
              onClick={() => setIndex((p) => Math.min(p + 1, blogs.length - 1))}
              disabled={index === blogs.length - 1}
              className="absolute top-1/2 -right-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full disabled:opacity-30"
              aria-label={t("next")}
            >
              <FiChevronRight />
            </button>
          </div>
        ) : (
          /* ========== DESKTOP + TABLET CAROUSEL ========== */
          <>
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{ x: `-${index * (100 / cardsPerView)}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ width: `${(blogs.length / cardsPerView) * 100}%` }}
              >
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="rounded-xl bg-white/90 shadow-md flex-shrink-0 w-[calc(100%/4-1rem)] sm:w-[calc(100%/2-1rem)] lg:w-[calc(100%/4-1rem)] overflow-hidden border border-[#B22222]/20"
                  >
                    {blog.image && (
                      <Image
                        width={600}
                        height={192}
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-40 object-cover"
                      />
                    )}

                    <div className="p-4 flex flex-col h-[210px] justify-between">
                      <h2 className="text-md font-semibold mb-2 text-black line-clamp-2">
                        {blog.title}
                      </h2>

                      <p
                        className="text-sm text-gray-700 mb-3 italic line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: truncateHtml(blog.description, 150),
                        }}
                      />

                      <Link
                        href={`/single-blog/${blog._id}`}
                        className="mt-auto inline-block text-center bg-[#B22222] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-black transition"
                      >
                        {t("viewDetails")}
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-5 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                title="btn"
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    i === index ? "bg-[#B22222]" : "bg-gray-400/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
