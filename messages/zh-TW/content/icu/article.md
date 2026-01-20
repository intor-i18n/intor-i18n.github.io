# ICU 訊息格式

本頁示範在 Intor 中整合 ICU Message Format 的最小實作方式。

---

Intor 無內建 ICU 語法，而是將格式化責任交由成熟且標準的實作負責。  
在此範例中，我們使用 `intl-messageformat` 作為 ICU 格式化引擎。

請參考 [FormatJS 官方文件](https://formatjs.github.io/docs/intl-messageformat)

## 安裝

安裝 intl-messageformat：

```bash ui=code-tabs
---
title: npm
---
npm install intl-messageformat

---
title: yarn
---
yarn add intl-messageformat

---
title: pnpm
---
pnpm add intl-messageformat

---
title: bun
---
bun add intl-messageformat
```

## Format Handler

由於 Intor 已內建處理 **interpolation** 與 **rich tags**，使用 `IntlMessageFormat` 時需關閉其 tag 解析。  
關於 Handlers 的設計與行為，請參考 [Handlers & Plugins](./handlers-and-plugins)。

以下為一個最基本的 ICU Format Handler 實作範例：

```ts ui=code-tabs
---
title: icu-format-handler.ts
---
import type { FormatHandler, MessageValue } from "intor";
import IntlMessageFormat from "intl-messageformat";

export const icuFormatHandler: FormatHandler = ({
  rawMessage,
  locale,
  replacements,
}) => {
  const formatter = new IntlMessageFormat(
    rawMessage,
    locale,
    {},
    { ignoreTag: true }, // Disable tag parsing (handled by Intor)
  );
  return formatter.format(replacements) as MessageValue;
};
```

## 注入 Handler

將 `icuFormatHandler` 於初始化時注入至 `handlers`。

```tsx ui=code-tabs
---
title: React
---
import { IntorProvider } from "intor/react";
import { icuFormatHandler } from "./icu-format-handler.ts";

// ...
  <IntorProvider
    value={{ ...value, handlers: { formatHandler: icuFormatHandler } }}
  >
    {children}
  </IntorProvider>
// ...

---
title: Vue
---
import { IntorProvider } from "intor/vue";
import { icuFormatHandler } from "./icu-format-handler";

// ...
  <IntorProvider
    :value="{ ...value, handlers: { formatHandler: icuFormatHandler } }"
  >
    <HelloWorld />
  </IntorProvider>
// ...

---
title: Svelte
---
import { createIntorStore } from "intor/svelte";
import { icuFormatHandler } from "./icu-format-handler";

// ...
createIntorStore({
  ...value,
  handlers: { formatHandler: icuFormatHandler },
});
// ...
```

```tsx ui=code-tabs
---
title: Next.js (Server-side)
---
import { getTranslator } from "intor/next/server";
import { icuFormatHandler } from "./icu-format-handler";

// ...

getTranslator(intorConfig, {
  handlers: { formatHandler: icuFormatHandler },
});

// ...

---
title: Express
---
import { createIntor, getTranslator } from "intor/express";
import { icuFormatHandler } from "./icu-format-handler";

// 初始化階段
app.use(
  createIntor(intorConfig, { handlers: { formatHandler: icuFormatHandler } }),
);

// translator 取得階段
getTranslator(intorConfig, req, {
  handlers: { formatHandler: icuFormatHandler },
});
```

> **Note**  
> 由於 Intor 採用純靜態設定搭配 runtime 能力注入的設計，  
> 在 request-scoped 的執行環境中，與 translator 相關的依賴需於每個階段都顯式提供。  
> 關於此設計背後的考量，請參考 [Design Philosophy](./introduction/design-philosophy)。

## ICU 範例

以下示範一個使用 ICU Message Format 的最小翻譯範例：

```ts ui=code-tabs
---
title: example.tsx
---
export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
  messages: {
    en: { icu: "Price: {value, number, ::currency/USD}" },
    fr: { icu: "Price: {value, number, ::currency/EUR}" },
  },
});

// ...

<p>{t("icu", { value: 12.5 })}</p>
// en → Price: $12.50
// fr → Price: 12,50 €
```

> 詳細用法請參考 [ICU Message syntax](https://formatjs.github.io/docs/core-concepts/icu-syntax)
