// /lib/botLogic.ts

const SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces",
];

type AztroDay = "today" | "tomorrow" | "yesterday";

// 🔮 Fetch from Aztro API
async function fetchAztro(sign: string, day: AztroDay = "today") {
  const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`, { method: "POST" });
  if (!res.ok) throw new Error(`Aztro API error: ${res.status}`);
  return res.json();
}

// 🪐 Format horoscope reply
export async function getHoroscope(sign: string, day: AztroDay = "today"): Promise<string> {
  try {
    const d = await fetchAztro(sign, day);
    return [
      `✨ *${sign.toUpperCase()}* — ${day.toUpperCase()}`,
      `🗓 *Date Range:* ${d.date_range}`,
      `📅 *Date:* ${d.current_date}`,
      ``,
      `${d.description}`,
      ``,
      `❤️ *Compatibility:* ${d.compatibility}`,
      `💫 *Mood:* ${d.mood}`,
      `🌈 *Lucky Color:* ${d.color}`,
      `🔢 *Lucky Number:* ${d.lucky_number}`,
      `⏰ *Lucky Time:* ${d.lucky_time}`,
    ].join("\n");
  } catch {
    return "🌌 Sorry, I couldn’t fetch your horoscope right now. Please try again.";
  }
}

// 🎯 Detect sign/day from text
function detectSign(text: string): string | null {
  const lower = text.toLowerCase();
  return SIGNS.find((s) => lower.includes(s)) || null;
}
function detectDay(text: string): AztroDay {
  const lower = text.toLowerCase();
  if (lower.includes("tomorrow")) return "tomorrow";
  if (lower.includes("yesterday")) return "yesterday";
  return "today";
}

// 🧠 Generate message response
export async function generateAstroReply(text: string): Promise<{ type: string; payload: any }> {
  const msg = text.toLowerCase().trim();

  // 🌟 Greeting menu
  if (["hi", "hello", "hey", "namaste", "menu", "start"].some((g) => msg.includes(g))) {
    return {
      type: "list",
      payload: {
        header: { type: "text", text: "🌟 Welcome to JyotishWaani" },
        body: { text: "Choose your zodiac sign to view your daily horoscope ✨" },
        footer: { text: "Powered by Aztro API" },
        action: {
          button: "Select Zodiac Sign",
          sections: [
            {
              title: "Fire Signs 🔥",
              rows: SIGNS.slice(0, 4).map((s) => ({
                id: `sign_${s}`,
                title: s.charAt(0).toUpperCase() + s.slice(1),
              })),
            },
            {
              title: "Earth / Air / Water Signs 🌎💨💧",
              rows: SIGNS.slice(4).map((s) => ({
                id: `sign_${s}`,
                title: s.charAt(0).toUpperCase() + s.slice(1),
              })),
            },
          ],
        },
      },
    };
  }

  // ♈ Direct sign detection
  const sign = detectSign(msg);
  if (sign) {
    const day = detectDay(msg);
    const body = await getHoroscope(sign, day);

    // 🪙 Attach 3 buttons (limit)
    return {
      type: "button",
      payload: {
        body: { text: body },
        action: {
          buttons: [
            { type: "reply", reply: { id: `today_${sign}`, title: "Today 🔮" } },
            { type: "reply", reply: { id: `tomorrow_${sign}`, title: "Tomorrow 🌞" } },
            { type: "reply", reply: { id: `yesterday_${sign}`, title: "Yesterday 🌙" } },
          ],
        },
      },
    };
  }

  // ❓ Unknown input fallback
  return {
    type: "text",
    payload: {
      body: "🔮 Type *Hi* to start or send your zodiac sign (e.g., Aries, Virgo, Leo).",
    },
  };
}
