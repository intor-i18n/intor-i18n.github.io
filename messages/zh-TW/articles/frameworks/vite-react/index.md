# Vite React

本頁示範 Intor 在 Vite + React 專案中的最小整合流程，包括語言檔配置、基本設定與 Context 初始化。  
這些步驟構成 Intor 在前端環境中的核心使用模式。

> 以下範例使用 TypeScript，亦可使用 JavaScript。

---

## 安裝

若要開始 Vite + React 專案，請先確認環境已準備完成。  
若尚未建立專案，可參考官方指引：[Vite 官方文件](https://vite.dev/guide/#scaffolding-your-first-vite-project)

安裝 Intor：

```bash ui=CodeTabs
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

以下提供最簡化的 Intor 配置範例，實際目錄與命名可依專案需求調整：

```json ui=Files
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

```json ui=Files
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

```json ui=CodeTabs
---
title: messages/en-US/index.json
---
{
  "greeting": "Hello World"
}
```

```json ui=CodeTabs
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

```json ui=Files
{
  "intor-config.ts": {
    "type": "file",
    "gitStatus": "untracked"
  }
}
```

```ts ui=CodeTabs
---
title: src/intor-config.ts
---
import { defineIntorConfig } from "intor/config";
import enUS from "../messages/en-US/index.json";
import zhTW from "../messages/zh-TW/index.json";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  supportedLocales: ["en-US", "zh-TW"],
  messages: {
    "en-US": enUS,
    "zh-TW": zhTW,
  },
});
```

> 設定物件可依個人喜好命名與存放位置，例如 src/i18n/config.ts。

### ♯3 初始化 Context

在 React 應用中，需要用 `IntorProvider` 包裹 `<App />`，以提供翻譯 Context。  
建議使用 Intor 內建的 `getInitialLocale()`，可自動偵測使用者的 `cookie` 與 `瀏覽器語系`：

```json ui=Files
{
  "main.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=CodeTabs
---
title: src/main.tsx
---
// ...
import { IntorProvider, getInitialLocale } from "intor/react";
import { intorConfig } from "./i18n-config.ts";

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

下面示範的是一個最精簡的 `<App />`，讓您能迅速掌握 Intor 的核心使用方式。  
透過 `useTranslator` 這個 hook，我們可以取得 t 與 setLocale：

- `t` (translate) 用來翻譯文字
- `setLocale` 用來切換當前語系。

```json ui=Files
{
  "App.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=CodeTabs
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

---

## 下一步行動

```tsx ui=Card
---
title: 語言檔載入
href: /frameworks/vite-react/messages-loading
---
我們會示範三種常見方式：靜態 Import、動態 Import，以及 遠端 Fetch，讓你依需求選擇最適合的策略。

---
title: 型別生成與 IntelliSense
href: /frameworks/vite-react/messages-loading
---
透過 @intor/cli 自動生成型別，讓您的開發過程具備完整的 IntelliSense 體驗與安全的型別支援。
```
