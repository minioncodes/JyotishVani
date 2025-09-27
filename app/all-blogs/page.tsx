"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsBg from "@/components/StarBg";

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
      } catch (err) {
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
      <Navbar />

      {/* Starry Background */}
      <div className="fixed inset-0 -z-10 bg-black">
        <StarsBg />
        {/* Glow gradients layered on top */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
      </div>

      {/* Blogs Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 relative z-10">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-center font-[Cinzel] mb-10 text-white">
          Whispers from the Stars ✨
        </h1>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border border-white/10 rounded-lg shadow-lg hover:shadow-xl transition bg-black/60 backdrop-blur-xl overflow-hidden"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-white">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                  {blog.description}
                </p>
                <Link
                  href={`/single-blog/${blog._id}`}
                  className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
