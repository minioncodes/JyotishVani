"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsBg from "@/components/StarBg";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Blog {
    _id: string;
    title: string;
    description: string;
    image?: string;
    createdAt: string;
}

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deleteBlogLoading, setDeleteBlogLoading] = useState(false);
    const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();
    const blogId = params?.id;
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
    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;
        setDeletingBlogId(id);
        try {
            const res = await fetch(`/api/blog/delete-blog/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (res.ok) {
                alert("Blog deleted successfully!");
                setBlogs((prev) => prev.filter((b) => b._id !== id));
            } else {
                alert(data.msg || "Failed to delete blog");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while deleting");
        } finally {
            setDeletingBlogId(null);
        }
    };
    if (loading) return <p className="p-6 text-center">Loading blogs...</p>;
    if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
    if (blogs.length === 0) return <p className="text-center">No blogs found.</p>;
    return (
        <>
            <div className="fixed inset-0 -z-10 bg-[#FAF8F3]">
                <StarsBg />
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 -left-32 h-[44rem] w-[44rem] rounded-full bg-[#B22222]/15 blur-3xl" />
                    <div className="absolute -bottom-48 -right-32 h-[44rem] w-[44rem] rounded-full bg-[#B22222]/15 blur-3xl" />
                </div>
            </div>
            {/* Blogs Content */}
            <div className="max-w-6xl mx-auto px-6 py-14 relative z-10">
                {/* Page Heading */}
                <h1 className="text-4xl md:text-5xl font-bold text-center font-[Cinzel] mb-12 text-black">
                    Whispers from the <span className="text-[#B22222]">Stars ✨</span>
                </h1>

                {/* Blog Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="rounded-2xl border border-[#B22222]/30 bg-white/90 shadow-md hover:shadow-lg transition overflow-hidden"
                        >
                            {blog.image && (
                                <img
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
                                    className="inline-block rounded-xl bg-[#B22222] text-black px-4 py-2 text-sm font-medium shadow hover:bg-black hover:text-white transition"
                                >
                                    Read More
                                </Link>
                            </div>
                            <div className="flex justify-between">
                                <Link href={`/admin/edit-blog/${blog._id}`}>
                                    <button className="text-black text-lg font-medium bg-yellow-400 rounded-full px-4 py-1 m-2 cursor-pointer">
                                        Edit Blog
                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    disabled={deletingBlogId === blog._id}
                                    className="bg-red-700  text-lg font-medium text-white rounded-full px-4 py-1 m-2 cursor-pointer"
                                    onClick={() => handleDelete(blog._id)}
                                >
                                    {deletingBlogId === blog._id ? "Deleting..." : "Delete Blog"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
