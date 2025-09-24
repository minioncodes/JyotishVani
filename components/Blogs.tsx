"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
        if (res.ok) {
          setBlogs(data.blogs);
        } else {
          setError(data.msg || "failed to fetch blogs");
        }
      } catch (err) {
        setError("something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading blogs...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">All Blogs</h1>
      {blogs.length === 0 && <p>No blogs found.</p>}

      <div className="space-y-6">
        {blogs.map((blog) => (
          <Link href={`/single-blog/${blog._id}`}>
            <div key={blog._id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="mb-2">{blog.description}</p>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="mt-2 rounded shadow"
                />
              )}
              <p className="mt-2 text-sm text-gray-500">
                Created at: {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
