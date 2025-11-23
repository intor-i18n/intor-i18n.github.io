import "@/interfaces/styles/globals.css";
import type { Metadata } from "next";
import { intor } from "intor/server";
import { i18nConfig } from "@/infrastructure/i18n/i18n-config";
import { LOCALE_PARAMS } from "@/infrastructure/i18n/locale";
import { mdReader } from "@/infrastructure/i18n/md-reader";
import { I18nProvider } from "@/infrastructure/i18n/providers/i18n-provider";
import { ThemeProvider } from "@/interfaces/components/shadcn/theme/theme-provider";

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

type Props = Readonly<{
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}>;

export default async function RootLayout({ params, children }: Props) {
  const { locale } = await params;
  const value = await intor(
    i18nConfig,
    { locale },
    { exts: [".json", ".md"], messagesReader: mdReader },
  );

  return (
    <html lang={value.initialLocale} suppressHydrationWarning>
      <body className="flex justify-center antialiased">
        <I18nProvider value={value}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
