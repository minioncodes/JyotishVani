// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <meta
          name="google-site-verification"
          content="KMzlY12tp_yI_3dXiRVxcPqC2e6JHqJdOvdyTSTGXoY"
        />
        {/* Google Tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-FF1EX4EHJL"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FF1EX4EHJL');
        `}
      </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
