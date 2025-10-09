import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion Policy | JyotishWaani",
  description:
    "Learn how JyotishWaani handles user data and how you can request data deletion in compliance with privacy standards.",
};

export default function DataDeletionPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
        Data Deletion Policy
      </h1>

      <section className="space-y-6">
        <p>
          At <strong>JyotishWaani</strong>, we respect your privacy and ensure
          that your personal data is handled responsibly. This page explains how
          you can request the deletion of your personal information.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          1. Information We Store
        </h2>
        <p>
          We only store essential information provided by you, such as name,
          contact details, birth information, and any notes related to your
          astrology consultation.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          2. How to Request Data Deletion
        </h2>
        <p>
          You may request deletion of your data at any time by emailing us at{" "}
          <a
            href="mailto:support@jyotishwaani.com"
            className="text-indigo-700 underline"
          >
            support@jyotishwaani.com
          </a>
          . Your request will be processed within 7 working days.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          3. Automatic Data Removal
        </h2>
        <p>
          If your account remains inactive for more than 12 months, we
          automatically delete or anonymize your stored data.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700">
          4. Compliance
        </h2>
        <p>
          We comply with applicable data protection and privacy regulations to
          safeguard your information.
        </p>

        <p>
          For further questions, please contact{" "}
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
