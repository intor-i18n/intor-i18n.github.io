import type { LocaleParams } from "@/infrastructure/i18n/locale";
import { getTranslator } from "intor/server";
import { PageCsr } from "@/app/[locale]/(home)/page-csr";
import { i18nConfig } from "@/infrastructure/i18n/i18n-config";

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  const { t } = await getTranslator({ config: i18nConfig, locale });

  return (
    <div className="flex flex-col">
      <p>{t("123")}</p>

      <PageCsr />
    </div>
  );
}
