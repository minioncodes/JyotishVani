"use client";

import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white via-[#FAF8F3] to-white px-6 py-16 mt-10">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 font-[Cinzel]">
          {t("title")} <span className="text-[#B22222]">{t("highlight")}</span>
        </h1>

        {/* Last Updated */}
        <p className="text-center text-gray-500 text-sm mb-12">
          {t("updated")}: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s1_title")}</h2>
            <p>{t("s1_text")}</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s2_title")}</h2>
            <p>{t("s2_text")}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t("s2_li1")}</li>
              <li>{t("s2_li2")}</li>
              <li>{t("s2_li3")}</li>
              <li>{t("s2_li4")}</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s3_title")}</h2>
            <p>{t("s3_text")}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t("s3_li1")}</li>
              <li>{t("s3_li2")}</li>
              <li>{t("s3_li3")}</li>
              <li>{t("s3_li4")}</li>
              <li>{t("s3_li5")}</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s4_title")}</h2>
            <p>{t("s4_text")}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t("s4_li1")}</li>
              <li>{t("s4_li2")}</li>
              <li>{t("s4_li3")}</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s5_title")}</h2>
            <p>{t("s5_text")}</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s6_title")}</h2>
            <p>{t("s6_text")}</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s7_title")}</h2>
            <p>{t("s7_text")}</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s8_title")}</h2>
            <p>{t("s8_text")}</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{t("s9_title")}</h2>
            <p>
              {t("s9_text")}{" "}
              <a href="mailto:help@jyotishwaani.com" className="text-[#B22222] underline">
                help@jyotishwaani.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
