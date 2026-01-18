import "@/interfaces/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { mdReader } from "@intor/reader-md";
import { IntorProvider } from "intor/react";
import { intor } from "intor/server";
import { intorConfig } from "@/infrastructure/i18n/intor-config";
import { LOCALES_ARRAY } from "@/infrastructure/i18n/locale";
import { ThemeProvider } from "@/interfaces/components/shadcn/theme/theme-provider";

export async function generateStaticParams() {
  return LOCALES_ARRAY.map((locale) => ({ locale }));
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
  children: ReactNode;
}>;

export default async function RootLayout({ params, children }: Props) {
  const { locale } = await params;
  const value = await intor(intorConfig, locale, { readers: { md: mdReader } });

  return (
    <html
      lang={value.locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        id="web-root"
        className="flex justify-center antialiased"
        suppressHydrationWarning
      >
        <IntorProvider value={value}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </IntorProvider>
      </body>
    </html>
  );
}
