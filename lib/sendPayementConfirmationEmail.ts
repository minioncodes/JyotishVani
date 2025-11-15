import { google } from "googleapis";
interface userDetails {
  email: string;
  slotDate: string;
  amount:number;
  meetLink:string;
  timing:Date;
}

console.log("Send payment details to gmail called....")

export async function sendPaymentDetailsEmail(user: userDetails) {
  try {
    console.log("Email received in API:", user.email);
    if (!user.email || !user.email.includes("@")) {
      throw new Error("Invalid email: " + user.email);
    }
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const messageParts = [
      `From: Jyotishwaani <me>`,
      `To: ${user.email.trim()}`,
      `Subject: Your Jyotishwaani Booking Confirmation`,
      `Content-Type: text/html; charset="UTF-8"`,
      "",
      `<p>Namaste!</p>

       <p>See you soon!</p>`
    ];

    const encodedMessage = Buffer
      .from(messageParts.join("\n"))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage },
    });

  } catch (e: any) {
    console.log("errror = ", e);
    throw e;
  }
}
