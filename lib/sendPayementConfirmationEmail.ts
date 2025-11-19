import { google } from "googleapis";
interface userDetails {
  email: string;
  slotDate: string;
  meetAmount: number;
  meetLink: string;
  timing: string;
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
    const timingDate = new Date(user.timing);
    const formattedTime = timingDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const messageParts = [
      `From: Jyotishwaani <me>`,
      `To: ${user.email.trim()}`,
      `Subject: Your Booking Confirmation Jyotishwaani`,
      `Content-Type: text/html; charset="UTF-8"`,
      "",
      `
    <div style="background-color:#f7f4ef; padding:24px; font-family:Arial, sans-serif; color:#333;">

    <div style="text-align:center; margin-bottom:24px;">
      <img src="https://res.cloudinary.com/demznoxwp/image/upload/v1763460668/icon_px3ymr.jpg" alt="Jyotishwaani Logo" width="90" style="margin-bottom:12px;" />
      <h2 style="margin:0; color:#b35a5a; font-weight:600;">
        Jyotishwaani Your Personal Astrology Guidance
      </h2>
    </div>

    <div style="
      background:white;
      padding:20px;
      border-radius:12px;
      border:1px solid #e5d9c8;
      box-shadow:0 2px 6px rgba(0,0,0,0.08);
      background-image:url('');
      background-size:cover;
      background-position:center;
    ">
      <p style="font-size:15px;">Namaste </p>

      <p style="font-size:15px;">
        Your consultation has been successfully booked. Here are the details of your upcoming session:
      </p>

      <h3 style="color:#b35a5a; font-size:17px; margin-top:18px;">Booking Details</h3>

      <table style="border-collapse:collapse; font-size:15px;">
        <tr>
          <td style="padding:6px 10px;"><strong>Slot Date:</strong></td>
          <td style="padding:6px 10px;">${user.slotDate}</td>
        </tr>

        <tr>
          <td style="padding:6px 10px;"><strong>Timing:</strong></td>
          <td style="padding:6px 10px;">
            ${formattedTime}
          </td>
        </tr>
        <tr>
          <td style="padding:6px 10px;"><strong>Amount Paid:</strong></td>
          <td style="padding:6px 10px;">₹${user.meetAmount}</td>
        </tr>

        <tr>
          <td style="padding:6px 10px;"><strong>Meeting Link:</strong></td>
          <td style="padding:6px 10px;">
            <a href="${user.meetLink}" target="_blank" style="color:#b35a5a; text-decoration:none;">
              Join Meeting
            </a>
          </td>
        </tr>
      </table>

      <p style="margin-top:20px; font-size:15px;">
        If you have any questions, feel free to reply to this email.
      </p>

      <p style="margin-top:12px; font-size:15px;">
        With guidance and clarity,<br />
        <strong>Jyotishwaani</strong>
      </p>
    </div>

    <div style="text-align:center; font-size:13px; color:#666; margin-top:32px;">
      <p>Jyotishwaani Astrology Services</p>
      <p>C-219 Near Tula Ram Park, Rajajipuram Lucknow</p>
      <p> Uttar Pradesh - 226017 India</p>
    </div>

  </div>
  `
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
