import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-quill-new/dist/quill.snow.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JyotishWaani | Vedic Astrology, Kundli Analysis & Remedies in Lucknow",
  description:
    "JyotishWaani offers expert Vedic astrology services in Lucknow — personalized Kundli analysis, marriage & career predictions, gemstone recommendations, and spiritual remedies guided by Banaras Wale Guru Ji.",
  keywords: [
    "JyotishWaani",
    "Astrology in Lucknow",
    "Vedic astrology",
    "Kundli analysis",
    "Horoscope",
    "Marriage astrology",
    "Career astrology",
    "Gemstone recommendations",
    "Astrologer in Lucknow",
    "Banaras Wale Guru Ji",
    "Online astrology consultation",
  ],
  authors: [{ name: "JyotishWaani Team" }],
  creator: "JyotishWaani",
  publisher: "JyotishWaani",
  openGraph: {
    title: "JyotishWaani | Vedic Astrology & Kundli Analysis in Lucknow",
    description:
      "Get accurate predictions and practical remedies with JyotishWaani — your trusted guide for Vedic astrology, horoscope, and spiritual insights.",
    url: "https://www.jyotishwaani.com",
    siteName: "JyotishWaani",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.jyotishwaani.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JyotishWaani - Vedic Astrology & Horoscope",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JyotishWaani | Trusted Vedic Astrology & Horoscope Guidance",
    description:
      "Personalized Kundli readings, gemstone remedies, and astrological solutions for life, career, and marriage — guided by ancient wisdom.",
    images: ["https://www.jyotishwaani.com/og-image.jpg"],
    creator: "@JyotishWaani",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.jyotishwaani.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
