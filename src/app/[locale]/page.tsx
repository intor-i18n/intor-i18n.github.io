import type { LocaleParams } from "@/infrastructure/i18n/locale";
import { getTranslator } from "intor";
import { i18nConfig } from "@/infrastructure/i18n/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  const { t, messages } = await getTranslator({ config: i18nConfig, locale });
  console.log(messages);

  return (
    <div>
      <p>locale: {locale}</p>
      <p>Test: {t("home.meta.description.display")}</p>
    </div>
  );
}
