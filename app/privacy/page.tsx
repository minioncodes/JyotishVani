"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar/>
      <main className="relative min-h-screen bg-gradient-to-b from-white via-[#FAF8F3] to-white px-6 py-16 mt-10">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 font-[Cinzel]">
            Privacy <span className="text-[#C5A46D]">Policy</span>
          </h1>

          {/* Last updated */}
          <p className="text-center text-gray-500 text-sm mb-12">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          {/* Content */}
          <div className="space-y-10 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. Introduction
              </h2>
              <p>
                At <span className="font-semibold">JyotishWaani</span>, we value
                your trust and are committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, and safeguard your
                personal information when you access our astrology services,
                website, and mobile platforms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. Information We Collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Personal details such as your name, email, phone number, and
                  date of birth
                </li>
                <li>
                  Birth details including date, time, and place of birth (for
                  horoscope and Kundli analysis)
                </li>
                <li>Payment and billing details (for paid consultations)</li>
                <li>
                  Technical data such as IP address, browser type, and device
                  information
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. How We Use Your Information
              </h2>
              <p>Your information is used for purposes such as:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  Providing personalized horoscope, Kundli, and astrological
                  guidance
                </li>
                <li>Improving our website, content, and user experience</li>
                <li>Processing bookings, consultations, and payments</li>
                <li>
                  Sending service updates, newsletters, or promotional content
                  (only if you opt in)
                </li>
                <li>Ensuring platform security and fraud prevention</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                4. Data Sharing & Disclosure
              </h2>
              <p>
                We respect your privacy. Your data will never be sold. Limited
                information may be shared with trusted third parties only for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Payment gateway providers for secure transactions</li>
                <li>Email/notification services to keep you updated</li>
                <li>
                  Legal authorities if required by law or to protect our rights
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                5. Data Security
              </h2>
              <p>
                We adopt strict technical and organizational measures to protect
                your data. However, please note that no method of online data
                transfer is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                6. Your Rights
              </h2>
              <p>
                You have the right to access, correct, or request deletion of
                your personal data. For any such requests, please contact us
                using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                7. Third-Party Links
              </h2>
              <p>
                Our website may include links to third-party sites. We are not
                responsible for their privacy practices or content. We encourage
                you to review their policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                8. Updates to this Policy
              </h2>
              <p>
                This Privacy Policy may be updated occasionally to reflect
                changes in our services or regulations. The revised policy will
                be posted on this page with the updated date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                9. Contact Us
              </h2>
              <p>
                If you have any questions or concerns about this Privacy Policy,
                you can reach us at:{" "}
                <a
                  href="mailto:help@jyotishwaani.com"
                  className="text-[#C5A46D] underline"
                >
                  help@jyotishwaani.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
    </>
  );
}
