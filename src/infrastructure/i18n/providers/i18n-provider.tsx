"use client";

import type { IntorProviderProps } from "intor/next";
import { IntorProvider } from "intor/next";

export function I18nProvider({
  value,
  children,
}: {
  value: IntorProviderProps["value"];
  children: IntorProviderProps["children"];
}) {
  return <IntorProvider value={value}>{children}</IntorProvider>;
}
