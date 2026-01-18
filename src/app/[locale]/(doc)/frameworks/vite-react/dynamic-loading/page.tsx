import type { PageProps } from "@/types/page-props";
import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { readers } from "@/infrastructure/i18n/readers";
import { Content } from "@/interfaces/components/content/content";

export default async function DynamicLoadingPage({ params }: PageProps) {
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
            title: t("vite-react.title.text"),
            path: PAGES.frameworks.viteReact.path,
          },
          { title: t("vite-react.dynamic-loading.title.text") },
        ]}
        content={t("vite-react.dynamic-loading.article.content")}
      />
    </>
  );
}
