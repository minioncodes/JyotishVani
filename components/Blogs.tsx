"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { truncateHtml } from "@/lib/truncate_html";

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

  // Responsive cards per view
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
        setDisplayBlogs(blogs); // all blogs for desktop
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
        setDisplayBlogs(blogs); // all blogs for tablets
      } else {
        setCardsPerView(1);
        // 🎲 pick 4 random blogs for phones
        const shuffled = [...blogs].sort(() => 0.5 - Math.random());
        setDisplayBlogs(shuffled.slice(0, 4));
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
    <div className="p-6 mx-auto">
      <h1 className="mt-[100px] text-3xl font-bold mb-6 text-center font-[Cinzel] text-black">
        Whispers from the <span className="text-[#C5A46D]">Stars</span>
      </h1>

      {/* Carousel */}
      <div>
        <motion.div
          className="flex space-x-4"
          animate={{ x: `-${index * (100 / cardsPerView)}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {displayBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="flex-shrink-0 w-[calc(100%/1-0.5rem)] sm:w-[calc(100%/2-0.5rem)] lg:w-[calc(100%/4-0.75rem)] 
              bg-white/10 z-auto
              shadow-md hover:shadow-[0_0_20px_#C5A46D] overflow-hidden transition-all duration-300"
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
                <h2 className="text-md font-semibold mb-2 line-clamp-2 text-black group-hover:text-[#C5A46D] transition">
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
                  className="mt-auto inline-block text-center bg-[#C5A46D] text-black px-3 py-1.5 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-[#C5A46D]" : "bg-gray-400/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
