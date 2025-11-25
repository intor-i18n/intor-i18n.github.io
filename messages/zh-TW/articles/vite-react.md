# Vite React

在 Vite + React 的純前端環境中，**Intor** 會以靜態方式載入翻譯訊息（messages），無需動態請求。

---

## 安裝

若要開始 Vite + React 專案，請先確認環境已準備完成。  
若尚未建立專案，可參考官方指引：[Vite 官方文件](https://vite.dev/guide/#scaffolding-your-first-vite-project)

> 以下範例使用 TypeScript，亦可使用 JavaScript。

安裝 Intor：

```bash ui=CodeTabs
---tab npm---
npm install intor

---tab yarn---
yarn add intor
```

---

## 專案結構

以下提供最簡化的 **Intor** 配置範例，實際目錄與命名可依專案需求調整：

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
---tab messages/en-US/index.json---
{
  "greeting": "Hello World"
}
```

```json ui=CodeTabs
---tab messages/zh-TW/index.json---
{
  "greeting": "你好，世界"
}
```

> 以上檔案位置與命名可依需求調整。若有進階需求（如 namespace 結構），Intor 提供更完整的設定方式。

### ♯2 Intor 設定（Configuration）

建立全域設定檔 `intorConfig`，靜態引入 messages：

```json ui=Files
{
  "intor-config.ts": {
    "type": "file",
    "gitStatus": "untracked"
  }
}
```

```ts ui=CodeTabs
---tab src/intor-config.ts---
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

> 設定物件可依個人喜好命名與存放位置，例如 src/i18n/config.ts。

### ♯3 初始化 Context

在 React 應用中，需要用 `IntorProvider` 包裹 `<App />`，以提供翻譯 Context。  
建議使用 **Intor** 內建的 `getInitialLocale()`，可自動偵測使用者的 `cookie` 與 `瀏覽器語系`：

```json ui=Files
{
  "main.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```ts ui=CodeTabs
---tab src/main.tsx---
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

```json ui=Files
{
  "App.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=CodeTabs
---tab src/App.tsx---
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

### 依語系動態匯入（Locale-Based Dynamic Import）

如果您希望依照使用者語系動態載入對應的 messages，可以採用 Dynamic Import 的方式。

在此範例中，我們建立了一個專門的組件 `I18nProvider` 來包裹 `<App />`，負責：

- 初始化時載入當前語系的 messages
- 支援在切換語系時動態更新 messages，而不需要重新載入整個頁面

同時，需要在 `main.tsx` 中使用這個 `I18nProvider`，以便提供全局語系 Context 給應用程式。

```json ui=Files
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

```tsx ui=CodeTabs
---tab src/main.tsx---
// ...
import { I18nProvider } from "./i18n-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider />
  </StrictMode>,
);
```

```tsx ui=CodeTabs
---tab src/i18n-provider.tsx---
// ...
import App from "./App.tsx";
import { mergeMessages, type LocaleMessages } from "intor";
import { getInitialLocale, IntorProvider } from "intor/react";
import { intorConfig } from "./i18n-config.ts";

const importMessages = async (locale: string) =>
  await import(`../messages/${locale}/index.json`).then((m) => m.default);

const initialLocale = getInitialLocale(intorConfig);
const initialMessages = {
  [initialLocale]: await importMessages(initialLocale),
};

export function I18nProvider() {
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
          const newMessages = { [newLocale]: await importMessages(newLocale) };
          setMessages(mergeMessages(intorConfig.messages, newMessages));
        },
      }}
    >
      <App />
    </IntorProvider>
  );
}
```
