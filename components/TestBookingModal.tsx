"use client"
import { useState } from "react";

interface BookingModalProps {
  appointmentUrl: string;
}

export default function TestBookingModal({ appointmentUrl }: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Book an Appointment
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Book Your Slot
            </h2>
            <iframe
              src={appointmentUrl}
              className="w-full h-[600px] rounded-lg border border-gray-200"
              frameBorder="0"
              scrolling="no"
              title="Google Calendar Booking"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
