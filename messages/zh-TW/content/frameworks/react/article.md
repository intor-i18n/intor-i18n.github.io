# React

本頁示範 Intor 在 React 專案中的最小整合流程。

> 以下範例使用 TypeScript，亦可使用 JavaScript。

---

## 安裝

Intor 可用於任何 React 專案，並不依賴特定的建構工具。  
在此範例中，我們使用 Vite 來建立 React 專案，請參考：[Vite 官方文件](https://vite.dev/guide/#scaffolding-your-first-vite-project)

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

以下提供一個最簡化的專案結構範例，實際目錄與命名可依專案需求調整。

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
          "en": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "index.json": { "type": "file", "gitStatus": "untracked" }
            }
          },
          "fr": {
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
        "gitStatus": "modified",
        "children": {
          "intor-config.ts": { "type": "file", "gitStatus": "untracked" },
          "App.tsx": { "type": "file", "gitStatus": "modified" },
          "main.tsx": { "type": "file", "gitStatus": "modified" }
        }
      }
    }
  }
}
```

## ♯1 翻譯內容

在專案中建立 `messages` 資料夾，並依語系建立子資料夾，每個語系提供一個 `index.json`。

```json ui=files
{
  "messages": {
    "type": "folder",
    "gitStatus": "untracked",
    "children": {
      "en": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "index.json": { "type": "file", "gitStatus": "untracked" }
        }
      },
      "fr": {
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
title: messages/en/index.json
---
{ "hello": "Hello" }

```

```json ui=code-tabs
---
title: messages/fr/index.json
---
{ "hello": "Bonjour" }
```

## ♯2 設定檔

建立一個通用設定檔 `intorConfig`，用於定義 Intor 的核心行為。  
此範例使用最簡單的方式，直接匯入翻譯內容作為 `messages` 來源。

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
import { defineIntorConfig } from "intor";
import EN from "../messages/en/index.json";
import FR from "../messages/fr/index.json";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
  messages: {
    en: EN,
    fr: FR,
  },
});
```

## ♯3 初始化

透過 `IntorProvider` 在應用啟動階段注入設定與語系。  
可使用 Intor 內建的 `getClientLocale()` 自動推斷初始語系。

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
import { IntorProvider, getClientLocale } from "intor/react";
import { intorConfig } from "./intor-config.ts";

const locale = getClientLocale(intorConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntorProvider value={{ config: intorConfig, locale }}>
      <App />
    </IntorProvider>
  </StrictMode>,
);
```

---

## 使用範例

以下為最簡化的範例，展示 Intor 的基本使用方式。  
透過 `useTranslator`，可取得：

- `t`：依目前語系取得對應訊息
- `setLocale`：切換當前語系

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
      <h1>{t("hello")}</h1>

      <button onClick={() => setLocale("en")}>English</button>
      <button onClick={() => setLocale("fr")}>French</button>
    </>
  );
}

export default App;
```

---

## 下一步

```tsx ui=card
---
title: 動態載入
href: /frameworks/react/dynamic-loading
---
當專案需要更彈性的翻譯內容載入策略時，可改用動態載入。

---
title: 可組合式翻譯
href: /frameworks/react/rich-translations
---
將翻譯結果渲染為 ReactNode，使翻譯內容能包含元件與結構。
```
