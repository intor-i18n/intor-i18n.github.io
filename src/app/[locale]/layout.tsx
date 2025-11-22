import "@/interfaces/styles/globals.css";
import type { Metadata } from "next";
import { intor } from "intor";
import { i18nConfig } from "@/infrastructure/i18n/i18n-config";
import { LOCALE_PARAMS } from "@/infrastructure/i18n/locale";
import { mdReader } from "@/infrastructure/i18n/md-reader";
import { I18nProvider } from "@/infrastructure/i18n/providers/i18n-provider";

export async function generateStaticParams() {
  return LOCALE_PARAMS;
}

// Metadata: icons
export const metadata: Metadata = {
  icons: {
    // Favicon // + media: "(prefers-color-scheme: light)",
    icon: [
      { url: "/icons/light/favicon.ico" },
      { url: "/icons/light/icon0.svg", type: "image/svg+xml" },
      {
        url: "/icons/light/icon1.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    // Apple Touch Icon
    apple: [
      {
        url: "/icons/light/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>) {
  const { locale } = await params;
  const value = await intor(
    i18nConfig,
    { locale },
    { exts: [".json", ".md"], messagesReader: mdReader },
  );

  return (
    <html lang="en">
      <body className="antialiased">
        {locale}
        <I18nProvider value={value}>{children}</I18nProvider>
      </body>
    </html>
  );
}
