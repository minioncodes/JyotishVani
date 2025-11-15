const intlConfig = {
  locales: ["en", "hi"],
  defaultLocale: "hi",
  localePrefix: "always",
} satisfies {
  locales: string[];
  defaultLocale: string;
  localePrefix?: "as-needed" | "always" | "never";
};

export default intlConfig;
