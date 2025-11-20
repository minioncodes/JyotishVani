// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <meta
          name="google-site-verification"
          content="KMzlY12tp_yI_3dXiRVxcPqC2e6JHqJdOvdyTSTGXoY"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
