"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StarsBg from "@/components/StarBg";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

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

  const t = useTranslations("blogsPage");
  const locale = useLocale();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/blog/all-blogs');
        const data = await res.json();
        if (res.ok) setBlogs(data.blogs);
        else setError(data.msg || t("errors.fetchFailed"));
      } catch {
        setError(t("errors.somethingWrong"));
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [locale, t]);

  if (loading)
    return <p className="p-6 text-center">{t("loading")}</p>;

  if (error)
    return <p className="p-6 text-center text-red-500">{error}</p>;

  if (blogs.length === 0)
    return <p className="text-center">{t("noBlogs")}</p>;

  return (
    <>

<section className="relative px-6 py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/90 to-[#F5EFE4] text-[#2B2B2B]">
        {/* Blogs Content */}
      <div className="max-w-6xl mx-auto px-6 py-14 relative z-10 ">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mt-[100px] font-[Cinzel] mb-12 text-black">
          {t("heading.part1")}{" "}
          <span className="text-[#B22222]">{t("heading.part2")}</span>
        </h1>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-2xl border border-[#B22222]/30 bg-white/90 shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {blog.image && (
                <Image
                  width={600}
                  height={192}
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 flex flex-col">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-black">
                  {blog.title}
                </h2>

                <p
                  className="text-sm text-gray-700 line-clamp-3 mb-4"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />

                <Link
                  href={`/${locale}/single-blog/${blog._id}`}
                  className="inline-block rounded-xl bg-[#B22222] text-white px-4 py-2 text-sm font-medium shadow hover:bg-black hover:text-white transition"
                >
                  {t("readMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
</section>
    </>
  );
}
