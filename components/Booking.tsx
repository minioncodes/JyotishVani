"use client";

import CalEmbed from "@calcom/embed-react";

export default function BookingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl h-[700px] shadow-lg rounded-2xl overflow-hidden">
        <CalEmbed calLink="digipants-devs-2aqrti/quick-chat" style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
}
