import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "hi" }, { locale: "en" }];
}

// ⭐ Locale-Specific SEO Tags
export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isHindi = locale === "hi";

  return {
    title: isHindi
      ? "ज्योतिषवाणी – आपकी ज्योतिषीय मार्गदर्शिका"
      : "JyotishWaani – Your Trusted Astrology Guide",

    description: isHindi
      ? "दैनिक राशिफल, कुंडली विश्लेषण और वैदिक ज्योतिष मार्गदर्शन।"
      : "Daily horoscope, kundli analysis and accurate Vedic astrology guidance.",

    keywords: isHindi
      ? ["ज्योतिष", "राशिफल", "कुंडली", "वैदिक ज्योतिष"]
      : ["astrology", "horoscope", "kundli", "vedic astrology"],

    openGraph: {
      title: isHindi
        ? "ज्योतिषवाणी – आपकी ज्योतिषीय मार्गदर्शिका"
        : "JyotishWaani – Your Trusted Astrology Guide",
      description: isHindi
        ? "दैनिक राशिफल और वैदिक ज्योतिष समाधान।"
        : "Daily horoscope and Vedic astrology remedies.",
      url:
        locale === "hi"
          ? "https://jyotishwaani.com/hi"
          : "https://jyotishwaani.com/en",
      siteName: "JyotishWaani",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "JyotishWaani Banner",
        },
      ],
      locale,
      type: "website",
    },

    alternates: {
      canonical:
        locale === "hi"
          ? "https://jyotishwaani.com/hi"
          : "https://jyotishwaani.com/en",
      languages: {
        en: "https://jyotishwaani.com/en",
        hi: "https://jyotishwaani.com/hi",
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
