// lib/prokerala.ts
let cachedToken: string | null = null;
let tokenExpiry = 0; // ms

export async function getProkeralaToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry - 60_000) {
    return cachedToken;
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID || "",
      client_secret: process.env.PROKERALA_CLIENT_SECRET || "",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token fetch failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;

  return cachedToken;
}
