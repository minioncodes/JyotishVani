"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { truncateHtml } from "@/lib/truncate_html";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);
  const [displayBlogs, setDisplayBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/blog/all-blogs");
        const data = await res.json();
        if (res.ok) {
          setBlogs(data.blogs);
        } else {
          setError(data.msg || "Failed to fetch blogs");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
        setDisplayBlogs(blogs);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
        setDisplayBlogs(blogs);
      } else {
        setCardsPerView(1);
        setDisplayBlogs(blogs); 
      }
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, [blogs]);

  if (loading) return <p className="p-6 text-center">Loading blogs...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (blogs.length === 0) return <p className="text-center">No blogs found.</p>;

  const maxIndex = Math.max(0, displayBlogs.length - cardsPerView);

  return (
    <section id="blogs" className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center font-[Cinzel] text-black">
          Whispers from the <span className="text-[#B22222]">Stars</span>
        </h1>
      {cardsPerView === 1 ? (
        <div className="relative w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayBlogs[index]?._id}
              className="rounded-md shadow-md bg-white/10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {displayBlogs[index]?.image && (
                <Image
                  width={600}
                  height={192}
                  src={displayBlogs[index].image!}
                  alt={displayBlogs[index].title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 flex flex-col h-[220px] justify-between">
                <h2 className="text-md font-semibold mb-2 line-clamp-2 text-black">
                  {displayBlogs[index]?.title}
                </h2>
                <p
                  className="text-sm text-gray-700 mb-4 line-clamp-3 italic"
                  dangerouslySetInnerHTML={{
                    __html: truncateHtml(displayBlogs[index]?.description || "", 150),
                  }}
                />
                <Link
                  href={`/single-blog/${displayBlogs[index]?._id}`}
                  className="mt-auto inline-block text-center bg-[#B22222] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left / Right Arrows */}
          <button
            onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
            disabled={index === 0}
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-30"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => setIndex((prev) => Math.min(prev + 1, displayBlogs.length - 1))}
            disabled={index === displayBlogs.length - 1}
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-30"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      ) : (
        // 💻 Tablet + Desktop: carousel
        <>
          <motion.div
            className="flex gap-4"
            animate={{ x: `-${index * (100 / cardsPerView)}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {displayBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="flex-shrink-0 w-[calc(100%/1-0.5rem)] sm:w-[calc(100%/2-0.5rem)] lg:w-[calc(100%/4-0.75rem)] 
                bg-white/10 shadow-md hover:shadow-[0_0_20px_#B22222] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
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
                <div className="p-4 flex flex-col h-[220px] justify-between">
                  <h2 className="text-md font-semibold mb-2 line-clamp-2 text-black group-hover:text-[#B22222] transition">
                    {blog.title}
                  </h2>
                  <p
                    className="text-sm text-gray-700 mb-4 line-clamp-3 italic"
                    dangerouslySetInnerHTML={{
                      __html: truncateHtml(blog.description, 150),
                    }}
                  />
                  <Link
                    href={`/single-blog/${blog._id}`}
                    className="mt-auto inline-block text-center bg-[#B22222] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-[#B22222]" : "bg-gray-400/50"
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
