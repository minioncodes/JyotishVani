"use client";

import { useTranslations } from "next-intl";

export default function DisclaimerPage() {
  const t = useTranslations("disclaimer");

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-white via-[#FAF8F3] to-white px-6 py-16 mt-10">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 font-[Cinzel]">
          {t("title")}
        </h1>

        {/* Last updated */}
        <p className="text-center text-gray-500 text-sm mb-12">
          {t("updated")}: {new Date().toLocaleDateString()}
        </p>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("s1_title")}
            </h2>
            <p>{t("s1_text")}</p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("s2_title")}
            </h2>
            <p>{t("s2_text")}</p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("s3_title")}
            </h2>
            <p>{t("s3_text1")}</p>
            <p className="mt-3">{t("s3_text2")}</p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("s4_title")}
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>{t("s4_li1")}</li>
              <li>{t("s4_li2")}</li>
              <li>{t("s4_li3")}</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("s5_title")}
            </h2>
            <p>{t("s5_text")}</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {t("s6_title")}
            </h2>
            <p>{t("s6_text")}</p>
          </section>

        </div>
      </div>
    </main>
  );
}
