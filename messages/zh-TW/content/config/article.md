# 設定檔

設定檔是用於定義 Intor 翻譯語意的靜態物件，作為系統中最穩定的語意基礎，不包含任何可執行邏輯。

> 設定檔描述翻譯系統「是什麼」，而不是「如何運作」。

---

此為一份最小設定檔範例，用於示意設定檔的基本結構：

```ts ui=code-tabs hideHeader=true
---
title: none
---
import { defineIntorConfig } from "intor";

export const intorConfig = defineIntorConfig({
  defaultLocale: "en",
  supportedLocales: ["en", "fr"],
});
```

> 建議將 `intorConfig` 定義於獨立檔案中，並作為該檔案的 **唯一輸出**。  
> 請避免在同一檔案中同時 export 其他值，以確保靜態分析與 CLI 工具能可靠地識別設定檔。

## 概覽

在語意層級上，Intor 的設定檔可概略分為下列幾個區塊：

- [**Locale**](./config/locale)：設定系統支援與使用的語系。
- [**Messages**](./config/messages)：提供系統直接使用的靜態翻譯內容。
- [**Translator**](./config/translator)：設定翻譯時使用的顯示訊息。
- [**Routing**](./config/routing)：設定語系的解析與網址表達方式。
- [**Persistence**](./config/persistence)：設定語系狀態的保存方式。
- [**Loader**](./config/loader)：設定翻譯內容的載入方式。
- [**Observability**](./config/observability)：設定系統記錄與診斷行為。
