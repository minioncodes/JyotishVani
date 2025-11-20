// lib/prokerala.ts

let cachedToken: string;
let tokenExpiry = 0; // ms timestamp

export async function getProkeralaToken() {
  const now = Date.now();

  // Reuse token if valid
  if (cachedToken && now < tokenExpiry - 60_000) {
    return cachedToken;
  }

  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Prokerala credentials in environment variables");
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Token fetch failed (${res.status}): ${txt}`);
  }

  const data = await res.json();

  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;

  return cachedToken;
}
