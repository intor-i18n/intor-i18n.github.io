import type { PageProps } from "@/types/page-props";
import { getTranslator } from "intor/server";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { readers } from "@/infrastructure/i18n/readers";
import { Content } from "@/interfaces/components/content/content";

export default async function IcuPage({ params }: PageProps) {
  const { locale } = await params;
  const { t } = await getTranslator(intorConfig, {
    locale,
    readers,
    preKey: "content.icu",
  });

  return (
    <>
      <Content
        breadcrumbs={[{ title: t("title.text") }]}
        content={t("article.content")}
      />
    </>
  );
}
