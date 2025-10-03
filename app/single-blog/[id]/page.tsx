"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsBg from "@/components/StarBg";

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
    <>
      

   
      <div className="fixed inset-0 -z-10 bg-[#FAF8F3]">
        <StarsBg />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-[#C5A46D]/15 blur-3xl" />
          <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-[#C5A46D]/15 blur-3xl" />
        </div>
      </div>

 
      <div className="p-6 max-w-3xl mx-auto relative z-10 mt-24">
        {blog.title && (
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center font-[Cinzel] text-black">
            {blog.title}
          </h1>
        )}

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full rounded-xl shadow-lg mb-6"
          />
        )}

      
        <div
          className="prose prose-lg max-w-none mb-6 break-words bg-white/90 border border-[#C5A46D]/30 p-6 md:p-8 rounded-2xl shadow-md text-gray-900"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

 
        <div className="text-sm text-gray-500 space-y-1">
          <p>🕑 Posted: {new Date(blog.createdAt).toLocaleString()}</p>
          {/* <p>✍️ Updated: {new Date(blog.updatedAt).toLocaleString()}</p> */}
        </div>
      </div>

      
    </>
  );
}
