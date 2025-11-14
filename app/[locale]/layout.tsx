import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hi" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../message/${locale}.json`)).default;
  } catch {
    messages = (await import(`../message/hi.json`)).default;
  }

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
