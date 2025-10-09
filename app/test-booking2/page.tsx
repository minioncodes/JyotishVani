"use client";

import { useEffect, useState } from "react";

interface Slot {
  start: string;
  end: string;
}

export default function Home() {
  const [slots, setSlots] = useState<Slot[] | {}>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/slots");
      if (!response) {

      }
      const data = await response.json();
      console.log("data = ", data);
      setSlots(data.slots);
    }
    fetchData();
  }, []);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      console.log("data from the handlelogin = ",data);
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to get auth URL");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-bold">Available Slots</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        onClick={handleLogin}
      >
        Login with Google
      </button>
      <div className="mt-6 space-y-4">
        {Array.isArray(slots) && slots.length > 0 ? (
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
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                Book
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