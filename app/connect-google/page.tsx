"use client";

import { useState, useEffect } from "react";

export default function TestGoogleAuth() {
  const [authUrl, setAuthUrl] = useState("");
  const [tokens, setTokens] = useState<any>(null);

  const getTokens = async () => {
    const res = await fetch("/api/read-google-tokens");
    const data = await res.json();
    setTokens(data.tokens || null);
  };

  // Fetch tokens when the page loads
  useEffect(() => {
    getTokens();
  }, []);

  const handleConnect = async () => {
    const res = await fetch("/api/auth");
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Google Calendar Auth Test</h1>

      <button
        onClick={handleConnect}
        style={{
          padding: "12px 20px",
          background: "#1a73e8",
          color: "white",
          borderRadius: 8,
          border: "none",
          marginTop: 20,
          cursor: "pointer",
        }}
      >
        Connect Google Calendar
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h2>Stored Tokens</h2>

      {tokens ? (
        <pre
          style={{
            background: "#f4f4f4",
            padding: 20,
            borderRadius: 10,
            overflowX: "auto",
          }}
        >
          {JSON.stringify(tokens, null, 2)}
        </pre>
      ) : (
        <p>No tokens stored yet.</p>
      )}
    </div>
  );
}
