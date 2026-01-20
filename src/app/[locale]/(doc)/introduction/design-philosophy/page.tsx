import type { LocalizedPageProps } from "@/types/localized-page-props";
import { mdReader } from "@intor/reader-md";
import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { Content } from "@/interfaces/components/content/content";

export default async function DesignPhilosiphyPage({
  params,
}: LocalizedPageProps) {
  const { locale } = await params;
  const { t } = await getTranslator(intorConfig, {
    locale,
    readers: { md: mdReader },
    preKey: "content.introduction",
  });

  return (
    <>
      <Content
        breadcrumbs={[
          { title: t("title.text"), path: PAGES.introduction.path },
          { title: t("design-philosophy.title.text") },
        ]}
        content={t("design-philosophy.article.content")}
      ></Content>
    </>
  );
}
