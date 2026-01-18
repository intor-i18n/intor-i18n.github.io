# 動態載入

本頁示範在 Vite + React 專案中，當需要更彈性的載入策略時，
如何使用 Intor 動態載入語言檔。

---

> 若希望減少初次 bundle 體積，或需要依語系動態取得最新語言檔，  
> 則可改用動態載入，將 `messages` 的載入時機延後至實際使用時。

本頁延續 [前一章](../vite-react) 的範例，沿用相同的 messages 結構與設定方式。  
在此範例中，我們將改用動態載入 messages，因此先從設定檔中移除靜態 `messages`。

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "intor-config.ts": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

```ts ui=code-tabs
---
title: src/intor-config.ts
---
export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
});
```

---

## 動態 Import

此方式利用 **bundler**（如 Vite）的動態 import，在需要時載入對應語系的 `messages`。

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      },
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

透過自訂 `loader` 動態載入對應語系的 messages，並集中於一個獨立的 `I18nProvider` 中管理。  
`useIntor` 負責整合語系狀態與載入邏輯，並將結果交由 `IntorProvider`。

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
import type { ReactNode } from "react";
import type { LocaleMessages } from "intor";
import { IntorProvider, useIntor } from "intor/react";
import { intorConfig } from "./intor-config.ts";

const loader = async (locale: string): Promise<LocaleMessages> => ({
  [locale]: (await import(`../messages/${locale}/index.json`)).default,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useIntor(intorConfig, loader);
  return <IntorProvider value={value}>{children}</IntorProvider>;
}
```

```tsx ui=code-tabs
---
title: src/main.tsx
---
// ...
import { I18nProvider } from "./i18n-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
```

---

## 遠端 Fetch

此方式透過 **HTTP 請求** 從伺服器載入語言檔，在語系變更時動態取得對應的 `messages`。

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      },
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

透過自訂 `loader` 以 fetch 方式載入遠端語言檔，並集中於一個獨立的 `I18nProvider` 中管理。  
`useIntor` 負責整合語系狀態與載入邏輯，並將結果交由 `IntorProvider`。

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
import type { ReactNode } from "react";
import type { LocaleMessages } from "intor";
import { IntorProvider, useIntor } from "intor/react";
import { intorConfig } from "./intor-config.ts";

const loader = async (locale: string): Promise<LocaleMessages> => ({
  [locale]: await fetch(
    `http://localhost:5173/messages/${locale}/index.json`,
  ).then((r) => r.json()),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useIntor(intorConfig, loader);
  return <IntorProvider value={value}>{children}</IntorProvider>;
}
```

```tsx ui=code-tabs
---
title: src/main.tsx
---
// ...
import { I18nProvider } from "./i18n-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
);
```

---

## 注意事項

上述範例僅示範核心概念與最小實作方式。  
實際專案中可視需求補充錯誤處理與其他最佳化設計。

---

## 下一步

```tsx ui=card
---
title: Translate Handlers
href: quick-start
---
設置 Translator 找不到該 Key 對應的 message 時、或者正在 loading 時候的顯示方式。
---

title: 型別生成與 IntelliSense
href: quick-start
---
透過 @intor/cli 自動生成型別，讓您的開發過程具備完整的 IntelliSense 體驗與安全的型別支援。
```
