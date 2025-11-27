import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { mdReader } from "@/infrastructure/i18n/md-reader";
import { Content } from "@/interfaces/components/content/content";

export default async function ViteReactPage({
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
          { title: PAGES.frameworks.title, path: PAGES.frameworks.path },
          {
            title: PAGES.frameworks.viteReact.title,
            path: PAGES.frameworks.viteReact.path,
          },
          { title: PAGES.frameworks.viteReact.messagesLoading.title },
        ]}
        content={t(PAGES.frameworks.viteReact.messagesLoading.content)}
      />
    </>
  );
}
