"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { quillModules, quillFormats } from "@/utils/quilConfig";
import { useRouter } from "next/navigation";


interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
}

export default function EditBlogPage() {
  const params = useParams();
  const blogId = params?.id;
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading,setDeleteLoading]=useState(false);
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
    if (!description) return alert("Title and description required");
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
      const res = await fetch(`/api/blog/edit-blog/${blogId}`, {
        method: "PATCH",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin/dashboard')
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
  const handleDelete = async () => {
    if (!blogId) return alert("blog ID missing");
    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/blog/delete-blog/${blogId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert("Blog deleted successfully!");
        router.push("/admin/dashboard");
      } else {
        alert(data.msg || "Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting");
    }finally{
      setDeleteLoading(false);
    }
  };

  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!blog) return <p className="p-6 text-center">Loading blog...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-2xl p-6"
      >
        <input
          type="text"
          placeholder="Blog Title"
          className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-green-400 focus:outline-none"
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
        {blog.image && (
          <img
            src={blog.image}
            alt="Current blog"
            className="mt-2 w-full rounded-lg shadow-md"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                     file:rounded-xl file:border-0 file:text-sm file:font-semibold 
                     file:bg-green-100 file:text-green-700 
                     hover:file:bg-green-200 cursor-pointer"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white px-5 py-2 rounded-2xl font-medium  transition disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>

        </div>
      </form>
    </div>
  );
}
