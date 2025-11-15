"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";


type Review = {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
};

export default function Reviews() {
  const t = useTranslations("reviews");

  const reviews: Review[] = [
    {
      name: t("r1.name"),
      role: t("r1.role"),
      text: t("r1.text"),
      rating: 4,
      avatar:
        "https://media.istockphoto.com/id/2162083704/photo/creative-portrait-and-happy-business-woman-in-office-company-or-startup-workplace-with-bokeh.webp?a=1&b=1&s=612x612&w=0&k=20&c=QEkxfPr2UbqVBp2dxARSKcyMLPKqlhVCYnAJ3yf5PxU=",
    },
    {
      name: t("r2.name"),
      role: t("r2.role"),
      text: t("r2.text"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: t("r3.name"),
      role: t("r3.role"),
      text: t("r3.text"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: t("r4.name"),
      role: t("r4.role"),
      text: t("r4.text"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: t("r5.name"),
      role: t("r5.role"),
      text: t("r5.text"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: t("r6.name"),
      role: t("r6.role"),
      text: t("r6.text"),
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60",
    },
  ];

  function ReviewCard({ r }: { r: Review }) {
    return (
      <div className="w-80 h-60 bg-white/90 p-6 hover:scale-110 cursor-pointer transition shadow-md flex flex-col justify-between">
        {/* top row */}
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#B22222]/40 bg-white">
            {r.avatar && (
              <Image
                src={r.avatar}
                alt={r.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div>
            <div className="font-semibold text-black">{r.name}</div>
            <div className="text-xs text-gray-600">{r.role}</div>
          </div>
        </div>

        {/* rating */}
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar
              key={i}
              className={`h-4 w-4 ${
                i < r.rating ? "text-[#B22222]" : "text-gray-400"
              }`}
            />
          ))}
        </div>

        {/* text */}
        <p className="mt-3 text-gray-800 leading-relaxed text-sm line-clamp-3">
          “{r.text}”
        </p>
      </div>
    );
  }

  return (
    <section
      id="testimonials"
      className="relative px-6 py-14 sm:py-16 md:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_10%_10%,rgba(197,164,109,0.08),transparent_60%),radial-gradient(600px_200px_at_90%_90%,rgba(197,164,109,0.08),transparent_60%)]" />

      <div className="mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 p-6 rounded-2xl bg-white/80 shadow-lg">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              {t("title.part1")}{" "}
              <span className="text-[#B22222]">{t("title.part2")}</span>
            </h2>
            <p className="mt-2 text-gray-700">{t("subtitle")}</p>
          </div>

          {/* rating badge */}
          <div className="flex items-center gap-2 rounded-xl bg-[#B22222]/10 px-4 py-2">
            <div className="flex -mr-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className="h-4 w-4 text-[#B22222]" />
              ))}
            </div>
            <span className="text-sm text-gray-800">
              {t("ratingBadge")}
            </span>
          </div>
        </div>

        {/* MOBILE SWIPE */}
        <div className="block lg:hidden overflow-hidden">
          <div className="flex gap-5 overflow-x-auto no-scrollbar px-2 snap-x snap-mandatory">
            {reviews.map((r, idx) => (
              <div key={idx} className="snap-center shrink-0">
                <ReviewCard r={r} />
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP marquee */}
        <div className="hidden lg:block relative w-full mt-10">
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...reviews, ...reviews].map((r, idx) => (
              <ReviewCard r={r} key={idx} />
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/bookings"
            className="rounded-xl bg-[#B22222] px-6 py-3 font-semibold text-white shadow-md hover:bg-black transition"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
