"use client";

import CalEmbed from "@calcom/embed-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <section
        id="booking"
        className="relative flex min-h-[92vh] items-center justify-center px-6 py-20"
      >
        {/* Background Layers (same as Hero) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        <div className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* Heading + Description */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Book Your Astrology Session
          </h1>
          <p className="mt-3 text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Choose a time that aligns with your cosmic journey.  
            Available online (Google Meet) or in-person (Delhi).
          </p>

          {/* Booking Card */}
          <div className="mt-10 w-full  rounded-3xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl overflow-hidden">
            <CalEmbed
              calLink="digipants-devs-2aqrti/quick-chat"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
