"use client";

import { useEffect, useState } from "react";

interface Slot {
  start: string;
  end: string;
}

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/slots");
      const data = await response.json();
      setSlots(data.slots || []);
    }
    fetchData();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Failed to get auth URL");
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (slot: Slot) => {
    setActiveSlot(slot.start); // 👈 Only this slot will load
    try {
      await fetch("/api/google/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: slot.start,
          end: slot.end,
          summary: "Astrology Consultation",
          description: "Video session for horoscope reading",
          attendees: [{ email: "aryan@digipants.com" }],
        }),
      });
      alert("Booking successful!");
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setActiveSlot(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">Available Slots</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Login with Google"}
      </button>

      <div className="mt-6 space-y-4">
        {slots.length > 0 ? (
          slots.map((slot, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>
                {new Date(slot.start).toLocaleString()} -{" "}
                {new Date(slot.end).toLocaleTimeString()}
              </span>

              <button
                onClick={() => handleBooking(slot)}
                disabled={activeSlot === slot.start}
                className={`px-4 py-2 rounded text-white ${
                  activeSlot === slot.start
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {activeSlot === slot.start ? "Booking..." : "Book Now"}
              </button>
            </div>
          ))
        ) : (
          <p>No free slots found.</p>
        )}
      </div>
    </div>
  );
}








//   THE RAZORPAY CODE BELOW













// if(!slots){
//   return null;
// }
// const handleBooking = async (slot: Slot) => {
//   setLoading(true);

//   const res = await fetch("/api/create-order", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ amount: 500, slot }),
//   });

//   const data = await res.json();

//   const options = {
//     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//     amount: 500 * 100,
//     currency: "INR",
//     name: "Slot Booking",
//     order_id: data.orderId,
//     handler: async (response: any) => {
//       await fetch("/api/confirm-booking", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ slot, paymentId: response.razorpay_payment_id }),
//       });
//       alert("Booking confirmed!");
//     },
//     prefill: { email: "user@example.com" },
//   };

//   const razorpay = new (window as any).Razorpay(options);
//   razorpay.open();
//   setLoading(false);
// };