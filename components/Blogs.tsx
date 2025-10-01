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
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  if (loading) return <p className="p-6 text-center">Loading blogs...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (blogs.length === 0) return <p className="text-center">No blogs found.</p>;

  const maxIndex = Math.max(0, blogs.length - cardsPerView);

  return (
    <div className="p-6 mx-auto">
      <h1 className="mt-[100px] text-3xl font-bold mb-6 text-center font-[Cinzel] text-black">
        Whispers from the <span className="text-[#C5A46D]">Stars</span>
      </h1>


      {/* Carousel */}
      <div className="overflow-hidden">
        <motion.div
          className="flex space-x-4"
          animate={{ x: `-${index * (100 / cardsPerView)}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="flex-shrink-0 w-[calc(100%/2-0.5rem)] lg:w-[calc(100%/4-0.75rem)] rounded-sm bg-white/90 shadow-md hover:shadow-xl overflow-hidden"
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
              <div className="p-4 flex flex-col h-[220px]">
                <h2 className="text-md font-semibold mb-1 line-clamp-2 text-black">
                  {blog.title}
                </h2>
                {/* <p className="text-sm text-gray-700 flex-1 line-clamp-3">
                  {blog.description}
                </p> */}
                <p className="text-sm text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: truncateHtml(blog.description, 150), // trims to ~150 chars but keeps tags
                  }}>

                </p>

              <Link
                href={`/single-blog/${blog._id}`}
                className="mt-2 inline-block text-center bg-[#C5A46D] text-black px-3 py-1.5 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
              >
                View Details
              </Link>
            </div>
            </motion.div>
          ))}
      </motion.div>
    </div>

      {/* Dots */ }
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
    </div >
  );
}
