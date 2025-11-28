# Next.js

在 Next.js 專案中，Intor 完整支援 SSR，也適用於 SSG 等各種應用場景，並提供 本地與遠端 loader，讓你按需載入翻譯，保持頁面快速與開發順暢。

> 以下範例使用 TypeScript，亦可使用 JavaScript。

---

## 安裝

若要開始 Next.js 專案，請先確認環境已準備完成。  
若尚未建立專案，可參考官方指引：[Next.js 官方文件](https://nextjs.org/docs/app/getting-started/installation)

安裝 Intor：

```bash ui=code-tabs
---
title: npm
---
npm install intor

---
title: yarn
---
yarn add intor

---
title: pnpm
---
pnpm add intor

---
title: bun
---
bun add intor
```

---

## 專案結構

以下提供最簡化的 **Intor** 配置範例，實際目錄與命名可依專案需求調整：

```json ui=files
{
  "myapp": {
    "isRoot": "true",
    "type": "folder",
    "children": {
      "messages": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "en-US": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "index.json": { "type": "file", "gitStatus": "untracked" }
            }
          },
          "zh-TW": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "index.json": { "type": "file", "gitStatus": "untracked" }
            }
          }
        }
      },
      "src": {
        "type": "folder",
        "children": {
          "App.tsx": { "type": "file", "gitStatus": "modified" },
          "main.tsx": { "type": "file", "gitStatus": "modified" },
          "intor-config.ts": { "type": "file", "gitStatus": "untracked" }
        }
      }
    }
  }
}
```

### ♯1 語言檔（Messages）

在專案中建立 `messages` 資料夾，並依語系建立子資料夾，每個語系提供一個 `index.json`：

```json ui=files
{
  "messages": {
    "type": "folder",
    "gitStatus": "untracked",
    "children": {
      "en-US": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "index.json": { "type": "file", "gitStatus": "untracked" }
        }
      },
      "zh-TW": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "index.json": { "type": "file", "gitStatus": "untracked" }
        }
      }
    }
  }
}
```

```json ui=code-tabs
---
title: messages/en-US/index.json
---
{
  "greeting": "Hello World"
}
```

```json ui=code-tabs
---
title: messages/zh-TW/index.json
---
{
  "greeting": "你好，世界"
}
```

> 提示：您完全可以使用更簡易的攤平架構： `mesages/en-US.json` / `mesages/zh-TW.json` ，取決於您的喜好。

### ♯2 Intor 設定（Configuration）

建立全域設定檔 `intorConfig`，靜態匯入 `messages`：

```json ui=files
{
  "intor-config.ts": {
    "type": "file",
    "gitStatus": "untracked"
  }
}
```

```ts ui=code-tabs
---
title: src/intor-config.ts
---
import { defineIntorConfig } from "intor/config";
import EN_US from "../messages/en-US/index.json";
import ZH_TW from "../messages/zh-TW/index.json";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  messages: {
    "en-US": EN_US,
    "zh-TW": ZH_TW,
  },
});
```

> 設定物件可依個人喜好命名與存放位置，例如 src/i18n/config.ts。

### ♯3 初始化 Context

在 React 應用中，需要用 `IntorProvider` 包裹 `<App />`，以提供翻譯 Context。  
建議使用 **Intor** 內建的 `getInitialLocale()`，可自動偵測使用者的 `cookie` 與 `瀏覽器語系`：

```json ui=files
{
  "main.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/main.tsx
---
// ...
import { IntorProvider, getInitialLocale } from "intor/react";
import { intorConfig } from "./intor-config.ts";

const initialLocale = getInitialLocale(intorConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntorProvider value={{ config: intorConfig, initialLocale }}>
      <App />
    </IntorProvider>
  </StrictMode>,
);
```

> 提示：您也可以依專案需求自行設計取得初始語系（initialLocale）的方式。

🎉 至此，設定完成，可以開始在應用中使用 Intor。

---

## 使用範例

下面示範的是一個最精簡的 `<App />`，讓您能迅速掌握 **Intor** 的核心使用方式。  
透過 `useTranslator` 這個 hook，我們可以取得 t 與 setLocale：

- `t` (translate) 用來翻譯文字
- `setLocale` 用來切換當前語系。

```json ui=files
{
  "App.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/App.tsx
---
// ...
import { useTranslator } from "intor/react";

function App() {
  const { t, setLocale } = useTranslator();

  return (
    <>
      <h1>{t("greeting")}</h1>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={() => setLocale("en-US")}>English</button>
        <button onClick={() => setLocale("zh-TW")}>繁體中文</button>
      </div>
    </>
  );
}

export default App;
```

接下來，我們再依照不同的專案需求，介紹兩種 `messages` 的載入方式。

---

## 語言檔匯入方式

### 靜態匯入

> 靜態匯入是最簡單直接的方式。

上面的步驟已經完成了靜態匯入的配置：直接把各語系的 `messages` 載入專案中，就能立即使用。  
詳見前面的 [♯2 Intor 設定](#2-intor-設定configuration)。

```ts ui=code-tabs
---
title: src/intor-config.ts
---
import EN_US from "../messages/en-US/index.json";
```

### 依語系動態匯入

> 如果專案中的 messages 很大，或希望減少初次建置的 bundle 體積，可以考慮使用 Dynamic Import，依使用者語系動態載入對應的 messages

在此範例中，我們建立一個專門的組件 `I18nProvider` 來包裹 `<App />`，負責：

- 初始化時載入當前語系的 messages
- 支援在切換語系時動態更新 messages，而不需要重新載入整個頁面

同時，需要在 `main.tsx` 中使用這個 `I18nProvider`，以便提供全局語系 Context 給應用程式。

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
// ...
import App from "./App.tsx";
import { mergeMessages, type LocaleMessages } from "intor";
import { getInitialLocale, IntorProvider } from "intor/react";
import { intorConfig } from "./intor-config.ts";

// 動態載入指定語系的 messages
const importMessages = async (locale: string) => ({
  [locale]: (await import(`../messages/${locale}/index.json`)).default,
});

// 初始化語系並載入對應的 messages
const initialLocale = getInitialLocale(intorConfig);
const initialMessages = await importMessages(initialLocale);

export function I18nProvider() {
  // 儲存並管理目前的 messages
  const [messages, setMessages] = useState<LocaleMessages>(
    mergeMessages(intorConfig.messages, initialMessages),
  );

  return (
    <IntorProvider
      value={{
        config: intorConfig,
        initialLocale,
        messages: mergeMessages(intorConfig.messages, messages),
        onLocaleChange: async (newLocale: string) => {
          const loadedMessages = await importMessages(newLocale);
          setMessages(mergeMessages(intorConfig.messages, loadedMessages));
        },
      }}
    >
      <App />
    </IntorProvider>
  );
}
```

---

## 下一步行動

```tsx ui=card
---
title: 型別生成與 IntelliSense
href: quick-start
---
透過 @intor/cli 自動生成型別，讓您的開發過程具備完整的 IntelliSense 體驗與安全的型別支援。
```
