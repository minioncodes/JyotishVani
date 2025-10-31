import { google } from "googleapis";

export const getAvailableSlots = async (tokens: any) => {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials(tokens);
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    timeMax: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });
  const busyTimes = events.data.items?.map(event => ({
    start: new Date(event.start?.dateTime || event.start?.date || ""),
    end: new Date(event.end?.dateTime || event.end?.date || "")
  })) || [];
  console.log("busyTimes = ",busyTimes);
  const slots: { start: Date; end: Date }[] = [];
  console.log("slotes = ",slots);
  const startHour = 9, endHour = 17;
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    for (let h = startHour; h < endHour; h++) {
      const slotStart = new Date(day);
      slotStart.setHours(h, 0, 0, 0);
      const slotEnd = new Date(day);
      slotEnd.setHours(h + 1, 0, 0, 0);

      const conflict = busyTimes.some(
        event => slotStart < event.end && slotEnd > event.start
      );
      if (!conflict) slots.push({ start: slotStart, end: slotEnd });
    }
  }
  return slots;
};
// N/A