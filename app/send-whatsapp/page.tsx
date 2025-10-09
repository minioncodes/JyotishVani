"use client";

import { useState } from "react";

export default function SendWhatsAppPage() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, message }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(" Message sent successfully!");
      } else {
        setResponse(` Error: ${data.error || "Something went wrong"}`);
      }
    } catch (err) {
      setResponse(" Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20">
        <h1 className="text-2xl font-bold text-center mb-6">Send WhatsApp Message </h1>

        <form onSubmit={handleSend} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Recipient Number (with country code, e.g. 91XXXXXXXXXX)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
          />

          <textarea
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {response && (
          <p className="mt-4 text-center text-sm text-gray-200">{response}</p>
        )}
      </div>
    </section>
  );
}
