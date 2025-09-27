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
  <Navbar />


  <div className="fixed inset-0 -z-10 bg-black text-white">
    <StarsBg />
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-indigo-500/10 blur-3xl" />
    </div>
  </div>

  {/* Blog Content */}
  <div className="p-6 max-w-3xl mx-auto relative z-10 mt-20">

    {blog.title && (
      <h1 className="text-4xl font-bold mb-6 text-center text-white font-[Cinzel]">
        {blog.title}
      </h1>
    )}

    {/* Blog image */}   {blog.image && (
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full rounded-xl shadow-2xl mb-2"
      />
    )}


    <div
      className="prose prose-lg prose-invert max-w-none mb-2 break-words  text-white backdrop-blur-xl  p-6 md:p-8 rounded-2xl shadow-lg"
      dangerouslySetInnerHTML={{ __html: blog.description }}
    />
    <div className="text-sm text-gray-400 space-y-1  text-start">
      <p>🕑 Posted: {new Date(blog.createdAt).toLocaleString()}</p>
      {/* {blog.updatedAt && (
        <p>✍️ Updated: {new Date(blog.updatedAt).toLocaleString()}</p>
      )} */}
    </div>

 
  </div>

  <Footer />
 </>
  );
}
