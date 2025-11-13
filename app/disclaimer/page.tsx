"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <>
      <main className="relative min-h-screen bg-gradient-to-b from-white via-[#FAF8F3] to-white px-6 py-16 mt-10">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 font-[Cinzel]">
            Disclaimer
          </h1>

          {/* Last updated */}
          <p className="text-center text-gray-500 text-sm mb-12">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          {/* Content */}
          <div className="space-y-10 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                1. General Disclaimer
              </h2>
              <p>
                The information, guidance, and opinions provided on this website{" "}
                <span className="font-semibold">JyotishWaani</span> and during any
                consultation, report, message, or communication (collectively,
                the “Services”) are based on traditional astrological principles
                and the personal interpretation of Acharya Sumit Tiwari.
                Astrology is a subject of belief and interpretation, and outcomes
                can vary from person to person.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                2. Not a Substitute for Professional Advice
              </h2>
              <p>
                Nothing on this website or within our Services should be treated
                as a substitute for professional advice in areas such as medical,
                legal, financial, psychological, or any other licensed field. For
                such matters, you should always consult a qualified professional
                in that domain.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                3. Accuracy & Limitation of Liability
              </h2>
              <p>
                While we make reasonable efforts to provide accurate and
                insightful information, we do not guarantee the accuracy,
                completeness, timeliness, or specific results of any prediction,
                suggestion, or recommendation. All decisions you take based on
                our Services are your own responsibility.
              </p>
              <p className="mt-3">
                By using our Services, you agree that JyotishWaani, its
                astrologer(s), owners, employees, or representatives shall not be
                liable for any direct, indirect, incidental, consequential, or
                special loss or damage arising out of, or in any way connected
                with, the use of our Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                4. User Responsibility
              </h2>
              <ul className="list-disc list-inside space-y-1">
                <li>You acknowledge that you are using our Services voluntarily and at your own discretion.</li>
                <li>You agree that any action you take based on our guidance is your personal choice.</li>
                <li>You understand that astrology is a guiding tool and not a guaranteed solution.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                5. Age Restriction
              </h2>
              <p>
                Our Services are not intended for individuals under 18 years of
                age without the consent and supervision of a parent or legal
                guardian.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                6. Updates to This Disclaimer
              </h2>
              <p>
                JyotishWaani reserves the right to modify, update, or change this
                Disclaimer and any content on the website at any time without
                prior notice. Continued use of the website constitutes your
                acceptance of such changes.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
