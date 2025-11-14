// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "hi"] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Normalize locale (fallback to Hindi)
  const normalizedLocale: Locale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "hi";

  // Load messages JSON
  const messages = (
    await import(`../app/message/${normalizedLocale}.json`)
  ).default;

  return {
    locale: normalizedLocale,
    messages
  };
});
