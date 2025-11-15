import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hi" }];
}

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;

  const { locale } = await props.params;

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
