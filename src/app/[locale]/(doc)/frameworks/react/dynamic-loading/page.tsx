import type { LocalizedPageProps } from "@/types/localized-page-props";
import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { readers } from "@/infrastructure/i18n/readers";
import { Content } from "@/interfaces/components/content/content";

export default async function DynamicLoadingPage({
  params,
}: LocalizedPageProps) {
  const { locale } = await params;
  const { t } = await getTranslator(intorConfig, {
    locale,
    readers,
    preKey: "content.frameworks",
  });

  return (
    <>
      <Content
        breadcrumbs={[
          { title: t("title.text"), path: PAGES.frameworks.path },
          {
            title: t("react.title.text"),
            path: PAGES.frameworks.react.path,
          },
          { title: t("react.dynamic-loading.title.text") },
        ]}
        content={t("react.dynamic-loading.article.content")}
      />
    </>
  );
}
