# ICU 訊息格式

本頁示範 Intor 中整合 ICU Message Format 的最小實作方式。

---

在此範例中，我們直接使用 `intl-messageformat` 作為格式處理實作。  
Intor 刻意不內建 ICU 語法，而是將格式化責任交由成熟且標準的實作負責。  
由於 Intor 已處理 interpolation 與 rich tags，本範例會關閉 `intl-messageformat` 的 tag 解析。

## Format Handler

```ts ui=code-tabs
---
title: messages/en/index.json
---
import type { FormatHandler, MessageValue } from "intor-translator";
import IntlMessageFormat from "intl-messageformat";

export const icuFormatter: FormatHandler = ({
  rawMessage,
  locale,
  replacements,
}) => {
  const formatter = new IntlMessageFormat(
    rawMessage,
    locale,
    {},
    { ignoreTag: true },
  );
  return formatter.format(replacements) as MessageValue;
};
```
