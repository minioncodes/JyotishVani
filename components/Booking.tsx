"use client";

import CalEmbed from "@calcom/embed-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BookingPage() {
  return (
    <>
      
      <section
        id="booking"
        className="relative flex min-h-[92vh] items-center justify-center px-6 py-20"
      >
        {/* Background cosmic glow (golden + soft dark) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F3] via-[#FFFDF8]/90 to-[#FAF8F3]" />
        {/* <div className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#C5A46D]/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-[#C5A46D]/20 blur-3xl" /> */}

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* Heading + Description */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">
            Book Your <span className="text-[#C5A46D]">Astrology Session</span>
          </h1>
          <p className="mt-3 text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Choose a time that aligns with your cosmic journey.  
            Available online (Google Meet) or in-person (Lucknow).
          </p>

          {/* Booking Card */}
          <div className="mt-10 w-full rounded-3xl bg-white/90 shadow-xl border border-[#C5A46D]/30 overflow-hidden">
            <CalEmbed
              calLink="digipants-devs-2aqrti/quick-chat"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </section>
      
    </>
  );
}
