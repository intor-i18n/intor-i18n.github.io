import { defineIntorConfig } from "intor/config";
import { DEFAULT_LOCALE, LOCALES_ARRAY } from "@/infrastructure/i18n/locale";

// Config
export const intorConfig = defineIntorConfig({
  id: "i18n",
  defaultLocale: DEFAULT_LOCALE,
  supportedLocales: LOCALES_ARRAY,
  loader: { type: "local", rootDir: "messages" },
  routing: { prefix: "all" },
});
