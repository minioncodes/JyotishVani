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
  console.log("image = ", image);
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title (optional)"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          value={description}
          onChange={setDescription}
          theme="snow"
          modules={quillModules}
          formats={quillFormats}
          placeholder="Write your blog description here..."
          className="bg-white rounded-lg"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>

      {result && (
        <div className="mt-6 border-t pt-4">
          <h2 className="text-lg font-semibold">Result</h2>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>

          {result.newBlog?.image && (
            <img
              src={result.newBlog.image}
              alt="Uploaded Blog"
              className="mt-4 rounded-lg shadow"
            />
          )}
        </div>
      )}
    </div>
  );
}
