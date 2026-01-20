# 設定檔

設定檔是用於定義 Intor 翻譯語意的靜態物件，作為系統中最穩定的基礎，不包含任何可執行邏輯。

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

## 概覽

在語意層級上，Intor 的設定檔可概略分為下列幾個區塊：

- [**Locale**](#locale)：設定系統支援與使用的語系。
- [**Messages**](#messages)：提供系統直接使用的靜態翻譯內容。
- [**Translator**](#translator)：設定翻譯時使用的顯示訊息。
- [**Routing**](#routing)：設定語系的解析與網址表達方式。
- [**Persistence**](#persistence)：設定語系狀態的保存方式。
- [**Messages Loader**](#messages-loading)：設定翻譯內容的載入方式。
- [**Observability**](#observability)：設定系統記錄與診斷行為。

---

## 詳細參數說明

### Locale & Messages

- `messages`：靜態翻譯內容，可直接內嵌於設定檔中。
- `defaultLocale`：系統的基準語系，作為語系解析與工具鏈的參考依據。
- `supportedLocales`：明確支援的語系列表。
- `fallbackLocales`：定義翻譯內容在載入與解析階段使用的語系 fallback 規則。

### Translator

- `translator.loadingMessage`：翻譯內容尚未就緒時所使用的顯示訊息。
- `translator.missingMessage`：翻譯 key 無法解析時所使用的替代顯示訊息。

### Routing & Persistence

- `routing.basePath`：路由系統的基準路徑，作為所有語系路由的起點。
- `routing.localePrefix`：控制語系是否以及如何出現在 URL 路徑中的前綴形式。

- `routing.inbound.localeSources`：用於解析當前語系的來源列表，依序嘗試。
- `routing.inbound.queryKey`：從 URL 查詢參數中解析語系時所使用的 key。
- `routing.inbound.firstVisit`：使用者首次造訪時的語系解析行為設定。
  - `localeSource`：首次造訪時使用的語系來源。
  - `redirect`：是否在解析完成後進行導向。
  - `persist`：是否保存解析後的語系結果。

- `routing.outbound.localeCarrier`：在產生導覽 URL 時，用於承載語系資訊的方式。
- `routing.outbound.queryKey`：在產生語系相關 URL 時使用的查詢參數 key。
- `routing.outbound.host`：基於 host 的語系路由設定。
  - `map`：語系與 host 之間的對應關係。
  - `default`：未命中語系對應時使用的預設 host。
- `routing.outbound.forceFullReload`：在語系切換時是否強制進行完整頁面重新載入。

- `cookie`

### Messages Loading

- `loader`
- `server.loader`
- `client.loader`

### Observability

- `logger`
