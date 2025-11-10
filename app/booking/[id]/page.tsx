"use client";

import { useParams } from "next/navigation";
import { bookingOptions } from "@/lib/bookingOptions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CalEmbed from "@calcom/embed-react";
import { useState } from "react";

export default function BookingDetailPage() {
  const { id } = useParams();
  const option = bookingOptions.find((opt) => opt.id === id);

  if (!option) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">
          Booking option not found
        </h1>
      </div>
    );
  }

  return (
    <>
      <section className="relative flex min-h-[92vh] items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F3] via-[#FFFDF8]/90 to-[#FAF8F3]" />

        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">
            {option.title}
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {option.description}
          </p>
          <div className="mt-10 w-full rounded-3xl bg-white/90 shadow-xl border border-[#C5A46D]/30 overflow-hidden">
            <CalEmbed
              calLink={option.calLink}
              style={{ height: "100%", width: "100%" }}
              config={{
                theme: "light",
                primaryColor: "#C5A46D",
                backgroundColor: "#FAF8F3",
                textColor: "#000000",
                // layout:"column_view" 
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
