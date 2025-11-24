# Vite React

在 Vite + React 的純前端環境中，**Intor** 會直接以靜態方式載入翻譯訊息（messages）。

---

## 安裝

若要開始 Vite + React 專案，請先確認環境已準備完成。  
若尚未建立專案，可參考官方指引：[vite.dev](https://vite.dev/guide/#scaffolding-your-first-vite-project)

專案建立完成後，即可安裝 Intor：

```bash groupId=1 ui=CodeTabs label=npm
npm install intor
```

```bash groupId=1 ui=CodeTabs label=yarn
yarn add intor
```

---

## 檔案與資料夾結構

安裝完成後，即可開始設定檔案與資料夾結構，大致如下：

```json ui=Files
{
  "myapp": {
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
          "App.tsx": { "type": "file" },
          "intor-config.ts": { "type": "file", "gitStatus": "untracked" }
        }
      }
    }
  }
}
```

### ♯1 語言檔案 Messages

我們在專案根目錄建立一個 `messages` 資料夾，在這裡放置不同語系的語言檔案。  
一個語系一個資料夾，最簡單的配置方式是直接放 `index.json` 代表整個語系的語言檔案

> 當然目錄位置跟名稱都是可以自行調整的，並且也支援更進階的namespaces嵌套配置，請查看此 [test](../)

```json ui=Files
{
  "messages": {
    "type": "folder",
    "children": {
      "en-US": {
        "type": "folder",
        "children": {
          "index.json": { "type": "file" }
        }
      },
      "zh-TW": {
        "type": "folder",
        "children": {
          "index.json": { "type": "file" }
        }
      }
    }
  }
}
```

- 語系檔案內容

```json groupId=messages ui=CodeTabs label=messages/en-US/index.json
{
  "greeting": "hello world"
}
```

```json groupId=messages ui=CodeTabs label=messages/zh-TW/index.json
{
  "greeting": "你好，世界"
}
```

### ♯2 Intor 設定檔案

我們需要設定一個 `intorConfig` 在整個系統共用，他是一個純靜態的物件

> 當然此設定物件可以隨您的喜好去命名，也可以照您的喜好去放置位置，例如: src/i18n/config.ts

```json ui=Files
{
  "intor-config.ts": {
    "type": "file"
  }
}
```

- 最極簡 intorConfig 內容

```ts groupId=config ui=CodeTabs label=src/intor-config.ts
import { defineIntorConfig } from "intor/config";
import enUS from "../messages/en-US/index.json";
import zhTW from "../messages/zh-TW/index.json";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  messages: {
    "en-US": enUS,
    "zh-TW": zhTW,
  },
});
```

### ♯3 設置 Context

我們需要使用 `IntorProvider` 將 `<App />` 包裹起來 以方便提供context

> 初始化的value必須傳入intor config 以及自訂的 initial locale

```ts groupId=context ui=CodeTabs label=src/main.tsx
// ...
import { IntorProvider, getInitialLocale } from "intor/react";
import { intorConfig } from "./i18n-config.ts";

// util for get initial locale, auto detect from cookie & browser
const initialLocale = getInitialLocale(intorConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntorProvider value={{ config: intorConfig, initialLocale }}>
      <App />
    </IntorProvider>
  </StrictMode>,
);

```
