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
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full rounded shadow mb-4"
                />
            )}
            <p className="mb-4">{blog.description}</p>
            <p className="text-sm text-gray-500">
                Created at: {new Date(blog.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
                Updated at: {new Date(blog.updatedAt).toLocaleString()}
            </p>
            <Link href={`/edit-blog/${blog._id}`}>
                <button className="bg-blue-900 cursor-pointer">
                    Edit Blog
                </button>
            </Link>
        </div>
    );
}
