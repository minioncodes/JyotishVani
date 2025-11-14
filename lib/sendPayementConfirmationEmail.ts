import { google } from "googleapis";
interface userDetails{
    userEmaiL:string;
    slotDate:string;
    slottTime:string;
    amount:number;
    googleMeetLink:string;

}
export default async function sendPaymentEmail(user: userDetails) {
    try {
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
            "To: " + user.userEmaiL,
            "Subject: Your Jyotishwaani Booking Confirmation",
            "Content-Type: text/html; charset=utf-8",
            "",
            `<p>Namaste!</p>
            <p>Your booking is confirmed for <b>${user.slotDate}</b> at <b>${user.slottTime}</b>.</p>
            <p>Payment received: ₹${user.amount}</p>
            <p>Event link: <a href="${user.googleMeetLink}">${user.googleMeetLink}</a></p>
            <p>See you soon!</p>`
        ];
        const encodedMessage = Buffer.from(messageParts.join("\n"))
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

        await gmail.users.messages.send({
            userId: "me",
            requestBody: { raw: encodedMessage },
        });
    } catch (e: any) {
        console.log("errror = ",e);
    }
}