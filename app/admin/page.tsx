"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials ❌");
      } else {
        if (data.token) {
          localStorage.setItem("adminToken", data.token);
        }
        if (data.admin) {
          localStorage.setItem("adminInfo", JSON.stringify(data.admin));
        }
        setSuccess("Login successful ✅");
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 300);
      }
    } catch{
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Hey Admin 👋</h1>
          <p className="mt-2 text-gray-600 font-medium">
            Welcome back! Login to <span className="text-indigo-600">handle your blogs</span> ✍️
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg px-4 py-2 text-gray-700 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg px-4 py-2 text-gray-700 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !email || !password}
            className={`w-full font-semibold py-2 rounded-lg shadow-md transition-transform transform hover:scale-[1.02]
              ${loading || !email || !password
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"}
            `}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 mt-4 text-sm text-center font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 mt-4 text-sm text-center font-medium">
            {success}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-6 text-center">
          Your access is secure 🔒 Only admins can log in
        </p>
      </div>
    </div>
  );
}
