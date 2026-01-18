import { mdReader } from "@intor/reader-md";
import { getTranslator } from "intor/server";
import { PAGES } from "@/config/pages";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { Content } from "@/interfaces/components/content/content";

export default async function MessagesLoadingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t } = await getTranslator(intorConfig, {
    locale,
    readers: { md: mdReader },
  });

  return (
    <>
      <Content
        breadcrumbs={[
          { title: " PAGES.frameworks.title", path: PAGES.frameworks.path },
          {
            title: "PAGES.frameworks.nextJs.title",
            path: PAGES.frameworks.nextJs.path,
          },
          { title: "PAGES.frameworks.nextJs.messagesLoading.title" },
        ]}
        content={"content"}
      />
    </>
  );
}
