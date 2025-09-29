"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { quillModules, quillFormats } from "@/utils/quilConfig";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TestBlogPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return alert("Description cannot be empty!");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const res = await fetch("/api/blog/create", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
        ✍️ Create a New Blog
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white shadow-lg rounded-xl p-6"
      >
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg px-4 py-2 text-gray-700 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill
          value={description}
          onChange={setDescription}
          theme="snow"
          modules={quillModules}
          formats={quillFormats}
          placeholder="Write your blog content here..."
          className="bg-white rounded-lg min-h-[200px]"
        />

        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
