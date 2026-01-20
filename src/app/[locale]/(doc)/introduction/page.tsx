import type { LocalizedPageProps } from "@/types/localized-page-props";
import { mdReader } from "@intor/reader-md";
import { getTranslator } from "intor/server";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { Content } from "@/interfaces/components/content/content";

export default async function IntroductionPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  const { t } = await getTranslator(intorConfig, {
    locale,
    readers: { md: mdReader },
    preKey: "content.introduction",
  });

  return (
    <>
      <Content
        breadcrumbs={[{ title: t("title.text") }]}
        // content={t("article.content")}
      ></Content>
    </>
  );
}
