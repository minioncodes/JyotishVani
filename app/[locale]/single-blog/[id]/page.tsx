"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
}

export default function Page() {
  const params = useParams();
  const blogId = params.id;
const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;
      setLoading(true);

      try {
        const res = await fetch(`/api/blog/single-blog/${blogId}`);
        const data = await res.json();

        if (res.ok) setBlog(data.blog);
        else setError(data.msg || "Blog not found");
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading)
    return (
      <div className="mt-32 max-w-3xl mx-auto px-6 animate-pulse">
        <div className="h-10 w-3/4 mx-auto bg-gray-300 rounded-lg mb-6"></div>
        <div className="h-72 bg-gray-300 rounded-xl mb-6"></div>
        <div className="h-4 w-full bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded mb-3"></div>
        <div className="h-4 w-4/6 bg-gray-300 rounded"></div>
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-28 text-lg text-red-600 font-semibold">
        {error}
      </p>
    );

  if (!blog) return null;

  return (
    <div className="relative min-h-screen pb-20">

      {/* HEADER IMAGE */}
      {blog.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-[360px] md:h-[480px] overflow-hidden"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent"></div>
        </motion.div>
      )}

      {/* TITLE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 mt-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#111] leading-tight font-[Cinzel]">
          {blog.title}
        </h1>

        <p className="mt-4 text-gray-500 text-sm">
          Posted on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </motion.div>

      {/* CONTENT AREA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto mt-12 px-6"
      >
        <div className="bg-white shadow-xl border border-gray-200/40 rounded-2xl p-8 md:p-10 leading-[1.85] text-[17px] text-gray-900 tracking-wide">

          {/* DROP CAP STYLE */}
          <style>
            {`
              .dropcap:first-letter {
                float: left;
                font-size: 4.5rem;
                line-height: 3.5rem;
                padding-right: 12px;
                padding-top: 6px;
                color: #B22222;
                font-weight: bold;
                font-family: 'Cinzel', serif;
              }
            `}
          </style>

          {/* DESCRIPTION */}
          <div
            className="dropcap"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* QUOTE BOX (Auto inserted) */}
          <div className="mt-10 mb-4 border-l-4 border-[#B22222] pl-4 italic text-gray-700 text-lg">
            “The stars whisper, but wisdom listens.”
          </div>

        </div>
      </motion.div>
    </div>
  );
}
