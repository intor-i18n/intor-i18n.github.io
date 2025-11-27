import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { mdReader } from "@/infrastructure/i18n/md-reader";
import { Content } from "@/interfaces/components/content/content";
import { FrameworkCards } from "@/interfaces/components/pages/quick-start/framework-cards";

export default async function FrameworksPage({
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
        breadcrumbs={[{ title: PAGES.frameworks.title }]}
        content={t(PAGES.frameworks.content)}
      >
        <FrameworkCards />
      </Content>
    </>
  );
}
