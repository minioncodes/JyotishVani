

const SIGNS = [
  "aries","taurus","gemini","cancer","leo",
  "virgo","libra","scorpio","sagittarius","capricorn",
  "aquarius","pisces",
];

type AztroDay = "today" | "tomorrow" | "yesterday";

// 🔮 Fetch Aztro API
async function fetchAztro(sign: string, day: AztroDay = "today") {
  const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`, { method: "POST" });
  if (!res.ok) throw new Error(`Aztro API error: ${res.status}`);
  return res.json();
}

// 🪐 Format horoscope message
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
    return "🌌 Sorry, I couldn’t fetch your horoscope right now. Please try again later.";
  }
}

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

// ✅ Generate WhatsApp message (text, list, or buttons)
export async function generateAstroReply(text: string): Promise<{ type: string; payload: any }> {
  const msg = text.toLowerCase().trim();

  // 🏁 Start / Menu → Show Zodiac list (first 10 only)
  if (["hi", "hello", "hey", "namaste", "menu", "start"].some((g) => msg.includes(g))) {
    return {
      type: "list",
      payload: {
        header: { type: "text", text: "🌟 Welcome to JyotishWaani" },
        body: { text: "Choose your zodiac sign to get your daily horoscope 🔮" },
        footer: { text: "Powered by Aztro API" },
        action: {
          button: "Select Zodiac Sign",
          sections: [
            {
              title: "Choose Your Sign",
              rows: SIGNS.slice(0, 10).map((s) => ({
                id: `sign_${s}`,
                title: s.charAt(0).toUpperCase() + s.slice(1),
              })),
            },
            {
              title: "More Options",
              rows: [
                { id: "more_signs", title: "♒ Aquarius & ♓ Pisces" },
              ],
            },
          ],
        },
      },
    };
  }

  // ♒ “More Signs” → show last two
  if (msg.includes("more") || msg.includes("aquarius") || msg.includes("pisces")) {
    return {
      type: "list",
      payload: {
        header: { type: "text", text: "🌌 More Zodiac Signs" },
        body: { text: "Choose your sign from the remaining ones 💫" },
        footer: { text: "Powered by Aztro API" },
        action: {
          button: "Select Sign",
          sections: [
            {
              title: "Remaining Signs",
              rows: SIGNS.slice(10).map((s) => ({
                id: `sign_${s}`,
                title: s.charAt(0).toUpperCase() + s.slice(1),
              })),
            },
            {
              title: "Back to All",
              rows: [{ id: "main_menu", title: "🔙 Back to All Signs" }],
            },
          ],
        },
      },
    };
  }

  // ♈ Direct sign → Horoscope + 3 buttons
  const sign = detectSign(msg);
  if (sign) {
    const day = detectDay(msg);
    const body = await getHoroscope(sign, day);

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

  // 🔙 Back to Main Menu
  if (msg.includes("back") || msg.includes("main")) {
    return {
      type: "text",
      payload: { body: "💫 Type *Hi* to open the main zodiac menu again." },
    };
  }

  // 🌀 Fallback
  return {
    type: "text",
    payload: {
      body: "🔮 Type *Hi* to start or send your zodiac sign (e.g., Aries, Virgo, Leo).",
    },
  };
}
