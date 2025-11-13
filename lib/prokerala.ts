import { redis } from "./Redis";

let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getProkeralaToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpiry - 60000) {
    return cachedToken;
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PROKERALA_CLIENT_ID!,
      client_secret: process.env.PROKERALA_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch token");
  }

  const json = await res.json();
  cachedToken = json.access_token;
  tokenExpiry = now + json.expires_in * 1000;

  return cachedToken;
}
