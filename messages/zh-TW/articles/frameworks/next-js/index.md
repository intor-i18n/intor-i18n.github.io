# Next.js

立即在 Next.js 專案中使用 Intor 實現多語系功能，完整支援 SSR 與 SSG，提供靈活的本地或遠端翻譯載入方式，並內建路由導向整合。

> 以下範例使用 TypeScript，亦可使用 JavaScript。

---

## 安裝

若要開始 Next.js 專案，請先確認環境已準備完成。  
若尚未建立專案，可參考官方指引：[Next.js 官方文件](https://nextjs.org/docs/app/getting-started/installation)

- 此範例專案所採用的設定：`App Router` 以及 `src/ 資料夾`。

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
        "gitStatus": "modified",
        "children": {
          "app": {
            "type": "folder",
            "gitStatus": "modified",
            "children": {
              "layout.tsx": { "type": "file", "gitStatus": "modified" },
              "page.tsx": { "type": "file", "gitStatus": "modified" }
            }
          },
          "intor-config.ts": { "type": "file", "gitStatus": "untracked" }
        }
      }
    }
  }
}
```

### ♯1 語言檔

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

### ♯2 Intor 設定檔

建立一個 通用設定檔 `intorConfig`，用於定義 Intor 的核心行為。  
在這個範例中，我們採用基本的 **Loader** 模式：`local`，訊息會從本地靜態檔案載入。

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

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  supportedLocales: ["en-US", "zh-TW"],
  loader: { type: "local" },
});
```

> 設定物件可依個人喜好命名與存放位置，例如 src/i18n/config.ts。

### ♯3 初始化 Context

在 Next.js 應用中，需要用 `IntorProvider` 包裹整個 App，以提供翻譯的 Context。  
在此範例中，我們透過 `intor()` 搭配 `getI18nContext` 初始化 i18n 資料：

- `intor`：Server 端初始化入口，負責載入訊息並快取結果
- `getI18nContext`：Next.js 專用，解析當前 locale 與 pathname

```json ui=files
{
  "layout.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/app/layout.tsx
---
// ...
import { intor } from "intor/server";
import { IntorProvider } from "intor/react";
import { getI18nContext } from "intor/next/server";
import { intorConfig } from "@/intor-config";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const value = await intor(intorConfig, getI18nContext);

  return (
    <html lang={value.initialLocale}>
      <body>
        <IntorProvider value={value}>{children}</IntorProvider>
      </body>
    </html>
  );
}
```

> 提示：您也可以依專案需求自行設計取得 I18nContext 的方式。

🎉 至此，設定完成，可以開始在應用中使用 Intor。

---

## 使用範例

下面示範的是一個最精簡的 `page.tsx`，讓您能迅速掌握 **Intor** 的核心使用方式。  
首先，我們使用 useTranslator Hook 取得翻譯函數 t：

- `t` (translate) 用來翻譯文字

接著，我們使用 Link 組件來切換語系：

- `Link`：包裝過的 next/link，當 loader 類型為 `local` 時，會觸發頁面重載 (full reload)

```json ui=files
{
  "page.tsx": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/app/page.tsx
---
"use client";

import { useTranslator } from "intor/react";
import { Link } from "intor/next";

export default function Home() {
  const { t } = useTranslator();

  return (
    <>
      <h1>{t("greeting")}</h1>

      <div style={{ display: "flex", gap: "12px" }}>
        <Link locale={"en-US"}>English</Link>
        <Link locale={"zh-TW"}>繁體中文</Link>
      </div>
    </>
  );
}
```

---

## 額外配置

### ♯4 路由導向

在 Next.js 專案中，若想要 **自動處理多語系路由**，可以使用 Intor 提供的 `intorProxy`，並搭配 Next.js 的 Proxy 機制，自動將使用者導向對應的語系路由，無需手動調整 URL。

若想詳細了解 Next.js 的 Proxy 用法請詳見：[Next.js 官方文件](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

> 範例中使用 Next.js 最新版 API `proxy.ts`，若使用舊版，可改用 `middleware.ts`。

調整後的結構：

```json ui=files
{
  "src": {
    "type": "folder",
    "gitStatus": "modified",
    "children": {
      "app": {
        "type": "folder",
        "gitStatus": "untracked",
        "children": {
          "[locale]": {
            "type": "folder",
            "gitStatus": "untracked",
            "children": {
              "page.tsx": { "type": "file", "gitStatus": "untracked" }
            }
          }
        }
      },
      "proxy.ts": {
        "type": "file",
        "gitStatus": "untracked"
      },
      "intor-config.ts": {
        "type": "file",
        "gitStatus": "modified"
      }
    }
  }
}
```

首先新增動態路由資料夾 `[locale]`，以及對應的 `page.tsx`

新增的 `page.tsx` 內容跟前面使用範例一模一樣：[使用範例 src/app/page.tsx](#使用範例)，可以直接複製整個檔案：

```json ui=files
{
  "[locale]": {
    "type": "folder",
    "gitStatus": "untracked",
    "children": {
      "page.tsx": {
        "type": "file",
        "gitStatus": "untracked"
      }
    }
  }
}
```

新增 `proxy.ts`，使用 `intorProxy` 自動導向對應語系：

```json ui=files
{
  "proxy.ts": {
    "type": "file",
    "gitStatus": "untracked"
  }
}
```

```tsx ui=code-tabs
---
title: src/proxy.ts
---
import type { NextRequest } from "next/server";
import { intorProxy } from "intor/next/proxy";
import { intorConfig } from "@/intor-config";

export function proxy(request: NextRequest) {
  return intorProxy(intorConfig, request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
```

接著調整 `intorConfig`，增加 `routing.prefix` 設定，用來控制 URL 前綴的自動導向策略：

- `all`：所有語系都加上前綴
- `none`：不使用前綴 (預設值)
- `except-default`：僅非預設語系加前綴

```json ui=files
{
  "intor-config.ts": {
    "type": "file",
    "gitStatus": "modified"
  }
}
```

```tsx ui=code-tabs
---
title: src/intor-config.ts
---
 import { defineIntorConfig } from "intor/config";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en-US",
  supportedLocales: ["en-US", "zh-TW"],
  loader: { type: "local" },
  routing: { prefix: "all" }, // 增加這行
});
```

設定完成後，訪問 http://localhost:3000/ 會自動導向到 `http://localhost:3000/{locale}`。  
這樣一來，App 就能自動處理多語系路由，並確保使用者切換語系時導向正確。 💐

---

## 下一步行動

```tsx ui=card
---
title: 語言檔載入
href: /frameworks/next-js/messages-loading
---
我們會示範三種常見方式：靜態 Import、動態 Import，以及 遠端 Fetch，讓你依需求選擇最適合的策略。

---
title: 型別生成與 IntelliSense
href: /frameworks/next-js/messages-loading
---
透過 @intor/cli 自動生成型別，讓您的開發過程具備完整的 IntelliSense 體驗與安全的型別支援。
```
