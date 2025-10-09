import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | JyotishWaani",
  description:
    "Read the Terms of Service for JyotishWaani — your trusted source for authentic Vedic astrology guidance, consultations, and personalized remedies.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        Terms of Service
      </h1>

      <section className="space-y-6">
        <p>
          Welcome to <strong>JyotishWaani</strong>. By using our website and
          astrology services, you agree to the following terms and conditions.
          Please read them carefully before proceeding.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          1. Services Offered
        </h2>
        <p>
          JyotishWaani provides astrology consultations, horoscope analysis,
          gemstone recommendations, and related spiritual guidance. All
          predictions and remedies are based on traditional Vedic astrology and
          should be considered as guiding tools rather than guaranteed outcomes.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          2. Personal Responsibility
        </h2>
        <p>
          Our services are designed for self-understanding and spiritual growth.
          JyotishWaani shall not be held liable for any actions, decisions, or
          events arising from interpretations or advice given on this platform.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          3. Payments & Refunds
        </h2>
        <p>
          All payments for consultations and reports are final. Refunds may be
          provided only in cases of duplicate transactions or technical issues.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          4. Data & Privacy
        </h2>
        <p>
          We collect limited personal information (like birth details and
          contact data) solely to prepare accurate reports. Your information is
          never sold or shared with third parties.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          5. Modifications
        </h2>
        <p>
          JyotishWaani reserves the right to update these Terms of Service at
          any time. Changes will be reflected on this page with an updated date.
        </p>

        <p>
          If you have questions about our Terms, contact us at{" "}
          <a
            href="mailto:help@jyotishwaani.com"
            className="text-indigo-700 underline"
          >
            help@jyotishwaani.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
