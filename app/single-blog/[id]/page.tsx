"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const params = useParams();
  const blogId = params.id;

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
        if (res.ok) {
          setBlog(data.blog);
        } else {
          setError(data.msg || "Blog not found");
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (loading) return <p className="p-6 text-center">Loading blog...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!blog) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {blog.title && <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>}

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-lg shadow mb-6"
        />
      )}
      <div
        className="prose prose-lg max-w-none mb-8 break-words"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      <div className="text-sm text-gray-500 space-y-1 mb-6">
        <p>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
        <p>Updated at: {new Date(blog.updatedAt).toLocaleString()}</p>
      </div>

      {/* Edit button */}
      <Link href={`/edit-blog/${blog._id}`}>
        <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Edit Blog
        </button>
      </Link>
    </div>
  );
}
