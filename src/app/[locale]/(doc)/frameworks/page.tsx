import type { LocalizedPageProps } from "@/types/localized-page-props";
import { getTranslator } from "intor/server";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { readers } from "@/infrastructure/i18n/readers";
import { Content } from "@/interfaces/components/content/content";
import { FrameworkCards } from "@/interfaces/components/pages/frameworks/framework-cards";

export default async function FrameworksPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const { t } = await getTranslator(intorConfig, {
    locale,
    readers,
    preKey: "content.frameworks",
  });

  return (
    <>
      <Content
        breadcrumbs={[{ title: t("title.text") }]}
        content={t("article.content")}
      >
        <FrameworkCards />
      </Content>
    </>
  );
}
