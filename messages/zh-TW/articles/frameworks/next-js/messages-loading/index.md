# 語言檔載入

本頁介紹在 Vite + React 專案中，如何將語言檔整合進 Intor。  
我們會示範三種常見方式：**靜態 Import**、**動態 Import**，以及 **遠端 Fetch**，讓你依需求選擇最適合的策略。

---

## 三種常見方式

### 靜態 Import

> 靜態 Import 是最簡單直接的方式。

使用靜態 Import 時，你只需要在專案中直接引入各語系的 `messages`，Intor 會立刻取得並使用它們。  
詳見 [Vite React ♯2 Intor 設定](../vite-react#2-intor-設定configuration)。

```ts ui=code-tabs
---
title: src/intor-config.ts
---
import EN_US from "../messages/en-US/index.json";
```

---

### 動態 Import

> 如果專案希望減少初次建置的 bundle 體積，或需要動態取得最新語言檔，可以考慮使用 **動態 Import**，依使用者語系動態載入對應的 `messages`

範例中，我們用 `I18nProvider` 包裹 `<App />`，管理語系與對應的 `messages`，並提供切換語系時的 `onLocaleChange` 與 `isLoading` 狀態。  
將它放在 `main.tsx`，即可提供全局語系 Context 給應用程式。

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      },
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      }
    }
  }
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
    <I18nProvider />
  </StrictMode>,
);
```

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
import { useState } from "react";
import { mergeMessages, type LocaleMessages } from "intor";
import { getInitialLocale, IntorProvider } from "intor/react";
import { intorConfig } from "./intor-config.ts";
import App from "./App.tsx";

// 工具函數：動態匯入指定語系的 messages
const importMessages = async (locale: string) => ({
  [locale]: (await import(`../messages/${locale}/index.json`)).default,
});

// 初始化階段：取得預設語系並載入該語系的 messages
const initialLocale = getInitialLocale(intorConfig);
const initialMessages = await importMessages(initialLocale);

export function I18nProvider() {
  const [messages, setMessages] = useState<LocaleMessages>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IntorProvider
      value={{
        config: intorConfig,
        initialLocale,
        // 將動態載入的 messages 與 config 中預設的 messages 合併
        messages: mergeMessages(intorConfig.messages, messages),
        onLocaleChange: async (newLocale: string) => {
          setIsLoading(true);
          const loadedMessages = await importMessages(newLocale);
          setMessages(loadedMessages);
          setIsLoading(false);
        },
        isLoading,
      }}
    >
      <App />
    </IntorProvider>
  );
}
```

---

### 遠端 Fetch

> 如果專案希望減少初次建置的 bundle 體積，或需要動態取得最新語言檔，可考慮使用**遠端 Fetch**，依使用者語系向伺服器抓取對應的 `messages`。

範例中，我們用 `I18nProvider` 包裹 `<App />`，管理語系與對應的 `messages`，並提供切換語系時的 `onLocaleChange` 與 `isLoading` 狀態。  
將它放在 `main.tsx`，即可提供全局語系 Context 給應用程式。

```json ui=files
{
  "src": {
    "type": "folder",
    "children": {
      "main.tsx": {
        "type": "file",
        "gitStatus": "modified"
      },
      "i18n-provider.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      }
    }
  }
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
    <I18nProvider />
  </StrictMode>,
);
```

- 這邊我們使用文件提供的遠端 URL `https://intor-i18n.github.io/messages/${locale}/` 作為示範來源。  
  取得的資料格式為： `{ greeting: string }`

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
import { useState } from "react";
import { mergeMessages, type LocaleMessages } from "intor";
import { getInitialLocale, IntorProvider } from "intor/react";
import { intorConfig } from "./intor-config.ts";
import App from "./App.tsx";

// 工具函數：Fetch 指定語系的 messages
const fetchMessages = async (locale: string) => {
  return {
    [locale]: await fetch(
      `https://intor-i18n.github.io/messages/${locale}/`,
    ).then((r) => r.json()),
  };
};

// 初始化階段：取得預設語系並載入該語系的 messages
const initialLocale = getInitialLocale(intorConfig);
const initialMessages = await fetchMessages(initialLocale);

export function I18nProvider() {
  const [messages, setMessages] = useState<LocaleMessages>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IntorProvider
      value={{
        config: intorConfig,
        initialLocale,
        // 將動態載入的 messages 與 config 中預設的 messages 合併
        messages: mergeMessages(intorConfig.messages, messages),
        onLocaleChange: async (newLocale: string) => {
          setIsLoading(true);
          const loadedMessages = await fetchMessages(newLocale);
          setMessages(loadedMessages);
          setIsLoading(false);
        },
        isLoading,
      }}
    >
      <App />
    </IntorProvider>
  );
}
```

您也可以將語言檔放置在 Vite + React 專案的 `public` 資料夾，作為本地測試或遠端資源使用：

```json ui=files
{
  "public": {
    "type": "folder",
    "gitStatus": "modified",
    "children": {
      "messages": {
        "type": "folder",
        "gitStatus": "untracked"
      }
    }
  }
}
```

```tsx ui=code-tabs
---
title: src/i18n-provider.tsx
---
// ...
const fetchMessages = async (locale: string) => {
  return {
    [locale]: await fetch(
      `http://localhost:5173/messages/${locale}/index.json`,
    ).then((r) => r.json()),
  };
};
// ...
```

---

## 注意事項

以上範例都以最簡化形式呈現，實務上建議自行加入 錯誤處理、載入狀態管理、以及任何必要的效能優化，確保應用程式在各種情況下穩定運行。

---

## 下一步行動

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
