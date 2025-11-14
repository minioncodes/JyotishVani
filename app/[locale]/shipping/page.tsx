import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function ServiceDeliveryPage() {
  return (
    <>
        <div style={{ backgroundColor: "#F5F1E8" }} className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition mb-8">
          <ChevronLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Service Delivery Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              1. Service Overview
            </h2>
            <p>
              Jyotishwaani provides digital astrology services including horoscopes, Kundali readings, consultations,
              predictions, and personalized astrological guidance. All services are delivered through digital platforms
              including email, video consultations, and online sessions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              2. Service Delivery Methods
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Online Consultations (Video/Audio)</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Consultations are conducted via secure video or audio call</li>
                  <li>Scheduled sessions are conducted at mutually agreed times</li>
                  <li>Sessions may be recorded with client consent for personal reference only</li>
                  <li>Clients receive consultation summary via email within 24 hours</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Email Readings</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Detailed written readings are prepared by qualified astrologers</li>
                  <li>Readings are delivered via email within 3-5 business days of order</li>
                  <li>Clients may request clarifications within 7 days of delivery</li>
                  <li>Follow-up questions are addressed promptly</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Horoscope & Kundali Reports</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Comprehensive reports are generated based on astrological calculations</li>
                  <li>Reports are available in PDF format for download</li>
                  <li>Access is provided through your account dashboard immediately upon processing</li>
                  <li>Reports remain accessible in your account indefinitely</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Instant Services</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Quick readings and daily horoscopes are delivered immediately</li>
                  <li>These services are automated and available 24/7</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              3. Service Access Requirements
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Valid account with verified contact information</li>
              <li>Internet connection required for online services</li>
              <li>Valid birth date, time, and location details for accurate readings</li>
              <li>Willingness to communicate any specific concerns or areas of focus</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              4. Delivery Timelines
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#B8956A" }} className="text-white">
                    <th className="border border-gray-300 p-3 text-left">Service Type</th>
                    <th className="border border-gray-300 p-3 text-left">Delivery Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Video Consultation</td>
                    <td className="border border-gray-300 p-3">Within 5 days of booking</td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Email Reading</td>
                    <td className="border border-gray-300 p-3">Within 3-5 business days</td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Kundali Report</td>
                    <td className="border border-gray-300 p-3">Immediate (within 1 hour)</td>
                  </tr>
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Horoscope</td>
                    <td className="border border-gray-300 p-3">Immediate or within 24 hours</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">Instant Services</td>
                    <td className="border border-gray-300 p-3">Immediate (24/7)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              5. Technical Requirements
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>For video consultations: Compatible web browser or mobile app</li>
              <li>Minimum internet speed of 1 Mbps for stable connection</li>
              <li>Audio and video device (camera and microphone)</li>
              <li>Quiet, private environment for confidential consultations</li>
              <li>Email access for receiving reports and follow-up communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              6. Cancellation & Rescheduling
            </h2>
            <div className="space-y-3">
              <p>
                <strong>Scheduled Consultations:</strong> Clients may reschedule or cancel up to 24 hours before the
                scheduled time without penalty. Cancellations made less than 24 hours before the appointment will be
                subject to a 50% cancellation fee.
              </p>
              <p>
                <strong>Non-Attendance:</strong> If a client does not attend a scheduled consultation without prior
                notice or cancellation, the full session fee will be forfeited and the service will not be rescheduled
                without additional payment.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              7. Communication
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Important service updates will be communicated via email</li>
              <li>Appointment reminders will be sent 24 hours and 1 hour before scheduled consultations</li>
              <li>Support inquiries are answered within 24-48 business hours</li>
              <li>Clients are responsible for keeping contact information current</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              8. Service Limitations
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Services are subject to astrologer availability</li>
              <li>Astrologers may decline services that fall outside their expertise</li>
              <li>Services may be suspended due to technical issues or emergencies</li>
              <li>Jyotishwaani reserves the right to modify delivery methods to ensure service quality</li>
              <li>Services are suspended during scheduled maintenance windows (notifications provided in advance)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              9. Data Backup & Account Access
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Clients retain permanent access to downloaded reports and readings</li>
              <li>Account access may be suspended for violations of Terms & Conditions</li>
              <li>Upon account closure, data is retained for 30 days before deletion</li>
              <li>Data requests must be submitted in writing to support@jyotishwaani.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              10. Service Quality
            </h2>
            <p>
              Jyotishwaani is committed to providing high-quality astrology services delivered by experienced
              practitioners. If you are unsatisfied with service quality, please contact support within 7 days of
              service delivery to discuss potential remedies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              11. Changes to Delivery Policy
            </h2>
            <p>
              Jyotishwaani reserves the right to modify this Service Delivery Policy at any time. Changes will be
              communicated to users via email or website announcement. Continued use of services following policy
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              12. Contact Us
            </h2>
            <p>For questions about service delivery or to report issues, please contact:</p>
            <div className="mt-3 p-4" style={{ backgroundColor: "#F0EBDF" }}>
              <p>
                <strong>Email:</strong> support@jyotishwaani.com
              </p>
              <p>
                <strong>Response Time:</strong> Within 24-48 business hours
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>

  )
}
