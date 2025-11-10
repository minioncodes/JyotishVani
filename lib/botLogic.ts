
const SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

type AztroDay = "today" | "tomorrow" | "yesterday";


async function fetchAztro(sign: string, day: AztroDay = "today") {
  const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=${day}`, { method: "POST" });
  console.log(res);
  if (!res.ok) throw new Error(`Aztro API error: ${res.status}`);
  return res.json();
}


export async function getHoroscope(sign: string, day: AztroDay = "today"): Promise<string> {
  try {
    const d = await fetchAztro(sign, day);
    console.log(d + " from getHoroscope");     
    return [
      ` *${sign.toUpperCase()}* — ${day.toUpperCase()}`,
      ` *Date Range:* ${d.date_range}`,
      ` *Date:* ${d.current_date}`,
      ``,
      `${d.description}`,
      ``,
      `*Compatibility:* ${d.compatibility}`,
      ` *Mood:* ${d.mood}`,
      ` *Lucky Color:* ${d.color}`,
      ` *Lucky Number:* ${d.lucky_number}`,
      ` *Lucky Time:* ${d.lucky_time}`,
    ].join("\n");
  } catch {
    return " Sorry, I couldn’t fetch your horoscope right now. Please try again.";
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

//  Generate proper message payload
export async function generateAstroReply(text: string): Promise<{ type: string; payload: any }> {
  const msg = text.toLowerCase().trim();

  //  Greeting / Menu
  if (["hi", "hello", "hey", "namaste", "menu", "start"].some((g) => msg.includes(g))) {
    return {
      type: "text",
      payload: {
        body: [
          " *Welcome to JyotishWaani!*",
          "",
          "Type your *zodiac sign* (like Aries, Virgo, Leo) to see your horoscope 🔮",
          "",
          "You can also ask:",
          "• `leo tomorrow` → tomorrow's horoscope",
          "• `virgo yesterday` → yesterday's horoscope",
          "",
          " Powered by Aztro API",
        ].join("\n"),
      },
    };
  }

  //  Horoscope logic
  const sign = detectSign(msg);
  if (sign) {
    const day = detectDay(msg);
    const body = await getHoroscope(sign, day);

    //  Include 3 buttons
    return {
      type: "button",
      payload: {
        body: { text: body },
        action: {
          buttons: [
            { type: "reply", reply: { id: `today_${sign}`, title: "Today " } },
            { type: "reply", reply: { id: `tomorrow_${sign}`, title: "Tomorrow " } },
            { type: "reply", reply: { id: `yesterday_${sign}`, title: "Yesterday" } },
          ],
        },
      },
    };
  }

  //  Default fallback
  return {
    type: "text",
    payload: {
      body: "🔮 Type *Hi* to start or send your zodiac sign (e.g., Aries, Virgo, Scorpio).",
    },
  };
}
