import { getTranslator } from "intor/server";
import { PageCsr } from "@/app/[locale]/(home)/page-csr";
import { intorConfig } from "@/infrastructure/i18n/intor-config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await getTranslator({ config: intorConfig, locale });

  return (
    <div className="flex flex-col">
      <p>{t("123")}</p>

      <PageCsr />
    </div>
  );
}
