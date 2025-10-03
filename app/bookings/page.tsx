"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { bookingOptions } from "@/lib/bookingOptions";
export default function BookingsPage() {
  return (
    <>
      <Navbar />
      <section className="relative flex min-h-[92vh] items-center justify-center px-6 py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F3] via-[#FFFDF8]/90 to-[#FAF8F3]" />

        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">
            Book Your <span className="text-[#C5A46D]">Astrology Session</span>
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Choose the session that resonates most with your cosmic journey.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookingOptions.map((option) => (
              <Link
                key={option.id}
                href={`/booking/${option.id}`}
                className="block rounded-3xl bg-white/90 shadow-xl border border-[#C5A46D]/30 p-6 hover:shadow-2xl transition"
              >
                <h2 className="text-xl font-semibold text-black">
                  {option.title}
                </h2>
                <p className="mt-2 text-gray-600">{option.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
