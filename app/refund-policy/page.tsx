import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import Navbar from "@/components/Navbar"

export default function RefundPolicyPage() {
  return (
    <>
    <Navbar/>
        <div style={{ backgroundColor: "#F5F1E8" }} className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition mb-8">
          <ChevronLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Return & Refund Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              1. Refund Eligibility
            </h2>
            <p>
              At Jyotishwaani, we strive to provide exceptional astrology services. Refunds are available under specific
              circumstances as outlined in this policy. Refund eligibility depends on the service type, delivery status,
              and timing of the refund request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              2. Service-Specific Refund Terms
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Scheduled Consultations (Video/Audio)</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Before Cancellation Deadline:</strong> Full refund if cancelled 24+ hours before appointment
                  </li>
                  <li>
                    <strong>Within 24 Hours:</strong> 50% refund if cancelled within 24 hours of scheduled time
                  </li>
                  <li>
                    <strong>No-Show:</strong> No refund if client fails to attend scheduled consultation
                  </li>
                  <li>
                    <strong>Astrologer Unavailability:</strong> Full refund if astrologer cancels; automatic
                    rescheduling offered
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Email Readings</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Pre-Delivery Cancellation:</strong> Full refund if cancelled before reading is prepared
                  </li>
                  <li>
                    <strong>Post-Delivery Dissatisfaction:</strong> If reading is factually inaccurate or incomplete,
                    revised reading provided free of charge or 75% refund issued
                  </li>
                  <li>
                    <strong>Technical Issues:</strong> Full refund if service is undeliverable due to technical problems
                  </li>
                  <li>
                    <strong>No Refund:</strong> If client withdraws request after delivery is complete
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Horoscope & Kundali Reports</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Quality Issues:</strong> Full refund or corrected report if calculations are incorrect
                  </li>
                  <li>
                    <strong>System Errors:</strong> Full refund if report fails to download or is corrupted
                  </li>
                  <li>
                    <strong>Change of Mind:</strong> No refund once report is delivered and downloaded
                  </li>
                  <li>
                    <strong>Duplicate Purchase:</strong> Full refund if same report purchased twice within 30 days
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Instant Services (Daily Horoscopes, Quick Readings)</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Non-refundable once processed and delivered</li>
                  <li>Full refund available for technical delivery failures</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              3. Refund Request Process
            </h2>
            <div className="space-y-3">
              <p className="font-semibold">Step-by-Step Refund Request:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Submit refund request via email to support@jyotishwaani.com or through your account dashboard</li>
                <li>Include order/service ID, service date, and reason for refund request</li>
                <li>Provide supporting documentation if applicable (technical issues, screenshots, etc.)</li>
                <li>Support team reviews request within 24-48 business hours</li>
                <li>Refund approval or denial communicated via email</li>
                <li>Approved refunds processed within 5-7 business days</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              4. Refund Request Timeline
            </h2>
            <p>
              <strong>Refund requests must be submitted within 30 days of service delivery.</strong> Requests submitted
              after 30 days will not be considered except in cases of system errors or technical failures caused by
              Jyotishwaani.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              5. Refund Methods
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Original payment method (credit card, debit card, digital wallet, or bank transfer)</li>
              <li>Refunds processed via original payment gateway</li>
              <li>Processing time: 5-7 business days (may vary by payment provider)</li>
              <li>Account credit option available if client prefers (can be used for future services)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              6. Non-Refundable Services
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Services that have been fully delivered, read, and accessed by the client</li>
              <li>Consultation sessions attended by the client</li>
              <li>Instant services that have been successfully delivered</li>
              <li>Services used or modified by the client</li>
              <li>Refund requests submitted after the 30-day deadline without valid justification</li>
              <li>Services cancelled due to client misconduct or violation of Terms & Conditions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              7. Partial Refunds
            </h2>
            <p>In certain circumstances, partial refunds may be issued:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Consultation cancelled within 24 hours: 50% refund issued</li>
              <li>Multiple services requested with partial completion: Proportional refund for uncompleted portion</li>
              <li>Duplicate billing error: Full refund of duplicate charge plus 25% credit for inconvenience</li>
              <li>Service delivery delays beyond stated timelines: 20% refund or rescheduling with priority booking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              8. Exceptional Circumstances
            </h2>
            <p>
              While Jyotishwaani typically follows the above refund policy, exceptional circumstances may warrant
              consideration for refunds outside these guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Extended system outages preventing service delivery (24+ hours)</li>
              <li>Critical technical errors in service delivery caused by Jyotishwaani</li>
              <li>Verified astrologer misconduct or professional violations</li>
              <li>Force majeure events affecting service availability</li>
            </ul>
            <p className="mt-3">
              Requests for exceptions should include detailed documentation and are evaluated on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              9. Replacements Instead of Refunds
            </h2>
            <p>
              In cases of service quality issues or incomplete delivery, Jyotishwaani may offer a replacement service
              instead of a refund:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Incorrect or incomplete reading: Free replacement reading by qualified astrologer</li>
              <li>Technical delivery failure: Redelivery via alternative method at no additional cost</li>
              <li>Client preference: Replacement service instead of refund earns 15% service credit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              10. Account Credits & Store Credit
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Account credits can be applied to any future service purchase</li>
              <li>Credits expire after 12 months of inactivity</li>
              <li>Credits are non-transferable to other users</li>
              <li>Credits cannot be converted to cash refunds</li>
              <li>Account balance is displayed in user dashboard</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              11. Dispute Resolution
            </h2>
            <p>If a client disputes a refund decision:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Submit detailed dispute appeal to support@jyotishwaani.com within 7 days of refund decision</li>
              <li>Include all relevant order details and supporting documentation</li>
              <li>Management team reviews appeal within 5 business days</li>
              <li>Final decision communicated via email</li>
              <li>If dispute remains unresolved, arbitration or mediation may be pursued per Terms & Conditions</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              12. Abusive Refund Patterns
            </h2>
            <p>
              Jyotishwaani reserves the right to refuse refunds and suspend services for users demonstrating patterns of
              abuse, including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Repeatedly requesting refunds for delivered and used services</li>
              <li>Submitting fraudulent refund claims</li>
              <li>Violating the Terms & Conditions</li>
              <li>Using payment chargebacks after receiving refunds</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              13. Payment Disputes with Payment Providers
            </h2>
            <p>
              If a client files a chargeback or payment dispute with their bank or payment provider without first
              attempting resolution through Jyotishwaani's support system, the following may apply:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Chargeback fees may be charged to the client's account</li>
              <li>Account may be suspended pending dispute resolution</li>
              <li>Future service requests may require prepayment</li>
              <li>Client agrees to cooperate in dispute investigation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              14. Changes to Refund Policy
            </h2>
            <p>
              Jyotishwaani reserves the right to modify this Refund Policy at any time. Changes are effective
              immediately upon posting to the website. For refund requests, the policy in effect at the time of service
              purchase applies, except where Jyotishwaani offers more favorable terms to the customer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "#B8956A" }}>
              15. Contact Us
            </h2>
            <p>For questions about refunds or to initiate a refund request:</p>
            <div className="mt-3 p-4" style={{ backgroundColor: "#F0EBDF" }}>
              <p>
                <strong>Email:</strong> support@jyotishwaani.com
              </p>
              <p>
                <strong>Subject Line:</strong> Refund Request - [Order ID]
              </p>
              <p>
                <strong>Response Time:</strong> Within 24-48 business hours
              </p>
              <p className="mt-2">
                <strong>Mailing Address:</strong> Jyotishwaani Services, India
              </p>
            </div>
          </section>

          <div className="mt-12 p-6" style={{ backgroundColor: "#F0EBDF", borderLeft: "4px solid #B8956A" }}>
            <p className="text-sm">
              <strong>Note:</strong> This refund policy applies to all services purchased through Jyotishwaani's website
              and mobile platform. By purchasing services, customers acknowledge they have read and agree to this refund
              policy.
            </p>
          </div>
        </div>
      </div>
    </div></>

  )
}
