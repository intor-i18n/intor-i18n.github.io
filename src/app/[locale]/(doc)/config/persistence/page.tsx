import type { LocalizedPageProps } from "@/types/localized-page-props";
import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { readers } from "@/infrastructure/i18n/readers";
import { Content } from "@/interfaces/components/content/content";

export default async function ConfigPersistencePage({
  params,
}: LocalizedPageProps) {
  const { locale } = await params;
  const { t } = await getTranslator(intorConfig, {
    locale,
    readers,
    preKey: "content.config",
  });

  return (
    <>
      <Content
        breadcrumbs={[
          { title: t("title.text"), path: PAGES.config.path },
          { title: t("persistence.title.text") },
        ]}
        content={t("persistence.article.content")}
      />
    </>
  );
}
