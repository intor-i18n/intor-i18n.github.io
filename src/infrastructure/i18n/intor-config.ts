import { defineIntorConfig } from "intor";
import { LOCALES_ARRAY } from "@/infrastructure/i18n/locale";

// Config
export const intorConfig = defineIntorConfig({
  id: "i18n",
  // defaultLocale: DEFAULT_LOCALE,
  defaultLocale: "zh-TW",
  supportedLocales: LOCALES_ARRAY,
  loader: { type: "local", rootDir: "messages" },
  routing: { localePrefix: "all" },
});
