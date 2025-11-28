"use client";

import React, { useEffect, useState } from "react";
import { loadRazorpay } from "@/utils/loadRazorpay";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useTranslations } from "next-intl";

interface Slot {
  start: string;
  end: string;
  status: string;
}

export default function Home() {
  const t = useTranslations("booking");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [meetLink, setMeetLink] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const map_Payment_Duration = new Map<number, number>();
  map_Payment_Duration.set(30, 1100);
  map_Payment_Duration.set(45, 2100);
  map_Payment_Duration.set(60, 5100);

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/test-slots?date=${selectedDate}&duration=${duration}`);
      const data = await res.json();
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
      alert(t("razorpayError"));
      return;
    }

    if (!email) {
      setBookingLoading(false);
      setLoading(false);
      setActiveSlot(null);
      alert(t("enterEmail"));
      return;
    }

    const confirmEmail = window.confirm(`${t("confirmEmail")}\n${email}`);
    if (!confirmEmail) {
      alert(t("bookingCancelled"));
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
      description: t("consultation"),
      order_id: order.id,
      handler: async function (response: any) {
        try {
          setBookingLoading(true);
          const verifyPayment = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          })
          const verifyData = await verifyPayment.json();
          if (!verifyData.success) {
            alert("Payment Verification Failed !.No Booking Done")
            return;
          }
          const bookingRes = await fetch("/api/google/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              start: slot.start,
              end: slot.end,
              summary: t("summary"),
              description: t("description"),
              attendees: [{ email: email }],
            }),
          });
          const bookingDetails = await bookingRes.json();
          const link = bookingDetails.event.meetLink;
          setMeetLink(bookingDetails.event.meetLink);
          const sendPaymentDetailsEmail = await
            fetch('/api/google/senddetailsemail', {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                slotDate: selectedDate,
                meetLink: link,
                timing: slot.start,
                meetAmount: map_Payment_Duration.get(duration)
              })
            })
          const sendEmailData = await sendPaymentDetailsEmail.json();
          console.log(sendEmailData);
          alert("Booking confirmed!");
          setEmail("");
          setDuration(30);
          fetchSlots();
        } catch (error) {
          setBookingLoading(false);
          console.error("Booking error:", error);
          alert(t("bookingFailed"));
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
          {t("title")}
        </h1>
        <div className="flex flex-col md:flex-row gap-6 md:items-end mb-10">
          <div className="flex flex-col">
            <label className="block mb-1 font-semibold text-[#4a4a4a]">Select Date:</label>
            <input
            title="Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-[#B22222] bg-[#fffaf3] rounded-lg px-3 py-2 
                 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-1 font-semibold text-[#4a4a4a]">
              {t("enterEmail")}
            </label>
            <input
              placeholder={t("placeholderEmail")}
              value={email}
              onChange={handleEmail}
              className="border border-[#B22222] bg-[#fffaf3] rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-[#B22222]"
            />
          </div>

          <div className="flex gap-2">
            {[30, 45, 60].map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${duration === d
                  ? "bg-[#B22222] text-white"
                  : "bg-[#f5f2e9] text-[#3d3d3d] hover:bg-[#e8b3b1]"
                  }`}
              >
                {d} {t("min")}
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
                {slot.status === "free" ?
                  < button
                    onClick={() => handlePayment(slot)}
                    disabled={activeSlot === slot.start}
                    className={`w-full px-4 py-2 rounded-md font-semibold transition-all duration-200 flex justify-center items-center gap-2 
      ${activeSlot === slot.start
                        ? "bg-[#e0d5b8] text-gray-600 cursor-not-allowed"
                        : "bg-[#B22222] text-white hover:bg-[#6e0000]"
                      }`}
                  >
                    {activeSlot === slot.start ? t("booking") : t("bookNow")}
                  </button> :
                  <button
                    className={`w-full px-4 py-2 rounded-md font-semibold transition-all duration-200 flex justify-center items-center gap-2 cursor-not-allowed bg-[#6B7280]`}
                  >
                    {t("booked")}
                  </button>}

              </div>
            ))
          ) : (
            <div className="col-span-3 flex justify-center items-center text-gray-600">{t("noSlots")}</div>
          )}
        </div>

        {bookingLoading && (
          <div className="fixed inset-0 bg-[#fffaf3]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 transition-opacity">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 border-4 border-[#B22222] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#4a3f2b] text-lg font-semibold tracking-wide">
                {t("confirming")}
              </p>
            </div>
          </div>
        )}
      </div >
    </>
  );
}    