"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // App Router hook to get route params

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

export default function EditBlogPage() {
  const params = useParams();
  const blogId = params?.id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/single-blog/${blogId}`);
        const data = await res.json();
        if (res.ok) {
          setBlog(data);
          setTitle(data.title);
          setDescription(data.description);
        } else {
          setError(data.msg || "Failed to fetch blog");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return alert("Title and description required");
    const blogId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    if (!blogId) return alert("Blog ID missing");
    const formData = new FormData();
    if (!blogId) return alert("Blog ID missing");
    formData.append("blogId", blogId ?? "");
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    setLoading(true);
    try {
      const res = await fetch("/api/blog/edit-blog", {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.updatedBlog);
      } else {
        setError(data.msg || "Failed to update blog");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!blog) return <p className="p-6 text-center">Loading blog...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {blog.image && (
          <img
            src={blog.image}
            alt="Current blog"
            className="mt-2 w-full rounded shadow"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>

      {result && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold">Updated Blog</h2>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>

          {result.image && (
            <img
              src={result.image}
              alt="Updated Blog"
              className="mt-4 rounded-lg shadow"
            />
          )}
        </div>
      )}
    </div>
  );
}
