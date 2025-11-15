const intlConfig = {
  locales: ["en", "hi"],
  defaultLocale: "hi",
  localePrefix: "always",
  localeDetection: false,
} satisfies {
  locales: string[];
  defaultLocale: string;
  localePrefix?: "as-needed" | "always" | "never";
  localeDetection?: boolean;
};

export default intlConfig;
