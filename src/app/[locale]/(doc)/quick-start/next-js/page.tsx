import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { mdReader } from "@/infrastructure/i18n/md-reader";
import { Content } from "@/interfaces/components/content/content";

export default async function NextJsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await getTranslator({
    config: intorConfig,
    locale,
    extraOptions: { exts: [".json", ".md"], messagesReader: mdReader },
  });

  return (
    <>
      <Content
        breadcrumbs={[
          { i18nKey: PAGES.quickStart.i18nKey, path: PAGES.quickStart.path },
          { i18nKey: PAGES.nextJs.i18nKey },
        ]}
        content={t("articles.quick-start.content")}
      ></Content>
    </>
  );
}
