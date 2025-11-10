"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsBg from "@/components/StarBg";
import Image from "next/image";

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

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/blog/all-blogs");
        const data = await res.json();
        if (res.ok) setBlogs(data.blogs);
        else setError(data.msg || "Failed to fetch blogs");
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading blogs...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (blogs.length === 0) return <p className="text-center">No blogs found.</p>;

  return (
    <>
      


      <div className="fixed inset-0 -z-10 bg-[#FAF8F3]">
        <StarsBg />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-[#C5A46D]/15 blur-3xl" />
          <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-[#C5A46D]/15 blur-3xl" />
        </div>
      </div>

      {/* Blogs Content */}
      <div className="max-w-6xl mx-auto px-6 py-14 relative z-10">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mt-[100px] font-[Cinzel] mb-12 text-black">
          Whispers from the <span className="text-[#C5A46D]">Stars ✨</span>
        </h1>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-2xl border border-[#C5A46D]/30 bg-white/90 shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {blog.image && (
                <Image
                width={600}
                  height={192}
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 flex flex-col">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-black">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-700 line-clamp-3 mb-4"
                dangerouslySetInnerHTML={{ __html: blog.description }}
                >
                </p>
                <Link
                  href={`/single-blog/${blog._id}`}
                  className="inline-block rounded-xl bg-[#C5A46D] text-black px-4 py-2 text-sm font-medium shadow hover:bg-black hover:text-white transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </>
  );
}
