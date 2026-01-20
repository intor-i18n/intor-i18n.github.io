# Observability

Observability 選項用於定義 Intor 與系統記錄與診斷機制之間的整合方式。

---

## logger

定義 Intor 在執行過程中所使用的 logger 設定。

> Intor 採用 Logry 作為預設的 logging 實作，關於 logger 的詳細選項與行為定義請參考：[Logry](https://github.com/yiming-liao/logry)

### • level

設定 logger 的記錄等級。

> 預設為 `"warn"` // "silent" | "trace" | "debug" | "info" | "warn" | "error" | "fatal"

```ts ui=code-tabs hideHeader=true
---
title: none
---
defineIntorConfig({
  logger: {
    level: "debug",
  },
});
```

### • preset

指定使用的 logger 預設配置。

### • normalizeConfig

定義記錄內容的正規化設定。

### • formatConfig

定義記錄輸出的格式設定。

### • renderConfig

定義記錄內容的渲染設定。

### • printConfig

定義記錄的輸出行為設定。
