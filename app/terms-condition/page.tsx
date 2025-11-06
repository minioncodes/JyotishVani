import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function TermsAndConditions() {
  return (
    <>
    <Navbar/>
        <div className="min-h-screen top-30" style={{ backgroundColor: "#F5F1E8" }}>
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm" style={{ backgroundColor: "#F5F1E8" }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-75 transition-opacity">
            <ArrowLeft className="w-5 h-5" style={{ color: "#B8956A" }} />
            <span className="text-sm font-medium" style={{ color: "#B8956A" }}>
              Back
            </span>
          </Link>
          <h1 className="text-xl font-bold" style={{ color: "#2D2D2D" }}>
            Terms & Conditions
          </h1>
          <div className="w-16"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-sm max-w-none">
          {/* Last Updated */}
          <p className="text-sm text-gray-600 mb-8">
            <strong>Last Updated:</strong>{" "}
            {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          {/* Welcome Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#2D2D2D" }}>
              Welcome to Jyotishwaani
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms and Conditions ("Agreement") govern your use of the Jyotishwaani website and services
              ("Service"). By accessing and using this website, you acknowledge that you have read, understood, and
              agree to be bound by all of the terms and conditions contained herein.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Business Entity:</strong> Jyotishwaani is the business entity providing astrology services through
              this platform.
            </p>
          </section>

          {/* Section 1: Service Description */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              1. Service Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Jyotishwaani provides astrology and divination services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>Horoscope readings and predictions</li>
              <li>Kundali (Birth Chart) analysis and interpretations</li>
              <li>Personal consultations with certified astrologers</li>
              <li>Astrological guidance on relationships, career, and life events</li>
              <li>Remedial suggestions and astrological advice</li>
              <li>Compatibility analysis and matching services</li>
            </ul>
          </section>

          {/* Section 2: Disclaimer */}
          <section
            className="mb-8 p-4 rounded-lg"
            style={{ backgroundColor: "#FFF9F0", borderLeft: "4px solid #B8956A" }}
          >
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              2. Important Disclaimer
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Astrology is not a science.</strong> The services provided by Jyotishwaani are for entertainment
              and informational purposes only. While our astrologers are experienced practitioners, astrology is based
              on beliefs and interpretations, not scientific evidence.
            </p>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>• No Guarantees:</strong> We do not guarantee specific outcomes or results from our readings and
                consultations.
              </p>
              <p>
                <strong>• Not Medical/Legal Advice:</strong> Astrological readings are not a substitute for professional
                medical, legal, financial, or psychological advice. Please consult qualified professionals for such
                matters.
              </p>
              <p>
                <strong>• Personal Responsibility:</strong> You are solely responsible for decisions made based on
                astrological guidance. Jyotishwaani shall not be liable for consequences arising from such decisions.
              </p>
              <p>
                <strong>• Accuracy:</strong> We strive for accuracy but do not warrant that interpretations or
                predictions will be accurate or fulfilled.
              </p>
            </div>
          </section>

          {/* Section 3: User Eligibility */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              3. User Eligibility
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By using Jyotishwaani services, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2 mt-3">
              <li>You are at least 18 years of age or have parental consent</li>
              <li>You have the legal capacity to enter into this Agreement</li>
              <li>You are using the Service for lawful purposes only</li>
              <li>You will not use the Service for any illegal or unauthorized purpose</li>
            </ul>
          </section>

          {/* Section 4: Payment & Monetization */}
          <section className="mb-8 p-4 rounded-lg" style={{ backgroundColor: "#F0F9FF" }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              4. Payment, Fees & Refund Policy
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">4.1 Pricing</h3>
                <p>
                  All prices are listed in the applicable currency on our website. Prices are subject to change without
                  prior notice.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4.2 Payment Methods</h3>
                <p>
                  We accept various payment methods including credit cards, debit cards, and digital payment platforms.
                  Payment processing is handled by third-party payment processors.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4.3 Billing</h3>
                <p>
                  You authorize Jyotishwaani to charge your selected payment method for services rendered. You are
                  responsible for all charges incurred.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4.4 Refund Policy</h3>
                <p>
                  Refunds are available within 7 days of service purchase if the service has not been delivered or
                  accessed. Refunds will not be issued for consultations after completion or recordings after viewing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">4.5 Recurring Charges</h3>
                <p>
                  If you subscribe to recurring services, you agree to automatic billing at the agreed frequency. You
                  may cancel at any time.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Collection & Privacy */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              5. Data Collection & Privacy
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">5.1 Information We Collect</h3>
                <p>To provide astrology services, we collect personal information including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Full name and contact details</li>
                  <li>Date, time, and place of birth</li>
                  <li>Email address and phone number</li>
                  <li>Payment and billing information</li>
                  <li>Communication history with astrologers</li>
                  <li>Usage data and analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.2 Use of Information</h3>
                <p>We use collected information to:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Provide astrology services and consultations</li>
                  <li>Process payments and transactions</li>
                  <li>Send service updates and communications</li>
                  <li>Improve our Service and user experience</li>
                  <li>Comply with legal obligations</li>
                  <li>Conduct analytics and research</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.3 Data Security</h3>
                <p>
                  We implement industry-standard security measures to protect your data. However, no transmission over
                  the internet is 100% secure.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.4 Third-Party Sharing</h3>
                <p>
                  We do not sell your personal data. We may share information with service providers, payment
                  processors, and legal authorities when required.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">5.5 Data Retention</h3>
                <p>
                  We retain personal data as long as necessary to provide services and comply with legal requirements.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: User Conduct */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              6. User Conduct & Restrictions
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>Use the Service for illegal, fraudulent, or harmful activities</li>
              <li>Harass, abuse, or discriminate against astrologers or other users</li>
              <li>Attempt to hack, breach, or compromise the Service security</li>
              <li>Share false or misleading information about birth details</li>
              <li>Engage in unauthorized commercial use of the Service</li>
              <li>Reproduce, duplicate, or distribute Service content without permission</li>
              <li>Use automated systems to access the Service without authorization</li>
              <li>Engage in any activity that disrupts Service availability</li>
            </ul>
          </section>

          {/* Section 7: Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              7. Intellectual Property Rights
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              All content, designs, text, graphics, images, and other materials on the Jyotishwaani platform ("Content")
              are protected by intellectual property laws. You may not reproduce, modify, or distribute this Content
              without explicit written permission from Jyotishwaani.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Astrological readings and interpretations provided during consultations may be used by us for service
              improvement and training purposes, unless you specifically request confidentiality.
            </p>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section className="mb-8 p-4 rounded-lg" style={{ backgroundColor: "#FFF0F5" }}>
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>Jyotishwaani is provided "as is" without warranties of any kind</li>
              <li>We are not liable for any indirect, incidental, or consequential damages</li>
              <li>Our liability is limited to the amount paid for services in the past 12 months</li>
              <li>We are not responsible for third-party services or content</li>
              <li>We are not liable for service interruptions or technical failures</li>
            </ul>
          </section>

          {/* Section 9: Jurisdiction & Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              9. Jurisdiction & Dispute Resolution
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">9.1 Governing Law</h3>
                <p>
                  These Terms and Conditions are governed by and construed in accordance with the laws of India, without
                  regard to its conflict of law principles.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">9.2 Jurisdiction</h3>
                <p>
                  All legal proceedings and disputes arising from this Agreement shall be subject to the exclusive
                  jurisdiction of the courts located in India.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">9.3 Dispute Resolution</h3>
                <p>
                  In case of dispute, users are encouraged to first contact our support team. We will attempt to resolve
                  disputes through good faith negotiation before pursuing legal action.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">9.4 Arbitration</h3>
                <p>
                  By accepting these terms, you agree to resolve disputes through arbitration rather than court
                  proceedings, except for matters relating to intellectual property or emergency relief.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Termination */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              10. Termination of Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Jyotishwaani reserves the right to terminate or suspend your account and access to services if:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
              <li>You violate these Terms and Conditions</li>
              <li>You engage in fraudulent or illegal activities</li>
              <li>You harass or threaten our astrologers or staff</li>
              <li>You fail to pay charges or dispute legitimate payments</li>
              <li>We are required to do so by legal authorities</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Upon termination, your right to use the Service immediately ceases.
            </p>
          </section>

          {/* Section 11: Modifications to Terms */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              11. Modifications to Terms & Service
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Jyotishwaani reserves the right to modify these Terms and Conditions at any time. Material changes will be
              communicated via email or prominent notice on the website. Your continued use of the Service after
              modifications constitutes acceptance of updated terms.
            </p>
          </section>

          {/* Section 12: Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              12. Third-Party Links & Services
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites and services. We are not responsible for the
              content, accuracy, or practices of these external sites. Your use of third-party services is at your own
              risk and governed by their terms.
            </p>
          </section>

          {/* Section 13: Accessibility */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              13. Accessibility & Communication
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Jyotishwaani communicates with users primarily through email and in-app notifications. You agree to
              receive service-related communications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You may opt out of promotional communications but cannot opt out of essential service notifications.
            </p>
          </section>

          {/* Section 14: Entire Agreement */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              14. Entire Agreement
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions, along with our Privacy Policy, constitute the entire agreement between you and
              Jyotishwaani regarding the use of the Service and supersede all prior negotiations, understandings, and
              agreements.
            </p>
          </section>

          {/* Section 15: Severability */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3" style={{ color: "#B8956A" }}>
              15. Severability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms and Conditions is found to be invalid or unenforceable, such provision
              shall be modified to the minimum extent necessary, and the remaining provisions shall remain in full force
              and effect.
            </p>
          </section>

          {/* Contact Section */}
          <section className="mb-12 p-6 rounded-lg" style={{ backgroundColor: "#F5E6D3" }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: "#B8956A" }}>
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions, concerns, or complaints regarding these Terms and Conditions or our services,
              please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> support@jyotishwaani.com
              </p>
              <p>
                <strong>Address:</strong> Jyotishwaani, India
              </p>
              <p>
                <strong>Phone:</strong> Available through website contact form
              </p>
              <p>
                <strong>Response Time:</strong> We aim to respond to inquiries within 48 business hours
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-600 pt-8 border-t border-gray-300">
            <p>
              By using Jyotishwaani, you acknowledge that you have read and understood these Terms and Conditions and
              agree to be bound by them.
            </p>
            <p className="mt-2">© 2025 Jyotishwaani. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
    </>

  )
}
