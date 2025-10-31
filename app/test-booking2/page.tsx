"use client";

import React, { ReactHTMLElement, useEffect, useState } from "react";
import { loadRazorpay } from "@/utils/loadRazorpay";

interface Slot {
  start: string;
  end: string;
}
export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]);
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const map_Payment_Duration = new Map<number, number>();
  map_Payment_Duration.set(30, 1500);
  map_Payment_Duration.set(45, 3000);
  map_Payment_Duration.set(60, 5000);
  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/slots?date=${selectedDate}&duration=${duration}`);
      const data = await res.json();
      console.log("data slots = ", data);
      setSlots(data.slots || []);
    } catch (err) {
      console.error("Error fetching slots:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSlots();
  }, [selectedDate, duration]);
  const handlePayment = async (slot: Slot) => {
    setLoading(true);
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    if (!email) {
      alert("please enter your email first to proceed..!");
      return;
    }
    const confirmEmail = window.confirm(`Is this your correct email?\n${email}`);
    if (!confirmEmail) {
      alert("Booking cancelled. Please check your email and try again.");
      setLoading(false);
      return;
    }
    const orderRes = await fetch("/api/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: map_Payment_Duration.get(duration),
      }),
    }).then((res) => res.json());
    const { order, key } = orderRes;
    console.log("order from the page = ", orderRes);
    const options = {
      key,
      amount: orderRes.amount,
      currency: order.currency,
      name: "Jyotishwaani",
      description: "Consultation booking",
      order_id: order.id,
      handler: async function (response: any) {
        const bookingRes = await fetch("/api/google/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            start: slot.start,
            end: slot.end,
            summary: "Astrology Consultation",
            description: "Video session for horoscope reading",
            attendees: [{ email: email }],
          }),
        });
        const data = await bookingRes.json();
        alert("Booking confirmed!");
        setEmail("");
        setDuration(30);
        fetchSlots();
      },
      theme: { color: "#3399cc" },
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 mt-30 to-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Book Your Astrology Consultation
      </h1>

      <div className="flex gap-4 items-center mb-8">
        <div>
          <label className="mr-2 font-semibold text-gray-700">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-2 py-1 focus:ring focus:ring-indigo-300"
          />
        </div>
        <div className="flex gap-2">
          {[30, 45, 60].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded ${duration === d ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
            >
              {d} min
            </button>
          ))}
        </div>
        <div>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
          />

        </div>
      </div>

      {loading && <p className="text-gray-500 mb-4">Loading available slots...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-10 max-w-3xl">
        {slots.length > 0 ? (
          slots.map((slot, idx) => (
            <div
              key={idx}
              className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <span className="text-gray-800 font-medium mb-3">
                {new Date(slot.start).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(slot.end).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <button
                onClick={() => handlePayment(slot)}
                disabled={activeSlot === slot.start}
                className={`w-full px-4 py-2 rounded-md text-white cursor-pointer font-semibold transition ${activeSlot === slot.start
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
                  }`}
              >
                {activeSlot === slot.start ? "Booking..." : "Book Now"}
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No free slots found for this date.
          </p>
        )}
      </div>
      {message && (
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-gray-700">{message}</p>
          {meetLink && (
            <a
              href={meetLink}
              target="_blank"
              className=" mt-3 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition inline-block"
            >
              Join Google Meet
            </a>
          )}
        </div>
      )}
    </div>
  );
}