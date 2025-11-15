"use client";

import React, { ReactHTMLElement, useEffect, useState } from "react";
import { loadRazorpay } from "@/utils/loadRazorpay";
import Navbar from "@/components/Navbar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
interface Slot {
  start: string;
  end: string;
}
export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
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
    setActiveSlot(slot.start);
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    if (!email) {
      setBookingLoading(false);
      setLoading(false);
      setActiveSlot(null);
      alert("please enter your email first to proceed..!");
      return;
    }
    const confirmEmail = window.confirm(`Is this your correct email?\n${email}`);
    if (!confirmEmail) {
      alert("Booking cancelled. Please check your email and try again.");
      setLoading(false);
      setBookingLoading(false);
      setActiveSlot(null);
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
    const options = {
      key,
      amount: orderRes.amount,
      currency: order.currency,
      name: "Jyotishwaani",
      description: "Consultation booking",
      order_id: order.id,
      handler: async function (response: any) {
        try {
          setBookingLoading(true);
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
          const sendPaymentDetailsEmail=await fetch('api/google/sendDetailsEmail',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
              email,
              selectedDate,
            })
          })
          const sendEmailData=await sendPaymentDetailsEmail.json();
          console.log(sendEmailData);
          const data = await bookingRes.json();
          alert("Booking confirmed!");
          setEmail("");
          setDuration(30);
          fetchSlots();
        } catch (error) {
          setBookingLoading(false)
          console.error("Booking error:", error);
          alert("Something went wrong while confirming booking!");
        } finally {
          setBookingLoading(false);
        }
      },
      theme: { color: "#3399cc" },
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
    setLoading(false);
    setActiveSlot(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf3] to-[#fefcf8] flex flex-col items-center p-8">
        <h1 className="text-4xl font-extrabold text-[#2c2c2c] mb-8 text-center mt-15">
          Book Your Astrology Consultation
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-center mb-10">
          <div>
            <label className="block mb-1 font-semibold text-[#4a4a4a]">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-[#d9c9a3] bg-[#fffaf3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d9c28f]"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#4a4a4a]">Enter your email</label>
            <input
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              className="border border-[#d9c9a3] bg-[#fffaf3] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d9c28f]"
            />
          </div>

          <div className="flex gap-2">
            {[30, 45, 60].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${duration === d
                  ? "bg-[#d9c28f] text-black"
                  : "bg-[#f5f2e9] text-[#3d3d3d] hover:bg-[#e8d9b1]"
                  }`}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>

        {loading && <LoadingSpinner />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-6 max-w-3xl">
          {slots.length > 0 ? (
            slots.map((slot, idx) => (
              <div
                key={idx}
                className="border border-[#f0e4c5] rounded-lg p-5 bg-[#fffdf7] shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <span className="text-[#2c2c2c] font-semibold mb-3 text-center">
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
                  className={`w-full px-4 py-2 rounded-md font-semibold transition-all duration-200 flex justify-center items-center gap-2 ${activeSlot === slot.start
                    ? "bg-[#e0d5b8] text-gray-600 cursor-not-allowed"
                    : "bg-[#d9c28f] text-black hover:bg-[#caae6c]"
                    }`}
                >
                  {activeSlot === slot.start ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Booking...</span>
                    </>
                  ) : (
                    "Book Now"
                  )}
                </button>

              </div>
            ))
          ) : (
            <p className="">
            </p>
          )}
        </div>
        {bookingLoading && (
          <div className="fixed inset-0 bg-[#fffaf3]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-opacity">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 border-4 border-[#d9c28f] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#4a3f2b] text-lg font-semibold tracking-wide">
                Confirming your booking...
              </p>
            </div>
          </div>
        )}

      </div>
    </>

  )
}
