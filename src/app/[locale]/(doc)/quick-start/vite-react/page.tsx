import type { LocaleParams } from "@/infrastructure/i18n/locale";
import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { i18nConfig } from "@/infrastructure/i18n/i18n-config";
import { mdReader } from "@/infrastructure/i18n/md-reader";
import { Content } from "@/interfaces/components/content/content";

export default async function ViteReactPage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  const { t } = await getTranslator({
    config: i18nConfig,
    locale,
    extraOptions: { exts: [".json", ".md"], messagesReader: mdReader },
  });

  return (
    <>
      <Content
        breadcrumbs={[
          { i18nKey: PAGES.quickStart.i18nKey, path: PAGES.quickStart.path },
          { i18nKey: PAGES.viteReact.i18nKey },
        ]}
        content={t("articles.vite-react.content")}
      ></Content>
    </>
  );
}
